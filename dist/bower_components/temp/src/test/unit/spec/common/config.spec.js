'use strict';

describe('Common: Config', function() {
	var COMMON_CONFIG;

	beforeEach(angular.mock.module('TT-UI.Common.Config'));

	beforeEach(angular.mock.inject(function($injector) {
		COMMON_CONFIG = $injector.get('COMMON_CONFIG');
	}));

	it('should check if const is defined', function() {
		expect(COMMON_CONFIG).toEqual(jasmine.any(Object));
	});

	it('should check if module base url is valid', function() {
		expect(COMMON_CONFIG.BASE_URL).toEqual('scripts/common/');
	});
});