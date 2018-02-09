describe('Service: OAuthUserInfo ', function() {
	'use strict';

	var Permissions;
	var $state;
	var $timeout;
	var $stateProvider;
	var $rootScope;
	var CurrentUser;
	var FlashMessage;
	var FAKE_CONFIG = {
		HOME_STATE: 'foo-home-state'
	};

	beforeEach(function() {
		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', FAKE_CONFIG);
		});

		angular.mock.module('TT-UI.User');

		angular.mock.module(function(_$stateProvider_) {
			$stateProvider = _$stateProvider_;
		});

		angular.mock.inject(function ($injector) {
			$stateProvider.state('mockState', {
				url: 'mockState',
				label: 'mockState',
				permission: 'registerRetailCustomer',
				template: '<h1>registerRetailCustomer</h1>'
			});
			Permissions = $injector.get('Permissions');
			$state = $injector.get('$state');
			$timeout = $injector.get('$timeout');
			$rootScope = $injector.get('$rootScope');
			CurrentUser = $injector.get('CurrentUser');
			FlashMessage = $injector.get('FlashMessage');

			$state.go('mockState');
			$rootScope.$digest();
		});
	});

	it('should redirect and show FlashMessage when user doesn\'t have permission', function () {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name',
			'family_name': 'family_name',
			'preferred_username': 'preferred_username',
			permissions: 'clm.reg.api.*,clm.360D.api.*,clm.360D.api.*',
			'given_name': 'given_name'
		};
		spyOn($state, 'go');
		spyOn(FlashMessage, 'show');

		// when
		CurrentUser.populateData(apiResponse);
		$timeout.flush();

		// then
		expect($state.go).toHaveBeenCalledWith(FAKE_CONFIG.HOME_STATE);
		expect(FlashMessage.show).toHaveBeenCalled();
	});

	it('should stay on state when user has permission', function () {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name',
			'family_name': 'family_name',
			'preferred_username': 'preferred_username',
			permissions: 'registerRetailCustomer,clm.360D.api.*,clm.360D.api.*',
			'given_name': 'given_name'
		};
		spyOn($state, 'go');
		spyOn(FlashMessage, 'show');

		// when
		CurrentUser.populateData(apiResponse);
		$timeout.flush();

		// then
		expect($state.go).toHaveBeenCalled();
		expect($state.go).not.toHaveBeenCalledWith(FAKE_CONFIG.HOME_STATE);
		expect(FlashMessage.show).not.toHaveBeenCalled();
	});

	it('state shouldn\'t been loaded when we don\'t get permissions', function () {
		// given
		spyOn($state, 'go');

		// when
		$rootScope.$digest();

		// then
		expect($state.current.url).toBe('^');
		expect($state.go).not.toHaveBeenCalled();
	});

	it('state should be loaded when it hasn\'t any permission and permissions are not loaded', function () {
		// given
		$stateProvider.state('mockState2', {
			url: 'mockStateWithoutPermission',
			label: 'mockStateWithoutPermission',
			template: '<h1>registerRetailCustomer</h1>'
		});

		// when
		$state.go('mockState2');
		$rootScope.$digest();

		// then
		expect($state.current.url).toBe('mockStateWithoutPermission');
	});


});
