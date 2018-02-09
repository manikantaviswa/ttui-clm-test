describe('Controller: LoginCtrl ', function() {
	'use strict';

	var LoginCtrl;
	var $rootScope;
	var $state;
	var StateHistory;

	var FAKE_CONFIG = {
		SSO_OAUTH_URI: 'fooSsoUri',
		SSO_OAUTH_URI_PATH: 'fooSsoUriPath',
		SSO_OAUTH_CLIENT_ID: 'fooSsoClientId',
		SSO_OAUTH_REDIRECT_URI: 'fooSsoRedirectUri',
		SSO_OAUTH_SCOPE: 'fooSsoScope',
		SSO_OAUTH_STATE: 'fooSsoState',
		SSO_PROFILE_URI: 'fooProfileUri',
		SSO_OAUTH_RESPONSE_TYPE: 'code'
	};

	var viewUrl = '';

	beforeEach(function() {
		angular.mock.module('TT-UI.Auth.Controllers.Login');

		angular.mock.inject(function($injector) {
			$rootScope	 = $injector.get('$rootScope');
			$state		 = $injector.get('$state');
			StateHistory = $injector.get('StateHistory');

			var $controller = $injector.get('$controller');

			LoginCtrl = $controller('LoginCtrl', {
				CONFIG:  FAKE_CONFIG,
				viewUrl: viewUrl
			});
		});
	});

	describe('state setup:', function(){
		var state;

		beforeEach(function(){
			state = 'login';
			$state.go(state);
			$rootScope.$digest();
		});
		it('should respond to URL', function() {
			expect($state.href(state)).toEqual('#/login/');
		});

		it('should define label for state', function() {
			expect($state.current.label).toEqual('Login');
		});

		it('should allow for an unauthenticated access ', function() {
			expect($state.current.data.authenticatedAccess).toEqual(false);
		});

		it('should provide controller for main view LoginCtrl ', function() {
			expect($state.current.views['@'].controller).toEqual('LoginCtrl as login');
		});

		it('should provide template for main view ', function() {
			expect($state.current.views['@'].templateUrl).toMatch(/login\.tpl\.html$/);
		});
	});

	it('should expose getSsoUri method', function() {
		expect(LoginCtrl.getSsoUri()).toEqual('fooSsoUri');
	});

	it('should expose getSsoUriPath method', function() {
		expect(LoginCtrl.getSsoUriPath()).toEqual('fooSsoUriPath');
	});

	it('should expose getSsoClientId method', function() {
		expect(LoginCtrl.getSsoClientId()).toEqual('fooSsoClientId');
	});

	it('should expose getSsoRedirectUri method', function() {
		expect(LoginCtrl.getSsoRedirectUri()).toEqual('fooSsoRedirectUri');
	});

	it('should expose getSsoScope method', function() {
		expect(LoginCtrl.getSsoScope()).toEqual('fooSsoScope');
	});

	it('should expose getSsoState method', function() {
		expect(LoginCtrl.getSsoState()).toEqual('fooSsoState');
	});

	it('should expose getSsoProfileUri method', function() {
		expect(LoginCtrl.getSsoProfileUri()).toEqual('fooProfileUri');
	});

	it('should expose getSsoTemplate method', function() {
		expect(LoginCtrl.getSsoTemplate()).toMatch(/.*\.tpl\.html$/);
	});

	it('should expose getSsoResponseType method', function() {
		expect(LoginCtrl.getSsoResponseType()).toEqual('code');
	});
});
