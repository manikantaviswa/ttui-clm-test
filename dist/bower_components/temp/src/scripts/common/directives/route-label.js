'use strict';

angular.module('TT-UI.Common.Directives.RouteLabel', [
	'ui.router'
])

.directive('routeLabel', function(translateFilter) {
	return {
		restrict: 'A',
		transclude: true,

		controller: ['$scope', '$state', function($scope, $state) {
			$scope.currentState = {
				label: ''
			};

			$scope.currentStateRefreshToggle = false;

			var unbound = $scope.$on('$stateChangeSuccess', function() {
				var state = $state.$current,
					currentState;

				while (state) {
					if (state.label && state.url && !state.isStep) {
						currentState = state;
						break;
					}

					state = state.parent;
				}

				$scope.currentState = currentState;
				$scope.currentStateRefreshToggle = !$scope.currentStateRefreshToggle;

			});

			$scope.$on('$destroy', unbound);
		}],

		link: function(scope, element) {
			scope.$watch( function(scope) {
				return scope.currentState && scope.currentState.label ? scope.currentStateRefreshToggle : null;
			}, function() {
				element.text(translateFilter(scope.currentState.label));
			});
		}
	};
});
