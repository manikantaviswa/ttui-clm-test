'use strict';

angular.module('TT-UI.Common.Directives.Breadcrumbs', [
	'ui.router'
])

.directive('breadcrumbs', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,

		scope: true,

		controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
			$scope.path   = [];
			$scope.params = $stateParams;
			$scope.goTo   = function(state) {
				$state.go(state.name, $stateParams, {reload: true});
			};

			var unbound = $scope.$on('$stateChangeSuccess', function() {
				$scope.path.length = 0;

				$state.$current.path.some(function(state)  {
					if (!state.url || !state.label || state.modal || state.aside) {
						return true;
					}

					$scope.path.push(state);
				});
			});

			$scope.$on('$destroy', unbound);
		}],

		template:
			'<ul class="breadcrumbs">' +
				'<li ng-repeat="state in path">' +
					'<a href="#{{state.url.format(params)}}" ng-click="goTo(state); $event.preventDefault()" ng-bind="state.label"></a>' +
				'</li>' +
			'</ul>'
	};
});
