'use strict';

describe('Directive: "should-be-after" ', function() {
	var $compile, $rootScope, $scope, $dateParser;

	var formHtml =  '<form name="fooFormName">' +
						'<input name="fooName" ng-model="fooModel" type="text" />' +
						'<input name="booName" ng-model="booModel" is-date-after-validator="fooName" type="text" />' +
					'</form>';
	var fakeConfig = {
		MODEL_DATE_FORMAT: 'YYYY/MM/DDT00:00:00.000\'Z\'',
	};

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.IsDateAfterValidator');

		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', fakeConfig);
		});

		angular.mock.inject(function(_$compile_, _$rootScope_, _$dateParser_) {
			$compile   = _$compile_;
			$rootScope = _$rootScope_;
			$scope     = $rootScope.$new();
			$dateParser = _$dateParser_;
		});
	});

	afterEach(function() {
		$scope.$destroy();
	});

	it('Should check if directive adds a validator to ngModel.$validators', function() {
		// given
		$compile(formHtml)($scope);
		var validator;

		// when
		$scope.$digest();
		validator = $scope.fooFormName.booName.$validators.shouldBeAfter;

		// then
		expect(validator).toEqual(jasmine.any(Function));
	});

	it('Should check if directive works in proper way for happy scenario', function() {
		// given
		$compile(formHtml)($scope);
		var formIsValid;

		// when
		$scope.fooModel = '1969/07/27T00:00:00.000Z';
		$scope.booModel = '1969/07/28T00:00:00.000Z';

		$scope.$digest();

		formIsValid = $scope.fooFormName.$valid;
		// then
		expect(formIsValid).toBe(true);
	});

	it('Should check if $validation dont pass for unhappy scenario', function() {
		// given
		$compile(formHtml)($scope);
		var formIsValid;

		// when
		$scope.fooModel = '1969/07/27T00:00:00.000Z';
		$scope.booModel = '1969/07/26T00:00:00.000Z';

		$scope.$digest();

		formIsValid = $scope.fooFormName.$valid;

		// then
		expect(formIsValid).toBe(false);
	});

	it('Should check if $validation pass if relative date will be updated on earlier one after init.', function() {
		// given
		$compile(formHtml)($scope);
		var formIsValid;

		// when
		$scope.fooModel = '1969/07/27T00:00:00.000Z';
		$scope.booModel = '1969/07/26T00:00:00.000Z';

		$scope.$digest();
		$scope.fooFormName.fooName.$setViewValue('1969/07/25T00:00:00.000Z');

		formIsValid = $scope.fooFormName.$valid;

		// then
		expect(formIsValid).toBe(true);
	});

	it('Should check if $validation dont pass if relative date will be updated on some date from the future', function() {
		// given
		$compile(formHtml)($scope);
		var formIsValid;

		// when
		$scope.fooModel = '1969/07/27T00:00:00.000Z';
		$scope.booModel = '1969/07/28T00:00:00.000Z';

		$scope.$digest();
		$scope.fooFormName.fooName.$setViewValue('1969/07/29T00:00:00.000Z');

		formIsValid = $scope.fooFormName.$valid;

		// then
		expect(formIsValid).toBe(false);
	});

	it('Should check if $validation will pass for happy scenario with different date format in config', function() {
		// given
		var html;
		var formIsValid;


		// when
		fakeConfig.MODEL_DATE_FORMAT = 'YYYY-MM-DDT00:00:00.000\'Z\'';
		html = $compile(formHtml)($scope);
		$scope.fooModel = '1969-07-27T00:00:00.000Z';
		$scope.booModel = '1969-07-28T00:00:00.000Z';

		$scope.$digest();

		formIsValid = $scope.fooFormName.$valid;

		// then
		expect(formIsValid).toBe(true);
	});

	it('Should check if $validation will not pass for unhappy scenario with different date format in config', function() {
		// given
		var html;
		var formIsValid;


		// when
		fakeConfig.MODEL_DATE_FORMAT = 'YYYY-MM-DDT00:00:00.000\'Z\'';
		html = $compile(formHtml)($scope);
		$scope.fooModel = '1969-07-29T00:00:00.000Z';
		$scope.booModel = '1969-07-28T00:00:00.000Z';

		$scope.$digest();

		formIsValid = $scope.fooFormName.$valid;

		// then
		expect(formIsValid).toBe(false);
	});
});
