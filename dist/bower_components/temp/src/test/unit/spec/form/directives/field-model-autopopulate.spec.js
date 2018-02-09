describe('Directive: autopopulateTo', function() {
	'use strict';

	var $rootScope;
	var $scope;
	var $parse;
	var $log;
	var $compile;

	var formName = 'fooForm';
	var formCtrl;

	var formTpl = '<form name="' + formName + '" sf-schema="fakeSchema" sf-form="fakeStructure" sf-model="fakeModel" sf-validate auto-tab-form></form>';

	var fakePopulateSchema;
	var fakePopulateStructure;

	var sourcePath;
	var targetPath;

	beforeEach(function() {
		fakePopulateSchema = window.__jsonMocks__['populate-form-schema'];
		fakePopulateStructure = window.__jsonMocks__['populate-form-structure'];

		sourcePath = 'booObject.firstName';
		targetPath = 'mooObject.firstName';

		angular.mock.module(
			'TT-UI.Common.Directives.Forms', // TODO: Remove me when Form components will be fully extracted from Common into Form module
			'TT-UI.Form.Directives.FieldModelAutopopulate'
		);

		angular.mock.inject(function($injector) {
			// TODO: Don't like it but validation service requires it
			var $document = $injector.get('$document');
			spyOn(angular, 'injector').and.returnValue($injector);
			spyOn($document, 'injector').and.returnValue($injector);

			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			$parse = $injector.get('$parse');
			$log = $injector.get('$log');
			$compile = $injector.get('$compile');

			$scope.fakeSchema = angular.copy(fakePopulateSchema);
			$scope.fakeStructure = angular.copy(fakePopulateStructure);
			$scope.fakeModel = {};
		});
	});

	afterEach(function() {
		$scope.$destroy();
		$rootScope.$destroy();
	});

	it('should log when target ngField does not exists', function() {
		// given
		targetPath = 'mooObject.missingField';
		$scope.fakeStructure[0].autopopulateTo = [targetPath];

		$compile(formTpl)($scope);
		$scope.$digest();
		formCtrl = $scope[formName];

		// when
		var ngModel = formCtrl[sourcePath];
		ngModel.$setViewValue('foo');
		$scope.$digest();

		// then
		expect($log.warn.logs).toContain(['Autopopulate: Missing "mooObject.missingField" ngModel field']);
	});

	it('should change input value when source value have been changed', function() {
		// given
		$scope.fakeStructure[0].autopopulateTo = [targetPath];

		var html = $compile(formTpl)($scope);
		$scope.$digest();
		formCtrl = $scope[formName];

		// when
		var ngModel = formCtrl[sourcePath];
		ngModel.$setViewValue('foo');
		$scope.$digest();

		// then
		var field = html[0].querySelector('input[name="mooObject.firstName"]');
		expect(field.value).toEqual('foo');
	});

	it('should autopopulate into target field when source view value have been changed', function() {
		// given
		$scope.fakeStructure[0].autopopulateTo = [targetPath];

		var targetFieldGetter = $parse(targetPath);

		$compile(formTpl)($scope);
		$scope.$digest();
		formCtrl = $scope[formName];

		// when
		var ngModel = formCtrl[sourcePath];
		ngModel.$setViewValue('foo');
		$scope.$digest();

		// then
		expect(targetFieldGetter($scope.fakeModel)).toEqual('foo');
	});

	it('should autopopulate into target field if previous source value and destination value are equals and not `$touched` (values are in sync)', function() {
		// given
		var previousValue = 'abc';
		var currentValue = 'foo';

		$scope.fakeModel = {
			booObject: {firstName: previousValue},
			mooObject: {firstName: previousValue}
		};

		var mooTargetPath = 'mooObject.firstName';

		$scope.fakeStructure[0].autopopulateTo = [
			mooTargetPath
		];

		var targetMooFieldGetter = $parse(mooTargetPath);

		$compile(formTpl)($scope);
		$scope.$digest();
		formCtrl = $scope[formName];

		// when
		var booNgModel = formCtrl[sourcePath];
		booNgModel.$setViewValue(currentValue);
		$scope.$digest();

		// then
		expect(targetMooFieldGetter($scope.fakeModel)).toEqual(currentValue);
	});

	it('should autopopulate into target field if destination value are `undefined` and not `$touched` by user (in sync)', function() {
		// given
		var currentValue = 'foo';

		$scope.fakeModel = {
			mooObject: {firstName: undefined}
		};

		var mooTargetPath = 'mooObject.firstName';

		$scope.fakeStructure[0].autopopulateTo = [
			mooTargetPath
		];

		var targetMooFieldGetter = $parse(mooTargetPath);

		$compile(formTpl)($scope);
		$scope.$digest();
		formCtrl = $scope[formName];

		// when
		var booNgModel = formCtrl[sourcePath];
		booNgModel.$setViewValue(currentValue);
		$scope.$digest();

		// then
		expect(targetMooFieldGetter($scope.fakeModel)).toEqual(currentValue);
	});

	it('should autopopulate into target field if destination value are `null` and not `$touched` by user (in sync)', function() {
		// given
		var previousValue = null;
		var currentValue = 'foo';

		$scope.fakeModel = {
			mooObject: {firstName: previousValue}
		};

		var mooTargetPath = 'mooObject.firstName';

		$scope.fakeStructure[0].autopopulateTo = [
			mooTargetPath
		];

		var targetMooFieldGetter = $parse(mooTargetPath);

		$compile(formTpl)($scope);
		$scope.$digest();
		formCtrl = $scope[formName];

		// when
		var booNgModel = formCtrl[sourcePath];
		booNgModel.$setViewValue(currentValue);
		$scope.$digest();

		// then
		expect(targetMooFieldGetter($scope.fakeModel)).toEqual(currentValue);
	});

	it('should not autopopulate into target field if previous source value and destination value are different (values are not in sync)', function() {
		// given
		var previousValue = 'abc';
		var valueOutOfSync = 'def';
		var currentValue = 'foo';

		$scope.fakeModel = {
			booObject: {firstName: previousValue},
			mooObject: {firstName: previousValue},
			gooObject: {firstName: valueOutOfSync}
		};

		var mooTargetPath = 'mooObject.firstName';
		var gooTargetPath = 'gooObject.firstName';

		$scope.fakeStructure[0].autopopulateTo = [
			mooTargetPath,
			gooTargetPath
		];

		var targetMooFieldGetter = $parse(mooTargetPath);
		var targetGooFieldGetter = $parse(gooTargetPath);

		$compile(formTpl)($scope);
		$scope.$digest();
		formCtrl = $scope[formName];

		// when
		var booNgModel = formCtrl[sourcePath];
		booNgModel.$setViewValue(currentValue);
		$scope.$digest();

		// then
		expect(targetMooFieldGetter($scope.fakeModel)).toEqual(currentValue);
		expect(targetGooFieldGetter($scope.fakeModel)).toEqual(valueOutOfSync);
	});

	it('should not autopopulate into target field if destination value was `$touched` by user (values are not in sync)', function() {
		// given
		var previousValue = 'abc';
		var currentValue = 'foo';

		$scope.fakeModel = {
			booObject: {firstName: previousValue},
			mooObject: {firstName: previousValue}
		};

		var mooTargetPath = 'mooObject.firstName';

		$scope.fakeStructure[0].autopopulateTo = [
			mooTargetPath
		];

		var targetMooFieldGetter = $parse(mooTargetPath);

		$compile(formTpl)($scope);
		$scope.$digest();
		formCtrl = $scope[formName];

		var mooNgModel = formCtrl[targetPath];
		mooNgModel.$setTouched();

		// when
		var booNgModel = formCtrl[sourcePath];
		booNgModel.$setViewValue(currentValue);
		$scope.$digest();

		// then
		expect(targetMooFieldGetter($scope.fakeModel)).toEqual(previousValue);
	});

	it('should not autopopulate into target field when view value have been changed and values differ', function() {
		// given
		$scope.fakeStructure[0].autopopulateTo = [targetPath];

		var sourceFieldSetter = $parse(sourcePath).assign;
		var targetFieldGetter = $parse(targetPath);

		sourceFieldSetter($scope.fakeModel, 'foo');

		$compile(formTpl)($scope);
		$scope.$digest();

		formCtrl = $scope[formName];

		var booNgModel = formCtrl[sourcePath];
		var mooNgModel = formCtrl[targetPath];

		// when
		mooNgModel.$setViewValue('boo');
		$scope.$digest();

		booNgModel.$setViewValue('new value');
		$scope.$digest();

		// then
		expect(targetFieldGetter($scope.fakeModel)).toEqual('boo');
	});

	describe('array fields', function() {
		var fakeArrayPopulateSchema;
		var fakeArrayPopulateStructure;

		beforeEach(function() {
			fakeArrayPopulateSchema = window.__jsonMocks__['populate-array-form-schema'];
			fakeArrayPopulateStructure = window.__jsonMocks__['populate-array-form-structure'];

			$scope.fakeModel = {
				booObject: {
					firstName: 'value in sync'
				},
				mooObject: [
					{
						firstName: 'value in sync'
					},
					{
						firstName: 'not in sync'
					},
					{
						firstName: 'value in sync'
					}
				]
			};

			$scope.fakeSchema = angular.copy(fakeArrayPopulateSchema);
			$scope.fakeStructure = angular.copy(fakeArrayPopulateStructure);
		});

		it('should autopopulate into multiple target fields when view value have been changed', function() {
			targetPath = 'mooObject[].firstName';
			$scope.fakeStructure[0].autopopulateTo = [targetPath];

			var targetFieldGetter = $parse(targetPath.replace('[]', '[index]'));

			$compile(formTpl)($scope);
			$scope.$digest();

			formCtrl = $scope[formName];

			// when
			var ngModel = formCtrl[sourcePath];
			ngModel.$setViewValue('foo');
			$scope.$digest();

			// then
			expect(targetFieldGetter($scope.fakeModel, {index: 0})).toEqual('foo');
			expect(targetFieldGetter($scope.fakeModel, {index: 1})).toEqual('not in sync');
			expect(targetFieldGetter($scope.fakeModel, {index: 2})).toEqual('foo');
		});

		it('should autopopulate into target array type field when view value have been changed', function() {
			// given
			targetPath = 'mooObject[0].firstName';
			$scope.fakeStructure[0].autopopulateTo = [targetPath];

			var targetFieldGetter = $parse(targetPath);

			$compile(formTpl)($scope);
			$scope.$digest();

			formCtrl = $scope[formName];

			// when
			var ngModel = formCtrl[sourcePath];
			ngModel.$setViewValue('foo');
			$scope.$digest();

			// then
			expect(targetFieldGetter($scope.fakeModel)).toEqual('foo');
		});
	});

	describe('nested forms', function() {
		// given
		var booFormName = 'booForm';
		var mooFormName = 'mooForm';

		var sourceModelPath = 'booObject.firstName';
		var targetModelPath = 'mooObject.firstName';

		var fakeFormTpl =
			'<div ng-form="' + formName + '">' +
				'<form name="' + booFormName + '" sf-schema="fakeBooSchema" sf-form="fakeBooStructure" sf-model="fakeBooModel" sf-validate auto-tab-form></form>' +
				'<form name="' + mooFormName + '" sf-schema="fakeMooSchema" sf-form="fakeMooStructure" sf-model="fakeMooModel" sf-validate auto-tab-form></form>' +
			'</div>';

		beforeEach(function() {
			$scope.fakeBooSchema = angular.copy(fakePopulateSchema);
			$scope.fakeBooStructure = angular.copy(fakePopulateStructure);
			$scope.fakeBooModel = {};

			$scope.fakeMooSchema = angular.copy(fakePopulateSchema);
			$scope.fakeMooStructure = angular.copy(fakePopulateStructure);
			$scope.fakeMooModel = {};

			$scope.fakeBooStructure[0].autopopulateTo = [
				[mooFormName, targetModelPath].join('.')
			];

			$compile(fakeFormTpl)($scope);
			$scope.$digest();

			formCtrl = $scope[formName];
		});

		it('should autopopulate from one form into target field in another form when view value have been changed', function() {
			// when
			var booFormCtrl = formCtrl[booFormName];
			var booNgModel = booFormCtrl[sourceModelPath];
			booNgModel.$setViewValue('foo value');
			$scope.$digest();

			// then
			expect($parse(targetModelPath)($scope.fakeMooModel)).toEqual('foo value');
		});
	});

	describe('array value for multiselect', function() {
		var fakeMultiselectPopulateSchema;
		var fakeMultiselectPopulateStructure;

		beforeEach(function() {
			fakeMultiselectPopulateSchema = window.__jsonMocks__['populate-multiselect-dropdown-schema'];
			fakeMultiselectPopulateStructure = window.__jsonMocks__['populate-multiselect-dropdown-structure'];

			$scope.fakeModel = {
				booObject: {
					names: []
				},
				mooObject: {
					names: []
				}
			};

			sourcePath = 'booObject.names';
			targetPath = 'mooObject.names';

			$scope.fakeSchema = angular.copy(fakeMultiselectPopulateSchema);
			$scope.fakeStructure = angular.copy(fakeMultiselectPopulateStructure);

			$scope.fakeStructure[0].autopopulateTo = [targetPath];

			$compile(formTpl)($scope);
			$scope.$digest();

			formCtrl = $scope[formName];
		});

		it('should copy array values when view value have been changed', function() {
			// given
			var targetFieldGetter = $parse(targetPath);

			// when
			var ngModel = formCtrl[sourcePath];
			ngModel.$setViewValue(['Foo', 'Bar']);
			$scope.$digest();

			// then
			expect(targetFieldGetter($scope.fakeModel)).toEqual(['Foo', 'Bar']);
		});
	});
});
