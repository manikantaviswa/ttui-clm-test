'use strict';

var module = angular.module('TT-UI.Common.Directives.Forms', [
	'schemaForm',
	'ui.bootstrap.accordion',
	'ui.bootstrap.typeahead',
	'uib/template/typeahead/typeahead-match.html',
	'uib/template/typeahead/typeahead-popup.html',
	'ngAnimate',
	'TT-UI.Common.Config',
	'TT-UI.Common.AngularStrap',
	'TT-UI.Common.Services.FormValidator',
	'TT-UI.Common.Directives.BootstrapUiTmplates',
	'TT-UI.Common.Filters.ObjectFieldFilter'
]);

module.constant('SCHEMA_FORM_PREPROCESSOR', {
	wrapper: function(form) {
		return this.logic(form);
	}
});
module.config(extendSchemaForm);
module.config(configureSchemaFormForTTUI);
module.run(configureSchemaFormPreprocessor);

function extendSchemaForm($provide) {
	$provide.decorator('sfPath', ['$delegate', function($delegate) {
		var parse = $delegate.parse;

		var numberRegExp = /^[0-9]+$/;

		$delegate.parse = function() {
			var parts = parse.apply($delegate, arguments);

			parts.map(function(part) {
				return angular.isString(part) && part.match(numberRegExp) ? +part : part;
			});

			return parts;
		};

		return $delegate;
	}]);
	$provide.decorator('schemaForm', function($delegate) {
		var mergeFn = $delegate.merge;
		$delegate.merge = function(schema, form, ignore, options, readonly) {
			var addons = ['columns', 'accordion', 'columns-inline'];
			form = form.map(function(obj) {
				var items = [];
				addons.forEach(function(addon) {
					if (obj[addon]) {
						obj[addon].forEach(function(item) {
							items.push(item);
						});
					}
				});

				if (items.length) {
					if (obj.items) {
						Array.prototype.push.apply(obj.items, items);
					} else {
						obj.items = items;
					}
				}

				return obj;
			});
			return mergeFn.call(this, schema, form, ignore, options, readonly);
		};

		return $delegate;
	});
}
extendSchemaForm.$inject = ['$provide'];

