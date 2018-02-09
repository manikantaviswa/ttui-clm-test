'use strict';

describe('Service: OAuth:', function() {

	// instantiate service
	var $rootScope, $log, $q, AccessToken, RefreshToken, OAuth, ApiResponse, $state, $timeout, $window, $http,
		$location, $httpBackend, $httpParamSerializer, SPINNER_EVENTS, FlashMessage, httpProvider;

	var injectServices = function() {
		angular.mock.inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$log = $injector.get('$log');
			$q = $injector.get('$q');
			OAuth = $injector.get('OAuth');
			AccessToken = $injector.get('AccessToken');
			RefreshToken = $injector.get('RefreshToken');
			ApiResponse = $injector.get('ApiResponse');
			$timeout = $injector.get('$timeout');
			$window = $injector.get('$window');
			$http = $injector.get('$http');
			$state = $injector.get('$state');
			$location = $injector.get('$location');
			$httpBackend = $injector.get('$httpBackend');
			$httpParamSerializer = $injector.get('$httpParamSerializer');
			SPINNER_EVENTS = $injector.get('SPINNER_EVENTS');
			FlashMessage = $injector.get('FlashMessage');
		});
	};

	describe('General functionality:', function() {

		beforeEach(function() {
			angular.mock.module('TT-UI.Auth.Services.OAuth');
			angular.mock.module('TT-UI.Auth.Services.ApiResponse');

			injectServices();
		});

		it('Should check if OAuth module exists', function() {
			expect(!!OAuth).toBe(true);
			expect(typeof OAuth).toEqual('object');
		});

		it('Should not be authorized when token not exist', function() {
			// given
			spyOn(AccessToken, 'set').and.returnValue(null);

			// when
			var isAuthorized = OAuth.isAuthorized();

			// then
			expect(isAuthorized).toBe(false);
		});

		it('should emit authorization event when token exists', function() {
			// given
			/*jshint camelcase: false */
			var token = {access_token: Date.now().toString(32)};
			spyOn(AccessToken, 'get').and.returnValue(token);
			spyOn($rootScope, '$emit');

			// when
			OAuth.isAuthorized();
			$rootScope.$apply();

			// then
			expect(AccessToken.get).toHaveBeenCalled();
			expect($rootScope.$emit).toHaveBeenCalledWith('oauth:authorized', token);
		});

		it('should require authorization when authenticatedAccess flag does not exist', function() {
			// given
			var state = {
				name: 'TestState'
			};
			// when & then
			expect(OAuth.isAuthenticationRequired(state)).toBeTruthy();
		});

		it('should not require authorization only if authenticatedAccess flag is set to false', function() {
			// given
			var state = {
				name: 'TestState',
				data: {
					authenticatedAccess: false
				}
			};
			// when & then
			expect(OAuth.isAuthenticationRequired(state)).toBeFalsy();
		});

		it('should require authorization when state has authenticatedAccess flag set to true', function() {
			// given
			var state = {
				name: 'TestState',
				data: {
					authenticatedAccess: true
				}
			};
			// when & then
			expect(OAuth.isAuthenticationRequired(state)).toBeTruthy();
		});

		it('should require authorization when state has authenticatedAccess flag is undefined', function() {
			// given
			var state = {
				name: 'TestState',
				data: {
					authenticatedAccess: undefined
				}
			};
			// when & then
			expect(OAuth.isAuthenticationRequired(state)).toBeTruthy();
		});

		it('should not emit authorization event when token dont exists', function() {
			// given
			var token = null;
			spyOn(AccessToken, 'get').and.returnValue(token);
			spyOn($rootScope, '$emit');

			// when
			OAuth.isAuthorized();
			$rootScope.$apply();

			// then
			expect(AccessToken.get).toHaveBeenCalled();
			expect($rootScope.$emit).not.toHaveBeenCalled();
		});

	});

	describe('Authorization Code response type:', function() {

		var FAKE_CONFIG = {
			HOME_STATE: 'home',
			AUTH_MODULE: 'OAuth',
			SSO_GET_TOKEN_URI: 'getToken/?code={{codeValue}}',
			SSO_REVOKE_TOKEN_URI: 'fakeTokenRevokeAPI/?{{tokenType}}={{tokenValue}}',
			SSO_OAUTH_RESPONSE_TYPE: 'code'
		};

		var mockLocation = {
			href: ''
		};

		beforeEach(function() {
			angular.mock.module('TT-UI.Config', function($provide) {
				$provide.constant('CONFIG', FAKE_CONFIG);
			});
			angular.mock.module('TT-UI.Auth.Services.OAuth', function($provide){
				$provide.value('$window', {
					location: mockLocation,
					document: window.document
				});
			});

			angular.mock.module('TT-UI.Auth.Services.ApiResponse');

			injectServices();
		});

		describe('Logout:', function() {
			var fakeAccessToken, fakeRefreshToken;

			beforeEach(function() {
				/*jshint camelcase:false*/

				fakeAccessToken = {
					access_token: Date.now().toString(31)
				};
				fakeRefreshToken = Date.now().toString(32);

				spyOn(AccessToken, 'get').and.returnValue(fakeAccessToken);
				spyOn(AccessToken, 'destroy');

				spyOn(RefreshToken, 'get').and.returnValue(fakeRefreshToken);
				spyOn(RefreshToken, 'destroy');

				spyOn($http, 'get').and.returnValue($q.reject());
			});

			it('should destroy AccessToken', function() {
				// when
				OAuth.logout();

				// then
				expect(AccessToken.destroy).toHaveBeenCalled();
			});

			it('should destroy RefreshToken', function() {
				// when
				OAuth.logout();

				// then
				expect(RefreshToken.destroy).toHaveBeenCalled();
			});

			it('should call revoke token API of access and refresh tokens (also in proper order)', function() {
				/*jshint camelcase:false*/

				// given
				$http.get.and.callThrough();

				// expected
				$httpBackend.expectGET('fakeTokenRevokeAPI/?refresh_token=' + fakeRefreshToken).respond({});
				$httpBackend.expectGET('fakeTokenRevokeAPI/?access_token=' + fakeAccessToken.access_token).respond({});

				// when
				OAuth.logout();
				$httpBackend.flush();
			});

			it('should not emit `oauth:loggedOut` event on finish successfully', function() {
				// given
				$http.get.and.returnValue($q.resolve({}));
				spyOn($rootScope, '$emit');

				// when
				OAuth.logout();
				$timeout.flush();

				// then
				expect($rootScope.$emit).not.toHaveBeenCalledWith('oauth:loggedOut');
			});

			it('should emit `oauth:loggedOut` event on finish failed', function() {
				// given
				$http.get.and.returnValue($q.reject());
				spyOn($rootScope, '$emit');

				// when
				OAuth.logout();
				$timeout.flush();

				// then
				expect($rootScope.$emit).toHaveBeenCalledWith('oauth:loggedOut');
			});

			it('should redirect to page provided by server', function() {
				// given
				var fakeRedirectUrl = 'fakeUrl';

				$http.get.and.returnValue($q.resolve({data: fakeRedirectUrl}));

				// when
				OAuth.logout();
				$timeout.flush();

				// then
				expect(mockLocation.href).toBe(fakeRedirectUrl);
			});
		});

		it('Should redirect to HOME_STATE when no auth code provided', function() {

			//given
			spyOn(FlashMessage, 'show');
			spyOn($state, 'go');

			// when
			$location.url('authcode');
			$rootScope.$digest();

			// then
			expect($state.go).toHaveBeenCalledWith(FAKE_CONFIG.HOME_STATE);
		});

		it('Should fetch access token when auth code provided', function() {

			//given
			spyOn($state, 'go');
			var fakeAuthCodeValue = '1111111';
			var fakeAccessToken = '12345';
			/*jshint camelcase:false*/
			$httpBackend.when('GET', 'getToken/?code=' + fakeAuthCodeValue)
				.respond({
					access_token: fakeAccessToken,
					refresh_token: '123',
					expires_in: '123'
				});

			// when
			$location.url('authcode?code=' + fakeAuthCodeValue);
			$rootScope.$digest();
			$httpBackend.flush();

			// then
			expect(AccessToken.get().access_token).toEqual(fakeAccessToken);
		});

		it('Should emit SPINNER_EVENTS.SHOW when auth code provided', function() {

			//given
			spyOn($state, 'go');
			spyOn($rootScope, '$emit');
			var fakeAuthCodeValue = '1111111';
			$httpBackend.when('GET', 'getToken/?code=' + fakeAuthCodeValue).respond({});

			// when
			$location.url('authcode?code=' + fakeAuthCodeValue);
			$rootScope.$digest();

			// then
			expect($rootScope.$emit).toHaveBeenCalledWith(SPINNER_EVENTS.SHOW);
			expect($rootScope.$emit.calls.count()).toEqual(1);
		});

		it('Should log error and show FlashMessage when getToken call fails', function() {

			//given
			spyOn($state, 'go');
			spyOn($log, 'error');
			spyOn(FlashMessage, 'show');

			var fakeAuthCodeValue = '1111111';
			$httpBackend.when('GET', 'getToken/?code=' + fakeAuthCodeValue)
				.respond(function() {
					return [500];
				});

			// when
			$location.url('authcode?code=' + fakeAuthCodeValue);
			$rootScope.$digest();
			$httpBackend.flush();

			// then
			expect($log.error).toHaveBeenCalled();
			expect(FlashMessage.show).toHaveBeenCalled();
		});

		it('Should emit SPINNER_EVENTS.HIDE after processing getToken call', function() {

			/*jshint camelcase:false */

			//given
			spyOn($rootScope, '$emit');
			spyOn($state, 'go');
			var fakeAuthCodeValue = '1111111';
			$httpBackend.when('GET', 'getToken/?code=' + fakeAuthCodeValue)
				.respond({
					access_token: '123',
					refresh_token: '123'
				});

			// when
			$location.url('authcode?code=' + fakeAuthCodeValue);
			$rootScope.$digest();
			$httpBackend.flush();

			// then
			expect($rootScope.$emit.calls.allArgs()).toEqual([
				[SPINNER_EVENTS.SHOW],
				[SPINNER_EVENTS.HIDE],
			]);
		});

	});

	describe('Redirection:', function() {

		var FAKE_CONFIG = {
			HOME_STATE: 'home',
			AUTH_MODULE: 'OAuth',
			SSO_GET_TOKEN_URI: 'getToken/?code={{codeValue}}',
			SSO_REVOKE_TOKEN_URI: 'fakeTokenRevokeAPI/?{{tokenType}}={{tokenValue}}',
			SSO_OAUTH_RESPONSE_TYPE: 'code'
		};

		beforeEach(function() {
			angular.mock.module('TT-UI.Config', function($provide) {
				$provide.constant('CONFIG', FAKE_CONFIG);
			});
			angular.mock.module('TT-UI.Auth.Services.ApiResponse');
			injectServices();
		});

		it('Should fetch access_token and refresh_token after calling redirection url', function() {

			/*jshint camelcase: false */

			// given
			spyOn($state, 'go');
			var params = {
				access_token: '111',
				refresh_token: '222',
				expires_in: '333'
			};
			var path = $httpParamSerializer(params);

			// when
			$location.url('oauth-update?' + path);
			$rootScope.$digest();

			// then
			expect(AccessToken.get().access_token).toEqual(params.access_token);
			expect(AccessToken.get().expires_in).toEqual(params.expires_in);
			expect(RefreshToken.get()).toEqual(params.refresh_token);
		});

	});

	describe('Interceptor:', function() {

		it('Should register ApiInterceptor only if CONFIG.AUTH_MODULE is set to OAuth', function() {

			// given
			var FAKE_CONFIG = {
				AUTH_MODULE: 'OAuth'
			};
			angular.mock.module('TT-UI.Config', function($provide) {
				$provide.constant('CONFIG', FAKE_CONFIG);
			});
			angular.mock.module('TT-UI.Auth.Services.OAuth');
			angular.mock.module(function($httpProvider) {
				httpProvider = $httpProvider;
			});

			// when
			injectServices();

			// then
			expect(httpProvider.interceptors).toContain('ApiInterceptor');

		});

		it('Should NOT register ApiInterceptor if CONFIG.AUTH_MODULE is NOT set to OAuth', function() {

			// given
			var FAKE_CONFIG = {
				AUTH_MODULE: 'Other'
			};
			angular.mock.module('TT-UI.Config', function($provide) {
				$provide.constant('CONFIG', FAKE_CONFIG);
			});
			angular.mock.module('TT-UI.Auth.Services.OAuth');
			angular.mock.module(function($httpProvider) {
				httpProvider = $httpProvider;
			});

			// when
			injectServices();

			// then
			expect(httpProvider.interceptors).not.toContain('ApiInterceptor');

		});

	});

});
