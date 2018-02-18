/*! TT-UI Lib 0.6.24.19 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-wizard-manager';
}

(function (window, angular, undefined) {
	"use strict";


// Source: src/scripts/wizard-manager/change-flow.js
var module = angular.module('TT-UI.WizardManager.ChangeFlow', [
	'TT-UI.WizardManager.Config',
	'TT-UI.WizardManager.Services.FlowManager'
]);

function changeFlow($rootScope, FlowManager, FLOW_MANAGER_CONFIG) {
	$rootScope.$on('$stateChangeStart', FlowManager.setCurrentFlowListener);
	$rootScope.$on('$stateChangeSuccess', FlowManager.redirectToFirstStep);
	$rootScope.$on(FLOW_MANAGER_CONFIG.STEP_VALID_STATUS_EVENT, FlowManager.setCurrentStateValidity);
}
changeFlow.$inject = ['$rootScope', 'FlowManager', 'FLOW_MANAGER_CONFIG'];
module.run(changeFlow);


// Source: src/scripts/wizard-manager/config.js
var module = angular.module('TT-UI.WizardManager.Config', []);

function FLOW_MANAGER_CONFIG() {
	return {
		MAIN_STATE: 'index',
		WIZARD_STATE: 'flow-manager',

		STEP_VALID_STATUS_EVENT: 'stepValidStatus',

		STEP_CHANGE_START: 'flowStepChangeStart',
		STEP_CHANGE_END: 'flowStepChangeEnd',

		STEP_COLLECT_DATA_EVENT: 'stepCollectData',

		PREV_STEP_ACTION: 'prevStepAction',
		NEXT_STEP_ACTION: 'nextStepAction',
		SUBMIT_FLOW_ACTION: 'submitFlowAction',
		PERSIST_FLOW_ACTION: 'persistFlowAction',
		CANCEL_FLOW_ACTION: 'cancelFlowAction',
		FINISH_FLOW_ACTION: 'finishFlowAction',

		BASE_URL: 'scripts/wizard-manager/' // Slash at the end
	};
}

module.constant('FLOW_MANAGER_CONFIG', FLOW_MANAGER_CONFIG());


// Source: src/scripts/wizard-manager/controllers/step-ctrl.js
var module = angular.module('TT-UI.WizardManager.Controllers.StepCtrl', [
	'TT-UI.WizardManager.Config'
]);

function StepCtrl($scope, $rootScope, FLOW_MANAGER_CONFIG) {
	var listeners = [];

	this.on = function(event, listenerFnName){
		listeners.push($rootScope.$on(event, function(){
			if (angular.isFunction(this[listenerFnName])){
				this[listenerFnName].apply(this, arguments);
			}
		}.bind(this)));
	};

	$scope.$on('$destroy', function() {
		listeners.forEach(function(listenerUnbindFn) {
			listenerUnbindFn();
		});
	});

	this.on(FLOW_MANAGER_CONFIG.STEP_COLLECT_DATA_EVENT, 'onCollectData');
	this.on(FLOW_MANAGER_CONFIG.STEP_CHANGE_START, 'onStepChangeStart');
	this.on(FLOW_MANAGER_CONFIG.STEP_CHANGE_END, 'onStepChangeEnd');

	this.formValidityStatusChange = function(isValid, errors) {
		$rootScope.$emit(FLOW_MANAGER_CONFIG.STEP_VALID_STATUS_EVENT, isValid, errors);
	};

	/**
	 * @param {object} event
	 * @param {object} storage - extend this object to populate data
	 */
	this.onCollectData  = function(){};

	/**
	 * @param {object} event
	 */
	this.onStepChangeEnd  = function(){};

	/**
	 * @param {object} event
	 */
	this.onStepChangeStart  = function(){};
}


function stepCtrlFn() {
	return StepCtrl;
}
module.factory('stepCtrlFn', stepCtrlFn);

// Source: src/scripts/wizard-manager/controllers/wizard-ctrl.js
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


// Source: src/scripts/wizard-manager/directives/validity-change.js
var module = angular.module('TT-UI.WizardManager.Directives.ValidityChange', []);

