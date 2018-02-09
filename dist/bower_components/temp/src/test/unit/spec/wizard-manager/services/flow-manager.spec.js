'use strict';

describe('Wizard Manager: FlowManager', function() {
	var FlowManagerProvider;
	var FLOW_MANAGER_CONFIG;
	var $stateProvider;

	beforeEach(angular.mock.module('TT-UI.WizardManager.Services.FlowManager', function($injector) {
		FlowManagerProvider = $injector.get('FlowManagerProvider');
		$stateProvider = $injector.get('$stateProvider');
	}));

	describe('Provider', function() {
		var flowManagerState;

		beforeEach(angular.mock.inject(function($injector) {
			FLOW_MANAGER_CONFIG = $injector.get('FLOW_MANAGER_CONFIG');

			flowManagerState = FLOW_MANAGER_CONFIG.WIZARD_STATE;

			spyOn($stateProvider, 'state');

			FLOW_MANAGER_CONFIG.WIZARD_STATE = 'foo-manager-state';
		}));

		afterEach(function() {
			FLOW_MANAGER_CONFIG.WIZARD_STATE = flowManagerState;
		});

		it('should check if provider exists', function() {
			expect(FlowManagerProvider).toEqual(jasmine.any(Object));
		});

		it('should register a flow', function() {
			// given
			var fakeFlow = {
				state: 'foo-state',
				service: 'GooService',
				entryState: 'entry-state',
				exitState: 'exit-state',
				url: 'some-url',
				stepsStates: {
					'bar-state': true,
					'foo-bar-state': true
				}
			};

			// when
			FlowManagerProvider.registerFlow('Foo Flow', fakeFlow);

			// then
			expect($stateProvider.state).toHaveBeenCalledWith('foo-state', jasmine.any(Object));
		});

		it('should set proper manager state name on flow view', function() {
			// given
			var fakeFlow = {
				name: 'Foo Flow',
				state: 'foo-state',
				url: 'some-url',
				entryState: 'entry-state',
				exitState: 'exit-state',
				stepsStates: {},
				service: 'FooService',
				views: {
					'flow-view-name@flow': {}
				}
			};

			// when
			FlowManagerProvider.registerFlow(fakeFlow);

			// then
			var stateArg = $stateProvider.state.calls.mostRecent().args[1];
			expect(stateArg.views['flow-view-name@foo-manager-state']).toBeDefined();
			expect(stateArg.views['flow-view-name@flow']).not.toBeDefined();
		});

		it('should return registered flows', function() {
			// given
			var fakeFooFlow = {
				state: 'foo-state',
				name: 'FooFlow',
				url: 'some-url',
				service: 'GooService',
				entryState: 'entry-state',
				exitState: 'exit-state',
				stepsStates: {}
			};

			var fakeBooFlow = {
				state: 'foo-state',
				name: 'BooFlow',
				url: 'some-boo-url',
				service: 'MooService',
				entryState: 'boo-entry-state',
				exitState: 'boo-exit-state',
				stepsStates: {}
			};

			// when
			FlowManagerProvider.registerFlow(fakeFooFlow);
			FlowManagerProvider.registerFlow(fakeBooFlow);

			var reults = FlowManagerProvider.getFlows();

			// then
			expect(reults.length).toEqual(2);
			expect(reults).toContain(fakeFooFlow);
			expect(reults).toContain(fakeBooFlow);
		});

		it('should throw error when flow steps are not an object', function() {
			// given
			var fakeFooFlow = {
				name: 'FooName',
				service: 'FooService',
				state: 'FooState',
				url: 'url-to-flow',
				label: 'Foo Flow',
				entryState: 'foo-entry-state',
				exitState: 'bar-exit-state',
				stepsStates: []
			};

			// when
			var testFn = function() {
				FlowManagerProvider.registerFlow(fakeFooFlow);
			};

			// then
			expect(testFn).toThrowError('Flow Manager: Flow "FooName" steps configuration is not an object');
		});

		it('should throw error when flow configuration is missing', function() {
			// given
			var fakeFooFlow = {
				name: 'foo',
				state: 'goo-state',
				url: 'foo-boo',
				entryState: 'moo-state',
				service: 'MooService'
			};

			// when
			var testFn = function() {
				FlowManagerProvider.registerFlow(fakeFooFlow);
			};

			// then
			expect(testFn).toThrowError('Flow Manager: flow configuration "exitState" is missing for flow "foo"');
		});

		it('should use default main state name', function() {
			// given
			FLOW_MANAGER_CONFIG.MAIN_STATE = 'abc-state';

			// when
			var state = FlowManagerProvider.getMainState();

			// then
			expect(state).toEqual('abc-state');
		});

		it('should allow to change main state name', function() {
			// given
			FlowManagerProvider.setMainState('foo-bar-state');

			// when
			var state = FlowManagerProvider.getMainState();

			// then
			expect(state).toEqual('foo-bar-state');
		});
	});

	describe('Service', function() {
		it('should throw error when flow service is missing', angular.mock.inject(function($injector) {
			// given
			var fakeFooFlow = {
				state: 'foo-state',
				url: 'foo-url',
				entryState: 'foo-start-state',
				exitState: 'foo-exit-state',
				service: 'MissingFlowFactory',
				stepsStates: {}
			};

			var fn = function() {
				// when
				FlowManagerProvider.registerFlow('fakeFooFlow', fakeFooFlow);
				$injector.get('FlowManager');
			};

			// then
			expect(fn).toThrowError('Flow service "MissingFlowFactory" for given flow is missing');
		}));
	});

	describe('Service', function() {
		var fakeFooFlow = {
			state: 'foo-state',
			service: 'FakeFooFlowFactory',
			entryState: 'foo-entry-state',
			exitState: 'foo-exit-state',
			url: 'foo-url',
			stepsStates: {}
		};
		var fakeBooFlow = {
			state: 'boo-state',
			service: 'FakeBooFlowFactory',
			entryState: 'boo-entry-state',
			exitState: 'boo-exit-state',
			url: 'bar-url',
			stepsStates: {}
		};

		var FakeFooFlow = jasmine.createSpyObj('FakeFooFlowFactory', [
			'getName', 'getFlowStateName', 'isValid'
		]);
		FakeFooFlow.getName.and.returnValue('FakeFooFlow');

		var FakeBooFlow = jasmine.createSpyObj('FakeBooFlowFactory', [
			'getName', 'getFlowStateName', 'isValid'
		]);
		FakeBooFlow.getName.and.returnValue('FakeBooFlow');
		FakeBooFlow.isValid.and.returnValue(true);

		var FlowManager;
		var StatesHelper;

		beforeEach(angular.mock.module(function($provide) {
			$provide.value('FakeFooFlowFactory', function() {
				return FakeFooFlow;
			});

			$provide.value('FakeBooFlowFactory', function() {
				return FakeBooFlow;
			});
		}));

		beforeEach(angular.mock.inject(function($injector) {
			FlowManagerProvider.registerFlow('fakeFooFlow', fakeFooFlow);
			FlowManagerProvider.registerFlow('fakeBooFlow', fakeBooFlow);

			FLOW_MANAGER_CONFIG = $injector.get('FLOW_MANAGER_CONFIG');

			FlowManager = $injector.get('FlowManager');
			StatesHelper = $injector.get('StatesHelper');
		}));

		it('should check if service exists', function() {
			expect(FlowManager).toEqual(jasmine.any(Object));
		});

		it('should set current flow when current state match to it', function() {
			// given
			var state = {
				name: 'fooStateName'
			};
			var flowStateName = 'fooFlowStateName';
			spyOn(StatesHelper, 'stateBelongsToFlow').and.returnValue(flowStateName);
			FakeBooFlow.getFlowStateName.and.returnValue(flowStateName);
			FakeFooFlow.getFlowStateName.and.returnValue('moo');

			// when
			FlowManager.setCurrentFlow(jasmine.any(Object), state);

			// then
			expect(FlowManager.hasFlow()).toBeTruthy();
			expect(FakeFooFlow.getFlowStateName).toHaveBeenCalled();
			expect(FakeBooFlow.getFlowStateName).toHaveBeenCalled();
		});

		it('should not set current flow when current state do not match it', function() {
			// given
			var state = {
				name: 'fooStateName'
			};
			spyOn(StatesHelper, 'stateBelongsToFlow').and.returnValue('booStateName');
			FakeBooFlow.getFlowStateName.and.returnValue('goo');
			FakeFooFlow.getFlowStateName.and.returnValue('moo');

			// when
			FlowManager.setCurrentFlow(jasmine.any(Object), state);

			// then
			expect(FlowManager.hasFlow()).toBeFalsy();
			expect(FakeFooFlow.getFlowStateName).toHaveBeenCalled();
			expect(FakeBooFlow.getFlowStateName).toHaveBeenCalled();
		});
	});

	function createFakeFlowFactory(state, name) {
		var FakeFlow = jasmine.createSpyObj('FakeFlowFactory', [
			'getName', 'getFlowStateName', 'isValid', 'getWizardSteps', 'getNextStepState',
			'getPrevStepState', 'isSubmitStep',
			'getRegistrationApiService', 'getPersistApiService', 'start', 'cancel', 'resume',
			'persist', 'processNextStep', 'store', 'submit', 'getEntryState', 'getExitState',
			'clearValidity', 'setCurrentStateValidity', 'showPersistButton', 'showCancelButton',
			'isFullscreenStep', 'getPayload', 'getPopulatedStepsSchema', 'showWizardSteps',
			'finish', 'getActionLabel', 'isFooterExtended'
		]);
		FakeFlow.getName.and.returnValue(name);
		FakeFlow.isValid.and.returnValue(true);
		FakeFlow.getFlowStateName.and.returnValue(state);
		return FakeFlow;
	}

	describe('current flow', function() {
		var fakeFooFlow = {
			name: 'FakeFooFlow',
			url: 'foo-bar-flow',
			entryState: 'foo-entry-state',
			exitState: 'foo-exit-state',
			state: 'foo-state',
			service: 'FakeFooFlowFactory',
			stepsStates: {}
		};

		var fakeBooFlow = {
			name: 'FakeBooFlow',
			url: 'boo-bar-flow',
			entryState: 'boo-entry-state',
			exitState: 'boo-exit-state',
			state: 'boo-state',
			service: 'FakeBooFlowFactory',
			stepsStates: {}
		};

		var FakeFooFlow = createFakeFlowFactory(fakeFooFlow.state, fakeFooFlow.name);
		var FakeBooFlow = createFakeFlowFactory(fakeBooFlow.state, fakeBooFlow.name);
		var FlowManager;
		var $rootScope;
		var StatesHelper;
		var $q;

		beforeEach(angular.mock.module(function($provide) {
			$provide.value('FakeFooFlowFactory', function() {
				return FakeFooFlow;
			});

			$provide.value('FakeBooFlowFactory', function() {
				return FakeBooFlow;
			});
		}));

		beforeEach(angular.mock.inject(function($injector) {
			FlowManagerProvider.registerFlow(fakeFooFlow);
			FlowManagerProvider.registerFlow(fakeBooFlow);

			FLOW_MANAGER_CONFIG = $injector.get('FLOW_MANAGER_CONFIG');

			$rootScope = $injector.get('$rootScope');
			$q = $injector.get('$q');

			StatesHelper = $injector.get('StatesHelper');
			spyOn(StatesHelper, 'stateBelongsToFlow').and.callFake(function(state) {
				return (state === 'boo-state') ? fakeBooFlow.state : fakeFooFlow.state;
			});

			FlowManager = $injector.get('FlowManager');
			FlowManager.setCurrentFlow(jasmine.any(Object), jasmine.any(String));
		}));

		it('should get flow name', function() {
			// given, when
			var result = FlowManager.getFlowName();

			// then
			expect(FakeFooFlow.getName).toHaveBeenCalled();
			expect(result).toEqual('FakeFooFlow');
		});

		it('should call getStateNames', function() {
			// given
			var states = [
				{name: 'a', disabled: false},
				{name: 'b', disabled: false},
				{name: 'c', disabled: false}
			];
			FakeFooFlow.getWizardSteps.and.returnValue(states);

			// when
			var result = FlowManager.getWizardSteps();

			// then
			expect(FakeFooFlow.getWizardSteps).toHaveBeenCalled();
			expect(result).toEqual(states);
		});

		it('should call getNextStepState', function() {
			// given
			var state = 'state-abc';
			FakeFooFlow.getNextStepState.and.returnValue(state);

			// when
			var result = FlowManager.getNextStepState();

			// then
			expect(FakeFooFlow.getNextStepState).toHaveBeenCalled();
			expect(result).toEqual(state);
		});

		it('should call getPrevStepState', function() {
			// given
			var state = 'state-def';
			FakeFooFlow.getPrevStepState.and.returnValue(state);

			// when
			var result = FlowManager.getPrevStepState();

			// then
			expect(FakeFooFlow.getPrevStepState).toHaveBeenCalled();
			expect(result).toEqual(state);
		});

		it('should call isSubmitStep', function() {
			// given
			FakeFooFlow.isSubmitStep.and.returnValue(true);

			// when
			var result = FlowManager.isSubmitStep();

			// then
			expect(FakeFooFlow.isSubmitStep).toHaveBeenCalled();
			expect(result).toBeTruthy();
		});

		it('should call processNextStep and get valid status', function() {
			// given
			var data = {foo: 'var'};
			$rootScope.$on(FLOW_MANAGER_CONFIG.STEP_COLLECT_DATA_EVENT, function(e, storage) {
				angular.extend(storage, data);
			});

			FakeFooFlow.processNextStep.and.returnValue($q.when());
			var result;

			// when
			FlowManager.processNextStep().then(function() {
				result = true;
			});
			$rootScope.$digest();

			// then
			expect(FakeFooFlow.processNextStep).toHaveBeenCalledWith(jasmine.any(String), data);
			expect(result).toBeTruthy();
		});

		it('should call processNextStep and get invalid status', function() {
			// given
			var data = {foo: 'var'};
			$rootScope.$on(FLOW_MANAGER_CONFIG.STEP_COLLECT_DATA_EVENT, function(e, storage) {
				angular.extend(storage, data);
			});
			FakeFooFlow.processNextStep.and.returnValue($q.reject());
			var result;

			// when
			FlowManager.processNextStep().catch(function() {
				result = true;
			});
			$rootScope.$digest();

			// then
			expect(FakeFooFlow.processNextStep).toHaveBeenCalledWith(jasmine.any(String), data);
			expect(result).toBeTruthy();
		});

		it('should call processPrevState and get valid status', function() {
			// given
			var data = {foo: 'var'};
			$rootScope.$on(FLOW_MANAGER_CONFIG.STEP_COLLECT_DATA_EVENT, function(e, storage) {
				angular.extend(storage, data);
			});
			FakeFooFlow.store.and.returnValue($q.when());
			var result;

			// when
			FlowManager.processPrevStep().then(function() {
				result = true;
			});
			$rootScope.$digest();

			// then
			expect(FakeFooFlow.store).toHaveBeenCalledWith(jasmine.any(String), data);
			expect(result).toBeTruthy();
		});

		it('should call processPrevState and get invalid status', function() {
			// given
			var data = {foo: 'var'};
			$rootScope.$on(FLOW_MANAGER_CONFIG.STEP_COLLECT_DATA_EVENT, function(e, storage) {
				angular.extend(storage, data);
			});
			FakeFooFlow.store.and.returnValue($q.reject());
			var result;

			// when
			FlowManager.processPrevStep().catch(function() {
				result = true;
			});
			$rootScope.$digest();

			// then
			expect(FakeFooFlow.store).toHaveBeenCalledWith(jasmine.any(String), data);
			expect(result).toBeTruthy();
		});

		it('should call start', function() {
			// given
			var data = 'abc-start';
			FakeFooFlow.start.and.returnValue($q.when(data));

			// when
			var result;
			FlowManager.start().then(function(resposne) {
				result = resposne;
			});
			$rootScope.$digest();

			// then
			expect(FakeFooFlow.start).toHaveBeenCalled();
			expect(result).toEqual('abc-start');
		});

		describe('submit flow', function() {
			it('should submit flow', function() {
				// given
				var data = {foo: 'abc-start'};
				FakeFooFlow.processNextStep.and.returnValue($q.when(data));

				$rootScope.$on(FLOW_MANAGER_CONFIG.STEP_COLLECT_DATA_EVENT, function(e, storage) {
					angular.extend(storage, data);
				});

				// when
				var result;
				FlowManager.submit().then(function(resposne) {
					result = resposne;
				});
				$rootScope.$digest();

				// then
				expect(FakeFooFlow.processNextStep).toHaveBeenCalledWith(jasmine.any(String), data);
				expect(result).toEqual({foo: 'abc-start'});
			});
		});

		it('should call cancel', function() {
			// given
			var data = 'abc-cancel';
			FakeFooFlow.cancel.and.returnValue($q.when(data));

			// when
			var result;
			FlowManager.cancel().then(function(resposne) {
				result = resposne;
			});
			$rootScope.$digest();

			// then
			expect(FakeFooFlow.cancel).toHaveBeenCalled();
			expect(result).toEqual('abc-cancel');
		});

		it('should be a facade for finish method', function() {
			// given
			var data = 'abc-finish';
			FakeFooFlow.finish.and.returnValue($q.when(data));

			// when
			var result;
			FlowManager.finish().then(function(resposne) {
				result = resposne;
			});
			$rootScope.$digest();

			// then
			expect(result).toEqual('abc-finish');
		});

		it('should call resume', function() {
			// given
			var fooState = {
				name: 'fooState'
			};
			var data = 'abc-resume';
			FakeFooFlow.resume.and.returnValue($q.when(data));

			// when
			var result;
			FlowManager.resume(fooState).then(function(resposne) {
				result = resposne;
			});
			$rootScope.$digest();

			// then
			expect(FakeFooFlow.resume).toHaveBeenCalled();
			expect(result).toEqual('abc-resume');
		});

		it('should call persist', function() {
			// given
			var data = 'abc-persist';
			FakeFooFlow.persist.and.returnValue($q.when(data));

			// when
			var result;
			FlowManager.persist().then(function(resposne) {
				result = resposne;
			});
			$rootScope.$digest();

			// then
			expect(FakeFooFlow.persist).toHaveBeenCalled();
			expect(result).toEqual('abc-persist');
		});

		it('should call getEntryState', function() {
			// given
			FakeFooFlow.getEntryState.and.returnValue('foo-entry-state');

			// when
			var result = FlowManager.getEntryState();

			// then
			expect(FakeFooFlow.getEntryState).toHaveBeenCalled();
			expect(result).toEqual('foo-entry-state');
		});

		it('should call getExitState', function() {
			// given
			FakeFooFlow.getExitState.and.returnValue('foo-exit-state');

			// when
			var result = FlowManager.getExitState();

			// then
			expect(FakeFooFlow.getExitState).toHaveBeenCalled();
			expect(result).toEqual('foo-exit-state');
		});

		it('should call setCurrentStateValidity', function() {
			// given
			var event = {};
			var isValid = false;
			var error = 'Foo error';

			// when
			FlowManager.setCurrentStateValidity(event, isValid, error);

			// then
			expect(FakeFooFlow.setCurrentStateValidity).toHaveBeenCalledWith(jasmine.any(String), false, 'Foo error');
		});

		it('should call showPersistButton', function() {
			// given
			FakeFooFlow.showPersistButton.and.returnValue(true);

			// when
			var result = FlowManager.showPersistButton();

			// then
			expect(FakeFooFlow.showPersistButton).toHaveBeenCalled();
			expect(result).toBeTruthy();
		});

		it('should call showCancelButton', function() {
			// given
			FakeFooFlow.showCancelButton.and.returnValue(false);

			// when
			var result = FlowManager.showCancelButton();

			// then
			expect(FakeFooFlow.showCancelButton).toHaveBeenCalled();
			expect(result).toBeFalsy();
		});

		it('should call isFullscreenStep', function() {
			// given
			FakeFooFlow.isFullscreenStep.and.returnValue(true);

			// when
			var result = FlowManager.isFullscreenStep();

			// then
			expect(FakeFooFlow.isFullscreenStep).toHaveBeenCalled();
			expect(result).toBeTruthy();
		});

		it('should call showWizardSteps', function() {
			// given
			FakeFooFlow.showWizardSteps.and.returnValue(true);

			// when
			var result = FlowManager.showWizardSteps();

			// then
			expect(FakeFooFlow.showWizardSteps).toHaveBeenCalled();
			expect(result).toBeTruthy();
		});

		it('should get payload from current flow', function(){
			// given
			var payload = {test : 'testValue'};
			FakeFooFlow.getPayload.and.returnValue(payload);

			// when
			var result = FlowManager.getPayload();

			// then
			expect(FakeFooFlow.getPayload).toHaveBeenCalled();
			expect(result).toEqual(payload);
		});

		it('should call getPopulatedStepsSchema', function() {
			// given
			FakeFooFlow.getPopulatedStepsSchema.and.callThrough();

			// when
			FlowManager.getPopulatedStepsSchema();

			// then
			expect(FakeFooFlow.getPopulatedStepsSchema).toHaveBeenCalled();
		});

		it('should collect storage models from listeners', function(){
			// given
			var model = {
				test : 'value'
			};
			$rootScope.$on(FLOW_MANAGER_CONFIG.STEP_COLLECT_DATA_EVENT, function(event, storage){
				storage.model = model;
			});

			// when
			var result = FlowManager.collectData();

			// then
			expect(result.model).toEqual(model);
		});

		it('should resume boo flow', function() {
			// given
			var booState = {
				name: 'boo-state'
			};
			var fooData = {
				foo: 'data'
			};
			FlowManager.setCurrentFlow('foo-state');

			// when
			FlowManager.resume(booState, fooData);
			var currentFlow = FlowManager.getCurrentFlow();

			// then
			expect(currentFlow.getName()).toEqual('FakeBooFlow');
			expect(FakeBooFlow.resume).toHaveBeenCalledWith(fooData);
		});

		it('should call getActionLabel', function() {
			// given
			FakeFooFlow.getActionLabel.and.callThrough();

			// when
			FlowManager.getActionLabel('Save');

			// then
			expect(FakeFooFlow.getActionLabel).toHaveBeenCalledWith('', 'Save');
		});

		it('should call isFooterExtended of current flow', function() {
			// given
			FakeFooFlow.isFooterExtended.and.returnValue('foo');

			// when
			var result = FlowManager.isFooterExtended();

			// then
			expect(FakeFooFlow.isFooterExtended).toHaveBeenCalled();
			expect(result).toBe('foo');
		});
	});
});
