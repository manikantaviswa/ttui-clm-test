'use strict';

describe('$q spread extension:', function() {
	var $q, $rootScope;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Spread');

		angular.mock.inject(function(_$q_, _$rootScope_) {
			$q = _$q_;
			$rootScope = _$rootScope_;
		});
	});

	it('spread mehod should be exposed', function() {
		expect($q.spread).toBeDefined();
		expect(typeof $q.spread).toBe('function');
	});

	it('should call spread function', function() {
		// given
		var callback = jasmine.createSpy('callback');
		var context = {
			foo: 'bar'
		};
		var fn = $q.spread(callback, context);
		var paramA = 123;
		var paramB = [1, 2, 3];

		// when
		var promises = [paramA, paramB];
		$q.all(promises).then(fn);
		$rootScope.$digest();

		// then
		expect(callback).toHaveBeenCalledWith(paramA, paramB);
	});
});
