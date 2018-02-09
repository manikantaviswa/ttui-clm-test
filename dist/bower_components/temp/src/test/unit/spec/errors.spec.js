'use strict';

describe('Application Error:', function() {
	var $rootScope;
	var $q;
	var $stateProvider;
	var $state;

	var FlashMessage;

	var FAKE_CONFIG = {
		LOCALE_LIST: ['dummyLanguage']
	};

	var promise;
	var dependencyResolver = function() {
		return promise;
	};

	beforeEach(function() {
		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', FAKE_CONFIG);
		});

		angular.mock.module('TT-UI.Common.Errors');

		angular.mock.module(function(_$stateProvider_) {
			$stateProvider = _$stateProvider_;
		});

		angular.mock.inject(function(_$rootScope_, _$q_, _$state_, _FlashMessage_) {
			$rootScope   = _$rootScope_;
			$q           = _$q_;
			$state       = _$state_;

			FlashMessage = _FlashMessage_;
		});
	});

	beforeEach(function() {
		$stateProvider
			.state('a', {
				url:   '/a',
				label: 'Foo A',
				resolve: {
					dependency: dependencyResolver
				}
			});
	});

	it('should not trigger an error when resolving state successed', function() {
		// given
		spyOn(FlashMessage, 'show');
		promise = $q.when();

		// when
		$state.go('a');
			$rootScope.$digest();

		// then
		expect(FlashMessage.show).not.toHaveBeenCalled();
		});

	it('should trigger an error when resolving state failed', function() {
		// given
		var error = 'Some error';
		promise = $q.reject(error);
		spyOn(FlashMessage, 'show');

		// when
		$state.go('a');
		$rootScope.$digest();

		// then
		expect(FlashMessage.show).toHaveBeenCalledWith(
			jasmine.any(String),
			error,
			jasmine.any(String)
		);
		});

	it('should not show error message on resourceFetchError while changing state is in progress', function() {
		// given
		var fooCode = '123';
		var fooDescription = 'description';
		spyOn(FlashMessage, 'show');
		promise = $q.defer();

		// when
		$state.go('a');
		$rootScope.$emit('resourceFetchError', fooCode, fooDescription);
		$rootScope.$digest();

		// then
		expect(FlashMessage.show).not.toHaveBeenCalled();
		});

	it('should show only one error message if error happened on state resolving stage', function() {
		// given
		var fooCode = '123';
		var fooDescription = 'description';
		var error = 'Some error';

		promise = $q.reject(error);
		spyOn(FlashMessage, 'show');

		// when
		$state.go('a');
		$rootScope.$emit('resourceFetchError', fooCode, fooDescription);
		$rootScope.$digest();

		// then
		expect(FlashMessage.show.calls	.count()).toEqual(1);
	});

	it('should show two error messages if error happened after state resolving stage', function() {
		// given
		var fooError = [{
			code: 'fooCode',
			description: 'description'
		}];

		promise = $q.reject(fooError);
		spyOn(FlashMessage, 'show');

		// when
		$state.go('a');
		$rootScope.$digest();
		$rootScope.$emit('resourceFetchError', fooError);
		$rootScope.$digest();

		// then
		expect(FlashMessage.show.calls.count()).toEqual(2);
	});

	it('should show four error messages if four errors happened on state resolving stage', function() {
		// given
		var fooCode = '123';
		var fooDescription = 'description';
		var errors = ['1', '2', '3', '4'];

		promise = $q.reject(errors);
		spyOn(FlashMessage, 'show');

		// when
		$state.go('a');
		$rootScope.$emit('resourceFetchError', fooCode, fooDescription);
		$rootScope.$digest();

		// then
		expect(FlashMessage.show.calls.count()).toEqual(errors.length);
	});



	it('should show four error messages if fetchErrors array with four elements', function() {
		// given
		var errors = ['1', '2', '3', '4'];

		promise = $q.reject(errors);
		spyOn(FlashMessage, 'show');

		// when
		$state.go('a');
		$rootScope.$digest();

		// then
		expect(FlashMessage.show.calls.count()).toEqual(errors.length);
	});
});
