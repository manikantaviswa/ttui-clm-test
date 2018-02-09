'use strict';

angular.module('TT-UI.Common.Services.Flow', ['TT-UI.Common.Helpers.XhrHelper'])

.factory('FlowFactory', ['$log', '$q', 'XhrHelper', function($log, $q, XhrHelper) {

	var FlowFactory = function(entryState, exitState, states) {
		this._entryState = entryState;
		this._exitState  = exitState;
		this._states = states;
	};

	FlowFactory.prototype._isStateVisible = function(stateName) {
		var states = this.getStates();

		if (!states.hasOwnProperty(stateName)) {
			$log.error('Missing state', stateName);
			return false;
		}
		var options = states[stateName];
		var isAvailable =  options === null ? true : options.visible;

		return isAvailable !== false;
	};

	FlowFactory.prototype._findRelativeNextState = function(currentState, relative) {
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
			.filter(this._isStateVisible, this)
			.some(getNextVisibleState, this);

		return nextState;
	};

	FlowFactory.prototype.getNextStepState = function(currentState) {
		return this._findRelativeNextState(currentState, false);
	};

	FlowFactory.prototype.getPrevStepState = function(currentState) {
		return this._findRelativeNextState(currentState, true);
	};

	FlowFactory.prototype.getValidators = function(stateName){
		var states = this.getStates();
		if (!states.hasOwnProperty(stateName)) {
			return $q.reject('Missing state :' + stateName);
		}
		var validatorsUrls = angular.isArray(states[stateName].validators) ? states[stateName].validators : [];
		return $q.all(validatorsUrls.map(XhrHelper.loadJsonDeferred));
	};

	FlowFactory.prototype.getStates = function() {
		return this._states;
	};

	FlowFactory.prototype.getEntryState = function() {
		return this._entryState;
	};

	FlowFactory.prototype.getExitState = function() {
		return this._exitState;
	};

	FlowFactory.prototype.start = function() {
		this.clear();
		return this.getEntryState();
	};

	FlowFactory.prototype.getSubmitState = function() {
		$log.error('isSubmitStep method must be implemented');
	};

	FlowFactory.prototype.clear = function() {
		$log.error('clear method must be implemented');
	};

	FlowFactory.prototype.resume = function() {
		throw new Error('resume method must be implemented');
	};

	FlowFactory.prototype.persist = function() {
		throw new Error('persist method must be implemented');
	};

	FlowFactory.prototype.store = function() {
		throw new Error('store method must be implemented');
	};

	FlowFactory.prototype.submit = function() {
		throw new Error('submit method must be implemented');
	};

	FlowFactory.prototype.cancel = function() {
		throw new Error('cancel method must be implemented');
	};

	FlowFactory.prototype.finish = function () {
		throw new Error('finish method must be implemented');
	};

	FlowFactory.prototype.isValid = function() {
		throw new Error('isValid method must be implemented');
	};

	return FlowFactory;
}]);
