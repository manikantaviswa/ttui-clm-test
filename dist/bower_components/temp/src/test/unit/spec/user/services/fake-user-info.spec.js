'use strict';

var FakeUserInfo;

describe('Service: FakeUserInfo ', function() {
	beforeEach(function() {
		angular.mock.module('TT-UI.User.Services.FakeUserInfo');

		angular.mock.inject(function(_FakeUserInfo_) {
			FakeUserInfo = _FakeUserInfo_;
		});
	});

	it('Should check if FakeUserInfo service exists', function() {
		expect(!!FakeUserInfo).toBe(true);
		expect(FakeUserInfo).toEqual(jasmine.any(Function));
	});

	it('Should check if FakeUserInfo() result has an implementation for $fetch funciton', function() {
		expect(!!new FakeUserInfo().$fetch).toBe(true);
		expect(new FakeUserInfo().$fetch).toEqual(jasmine.any(Function));
	});
});
