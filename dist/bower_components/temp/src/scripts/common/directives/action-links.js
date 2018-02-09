'use strict';

angular.module('TT-UI.Common.Directives.ActionLinks', [
	'TT-UI.Common.States'
])

.directive('actionLinks', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,

		scope: true,

		controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
			$scope.links  = [];
			$scope.params = {};

			var unbound = $scope.$on('$stateChangeSuccess', function() {
				$scope.links.length = 0;

				var state = $state.$current;

				while (state.parent) {
					if (state.name.indexOf('.') === -1) {
						break;
					}

					state = state.parent;
				}

				if (state && state.children) {
					state.children.forEach(function(state) {
						if (state.url && state.label && !state.ownParams.length && !state.aside) {
							$scope.links.push(state);
						}
					});
				}
			});

			$scope.params = $stateParams;

			$scope.$on('$destroy', unbound);
		}],

		template:
			'<ul class="shortcuts">' +
				'<li ng-repeat="state in links">' +
					'<a href="{{state.url.format(params)}}" ui-sref="{{state.name}}({{params}})" data-action="{{state.data.action}}" ng-bind="state.label"></a>' +
				'</li>' +
			'</ul>'
	};
});
