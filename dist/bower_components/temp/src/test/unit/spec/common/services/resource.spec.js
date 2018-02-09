'use strict';

describe('Service: Resource', function() {
	var $httpBackend;
	var $log;
	var $parse;
	var $rootScope;

	var ResourceFactory;
	var Api;
	var AlternateApiVersionResourceFactory;
	var ERRORS_HANDLING;

	var $resource = jasmine.createSpy('$resource');

	var FAKE_CONFIG = {
		API_URL: 'api-foo-url',
		MOCK_API_URL: 'mock-api-foo-url',
		UPC_API_URL: 'upc-api-foo-url',
		CLM_360_URL: 'clm-360-foo-url',
		CLM_360_API_URL: 'clm-360-api-foo-url'
	};

	var fooErrorCode = 'fooErrorCode';
	var fooErrorDescription = 'fooErrorDescription';

	var fakeErrorsDictionary = {
		errors: {}
	};
	fakeErrorsDictionary.errors[fooErrorCode] = fooErrorDescription;

	beforeEach(function() {
		angular.module('fakeDictionaryConfig',[]).config(['ErrorsDictionaryProvider', function(ErrorsDictionaryProvider){
			ErrorsDictionaryProvider.setDictionary(fakeErrorsDictionary);
		}]);

		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', FAKE_CONFIG);
		});

		angular.mock.module('TT-UI.Common.Services.Resource');
		angular.mock.module('fakeDictionaryConfig');

		angular.mock.module(function($provide) {
			$provide.decorator('$resource', function($delegate) {
				$resource.and.callFake($delegate);

				return $resource;
			});
		});

		angular.mock.inject(function(_$httpBackend_, _$log_, _$parse_, _$rootScope_, _ResourceFactory_, _Api_, _AlternateApiVersionResourceFactory_, _ERRORS_HANDLING_) {
			$httpBackend = _$httpBackend_;
			$log = _$log_;
			$parse = _$parse_;
			$rootScope = _$rootScope_;

			Api = _Api_;
			ResourceFactory = _ResourceFactory_;
			AlternateApiVersionResourceFactory = _AlternateApiVersionResourceFactory_;
			ERRORS_HANDLING = _ERRORS_HANDLING_;
		});
	});

	it('should check if Resource module exists', function() {
		expect(!!ResourceFactory).toBe(true);
		expect(typeof ResourceFactory).toEqual('function');
		expect(typeof AlternateApiVersionResourceFactory).toEqual('function');
	});

	it('ResourceFactory should factorize a simple resource', function() {
		// given
		var uriHost = 'barUrl';
		var uriPath = 'fooPath';
		var method = 'fooMethod';
		spyOn(Api, 'getUrl').and.returnValue(uriHost);

		// when
		new ResourceFactory(uriHost, uriPath, method);

		// then
		expect($resource).toHaveBeenCalledWith(uriHost + uriPath, jasmine.any(Object), jasmine.any(Object));
	});

	it('AlternateApiVersionResourceFactory should factorize a simple resource', function() {
		// given
		var uriHost = 'barUrl';
		var uriPath = 'fooPath';
		var method = 'fooMethod';
		spyOn(Api, 'getUrl').and.returnValue(uriHost);

		// when
		new AlternateApiVersionResourceFactory(uriHost, uriPath, method);

		// then
		expect($resource).toHaveBeenCalledWith(uriHost + uriPath, jasmine.any(Object), jasmine.any(Object));
	});

	describe('reponse transformations', function() {
		var uriHost = 'barUrl';
		var uriPath = 'fooPath';
		var method = 'GET';

		beforeEach(function() {
			spyOn(Api, 'getUrl').and.returnValue(uriHost);
		});

		it('should not touch and not transform object response', function() {
			// given
			var resource = new ResourceFactory(uriHost, uriPath, method);
			var response = {body: ['abc']};
			$httpBackend.expect(method, Api.getUrl() + uriPath).respond(200, response);

			// when
			var results;
			resource.fetch().$promise.then(function(response) {
				results = response;
			});
			$httpBackend.flush();

			// then
			expect(results.body).toEqual(response.body);
			expect($log.error.logs.length).toEqual(0);
		});

		it('should not touch and not transform array response', function() {
			// given
			var resource = new ResourceFactory(uriHost, uriPath, method, true);
			var response = ['abc'];
			$httpBackend.expect(method, Api.getUrl() + uriPath).respond(200, response);

			// when
			var results;
			resource.fetch().$promise.then(function(response) {
				results = response;
			});
			$httpBackend.flush();

			// then
			expect(results.body).toEqual(response.body);
			expect($log.error.logs.length).toEqual(0);
		});

		it('should not touch and not transform any non array or non object response', function() {
			// given
			var resource = new ResourceFactory(uriHost, uriPath, method);
			var response = 'abc';
			$httpBackend.expect(method, Api.getUrl() + uriPath).respond(200, response);

			// when
			var results;
			resource.fetch().$promise.then(function(response) {
				results = response;
			});
			$httpBackend.flush();

			// then
			expect(results).toEqual(response);
			expect($log.error.logs.length).toEqual(0);
		});

		it('should touch and transform array response into object', function() {
			// given
			var resource = new ResourceFactory(uriHost, uriPath, method);
			var response = [{body: 'abc'}];
			$httpBackend.expect(method, Api.getUrl() + uriPath).respond(200, response);

			// when
			var results;
			resource.fetch().$promise.then(function(response) {
				results = response;
			});
			$httpBackend.flush();

			// then
			expect(results.body).toEqual(response[0].body);
			expect($log.error.logs.length).toBeGreaterThan(0);
		});

		it('should touch and parse default backend response and remove response.body cahin steps', function() {
			// given
			var resource = new ResourceFactory(uriHost, uriPath, method);

			var response = {
				response: {
					body: {
						foo:'boo'
					}
				}
			};

			$httpBackend.expect(method, Api.getUrl() + uriPath).respond(200, response);

			// when
			var results;
			resource.fetch().$promise.then(function(response) {
				results = response;
			});
			$httpBackend.flush();

			// then
			expect(results).toEqual(response.response.body);
		});

		it('should touch and ransform object response into array', function() {
			// given
			var resource = new ResourceFactory(uriHost, uriPath, method, true);
			var response = {body: ['abc']};
			$httpBackend.expect(method, Api.getUrl() + uriPath).respond(200, response);

			// when
			var results;
			resource.fetch().$promise.then(function(response) {
				results = response;
			});
			$httpBackend.flush();

			// then
			expect(results[0].body).toEqual(response.body);
			expect($log.error.logs.length).toBeGreaterThan(0);
		});

		it('should return an object in case of backend error response', function() {
			// given
			var fooCode = 'fooCode';
			var resource = new ResourceFactory(uriHost, uriPath, method, true);
			var response = {};

			$parse('response.errors.error').assign(response, []);
			$parse('response.errors.error[0].code').assign(response, fooCode);

			$httpBackend.expect(method, Api.getUrl() + uriPath).respond(400, response);

			// when
			var results;
			resource.fetch().$promise.then(function(response) {
				results = response;
			});
			$httpBackend.flush();

			// then
			expect(results).not.toEqual(jasmine.any(Array));
		});

		it('should show popup in case of backend 200 response contains errors', function() {
			// given
			var fooCode = 'fooCode';
			var resource = new ResourceFactory(uriHost, uriPath, method, true);
			var response = {};
			var expectedErrorsArray = [{
				code: fooCode,
				description: ERRORS_HANDLING.DEFAULT_ERROR_DESCRIPTION
			}];

			$parse('response.errors.error').assign(response, []);
			$parse('response.errors.error[0].code').assign(response, fooCode);

			$httpBackend.expect(method, Api.getUrl() + uriPath).respond(200, response);

			// when
			spyOn($rootScope, '$emit');
			resource.fetch();
			$httpBackend.flush();

			// then
			expect($rootScope.$emit).toHaveBeenCalledWith(ERRORS_HANDLING.RESOURCE_FETCH_ERROR_EVENT, expectedErrorsArray);
		});
	});
});
