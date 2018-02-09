'use strict';

var AuthFactory;

describe('Service: AuthFactory ', function() {
	beforeEach(function() {
		angular.mock.module('TT-UI.Auth.AuthFactory');

		angular.mock.inject(function(_AuthFactory_) {
			AuthFactory = _AuthFactory_;
		});
	});

	it('Should check if AuthFactory service exists', function() {
		expect(!!AuthFactory).toBe(true);
		expect(AuthFactory).toEqual(jasmine.any(Object));
	});

	it('Should check if AuthFactory service has an implementation for get method', function() {
		expect(!!AuthFactory.get).toBe(true);
		expect(AuthFactory.get).toEqual(jasmine.any(Function));
	});

	it('Should check if AuthFactory.get returns something for all input variations', function() {
		var FakeAuth = 'FakeAuth';
		var OAuth = 'OAuth';

		expect(!!AuthFactory.get(FakeAuth)).toBe(true);
		expect(!!AuthFactory.get(OAuth)).toBe(true);
		expect(!!AuthFactory.get()).toBe(true);
	});
});
