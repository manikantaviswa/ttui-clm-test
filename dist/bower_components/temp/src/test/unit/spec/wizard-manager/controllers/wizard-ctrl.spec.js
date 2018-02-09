'use strict';

describe('Wizard Manager: Wizard Controller', function() {
	var $log;
	var $state;
	var $rootScope;
	var $scope;
	var $controller;
	var $q;
	var $timeout;

	var FlowManager;
	var FakeFlowManager;
	var WizardController;
	var FLOW_MANAGER_CONFIG;
	var states;

	describe('state config', function() {
		var FakeFlowManagerProvider = jasmine.createSpyObj('FlowManagerProvider', ['getMainState', '$get']);
		var stateName = 'foo-bar-state';

		beforeEach(function() {
			angular.mock.module('TT-UI.WizardManager.Services.FlowManager', function($provide, $stateProvider) {
				$provide.provider('FlowManager', FakeFlowManagerProvider);
				$stateProvider.state(stateName, {});
			});

			angular.mock.module('TT-UI.WizardManager.Controllers.Wizard');
		});

		it('should set main state as "foo-bar-state"', function() {
			// given
			FakeFlowManagerProvider.getMainState.and.returnValue(stateName);

			// when
			var state;
			angular.mock.inject(function($state, FLOW_MANAGER_CONFIG) {
				state = $state.get(FLOW_MANAGER_CONFIG.WIZARD_STATE);
			});

			// then
			expect(state.parent).toEqual('foo-bar-state');
		});
	});

	describe('controller logic', function() {

		beforeEach(angular.mock.module('TT-UI.WizardManager.Controllers.Wizard'));

		beforeEach(angular.mock.inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			spyOn($rootScope, '$emit').and.returnValue({defaultPrevented: false});

			$scope = $rootScope.$new();
			$log = $injector.get('$log');
			$state = $injector.get('$state');
			$controller = $injector.get('$controller');
			$q = $injector.get('$q');
			$timeout = $injector.get('$timeout');

			FlowManager = $injector.get('FlowManager');
			FLOW_MANAGER_CONFIG = $injector.get('FLOW_MANAGER_CONFIG');

			FakeFlowManager = jasmine.createFakeObj('FlowManager', FlowManager);

			var flowName = 'foo-flow-name';
			FakeFlowManager.getFlowName.and.returnValue(flowName);

			states = [
				{name: 'a', disabled: false},
				{name: 'b', disabled: false},
				{name: 'c', disabled: false}
			];
			FakeFlowManager.getWizardSteps.and.returnValue(states);

			WizardController = $controller('WizardCtrl', {
				$log: $log,
				$state: $state,
				$scope: $scope,
				FlowManager: FakeFlowManager
			});
		}));

		afterEach(function() {
			$scope.$destroy();
		});

		it('should get flow state names from Manager', function() {
			// given, when
			var results = WizardController.getWizardSteps();

			// then
			expect(FakeFlowManager.getWizardSteps).toHaveBeenCalled();
			expect(results).toEqual(states);
		});

		it('should check if current step have prev state', function() {
			// given
			FakeFlowManager.getPrevStepState.and.returnValue('foo-state');

			// when
			var results = WizardController.hasPrevStep();

			// then
			expect(FakeFlowManager.getPrevStepState).toHaveBeenCalled();
			expect(results).toBeTruthy();
		});

		it('should check if current step does no have prev state', function() {
			// given
			FakeFlowManager.getPrevStepState.and.returnValue(null);

			// when
			var results = WizardController.hasPrevStep();

			// then
			expect(FakeFlowManager.getPrevStepState).toHaveBeenCalled();
			expect(results).toBeFalsy();
		});

		it('should trigger events going when to prev state', function() {
			// given
			var prevState = 'foo-prev-state';
			spyOn(WizardController, 'hasPrevStep').and.returnValue(true);
			FakeFlowManager.processPrevStep.and.returnValue($q.when());
			FakeFlowManager.getPrevStepState.and.returnValue(prevState);
			spyOn($state, 'go');

			// when
			WizardController.goToPrevStep();
			$timeout.flush();

			// then
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeStart', 'foo-flow-name', FLOW_MANAGER_CONFIG.PREV_STEP_ACTION);
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeEnd', 'foo-flow-name', FLOW_MANAGER_CONFIG.PREV_STEP_ACTION);
		});

		it('should go to prev state when flow have prev state', function() {
			// given
			var prevState = 'foo-prev-state';
			spyOn(WizardController, 'hasPrevStep').and.returnValue(true);
			FakeFlowManager.processPrevStep.and.returnValue($q.when());
			FakeFlowManager.getPrevStepState.and.returnValue(prevState);
			spyOn($state, 'go');

			// when
			WizardController.goToPrevStep();
			$timeout.flush();

			// then
			expect($state.go).toHaveBeenCalledWith(prevState);
		});

		it('should not go to prev state when flow does not have prev state', function() {
			// given
			var prevState = 'foo-prev-state';
			spyOn(WizardController, 'hasPrevStep').and.returnValue(false);
			FakeFlowManager.getPrevStepState.and.returnValue(prevState);
			spyOn($state, 'go');

			// when
			WizardController.goToPrevStep();

			// then
			expect($state.go).not.toHaveBeenCalled();
			expect($log.error.logs.length).toBeGreaterThan(0);
		});

		it('should not go to prev state when persis fail', function() {
			// given
			var prevState = 'foo-prev-state';
			spyOn(WizardController, 'hasPrevStep').and.returnValue(false);
			FakeFlowManager.getPrevStepState.and.returnValue(prevState);
			FakeFlowManager.persist.and.returnValue($q.reject());
			spyOn($state, 'go');

			// when
			WizardController.goToPrevStep();

			// then
			expect($state.go).not.toHaveBeenCalled();
			expect($log.error.logs.length).toBeGreaterThan(0);
		});

		it('should call FlowManager.processPrevStep function with proper context when going to prev step', function() {
			// given
			spyOn(WizardController, 'hasPrevStep').and.returnValue(true);
			var context;
			FakeFlowManager.processPrevStep.and.callFake(function() {
				context = this;
				return $q.reject();
			});

			// when
			WizardController.goToPrevStep();
			$rootScope.$digest();
			$timeout.flush();

			// then
			expect(FakeFlowManager.processPrevStep).toHaveBeenCalled();
			expect(context).toBe(FakeFlowManager);
		});

		it('should trigger events when going to next state', function() {
			// given
			var prevState = 'foo-prev-state';
			spyOn(WizardController, 'hasNextStep').and.returnValue(true);
			FakeFlowManager.processNextStep.and.returnValue($q.when());
			FakeFlowManager.getNextStepState.and.returnValue(prevState);
			spyOn($state, 'go');

			// when
			WizardController.goToNextStep();
			$timeout.flush();

			// then
			expect($rootScope.$emit).toHaveBeenCalledWith(FLOW_MANAGER_CONFIG.STEP_CHANGE_START, 'foo-flow-name', FLOW_MANAGER_CONFIG.NEXT_STEP_ACTION);
			expect($rootScope.$emit).toHaveBeenCalledWith(FLOW_MANAGER_CONFIG.STEP_CHANGE_END, 'foo-flow-name', FLOW_MANAGER_CONFIG.NEXT_STEP_ACTION);
		});

		it('should go to next state when flow have next state', function() {
			// given
			var nextState = 'foo-next-state';
			spyOn(WizardController, 'hasNextStep').and.returnValue(true);

			FakeFlowManager.getNextStepState.and.returnValue(nextState);
			FakeFlowManager.processNextStep.and.returnValue($q.when());

			spyOn($state, 'go');

			// when
			WizardController.goToNextStep();
			$timeout.flush();

			// then
			expect($state.go).toHaveBeenCalledWith(nextState);
		});

		it('should not enter next state when flow processNextStep fails', function() {
			// given
			spyOn(WizardController, 'hasNextStep').and.returnValue(true);
			FakeFlowManager.processNextStep.and.returnValue($q.reject());

			spyOn($state, 'go');

			// when
			WizardController.goToNextStep();
			$scope.$digest();

			// then
			expect($state.go).not.toHaveBeenCalled();
		});

		it('should not go to next state when flow does not have next state', function() {
			// given
			var nextState = 'foo-next-state';
			spyOn(WizardController, 'hasNextStep').and.returnValue(false);
			FakeFlowManager.getNextStepState.and.returnValue(nextState);
			spyOn($state, 'go');

			// when
			WizardController.goToNextStep();
			$scope.$digest();

			// then
			expect($state.go).not.toHaveBeenCalled();
		});

		it('should not go to the next step when default action on the STEP_CHANGE_START event has been prevented', function() {
			// given
			var nextState = 'foo-next-state';
			spyOn(WizardController, 'hasNextStep').and.returnValue(true);

			FakeFlowManager.getNextStepState.and.returnValue(nextState);
			FakeFlowManager.processNextStep.and.returnValue($q.when());

			spyOn($state, 'go');

			$rootScope.$emit.and.callThrough();
			$rootScope.$on(FLOW_MANAGER_CONFIG.STEP_CHANGE_START, function(event) {
				event.preventDefault();
			});

			// when
			WizardController.goToNextStep();
			$timeout.flush();

			// then
			expect($state.go).not.toHaveBeenCalled();
		});

		it('should call FlowManager.processNextStep function with proper context when going to next step', function() {
			// given
			spyOn(WizardController, 'hasNextStep').and.returnValue(true);
			var context;
			FakeFlowManager.processNextStep.and.callFake(function() {
				context = this;
				return $q.reject();
			});

			// when
			WizardController.goToNextStep();
			$timeout.flush();

			// then
			expect(FakeFlowManager.processNextStep).toHaveBeenCalled();
			expect(context).toBe(FakeFlowManager);
		});

		it('should persist current flow and enter exit state', function() {
			// given
			var persistResults = {boo: 'persist foo'};
			spyOn($state, 'go');
			FakeFlowManager.persist.and.returnValue($q.when(persistResults));

			var stateName = 'exit-state-name';
			FakeFlowManager.getExitState.and.returnValue(stateName);

			// when
			WizardController.persistFlow();
			$scope.$digest();
			$timeout.flush();

			// then
			expect($state.go).toHaveBeenCalledWith(stateName, persistResults);
		});

		it('should not enter exit state when persist current flow fails', function() {
			// given
			spyOn($state, 'go');
			FakeFlowManager.persist.and.returnValue($q.reject());

			// when
			WizardController.persistFlow();
			$scope.$digest();

			// then
			expect($state.go).not.toHaveBeenCalled();
		});

		it('should trigger events after persist succeed', function() {
			// given
			spyOn($state, 'go');
			var response = {boo: 'far'};
			FakeFlowManager.persist.and.returnValue($q.when(response));

			// when
			WizardController.persistFlow();
			$timeout.flush();

			// then
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeStart', 'foo-flow-name', FLOW_MANAGER_CONFIG.PERSIST_FLOW_ACTION);
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeEnd', 'foo-flow-name', FLOW_MANAGER_CONFIG.PERSIST_FLOW_ACTION);
		});

		it('should trigger events after persist fails', function() {
			// given
			spyOn($state, 'go');
			var response = {boo: 'far'};
			FakeFlowManager.persist.and.returnValue($q.reject(response));

			// when
			WizardController.persistFlow();
			$timeout.flush();

			// then
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeStart', 'foo-flow-name', FLOW_MANAGER_CONFIG.PERSIST_FLOW_ACTION);
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeEnd', 'foo-flow-name', FLOW_MANAGER_CONFIG.PERSIST_FLOW_ACTION);
		});

		it('should cancel the flow and go to exit state', function() {
			// given
			var cancelResults = {moo: 'cancel results'};
			var fakeState = 'foo-state';
			FakeFlowManager.cancel.and.returnValue($q.when(cancelResults));
			FakeFlowManager.getExitState.and.returnValue(fakeState);
			spyOn($state, 'go');

			// when
			WizardController.cancelFlow();
			$scope.$digest();
			$timeout.flush();

			// then
			expect($state.go).toHaveBeenCalledWith('foo-state', cancelResults);
			expect(FakeFlowManager.getExitState).toHaveBeenCalled();
		});

		it('should not cancel the flow when it fails', function() {
			// given
			FakeFlowManager.cancel.and.returnValue($q.reject());
			spyOn($state, 'go');

			// when
			WizardController.cancelFlow();
			$scope.$digest();

			// then
			expect($state.go).not.toHaveBeenCalled();
			expect(FakeFlowManager.getExitState).not.toHaveBeenCalled();
		});

		it('should cancel the flow', function() {
			// given
			var cancelResults = {boo: 'foo cancel'};
			var fakeState = 'foo-state';
			FakeFlowManager.cancel.and.returnValue($q.when(cancelResults));
			FakeFlowManager.getExitState.and.returnValue(fakeState);
			spyOn($state, 'go');

			// when
			WizardController.cancelFlow();
			$scope.$digest();
			$timeout.flush();

			// then
			expect($state.go).toHaveBeenCalledWith('foo-state', cancelResults);
		});

		it('should trigger events after cancel succeed', function() {
			// given
			spyOn($state, 'go');
			var response = {boo: 'far'};
			FakeFlowManager.cancel.and.returnValue($q.when(response));

			// when
			WizardController.cancelFlow();
			$scope.$digest();

			// then
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeStart', 'foo-flow-name', FLOW_MANAGER_CONFIG.CANCEL_FLOW_ACTION);
		});

		it('should trigger events after cancel fails', function() {
			// given
			spyOn($state, 'go');
			var response = {boo: 'far'};
			FakeFlowManager.cancel.and.returnValue($q.reject(response));

			// when
			WizardController.cancelFlow();
			$scope.$digest();

			// then
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeStart', 'foo-flow-name', FLOW_MANAGER_CONFIG.CANCEL_FLOW_ACTION);
		});

		it('should run flow finish', function() {
			// given
			FakeFlowManager.finish.and.returnValue($q.reject());

			// when
			WizardController.finishFlow();
			$scope.$digest();
			$timeout.flush();

			// then
			expect(FakeFlowManager.finish).toHaveBeenCalled();
		});

		it('should trigger events after finish succeed', function() {
			// given
			spyOn($state, 'go');

			FakeFlowManager.cancel.and.returnValue($q.when({}));

			// when
			WizardController.cancelFlow();
			$scope.$digest();

			// then
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeStart', FakeFlowManager.getFlowName(), FLOW_MANAGER_CONFIG.CANCEL_FLOW_ACTION);
		});

		it('should trigger events finish cancel fails', function() {
			// given
			spyOn($state, 'go');
			FakeFlowManager.finish.and.returnValue($q.reject());

			// when
			WizardController.finishFlow();
			$scope.$digest();

			// then
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeStart', FakeFlowManager.getFlowName(), FLOW_MANAGER_CONFIG.FINISH_FLOW_ACTION);
		});

		it('should call finish function with proper context', function() {
			// given
			var context;
			FakeFlowManager.finish.and.callFake(function() {
				context = this;
				return $q.reject();
			});

			// when
			WizardController.finishFlow();
			$rootScope.$digest();
			$timeout.flush();

			// then
			expect(context).toBe(FakeFlowManager);
		});

		it('should go to the exit state when flow has been finish', function() {
			// given
			var finishResult = {boo: 'foo finish xxxx'};
			var exitState = 'exit-state-after-finish';
			FakeFlowManager.finish.and.returnValue($q.when(finishResult));
			FakeFlowManager.getExitState.and.returnValue(exitState);
			spyOn($state, 'go');

			// when
			WizardController.finishFlow();
			$scope.$digest();
			$timeout.flush();

			// then
			expect($state.go).toHaveBeenCalledWith(exitState, finishResult);
		});

		it('should call manager hasNextStep method', function() {
			// given
			FakeFlowManager.getNextStepState.and.returnValue('foo-state');

			// when
			var results = WizardController.hasNextStep();

			// then
			expect(FakeFlowManager.getNextStepState).toHaveBeenCalled();
			expect(results).toBeTruthy();
		});

		it('should call manager hasPrevStep method', function() {
			// given
			FakeFlowManager.getPrevStepState.and.returnValue('foo-state');

			// when
			var results = WizardController.hasPrevStep();

			// then
			expect(FakeFlowManager.getPrevStepState).toHaveBeenCalled();
			expect(results).toBeTruthy();
		});

		it('should call manager showPersistButton method', function() {
			// given
			FakeFlowManager.showPersistButton.and.returnValue(true);

			// when
			var results = WizardController.showPersistButton();

			// then
			expect(FakeFlowManager.showPersistButton).toHaveBeenCalled();
			expect(results).toBeTruthy();
		});

		it('should call manager showCancelButton method', function() {
			// given
			FakeFlowManager.showCancelButton.and.returnValue(true);

			// when
			var results = WizardController.showCancelButton();

			// then
			expect(FakeFlowManager.showCancelButton).toHaveBeenCalled();
			expect(results).toBeTruthy();
		});

		it('should call manager isFullscreenStep method', function() {
			// given
			FakeFlowManager.isFullscreenStep.and.returnValue(true);

			// when
			var results = WizardController.isFullscreenStep();

			// then
			expect(FakeFlowManager.isFullscreenStep).toHaveBeenCalled();
			expect(results).toBeTruthy();
		});

		it('should call manager showWizardSteps method', function() {
			// given
			FakeFlowManager.showWizardSteps.and.returnValue(true);

			// when
			var results = WizardController.showWizardSteps();

			// then
			expect(FakeFlowManager.showWizardSteps).toHaveBeenCalled();
			expect(results).toBeTruthy();
		});

		it('should call manager showSubmitButton method', function() {
			// given
			FakeFlowManager.isSubmitStep.and.returnValue(true);

			// when
			var results = WizardController.showSubmitButton();

			// then
			expect(FakeFlowManager.isSubmitStep).toHaveBeenCalled();
			expect(results).toBeTruthy();
		});

		it('should submit the flow and go to exit state', function() {
			// given
			var submitResults = {results: 'Submit results'};
			var fakeState = 'foo-state';
			FakeFlowManager.submit.and.returnValue($q.when(submitResults));
			FakeFlowManager.getExitState.and.returnValue(fakeState);
			spyOn(WizardController, 'showSubmitButton').and.returnValue(true);
			spyOn($state, 'go');

			// when
			WizardController.submitFlow();
			$scope.$digest();
			$timeout.flush();

			// then
			expect($state.go).toHaveBeenCalledWith('foo-state', submitResults);
			expect(FakeFlowManager.getExitState).toHaveBeenCalled();
		});

		it('should not submit the flow when it fails', function() {
			// given
			FakeFlowManager.submit.and.returnValue($q.reject());
			spyOn(WizardController, 'showSubmitButton').and.returnValue(true);
			spyOn($state, 'go');

			// when
			WizardController.submitFlow();
			$scope.$digest();

			// then
			expect($state.go).not.toHaveBeenCalled();
			expect(FakeFlowManager.getExitState).not.toHaveBeenCalled();
		});

		it('should not submit flow when current step do not contains submit button', function() {
			// given
			spyOn(WizardController, 'showSubmitButton').and.returnValue(false);

			// when
			WizardController.submitFlow();

			// then
			expect(FakeFlowManager.submit).not.toHaveBeenCalled();
		});

		it('should not enter next step when submitFlow fails', function() {
			// given
			FakeFlowManager.submit.and.returnValue($q.reject());
			spyOn(WizardController, 'showSubmitButton').and.returnValue(true);
			spyOn($state, 'go');

			// when
			WizardController.submitFlow();
			$scope.$digest();

			// then
			expect($state.go).not.toHaveBeenCalled();
			expect(FakeFlowManager.getExitState).not.toHaveBeenCalled();
		});

		it('should trigger events when sumbit succeed', function() {
			// given
			var response = {boo: 'far'};
			spyOn(WizardController, 'showSubmitButton').and.returnValue(true);
			FakeFlowManager.submit.and.returnValue($q.when(response));
			spyOn($state, 'go');

			// when
			WizardController.submitFlow();
			$scope.$digest();
			$timeout.flush();

			// then
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeStart', 'foo-flow-name', FLOW_MANAGER_CONFIG.SUBMIT_FLOW_ACTION);
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeEnd', 'foo-flow-name', FLOW_MANAGER_CONFIG.SUBMIT_FLOW_ACTION);
		});

		it('should trigger events when submit failed', function() {
			// given
			var response = {boo: 'far'};
			spyOn(WizardController, 'showSubmitButton').and.returnValue(true);
			FakeFlowManager.submit.and.returnValue($q.reject(response));
			spyOn($state, 'go');

			// when
			WizardController.submitFlow();
			$scope.$digest();
			$timeout.flush();

			// then
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeStart', 'foo-flow-name', FLOW_MANAGER_CONFIG.SUBMIT_FLOW_ACTION);
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeEnd', 'foo-flow-name', FLOW_MANAGER_CONFIG.SUBMIT_FLOW_ACTION);
		});

		it('should trigger events after cancel fails', function() {
			// given
			spyOn($state, 'go');
			var response = {boo: 'far'};
			FakeFlowManager.cancel.and.returnValue($q.reject(response));

			// when
			WizardController.cancelFlow();
			$scope.$digest();

			// then
			expect($rootScope.$emit).toHaveBeenCalledWith('flowStepChangeStart', 'foo-flow-name', FLOW_MANAGER_CONFIG.CANCEL_FLOW_ACTION);
		});

		it('should call getActionLabel method', function() {
			// given
			FakeFlowManager.getActionLabel.and.callThrough();

			// when
			WizardController.getActionLabel('foo-label');

			// then
			expect(FakeFlowManager.getActionLabel).toHaveBeenCalledWith('foo-label');
		});

		it('should call isFooterExtended method of FlowManager', function() {
			// given
			FakeFlowManager.isFooterExtended.and.returnValue('foo');

			// when
			var result = WizardController.isFooterExtended();

			// then
			expect(FakeFlowManager.isFooterExtended).toHaveBeenCalled();
			expect(result).toBe('foo');
		});
	});

	describe('$timeout postpone logic', function() {
		var $timeout;

		var FakeTimeout = jasmine.createSpy('FakeTimeout');

		beforeEach(angular.mock.module(function($provide) {
			$provide.decorator('$timeout', function() {
				return FakeTimeout;
			});
		}));

		beforeEach(angular.mock.module('TT-UI.WizardManager.Controllers.Wizard'));

		beforeEach(angular.mock.inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			$state = $injector.get('$state');
			$controller = $injector.get('$controller');
			$timeout = $injector.get('$timeout');

			FakeFlowManager = jasmine.createFakeObj('FlowManager', $injector.get('FlowManager'));

			var flowName = 'foo-flow-name';
			FakeFlowManager.getFlowName.and.returnValue(flowName);

			states = [
				{name: 'a', disabled: false},
				{name: 'b', disabled: false},
				{name: 'c', disabled: false}
			];
			FakeFlowManager.getWizardSteps.and.returnValue(states);

			WizardController = $controller('WizardCtrl', {
				$log: $log,
				$state: $state,
				$scope: $scope,
				FlowManager: FakeFlowManager
			});
		}));

		afterEach(function() {
			$scope.$destroy();
		});

		function unsuccessfullTimeoutExpectation(wizzardControllerActionName, flowManagerFnName, wizzardControllerFnName) {
			// given
			if (wizzardControllerFnName) {
				spyOn(WizardController, wizzardControllerFnName).and.returnValue(true);
			}

			spyOn($state, 'go');

			$timeout.and.returnValue({
				then: angular.noop
			});

			// when
			WizardController[wizzardControllerActionName]();
			$scope.$digest();

			// then
			expect($timeout).toHaveBeenCalled();
			expect(FakeFlowManager[flowManagerFnName]).not.toHaveBeenCalled();
			expect($state.go).not.toHaveBeenCalled();
		}

		function successfullTimeoutExpectation(wizzardControllerActionName, flowManagerFnName, wizzardControllerFnName) {
			// given
			if (wizzardControllerFnName) {
				spyOn(WizardController, wizzardControllerFnName).and.returnValue(true);
			}

			spyOn($state, 'go');

			$timeout.and.returnValue({
				then: function(callback) {
					callback();
				}
			});

			// when
			WizardController[wizzardControllerActionName]();
			$scope.$digest();

			// then
			expect($timeout).toHaveBeenCalled();
			expect(FakeFlowManager[flowManagerFnName]).toHaveBeenCalled();
			expect($state.go).toHaveBeenCalled();
		}

		function testWizardCtrlAction(wizardCtrlAction, flowManagerFnName, wizzardControllerFnName) {
			it('should postpone' + wizardCtrlAction + ' actions to next watch loop and not go further', function() {
				unsuccessfullTimeoutExpectation(wizardCtrlAction, flowManagerFnName, wizzardControllerFnName);
			});

			it('should postpone' + wizardCtrlAction + ' actions to next watch loop and not go further', function() {
				successfullTimeoutExpectation(wizardCtrlAction, flowManagerFnName, wizzardControllerFnName);
			});
		}

		testWizardCtrlAction('goToNextStep', 'getNextStepState', 'hasNextStep');
		testWizardCtrlAction('goToPrevStep', 'getPrevStepState', 'hasPrevStep');
		testWizardCtrlAction('submitFlow', 'getNextStepState', 'showSubmitButton');
		testWizardCtrlAction('persistFlow', 'getExitState');
		testWizardCtrlAction('cancelFlow', 'getExitState');
		testWizardCtrlAction('finishFlow', 'getExitState');
	});
});
