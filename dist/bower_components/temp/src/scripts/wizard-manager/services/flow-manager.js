	'use strict';

var module = angular.module('TT-UI.WizardManager.Services.FlowManager', [
	'ui.router',
	'TT-UI.WizardManager.Config',
	'TT-UI.WizardManager.Services.StatesHelper'
]);

function FlowManagerProvider($stateProvider, $provide, StatesHelperProvider, FLOW_MANAGER_CONFIG) {
	var flows = [];

	var provider = this;

	var requiredConfig = [
		'name', 'service', 'state', 'url', 'entryState', 'exitState', 'stepsStates'
	];

	var mainState;
	this.setMainState = function(stateName) {
		mainState = stateName;
	};

	this.getMainState = function() {
		return mainState || FLOW_MANAGER_CONFIG.MAIN_STATE;
	};

	this.registerFlow = function(flow) {
		var flowName;

		if (angular.isString(flow)) {
			flow = angular.extend(arguments[1], {
				name: flow
			});
		}

		flowName = flow.name;

		requiredConfig.forEach(function(config) {
			if (!flow.hasOwnProperty(config)) {
				throw new Error('Flow Manager: flow configuration "' + config + '" is missing for flow "' + flowName + '"');
			}
		});

		if (!angular.isObject(flow.stepsStates) || angular.isArray(flow.stepsStates)) {
			throw new Error('Flow Manager: Flow "' + flowName + '" steps configuration is not an object');
		}

		var flowViews = flow.views || {};
		StatesHelperProvider.setStateNameAtViews(FLOW_MANAGER_CONFIG.WIZARD_STATE, flowViews);

		$stateProvider.state(flow.state, {
			parent: FLOW_MANAGER_CONFIG.WIZARD_STATE,
			url: flow.url,
			label: flow.label,
			views: flowViews
		});

		flows.push(flow);

		return this;
	};

	this.getFlows = function() {
		return flows;
	};

	function FlowManagerFactory($log, $state, $q, $injector, $rootScope, StatesHelper, FLOW_MANAGER_CONFIG) {
		var flowsNames = [];
		var currentFlow;

		provider.getFlows()
			.map(initFlowService, this)
			.forEach(setFlowService, this);

		function initFlowService(flow) {
			var serviceName = flow.service;

			if (angular.isUndefined(serviceName) || !$injector.has(serviceName)) {
				throw new Error('Flow service "' + serviceName + '" for given flow is missing');
			}

			var FlowFactory = $injector.get(serviceName);

			var service = new FlowFactory(
				flow.name,
				flow.label,
				flow.state,
				flow.entryState,
				flow.exitState,
				flow.stepsStates
			);

			$provide.value(service.getName(), service);

			return service;
		}

		function setFlowService(flow) {
			flowsNames.push(flow.getName());
		}

		function redirectToFirstStep(e, toState) {
			if (toState.parent && toState.parent === FLOW_MANAGER_CONFIG.WIZARD_STATE) {
				e.preventDefault();

				$state.go(getEntryState(), null, {
					reload: true
				});
			}
		}

		function setCurrentFlowListener(e, state) {
			return setCurrentFlow(state);
		}

		function setCurrentFlow(state) {
			currentFlow = null;

			var flowStateName = StatesHelper.stateBelongsToFlow(state.name, FLOW_MANAGER_CONFIG.WIZARD_STATE);

			if (!flowStateName) {
				return;
			}

			if (!flowsNames.length) {
				$log.error('There are none registered flows');
			}

			flowsNames.some(function(flowName) {
				var flow = $injector.get(flowName);

				if (flowStateName === flow.getFlowStateName() && flow.isValid()) {
					currentFlow = flow;
				}

				return currentFlow;
			});

			if (!hasFlow()) {
				$log.error('Can not find valid flow');
			}
		}

		function getFlowName() {
			return currentFlow.getName();
		}

		function getWizardSteps() {
			return currentFlow.getWizardSteps();
		}

		function getCurrentFlow() {
			return hasFlow() ? currentFlow : null;
		}

		function getCurrentStateName() {
			return $state.$current.name;
		}

		function hasFlow() {
			return !!currentFlow;
		}

		function getNextStepState() {
			return currentFlow.getNextStepState(getCurrentStateName());
		}

		function getPrevStepState() {
			return currentFlow.getPrevStepState(getCurrentStateName());
		}

		function processNextStep() {
			return $q.when(currentFlow.processNextStep(getCurrentStateName(), collectData()));
		}

		function processPrevStep() {
			return currentFlow.store(getCurrentStateName(), collectData());
		}

		function isSubmitStep() {
			return currentFlow.isSubmitStep(getCurrentStateName());
		}

		function showPersistButton() {
			return currentFlow.showPersistButton(getCurrentStateName());
		}

		function showCancelButton() {
			return currentFlow.showCancelButton(getCurrentStateName());
		}

		function isFullscreenStep() {
			return currentFlow.isFullscreenStep(getCurrentStateName());
		}

		function showWizardSteps() {
			return currentFlow.showWizardSteps(getCurrentStateName());
		}

		function start() {
			currentFlow.clearValidity();
			return $q.when(currentFlow.start(getCurrentStateName()));
		}

		function cancel() {
			currentFlow.clearValidity();
			return $q.when(currentFlow.cancel(getCurrentStateName()));
		}

		function finish() {
			return $q.when(currentFlow.finish());
		}

		function submit() {
			return processNextStep();
		}

		function resume(state, data) {
			setCurrentFlow(state);
			currentFlow.clearValidity();

			return $q.when(currentFlow.resume(data));
		}

		function persist() {
			return $q.when(currentFlow.persist(getCurrentStateName()))
				.then(function(results) {
					currentFlow.clearValidity();
					return results;
				});
		}

		function getEntryState() {
			return currentFlow.getEntryState();
		}

		function getExitState() {
			return currentFlow.getExitState();
		}

		function setCurrentStateValidity(e, isValid, error) {
			return currentFlow.setCurrentStateValidity(getCurrentStateName(), isValid, error);
		}

		function getValidators(stepName) {
			return currentFlow.getValidators(stepName || getCurrentStateName());
		}

		function getPayload(){
			return currentFlow.getPayload();
		}

		function getPopulatedStepsSchema(){
			return currentFlow.getPopulatedStepsSchema();
		}

		function getActionLabel(action){
			return currentFlow.getActionLabel(getCurrentStateName(), action);
		}

		function isFooterExtended(){
			return currentFlow.isFooterExtended(getCurrentStateName());
		}

		function collectData() {
			var data = {};

			$rootScope.$emit(FLOW_MANAGER_CONFIG.STEP_COLLECT_DATA_EVENT, data);

			return data;
		}

		return {
			setCurrentFlow: setCurrentFlow,
			setCurrentFlowListener: setCurrentFlowListener,
			getCurrentFlow: getCurrentFlow,
			getFlowName: getFlowName,
			redirectToFirstStep: redirectToFirstStep,
			getWizardSteps: getWizardSteps,
			hasFlow: hasFlow,
			getNextStepState: getNextStepState,
			getPrevStepState: getPrevStepState,
			isSubmitStep: isSubmitStep,
			showPersistButton: showPersistButton,
			showCancelButton: showCancelButton,
			isFullscreenStep: isFullscreenStep,
			showWizardSteps: showWizardSteps,
			processNextStep: processNextStep,
			processPrevStep: processPrevStep,
			getValidators: getValidators,
			collectData: collectData,
			start: start,
			cancel: cancel,
			submit: submit,
			resume: resume,
			persist: persist,
			finish: finish,
			getPayload: getPayload,
			getPopulatedStepsSchema: getPopulatedStepsSchema,
			getEntryState: getEntryState,
			getExitState: getExitState,
			setCurrentStateValidity: setCurrentStateValidity,
			getActionLabel: getActionLabel,
			isFooterExtended: isFooterExtended
		};
	}

	this.$get = FlowManagerFactory;
	this.$get.$inject = ['$log', '$state', '$q', '$injector', '$rootScope' , 'StatesHelper', 'FLOW_MANAGER_CONFIG'];
}
FlowManagerProvider.$inject = ['$stateProvider', '$provide', 'StatesHelperProvider', 'FLOW_MANAGER_CONFIG'];
module.provider('FlowManager', FlowManagerProvider);
