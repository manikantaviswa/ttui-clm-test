'use strict';

describe('Directive: "tabs" ', function() {
	var $compile, $scope, $rootScope, $stateProvider, $state, $location, $timeout;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.Tabs');

		angular.mock.module(function(_$stateProvider_) {
			$stateProvider = _$stateProvider_;
		});

		angular.mock.inject(function(_$compile_, _$rootScope_, _$state_, _$location_, _$timeout_) {
			$compile   = _$compile_;
			$rootScope = _$rootScope_;
			$scope     = $rootScope.$new();
			$state     = _$state_;
			$location  = _$location_;
			$timeout   = _$timeout_;
		});
	});

	var tpl =
		'<tabset>' +
			'<tab title="Foo Tab" state="a.b"></tab>' +
			'<tab title="Bar Tab" state="a.c"></tab>' +
		'</tabset>'
	;

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
		;

		$location.path('/a');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();
	});

	it('Should check if directive have procesed element', function() {
		// given
		var html = $compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		expect(html).not.toBeNull();
		expect(html.length).not.toEqual(0);
		expect(html.prop('tagName').toLowerCase()).not.toEqual('tabset');
	});

	it('Should test if element contains proper structure', function() {
		// given
		var html = $compile(tpl)($scope),
			tabs = html.find('li');

		// when
		$scope.$digest();

		//  then
		expect(html.attr('class')).toMatch('tabs');
		expect(tabs.length).toEqual(2);
		expect(tabs.attr('class')).toMatch('ui-state-default');
		expect(tabs.eq(0).children().text()).toEqual('Foo Tab');
		expect(tabs.eq(1).children().text()).toEqual('Bar Tab');
	});

	it('Should select another tab and make it active', function() {
		// given
		var html = $compile(tpl)($scope),
			tabs = html.find('li');

		// when
		$scope.$digest();
		tabs.eq(1).find('a').triggerHandler('click');

		// then
		expect(tabs.eq(0).hasClass('ui-state-active')).toBe(false);
		expect(tabs.eq(1).hasClass('ui-state-active')).toBe(true);
	});

	it('Should cahnge current state to a state from first tab', function() {
		// given
		var html = $compile(tpl)($scope),
			tabs = html.find('li');

		// when
		$timeout.flush();
		$scope.$digest();

		expect($state.$current.name).toEqual(tabs.eq(0).attr('state'));
	});

	it('Should set current state using a state from selected tab', function() {
		// given
		var html = $compile(tpl)($scope),
			tabs = html.find('li');

		// when
		$timeout.flush();
		tabs.eq(1).find('a').triggerHandler('click');

		// then
		expect($state.$current.name).toEqual(tabs.eq(1).attr('state'));
	});

	it('Should auto select tab using current state', function() {
		// given
		var html = $compile(tpl)($scope),
			tabs = html.find('li');

		// when
		$location.path('/a/c');
		$scope.$emit('$locationChangeSuccess');
		$scope.$digest();

		// then
		expect($state.$current.name).toEqual(tabs.eq(1).attr('state'));
	});
});
