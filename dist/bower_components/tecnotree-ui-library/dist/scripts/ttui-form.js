/*! TT-UI Lib 0.6.24.19 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-form';
}

(function (window, angular, undefined) {
	"use strict";


// Source: src/scripts/form/config.js
var module = angular.module('TT-UI.Form.Config', []);

function FORM_CONFIG() {
	return {
		BASE_URL: 'scripts/form/' // Slash at the end
	};
}

module.constant('FORM_CONFIG', FORM_CONFIG());


// Source: src/scripts/form/directives/field-model-autopopulate.js
var module = angular.module('TT-UI.Form.Directives.FieldModelAutopopulate', [
	'schemaForm',
	'TT-UI.Common.Filters.RegExpFilter'
]);

function autopopulateTo($log, escapeFilter) {
	var arrayItemRegExp = /\[\]/;

	var indexSubstitute = '%%index%%';
	var arrayIndexSubstitute = '\\[[0-9]+\\]';

	function getNgModel(formCtrl, ngModelName) {
		var ngModel = formCtrl && getNestedModel(formCtrl, ngModelName);

		if (angular.isUndefined(ngModel) || angular.isUndefined(ngModel.$name)) {
			$log.warn('Autopopulate: Missing "' + ngModelName + '" ngModel field');
		}

		return ngModel;
	}

	function isNgModelInitialized(ngModel) {
		return !(angular.isNumber(ngModel.$modelValue) && isNaN(ngModel.$modelValue));
	}

	function getNestedModel(formCtrl, ngModelName) {
		if (formCtrl && angular.isUndefined(formCtrl[ngModelName]) && ngModelName.match(/\./)) {
			var splited = ngModelName.split('.');
			var formName = splited[0];

			return getNestedModel(formCtrl[formName], splited.slice(1).join('.'));
		}

		return formCtrl && formCtrl[ngModelName];
	}

	function isNgModelNameAnArray(ngModelName) {
		return arrayItemRegExp.test(ngModelName);
	}

	function createNgModelNamesGetter(formCtrl, ngModelName) {
		var regExp = escapeFilter(ngModelName.replace(arrayItemRegExp, indexSubstitute));
		var ngModelRegExp = new RegExp('^' + regExp.replace(indexSubstitute, arrayIndexSubstitute) + '$');

		return function() {
			return Object.keys(formCtrl)
				.filter(isAngularPropertyName)
				.filter(function(ngModelName) {
					return ngModelRegExp.test(ngModelName);
				});
		};
	}

	function isAngularPropertyName(prop) {
		return prop[0] !== '$';
	}

	function syncTargetField(formCtrl, targetNgModelName, sourcePrevViewValue, value) {
		var targetNgModel = getNgModel(formCtrl, targetNgModelName);

		if (!targetNgModel) {
			return;
		}

		if (isTargetFieldInSync(targetNgModel, sourcePrevViewValue)) {
			updateTargetField(targetNgModel, angular.copy(value));
		}

		return value;
	}

	function isTargetFieldInSync(targetNgModel, sourcePrevViewValue){
		var value = targetNgModel.$viewValue;

		if (targetNgModel.$touched){
			return false;
		} else {
			return isFieldEmpty(value) || angular.equals(value, sourcePrevViewValue.value);
		}
	}

	function isFieldEmpty(fieldValue){
		return angular.isUndefined(fieldValue) || fieldValue === null;
	}

	function updateTargetField(targetNgModel, value){
		targetNgModel.$setViewValue(value);
		targetNgModel.$commitViewValue();
		targetNgModel.$render();
	}

	function syncAllTargetFields(formCtrl, targetNgModelName, sourcePrevViewValue, value) {
		var getNgModelNamesFn = createNgModelNamesGetter(formCtrl, targetNgModelName);

		getNgModelNamesFn().forEach(function(ngModelName) {
			syncTargetField(formCtrl, ngModelName, sourcePrevViewValue, value);
		});

		return value;
	}

	function getPopulateFn(formCtrl, targetNgModelName, sourcePrevViewValue) {
		return isNgModelNameAnArray(targetNgModelName) ?
			syncAllTargetFields.bind(syncAllTargetFields, formCtrl, targetNgModelName, sourcePrevViewValue) :
			syncTargetField.bind(syncTargetField, formCtrl, targetNgModelName, sourcePrevViewValue);
	}

	function getSourceViewValue(sourceNgModel) {
		return {
			value: sourceNgModel.$viewValue
		};
	}

	function initNgModelPopulation(formCtrl, sourceNgModel, scope, targetNgModelName) {
		var sourcePrevViewValue = getSourceViewValue(sourceNgModel);
		var populateFn = getPopulateFn(formCtrl, targetNgModelName, sourcePrevViewValue);

		return scope.$watch(function(){
			return sourceNgModel.$modelValue;
		}, function(value){
			if (angular.isUndefined(value)){
				return;
			}

			populateFn(sourceNgModel.$viewValue);
			sourcePrevViewValue.value = sourceNgModel.$$lastCommittedViewValue;
		});
	}

	function getRootForm(formCtrl) {
		while (angular.isDefined(formCtrl.$$parentForm) && angular.isDefined(formCtrl.$$parentForm.$name)) {
			formCtrl = formCtrl.$$parentForm;
		}

		return formCtrl;
	}

	return {
		require: ['ngModel', '^form'],
		restrict: 'A',
		priority: 500,
		scope: false,
		link: function postLink(scope, element, attrs, ctrls) {
			var sourceNgModel = ctrls[0];
			var formCtrl = getRootForm(ctrls[1]);

			var attrName = 'autopopulateTo';
			var form = scope.$eval(attrs[attrName]);
			var targetNgModelNames = form && form.autopopulateTo;

			if (!angular.isArray(targetNgModelNames)) {
				return;
			}

			var unwatch;
			var unwatchOnDestroy = [];

			function assignWatchesToNgModels() {
				unwatch();

				targetNgModelNames.forEach(function(targetNgModelName){
					var watcher = initNgModelPopulation(formCtrl, sourceNgModel, scope, targetNgModelName);
					unwatchOnDestroy.push(watcher);
				});
			}

			unwatch = scope.$watch(function() {
				return isNgModelInitialized(sourceNgModel);
			}, assignWatchesToNgModels);

			scope.$on('$destroy', function(){
				unwatchOnDestroy.forEach(function(watcher){
					watcher();
				});
			});
		}
	};
}
autopopulateTo.$inject = ['$log', 'escapeFilter'];

module.directive('autopopulateTo', autopopulateTo);


// Source: src/scripts/form/directives/field-model-populate.js
var module = angular.module('TT-UI.Form.Directives.FieldModelPopulate', [
	'schemaForm'
]);

function populateTo($log, $injector, $parse, VALIDATION_EVENTS) {

	function populateFields(scope, formCtrl, populateTo, data) {
		data = data || {};

		populateTo.forEach(function(field) {
			field.key = updateFieldKey(scope, field.key);

			var ngModel = formCtrl[field.key];
			var value = $parse(field.source)(data, {
				results: data
			});

			if (angular.isUndefined(ngModel)) {
				$log.error('Populate directive: Can not find field for path "' + field.key + '"');
				return;
			}

			ngModel.$$autopopulated = true;
			ngModel.$setViewValue(value);
			ngModel.$render();
		});

		formCtrl.$commitViewValue();
		scope.$broadcast(VALIDATION_EVENTS.VALIDATE);
	}

	function updateFieldKey(scope, key) {
		var arrayIndex = scope && scope.arrayIndex;
		if (!angular.isNumber(arrayIndex)) {
			return key;
		}
		return key.replace(/\[arrayIndex\]/, '[' + arrayIndex + ']');
	}

	function listener(scope, ngModel, formCtrl, actionFn, populateTo, chainingEnabled) {
		if (chainingEnabled || !ngModel.$$autopopulated) {
			var populateFn = populateFields.bind(populateFields, scope, formCtrl, populateTo);
			actionFn(ngModel.$modelValue, scope.model)
				.then(populateFn)
				.catch(populateFn);
		} else {
			ngModel.$$autopopulated = false;
		}
	}

	function getService(serviceName) {
		if (!$injector.has(serviceName)) {
			return false;
		}

		return $injector.get(serviceName);
	}

	function getServiceFn(service, actionName) {
		var actionFn = service[actionName];

		if (!angular.isFunction(actionFn)) {
			return false;
		}

		return actionFn;
	}

	return {
		require: ['ngModel', '^form'],
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs, ctrls) {
			var ngModel = ctrls[0];
			var formCtrl = ctrls[1];

			var attrName = 'populateTo';
			var form = scope.$eval(attrs[attrName]);
			var populateConfig = form && form.populate;

			if (angular.isUndefined(populateConfig)) {
				return;
			}

			var chainingEnabled = angular.isUndefined(populateConfig.chainingEnabled) || populateConfig.chainingEnabled;
			var service = getService(populateConfig.service);
			var actionFn = getServiceFn(service, populateConfig.action);
			if (!actionFn) {
				$log.error('Populate directive: Service "' + populateConfig.service + '" or action "' + populateConfig.action + '" can not be invoked');
				return;
			}

			ngModel.$viewChangeListeners.push(listener.bind(
				listener, scope, ngModel, formCtrl, actionFn.bind(service), populateConfig.populateTo, chainingEnabled
			));
		}
	};
}
populateTo.$inject = ['$log', '$injector', '$parse', 'VALIDATION_EVENTS'];
module.directive('populateTo', populateTo);


// Source: src/scripts/form/directives/field-reload-options.js
var module = angular.module('TT-UI.Form.Directives.FieldReloadOptions', [
	'schemaForm'
]);

function reloadOptions($log, $injector, $q) {
	function isNgModelInitialized(ngModel) {
		return !(angular.isNumber(ngModel.$modelValue) && isNaN(ngModel.$modelValue));
	}

	function getNgModelName(arrayIndex, ngModelExpName) {
		return ngModelExpName.replace('[arrayIndex]', '[' + arrayIndex + ']');
	}

	function ngModelHasValue(watchedNgModels, ngModelExpName) {
		var ngModel = watchedNgModels[ngModelExpName];
		return angular.isDefined(ngModel.$modelValue);
	}

	function getService(serviceName) {
		if (!$injector.has(serviceName)) {
			return false;
		}

		return $injector.get(serviceName);
	}

	function getServiceFn(service, actionName) {
		var actionFn = service[actionName];

		if (!angular.isFunction(actionFn)) {
			return false;
		}

		return actionFn;
	}

	function collectNgModels(arrayIndex, formCtrl, ngModelExpNames) {
		return ngModelExpNames.reduce(function(ngModels, ngModelExpName) {
			var ngModelName = getNgModelName(arrayIndex, ngModelExpName);
			ngModels[ngModelExpName] = formCtrl[ngModelName];
			return ngModels;
		}, {});
	}

	function collectValues(ngModels) {
		return Object.keys(ngModels).reduce(function(values, ngModelName) {
			var ngModel = ngModels[ngModelName];
			values[ngModelName] = ngModel.$modelValue;
			return values;
		}, {});
	}

	function updateFieldValue(ngModel, value) {
		ngModel.$setViewValue(value);
		ngModel.$commitViewValue();
	}

	function updateFieldValues(form, formModel, ngModel, updateFn, data) {
		data = data || {};

		if (form.type === 'text' || form.type === 'number') {
			updateFieldValue(ngModel, updateFn(ngModel, formModel, data));
		} else {

			updateFn(ngModel, form, data);

			if (angular.isArray(ngModel.$viewValue)) {

				var validOptions = ngModel.$viewValue.filter(function(item) {
					return angular.isArray(form.titleMap) && form.titleMap.some(function(opt) {
						return angular.equals(opt.value, item);
					});
				});

				if (validOptions.length !== ngModel.$viewValue.length) {
					updateFieldValue(ngModel, validOptions);
				}

			} else {
				var hasValue = angular.isArray(form.titleMap) && form.titleMap.some(function(opt) {
					return angular.equals(opt.value, ngModel.$viewValue);
				});

				// Workaround for problem with Angular not updating model when options list have changed
				if (angular.isDefined(ngModel.$modelValue) && !hasValue) {
					updateFieldValue(ngModel);
				}

				// Trigger re-validation when field seems to have proper value
				else if (ngModel.$invalid) {
					ngModel.$validate();
				}

			}

			// Selecting default option from returned data
			if (angular.isUndefined(ngModel.$modelValue)){
				angular.isArray(data) && data.some(function(option, index){
					if (option.default || (index === 0 && form.reload.preselectFirst)){
						updateFieldValue(ngModel, option.code);

						return true;
					}
					return false;
				});
			}
		}
	}

	function disableField(form) {
		form.readonly = true;
	}

	function enableField(form) {
		if (form.type === 'text' || form.type === 'number') {
			form.readonly = false;
		} else {
			form.readonly = form.titleMap.length ? false : true;
		}
	}

	function triggerReload(form, formModel, watchedNgModels, ngModel, fetchFn, updateFn) {
		var values = collectValues(watchedNgModels);
		var updateFieldValuesFn = updateFieldValues.bind(updateFieldValues, form, formModel, ngModel, updateFn);

		disableField(form);

		$q.when(fetchFn(formModel, values))
			.then(updateFieldValuesFn)
			.catch(updateFieldValuesFn)
			.finally(enableField.bind(enableField, form));
	}

	function setFieldViewWatch(watchedNgModels, reloadFn, ngModelExpName) {
		var watchedNgModel = watchedNgModels[ngModelExpName];
		watchedNgModel.$viewChangeListeners.push(reloadFn);
	}

	return {
		require: ['ngModel', '^form'],
		restrict: 'AC',
		priority: 500,
		scope: false,
		link: function postLink(scope, element, attrs, ctrls) {
			var ngModel = ctrls[0];
			var formCtrl = ctrls[1];

			var attrName = 'reloadOptions';
			var form = scope.$eval(attrs[attrName]);
			var reloadConfig = form && form.reload;

			if (angular.isUndefined(reloadConfig)) {
				return;
			}

			var service = getService(reloadConfig.service);
			var fetchFn = getServiceFn(service, reloadConfig.fetchAction);
			var updateFn = getServiceFn(service, reloadConfig.updateAction);

			if (!fetchFn) {
				$log.error('Reload directive: Service "' + reloadConfig.service + '" or fetch function "' + reloadConfig.fetchAction + '" can not be invoked');
				return;
			}

			if (!updateFn) {
				$log.error('Reload directive: Service "' + reloadConfig.service + '" or update function "' + reloadConfig.updateAction + '" can not be invoked');
				return;
			}

			var ngModelExpNames = reloadConfig.watch;
			var unwatch;

			function checkNgModelsAreReady(scope) {
				return ngModelExpNames
					.map(getNgModelName.bind(getNgModelName, scope.arrayIndex))
					.every(function(ngModelName) {
						return formCtrl.hasOwnProperty(ngModelName) && isNgModelInitialized(formCtrl[ngModelName]);
					});
			}

			function assignWatchesToNgModels(hasFields) {
				if (!hasFields) {
					return;
				}
				unwatch();

				var watchedNgModels = collectNgModels(scope.arrayIndex, formCtrl, ngModelExpNames);
				var triggerReloadFn = triggerReload.bind(triggerReload, form, scope.model, watchedNgModels, ngModel, fetchFn.bind(service), updateFn.bind(service));

				if (ngModelExpNames.every(ngModelHasValue.bind(ngModelHasValue, watchedNgModels))) {
					triggerReloadFn();
				}

				ngModelExpNames.forEach(
					setFieldViewWatch.bind(setFieldViewWatch, watchedNgModels, triggerReloadFn)
				);
			}

			unwatch = scope.$watch(checkNgModelsAreReady, assignWatchesToNgModels);
		}
	};
}
reloadOptions.$injector = ['$log', '$injector', '$q'];
module.directive('reloadOptions', reloadOptions);


// Source: src/scripts/form/field-validation-config.js
function FIELD_VALIDATOR_CONFIG() {
	return {};
}

// Create module if not defined
try { angular.module('TT-UI.FieldValidator.Config'); } catch(err) {
	var module = angular.module('TT-UI.FieldValidator.Config', []);

	module.constant('FIELD_VALIDATOR_CONFIG', FIELD_VALIDATOR_CONFIG());
}


// Source: src/scripts/form/filters/form-filter.js
var module = angular.module('TT-UI.Form.Filters.FormFilter', [
	'schemaForm'
]);

function formFilter (
	$injector,
	$log
) {
	return function(input, scope, model, form) {
		var result;

		if (form.filter){
			result = applyFilter(form.filter, input, scope, model);
		}

		return result || input;
	};

	function applyFilter(filterName, input, scope, model){
		var filter = getFilter(filterName);

		if (filter){
			return filter(input, scope, model);
		}
	}

	function getFilter(filterName) {
		try {
			return $injector.get(filterName + 'Filter');
		} catch (e){
			$log.error('No filter with the given name found: ' + filterName);
		}
	}
}

formFilter.$inject = [
	'$injector',
	'$log'
];
module.filter('form', formFilter);


// Source: src/scripts/form/module.js
angular.module('TT-UI.Form', [
	'TT-UI.Form.Config',
	'TT-UI.Form.Directives.FieldModelAutopopulate',
	'TT-UI.Form.Directives.FieldModelPopulate',
	'TT-UI.Form.Directives.FieldReloadOptions',
	'TT-UI.Form.Filters.FormFilter'
]);

return angular;
})(window, window.angular);