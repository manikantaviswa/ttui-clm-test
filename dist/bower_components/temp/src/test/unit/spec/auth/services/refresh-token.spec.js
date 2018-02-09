'use strict';

describe('RefreshToken', function() {

	var $location, $state, $httpBackend, $q, $rootScope;
	var TokenUtils;
	var AccessToken;
	var RefreshToken;

	var FAKE_CONFIG = {
		SSO_REFRESH_TOKEN_URI: 'http://localhost:123'
	};

	beforeEach(function() {
		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', FAKE_CONFIG);
		});
		angular.mock.module('TT-UI.Auth.Services.TokenUtils');

		angular.mock.inject(function($injector) {
			TokenUtils = $injector.get('TokenUtils');
			AccessToken = $injector.get('AccessToken');
			RefreshToken = $injector.get('RefreshToken');
			$location = $injector.get('$location');
			$state = $injector.get('$state');
			$httpBackend = $injector.get('$httpBackend');
			$q = $injector.get('$q');
			$rootScope = $injector.get('$rootScope');
		});
	});

	it('should destroy RefreshToken', function() {

		// given
		RefreshToken.set('123');

		// when
		RefreshToken.destroy();
		RefreshToken.update();

		// then
		expect(RefreshToken.get()).toEqual(null);

	});

	it('should not do refresh when refresh token is destoyed', function() {

		// given
		RefreshToken.destroy();

		// when
		RefreshToken.doRefresh({});

		// then
		expect(AccessToken.get()).toBeNull();
		expect(RefreshToken.get()).toBeNull();

	});

	it('should call refresh API if refreshing not yet started', function() {

		/*jshint camelcase:false */

		// given
		RefreshToken.set('000');
		var requestToRetry = {
			method: 'POST',
			url: 'foo'
		};
		$httpBackend.expectPOST('foo').respond(200);

		var fakeRefreshTokenResponse = {
			data: {
				statusCode: 200,
				access_token: 'new123',
				expires_in: 'new456',
				refresh_token: 'new000'
			}
		};
		spyOn(TokenUtils, 'exchangeRefreshTokenForAccessToken')
			.and.returnValue($q.when(fakeRefreshTokenResponse));

		// when
		RefreshToken.doRefresh(requestToRetry);
		$rootScope.$digest();

		// then
		expect(AccessToken.get().access_token).toEqual('new123');
		expect(AccessToken.get().expires_in).toEqual('new456');
		expect(RefreshToken.get()).toEqual('new000');

	});

	it('should call refresh API only once if refresh called several times', function() {

		/*jshint camelcase:false */

		// given
		RefreshToken.set('000');
		var requestToRetry = {
			method: 'POST',
			url: 'foo'
		};
		var requestToRetry2 = {
			method: 'POST',
			url: 'foo2'
		};
		var requestToRetry3 = {
			method: 'POST',
			url: 'foo3'
		};
		$httpBackend.expectPOST('foo').respond(200);
		$httpBackend.expectPOST('foo2').respond(200);
		$httpBackend.expectPOST('foo3').respond(200);

		var fakeRefreshTokenResponse = {
			data: {
				statusCode: 200,
				access_token: 'new123',
				expires_in: 'new456',
				refresh_token: 'new000'
			}
		};
		spyOn(TokenUtils, 'exchangeRefreshTokenForAccessToken')
			.and.returnValue($q.when(fakeRefreshTokenResponse));
		spyOn(TokenUtils, 'handleTokenResponse');

		// when
		RefreshToken.doRefresh(requestToRetry);
		RefreshToken.doRefresh(requestToRetry2);
		RefreshToken.doRefresh(requestToRetry3);
		$rootScope.$digest();

		// then
		expect(TokenUtils.exchangeRefreshTokenForAccessToken.calls.count()).toEqual(1);
		expect(TokenUtils.handleTokenResponse.calls.count()).toEqual(1);

	});


});