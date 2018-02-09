'use strict';

var module = angular.module('TT-UI.Common.Directives.Forms');

function schemaValidate() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, $element, $attribute, ngModelCtrl) {
			$scope.$on('schemaFormValidate', function() {
				// reset committed value and validation results before re-validate
				if(ngModelCtrl) {
					Object.keys(ngModelCtrl.$error).forEach(function(key) {
						ngModelCtrl.$setValidity(key, true);
					});
					ngModelCtrl.$$lastCommittedViewValue = Number.NaN;
				}
			});
		}
	};
}

module.directive(schemaValidate.name, schemaValidate);
