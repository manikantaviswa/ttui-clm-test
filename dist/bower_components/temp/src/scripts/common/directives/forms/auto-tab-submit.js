'use strict';

var module = angular.module('TT-UI.Common.Directives.Forms');

function autoTabSubmit() {
	return {
		restrict: 'A',
		replace: false,
		scope: false,
		require: '^autoTabForm',
		link: function(scope, element, attr, ctrl) {
			var buttonCounter = ctrl.counter.buttons++;

			scope.$watch(function() {
				return ctrl.counter.fields;
			}, function() {
				element.attr('tabindex', ctrl.counter.fields + buttonCounter);
			});
		}
	};
}

module.directive(autoTabSubmit.name, autoTabSubmit);
