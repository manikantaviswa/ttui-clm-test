'use strict';

var OAuthUserInfo;

describe('Service: OAuthUserInfo ', function() {
	beforeEach(function() {
		angular.mock.module('TT-UI.User.Services.OAuthUserInfo');

		angular.mock.inject(function(_OAuthUserInfo_) {
			OAuthUserInfo = _OAuthUserInfo_;
		});
	});

	it('Should check if OAuthUserInfo service exists', function() {
		expect(!!OAuthUserInfo).toBe(true);
		expect(OAuthUserInfo).toEqual(jasmine.any(Function));
	});
});
