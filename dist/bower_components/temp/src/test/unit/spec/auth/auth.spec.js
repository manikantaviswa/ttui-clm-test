'use strict';

describe('Module: Auth ', function() {
	var $rootScope;
	var $state;
	var $localStorage;
	var OAuth;
	var Storage;
	var StateHistory;
	var AccessToken;
	var FlashMessage;

	beforeEach(function() {
		angular.mock.module('TT-UI.Auth');
		angular.mock.module('TT-UI.Auth.Services.StateHistory');

		angular.mock.inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$state = $injector.get('$state');
			$localStorage = $injector.get('$localStorage');
			OAuth = $injector.get('OAuth');
			Storage = $injector.get('Storage');
			StateHistory = $injector.get('StateHistory');
			AccessToken = $injector.get('AccessToken');
			FlashMessage = $injector.get('FlashMessage');
		});
	});

	it('Should check if Auth module exists', function() {
		expect(!!OAuth).toBe(true);
		expect(typeof OAuth).toEqual('object');
	});

	describe('auth events: ', function() {

		it('should set userAuthorized to true when triggering auth event', function() {
			// given

			// when
			expect($rootScope.userAuthorized).toBe(false);
			$rootScope.$emit('oauth:authorized');

			// then
			expect($rootScope.userAuthorized).toBe(true);
		});

		it('should set userAuthorized to false when triggering logout event', function() {
			// given
			$rootScope.userAuthorized = true;

			// when
			$rootScope.$emit('oauth:logout');

			// then
			expect($rootScope.userAuthorized).toBe(false);
		});

		it('should set userAuthorized to false when triggering loggedOut event', function() {
			// given
			$rootScope.userAuthorized = true;

			// when
			$rootScope.$emit('oauth:loggedOut');

			// then
			expect($rootScope.userAuthorized).toBe(false);
		});

		it('should set userAuthorized to false when triggering denied event', function() {
			// given
			$rootScope.userAuthorized = true;

			// when
			$rootScope.$emit('oauth:denied');

			// then
			expect($rootScope.userAuthorized).toBe(false);
		});

		it('should show flash message for auth error if defined', function () {
			// given
			spyOn(FlashMessage, 'show');

			// when
			$rootScope.$emit('oauth:denied');

			// then
			expect(FlashMessage.show).toHaveBeenCalled();
		});

		// TODO: Test fails on Jenkins when runing on production code (minified)
		xit('should check authorization requirement for each state change', function() {
			// given
			var mockState = {
				name: 'TestAllowedState'
			};
			spyOn(OAuth, 'isAuthenticationRequired');

			// when
			$rootScope.$emit('$stateChangeStart', mockState);
			$rootScope.$apply();

			// then
			expect(OAuth.isAuthenticationRequired).toHaveBeenCalled();
		});

		it('should not check authorization when it is not required', function() {
			// given
			var mockState = {
				name: 'TestAllowedState'
			};
			spyOn(OAuth, 'isAuthenticationRequired').and.returnValue(false);
			spyOn(OAuth, 'isAuthorized');

			// when
			$rootScope.$emit('$stateChangeStart', mockState);
			$rootScope.$apply();

			// then
			expect(OAuth.isAuthorized).not.toHaveBeenCalled();
		});

		// TODO: Test fails on Jenkins when runing on production code (minified)
		xit('should check authorization when it is required', function() {
			// given
			var mockState = {
				name: 'TestAllowedState'
			};
			spyOn(OAuth, 'isAuthenticationRequired').and.returnValue(true);
			spyOn(OAuth, 'isAuthorized').and.returnValue(true);

			// when
			$rootScope.$emit('$stateChangeStart', mockState);
			$rootScope.$apply();

			// then
			expect(OAuth.isAuthorized).toHaveBeenCalled();
		});

		it('should go directly to allowed state', function() {
			// given
			spyOn($state, 'go');

			var mockState = {
				name: 'TestAllowedState',
				data: {
					authenticatedAccess: false
				}
			};

			// when
			$rootScope.$emit('$stateChangeStart', mockState);
			$rootScope.$apply();

			// then
			expect($state.go).not.toHaveBeenCalled();
		});

		it('should use localStorage as OAuth token storage instead of default sessionStorage', function() {
			expect(Storage.storage).toBe($localStorage);
		});

		it('should not clear previous state when accesstoken is destroyed', function() {
			// given
			var dummyState = {
				name: 'dummyState'
			};
			var fallbackState = {
				name: 'fallbackState'
			};

			// when
			StateHistory.setPreviousState(dummyState, fallbackState);
			AccessToken.destroy();

			// then
			expect(StateHistory.getPreviousStateName()).not.toBeNull();
			expect(StateHistory.getPreviousStateName()).toBe(dummyState.name);
		});

		it('should not load login state multiple times', function () {
			// given
			spyOn($state, 'go').and.callThrough();

			// when
			$rootScope.$emit('oauth:logout');
			$rootScope.$digest();
			$rootScope.$emit('oauth:logout');
			$rootScope.$digest();

			// then
			expect($state.go.calls.count()).toBe(1);
		});

	});
});
