'use strict';

describe('Wizard Manager: ValidityChange Directive', function() {
	var $rootScope;
	var $scope;
	var $compile;

	beforeEach(angular.mock.module('TT-UI.WizardManager.Directives.ValidityChange'));
	beforeEach(angular.mock.inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();
		$compile = $injector.get('$compile');
	}));

	afterEach(function() {
		$scope.$destroy();
	});

	it('should check if validity callback was called after state have changed to true', function() {
		// given
		var html = '<form name="fooForm" validity-change="testFn(isValid, errors)"></form>';
		var validStatus;
		var errorStatus;

		$scope.testFn = function(isValid, errors) {
			validStatus = isValid;
			errorStatus = errors;
		};
		var htmlEl = $compile(html)($scope);

		// when
		var formCtrl = htmlEl.controller('form');
		formCtrl.$valid = true;
		$scope.$digest();

		// then
		expect(validStatus).toBeTruthy();
		expect(Object.keys(errorStatus).length).toEqual(0);
	});

	it('should check if validity callback was called after state have changed to false', function() {
		// given
		var html = '<form name="fooForm" validity-change="testFn(isValid, errors)"><input ng-model="foo" required /></form>';
		var validStatus;
		var errorsStatus;

		$scope.testFn = function(isValid, errors) {
			validStatus  = isValid;
			errorsStatus = errors;
		};
		var htmlEl = $compile(html)($scope);
		var formCtrl = htmlEl.controller('form');
		formCtrl.$valid = true;
		$scope.$digest();

		// when
		formCtrl.$valid = false;
		$scope.$digest();

		// then
		expect(validStatus).toBeFalsy();
		expect(Object.keys(errorsStatus).length).toBeGreaterThan(0);
	});
});