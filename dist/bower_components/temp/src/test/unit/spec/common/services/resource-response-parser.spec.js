'use strict';

describe('Service: Resource Response Parser', function() {
	// instantiate service
	var $parse, resourceResponseParserFn;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Services.ResourceResponseParser');

		angular.mock.inject(function(_$parse_, _resourceResponseParserFn_) {
			$parse = _$parse_;
			resourceResponseParserFn = _resourceResponseParserFn_;
		});
	});

	it('should exist', function() {
		expect(!!resourceResponseParserFn).toBe(true);
		expect(resourceResponseParserFn).toEqual(jasmine.any(Function));
	});

	it('should parse response body and return response with body', function() {
		// given
		var response = {};
		var dummyBody = '123123';
		var parsedResponse;
		$parse('response.body').assign(response, dummyBody);

		// when
		parsedResponse = resourceResponseParserFn(response);

		// then
		expect(parsedResponse).toBe(dummyBody);
	});

	it('should return a request for not resource response', function() {
		// given
		var response = {
			dummy: 'fummy'
		};
		var parsedResponse;

		// when
		parsedResponse = resourceResponseParserFn(response);

		// then
		expect(parsedResponse).toBe(response);
	});
});
