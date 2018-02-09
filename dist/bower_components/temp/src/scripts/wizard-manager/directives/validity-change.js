'use strict';

var module = angular.module('TT-UI.WizardManager.Directives.ValidityChange', []);

function validityChange() {
	return {
		restrict: 'A',
		require: '^form',
		link: function(scope, element, attr, ctrl) {
			scope.$watch(function() {
				return ctrl.$valid;
			}, function() {
				scope.$eval(attr.validityChange, {
					isValid: ctrl.$valid,
					errors:  ctrl.$error
				});
			});
		}
	};
}

module.directive('validityChange', validityChange);