function validityChange() {
	return {
		restrict: 'A',
		require: '^form',
		link: function(scope, element, attr, ctrl) {
			scope.$watch(function() {
				return ctrl.$valid;
			}, function() {
				scope.$eval(attr.validityChange, {
					isValid: ctrl.$valid,
					errors:  ctrl.$error
				});
			});
		}
	};
}

module.directive('validityChange', validityChange);


// Source: src/scripts/wizard-manager/directives/wizard.js
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


// Source: src/scripts/wizard-manager/module.js
angular.module('TT-UI.WizardManager', [
	'TT-UI.WizardManager.Config',
	'TT-UI.WizardManager.ChangeFlow',
	'TT-UI.WizardManager.Controllers.StepCtrl',
	'TT-UI.WizardManager.Controllers.Wizard',
	'TT-UI.WizardManager.Services.FlowManager',
	'TT-UI.WizardManager.Services.WizardFlow',
	'TT-UI.WizardManager.Services.StepsManager',
	'TT-UI.WizardManager.Services.StatesHelper',
	'TT-UI.WizardManager.Directives.ValidityChange',
	'TT-UI.WizardManager.Directives.Wizard'
]);


// Source: src/scripts/wizard-manager/services/flow-manager.js
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


// Source: src/scripts/wizard-manager/services/states-helper.js
var module = angular.module('TT-UI.WizardManager.Services.StatesHelper', [
	'ui.router'
]);

function StatesHelperProvider() {
	var flowViewportRegExp = /^([^@]+)@flow$/;
	var stateWithParentRegExp = /([^\.]+)\.[^\.]+$/;

	function getStateNameAtView(flowManagerStateName, viewName) {
		if (viewName.match(flowViewportRegExp)) {
			return viewName.replace(flowViewportRegExp, '$1@' + flowManagerStateName);
		}

		return viewName;
	}

	function setStateNameAtViews(flowManagerStateName, views) {
		var view;

		Object.keys(views).forEach(function(viewName) {
			view = views[viewName];

			delete views[viewName];

			views[getStateNameAtView(flowManagerStateName, viewName)] = view;
		});
	}

	this.setStateNameAtViews = setStateNameAtViews;

	function StatesHelper($state) {
		function stateBelongsToFlow(stateName, wizardStateName) {
			var hasParentState = stateName.match(stateWithParentRegExp);
			var flowStateName = hasParentState ? hasParentState.pop() : stateName;
			var flowState = $state.get(flowStateName);

			if (!flowState || !flowState.parent || flowState.parent !== wizardStateName) {
				return;
			}

			return flowState.name;
		}

		return {
			stateBelongsToFlow: stateBelongsToFlow
		};
	}
	StatesHelper.$inject = ['$state'];
	this.$get = StatesHelper;
}

module.provider('StatesHelper', StatesHelperProvider);


// Source: src/scripts/wizard-manager/services/steps-manager.js
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


// Source: src/scripts/wizard-manager/services/wizard-flow.js
var module = angular.module('TT-UI.WizardManager.Services.WizardFlow', [
	'ui.router',
	'TT-UI.Common.Services.Flow'
]);

module.constant('WIZARD_FLOW_SETTINGS', {
	NO_STRATEGY: ''
});

