'use strict';

var module = angular.module('TT-UI.WizardManager.Controllers.Wizard', [
	'TT-UI.WizardManager.Config',
	'TT-UI.WizardManager.Services.FlowManager',
	'TT-UI.WizardManager.Directives.Wizard'
]);

function stateConfigFn($stateProvider, FlowManagerProvider, FLOW_MANAGER_CONFIG) {
	var viewUrl = FLOW_MANAGER_CONFIG.BASE_URL + 'views/';

	$stateProvider.state(FLOW_MANAGER_CONFIG.WIZARD_STATE, {
		parent: FlowManagerProvider.getMainState(),
		abstract: true,
		views: {
			'@': {
				controller: 'WizardCtrl as wizard',
				templateUrl: viewUrl + 'wizard.tpl.html'
			}
		}
	});
}
stateConfigFn.$inject = ['$stateProvider', 'FlowManagerProvider', 'FLOW_MANAGER_CONFIG'];
module.config(stateConfigFn);

function WizardCtrl($q, $log, $state, $rootScope, $timeout, FlowManager, FLOW_MANAGER_CONFIG) {

	function waitForNextCycle() {
		return $timeout();
	}

	function run(actionFn, actionName) {
		return triggerFlowStepChangeStartEvent(actionName)
			.then(waitForNextCycle)
			.then(actionFn)
			.finally(triggerFlowStepChangeEndEvent.bind(undefined, actionName));
	}

	function exit(result) {
		$state.go(FlowManager.getExitState(), result);
	}

	function triggerFlowStepChangeStartEvent(actionName) {
		return triggerFlowStepChangeEvent(FLOW_MANAGER_CONFIG.STEP_CHANGE_START, actionName);
	}

	function triggerFlowStepChangeEndEvent(actionName) {
		return triggerFlowStepChangeEvent(FLOW_MANAGER_CONFIG.STEP_CHANGE_END, actionName);
	}

	function triggerFlowStepChangeEvent(eventName, actionName) {
		var flowName = FlowManager.getFlowName();
		var event = $rootScope.$emit(eventName, flowName, actionName);

		return event.defaultPrevented ? $q.reject() : $q.resolve();
	}

	var steps = FlowManager.getWizardSteps();

	$rootScope.$on(FLOW_MANAGER_CONFIG.STEP_CHANGE_END, function() {
		steps.length = 0;
		steps.push.apply(steps, FlowManager.getWizardSteps());
	});

	this.getWizardSteps = function() {
		return steps;
	};

	this.hasPrevStep = function() {
		return !!FlowManager.getPrevStepState();
	};

	this.hasNextStep = function() {
		return !!FlowManager.getNextStepState();
	};

	this.showSubmitButton = function() {
		return FlowManager.isSubmitStep();
	};

	this.showPersistButton = function() {
		return FlowManager.showPersistButton();
	};

	this.showCancelButton = function() {
		return FlowManager.showCancelButton();
	};

	this.goToPrevStep = function() {
		if (!this.hasPrevStep()) {
			$log.error('Missing prev step');
			return;
		}
		run(FlowManager.processPrevStep.bind(FlowManager), FLOW_MANAGER_CONFIG.PREV_STEP_ACTION).then(function() {
			$state.go(FlowManager.getPrevStepState());
		});
	};

	this.goToNextStep = function() {
		if (!this.hasNextStep()) {
			$log.error('Missing next step');
			return;
		}
		run(FlowManager.processNextStep.bind(FlowManager), FLOW_MANAGER_CONFIG.NEXT_STEP_ACTION).then(function() {
			$state.go(FlowManager.getNextStepState());
		});
	};

	this.submitFlow = function() {
		if (!this.showSubmitButton()) {
			return;
		}

		run(FlowManager.submit.bind(FlowManager), FLOW_MANAGER_CONFIG.SUBMIT_FLOW_ACTION).then(function(result) {
			var nextState = FlowManager.getNextStepState() || FlowManager.getExitState();
			$state.go(nextState, result);
		});
	};

	this.persistFlow = function() {
		run(FlowManager.persist.bind(FlowManager), FLOW_MANAGER_CONFIG.PERSIST_FLOW_ACTION).then(exit);
	};

	this.cancelFlow = function() {
		run(FlowManager.cancel.bind(FlowManager), FLOW_MANAGER_CONFIG.CANCEL_FLOW_ACTION).then(exit);
	};

	this.finishFlow = function() {
		run(FlowManager.finish.bind(FlowManager), FLOW_MANAGER_CONFIG.FINISH_FLOW_ACTION).then(exit);
	};

	this.isFullscreenStep = function() {
		return FlowManager.isFullscreenStep();
	};

	this.showWizardSteps = function() {
		return FlowManager.showWizardSteps();
	};

	this.getActionLabel = function(action) {
		return FlowManager.getActionLabel(action);
	};

	this.isFooterExtended = function() {
		return FlowManager.isFooterExtended();
	};
}
WizardCtrl.$inject = ['$q', '$log', '$state', '$rootScope', '$timeout', 'FlowManager', 'FLOW_MANAGER_CONFIG'];
module.controller('WizardCtrl', WizardCtrl);
