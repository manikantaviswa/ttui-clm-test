'use strict';

var module = angular.module('TT-UI.WizardManager.Services.StepsManager', [
	'ui.router',
	'TT-UI.WizardManager.Config',
	'TT-UI.WizardManager.Services.FlowManager',
	'TT-UI.WizardManager.Services.StatesHelper'
]);

function StepsManagerProvider($stateProvider, StatesHelperProvider, FlowManagerProvider, FLOW_MANAGER_CONFIG) {
	var steps = {};

	this.addStep = function(definition) {
		var stepName;

		if (angular.isString(definition)) {
			definition = angular.extend(arguments[1], {
				name: definition
			});
		}

		stepName = definition.name;
		definition.isStep = true;

		if (angular.isObject(definition.views)) {
			StatesHelperProvider.setStateNameAtViews(FLOW_MANAGER_CONFIG.WIZARD_STATE, definition.views);
		}

		if (steps.hasOwnProperty(stepName)) {
			throw new Error('Wizard Manager: given step name is already registerd "' + stepName + '"');
		}

		steps[stepName] = definition;
	};

	this.$get = function() {
		function registerFlowsSteps()  {
			var stepsNames = Object.keys(steps);

			function addFlowStep(flowStateName, stepName) {
				if (!steps.hasOwnProperty(stepName)) {
					throw new Error('Wizard Manager: given step name is not registerd "' + stepName + '"');
				}

				var step = steps[stepName];
				$stateProvider.state(flowStateName + '.' + stepName, angular.copy(step));
			}

			function addStateToStep(flowsStepsNames, flowStateName, stepName) {
				var parentStep = steps[stepName].parent;
				var hasParent = angular.isString(parentStep) && -1 !== flowsStepsNames.indexOf(parentStep);

				if (!hasParent) {
					return;
				}

				var step = angular.copy(steps[stepName]);
				step.parent = flowStateName + '.' + parentStep;
				$stateProvider.state(flowStateName + '.' + stepName, step);
			}

			function setFlowStates(flow) {
				var flowStateName = angular.isString(flow.state) ? flow.state : flow.state.name;
				var flowsStepsNames = Object.keys(flow.stepsStates);

				flowsStepsNames.forEach(addFlowStep.bind(null, flowStateName));

				stepsNames.forEach(addStateToStep.bind(null, flowsStepsNames, flowStateName));
			}

			FlowManagerProvider
				.getFlows()
				.forEach(setFlowStates);
		}

		return {
			registerFlowsSteps: registerFlowsSteps
		};
	};
}

StepsManagerProvider.$inject = ['$stateProvider', 'StatesHelperProvider', 'FlowManagerProvider', 'FLOW_MANAGER_CONFIG'];
module.provider('StepsManager', StepsManagerProvider);

function run(StepsManager) {
	StepsManager.registerFlowsSteps();
}
run.$inject = ['StepsManager'];
module.run(run);
