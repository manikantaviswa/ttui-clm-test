'use strict';

describe('Service: StateHistory', function () {

// instantiate service
	var $rootScope, StateHistory, STATE_HISTORY_CONFIG, $window;

	var FAKE_CONFIG = {
		SSO_REVOKE_TOKEN_URI: 'revokeToken/?{{tokenType}}={{tokenValue}}',
		SSO_OAUTH_CLIENT_ID: 'fakeClientId',
		SSO_OAUTH_REDIRECT_URI: 'fakeRedirectUrl',
		SSO_OAUTH_URI: 'fakeOauth'
	};

	var fakeOauth = {
		logout: function() {}
	};

	beforeEach(function() {
		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', FAKE_CONFIG);
		});
		angular.mock.module('TT-UI.Auth', function($provide) {
			$provide.constant('OAuth', fakeOauth);
		});
		angular.mock.module('TT-UI.Auth.Services.StateHistory');

		angular.mock.inject(function($injector) {
			$rootScope     = $injector.get('$rootScope');
			$window        = $injector.get('$window');
			StateHistory   = $injector.get('StateHistory');
			STATE_HISTORY_CONFIG = $injector.get('STATE_HISTORY_CONFIG');
		});

		// Removes any previous stored state
		StateHistory.removePreviousState();
	});

	it('should save previous state', function() {
		// given
		var currentState = {
			name: 'currentState'
		};

		var nextState = {
			name: 'nextState'
		};

		// when
		StateHistory.setPreviousState(currentState, nextState);

		// then
		expect(StateHistory.getPreviousStateName()).toEqual(currentState.name);
	});

	it('should save fallback state when state is null or undefined', function() {
		// given
		var dummyState = {
			name: ''
		};
		var fallbackState = {
			name: 'fallbackState'
		};

		// when
		StateHistory.setPreviousState(dummyState, fallbackState);

		// then
		expect(StateHistory.getPreviousStateName()).toEqual(fallbackState.name);
	});

	it('should clear the previous state when user logs out', function() {
		// given
		var dummyState = {
			name: 'dummyState'
		};
		var fallbackState = {
			name: 'fallbackState'
		};

		// when
		StateHistory.setPreviousState(dummyState, fallbackState);
		$rootScope.logout();

		// then
		expect(StateHistory.getPreviousStateName()).toBeNull();
	});

	it('should not save not allowed state', function() {
		// given
		var dummyNotAllowed = {
			name: 'dummyNotAllowed'
		};
		var fallbackState = {
			name: 'fallbackState'
		};
		STATE_HISTORY_CONFIG.STATES_NOT_FOR_STORE = [dummyNotAllowed.name, fallbackState.name];

		// when
		StateHistory.setPreviousState(dummyNotAllowed, fallbackState);

		// then
		expect(StateHistory.getPreviousStateName()).toBeNull();
	});

	it('should save previous state before leave app', function() {
		// given
		spyOn(StateHistory, 'setPreviousState');

		// when
		StateHistory.saveCurrentState();

		// then
		expect(StateHistory.setPreviousState).toHaveBeenCalled();
	});
});
