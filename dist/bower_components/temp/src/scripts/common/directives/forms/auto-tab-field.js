'use strict';

var module = angular.module('TT-UI.Common.Directives.Forms');

function autoTabField() {
	return {
		restrict: 'A',
		replace: false,
		scope: false,
		require: '^autoTabForm',
		link: function(scope, element, attr, ctrl) {
			if (!scope.form.required) {
				return;
			}

			element.attr('tabindex', ++ctrl.counter.fields);
		}
	};
}

module.directive(autoTabField.name, autoTabField);
