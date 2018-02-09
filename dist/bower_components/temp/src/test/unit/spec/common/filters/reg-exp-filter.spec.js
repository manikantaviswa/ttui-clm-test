'use strict';

describe('Filter: RegExpFilter', function() {
	var escapeFilter;

	beforeEach(function(){
		angular.mock.module('TT-UI.Common.Filters.RegExpFilter');

		angular.mock.inject(function($injector) {
			escapeFilter = $injector.get('escapeFilter');
		});
	});

	it('should escape Regular Expression reserved chars', function() {
		// given
		var input = '.?-[]()^$';

		// when
		var results = escapeFilter(input);

		// then
		expect(results).toEqual('\\.\\?\\-\\[\\]\\(\\)\\^\\$');
	});

	it('should not escape regular string', function() {
		// given
		var input = 'foobar';

		// when
		var results = escapeFilter(input);

		// then
		expect(results).toEqual('foobar');
	});
});