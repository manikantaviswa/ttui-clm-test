describe('Directive: "toggle" ', function() {
	'use strict';

	var $compile, $scope, $rootScope;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.Toggle');

		angular.mock.inject(function(_$compile_, _$rootScope_) {
			$compile   = _$compile_;
			$rootScope = _$rootScope_;
			$scope     = $rootScope.$new();
		});
	});

	it('Should check if directive have procesed element', function() {
		// given
		var html = $compile('<toggle ng-model="foo"></toggle>')($scope);

		// when
		$scope.$digest();

		// then
		expect(html).not.toBeNull();
		expect(html.length).not.toEqual(0);
		expect(html.prop('tagName').toLowerCase()).not.toEqual('toggle');
	});

	it('Should test if element contains proper structure', function() {
		// given
		var html   = $compile('<toggle ng-model="foo"></toggle>')($scope),
			toggle = html.find('label'),
			input  = html.find('input');

		// when
		$scope.$digest();

		// then
		expect(html.attr('class')).toMatch(/toggle-on-off/);
		expect(toggle.attr('for')).not.toBeNull();
		expect(toggle.attr('for')).toEqual(input.attr('id'));
	});

	it('Should check if id of toggle element is unique', function() {
		// given
		var html    = $compile('<div><toggle ng-model="foo"></toggle><toggle ng-model="bar"></toggle></div>')($scope);
		var toggler = angular.element(html[0].querySelectorAll('.toggle-on-off'));

		// when
		$scope.$digest();

		// then
		expect(
			toggler.eq(0).find('input').attr('id')
		)
		.not.toEqual(
			toggler.eq(1).find('input').attr('id')
		);
	});

	it('Should check if toggle is on "on" state', function() {
		// given
		 $compile('<toggle on="true" ng-model="foo"></toggle>')($scope);

		// when
		$scope.$digest();

		// then
		expect($scope.foo).toBe(true);
	});

	it('Should check if model is used to set "on" sate', function() {
		// given
		$scope.bar = true;
		$compile('<toggle on="bar" ng-model="foo"></toggle>')($scope);

		// when
		$scope.$digest();

		// then
		expect($scope.foo).toBe(true);
	});

	it('Should check if toggle is on "off" state', function() {
		// given
		 $compile('<toggle on="false" ng-model="foo"></toggle>')($scope);

		// when
		$scope.$digest();

		// then
		expect($scope.foo).toBe(false);
	});

	it('Should check if model is used to set "off" sate', function() {
		// given
		$scope.bar = false;
		$compile('<toggle on="bar" ng-model="foo"></toggle>')($scope);

		// when
		$scope.$digest();

		// then
		expect($scope.foo).toBe(false);
	});

	it('Should check if state of have changed after clicking on toggler', function() {
		// given
		$scope.bar = true;
		var toggle = $compile('<toggle on="bar" ng-model="bar"></toggle>')($scope);

		// when
		$scope.$digest();
		toggle[0].querySelector('input[type="checkbox"]').click();

		// then
		expect($scope.bar).toBe(false);
	});
});