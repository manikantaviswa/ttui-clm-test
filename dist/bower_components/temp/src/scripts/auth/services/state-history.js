'use strict';

var module = angular.module('TT-UI.Auth.Services.StateHistory', ['angular-storage']);

module.constant('STATE_HISTORY_CONFIG', {
	STATES_NOT_FOR_STORE: ['login', 'oauth-token', 'oauth-code', 'oauth-update']
});

function StateHistory($rootScope, $window, $state, store, STATE_HISTORY_CONFIG) {

	var LOCAL_STORAGE_KEY = 'previousAppState';

	var isEligibleForStore = function(state){
		if (!state || !state.name){
			return false;
		} else {
			return STATE_HISTORY_CONFIG.STATES_NOT_FOR_STORE.indexOf(state.name) < 0;
		}
	};

	this.setPreviousState = function(state, fallbackState) {
		if (isEligibleForStore(state)){
			store.set(LOCAL_STORAGE_KEY, state.name);
			return state;
		} else if (isEligibleForStore(fallbackState)){
			store.set(LOCAL_STORAGE_KEY, fallbackState.name);
			return fallbackState;
		} else {
			return;
		}
	};

	this.getPreviousStateName = function() {
		return store.get(LOCAL_STORAGE_KEY);
	};

	this.removePreviousState = function() {
		store.remove(LOCAL_STORAGE_KEY);
	};

	this.saveCurrentState  = function(){
		this.setPreviousState($state.current);
	};

	$window.onbeforeunload = this.saveCurrentState.bind(this);

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
		this.setPreviousState(fromState, toState);
	}.bind(this));

}

StateHistory.$inject = ['$rootScope', '$window', '$state', 'store', 'STATE_HISTORY_CONFIG'];
module.service('StateHistory', StateHistory);
