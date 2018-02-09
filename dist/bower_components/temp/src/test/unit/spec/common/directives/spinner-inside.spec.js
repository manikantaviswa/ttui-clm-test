'use strict';

describe('Directive: "spinnerInside" ', function() {
	var $compile, $scope, $rootScope, html, spinner, SPINNER_INSIDE_EVENTS;

	var tpl = '<div spinner-inside></div>';

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.SpinnerInside');

		angular.mock.inject(function(_$rootScope_, _$compile_, _SPINNER_INSIDE_EVENTS_) {
			$rootScope            = _$rootScope_;
			$scope                = $rootScope.$new();
			$compile              = _$compile_;
			SPINNER_INSIDE_EVENTS = _SPINNER_INSIDE_EVENTS_;
		});

		// given
		html = $compile(tpl)($scope);

		var children = html.children('div').eq(-1);
		spinner = angular.element(children);
		document.getElementsByTagName('body')[0].appendChild(spinner[0]);
	});

	afterEach(function() {
		document.getElementsByTagName('body')[0].removeChild(spinner[0]);
	});

	it('Should check if directive have processed element', function() {
		// then
		expect(spinner).not.toBeNull();
		expect(spinner.length).not.toEqual(0);
	});

	it('Should check if inside spinner isn\'t visible by default', function() {
		// then
		expect(spinner.hasClass('hidden')).toBe(true);
	});

	it('Should check if inside spinner becomes visible on show event', function() {
		$rootScope.$emit(SPINNER_INSIDE_EVENTS.SHOW);
		// then
		expect(spinner.hasClass('hidden')).toBe(false);
	});

	it('Should check if inside spinner message is updated on show event', function() {
		$rootScope.$emit(SPINNER_INSIDE_EVENTS.SHOW, {message: 'TestMessage'});
		// when
		$scope.$digest();
		// then
		expect(spinner.hasClass('hidden')).toBe(false);
		expect($scope.message).toBe('TestMessage');
	});

	it('Should check if inside spinner becomes hidden on hide event', function() {
		$rootScope.$emit(SPINNER_INSIDE_EVENTS.HIDE);
		// then
		expect(spinner.hasClass('hidden')).toBe(true);
	});

});
