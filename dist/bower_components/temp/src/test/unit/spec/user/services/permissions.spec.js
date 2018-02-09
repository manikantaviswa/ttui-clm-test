'use strict';

describe('Permissions', function() {
	var Permissions;
	var fakePermissions = ['clm-ui.reg.api.*', 'clm-ui.360D.api.*', 'clm.360D.api.*', 'clm.reg.api.customers.RetailRegistration'];
	var fakePermissionsMappingConf = {
		'registerRetailCustomer': 'clm.reg.api.customers.RetailRegistration'
	};

	beforeEach(function() {
		angular.module('fakePermissionsConfig', []).config(['PermissionsProvider', function(PermissionsProvider) {
			PermissionsProvider.setMappings(fakePermissionsMappingConf);
		}]);
		angular.mock.module('TT-UI.User.Services.Permissions');
		angular.mock.module('fakePermissionsConfig');

		angular.mock.inject(function($injector) {
			Permissions = $injector.get('Permissions');
		});
	});

	it('should return false when permission isn\'t on permissions list', function() {
		//given
		var permission = 'fakePermission';

		// when
		var results = Permissions.hasUserPermission(permission, fakePermissions);

		// then
		expect(results).toBe(false);
	});

	it('should return true when permission is on permissions list', function() {
		//given
		var permission = 'registerRetailCustomer';

		// when
		var results = Permissions.hasUserPermission(permission, fakePermissions);

		// then
		expect(results).toBe(true);
	});

	it('should return true when permission is on permissions list', function() {
		//given
		var permission = 'registerRetailCustomer';

		// when
		var results = Permissions.hasUserPermission(permission, fakePermissions);

		// then
		expect(results).toBe(true);
	});

	it('should return false when given permissions list is empty', function() {
		//given
		var permission = 'registerRetailCustomer';

		// when
		var results = Permissions.hasUserPermission(permission, null);

		// then
		expect(results).toBe(false);
	});

	it('should return true when permission satisfies reg exp on permissions list', function() {
		//given
		var fakePermissions = ['clm.reg.api.*', 'clm.360D.api.*', 'clm.360D.api.*'];
		var permission = 'registerRetailCustomer';

		// when
		var results = Permissions.hasUserPermission(permission, fakePermissions);

		// then
		expect(results).toBe(true);
	});

	it('should return true when user has * permission', function() {
		//given
		var fakePermissions = ['*', 'clm.360D.api.*', 'clm.360D.api.*'];
		var permission = 'registerRetailCustomer';

		// when
		var results = Permissions.hasUserPermission(permission, fakePermissions);

		// then
		expect(results).toBe(true);
	});

	it('it should return false if given permissions are not in Array', function() {
		//given
		var fakePermissions = 'not Array';
		var permission = 'registerRetailCustomer';

		// when
		var results = Permissions.hasUserPermission(permission, fakePermissions);

		// then
		expect(results).toBe(false);
	});

	it('should return true when user has * permission and permission isn\'t mapped', function() {
		//given
		var fakePermissions = ['*', 'clm.360D.api.*', 'clm.360D.api.*'];
		var permission = 'notMappedPermission';

		// when
		var results = Permissions.hasUserPermission(permission, fakePermissions);

		// then
		expect(results).toBe(true);
	});

	it('should return false when user has part name of permission', function() {
		//given
		var fakePermissions = ['clm.reg.api.customers.Retail', 'clm.360D.api.*'];
		var permission = 'registerRetailCustomer';

		// when
		var results = Permissions.hasUserPermission(permission, fakePermissions);

		// then
		expect(results).toBe(false);
	});

	it('should return false when user user permissions are in wrong format', function() {
		//given
		var fakePermissions = ['', undefined, null, '0', 333, {}, false, [], 'clm.reg.api.cust', 'clm.360D.api.*'];
		var permission = 'registerRetailCustomer';

		// when
		var results = Permissions.hasUserPermission(permission, fakePermissions);

		// then
		expect(results).toBe(false);
	});

	it('should return true when examined permission ended with * and user has permission path', function() {
		//given
		var fakePermissions = ['registerRetailCustomer.test.blddd.kd', 'anotherPermissionFromBackend'];
		var permission = 'registerRetailCustomer.test.*';

		// when
		var results = Permissions.hasUserPermission(permission, fakePermissions);

		// then
		expect(results).toBe(true);
	});

	it('should return false when permission is shorter than permission with *', function() {
		//given
		var fakePermissions = ['registerRetailCustomer.test', 'anotherPermissionFromBackend'];
		var permission = 'registerRetailCustomer.test.*';

		// when
		var results = Permissions.hasUserPermission(permission, fakePermissions);

		// then
		expect(results).toBe(false);
	});

	it('should return true when examined permission and user permission ended with *', function() {
		//given
		var fakePermissions = ['registerRetailCustomer.test.*', 'anotherPermissionFromBackend'];
		var permission = 'registerRetailCustomer.test.*';

		// when
		var results = Permissions.hasUserPermission(permission, fakePermissions);

		// then
		expect(results).toBe(true);
	});
});
