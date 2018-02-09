'use strict';

describe('Service: Api', function() {
	var FAKE_CONFIG = {
		API_URL: 'http://api-url/foo/',
		MOCK_API_URL: 'http://mock-url/bar',
		UPC_API_URL: 'http://upc-api-url/moo',
		CLM_360_URL: 'http://360-url/boo/',
		CLM_360_API_URL: 'http://360-api-url/goo'
	};
	var Api;

	beforeEach(function() {
		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', FAKE_CONFIG);
		});

		angular.mock.module('TT-UI.Common.Services.Api');

		angular.mock.inject(function($injector) {
			Api = $injector.get('Api');
		});
	});

	it('should expose getUrl method', function() {
		expect(Api.getUrl()).toEqual('http://api-url/foo/');
	});

	it('should expose getMockUrl method', function() {
		expect(Api.getMockUrl()).toEqual('http://mock-url/bar/');
	});

	it('should expose getUpcUrl method', function() {
		expect(Api.getUpcUrl()).toEqual('http://upc-api-url/moo/');
	});

	it('should expose getClm360Url method', function() {
		expect(Api.getClm360Url()).toEqual('http://360-url/boo/');
	});

	it('should expose getClm360ApiUrl method', function() {
		expect(Api.getClm360ApiUrl()).toEqual('http://360-api-url/goo/');
	});
});
