'use strict';

var module = angular.module('TT-UI.Common.Directives.DateValidator', [
	'TT-UI.Config',
	'TT-UI.Common.AngularStrap'
]);

function dateValidator(CONFIG, moment) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			var format = attrs.dateFormat || CONFIG.DATE_FORMAT;

			ctrl.$validators.dateValidator = function(modelValue, viewValue) {
				if (ctrl.$isEmpty(modelValue)) {
					return true;
				}

				function isValidByMoment() {
					var momentProvider = moment.getMoment();
					var momentFormat = format.replace(/y/g, 'Y').replace(/d/g, 'D');
					return momentProvider(viewValue, momentFormat, true).isValid();
				}

				if (angular.isDate(viewValue)) {
					return true;
				}
				return isValidByMoment();
			};
		}
	};
}
dateValidator.$inject = ['CONFIG', 'moment'];
module.directive('dateValidator', dateValidator);
