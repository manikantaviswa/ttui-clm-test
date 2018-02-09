'use strict';

describe('Directive: "action-links" ', function() {
	var $compile, $rootScope, $scope, $stateProvider, $urlRouterProvider, $state, $location;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.ActionLinks');

		angular.mock.module(function(_$stateProvider_, _$urlRouterProvider_) {
			$stateProvider     = _$stateProvider_;
			$urlRouterProvider = _$urlRouterProvider_;
		});

		angular.mock.inject(function(_$compile_, _$rootScope_, _$location_, _$state_) {
			$compile   = _$compile_;
			$rootScope = _$rootScope_;
			$scope     = $rootScope.$new();
			$location  = _$location_;
			$state     = _$state_;
		});
	});

	beforeEach(function() {
		$stateProvider
			.state('a', {
				url:   '/a',
				label: 'Foo A'
			})
			.state('b', {
				parent: 'a',
				url:   '/b',
				label: 'Foo AB'
			})
			.state('c', {
				parent: 'a',
				url:   '/c',
				label: 'Foo AC'
			})
			.state('c.d', {
				url:   '/d',
				label: 'Foo ACD'
			})

			.state('b.params', {
				url: '/params/:id',
				label: 'Params'
			})
		;

		$urlRouterProvider.otherwise('');
	});

	it('Should check if directive have procesed element', function() {
		// given
		var html = $compile('<action-links></action-links>')($scope);

		// when
		$location.path('/a');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();

		// then
		expect(html).not.toBeNull();
		expect(html.length).not.toEqual(0);
		expect(html.prop('tagName').toLowerCase()).not.toMatch('action-links');
	});

	it('Should test if element contains proper structure', function() {
		// given
		var html = $compile('<action-links></action-links>')($scope),
			states;

		// when
		$location.path('/a');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();

		// then
		states = $state.$current.children;

		expect($state.$current.name).toBe('a');
		expect(html.children().length).toEqual(states.length);
		expect(html.children().eq(0).text()).toEqual(states[0].self.label);
		expect(html.children().eq(1).text()).toEqual(states[1].self.label);
	});

	it('Should test link of a children', function() {
		// given
		var html = $compile('<action-links></action-links>')($scope),
			states;

		// when
		$location.path('/a/c');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();

		// then
		states = $state.$current.children;

		expect($state.$current.name).toBe('c');
		expect(html.children().length).toEqual(states.length);
		expect(html.children().eq(0).text()).toEqual(states[0].self.label);
	});

	it('Should test if links are missing', function() {
		// given
		var html = $compile('<action-links></action-links>')($scope);

		// when
		$location.path('/foo');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();

		// then
		expect(html.children().length).toEqual(0);
	});

	// TODO: Fix me
	xit('Should skip routes with parameters', function() {
		// given
		var html = $compile('<action-links></action-links>')($scope);

		// when
		$location.path('/a/b');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();

		// then
		expect(html.find('li').length).toEqual(0);
	});
});
