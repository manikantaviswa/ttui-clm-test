'use strict';

var module = angular.module('TT-UI.WizardManager.Directives.Wizard', [
	'ui.router',
	'pascalprecht.translate',
	'TT-UI.WizardManager.Config'
]);

function wizard(FLOW_MANAGER_CONFIG) {
	var DIRECTIVE_URL = FLOW_MANAGER_CONFIG.BASE_URL + 'views/directives/';

	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		controller: ['$scope', '$state', function($scope, $state) {
			$scope.steps = [];

			var steps = $scope.steps;
			var stateName;

			this.selectStep = function(step) {
				steps.forEach(function(step) {
					step.selected = false;
				});

				stateName = step.state.name;
				step.selected = true;

				$state.go(stateName);
			};

			this.addStep = function(step) {
				steps.push(step);
			};
		}],

		templateUrl: DIRECTIVE_URL + 'wizard.tpl.html'

	};
}
wizard.$inject = ['FLOW_MANAGER_CONFIG'];
module.directive('wizard', wizard);

function wizardStep(FLOW_MANAGER_CONFIG, $log, $parse, $state) {
	var DIRECTIVE_URL = FLOW_MANAGER_CONFIG.BASE_URL + 'views/directives/';

	return {
		restrict: 'E',
		replace: true,
		require: '^wizard',
		scope: true,
		link: function(scope, element, attrs, wizardController) {
			scope.state = $state.get(attrs.name);
			scope.disabled = $parse(attrs.disabled)();

			if (!scope.state) {
				$log.error('Missing state definition for state named "' + attrs.name + '"');
			}

			wizardController.addStep(scope);

			scope.select = function() {
				wizardController.selectStep(scope);
			};

			scope.isStepSelected = function(stateName) {
				return $state.includes(stateName);
			};

			scope.isStateDisabled = function() {
				return scope.disabled;
			};

			attrs.$observe('disabled', function(disabled) {
				scope.disabled = $parse(disabled)();
			});
		},

		templateUrl: DIRECTIVE_URL + 'wizard-step.tpl.html'
	};
}
wizardStep.$injector = ['FLOW_MANAGER_CONFIG', '$log', '$parse', '$state'];
module.directive('wizardStep', wizardStep);
