describe('Directive: "reloadOptions" ', function() {
	'use strict';

	var $compile;
	var $scope;
	var $rootScope;
	var $injector;
	var $document;
	var $q;
	var $log;
	var $parse;

	var fooSchema = {
		'$schema': 'http://json-schema.org/draft-04/schema#',
		'type': 'object',
		'properties': {
			'fooObject': {
				'type': 'object',
				'properties': {
					'mooField': {
						'type': ['string', 'null'],
						'enum': []
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
			'reload': {
				'service': 'FakeService',
				'fetchAction': 'getData',
				'updateAction': 'updateValue',
				'watch': [
					'fooObject.gooField',
					'booData'
				]
			}
		},
		'fooObject.gooField',
		'booData'
	];

	var FakeService;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.Forms'); // TODO: Remove me when Form components will be fully extracted from Common into Form module
		angular.mock.module('TT-UI.Form.Filters.FormFilter');

		FakeService = jasmine.createSpyObj('FakeService', ['getData', 'updateValue']);

		angular.mock.module('TT-UI.Form.Directives.FieldReloadOptions', function($provide) {
			$provide.value('FakeService', FakeService);
		});

		angular.mock.inject(function(_$injector_) {
			$injector  = _$injector_;
			$q         = $injector.get('$q');
			$log       = $injector.get('$log');
			$parse     = $injector.get('$parse');
			$compile   = $injector.get('$compile');
			$document  = $injector.get('$document');
			$rootScope = $injector.get('$rootScope');
			$scope     = $rootScope.$new();
		});

		// TODO: Don't like it but validation service requires it
		spyOn(angular, 'injector').and.returnValue($injector);
		spyOn($document, 'injector').and.returnValue($injector);

		$scope.fooSchema = angular.copy(fooSchema);
		$scope.fooModel = angular.copy(fooModel);
		$scope.fooStructure = angular.copy(fooStructure);
	});

	afterEach(function(){
		$scope.$destroy();
	});

	// TODO: Don't like auto-tab-form
	var tpl = '<form name="fooForm" sf-schema="fooSchema" sf-form="fooStructure" sf-model="fooModel" sf-validate auto-tab-form></form>';

	it('Should log error when service does not exsists', function() {
		// given
		$scope.fooStructure[0].reload.service = 'Foo';
		$scope.fooStructure[0].reload.fetchAction = 'booFn';
		$compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		expect($log.error.logs).toContain(['Reload directive: Service "Foo" or fetch function "booFn" can not be invoked']);
	});

	it('Should log error when service fetch function does not exsists', function() {
		// given
		$scope.fooStructure[0].reload.fetchAction = 'mooAction';
		$compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		expect($log.error.logs).toContain(['Reload directive: Service "FakeService" or fetch function "mooAction" can not be invoked']);
	});

	it('Should log error when service update function does not exsists', function() {
		// given
		$scope.fooStructure[0].reload.updateAction = 'mooAction';
		$compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		expect($log.error.logs).toContain(['Reload directive: Service "FakeService" or update function "mooAction" can not be invoked']);
	});

	it('Should add view watchers to watched fields', function() {
		// given
		$compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		var ngModel1 = $scope.fooForm['fooObject.gooField'];
		var ngModel2 = $scope.fooForm.booData;
		expect(ngModel1.$viewChangeListeners.length).toBeGreaterThan(0);
		expect(ngModel2.$viewChangeListeners.length).toBeGreaterThan(0);
	});

	it('Should call service and fetch method when value of watched fields have changed', function() {
		// given
		var fakeData = {
			'test': 'moo value'
		};

		FakeService.getData.and.returnValue($q.when(fakeData));

		$compile(tpl)($scope);
		$scope.$digest();

		var ngModel1 = $scope.fooForm.booData;
		var ngModel2 = $scope.fooForm['fooObject.gooField'];

		// when
		ngModel1.$setViewValue('foo value');
		ngModel2.$setViewValue('boo value');

		ngModel1.$commitViewValue();
		ngModel2.$commitViewValue();

		// then
		var expectedValues = {
			'fooObject.gooField': 'boo value',
			booData: 'foo value'
		};
		expect(FakeService.getData).toHaveBeenCalledWith($scope.fooModel, expectedValues);
		expect(FakeService.getData.calls.count()).toEqual(2);
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

	describe('radios-inline field', function(){
		var fakeResponseData;

		var formHtml;
		var formStructure;
		var mooFieldModelPath = 'fooModel.fooObject.mooField';
		var mooFieldModelValue = 'abc';

		function compileFormToScope(){
			$scope.fooStructure = angular.copy(formStructure);
			formHtml = $compile(tpl)($scope);
			$scope.fooModel.booData = '12321';
		}

		beforeEach(function(){
			formStructure = [
				{
					'key': 'fooObject.mooField',
					'type': 'radios-inline',
					'reload': {
						'service': 'FakeService',
						'fetchAction': 'getData',
						'updateAction': 'updateValue',
						'watch': [
							'booData'
						]
					},
				},
				'booData'
			];

			FakeService.updateValue.and.callFake(function(ngModel, form, data) {
				form.titleMap = angular.copy(data);
			});

			fakeResponseData = [
				{
					code: mooFieldModelValue
				},
				{
					code: 'fake data'
				}
			];
		});

		it('should not jump in link -> fetchFn -> update -> link -> ... loop', function(){
			compileFormToScope();

			var callsCount = 0;

			// when
			FakeService.getData.and.callFake(function() {
				callsCount++;
				return $q.when(fakeResponseData);
			});

			$scope.$digest();

			expect($parse(mooFieldModelPath)($scope)).toBeUndefined();
			expect(callsCount).toEqual(1);
		});

		it('should set default value to a field model', function(){
			compileFormToScope();
			fakeResponseData[0].default = 'Y';

			// when
			FakeService.getData.and.callFake(function() {
				return $q.when(fakeResponseData);
			});

			$scope.$digest();

			expect($parse(mooFieldModelPath)($scope)).toEqual(mooFieldModelValue);
		});

		it('should not set any value', function(){
			compileFormToScope();

			// when
			FakeService.getData.and.callFake(function() {
				return $q.when(fakeResponseData);
			});

			$scope.$digest();

			expect($parse(mooFieldModelPath)($scope)).toBeUndefined();
		});

		it('should preselect first option by default', function() {
			formStructure[0].reload.preselectFirst = true;
			compileFormToScope();

			// when
			FakeService.getData.and.callFake(function() {
				return $q.when(fakeResponseData);
			});

			$scope.$digest();

			expect($parse(mooFieldModelPath)($scope)).toEqual(mooFieldModelValue);
		});
	});

	describe('dropdown field reload by fetch and update', function() {
		// given
		var fakeResponseData;
		var booFieldNgModel;
		var mooFieldForm;
		var mooFieldNgModel;

		beforeEach(function() {
			$scope.fooStructure[0].reload.watch = [
				'fooObject.gooField',
				'booData'
			];

			fakeResponseData = [
				{
					value: 'abc'
				},
				{
					value: 'fake data'
				}
			];

			FakeService.getData.and.returnValue($q.when(fakeResponseData));
			FakeService.updateValue.and.callFake(function(ngModel, form, data) {
				form.titleMap = data;
			});

			var formHtml = $compile(tpl)($scope);
			$scope.$digest();

			booFieldNgModel = $scope.fooForm.booData;

			mooFieldNgModel = $scope.fooForm['fooObject.mooField'];
			var mooFieldEl = formHtml[0].querySelector('[name="' + mooFieldNgModel.$name + '"]');
			var mooFieldScope = angular.element(mooFieldEl).scope();
			mooFieldForm = mooFieldScope.form;
		});

		it('should call update dropdwon options', function() {
			// when
			booFieldNgModel.$setViewValue('foo value');
			booFieldNgModel.$commitViewValue();
			$scope.$digest();

			// then
			expect(FakeService.updateValue).toHaveBeenCalledWith(mooFieldNgModel, jasmine.any(Object), fakeResponseData);
			expect(mooFieldForm.titleMap).toEqual(fakeResponseData);

			expect(mooFieldNgModel.$modelValue).toBeUndefined();
			expect(mooFieldNgModel.$viewValue).toBeUndefined();
		});

		it('should call update dropdwon options and hold field value', function() {
			// given
			$parse('fooObject.mooField').assign($scope.fooModel, 'fake data');
			$scope.$digest();

			// when
			booFieldNgModel.$setViewValue('foo value');
			booFieldNgModel.$commitViewValue();
			$scope.$digest();

			// then
			expect(FakeService.updateValue).toHaveBeenCalledWith(mooFieldNgModel, jasmine.any(Object), fakeResponseData);
			expect(mooFieldForm.titleMap).toEqual(fakeResponseData);

			expect(mooFieldNgModel.$modelValue).toEqual('fake data');
			expect(mooFieldNgModel.$viewValue).toEqual('fake data');
		});

		it('should call update dropdwon options and reset field value', function() {
			// given
			$parse('fooObject.mooField').assign($scope.fooModel, 'not existing value');
			$scope.$digest();

			// when
			booFieldNgModel.$setViewValue('foo value');
			booFieldNgModel.$commitViewValue();
			$scope.$digest();

			// then
			expect(FakeService.updateValue).toHaveBeenCalledWith(mooFieldNgModel, jasmine.any(Object), fakeResponseData);
			expect(mooFieldForm.titleMap).toEqual(fakeResponseData);

			expect(mooFieldNgModel.$modelValue).toBeUndefined();
			expect(mooFieldNgModel.$viewValue).toBeUndefined();
		});

		it('should call update dropdown options and reset field value when load fails', function() {
			// given
			FakeService.getData.and.returnValue($q.reject());

			$parse('fooObject.mooField').assign($scope.fooModel, 'existing value');
			$scope.$digest();

			// when
			booFieldNgModel.$setViewValue('foo value');
			booFieldNgModel.$commitViewValue();
			$scope.$digest();

			// then
			expect(FakeService.updateValue).toHaveBeenCalledWith(mooFieldNgModel, jasmine.any(Object), jasmine.any(Object));
			expect(mooFieldForm.titleMap).toEqual(jasmine.any(Object));

			expect(mooFieldNgModel.$modelValue).toBeUndefined();
			expect(mooFieldNgModel.$viewValue).toBeUndefined();
		});
	});

	describe('input field reload by fetch and update', function() {
		// given
		var fakeResponseData;
		var booFieldNgModel;
		var mooFieldNgModel;

		beforeEach(function() {
			delete $scope.fooSchema.properties.fooObject.properties.mooField.enum;

			$scope.fooStructure[0].reload.watch = [
				'fooObject.gooField',
				'booData'
			];

			fakeResponseData = [
				{
					value: 'abc'
				},
				{
					value: 'fake data'
				},
				{
					value: 'moo',
					default: 'Y'
				}
			];

			FakeService.getData.and.returnValue($q.when(fakeResponseData));
			FakeService.updateValue.and.callFake(function(ngModel, form, data) {
				return data.reduce(function(previous, current) {
					return current.default ? current.value : (previous.value || previous);
				}, '');
			});

			$compile(tpl)($scope);
			$scope.$digest();

			booFieldNgModel = $scope.fooForm.booData;
			mooFieldNgModel = $scope.fooForm['fooObject.mooField'];
		});

		it('should call updateValue by service and assign new value ', function() {
			// given
			$parse('fooObject.mooField').assign($scope.fooModel, 'goo');
			$scope.$digest();

			// when
			booFieldNgModel.$setViewValue('foo value');
			booFieldNgModel.$commitViewValue();
			$scope.$digest();

			// then
			expect(FakeService.updateValue).toHaveBeenCalledWith(mooFieldNgModel, jasmine.any(Object), fakeResponseData);

			expect(mooFieldNgModel.$modelValue).toEqual('moo');
			expect(mooFieldNgModel.$viewValue).toEqual('moo');
		});
	});

	it('should call service fetch method with proper context', function() {
		// given
		var context;
		FakeService.getData.and.callFake(function() {
			context = this;
			return $q.when();
		});

		$compile(tpl)($scope);
		$scope.$digest();

		var ngModel = $scope.fooForm.booData;

		// when
		ngModel.$setViewValue('foo value');
		ngModel.$commitViewValue();

		// then
		expect(context).toBe(FakeService);
	});

	it('should call service update method with proper context', function() {
		// given
		var context;
		FakeService.getData.and.returnValue($q.when());
		FakeService.updateValue.and.callFake(function() {
			context = this;
		});

		$compile(tpl)($scope);
		$scope.$digest();

		var ngModel = $scope.fooForm.booData;

		// when
		ngModel.$setViewValue('foo value');
		ngModel.$commitViewValue();
		$scope.$digest();

		// then
		expect(context).toBe(FakeService);
	});

	it('should enable form after successfull reload', function() {
		// given
		var fakeTitleMap = ['abc', 'def', 'foo', 'bar'];
		FakeService.getData.and.returnValue($q.when());
		FakeService.updateValue.and.callFake(function(ngModel, form) {
			form.titleMap = fakeTitleMap;
		});

		var formHtml = $compile(tpl)($scope);

		$scope.$digest();

		var booNgModel = $scope.fooForm.booData;
		var mooFieldNgModel = $scope.fooForm['fooObject.mooField'];

		var mooFieldEl = formHtml[0].querySelector('[name="' + mooFieldNgModel.$name + '"]');
		var mooFieldScope = angular.element(mooFieldEl).scope();
		var mooFieldForm = mooFieldScope.form;

		// when
		booNgModel.$setViewValue('foo value');
		booNgModel.$commitViewValue();
		$scope.$digest();

		// then
		expect(mooFieldForm.readonly).toBeFalsy();
	});

	it('should not enable form when list is empty', function() {
		// given
		var fakeTitleMap = [];
		FakeService.getData.and.returnValue($q.when());
		FakeService.updateValue.and.callFake(function(ngModel, form) {
			form.titleMap = fakeTitleMap;
		});

		var formHtml = $compile(tpl)($scope);

		$scope.$digest();

		var booNgModel = $scope.fooForm.booData;
		var mooFieldNgModel = $scope.fooForm['fooObject.mooField'];

		var mooFieldEl = formHtml[0].querySelector('[name="' + mooFieldNgModel.$name + '"]');
		var mooFieldScope = angular.element(mooFieldEl).scope();
		var mooFieldForm = mooFieldScope.form;

		// when
		booNgModel.$setViewValue('foo value');
		booNgModel.$commitViewValue();
		$scope.$digest();

		// then
		expect(mooFieldForm.readonly).toBeTruthy();
	});

	it('should call service and load method after watched fields is initilized', function() {
		// given
		FakeService.getData.and.returnValue($q.when());

		$scope.fooModel = {
			fooObject: {
				mooField: 'moo value',
				gooField: 'goo value'
			},
			booData: 'boo value'
		};

		// when
		$compile(tpl)($scope);
		$scope.$digest();

		// then
		var expectedValues = {
			'fooObject.gooField': 'goo value',
			booData: 'boo value'
		};

		expect(FakeService.getData).toHaveBeenCalledWith($scope.fooModel, expectedValues);
		expect(FakeService.getData.calls.count()).toEqual(1);
	});

	it('should not call service load method when watched fields are not yet initilized', function() {
		// given
		FakeService.getData.and.returnValue($q.when());

		$scope.fooModel = {
			fooObject: {
				mooField: 'moo value'
			}
		};

		// when
		$compile(tpl)($scope);
		$scope.$digest();

		// then
		expect(FakeService.getData).not.toHaveBeenCalled();
	});

	it('should wait for ngModel inside array to be ready', function() {
		// given
		$scope.fooSchema = {
			'$schema': 'http://json-schema.org/draft-04/schema#',
			'type': 'object',
			'properties': {
				'fooList': {
					'type': 'array',
					'minItems': 1,
					'items': {
						'type': 'object',
						'properties': {
							'mooField': {
								'type': 'string'
							},
							'booData': {
								'type': 'string'
							}
						}
					}
				}
			}
		};

		$scope.fooStructure = [
			{
				'key': 'fooList',
				'items': [
					{
						'key': 'fooList[].mooField'
					},
					{
						'key': 'fooList[].booData',
						'reload': {
							'service': 'FakeService',
							'fetchAction': 'getData',
							'updateAction': 'updateValue',
							'watch': [
								'fooList[arrayIndex].mooField'
							]
						}
					}
				]
			}
		];

		FakeService.getData.and.returnValue($q.reject());

		$compile(tpl)($scope);
		$scope.$digest();

		var mooFieldNgModel = $scope.fooForm['fooList[0].mooField'];

		// when
		mooFieldNgModel.$setViewValue('foo value');
		mooFieldNgModel.$commitViewValue();
		$scope.$digest();

		// then
		var expectedValues = {
			'fooList[arrayIndex].mooField': 'foo value'
		};
		expect(FakeService.getData).toHaveBeenCalledWith($scope.fooModel, expectedValues);
	});
});
