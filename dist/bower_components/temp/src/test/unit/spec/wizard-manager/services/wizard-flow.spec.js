describe('Wizard Manager: WizardFlow', function() {
	'use strict';

	var $q;
	var $log;
	var $rootScope;
	var $httpBackend;
	var WizardFlow;
	var WIZARD_FLOW_SETTINGS;
	var $stateProvider;
	var $state;

	beforeEach(function() {
		angular.mock.module('TT-UI.WizardManager.Services.WizardFlow', function($injector) {
			$stateProvider = $injector.get('$stateProvider');
		});

		angular.mock.inject(function($injector) {
			$q = $injector.get('$q');
			$log = $injector.get('$log');
			$rootScope = $injector.get('$rootScope');
			$httpBackend = $injector.get('$httpBackend');
			$state = $injector.get('$state');
			WizardFlow = $injector.get('WizardFlow');
			WIZARD_FLOW_SETTINGS = $injector.get('WIZARD_FLOW_SETTINGS');
		});
	});

	describe('Flow', function() {
		var Flow;
		var flowName = 'FooFlowName';
		var flowLabel = 'Flow Label';
		var flowStateName = 'foo-state-name';
		var entryState = 'first-state';
		var exitState = 'home-foo-state';
		var states = {
			'first-state': {
				visible: true,
				nextActions: ['persist','store'],
				customLabels: {
					'Next': 'Go to next step'
				}
			},
			'foo-state': {
				visible: true
			},
			'disabled-state': {
				enabled: false
			},
			'last-state': {
				visible: true
			},
			'hidden-state': {
				visible: false
			}
		};

		beforeEach(function() {
			Flow = new WizardFlow(flowName, flowLabel, flowStateName, entryState, exitState, states);
		});

		describe('states checking', function() {

			it('should run defined actions ', function(){
				// given
				var stateName = 'first-state';
				var actions = ['persist', 'store'];
				var states = {};

				states[stateName] = {
					visible: true,
					nextActions: actions
				};
				spyOn(Flow,'getStates').and.returnValue(states);

				var state = flowStateName + '.' + stateName;
				var data = {test: 'test'};

				actions.forEach(function(action, index){
					spyOn(Flow, action).and.returnValue(index);
				});

				// when
				Flow.processNextStep(state, data);
				$rootScope.$digest();

				// then
				actions.forEach(function(action){
					expect(Flow[action]).toHaveBeenCalledWith(state, data);
				});
			});

			it('should resolve processNextStep promise if all actions resolved', function() {
				// given
				var actions = ['persist', 'store'];
				var resolveHandler = jasmine.createSpy('resolveHandler');

				actions.forEach(function(action){
					spyOn(Flow, action);
				});
				spyOn(Flow, '_getStateActions').and.returnValue(actions);

				// when
				Flow.processNextStep('foo', {}).then(resolveHandler);
				$rootScope.$digest();

				// then
				expect(Flow.persist).toHaveBeenCalled();
				expect(Flow.store).toHaveBeenCalled();
				expect(resolveHandler).toHaveBeenCalled();
			});

			it('should reject processNextStep promise if one of action reject', function() {
				// given
				var actions = ['isValid', 'persist', 'store'];
				var rejectHandler = jasmine.createSpy('rejectHandler');

				actions.forEach(function(action){
					spyOn(Flow, action);
				});
				Flow.persist.and.returnValue($q.reject('nope'));
				spyOn(Flow, '_getStateActions').and.returnValue(actions);

				// when
				Flow.processNextStep('foo', {}).catch(rejectHandler);
				$rootScope.$digest();

				// then
				expect(Flow.isValid).toHaveBeenCalled();
				expect(Flow.persist).toHaveBeenCalled();
				expect(Flow.store).not.toHaveBeenCalled();
				expect(rejectHandler).toHaveBeenCalledWith('nope');
			});

			it('should log error when defined actions do not exist in the flow', function(){
				// given
				var stateName = 'next-state';
				var notExistedAction = 'xxx';
				var states = {};

				states[stateName] = {
					visible: true,
					nextActions: [notExistedAction]
				};
				spyOn(Flow,'getStates').and.returnValue(states);

				var state = flowStateName + '.' + stateName;
				var data = {test2: 'test2'};

				// when
				Flow.processNextStep(state, data);
				$rootScope.$digest();

				// then
				expect($log.error.logs).toContain(['action ' + notExistedAction + ' does not exist in the flow']);
			});

			it('should return resolved promise when there are no actions', function(){
				// given
				var stateName = 'foo-state';
				var state = flowStateName + '.' + stateName;
				var data = {test: 'test'};

				var states = {};
				states[stateName] = {
					visible: true
				};
				spyOn(Flow,'getStates').and.returnValue(states);

				// when
				var result;
				Flow.processNextStep(state, data).then(function(){
					result = true;
				});
				$rootScope.$digest();

				// then
				expect(result).toBeTruthy();
			});

			it('should get next state when next state exists', function() {
				// given
				var fooNextState = 'fooState';
				var currentStep = 'foo-state-name.bar-moo-state';
				spyOn(Flow, '_findRelativeNextState').and.returnValue(fooNextState);

				//  when
				var results = Flow.getNextStepState(currentStep);

				// then
				expect(results).toEqual('foo-state-name.fooState');
			});

			it('should get prev state when prev state exists', function() {
				// given
				var fooPrevState = 'fooState';
				var currentStep = 'foo-state-name.bar-moo-state';
				spyOn(Flow, '_findRelativeNextState').and.returnValue(fooPrevState);
				spyOn(Flow, '_isStepAfterSubmitStep').and.returnValue(false);

				//  when
				var results = Flow.getPrevStepState(currentStep);

				// then
				expect(results).toEqual('foo-state-name.fooState');
			});

			it('should get all flow states', function() {
				// given, when
				var results = Flow.getStates();

				// then
				expect(results).toEqual(states);
			});

			it('should call for entry state of flow', function() {
				// given, when
				var results = Flow.getEntryState();

				// then
				expect(results).toEqual('foo-state-name.first-state');
			});

			it('should call for exit state of flow', function() {
				// given, when
				var results = Flow.getExitState();

				// then
				expect(results).toEqual(exitState);
			});

			it('should return custom action label if defined', function() {
				// given
				var flowState = 'first-state';

				// when
				var doneLabel = Flow.getActionLabel(flowState, 'Done');
				var nextLabel = Flow.getActionLabel(flowState, 'Next');

				// then
				expect(doneLabel).toEqual('Done');
				expect(nextLabel).toEqual('Go to next step');
			});
		});

		describe('interfaces', function() {
			it('should cancel the flow', function() {
				expect(Flow.start).toThrow();
			});

			it('should cancel the flow', function() {
				expect(Flow.cancel).toThrow();
			});

			it('should throw exception when calling not implemented method isValid', function() {
				expect(Flow.isValid).toThrow();
			});

			it('should throw exception when calling not implemented method persist', function() {
				expect(Flow.persist).toThrow();
			});

			it('should throw exception when calling not implemented method submit', function() {
				expect(Flow.submit).toThrow();
			});

			it('should throw exception when calling not implemented method getPayload', function() {
				expect(Flow.getPayload).toThrow();
			});

			it('should return const when calling not implemented method getStrategy', function() {
				expect(Flow.getStrategy()).toEqual(WIZARD_FLOW_SETTINGS.NO_STRATEGY);
			});
		});

		describe('visibility of states', function() {
			var flowStates;

			beforeEach(function() {
				spyOn(Flow, 'getStates').and.callFake(function() {
					return flowStates;
				});
			});

			it('should return true by default when state has no options', function() {
				// given
				var stateName = 'fooState';
				flowStates = {};
				flowStates[stateName] = {};

				// when
				var results = Flow._isStateAvailable(stateName);

				// then
				expect(results).toBeTruthy();
			});

			it('should return false when state is visible but disabled', function() {
				// given
				var stateName = 'fooState';
				flowStates = {};
				flowStates[stateName] = {
					visilble: true,
					enabled: false
				};

				// when
				var results = Flow._isStateAvailable(stateName);

				// then
				expect(results).toBeFalsy();
			});

			it('should return true when state is visible', function() {
				// given
				var stateName = 'fooState';
				flowStates = {};
				flowStates[stateName] = {
					visilble: true,
					enabled: true
				};

				// when
				var results = Flow._isStateAvailable(stateName);

				// then
				expect(results).toBeTruthy();
			});

			it('should return true when state is hidden', function() {
				// given
				var stateName = 'fooState';
				flowStates = {};
				flowStates[stateName] = {
					visilble: false
				};

				// when
				var results = Flow._isStateAvailable(stateName);

				// then
				expect(results).toBeTruthy();
			});

			it('should log error when state is missing', function() {
				// given
				var stateName = 'fooState';
				flowStates = {};

				// when
				var results = Flow._isStateAvailable(stateName);

				// then
				expect(results).toBeFalsy();
				expect($log.error.logs).toContain(['Missing state', 'fooState']);
			});

			it('should return false when state is conditionally disabled', function() {
				// given
				var stateName = 'fooState';
				flowStates = {};
				flowStates[stateName] = {
					visilble: true,
					enabled: 'isStateEnabled'
				};
				Flow.isStateEnabled = jasmine.createSpy('isStateEnabled').and.returnValue(false);

				// when
				var results = Flow._isStateAvailable(stateName);

				// then
				expect(Flow.isStateEnabled).toHaveBeenCalled();
				expect(results).toBeFalsy();
			});

			it('should return true when state is not conditionally disabled', function() {
				// given
				var stateName = 'fooState';
				flowStates = {};
				flowStates[stateName] = {
					visilble: true,
					enabled: 'isStateEnabled'
				};
				Flow.isStateEnabled = jasmine.createSpy('isStateEnabled').and.returnValue(true);

				// when
				var results = Flow._isStateAvailable(stateName);

				// then
				expect(Flow.isStateEnabled).toHaveBeenCalled();
				expect(results).toBeTruthy();
			});
		});

		describe('finding next state', function() {
			var Flowstates = {
				'first-state': {
					visible: true
				},
				'foo-state': {
					visible: true
				},
				'disabled-state': {
					visible: true,
					enabled: false
				},
				'bar-state': {
					visible: true
				},
				'hidden-state': {
					visible: false,
					enabled: true
				}
			};

			beforeEach(function() {
				spyOn(Flow, 'getStates').and.returnValue(Flowstates);
			});

			it('should get "foo-state" when current state is "first-state"', function() {
				// given
				var currentState = 'first-state';
				var expectedState = 'foo-state';

				// when
				var results = Flow._findRelativeNextState(currentState);

				// then
				expect(results).toEqual(expectedState);
			});

			it('should get next state after disabled state "disabled-state" when current state is "foo-state"', function() {
				// given
				var currentState = 'foo-state';
				var expectedState = 'bar-state';

				// when
				var results = Flow._findRelativeNextState(currentState);

				// then
				expect(results).toEqual(expectedState);
			});

			it('should get next state as "hidden-state" when current state is "bar-state"', function() {
				// given
				var currentState = 'bar-state';
				var expectedState = 'hidden-state';

				// when
				var results = Flow._findRelativeNextState(currentState);

				// then
				expect(results).toEqual(expectedState);
			});

			it('should not get any next state for last state', function() {
				// given
				var currentState = 'hidden-state';

				// when
				var results = Flow._findRelativeNextState(currentState);

				// then
				expect(results).toBeUndefined();
			});
		});

		describe('finding prev state (relative)', function() {
			var flowStates = {
				'first-state': {
					visible: true
				},
				'foo-state': {
					visible: true
				},
				'disabled-state': {
					visible: true,
					enabled: false
				},
				'bar-state': {
					visible: true
				},
				'hidden-state': {
					visible: false,
					enabled: true
				}
			};

			var relative = true;

			beforeEach(function() {
				spyOn(Flow, 'getStates').and.returnValue(flowStates);
			});

			it('should get "first-state" when current state is "foo-state"', function() {
				// given
				var currentState = 'foo-state';
				var expectedState = 'first-state';

				// when
				var results = Flow._findRelativeNextState(currentState, relative);

				// then
				expect(results).toEqual(expectedState);
			});

			it('should get prev state before disabled state "disabled-state" when current state is "bar-state"', function() {
				// given
				var currentState = 'bar-state';
				var expectedState = 'foo-state';

				// when
				var results = Flow._findRelativeNextState(currentState, relative);

				// then
				expect(results).toEqual(expectedState);
			});

			it('should not get any prev state for first state', function() {
				// given
				var currentState = 'first-state';

				// when
				var results = Flow._findRelativeNextState(currentState, relative);

				// then
				expect(results).toBeUndefined();
			});
		});
	});

	describe('service instance', function() {
		// given
		var flow;
		var flowName = 'FooFlowName';
		var flowLabel = 'Flow Label';
		var flowStateName = 'BarStateName';
		var entryState = 'BooEntryState';
		var exitState = 'GooExitState';
		var states = {
			BooEntryState: {
				visible: true
			},
			GooState: {
				visible: true,
				enabled: false
			},
			FooState: {
				visible: false,
				enabled: false
			},
			SubmitState: {
				visible: true
			},
			MooState: {
				visible: false
			}
		};

		beforeEach(function() {
			// when
			flow = new WizardFlow(flowName, flowLabel, flowStateName, entryState, exitState, states);
		});

		afterEach(function() {
			flow._validity = {};
		});

		it('should check if flow is instance of WizardFlow', function() {
			// then
			expect(flow).toEqual(jasmine.any(WizardFlow));
		});

		it('should get flow label', function() {
			// then
			expect(flow.getLabel()).toEqual('Flow Label');
		});

		it('should get flow name', function() {
			// then
			expect(flow.getName()).toEqual('FooFlowName');
		});

		it('should get flow state name', function() {
			// then
			expect(flow.getFlowStateName()).toEqual('BarStateName');
		});

		it('should return true when flow contains existing state', function() {
			// then
			expect(flow.hasState('MooState')).toBeTruthy();
		});

		it('should return false when flow does not contains existing state', function() {
			// then
			expect(flow.hasState('NotAState')).toBeFalsy();
		});

		it('should get full states names for a flow', function() {
			// then
			var steps = flow.getWizardSteps();

			expect(steps).toContain({name: 'BarStateName.BooEntryState', enabled: true});
			expect(steps).toContain({name: 'BarStateName.SubmitState', enabled: true});
		});

		it('should get entry state name', function() {
			// given, when
			var results = flow.getEntryState();

			// then
			expect(results).toEqual('BarStateName.BooEntryState');
			expect(results).toEqual('BarStateName.BooEntryState');
		});

		it('should get next state name', function() {
			// given
			var currentState = 'BarStateName.BooEntryState';

			// when
			var results = flow.getNextStepState(currentState);

			// then
			expect(results).toEqual('BarStateName.SubmitState');
		});

		it('should get next state name when it is hidden', function() {
			// given
			var currentState = 'BarStateName.FooState';

			// when
			var results = flow.getNextStepState(currentState);

			// then
			expect(results).toBeUndefined();
		});

		it('should get prev state name', function() {
			// given
			var currentState = 'BarStateName.SubmitState';

			// when
			var results = flow.getPrevStepState(currentState);

			// then
			expect(results).toEqual('BarStateName.BooEntryState');
		});

		it('should not get prev state name when it is a first one', function() {
			// given
			var currentState = 'BarStateName.BooEntryState';

			// when
			var results = flow.getPrevStepState(currentState);

			// then
			expect(results).toBeUndefined();
		});

		it('should not get prev state name when prev is submit step', function() {
			// given
			var currentState = 'BarStateName.MooState';
			spyOn(flow, 'getSubmitState').and.returnValue('SubmitState');

			// when
			var results = flow.getPrevStepState(currentState);

			// then
			expect(results).toBeUndefined();
		});

		it('should set state validity to true', function() {
			// given
			var stateName = 'MooState';
			var isValid = true;
			var validity;

			// when
			flow.setCurrentStateValidity(flowStateName + '.' + stateName, isValid);
			flow.isCurrentStepValid(flowStateName + '.' + stateName).then(function() {
				validity = true;
			});
			$rootScope.$digest();

			// then
			expect(validity).toBeTruthy();
		});

		it('should set state validity to false', function() {
			// given
			var stateName = 'MooState';
			var isValid = false;
			var error = 'Foo error msg';
			var validity;

			// when
			flow.setCurrentStateValidity(flowStateName + '.' + stateName, isValid, error);
			flow.isCurrentStepValid(flowStateName + '.' + stateName).catch(function(results) {
				validity = results;
			});
			$rootScope.$digest();

			// then
			expect(validity).toEqual('Foo error msg');
		});

		it('should not set state validity when state is missing', function() {
			// given
			spyOn(flow, 'hasState').and.callThrough();
			var stateName = 'NotAState';
			var isValid = true;
			var validity;

			// when
			flow.setCurrentStateValidity(flowStateName + '.' + stateName, isValid);
			flow.isCurrentStepValid(flowStateName + '.' + stateName).then(function(results) {
				validity = results;
			});
			$rootScope.$digest();

			// then
			expect(validity).toBeUndefined();
			expect(flow.hasState).toHaveBeenCalledWith(flowStateName + '.' + stateName);
		});

		it('should resolve promise when all steps are valid', function() {
			// given
			flow.setCurrentStateValidity(flowStateName + '.BooEntryState', true);
			flow.setCurrentStateValidity(flowStateName + '.SubmitState', true);

			// when
			var results;
			flow.validate().then(function() {
				results = true;
			});
			$rootScope.$digest();

			// then
			expect(results).toBeTruthy();
		});

		it('should reject promise when one of steps is invalid', function() {
			// given
			flow.setCurrentStateValidity(flowStateName + '.BooEntryState', false);
			flow.setCurrentStateValidity(flowStateName + '.SubmitState', true);

			// when
			var results;
			flow.validate().catch(function(error) {
				results = error;
			});
			$rootScope.$digest();

			// then
			expect(results).toEqual('Flow is not valid');
		});

		it('should reject promise when validity status for one of steps is missing', function() {
			// given
			flow.setCurrentStateValidity(flowStateName + '.SubmitState', true);

			// when
			var results;
			flow.validate().catch(function() {
				results = true;
			});
			$rootScope.$digest();

			// then
			expect(results).toBeTruthy();
		});

		it('should skip validation of further step other then submission step', function() {
			// given
			spyOn(flow, 'getSubmitState').and.returnValue('SubmitState');
			flow.setCurrentStateValidity(flowStateName + '.BooEntryState', true);
			flow.setCurrentStateValidity(flowStateName + '.FooState', true);
			flow.setCurrentStateValidity(flowStateName + '.SubmitState', true);

			// when
			var results;
			flow.validate().then(function() {
				results = true;
			});
			$rootScope.$digest();

			// then
			expect(results).toBeTruthy();
			expect($log.error.logs.length).toEqual(0);
		});

		it('should clear validuty status', function() {
			// given
			flow._validity['foo-bar'] = true;
			flow._validity['boo-far'] = false;

			// when
			flow.clearValidity();

			// then
			expect(Object.keys(flow._validity).length).toEqual(0);
		});

		it('should check if current step is submit step', function() {
			// given
			var fowState = 'foo-flow';
			var currentState = 'foo-bar-state';
			spyOn(flow, 'getFlowStateName').and.returnValue(fowState);
			spyOn(flow, 'getSubmitState').and.returnValue(currentState);

			// when
			var results = flow.isSubmitStep('foo-flow.foo-bar-state');

			// then
			expect(results).toBeTruthy();
		});

		it('should return false when current step is submit step', function() {
			// given
			var fowState = 'foo-flow';
			var currentState = 'foo-bar-state';
			spyOn(flow, 'getFlowStateName').and.returnValue(fowState);
			spyOn(flow, 'getSubmitState').and.returnValue(currentState);

			// when
			var results = flow.isSubmitStep('foo-flow.foo-moo-state');

			// then
			expect(results).toBeFalsy();
		});

		it('should return false when current step has hidden persist button', function() {
			// given
			var flowState = 'foo-flow';
			var states = {};
			var state = 'foo-bar-state';
			states[state] = {persistButton: false};
			spyOn(flow, 'getStates').and.returnValue(states);
			spyOn(flow, '_getStepStateNameFromFlowState').and.returnValue(state);

			// when
			var results = flow.showPersistButton(flowState + '.' + state);

			// then
			expect(results).toBeFalsy();
		});

		it('should return true when current step do not has hidden persist button', function() {
			// given
			var flowState = 'foo-flow';
			var states = {};
			var state = 'foo-bar-state';
			states[state] = {};
			spyOn(flow, 'getStates').and.returnValue(states);
			spyOn(flow, '_getStepStateNameFromFlowState').and.returnValue(state);

			// when
			var results = flow.showPersistButton(flowState + '.' + state);

			// then
			expect(results).toBeTruthy();
		});

		it('should return false when current step has hidden cancel button', function() {
			// given
			var flowState = 'foo-flow';
			var states = {};
			var state = 'foo-bar-state';
			states[state] = {cancelButton: false};
			spyOn(flow, 'getStates').and.returnValue(states);
			spyOn(flow, '_getStepStateNameFromFlowState').and.returnValue(state);

			// when
			var results = flow.showCancelButton(flowState + '.' + state);

			// then
			expect(results).toBeFalsy();
		});

		it('should return true when current step do not has hidden cancel button', function() {
			// given
			var flowState = 'foo-flow';
			var states = {};
			var state = 'foo-bar-state';
			states[state] = {};
			spyOn(flow, 'getStates').and.returnValue(states);
			spyOn(flow, '_getStepStateNameFromFlowState').and.returnValue(state);

			// when
			var results = flow.showCancelButton(flowState + '.' + state);

			// then
			expect(results).toBeTruthy();
		});

		it('should return true when current step is fullscreen step', function() {
			// given
			var flowState = 'foo-flow';
			var states = {};
			var state = 'foo-bar-state';
			states[state] = {fullscreen: true};
			spyOn(flow, 'getStates').and.returnValue(states);
			spyOn(flow, '_getStepStateNameFromFlowState').and.returnValue(state);

			// when
			var results = flow.isFullscreenStep(flowState + '.' + state);

			// then
			expect(results).toBeTruthy();
		});

		it('should return false when current step is not fullscreen step', function() {
			// given
			var flowState = 'foo-flow';
			var states = {};
			var state = 'foo-bar-state';
			states[state] = {};
			spyOn(flow, 'getStates').and.returnValue(states);
			spyOn(flow, '_getStepStateNameFromFlowState').and.returnValue(state);

			// when
			var results = flow.isFullscreenStep(flowState + '.' + state);

			// then
			expect(results).toBeFalsy();
		});

		it('should return true when current step shows wizard steps', function() {
			// given
			var flowState = 'foo-flow';
			var states = {};
			var state = 'foo-bar-state';
			states[state] = {};
			spyOn(flow, 'getStates').and.returnValue(states);
			spyOn(flow, '_getStepStateNameFromFlowState').and.returnValue(state);

			// when
			var results = flow.showWizardSteps(flowState + '.' + state);

			// then
			expect(results).toBeTruthy();
		});

		it('should return true when current step shows wizard steps', function() {
			// given
			var flowState = 'foo-flow';
			var states = {};
			var state = 'foo-bar-state';
			states[state] = {wizardSteps: false};
			spyOn(flow, 'getStates').and.returnValue(states);
			spyOn(flow, '_getStepStateNameFromFlowState').and.returnValue(state);

			// when
			var results = flow.showWizardSteps(flowState + '.' + state);

			// then
			expect(results).toBeFalsy();
		});

		it('should return `false` by default when checks if footer extended', function() {
			expect(flow.isFooterExtended()).toBeFalsy();
		});

		describe('getting validators', function() {
			var statesNames = {
				'state-with-validators': {
					visible: true,
					validators: {
						common: [
							'data/validators/customer-profile-blacklist-validator.json',
							'data/validators/customer-profile-duplicate-check.json'
						]
					}
				},
				'state-with-disabled-validator': {
					visible: true,
					validators: {
						'existing-strategy': [
							'data/validators/disabled-validator.json'
						]
					}
				},
				'state-with-conditional-validator': {
					visible: true,
					validators: {
						'existing-strategy': [
							'data/validators/conditional-validator.json'
						]
					}
				},
				'state-with-mixed-validators': {
					visible: true,
					validators: {
						common: [
							'data/validators/common-validator.json'
						],
						'existing-strategy': [
							'data/validators/conditional-validator.json'
						]
					}
				},
				'state-without-validators': {
					visible: true
				},
				'hidden-state': null
			};

			beforeEach(function() {
				spyOn(flow, 'getStates').and.returnValue(statesNames);
			});

			it('should return empty array when validators it is not specify', function() {
				// given
				var currentState = 'state-without-validators';

				// when
				var result;
				flow.getValidators(currentState).then(function(value){
					result = value;
				});
				$rootScope.$digest();

				// then
				expect(result).toEqual([]);
			});

			it('should reject when state do not exist', function() {
				// given
				var currentState = 'state-not-exist-validators';

				// when
				var result;
				flow.getValidators(currentState).catch(function(message){
					result = message;
				});
				$rootScope.$digest();

				// then
				expect(result).toEqual(jasmine.any(String));
			});

			it('should load validators config ', function() {
				// given
				var currentState = 'state-with-validators';
				var expectedValidators = [
					{test: 'abc'},
					{name: 'iza'}
				];
				statesNames[currentState].validators.common.forEach(function(url, index){
					$httpBackend.expectGET(url).respond(200, expectedValidators[index]);
				});

				// when
				var result;
				flow.getValidators(currentState).then(function(value){
					result = value;
				});
				$httpBackend.flush();

				// then
				expectedValidators.forEach(function(validator){
					expect(result).toContain(validator);
				});
			});

			it('should not load conditional validator when function returns not existing strategy', function() {
				// given
				var currentState = 'state-with-disabled-validator';
				var disabledValidator = 'data/validators/disabled-validator.json';
				var url = statesNames[currentState].validators['existing-strategy'][0].url;
				$httpBackend.expectGET(url).respond(200, disabledValidator);
				flow.getStrategy = jasmine.createSpy('getStrategy').and.returnValue('not-existing-strategy');

				// when
				var result;
				flow.getValidators(currentState).then(function(value){
					result = value;
				});

				// then
				expect(flow.getStrategy).toHaveBeenCalled();
				expect(result).not.toContain(disabledValidator);
			});

			it('should load conditional validator when function returns existing strategy', function() {
				// given
				var currentState = 'state-with-conditional-validator';
				var conditionalValidator = 'data/validators/conditional-validator.json';
				var url = statesNames[currentState].validators['existing-strategy'][0].url;
				$httpBackend.expectGET(url).respond(200, conditionalValidator);
				flow.getStrategy = jasmine.createSpy('getStrategy').and.returnValue('existing-strategy');

				// when
				var result;
				flow.getValidators(currentState).then(function(value){
					result = value;
				});
				$httpBackend.flush();

				// then
				expect(flow.getStrategy).toHaveBeenCalled();
				expect(result).toContain(conditionalValidator);
			});

			it('should merge common validators with conditionals when function returns existing strategy', function() {
				// given
				var currentState = 'state-with-mixed-validators';
				var commonValidator = 'data/validators/common-validator.json';
				var conditionalValidator = 'data/validators/conditional-validator.json';
				var commonUrl = statesNames[currentState].validators.common[0].url;
				var conditionalUrl = statesNames[currentState].validators['existing-strategy'][0].url;

				$httpBackend.expectGET(commonUrl).respond(200, commonValidator);
				$httpBackend.expectGET(conditionalUrl).respond(200, conditionalValidator);
				flow.getStrategy = jasmine.createSpy('getStrategy').and.returnValue('existing-strategy');

				// when
				var result;
				flow.getValidators(currentState).then(function(value){
					result = value;
				});
				$httpBackend.flush();

				// then
				expect(flow.getStrategy).toHaveBeenCalled();
				expect(result).toContain(commonValidator);
				expect(result).toContain(conditionalValidator);
			});

			it('should get only common validators without conditionals when function returns not existing strategy', function() {
				// given
				var currentState = 'state-with-mixed-validators';
				var commonValidator = 'data/validators/common-validator.json';
				var conditionalValidator = 'data/validators/conditional-validator.json';
				var commonUrl = statesNames[currentState].validators.common[0].url;

				$httpBackend.expectGET(commonUrl).respond(200, commonValidator);
				flow.getStrategy = jasmine.createSpy('getStrategy').and.returnValue('not-existing-strategy');

				// when
				var result;
				flow.getValidators(currentState).then(function(value){
					result = value;
				});
				$httpBackend.flush();

				// then
				expect(flow.getStrategy).toHaveBeenCalled();
				expect(result).toContain(commonValidator);
				expect(result).not.toContain(conditionalValidator);
			});

			it('should throw "getPopulatedStepsSchema method must be implemented" exception', function() {
				// given
				expect(flow.getPopulatedStepsSchema).toThrow(new Error('getPopulatedStepsSchema method must be implemented'));
			});
		});

		describe('getting prev state', function() {
			var flowState = 'fake-flow-state';
			var submitState = 'submit-state';

			var statesNames = {
				'foo-state': {},
				'boo-state': {},
				'submit-state': {},
				'moo-state': {},
				'goo-state': {}
			};

			beforeEach(function() {
				spyOn(flow, 'getStates').and.returnValue(statesNames);
				spyOn(flow, 'getSubmitState').and.returnValue(submitState);
				spyOn(flow, 'getFlowStateName').and.returnValue(flowState);
			});

			it('should not get prev state when current step is one step after submit', function() {
				// given
				var currentState = 'moo-state';

				// when
				var result = flow.getPrevStepState(currentState);

				// then
				expect(result).toBeUndefined();
			});

			it('should not get prev state when current step is two steps after submit', function() {
				// given
				var currentState = 'goo-state';

				// when
				var result = flow.getPrevStepState(currentState);

				// then
				expect(result).toBeUndefined();
			});

			it('should get prev step when current step is submit step', function() {
				// given
				var currentState = 'submit-state';

				// when
				var result = flow.getPrevStepState(currentState);

				// then
				expect(result).toEqual('fake-flow-state.boo-state');
			});

			it('should get prev foo-state step when current step is child of boo-state', function() {
				// given
				var stateName = 'child-state';
				spyOn($state, 'get').and.returnValue({
					parent: 'fake-flow-state.boo-state'
				});

				// when
				var result = flow.getPrevStepState(stateName);

				// then
				expect(result).toEqual('fake-flow-state.foo-state');
			});

			it('should not get prev step when current step is child of goo-state', function() {
				// given
				var stateName = 'child-state';
				spyOn($state, 'get').and.returnValue({
					parent: 'fake-flow-state.goo-state'
				});

				// when
				var result = flow.getPrevStepState(stateName);

				// then
				expect(result).toBeUndefined();
			});
		});

		describe('abstract methods', function() {
			var methods = [
				'start',
				'resume',
				'persist',
				'cancel',
				'isValid'
			];

			methods.forEach(function(method) {
				it('should throw error for not implemented "' + method + '" method', function() {
					expect(flow[method]).toThrow();
				});
			});
		});

	});
});
