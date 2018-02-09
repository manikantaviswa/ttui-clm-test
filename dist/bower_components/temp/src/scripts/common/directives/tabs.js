
'use strict';

angular.module('TT-UI.Common.Directives.Tabs', [
	'ui.router',
	'TT-UI.Common.Translate'
])

.directive('tabset', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			viewName: '@'
		},

		controller: ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {
			$scope.templateUrl = '';
			$scope.tabs = [];

			var tabs          = $scope.tabs,
				currentState  = $state.$current,
				stateName     = $state.$current.name,
				parentName    = $state.$current.parent.name,
				autoSelectTab = true,
				controller    = this;

			if (currentState.modal) {
				stateName  = parentName;
				parentName = currentState.parent.parent.name;
			}

			this.selectTab = function(tab, skipChangingState) {
				tabs.forEach(function(tab) {
					tab.selected = false;
				});

				stateName = tab.state;
				tab.selected = true;
				controller.setTabTemplate(tab.templateUrl);

				if (!skipChangingState) {
					$state.go(stateName);
				}
			};

			this.setTabTemplate = function(templateUrl) {
				$scope.templateUrl = templateUrl;
			};

			this.addTab = function(tab) {
				if (stateName === tab.state) {
					controller.selectTab(tab, true);
					autoSelectTab = false;
				}

				tabs.push(tab);
			};

			// Go to state from first tab when loading parent state
			$timeout(function() {
				if (autoSelectTab && tabs.length) {
					controller.selectTab(tabs[0]);
				}
			}, 0);

			// Go to state when changing URI
			var ubound = $scope.$on('$stateChangeSuccess', function(e, state, params, newState) {
				if (state.name === newState.name || state.name === stateName || state.modal) {
					return;
				}

				// Reload state
				var foundTab;

				tabs.some(function(tab) {
					if (tab.state === state.name) {
						foundTab = tab;
						return true;
					}
				});

				controller.selectTab(foundTab || tabs[0], !!foundTab);
			});

			$scope.$on('$destroy', ubound);
		}],

		template:
			'<div class="tabs ui-tabs ui-widget ui-widget-content ui-corner-all">' +
				'<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" ng-transclude></ul>' +
				'<ui-view></ui-view>' +
			'</div>'
	};
})

.directive('tab', function() {
	return {
		restrict: 'E',
		replace: true,
		require: '^tabset',
		scope: {
			title: '@',
			state: '@',
			templateUrl: '@'
		},

		link: function(scope, element, attrs, tabsetController) {
			tabsetController.addTab(scope);

			scope.select = function() {
				tabsetController.selectTab(scope);
			};
		},

		template:
			'<li class="ui-state-default" ng-class="{\'ui-state-active\': selected}">' +
				'<a href="" ng-click="select()" ng-bind="title | translate"></a>' +
			'</li>'
	};
});
