'use strict';

describe('tv4: Phone number format validation', function() {
	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Tv4');
		angular.mock.inject();
	});

	// Test schema
	var schema = {
		'type': 'string',
		'format': 'clm-phone-number'
	};

	it('Should not allow letters', function() {
		var data = 'ABCD';

		var result = tv4.validate(data, schema);

		expect(result).toBe(false);
		expect(tv4.error.code).toBe(tv4.errorCodes.FORMAT_CUSTOM);
	});

	it('Should not allow special characters', function() {
		var data = '+358#!1234567';

		var result = tv4.validate(data, schema);

		expect(result).toBe(false);
		expect(tv4.error.code).toBe(tv4.errorCodes.FORMAT_CUSTOM);
	});

	it('Should allow international format without whitespaces or dashes', function() {
		var data = '+358401231234';

		var result = tv4.validate(data, schema);

		expect(result).toBe(true);
		expect(tv4.error).toBeNull();
	});

	it('Should allow international format with whitespaces or dashes', function() {
		var data = '+358 40-1231234';

		var result = tv4.validate(data, schema);

		expect(result).toBe(true);
		expect(tv4.error).toBeNull();
	});

	it('Should allow national format with dashes', function() {
		var data = '040-1231234';

		var result = tv4.validate(data, schema);

		expect(result).toBe(true);
		expect(tv4.error).toBeNull();
	});

	it('Should allow national format with whitespaces', function() {
		var data = '040 1231234';

		var result = tv4.validate(data, schema);

		expect(result).toBe(true);
		expect(tv4.error).toBeNull();
	});

	it('Should not allow number to be more than 12 characters (without country code)', function() {
		var data = '+1340 40 1231234789';

		var result = tv4.validate(data, schema);

		expect(result).toBe(false);
		expect(tv4.error.code).toBe(tv4.errorCodes.FORMAT_CUSTOM);
	});

	it('Should not allow numbers shorter than 6 digits', function() {
		var data = '12312';

		var result = tv4.validate(data, schema);

		expect(result).toBe(false);
		expect(tv4.error.code).toBe(tv4.errorCodes.FORMAT_CUSTOM);
	});
});
