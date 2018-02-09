'use strict';

angular.module('TT-UI.Common.Directives.Toggle', [])

.directive('toggle', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		require: '^ngModel',

		scope: {
			ngModel: '=',
			on: '=?'
		},

		link: function($scope, element) {
			$scope.on = angular.isDefined($scope.on) ? $scope.on : false;

			element.find('input[type="checkbox"]').prop('checked', $scope.on);
			$scope.ngModel = $scope.on;
		},

		template: function() {
			var randomStr = function() {
				return Date.now().toString(32) + Math.random().toString(32);
			}, toggleId = 'toggle-' + randomStr();

			return '<div class="toggle-on-off">' +
				'<input type="checkbox" id="' + toggleId + '" ng-model="ngModel" />'  +
				'<label for="' + toggleId + '"></label>' +
			'</div>';
		}
	};
});
