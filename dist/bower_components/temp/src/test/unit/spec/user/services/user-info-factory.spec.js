'use strict';

var UserInfoFactory;

describe('Service: UserInfo ', function() {
	beforeEach(function() {
		angular.mock.module('TT-UI.User.Services.UserInfoFactory');

		angular.mock.inject(function(_UserInfoFactory_) {
			UserInfoFactory = _UserInfoFactory_;
		});
	});

	it('Should check if UserInfoFactory service exists', function() {
		expect(!!UserInfoFactory).toBe(true);
		expect(UserInfoFactory).toEqual(jasmine.any(Object));
	});

	it('Should check if UserInfoFactory service has an implementation for get method', function() {
		expect(!!UserInfoFactory.get).toBe(true);
		expect(UserInfoFactory.get).toEqual(jasmine.any(Function));
	});

	it('Should check if UserInfoFactory.get returns something for all input variations', function() {
		var FakeAuth = 'FakeAuth';
		var OAuth = 'OAuth';

		expect(!!UserInfoFactory.get(FakeAuth)).toBe(true);
		expect(!!UserInfoFactory.get(OAuth)).toBe(true);
		expect(!!UserInfoFactory.get()).toBe(true);
	});
});
