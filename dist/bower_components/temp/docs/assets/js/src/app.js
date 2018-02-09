'use strict';

var module = angular.module('TT-UI.Config', []).constant('CONFIG', {

	API_URL: '@@API_URL',

	VERSION: '@@version',
	INDEX_STATE: 'index',
	ALLOWED_STATES: ['index'],

	LIST_LIMIT: 5,

	MODEL_DATE_FORMAT: 'YYYY-MM-DDT00:00:00.000[Z]', // Angular date filter format
	DATE_FORMAT: 'DD/MM/YYYY',

	//DATETIME_FORMAT: 'DD/MM/YYYY HH:mm:ss',
	LOCALE_PATH: '../assets/lang/', // Slash at the end
	LOCALE_PREFIX: 'locale-',
	LOCALE_SUFFIX: '.json',
	LOCALE_DEFAULT: 'en',
	DATE_PICKER_LOCALE_DATE_FORMAT: 'en',

	LOCALE_DEFAULT_SETTINGS: {
		lang: 'en',
		dateFormat: 'dd/MM/yyyy',
		datePicker: {
			dateFormat: 'DD/MM/YYYY',
			dayFormat: 'D',
			monthFormat: 'MMM',
			yearFormat: 'YYYY',
			monthTitleFormat: 'MMMM YYYY',
			yearTitleFormat: 'YYYY'
		}
	},
	LOCALE_LIST: {
		en: {lang: 'en'},
		pl: {lang: 'pl'},
		fr: {lang: 'fr'},
		fa: {
			lang: 'fa',
			dir: 'rtl',
			dateFormat: 'jDD/jMM/jYYYY',
			datePicker: {
				dateFormat: 'jDD/jMM/jYYYY',
				dayFormat: 'jD',
				monthFormat: 'jMMM',
				yearFormat: 'jYYYY',
				monthTitleFormat: 'jMMMM jYYYY',
				yearTitleFormat: 'jYYYY'
			}
		}
	}
});

module = angular.module('TT-APP.Demo', [
	'ngAnimate',
	'ui.bootstrap.accordion',
	'ui.bootstrap.collapse',
	'uib/template/accordion/accordion-group.html',
	'uib/template/accordion/accordion.html',
	'TT-UI.Config',
	'TT-UI.Common',
	'TT-UI.Common.Tpl',
	'mgcrea.ngStrap.timepicker'
]);

function MultiselectDropdownAppCtrl($scope) {
	$scope.options = [
        { 'name': 'Afganistan', 'value': 'af' },
        { 'name': 'Albania', 'value': 'al' },
        { 'name': 'Andorra', 'value': 'ad' },
        { 'name': 'Angola', 'value': 'ao' },
        { 'name': 'Antigua and Barbuda', 'value': 'ag' },
        { 'name': 'Argentina', 'value': 'ar' },
        { 'name': 'Armenia', 'value': 'am' },
        { 'name': 'Australia', 'value': 'au' },
        { 'name': 'Belgium', 'value': 'be' },
        { 'name': 'Bhutan', 'value': 'bt' },
        { 'name': 'Bolivia', 'value': 'bo' },
        { 'name': 'Bosnia and Herzegovina', 'value': 'ba' },
        { 'name': 'Botswana', 'value': 'bw' },
        { 'name': 'Brazil', 'value': 'br' },
        { 'name': 'Christmas Island', 'value': 'cx' },
        { 'name': 'Colombia', 'value': 'co' },
        { 'name': 'Croatia', 'value': 'hr' },
        { 'name': 'Ecuador', 'value': 'ec' },
        { 'name': 'Fiji', 'value': 'fj' },
        { 'name': 'Finland', 'value': 'fi' }
	];
	$scope.selected = [];
}

MultiselectDropdownAppCtrl.$inject = ['$scope'];
module.controller('MultiselectDropdownAppCtrl', MultiselectDropdownAppCtrl);

function HeaderAppCtrl($scope, $rootScope) {
}

HeaderAppCtrl.$inject = ['$scope', '$rootScope'];
module.controller('HeaderAppCtrl', HeaderAppCtrl);

function ModalWindowsAppCtrl($scope, ModalDialog, ConfirmationDialog) {

	var dialog = ModalDialog();

	$scope.openModal = function() {

		// ConfirmationDialog.confirm('Delete this item?', 'Confirmation', 'ok', false);

		dialog.show({
			scope: {},
			title: 'Confirmation',
			namespace: 'panel-dialog',
			content: '<div>Delete item?</div>', // User content or ContentUrl
			//contentUrl: 'content.tpl.html',
			//footerUrl: 'footer.tpl.html', 
			buttons: [{
				name:'Cancel',
				action: dialog.hide.bind(dialog)
			},
			{
				name: 'OK',
				action: dialog.hide.bind(dialog)
			}]
		});
	};
}

