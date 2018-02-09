'use strict';

describe('Application routes', function() {
	var $rootScope;
	var $state;
	var $timeout;
	var $window;

	var INDEX_STATE = 'index';
	var FAKE_CONFIG = {
		HOME_STATE: 'fake-home-state'
	};

	var HOME_URL = 'home-url';

	beforeEach(function() {
		angular.mock.module('TT-UI.Common', function($stateProvider, CONFIG) {
			$stateProvider.state(FAKE_CONFIG.HOME_STATE, {
				parent: CONFIG.INDEX_STATE,
				url: HOME_URL
			});
		});

		angular.mock.module('TT-UI.Common.Routes', function($provide) {
			$provide.constant('CONFIG', FAKE_CONFIG);
		});

		angular.mock.inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$state     = $injector.get('$state');
			$timeout   = $injector.get('$timeout');
			$window    = $injector.get('$window');
		});
	});

	it('should define abstract index state', function() {
		// given
		var STATE_URL = '/';

		// when
		var state = $state.get(INDEX_STATE);

		// then
		expect(state.name).toBe(INDEX_STATE);
		expect(state.abstract).toBeTruthy();
		expect(state.url).toBe(STATE_URL);
	});

	it('should redirect to home state if location hash equal to `#/`', function() {
		// given
		spyOn($state, 'go');

		//when
		$window.location.hash = '#/';
		$rootScope.$digest();
		$timeout.flush();

		// then
		expect($state.go).toHaveBeenCalledWith(FAKE_CONFIG.HOME_STATE);
	});

	it('should redirect to home state if location hash equal to `#`', function() {
		// given
		spyOn($state, 'go');

		//when
		$window.location.href = $window.location.href.replace($window.location.hash,'') + '#';
		$rootScope.$digest();
		$timeout.flush();

		// then
		expect($state.go).toHaveBeenCalledWith(FAKE_CONFIG.HOME_STATE);
	});
});
