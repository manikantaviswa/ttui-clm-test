'use strict';

var module = angular.module('TT-UI.Common.Directives.DateInputMask', []);

function dateInputMask() {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function (scope, element, attrs, controller) {
			var $element = $(element);
			$element.mask(attrs.dateInputMaskFormat);
			$element.on('keyup', function () {
				scope.$apply(function(){
					controller.$setViewValue($element.val());
				});
			});
		}
	};
}

module.directive('dateInputMask', dateInputMask);
