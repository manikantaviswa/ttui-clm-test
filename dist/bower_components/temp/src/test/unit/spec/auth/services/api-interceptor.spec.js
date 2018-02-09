'use strict';

describe('Service: OAuth.ApiInterceptor ', function() {

	// instantiate service
	var $rootScope, $q, AccessToken, OAuth, ApiResponse;

	var FAKE_CONFIG = {
			AUTH_MODULE: 'OAuth'
		};

	beforeEach(function() {
		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', FAKE_CONFIG);
		});
		angular.mock.module('TT-UI.Auth.Services.ApiInterceptor');
		angular.mock.module('TT-UI.Auth.Services.ApiResponse');

		angular.mock.inject(function($injector) {
			$rootScope   = $injector.get('$rootScope');
			$q           = $injector.get('$q');
			OAuth        = $injector.get('OAuth');
			AccessToken  = $injector.get('AccessToken');
			ApiResponse  = $injector.get('ApiResponse');
		});
	});

	describe('ApiInterceptor', function() {

			var OAUTH_AUTH;
			var $http;
			var $httpBackend;

			beforeEach(function() {
				var $rootScope;
				angular.mock.inject(function($injector) {
					OAUTH_AUTH = $injector.get('OAUTH_AUTH');
					$http = $injector.get('$http');
					$httpBackend = $injector.get('$httpBackend');
					$rootScope = $injector.get('$rootScope');
				});

				/*jshint camelcase:false */
				spyOn(AccessToken, 'get').and.returnValue({access_token: 'world'});
				$rootScope.$emit('oauth:login');
			});

			afterEach(function() {
				$httpBackend.verifyNoOutstandingExpectation();
				$httpBackend.verifyNoOutstandingRequest();
			});

			it('should set Authorization header', function() {
				// given
				$httpBackend.expectGET('http://localhost', function(headers) {
					return headers[OAUTH_AUTH.HTTP_HEADER_NAME] === 'Bearer world';
				}).respond({});

				// when
				$http.get('http://localhost');

				// then
				$httpBackend.flush();

			});

			it('should not override Authorization header', function() {
				// given
				var expectedHeaders = {};
				expectedHeaders[OAUTH_AUTH.HTTP_HEADER_NAME] = 'Basic hello';

				$httpBackend.expectGET('http://localhost', function(headers) {
					return headers[OAUTH_AUTH.HTTP_HEADER_NAME] === 'Basic hello';
				}).respond({});

				// when
				$http.get('http://localhost', {
					headers: expectedHeaders
				});

				// then
				$httpBackend.flush();

			});

			it('should logout user if backend responded with 401 and oauth authentication been used', function() {
				// given
				var headers = {};
				headers[OAUTH_AUTH.HTTP_HEADER_NAME] = 'Bearer hello';
				$httpBackend.expectGET('http://localhost').respond(401);

				spyOn($rootScope, '$emit');
				spyOn(AccessToken, 'destroy');

				// when
				$http.get('http://localhost', {
					headers: headers
				});
				$httpBackend.flush();

				// then
				expect($rootScope.$emit).toHaveBeenCalledWith('oauth:denied');
				expect(AccessToken.destroy).toHaveBeenCalled();
			});

			it('should not logout user if backend responded with 404', function() {
				// given
				var headers = {};
				headers[OAUTH_AUTH.HTTP_HEADER_NAME] = 'Bearer hello';
				$httpBackend.expectGET('http://localhost').respond(404);

				spyOn($rootScope, '$emit');
				spyOn(ApiResponse, 'isTokenExpired').and.returnValue(false);
				spyOn(AccessToken, 'destroy');

				// when
				$http.get('http://localhost', {
					headers: headers
				});
				$httpBackend.flush();

				// then
				expect($rootScope.$emit).not.toHaveBeenCalledWith('oauth:denied');
				expect(AccessToken.destroy).not.toHaveBeenCalled();
			});

			it('should not logout user if backend responded with 401 but other authentication been used', function() {
				// given
				var headers = {};
				headers[OAUTH_AUTH.HTTP_HEADER_NAME] = 'Basic hello';
				$httpBackend.expectGET('http://localhost').respond(401);

				spyOn($rootScope, '$emit');
				spyOn(ApiResponse, 'isTokenExpired').and.returnValue(false);
				spyOn(AccessToken, 'destroy');

				// when
				$http.get('http://localhost', {
					headers: headers
				});
				$httpBackend.flush();

				// then
				expect($rootScope.$emit).not.toHaveBeenCalledWith('oauth:denied');
				expect(AccessToken.destroy).not.toHaveBeenCalled();
			});

		});
});
