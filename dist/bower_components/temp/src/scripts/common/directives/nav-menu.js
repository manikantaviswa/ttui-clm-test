'use strict';

angular.module('TT-UI.Common.Directives.NavMenu', [
	'TT-UI.Common.States',
	'TT-UI.Common.Translate'
])

.directive('navMenu', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,

		scope: {
			state: '@'
		},

		controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
			$scope.links      = [];
			$scope.asideLinks = [];
			$scope.params     = $stateParams;

			$scope.goTo = function(state) {
				$state.go(state.name, $stateParams, {
					reload: true,
					notify: !state.locale
				});
			};

			var foundState = $state.$current,
				found = false,
				findChildren;

			// Find up to the root
			while (foundState.parent) {
				foundState = foundState.parent;

				if (foundState.name === $scope.state) {
					found = true;
					break;
				}
			}

			// Find in children
			if (!found) {
				findChildren = function(state) {
					if (state.name === $scope.state) {
						foundState = state;
						found = true;
					}

					if (!found && state.children && state.children.length) {
						found = state.children.some(findChildren);
						return found;
					}

					return found;
				};

				findChildren(foundState);
			}

			if (found) {
				$scope.links.length = 0;
				$scope.asideLinks.length = 0;

				if (foundState.children) {
					foundState.children.forEach(function(state) {
						if (state.label) {
							state.aside ? $scope.asideLinks.push(state) : $scope.links.push(state);
						}
					});
				}
			}

			$scope.isStateActive = function(state) {
				return $state.$current.includes[state.name];
			};
		}],

		template:
			'<nav class="main-menu">' +
				'<ul>' +
					'<li ng-repeat="state in links" ng-class="{selected: isStateActive(state), home: state.name === \'home\'}">' +
						'<a href="#{{state.url.format(params)}}" ng-click="goTo(state); $event.preventDefault()" ng-bind="state.label"></a>' +
					'</li>' +
				'</ul>' +

				'<div class="right">' +
					'<a ng-repeat="state in asideLinks" href="#{{state.url.format(params)}}" ng-click="goTo(state); $event.preventDefault()" class="{{state.className}}" title="{{state.label | translate}}" data-action="{{state.data.action}}" data-role="{{state.data.role}}"></a>' + // TODO: Fix title
				'</div>' +
			'</nav>'
	};
});
