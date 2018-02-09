'use strict';

describe('Directive: "date-validator" ', function() {
	var $compile;
	var $rootScope;
	var $scope;
	var form;

	var FAKE_CONFIG = {
		DATE_FORMAT: 'dd/MM/yyyy'
	};

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.DateValidator');

		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', FAKE_CONFIG);
		});

		angular.mock.inject(function($injector) {
			$compile   = $injector.get('$compile');
			$rootScope = $injector.get('$rootScope');
			$scope     = $rootScope.$new();
		});

		$scope.model = { date: null };
		$compile('<form name="form"><input type="text" ng-model="model.date" name="date" date-validator></form>')($scope);
		$scope.$digest();
		form = $scope.form;
	});

	it('should valid with correct date format', function() {
		// when
		form.date.$setViewValue('01/01/2001');
		$scope.$digest();

		// then
		expect(form.date.$valid).toBeTruthy();
		expect($scope.model.date).toEqual('01/01/2001');
	});

	it('should valid with correct date format (leap year)', function() {
		// when
		form.date.$setViewValue('29/02/1996');
		$scope.$digest();

		// then
		expect(form.date.$valid).toBeTruthy();
	});

	it('should not valid with incorrect date format', function() {
		// when
		form.date.$setViewValue('foo-bar');
		$scope.$digest();

		// then
		expect(form.date.$valid).toBeFalsy();
	});

	it('should not valid with incorrect date format (not leap year)', function() {
		// when
		form.date.$setViewValue('29/02/1997');
		$scope.$digest();

		// then
		expect(form.date.$valid).toBeFalsy();
	});

	it('should not valid with incorrect date format (too long date)', function() {
		// when
		form.date.$setViewValue('99/01/2019');
		$scope.$digest();

		// then
		expect(form.date.$valid).toBeFalsy();
	});

	it('should not valid with incorrect date format (numbers)', function() {
		// when
		form.date.$setViewValue('11231985');
		$scope.$digest();


		// then
		expect(form.date.$valid).toBeFalsy();
	});

	it('should not valid with incorrect date format (numbers)', function() {
		// when
		form.date.$setViewValue('1201980');
		$scope.$digest();

		// then
		expect(form.date.$valid).toBeFalsy();
	});

	it('should not valid with incorrect date format (numbers)', function() {
		// when
		form.date.$setViewValue('12011980');
		$scope.$digest();

		// then
		expect(form.date.$valid).toBeFalsy();
	});

	it('should not valid with incorrect date format (month and day)', function() {
		// when
		form.date.$setViewValue('12/30/2001');
		$scope.$digest();

		// then
		expect(form.date.$valid).toBeFalsy();
	});

	it('should valid with custom date format', function() {
		//given
		$compile('<form name="form"><input type="text" ng-model="model.date" name="date" date-validator date-format="MM/dd/yyyy"></form>')($scope);
		$scope.$digest();
		form = $scope.form;

		// when
		form.date.$setViewValue('12/30/2001');
		$scope.$digest();

		// then
		expect(form.date.$valid).toBeTruthy();
	});

	it('should valid with custom date format with : separator', function() {
		//given
		$compile('<form name="form"><input type="text" ng-model="model.date" name="date" date-validator date-format="MM:dd:yyyy"></form>')($scope);
		$scope.$digest();
		form.date.$commitViewValue();
		form = $scope.form;
		$scope.$digest();

		// when
		form.date.$setViewValue('12:30:2001');
		form.date.$commitViewValue();

		// then
		expect(form.date.$valid).toBeTruthy();
	});

	it('should valid with custom date format with jalali date', function() {
		//given
		$compile('<form name="form"><input type="text" ng-model="model.date" name="date" date-validator date-format="jYYYY/jMM/jDD"></form>')($scope);
		$scope.$digest();
		form = $scope.form;

		// when
		form.date.$setViewValue('1391/12/30');
		$scope.$digest();

		// then
		expect(form.date.$valid).toBeTruthy();
	});

	it('should not valid with invalid date', function() {
		// when
		form.date.$setViewValue('99/99/9999');
		$scope.$digest();

		// then
		expect(form.date.$valid).toBeFalsy();
	});

	it('should not valid with invalid date', function() {
		// when
		form.date.$setViewValue('30/092015');
		$scope.$digest();

		// then
		expect(form.date.$valid).toBeFalsy();
	});
});
