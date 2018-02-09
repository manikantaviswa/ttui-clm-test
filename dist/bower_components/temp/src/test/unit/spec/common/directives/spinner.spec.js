'use strict';

describe('Directive: "spinnerOverlay" ', function() {
	var $compile, $scope, $rootScope, SPINNER_EVENTS;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.Spinner');

		angular.mock.inject(function(_$rootScope_, _$compile_, _SPINNER_EVENTS_) {
			$rootScope     = _$rootScope_;
			$scope         = $rootScope.$new();
			$compile       = _$compile_;
			SPINNER_EVENTS = _SPINNER_EVENTS_;
		});
	});

	var tpl = '<spinner-overlay></spinner-overlay>';

	it('Should check if directive have processed element', function() {
		// given
		var html = $compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		expect(html).not.toBeNull();
		expect(html.length).not.toEqual(0);
	});

	it('Should check if overlay isn\'t visible by default', function() {
		// given
		$compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		expect($scope.spinnerOverlayVisible).toBe(false);
	});

	it('Should check if overlay becomes visible on show event', function() {
		// given
		$compile(tpl)($scope);

		$rootScope.$emit(SPINNER_EVENTS.SHOW);

		// when
		$scope.$digest();

		// then
		expect($scope.spinnerOverlayVisible).toBe(true);
	});

	it('Should check if overlay message is updated on show event', function() {
		// given
		$compile(tpl)($scope);

		$rootScope.$emit(SPINNER_EVENTS.SHOW, {message: 'TestMessage'});

		// when
		$scope.$digest();

		// then
		expect($scope.spinnerOverlayVisible).toBe(true);
		expect($scope.message).toBe('TestMessage');
	});

	it('Should check if overlay becomes hidden on hide event', function() {
		// given
		$compile(tpl)($scope);
		$scope.spinnerOverlayVisible = true;

		$rootScope.$emit(SPINNER_EVENTS.HIDE);

		// when
		$scope.$digest();

		// then
		expect($scope.spinnerOverlayVisible).toBe(false);
	});

});
