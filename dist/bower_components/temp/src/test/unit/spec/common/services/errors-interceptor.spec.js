'use strict';

describe('Service: Errors Interceptor', function() {
	// instantiate service
	var $parse, $rootScope, httpProvider;
	var ErrorsInterceptor, ERRORS_HANDLING;

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

		angular.mock.module('TT-UI.Common.Services.ErrorsInterceptor', function($httpProvider){
			httpProvider = $httpProvider;
		});

		angular.mock.module('TT-UI.Common.Services.Resource');
		angular.mock.module('fakeDictionaryConfig');

		angular.mock.inject(function(_$parse_, _$rootScope_, _ErrorsInterceptor_, _ERRORS_HANDLING_) {
			$rootScope = _$rootScope_;
			$parse = _$parse_;
			ErrorsInterceptor = _ErrorsInterceptor_;

			ERRORS_HANDLING = _ERRORS_HANDLING_;
		});


		/*function appConfigFn(ErrorsDictionary) {
			ErrorsDictionary.setDictionary(errorsDictionaryJson);
		}

		appConfigFn.$inject = ['ErrorsDictionary'];
		module.config(appConfigFn);*/
	});

	it('should exist', function() {
		expect(!!ErrorsInterceptor).toBe(true);
	});

	it('should have the proper interceptor structure', function() {
		expect(ErrorsInterceptor.responseError).toEqual(jasmine.any(Function));
	});

	it('should add interceptor function to $httpProvider.interceptors array', function(){
		// given
		var interceptors = httpProvider.interceptors;
		var interceptorName = 'ErrorsInterceptor';
		var presence;

		// when
		presence = interceptors.some(function(entry){
			return interceptorName === entry;
		});

		// then
		expect(presence).toBe(true);
	});

	it('should emit "resourceFetchError" in case of response error interception', function(){
		// given
		var response = {};
		var fooCode = 'fooCode';
		var fooErrorDescription = 'Unknown Error';
		var expectedError = {
			code: fooCode,
			description: fooErrorDescription
		};

		//when
		$parse('data.response.errors.error').assign(response, []);
		$parse('data.response.errors.error[0].code').assign(response, fooCode);
		spyOn($rootScope, '$emit');
		ErrorsInterceptor.responseError(response);

		// then
		expect($rootScope.$emit).toHaveBeenCalledWith('resourceFetchError', [expectedError]);
	});

	it('should return $q.reject with errors array in case of response error interception', function(){
		// given
		var response = {};
		var fooCode = 'fooCode';
		var fooErrorDescription = 'Unknown Error';
		var rejected = false;
		var expectedError = {
			code: fooCode,
			description: fooErrorDescription
		};

		//when
		$parse('data.response.errors.error').assign(response, []);
		$parse('data.response.errors.error[0].code').assign(response, fooCode);

		ErrorsInterceptor.responseError(response).catch(function(errors){
			rejected = errors;
		});
		$rootScope.$digest();

		// then
		expect(rejected).toEqual(jasmine.any(Array));
		expect(rejected[0]).toEqual(expectedError);
	});

	it('should return $q.reject in case of intercepting not backend error', function(){
		// given
		var fooError = 'fooError';
		var rejected = false;

		ErrorsInterceptor.responseError(fooError).catch(function(rejectedError){
			rejected = rejectedError;
		});
		$rootScope.$digest();

		// then
		expect(rejected).toBe(fooError);
	});

	describe('emitErrorPopupFn', function(){
		var emitErrorPopupFn;

		beforeEach(function(){
			angular.mock.inject(function(_emitErrorPopupFn_) {
				emitErrorPopupFn = _emitErrorPopupFn_;
			});
		});

		it('should emit show popup message', function(){
			// given
			var fooErrors = ['123'];

			// when
			spyOn($rootScope, '$emit');
			emitErrorPopupFn(fooErrors);

			// then
			expect($rootScope.$emit).toHaveBeenCalledWith(ERRORS_HANDLING.RESOURCE_FETCH_ERROR_EVENT, fooErrors);
		});
	});

	describe('parseErrorsFn', function(){
		var parseErrorsFn;

		beforeEach(function(){
			angular.mock.inject(function(_parseErrorsFn_) {
				parseErrorsFn = _parseErrorsFn_;
			});
		});

		it('should return array of errors for proper errors structure', function(){
			// given
			var fooErrors = {};
			var fooError = {
				code: 'fooCode'
			};
			var parsedErrors;

			// when
			$parse(ERRORS_HANDLING.ERRORS_PATH).assign(fooErrors, [ fooError ]);
			parsedErrors = parseErrorsFn(fooErrors);

			//then
			expect(parsedErrors).toEqual(jasmine.any(Array));
			expect(parsedErrors[0].code).toEqual(fooError.code);
			expect(parsedErrors[0].description).toEqual(ERRORS_HANDLING.DEFAULT_ERROR_DESCRIPTION);
		});

		it('should return false for not proper errors structure', function(){
			// given
			var fooErrors = {};
			var fooError = {
				code: 'fooCode'
			};
			var parsedErrors;

			// when
			$parse(ERRORS_HANDLING.ERRORS_PATH + 'spoiler').assign(fooErrors, [ fooError ]);
			parsedErrors = parseErrorsFn(fooErrors);

			//then
			expect(parsedErrors).toBeFalsy();
		});

		it('should return array with error providen with code and description in case if this error code was presented in errorsDictionary', function(){
			// given
			var fooErrors = {};
			var fooError = {
				code: fooErrorCode
			};
			var parsedErrors;

			// when
			$parse(ERRORS_HANDLING.ERRORS_PATH).assign(fooErrors, [ fooError ]);
			parsedErrors = parseErrorsFn(fooErrors);

			//then
			expect(parsedErrors[0].code).toEqual(fooErrorCode);
			expect(parsedErrors[0].description).toEqual(fooErrorDescription);
		});

		it('should return array with error providen with code and default description in case if this error code was not presented in errorsDictionary', function(){
			// given
			var fooErrors = {};
			var fooCode = fooErrorCode + 'spoiler';
			var fooError = {
				code: fooCode
			};
			var parsedErrors;

			// when
			$parse(ERRORS_HANDLING.ERRORS_PATH).assign(fooErrors, [ fooError ]);
			parsedErrors = parseErrorsFn(fooErrors);

			//then
			expect(parsedErrors[0].code).toEqual(fooCode);
			expect(parsedErrors[0].description).toEqual(ERRORS_HANDLING.DEFAULT_ERROR_DESCRIPTION);
		});

		it('should return array with error providen with code and backend description in case if this error had backend description and was not presented in errorsDictionary', function(){
			// given
			var fooErrors = {};
			var fooCode = fooErrorCode + 'spoiler';
			var fooDescription = 'description';
			var fooError = {
				code: fooCode,
				desc: fooDescription
			};
			var parsedErrors;

			// when
			$parse(ERRORS_HANDLING.ERRORS_PATH).assign(fooErrors, [ fooError ]);
			parsedErrors = parseErrorsFn(fooErrors);

			//then
			expect(parsedErrors[0].code).toEqual(fooCode);
			expect(parsedErrors[0].description).toEqual(fooDescription);
		});
	});
});