ModalWindowsAppCtrl.$inject = ['$scope', 'ModalDialog', 'ConfirmationDialog'];
module.controller('ModalWindowsAppCtrl', ModalWindowsAppCtrl);

function DateTimePickerAppCtrl($scope) {

}

DateTimePickerAppCtrl.$inject = ['$scope'];
module.controller('DateTimePickerAppCtrl', DateTimePickerAppCtrl);

function CommonAppCtrl($scope, $rootScope, SPINNER_INSIDE_CONFIG, SPINNER_INSIDE_EVENTS) {
	SPINNER_INSIDE_CONFIG.DEFAULT_MESSAGE = null;

	$scope.showSpinner = function() {
		$rootScope.$emit(SPINNER_INSIDE_EVENTS.SHOW);
	}

	$scope.hideSpinner = function() {
		$rootScope.$emit(SPINNER_INSIDE_EVENTS.HIDE);
	}

	$scope.toggle = false;
	$scope.items = ['11111111111', '2222222222', '3333333333', '4444444444', '5555555555', '6666666666', '7777777777', '8888888888', '9999999999', '0000000000'];
	$scope.value = '';

	$scope.setValue = function(item) {
		$scope.value = item;
	};

	$scope.reserve = function(item) {
		$scope.toggle = !$scope.toggle;
		if ($scope.toggle) {
			$scope.showSpinner();
		} else {
			$scope.hideSpinner();
		}
	};
}

CommonAppCtrl.$inject = ['$scope', '$rootScope', 'SPINNER_INSIDE_CONFIG', 'SPINNER_INSIDE_EVENTS'];
module.controller('CommonAppCtrl', CommonAppCtrl);

function doxResize($compile) {
	return {
		restrict: 'A',
		scope: true,
		link: function(scope, element) {
			scope.resize = {};

			var template =
			'<span class="btn-group btn-open-example">' +
			'<button class="btn" ng-click="resize.setMobileSize()"><span class="fa fa-mobile"></span></button>' +
			'<button class="btn" ng-click="resize.setTabletSize()"><span class="fa fa-tablet"></span></button>' +
			'<button class="btn" ng-click="resize.setDesktopSize()"><span class="fa fa-desktop"></span></button>' +
			'</span>';

			var buttons = angular.element(template);

			scope.resize.setMobileSize = function() {
				element.css('max-width', '360px'); // 320px, but lets use 360px
			};

			scope.resize.setTabletSize = function() {
				element.css('max-width', '768px');
			};

			scope.resize.setDesktopSize = function() {
				// 992px, but lets use 1140px
				element.css('max-width', '1140px');
			};

			$compile(buttons)(scope);
			element.prepend(buttons);
			scope.resize.setDesktopSize();
		}
	};
}

doxResize.$inject = ['$compile'];
module.directive('doxResize', doxResize);

module.config(function($translateProvider) {
	$translateProvider.useSanitizeValueStrategy('escaped');
});

function SchemaFormAppCtrl($scope) {
	var vm = this;

	$scope.schema = {
		'$schema': 'http://json-schema.org/draft-04/schema#',
		'type': 'object',
		'required': ['text', 'select'],
		'properties': {
			'text': {
				'key': 'text',
				'type': 'string',
				'minLength': 2
			},
			'select': {
				'key': 'select',
				'type': 'string',
				'enum': ['dr','jr','sir','mrs','mr','NaN','dj']
			}
		}
	};

	$scope.form = [
		{
			'type': 'columns',
			'title': 'FORM TITLE',
			'columns': [
				{
					'items': [
						{
							'key': 'text',
							'type': 'string',
							'title': 'Text',
							'description': 'Type some text'
						},
						{
							'key': 'select',
							'type': 'select',
							'title': 'Select'
						}
					]
				}
			]
		},
		{
			'type': 'submit',
			'title': 'Submit',
			'hidden': true
		}
	];

	$scope.model = {};

	vm.formStatus = 'Form is valid';

	$scope.submitForm = function(form) {
		console.log('SubmitForm');

		$scope.$broadcast('schemaFormValidate');

		// Then we check if the form is valid
		if (form.$valid) {
			// ... do whatever you need to do with your data.
			vm.formStatus = 'Form is valid';
		} else {
			vm.formStatus = 'Form is not valid';
		}
	};
}

SchemaFormAppCtrl.$inject = ['$scope'];
module.controller('SchemaFormAppCtrl', SchemaFormAppCtrl);
