'use strict';

describe('Directive: "breadcrumbs" ', function() {
	var $compile, $rootScope, $scope, $stateProvider, $state, $location;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.Breadcrumbs');

		angular.mock.module(function(_$stateProvider_) {
			$stateProvider = _$stateProvider_;
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

			.state('a.f', {
				url: '/f',
				label: 'Foo F'
			})

			.state('a.f.g', {
				url: '/g'
			})

			.state('a.f.h', {
				url: '/h',
				modal: true,
				label: 'Foo Modal'
			})

			.state('a.f.i', {
				url: '/i',
				label: 'Foo AFI'
			})

			.state('a.params', {
				url: '/params/:id',
				label: 'Params'
			})
		;
	});

	function getParentStatesNum($state) {
		var state = $state.$current,
			parents = 0;

		if (state.modal || !state.label)  {
			parents--;
		}

		while ((state = state.parent)) {
			parents++;
		}

		return parents;
	}

	it('Should check if directive have procesed element', function() {
		// given
		var html = $compile('<breadcrumbs></breadcrumbs>')($scope);

		// when
		$location.path('/a');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();

		// then
		expect(html).not.toBeNull();
		expect(html.length).not.toEqual(0);
		expect(html.prop('tagName').toLowerCase()).not.toEqual('breadcrumbs');
	});

	it('Should test if element contains proper structure', function() {
		// given
		var html = $compile('<breadcrumbs></breadcrumbs>')($scope);

		// when
		$location.path('/a/c/d/e');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();

		// then
		expect(html.attr('class')).toMatch('breadcrumbs');
		expect(html.find('li').length).toEqual(getParentStatesNum($state));
	});

	it('Should test if root of breadcrumbs has proper number of elements', function() {
		// given
		var html = $compile('<breadcrumbs></breadcrumbs>')($scope);

		// when
		$location.path('/a');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();

		// then
		expect(html.find('li').length).toEqual(getParentStatesNum($state));
	});

	it('Should skip routes without labels', function() {
		// given
		var html = $compile('<breadcrumbs></breadcrumbs>')($scope);

		// when
		$location.path('/a/f/g');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();

		// then
		expect(html.find('li').length).toEqual(
			getParentStatesNum($state)
		);
	});

	it('Should skip modal routes', function() {
		// given
		var html = $compile('<breadcrumbs></breadcrumbs>')($scope);

		// when
		$location.path('/a/f/h');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();

		// then
		expect(html.find('li').length).toEqual(
			getParentStatesNum($state)
		);
	});

	it('Should use proper route parameters and assign to links', function() {
		// given
		var html = $compile('<breadcrumbs></breadcrumbs>')($scope);
		var id   = 123;

		// when
		$location.path('/a/params/' + id);
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();

		// then
		var lastLink = html.find('a').eq(-1);

		expect(lastLink.attr('href')).toEqual('#/a/params/' + id);
	});
});