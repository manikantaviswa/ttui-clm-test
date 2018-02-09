'use strict';

describe('Wizard Manager: Step Controller', function () {
	var $rootScope;
	var $scope;
	var stepCtrlFn;

	var StepCtrl;
	var FLOW_MANAGER_CONFIG;

	beforeEach(angular.mock.module('TT-UI.WizardManager.Controllers.StepCtrl'));

	beforeEach(angular.mock.inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		stepCtrlFn = $injector.get('stepCtrlFn');
		$scope = $rootScope.$new();

		FLOW_MANAGER_CONFIG = $injector.get('FLOW_MANAGER_CONFIG');

		StepCtrl = {};
		stepCtrlFn.call(StepCtrl, $scope, $rootScope, FLOW_MANAGER_CONFIG);
	}));

	it('should call onCollectData method when FLOW_MANAGER_CONFIG.STEP_COLLECT_DATA_EVENT event is trigger', function(){
		// given
		spyOn(StepCtrl, 'onCollectData');

		// when
		$rootScope.$emit(FLOW_MANAGER_CONFIG.STEP_COLLECT_DATA_EVENT, {});

		// then
		expect(StepCtrl.onCollectData).toHaveBeenCalled();
	});

	it('should unbind onCollectData method on scope destroy', function(){
		// given
		spyOn(StepCtrl, 'onCollectData');

		// when
		$scope.$destroy();
		$rootScope.$emit(FLOW_MANAGER_CONFIG.STEP_COLLECT_DATA_EVENT, {});

		// then
		expect(StepCtrl.onCollectData).not.toHaveBeenCalled();
	});


	it('should call onStepChangeStart method when FLOW_MANAGER_CONFIG.STEP_CHANGE_START event is trigger', function(){
		// given
		spyOn(StepCtrl, 'onStepChangeStart');

		// when
		$rootScope.$emit(FLOW_MANAGER_CONFIG.STEP_CHANGE_START, {});

		// then
		expect(StepCtrl.onStepChangeStart).toHaveBeenCalled();
	});

	it('should unbind onStepChangeStart method on scope destroy', function(){
		// given
		spyOn(StepCtrl, 'onStepChangeStart');

		// when
		$scope.$destroy();
		$rootScope.$emit(FLOW_MANAGER_CONFIG.STEP_CHANGE_START, {});

		// then
		expect(StepCtrl.onStepChangeStart).not.toHaveBeenCalled();
	});

	it('should call onStepChangeStart method when FLOW_MANAGER_CONFIG.STEP_CHANGE_END event is trigger', function(){
		// given
		spyOn(StepCtrl, 'onStepChangeEnd');

		// when
		$rootScope.$emit(FLOW_MANAGER_CONFIG.STEP_CHANGE_END, {});

		// then
		expect(StepCtrl.onStepChangeEnd).toHaveBeenCalled();
	});

	it('should unbind onStepChangeEnd method on scope destroy', function(){
		// given
		spyOn(StepCtrl, 'onStepChangeEnd');

		// when
		$scope.$destroy();
		$rootScope.$emit(FLOW_MANAGER_CONFIG.STEP_CHANGE_END, {});

		// then
		expect(StepCtrl.onStepChangeEnd).not.toHaveBeenCalled();
	});

	it('should emit validity status event on formValidityStatusChange call', function(){
		// given
		var validityStatus = false;
		var errors = [{foo: 'bar error'}, {required: 'some field is requried'}];
		spyOn($rootScope, '$emit');

		// when
		StepCtrl.formValidityStatusChange(validityStatus, errors);

		// then
		expect($rootScope.$emit).toHaveBeenCalledWith(FLOW_MANAGER_CONFIG.STEP_VALID_STATUS_EVENT, validityStatus, errors);
	});

});
