'use strict';

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
