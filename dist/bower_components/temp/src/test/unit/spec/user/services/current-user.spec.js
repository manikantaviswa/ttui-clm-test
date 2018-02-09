'use strict';

var CurrentUser;

describe('CurrentUser ', function() {
	var $rootScope;

	beforeEach(function() {
		angular.mock.module('TT-UI.User.Services.CurrentUser');

		angular.mock.inject(function($injector) {
			CurrentUser = $injector.get('CurrentUser');
			$rootScope = $injector.get('$rootScope');
		});
	});

	it('Should check if CurrentUser service exists', function() {
		expect(!!CurrentUser).toBe(true);
		expect(CurrentUser).toEqual(jasmine.any(Object));
	});

	it('should provide null as user data whe user is not defined', function(){
		// given
		CurrentUser.clearData();

		// when
		var userData = CurrentUser.get();

		// then
		expect(userData).toEqual(null);
	});

	it('Should retrive user data', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name',
			'family_name': 'family_name',
			'preferred_username': 'preferred_username',
			'given_name': 'given_name',
			'organization': 'Organization test name'
		};
		CurrentUser.populateData(apiResponse);

		// when
		var userDetials = CurrentUser.get();

		// then
		expect(Object.getOwnPropertyNames(userDetials)).toEqual([
			'userName', 'loginName', 'location', 'salesChannel', 'lastLoginTime', 'currentLoginTime', 'organization', 'group'
		]);
	});


	it('Should populate user given name', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name',
			'family_name': 'family_name',
			'preferred_username': 'preferred_username',
			'given_name': 'given_name'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		/* jshint camelcase: false */
		expect(CurrentUser.getGivenName()).toEqual(apiResponse.given_name);
	});

	it('Should populate user name when given name not exist', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		expect(CurrentUser.getGivenName()).toEqual(apiResponse.name);
	});

	it('Should populate user family name', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name',
			'family_name': 'family_name',
			'preferred_username': 'preferred_username',
			'given_name': 'given_name'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		/* jshint camelcase: false */
		expect(CurrentUser.getFamilyName()).toEqual(apiResponse.family_name);
	});

	it('Should populate user name when family name not exist', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		expect(CurrentUser.getFamilyName()).toEqual(apiResponse.name);
	});

	it('Should populate user full name', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name',
			'family_name': 'family_name',
			'preferred_username': 'preferred_username',
			'given_name': 'given_name'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		/* jshint camelcase: false */
		expect(CurrentUser.getFullName()).toEqual(apiResponse.given_name + ' ' + apiResponse.family_name);
	});

	it('Should get user group.', function() {
		// given
		var apiResponse = {
			group: 'someGroup'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		/* jshint camelcase: false */
		expect(CurrentUser.getUserGroup()).toEqual('someGroup');
	});

	it('Should populate user name when family and given name not exist', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		expect(CurrentUser.getFullName()).toEqual(apiResponse.name);
	});

	it('Should populate user last login time when logint_ime available in response', function() {
		// given
		/* jshint camelcase: false */
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name',
			login_time: '20160228153752Z,20160228153141Z'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		expect(CurrentUser.getLastLoginTime()).toEqual('Sun, 28 Feb 2016 15:31:41 GMT');
	});

	it('Should populate user last login time as null when logintime is not available in response', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		/* jshint camelcase: false */
		expect(CurrentUser.getLastLoginTime()).toEqual(null);
	});

	it('Should populate user last login time as null when logintime is available but no last login details in response', function() {
		// given
		/* jshint camelcase: false */
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name',
			login_time: '20160228153752Z,'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		expect(CurrentUser.getLastLoginTime()).toEqual(null);
	});

	it('Should populate user current login time when logintime available in response', function() {
		// given
		/* jshint camelcase: false */
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name',
			login_time: '20160228153752Z,20160228153141Z'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		expect(CurrentUser.getCurrentLoginTime()).toEqual('Sun, 28 Feb 2016 15:37:52 GMT');
	});

	it('Should populate user current login time as null when logintime is not available in response', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		/* jshint camelcase: false */
		expect(CurrentUser.getCurrentLoginTime()).toEqual(null);
	});

	it('Should populate user current login time as null when logintime is available but no current login time in response', function() {
		// given
		/* jshint camelcase: false */
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name',
			login_time: ',20160228153141Z'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		expect(CurrentUser.getCurrentLoginTime()).toEqual(null);
	});

	it('Should populate user login', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'Bangalore',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'test',
			'family_name': 'yyy',
			'preferred_username': 'test',
			'given_name': 'test'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		/* jshint camelcase: false */
		expect(CurrentUser.getLoginName()).toEqual(apiResponse.preferred_username);
	});

	it('Should populate user login as null when preferred_username is not provided', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'Bangalore',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'test',
			'family_name': 'yyy',
			'given_name': 'test'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		expect(CurrentUser.getLoginName()).toEqual(null);
	});

	it('Should populate user permissions', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'Bangalore',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			permissions: 'clm.reg.api.*,clm.360D.api.*,clm.360D.api.*',
			name: 'test',
			'family_name': 'yyy',
			'preferred_username': 'test',
			'given_name': 'test'
		};
		CurrentUser.populateData(apiResponse);
		var results;

		// when
		CurrentUser.getPermissions().then(function(permissions) {
			results = permissions;
		});
		$rootScope.$digest();

		// then
		expect(results).toEqual(['clm.reg.api.*', 'clm.360D.api.*', 'clm.360D.api.*']);
	});

	it('Should populate user permissions as [] when permissions are not provided', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'Bangalore',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'test',
			'family_name': 'yyy',
			'preferred_username': 'test',
			'given_name': 'test'
		};
		var results;
		CurrentUser.populateData(apiResponse);

		// when
		CurrentUser.getPermissions().then(function(permissions) {
			results = permissions;
		});
		$rootScope.$digest();

		// then
		expect(results).toEqual([]);
	});

	it('Should populate location when location exist', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		expect(CurrentUser.getUserLocation()).toEqual(apiResponse.location);
	});

	it('Should populate location as null when location is not provided', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		expect(CurrentUser.getUserLocation()).toEqual(null);
	});

	it('Should populate sales channel as CLM', function() {
		// given
		var apiResponse = {};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		expect(CurrentUser.getSalesChannel()).toEqual('CLM');
	});

	it('should get permissions if they are already fetched', function () {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'Bangalore',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			permissions: 'clm.reg.api.*,clm.360D.api.*,clm.360D.api.*',
			name: 'test',
			'family_name': 'yyy',
			'preferred_username': 'test',
			'given_name': 'test'
		};
		CurrentUser.populateData(apiResponse);
		var results;
		$rootScope.$digest();

		// when
		CurrentUser.getPermissionsV2().then(function(permissions) {
			results = permissions;
		});

		$rootScope.$digest();

		// then
		expect(results).toEqual(['clm.reg.api.*', 'clm.360D.api.*', 'clm.360D.api.*']);
	});

	it('should get permissions for multiple asks if they are already fetched', function () {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'Bangalore',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			permissions: 'clm.reg.api.*,clm.360D.api.*,clm.360D.api.*',
			name: 'test',
			'family_name': 'yyy',
			'preferred_username': 'test',
			'given_name': 'test'
		};
		CurrentUser.populateData(apiResponse);
		var results, secondResults;
		$rootScope.$digest();

		// when
		CurrentUser.getPermissionsV2().then(function(permissions) {
			results = permissions;
		});

		$rootScope.$digest();

		CurrentUser.getPermissionsV2().then(function(permissions) {
			secondResults = permissions;
		});

		$rootScope.$digest();

		// then
		expect(results).toEqual(['clm.reg.api.*', 'clm.360D.api.*', 'clm.360D.api.*']);
		expect(secondResults).toEqual(['clm.reg.api.*', 'clm.360D.api.*', 'clm.360D.api.*']);
	});

	it('should get unresolved deffered if permitions are not yet fetched', function () {
		// given
		$rootScope.$digest();

		// when
		var results;
		var deferred = CurrentUser.getPermissionsV2().then(function(permissions) {
			results = permissions;
		});

		$rootScope.$digest();

		// then
		expect(deferred.$$state.status).toEqual(0); //0 = pending
	});

	it('should resolve unresolved main user deferred', function () {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'Bangalore',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			permissions: 'clm.reg.api.*,clm.360D.api.*,clm.360D.api.*',
			name: 'test',
			'family_name': 'yyy',
			'preferred_username': 'test',
			'given_name': 'test'
		};

		var results;

		$rootScope.$digest();

		// when
		CurrentUser.populateData(apiResponse);
		CurrentUser.getPermissionsV2().then(function(permissions) {
			results = permissions;
		});

		$rootScope.$digest();

		// then
		expect(results).toEqual(['clm.reg.api.*', 'clm.360D.api.*', 'clm.360D.api.*']);
	});

	it('Should populate organization when organization exist', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			location: 'location',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name',
			organization: 'Organization test name'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		expect(CurrentUser.getOrganization()).toEqual(apiResponse.organization);
	});

	it('Should populate organization as null when organization is not provided', function() {
		// given
		var apiResponse = {
			email: 'test@nova.dev',
			roles: 'NOVA.DEV\/ssh-users-ldap,NOVA.DEV\/Users-ldap,NOVA.DEV\/wheel-ldap,Internal\/everyone',
			name: 'name'
		};

		// when
		CurrentUser.populateData(apiResponse);

		// then
		expect(CurrentUser.getOrganization()).toEqual(null);
	});
});
