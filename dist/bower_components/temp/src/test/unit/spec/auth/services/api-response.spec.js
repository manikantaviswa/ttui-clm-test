'use strict';

describe('Service: OAuth.ApiResponse ', function() {

	// instantiate service
	var $rootScope, $q, AccessToken, OAuth, ApiResponse;

	beforeEach(function() {
		angular.mock.module('TT-UI.Auth.Services.ApiResponse');

		angular.mock.inject(function($injector) {
			$rootScope   = $injector.get('$rootScope');
			$q           = $injector.get('$q');
			OAuth        = $injector.get('OAuth');
			AccessToken  = $injector.get('AccessToken');
			ApiResponse  = $injector.get('ApiResponse');
		});
	});

	describe('ApiResponse service', function() {
		it('should return true for aunthorized (ex. 200) response', function() {
			// given
			var response = {
				config: {
					headers: {
						'Authorization': 'abc'
					}
				},

				status: 200
			};

			// when
			var results = ApiResponse.isAuthorized(response);

			// then
			expect(results).toBe(true);
		});

		it('should return false for aunthorized (401) response ', function() {
			// given
			var response = {
				config: {
					headers: {
						'Authorization': 'Bearer abc'
					}
				},

				status: 401
			};

			// when
			var results = ApiResponse.isAuthorized(response);

			// then
			expect(results).toBe(false);
		});

		it('should return false for aunthorized (400) response ', function() {
			// given
			var response = {
				config: {
					headers: {
						'Authorization': 'Bearer abc'
					}
				},

				status: 400
			};

			// when
			var results = ApiResponse.isAuthorized(response);

			// then
			expect(results).toBe(false);
		});

		it('should return true for expired token check if REGERR0129 code is passed in the response', function() {

			// given
			var response = {
				error: [
					{
						code: 'REGERR0129'
					}
				]
			};

			// when & then
			expect(ApiResponse.isTokenExpired(response)).toEqual(true);

		});

		it('should return true for expired token check if invalid_token code is passed in the response', function() {

			// given
			var response = {
				'error' : 'invalid_token',
				'error_description' : 'Access token validation failed'
			};

			// when & then
			expect(ApiResponse.isTokenExpired(response)).toEqual(true);

		});

	});

});
