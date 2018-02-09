'use strict';

var module = angular.module('TT-UI.Common.Directives.Forms');

function autoTabForm() {
	return {
		restrict: 'A',
		replace: false,
		scope: false,
		require: '^form',
		controller: ['$scope', function($scope) {
			var counter = this.counter = {
				fields: 0,
				buttons: 0
			};

			$scope.$on('$destroy', function() {
				counter.fields = 0;
				counter.buttons = 0;
			});
		}]
	};
}

module.directive(autoTabForm.name, autoTabForm);