function configureSchemaFormForTTUI(decoratorsProvider, schemaFormProvider, PathProvider, COMMON_CONFIG, SCHEMA_FORM_PREPROCESSOR) {
	var DIRECTIVE_URL = COMMON_CONFIG.BASE_URL + 'views/directives/';
	var FORMS_URL = DIRECTIVE_URL + 'forms/';

	var getSchemaType = function(schema) {
		var type = schema.type;

		if (angular.isArray(type) && type.length === 2) {
			if (type[0] === 'null') {
				return type[1];
			}

			if (type[1] === 'null') {
				return type[0];
			}
		}

		return type;
	};

	var datepicker = function(name, schema, options) {
		var type = getSchemaType(schema);

		if ((type === 'string' || type === 'number') && (schema.format === 'date' || schema.format === 'date-time')) {
			var f = schemaFormProvider.createStandardForm(name, schema, options);

			f.key = options.path;
			f.type = schema.format === 'date' ? 'datepicker' : 'datetimepicker';
			f.dateType = schema.dateType;

			options.lookup[PathProvider.stringify(options.path)] = f;

			return f;
		}
	};

	var enumObjectToTitleMap = function(schema) {
		schema.masterData = schema['enum'];

		var enm = schema['enum'] = [];
		var enumNames = schema.names = {};
		var titleMap = [];

		schema.masterData.forEach(function(opt) {
			titleMap.push({
				name: opt.name,
				value: opt.code
			});

			enm.push(opt.code);
			enumNames[opt.code] = opt.name;
		});

		return titleMap;
	};

	var enumArrayToTitleMap = function(schema) {
		var titleMap = [];
		var enm = schema['enum'];
		var names = angular.isObject(schema.names) ? schema.names : false;
		var name;

		enm.forEach(function(value) {
			if (value === null) {
				return;
			}

			name = names ? names[value] : value;
			titleMap.push({name: name, value: value});
		});

		return titleMap;
	};

	var enumToTitleMap = function(schema, form) {
		var enm = schema['enum'];
		var titleMap = angular.isArray(enm) && angular.isObject(enm[0]) ? enumObjectToTitleMap(schema, form) : enumArrayToTitleMap(schema, form);

		enm = schema['enum']; // Referance may change

		if (!form.required && enm.indexOf(null) === -1) {
			enm.push(null);
		}

		return titleMap;
	};

	var dropdown = function(name, schema, options) {
		var type = getSchemaType(schema);
		var enm = schema['enum'];

		if (type === 'string' && enm) {
			var f = schemaFormProvider.createStandardForm(name, schema, options);

			f.key = options.path;
			f.type = 'select';
			f.titleMap = enumToTitleMap(schema, f);

			options.lookup[PathProvider.stringify(options.path)] = f;

			return f;
		}
	};

	var checkboxes = function(name, schema, options) {
		var type = getSchemaType(schema);
		var enm = schema.items['enum'];

		if (type === 'array' && schema.items && enm) {
			var f = schemaFormProvider.createStandardForm(name, schema, options);

			f.key = options.path;
			f.type = 'checkboxes';
			f.titleMap = enumToTitleMap(schema.items, f);

			options.lookup[PathProvider.stringify(options.path)] = f;

			return f;
		}
	};

	var defaults = schemaFormProvider.defaults;

	defaults.string.splice(0, 1, datepicker, dropdown);
	defaults.number.unshift(datepicker);
	defaults.array.splice(0, 1, checkboxes);

	schemaFormProvider.postProcess(SCHEMA_FORM_PREPROCESSOR.wrapper.bind(SCHEMA_FORM_PREPROCESSOR));

	decoratorsProvider.createDecorator('ttuiDecorator', {
		textarea: FORMS_URL + 'textarea.tpl.html',
		fieldset: FORMS_URL + 'tmp.tpl.html',
		array: FORMS_URL + 'array.tpl.html',
		tabarray: FORMS_URL + 'tmp.tpl.html',
		tabs: FORMS_URL + 'tmp.tpl.html',
		section: FORMS_URL + 'section.tpl.html',
		conditional: FORMS_URL + 'section.tpl.html',
		actions: FORMS_URL + 'tmp.tpl.html',
		select: FORMS_URL + 'select.tpl.html',
		checkbox: FORMS_URL + 'tmp.tpl.html',
		checkboxes: FORMS_URL + 'checkboxes.tpl.html',
		number: FORMS_URL + 'default.tpl.html',
		password: FORMS_URL + 'default.tpl.html',
		submit: FORMS_URL + 'submit.tpl.html',
		button: FORMS_URL + 'tmp.tpl.html',
		radios: FORMS_URL + 'radios.tpl.html',
		'radios-inline': FORMS_URL + 'radios-inline.tpl.html',
		radiobuttons: FORMS_URL + 'tmp.tpl.html',
		help: FORMS_URL + 'help.tpl.html',
		'default': FORMS_URL + 'default.tpl.html',
		columns: FORMS_URL + 'columns.tpl.html',
		'columns-inline': FORMS_URL + 'columns-inline.tpl.html',
		accordion: FORMS_URL + 'accordion.tpl.html',
		'break': FORMS_URL + 'break.tpl.html',
		multiselect: FORMS_URL + 'multiselect.tpl.html',
		datepicker: FORMS_URL + 'datepicker.tpl.html',
		'validation-status': FORMS_URL + 'validation-status.tpl.html',
		'multiselect-dropdown': FORMS_URL + 'multiselect-dropdown.tpl.html',
		typeahead: FORMS_URL + 'typeahead.tpl.html',
		'suggestion-box': FORMS_URL + 'suggestion-box.tpl.html',
		static: FORMS_URL + 'static.tpl.html'
	}, []);

	//manual use directives
	decoratorsProvider.createDirectives({
		textarea: FORMS_URL + 'tmp.tpl.html',
		select: FORMS_URL + 'select.tpl.html',
		checkbox: FORMS_URL + 'tmp.tpl.html',
		checkboxes: FORMS_URL + 'checkboxes.tpl.html',
		number: FORMS_URL + 'default.tpl.html',
		submit: FORMS_URL + 'submit.tpl.html',
		button: FORMS_URL + 'tmp.tpl.html',
		text: FORMS_URL + 'default.tpl.html',
		date: FORMS_URL + 'default.tpl.html',
		password: FORMS_URL + 'default.tpl.html',
		input: FORMS_URL + 'default.tpl.html',
		radios: FORMS_URL + 'tmp.tpl.html',
		'radios-inline': FORMS_URL + 'tmp.tpl.html',
		radiobuttons: FORMS_URL + 'tmp.tpl.html',
		multiselect: FORMS_URL + 'multiselect.tpl.html',
		datepicker: FORMS_URL + 'datepicker.tpl.html',
		'multiselect-dropdown': FORMS_URL + 'multiselect-dropdown.tpl.html',
		typeahead: FORMS_URL + 'typeahead.tpl.html'
	});
}
configureSchemaFormForTTUI.$inject = [
	'schemaFormDecoratorsProvider', 'schemaFormProvider', 'sfPathProvider', 'COMMON_CONFIG', 'SCHEMA_FORM_PREPROCESSOR'
];

function configureSchemaFormPreprocessor(FormValidator, SCHEMA_FORM_PREPROCESSOR) {
	SCHEMA_FORM_PREPROCESSOR.logic = function(form) {
		form.forEach(function(field) {
			if (field.key) {
				FormValidator.registerField(field);
			}
			var type = (field.schema || {}).type || '';
			var format = (field.schema || {}).format || '';

			// Remove title from items if format of array is 'table'
			if (type === 'array' && format === 'table') {
				(angular.isArray(field.items) && field.items || []).forEach(function(item) {
					item.notitle = true;
				});
			}
		});
		return form;
	};
}
configureSchemaFormPreprocessor.$inject = ['FormValidator', 'SCHEMA_FORM_PREPROCESSOR'];
