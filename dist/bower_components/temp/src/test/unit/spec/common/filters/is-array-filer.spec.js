'use strict';

describe('Filter: isArray', function() {
	var isArrayFilter;

	beforeEach(function(){
		angular.mock.module('TT-UI.Common.Filters.IsArrayFilter');

		angular.mock.inject(function(_isArrayFilter_) {
			isArrayFilter = _isArrayFilter_;
		});
	});

	it('should check if given input is an array', function() {
		// given
		var input = [];

		// when
		var results = isArrayFilter(input);

		// then
		expect(results).toBeTruthy();
	});

	it('should check if given string is an array', function() {
		// given
		var input = '';

		// when
		var results = isArrayFilter(input);

		// then
		expect(results).toBeFalsy();
	});

	it('should check if given array is not an array', function() {
		// given
		var input = [];

		// when
		var results = isArrayFilter(input, true);

		// then
		expect(results).toBeFalsy();
	});

	it('should check if given string is not an array', function() {
		// given
		var input = '';

		// when
		var results = isArrayFilter(input, true);

		// then
		expect(results).toBeTruthy();
	});
});
