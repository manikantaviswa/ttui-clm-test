'use strict';

describe('TokenUtils', function() {

	var $location, $state, $httpBackend, $interpolate;
	var TokenUtils;
	var AccessToken;
	var RefreshToken;
	var StateHistory;
	var FlashMessage;

	var FAKE_CONFIG = {
		SSO_REFRESH_TOKEN_URI: 'http://localhost:123',
		SSO_GET_TOKEN_URI: 'http://localhost:456/?code={{codeValue}}',
		HOME_STATE: 'fooState'
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
			StateHistory = $injector.get('StateHistory');
			FlashMessage = $injector.get('FlashMessage');
			$location = $injector.get('$location');
			$state = $injector.get('$state');
			$httpBackend = $injector.get('$httpBackend');
			$interpolate = $injector.get('$interpolate');
		});
	});


	it('should set AccessToken from url', function() {
		
		/*jshint camelcase:false */

		// given
		var path = 'access_token=123&expires_in=456';
		spyOn($state, 'go');
		spyOn(StateHistory, 'getPreviousStateName').and.returnValue('foo');

		// when
		$location.path(path);
		TokenUtils.fetchAccessTokenFromUrl();

		// then
		expect(AccessToken.get().access_token).toEqual('123');
		expect(AccessToken.get().expires_in).toEqual('456');
		expect($state.go).toHaveBeenCalledWith('foo');

	});

	it('should set tokens when exchanging with autorization code', function() {

		/*jshint camelcase:false */

		// given
		var url = $interpolate(FAKE_CONFIG.SSO_GET_TOKEN_URI)({codeValue: '111'});
		$httpBackend.whenGET(url).respond(200, {
			access_token: '123',
			expires_in: '456',
			refresh_token: '000'
		});
		spyOn($state, 'go');
		StateHistory.removePreviousState();


		// when
		$location.url('?code=111');
		TokenUtils.fetchAccessTokenByAuthCode();
		$httpBackend.flush();

		// then
		expect(AccessToken.get().access_token).toEqual('123');
		expect(AccessToken.get().expires_in).toEqual('456');
		expect(RefreshToken.get()).toEqual('000');
		expect($state.go).toHaveBeenCalledWith(FAKE_CONFIG.HOME_STATE);
		
	});

	it('should redirect home when autorization code is missing', function() {
		// given
		spyOn($state, 'go');
		spyOn(FlashMessage, 'show');

		// when
		TokenUtils.fetchAccessTokenByAuthCode();

		// then
		expect($state.go).toHaveBeenCalledWith(FAKE_CONFIG.HOME_STATE);
		expect(FlashMessage.show).toHaveBeenCalledWith('Missing auth code');
	});

	it('should set tokens when exchanging with refresh token', function() {

		/*jshint camelcase:false */

		// given
		var payload = {
			refresh_token: '000'
		};
		$httpBackend.expectPOST(FAKE_CONFIG.SSO_REFRESH_TOKEN_URI, payload).respond(200, '');

		// when & then
		TokenUtils.exchangeRefreshTokenForAccessToken('000');
		$httpBackend.flush();
		
	});

	it('should handle token response when succeeded', function() {

		/*jshint camelcase:false */

		// given
		var response = {
			data: {
					access_token: '123',
					expires_in: '456',
					refresh_token: '000',
					statusCode: 200
				}
			};

		// when
		TokenUtils.handleTokenResponse(response);

		// then
		expect(AccessToken.get().access_token).toEqual('123');
		expect(AccessToken.get().expires_in).toEqual('456');
		expect(RefreshToken.get()).toEqual('000');
	});

	it('should not assign tokens when response has statusCode 400', function() {

		/*jshint camelcase:false */

		// given
		var response = {
			data: {
					access_token: '123',
					expires_in: '456',
					refresh_token: '000',
					statusCode: 400
				}
			};

		// when
		TokenUtils.handleTokenResponse(response);

		// then
		expect(AccessToken.get()).toBeNull();
		expect(RefreshToken.get()).toBeNull();
	});

	it('should not assign tokens when response does not contain access_token', function() {

		/*jshint camelcase:false */

		// given
		var response = {
			data: {
					expires_in: '456',
					refresh_token: '000',
					statusCode: 200
				}
			};

		// when
		TokenUtils.handleTokenResponse(response);

		// then
		expect(AccessToken.get()).toBeNull();
		expect(RefreshToken.get()).toBeNull();
	});

	it('should not assign tokens when response does not contain refresh_token', function() {

		/*jshint camelcase:false */

		// given
		var response = {
			data: {
					access_token: '123',
					expires_in: '456',
					statusCode: 200
				}
			};

		// when
		TokenUtils.handleTokenResponse(response);

		// then
		expect(AccessToken.get()).toBeNull();
		expect(RefreshToken.get()).toBeNull();
	});

	it('should set tokens from query string', function() {

		// given
		spyOn($state, 'go');
		var path = '?access_token=123&expires_in=456&refresh_token=789';

		// when
		$location.url(path);
		TokenUtils.fetchTokensFromQueryString();

		// then
		/*jshint camelcase: false */
		expect(AccessToken.get().access_token).toEqual('123');
		expect(AccessToken.get().expires_in).toEqual('456');
		expect(RefreshToken.get()).toEqual('789');

	});

	it('should redirect to CONFIG.HOME_STATE if query string contains tokens', function() {

		// given
		spyOn($state, 'go');
		var path = '?access_token=123&expires_in=456&refresh_token=789';

		// when
		$location.url(path);
		TokenUtils.fetchTokensFromQueryString();

		// then
		expect($state.go).toHaveBeenCalledWith(FAKE_CONFIG.HOME_STATE);

	});

	it('should redirect to CONFIG.HOME_STATE if query string does not contain tokens', function() {

		// given
		spyOn($state, 'go');
		spyOn(FlashMessage, 'show');

		// when
		TokenUtils.fetchTokensFromQueryString();

		// then
		expect(FlashMessage.show).toHaveBeenCalledWith('Invalid redirection url');
		expect($state.go).toHaveBeenCalledWith(FAKE_CONFIG.HOME_STATE);
	});

	it('should show FlashMessage if access_token, refresh_token or expires_in is not present in query string', function() {


		// given
		spyOn($state, 'go');
		spyOn(FlashMessage, 'show');
		var path = '?access_token=123';

		// when
		$location.url(path);
		TokenUtils.fetchTokensFromQueryString();

		// then
		expect(FlashMessage.show).toHaveBeenCalled();		

	});

	it('should not set tokens if access_token, refresh_token or expires_in is not present in query string', function() {


		// given
		spyOn($state, 'go');
		spyOn(FlashMessage, 'show');
		var path = '?access_token=123';

		// when
		$location.url(path);
		TokenUtils.fetchTokensFromQueryString();

		// then
		expect(AccessToken.get()).toBeNull();
		expect(RefreshToken.get()).toBeNull();		

	});


});