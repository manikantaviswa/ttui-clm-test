'use strict';

describe('Directive: "nav-menu" ', function() {
	var $compile, $scope, $rootScope, $state, $location, $stateProvider;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.NavMenu');

		angular.mock.module(function(_$stateProvider_) {
			$stateProvider = _$stateProvider_;
		});

		angular.mock.inject(function(_$compile_, _$rootScope_, _$state_, _$location_) {
			$compile   = _$compile_;
			$rootScope = _$rootScope_;
			$scope     = $rootScope.$new();
			$state     = _$state_;
			$location  = _$location_;
		});
	});

	beforeEach(function() {
		$stateProvider
			.state('a', {
				url:   '/a',
				label: 'Foo A'
			})
			.state('a.b', {
				url:   '/b',
				label: 'Foo AB'
			})
			.state('a.c', {
				url:   '/c',
				label: 'Foo AC'
			})
			.state('a.c.d', {
				url:   '/d',
				label: 'Foo ACD'
			})

			.state('a.c.d.e', {
				url:   '/e',
				label: 'Foo ACDE'
			})
		;
	});

	it('Should check if directive have procesed element', function() {
		// given
		var html = $compile('<nav-menu></nav-menu>')($scope);

		// when
		$scope.$digest();

		// then
		expect(html).not.toBeNull();
		expect(html.length).not.toEqual(0);
		expect(html.prop('tagName').toLowerCase()).not.toBe('nav-menu');
	});

	it('Should test if element contains proper structure', function() {
		// given
		var html = $compile('<nav-menu state="a"></nav-menu>')($scope);

		// when
		$location.path('/a');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();

		// then
		expect($state.$current.name).toBe('a');
		expect(html.attr('class')).toMatch('main-menu');
		expect(html.find('a').length).toEqual($state.$current.children.length);
	});

	it('Should find proper root based on state name', function() {
		// given
		var state = $state.get('a.c'),
			html  = $compile('<nav-menu state="' + state.name + '"></nav-menu>')($scope);

		// when
		$location.path('/a/c');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();

		// then
		expect($state.$current.name).toBe('a.c');
		expect(html.find('a').text()).toEqual($state.$current.children[0].self.label);
	});
});