function WizardFlowFactory($log, $q, $http, $state, $parse, FlowFactory, WIZARD_FLOW_SETTINGS) {
	var WizardFlow = function(name, label, stateName, entryState, exitState, states) {
		this._name = name;
		this._label = label;
		this._stateName = stateName;
		this._validity = {};

		FlowFactory.call(this, entryState, exitState, states);
	};

	WizardFlow.prototype = Object.create(FlowFactory.prototype);
	WizardFlow.prototype.constructor = WizardFlow;

	WizardFlow.prototype._isStateAvailable = function(stateName) {
		var states = this.getStates();

		if (!states.hasOwnProperty(stateName)) {
			$log.error('Missing state', stateName);
			return false;
		}

		var state = states[stateName];
		var enabled = state.hasOwnProperty('enabled') ? state.enabled : true;

		if (angular.isString(enabled) && angular.isFunction(this[enabled])) {
			return this[enabled].apply(this);
		}

		return enabled;
	};

	WizardFlow.prototype._findRelativeNextState = function(currentState, relative) {
		var stateNames = Object.keys(this.getStates());

		var num = relative ? 1 : -1;
		var nextState;

		var getNextVisibleState = function(stateName, i, visibleStateNames) {
			var prevState = visibleStateNames[i + num];

			if (!currentState) {
				nextState = stateName;
			} else if (prevState === currentState) {
				nextState = stateName;
			}

			return nextState;
		};

		stateNames
			.filter(this._isStateAvailable, this)
			.some(getNextVisibleState, this);

		return nextState;
	};

	WizardFlow.prototype.getName = function() {
		return this._name;
	};

	WizardFlow.prototype.getLabel = function() {
		return this._label;
	};

	WizardFlow.prototype.getFlowStateName = function() {
		return this._stateName;
	};

	WizardFlow.prototype.hasState = function(state) {
		var stateName = this._getStepStateNameFromFlowState(state);

		return this.getStates().hasOwnProperty(stateName);
	};

	WizardFlow.prototype.getWizardSteps = function() {
		var states = this.getStates();

		return Object.keys(states).filter(function(stateName) {
			var state = states[stateName];

			return !!state.visible;
		}).map(function(stateName) {
			return {
				name: this._getFlowStepStateName(stateName),
				enabled: this._isStateAvailable(stateName)
			};
		}.bind(this));
	};

	WizardFlow.prototype.setCurrentStateValidity = function(currentState, valid, error) {
		if (!this.hasState(currentState)) {
			$log.error('Missing state', currentState);
		}

		this._validity[currentState] = {
			valid: valid,
			error: error
		};
	};

	WizardFlow.prototype.isCurrentStepValid = function(currentState) {
		var validity =  this.hasState(currentState) ? this._validity[currentState] : false;

		return (validity && validity.valid) ? $q.when(true) : $q.reject(validity.error || false);
	};

	WizardFlow.prototype.validate = function() {
		var states = this.getWizardSteps();
		var submitState = this.getSubmitState();
		var stepsValidity = this._validity;

		var includeStep = true;

		function filterStates(state) {
			if (includeStep && state.name === submitState) {
				includeStep = false;
			}

			return includeStep && state.enabled;
		}

		function isStepValid(step) {
			var validity = stepsValidity[step.name] || false;
			var isValid = validity ? validity.valid : false;

			if (!isValid) {
				$log.error('Validation: Step is invalid', step.name, validity);
			}

			return isValid;
		}

		var isFlowValid = states
			.filter(filterStates)
			.every(isStepValid);

		return isFlowValid ? $q.when() : $q.reject('Flow is not valid');
	};

	WizardFlow.prototype.clearValidity = function() {
		this._validity = {};
	};

	// Extended
	WizardFlow.prototype.getNextStepState = function(currentState) {
		var stateName = this._getStepStateNameFromFlowState(currentState);
		var nextState = FlowFactory.prototype.getNextStepState.call(this, stateName);

		if (nextState) {
			nextState = this._getFlowStepStateName(nextState);
		}

		return nextState;
	};

	WizardFlow.prototype.getPrevStepState = function(currentState) {
		var stateName = this._getStepStateNameFromFlowState(currentState);
		var prevState = FlowFactory.prototype.getPrevStepState.call(this, stateName);

		if (!prevState || this._isStepAfterSubmitStep(prevState)) {
			return;
		}

		return this._getFlowStepStateName(prevState);
	};

	WizardFlow.prototype._isStepAfterSubmitStep = function(currentState) {
		var submitStep = this.getSubmitState();
		var stateName = currentState;

		do {
			if (stateName === submitStep) {
				return true;
			}
		}
		while (stateName = this._findRelativeNextState(stateName, true));

		return false;
	};

	WizardFlow.prototype.getEntryState = function() {
		var entryState = FlowFactory.prototype.getEntryState.call(this);

		return this._getFlowStepStateName(entryState);
	};

	WizardFlow.prototype.isSubmitStep = function(currentState) {
		var stateName = this._getStepStateNameFromFlowState(currentState);

		return stateName === this.getSubmitState();
	};

	WizardFlow.prototype.showPersistButton = function(currentState) {
		var state = this._getStateConfig(currentState);

		return state && state.hasOwnProperty('persistButton') ? (state.persistButton) : true;
	};

	WizardFlow.prototype.showCancelButton = function(currentState) {
		var state = this._getStateConfig(currentState);

		return state && state.hasOwnProperty('cancelButton') ? (state.cancelButton) : true;
	};

	WizardFlow.prototype.isFullscreenStep = function(currentState) {
		var state = this._getStateConfig(currentState);

		return state && state.hasOwnProperty('fullscreen') ? (state.fullscreen) : false;
	};

	WizardFlow.prototype.showWizardSteps = function(currentState) {
		var state = this._getStateConfig(currentState);

		return state && state.hasOwnProperty('wizardSteps') ? (state.wizardSteps) : true;
	};

	WizardFlow.prototype.getValidators = function(stateName) {
		var state = this._getStateConfig(stateName);

		if (angular.isUndefined(state)) {
			return $q.reject('Missing state :' + stateName);
		}

		if (angular.isUndefined(state.validators)) {
			return $q.when([]);
		}

		function getValidatorsByStrategy(validators, strategy) {
			return angular.isArray(validators[strategy]) ? validators[strategy] : [];
		}

		var validators = getValidatorsByStrategy(state.validators, 'common');
		var strategyValidators = getValidatorsByStrategy(state.validators, this.getStrategy());
		validators = validators.concat(strategyValidators);

		return $q.all(validators.map(function(uri) {
			return $http.get(uri).then(function(response) {
				return response.data;
			});
		}));
	};

	WizardFlow.prototype.getStrategy = function() {
		return WIZARD_FLOW_SETTINGS.NO_STRATEGY;
	};

	WizardFlow.prototype._getStateConfig = function(stateNameWithFlow) {
		var stateName = this._getStepStateNameFromFlowState(stateNameWithFlow);
		var states = this.getStates();
		var state  = states[stateName];

		return state;
	};

	WizardFlow.prototype._getStepStateNameFromFlowState = function(stateNameWithFlow) {
		var state = $state.get(stateNameWithFlow);
		var stateName = (state && state.parent) || stateNameWithFlow;

		var flowState = this.getFlowStateName();
		return stateName.replace(new RegExp('^' + flowState + '\\.'), '');
	};

	WizardFlow.prototype._getFlowStepStateName = function(stepName) {
		var flowState = this.getFlowStateName();

		return [flowState, stepName].join('.');
	};

	WizardFlow.prototype.getPayload = function() {
		throw new Error('getPayload method must be implemented');
	};

	WizardFlow.prototype.getPopulatedStepsSchema = function(){
		throw new Error('getPopulatedStepsSchema method must be implemented');
	};

	WizardFlow.prototype.start = function(){
		throw new Error('start method must be implemented');
	};

	WizardFlow.prototype.processNextStep = function(state, data){
		var actions = this._getStateActions(state);
		var initialValue = $q.when(data);

		if (!angular.isArray(actions) || !actions.length) {
			return initialValue;
		}

		return actions.reduce(function(previous, current){
			return previous.then(function() {
				return this[current].call(this, state, data);
			}.bind(this));
		}.bind(this), initialValue);
	};

	WizardFlow.prototype.getActionLabel = function(state, action) {
		var stateConfig = this._getStateConfig(state);
		var actionLabel = $parse('customLabels.' + action)(stateConfig);
		return actionLabel ? actionLabel : action;
	};

	WizardFlow.prototype.isFooterExtended = function() { // Default value, method to be changed in inherited module
		return false;
	};

	WizardFlow.prototype._getStateActions = function(state){
		var stateConfig = this._getStateConfig(state);
		if (!angular.isArray(stateConfig.nextActions)){
			return [];
		}

		return stateConfig.nextActions.filter(function(action){
			if (!angular.isFunction(this[action])){
				$log.error('action ' + action + ' does not exist in the flow');
				return false;
			}
			return true;
		}.bind(this));
	};

	return WizardFlow;
}
WizardFlowFactory.$inject = ['$log', '$q', '$http', '$state', '$parse', 'FlowFactory', 'WIZARD_FLOW_SETTINGS'];
module.factory('WizardFlow', WizardFlowFactory);

return angular;
})(window, window.angular);