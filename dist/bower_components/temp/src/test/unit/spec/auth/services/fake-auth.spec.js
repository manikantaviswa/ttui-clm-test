'use strict';

var FakeAuth, $rootScope;
var dummy = {
	logout: function(){},
	loggedOut: function(){},
	authorized: function(){}
};

describe('Service: FakeAuth ', function() {
	beforeEach(function() {
		angular.mock.module('TT-UI.Auth.Services.FakeAuth');

		angular.mock.inject(function(_FakeAuth_, _$rootScope_) {
			FakeAuth = _FakeAuth_;
			$rootScope = _$rootScope_;
		});
	});

	it('Should check if FakeAuth service exists', function() {
		expect(!!FakeAuth).toBe(true);
		expect(FakeAuth).toEqual(jasmine.any(Object));
	});

	it('Should check if FakeAuth service has an implementation for "logout", "isAuthenticationRequired", "isAuthorized" methods', function() {
		expect(!!FakeAuth.logout).toBe(true);
		expect(!!FakeAuth.isAuthenticationRequired).toBe(true);
		expect(!!FakeAuth.isAuthorized).toBe(true);

		expect(FakeAuth.logout).toEqual(jasmine.any(Function));
		expect(FakeAuth.isAuthenticationRequired).toEqual(jasmine.any(Function));
		expect(FakeAuth.isAuthorized).toEqual(jasmine.any(Function));
	});

	it('Should check if "isAuthenticationRequired", "isAuthorized" methods return true values', function() {
		expect(FakeAuth.isAuthenticationRequired()).toBe(true);
		expect(FakeAuth.isAuthorized()).toBe(true);
	});

	it('Should check if "logout" triggers "oauth:logout" and "oauth:loggedOut" events', function() {
		//given
		$rootScope.$on('oauth:logout', function(){
			dummy.logout();
		});

		$rootScope.$on('oauth:loggedOut', function(){
			dummy.loggedOut();
		});

		spyOn(dummy, 'logout');
		spyOn(dummy, 'loggedOut');

		//when
		FakeAuth.logout();

		//then
		expect(dummy.logout).toHaveBeenCalled();
		expect(dummy.loggedOut).toHaveBeenCalled();
	});

	it('Should check if "isAuthorized" triggers "oauth:authorized" event', function() {
		//given
		$rootScope.$on('oauth:authorized', function(){
			dummy.authorized();
		});

		spyOn(dummy, 'authorized');

		//when
		FakeAuth.isAuthorized();

		//then
		expect(dummy.authorized).toHaveBeenCalled();
	});
});

describe('Interceptor', function() {

	var httpProvider;

	it('Should register FakeApiInterceptor only if CONFIG.AUTH_MODULE is set to FakeAuth', function() {

		// given
		var FAKE_CONFIG = {
			AUTH_MODULE: 'FakeAuth'
		};
		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', FAKE_CONFIG);
		});
		angular.mock.module('TT-UI.Auth.Services.OAuth');
		angular.mock.module('TT-UI.Auth.Services.FakeAuth');
		angular.mock.module(function($httpProvider) {
			httpProvider = $httpProvider;
		});

		// when
		angular.mock.inject();

		// then
		expect(httpProvider.interceptors).toContain('FakeApiInterceptor');

	});

	it('Should NOT register FakeApiInterceptor if CONFIG.AUTH_MODULE is NOT set to FakeAuth', function() {
	
		// given
		var FAKE_CONFIG = {
			AUTH_MODULE: 'Other'
		};
		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', FAKE_CONFIG);
		});
		angular.mock.module('TT-UI.Auth.Services.OAuth');
		angular.mock.module('TT-UI.Auth.Services.FakeAuth');
		angular.mock.module(function($httpProvider) {
			httpProvider = $httpProvider;
		});

		// when
		angular.mock.inject();

		// then
		expect(httpProvider.interceptors).not.toContain('FakeApiInterceptor');

	});

});