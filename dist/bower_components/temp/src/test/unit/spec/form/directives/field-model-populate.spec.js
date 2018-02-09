describe('Directive: "populateTo" ', function() {
	'use strict';

	var $compile;
	var $scope;
	var $rootScope;
	var $injector;
	var $document;
	var $q;
	var $log;

	var fooSchema = {
		'$schema': 'http://json-schema.org/draft-04/schema#',
		'title': 'Define Billing Account',
		'type': 'object',
		'properties': {
			'fooObject': {
				'type': 'object',
				'properties': {
					'mooField': {
						'type': 'string'
					},
					'gooField': {
						'type': 'string'
					}
				}
			},

			'booData': {
				'type': 'string'
			}
		}
	};

	var fooModel = {};
	var fooStructure = [
		{
			'key': 'fooObject.mooField',
			'populate': {
				'service': 'FakeService',
				'action': 'getData',
				'populateTo': []
			}
		},
		'fooObject.gooField',
		'booData'
	];

	var FakeService;

	beforeEach(function() {
		// TODO: Remove me when Form components will be fully extracted from Common into Form module
		angular.mock.module('TT-UI.Common.Directives.Forms');

		FakeService = jasmine.createSpyObj('FakeService', ['getData']);

		angular.mock.module('TT-UI.Form.Directives.FieldModelPopulate', function($provide) {
			$provide.value('FakeService', FakeService);
		});

		angular.mock.inject(function(_$injector_) {
			$injector = _$injector_;

			$compile = $injector.get('$compile');
			$document = $injector.get('$document');
			$q = $injector.get('$q');
			$log = $injector.get('$log');

			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
		});

		// TODO: Don't like it but validation service requires it
		spyOn(angular, 'injector').and.returnValue($injector);
		spyOn($document, 'injector').and.returnValue($injector);

		$scope.fooSchema = angular.copy(fooSchema);
		$scope.fooModel = angular.copy(fooModel);
		$scope.fooStructure = angular.copy(fooStructure);
	});

	afterEach(function() {
		$scope.$destroy();
	});

	var tpl = '<form name="fooForm" sf-schema="fooSchema" sf-form="fooStructure" sf-model="fooModel" sf-validate auto-tab-form></form>';

	it('Should log error when service does not exsists', function() {
		// given
		$scope.fooStructure[0].populate.service = 'Foo';
		$scope.fooStructure[0].populate.action = 'booFn';
		$compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		expect($log.error.logs).toContain(['Populate directive: Service "Foo" or action "booFn" can not be invoked']);
	});

	it('Should log error when service action does not exsists', function() {
		// given
		$scope.fooStructure[0].populate.action = 'mooAction';
		$compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		expect($log.error.logs).toContain(['Populate directive: Service "FakeService" or action "mooAction" can not be invoked']);
	});

	it('Should add view watcher to mooField field', function() {
		// given
		$compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		var ngModel = $scope.fooForm['fooObject.mooField'];
		expect(ngModel.$viewChangeListeners.length).toBeGreaterThan(0);
	});

	it('Should call service when value of field changed', function() {
		// given
		var fakeData = {
			'test': 'moo value'
		};

		FakeService.getData.and.returnValue($q.when(fakeData));

		$compile(tpl)($scope);
		$scope.$digest();

		var ngModel = $scope.fooForm['fooObject.mooField'];

		// when
		ngModel.$setViewValue('foo value');
		ngModel.$commitViewValue();

		// then
		expect(FakeService.getData).toHaveBeenCalledWith('foo value', $scope.fooModel);
	});

	it('Should not call service when value of field did not change', function() {
		// given
		$compile(tpl)($scope);
		$scope.$digest();

		var ngModel = $scope.fooForm['fooObject.mooField'];

		// when
		ngModel.$setViewValue();
		ngModel.$commitViewValue();

		// then
		expect(FakeService.getData).not.toHaveBeenCalled();
	});

	it('should call service and update depended fields', function() {
		// given
		$scope.fooStructure[0].populate.populateTo = [
			{
				key: 'fooObject.gooField',
				source: 'mooData.gooValue'
			},

			{
				key: 'booData',
				source: 'mooData.booValue'
			}
		];

		var fakeData = {
			mooData: {
				gooValue: 'value of goo field',
				booValue: 'foo bar'
			}
		};

		FakeService.getData.and.returnValue($q.when(fakeData));

		$compile(tpl)($scope);
		$scope.$digest();

		var ngModel = $scope.fooForm['fooObject.mooField'];

		// when
		ngModel.$setViewValue('foo value');
		ngModel.$commitViewValue();

		// then
		var formModel = $scope.fooModel;

		expect(formModel.fooObject.mooField).toEqual('foo value');
		expect(formModel.fooObject.gooField).toEqual('value of goo field');
		expect(formModel.booData).toEqual('foo bar');
	});

	it('should call service and update depended fields when results is an array', function() {
		// given
		$scope.fooStructure[0].populate.populateTo = [
			{
				key: 'fooObject.gooField',
				source: 'results[0].mooData.gooValue'
			},

			{
				key: 'booData',
				source: 'results[0].booValue'
			}
		];

		var fakeData = [{
			mooData: {
				gooValue: 'value of goo field'
			},
			booValue: 'foo bar'
		}];

		FakeService.getData.and.returnValue($q.when(fakeData));

		$compile(tpl)($scope);
		$scope.$digest();

		var ngModel = $scope.fooForm['fooObject.mooField'];

		// when
		ngModel.$setViewValue('foo value');
		ngModel.$commitViewValue();

		// then
		var formModel = $scope.fooModel;

		expect(formModel.fooObject.mooField).toEqual('foo value');
		expect(formModel.fooObject.gooField).toEqual('value of goo field');
		expect(formModel.booData).toEqual('foo bar');
	});

	it('should log error when one of populated fields does not exist', function() {
		// given
		$scope.fooStructure[0].populate.populateTo = [
			{
				key: 'notExisting.fieldPath'
			}
		];

		FakeService.getData.and.returnValue($q.when());

		$compile(tpl)($scope);
		$scope.$digest();

		var ngModel = $scope.fooForm['fooObject.mooField'];

		// when
		ngModel.$setViewValue('foo value');

		// then
		expect($log.error.logs).toContain(['Populate directive: Can not find field for path "notExisting.fieldPath"']);
	});

	it('should call service with proper context', function() {
		// given
		var context;
		FakeService.getData.and.callFake(function() {
			context = this;

			return $q.when();
		});

		$compile(tpl)($scope);
		$scope.$digest();

		var ngModel = $scope.fooForm['fooObject.mooField'];

		// when
		ngModel.$setViewValue('foo value');
		ngModel.$commitViewValue();

		// then
		expect(context).toBe(FakeService);
	});

	it('should call service and update dependent fields under the same index in array', function() {
		// given
		$scope.fooSchema = {
			'$schema': 'http://json-schema.org/draft-04/schema#',
			'title': 'Define Billing Account',
			'type': 'object',
			'properties': {
				'fooArray': {
					'type': 'array',
					'items': {
						'type': 'object',
						'properties': {
							'mooData': {
								'type': 'string'
							},
							'gooField': {
								'type': 'string'
							}
						}
					}
				}
			}
		};

		$scope.fooStructure = [
			{
				'key': 'fooArray',
				'items': [
					{
						'key': 'fooArray[].mooData',
						'populate': {
							'service': 'FakeService',
							'action': 'getData',
							'populateTo': [
								{
									key: 'fooArray[arrayIndex].gooField',
									source: 'gooValue'
								}
							]
						}
					},
					{
						'key': 'fooArray[].gooField'
					}
				]
			}
		];

		var fakeData = {
			gooValue: 'goo'
		};

		// when
		FakeService.getData.and.returnValue($q.when(fakeData));

		var html = $compile(tpl)($scope);
		$scope.$digest();
		var buttonAdd = html.find('button')[1];
		angular.element(buttonAdd).triggerHandler('click');

		var ngModel = $scope.fooForm['fooArray[1].mooData'];
		ngModel.$setViewValue('foo value');
		ngModel.$commitViewValue();

		var formModel = $scope.fooModel;

		// then
		expect(formModel.fooArray[0].gooField).toBe(undefined);
		expect(formModel.fooArray[1].gooField).toEqual('goo');
	});

	describe('chainingEnabled flag', function() {

		beforeEach(function() {
			$scope.fooStructure = [
				{
					'key': 'fooObject.mooField',
					'populate': {
						'service': 'FakeService',
						'action': 'getData',
						'populateTo': [
							{
								key: 'fooObject.gooField',
								source: 'value'
							}
						]
					}
				},
				{
					'key': 'fooObject.gooField',
					'populate': {
						'service': 'FakeService',
						'action': 'getData',
						'populateTo': [
							{
								key: 'booData',
								source: 'value'
							}
						]
					}
				},
				'booData'
			];
		});

		it('should call service if value of the field has been changed by autopopulation and chainingEnabled=true', function() {
			// given
			var response = {
				value: 'Matrix has you..'
			};

			FakeService.getData.and.returnValue($q.when(response));

			// when
			$compile(tpl)($scope);
			$scope.$digest();

			var ngModel = $scope.fooForm['fooObject.mooField'];
			ngModel.$setViewValue('foo value');
			ngModel.$commitViewValue();

			// then
			var formModel = $scope.fooModel;

			expect(FakeService.getData.calls.count()).toEqual(2);
			expect(formModel.fooObject.mooField).toEqual('foo value');
			expect(formModel.fooObject.gooField).toEqual('Matrix has you..');
			expect(formModel.booData).toEqual('Matrix has you..');

		});

		it('should not call service if value of the field has been changed by autopopulation and chainingEnabled=false', function() {
			// given
			var response = {
				value: 'Matrix has you..'
			};

			$scope.fooStructure[1].populate.chainingEnabled = false;
			FakeService.getData.and.returnValue($q.when(response));

			// when
			$compile(tpl)($scope);
			$scope.$digest();

			var ngModel = $scope.fooForm['fooObject.mooField'];
			ngModel.$setViewValue('foo value');
			ngModel.$commitViewValue();

			// then
			var formModel = $scope.fooModel;

			expect(FakeService.getData.calls.count()).toEqual(1);
			expect(formModel.fooObject.mooField).toEqual('foo value');
			expect(formModel.fooObject.gooField).toEqual('Matrix has you..');
			expect(formModel.booData).toBeUndefined();

		});

	});


});
