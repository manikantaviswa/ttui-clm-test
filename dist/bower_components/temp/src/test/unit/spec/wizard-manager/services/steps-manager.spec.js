'use strict';

describe('Wizard Manager: StepsManagerProvider', function() {
	var $stateProvider;
	var FlowManagerProvider;
	var StepsManagerProvider;
	var FLOW_MANAGER_CONFIG;
	var fakeFlows = [];
	var StepsManager;

	beforeEach(angular.mock.module('TT-UI.WizardManager.Services.StepsManager', function($injector) {
		$stateProvider = $injector.get('$stateProvider');
		FlowManagerProvider = $injector.get('FlowManagerProvider');
		StepsManagerProvider = $injector.get('StepsManagerProvider');
		FLOW_MANAGER_CONFIG = $injector.get('FLOW_MANAGER_CONFIG');

		FLOW_MANAGER_CONFIG.WIZARD_STATE = 'foo-manager-state';

		spyOn($stateProvider, 'state');
		spyOn(FlowManagerProvider, 'getFlows').and.returnValue(fakeFlows);
	}));

	beforeEach(angular.mock.inject(function($injector) {
		StepsManager = $injector.get('StepsManager');
	}));

	afterEach(function() {
		fakeFlows.length = 0;
	});

	it('should check if module exists', function() {
		expect(StepsManagerProvider).toEqual(jasmine.any(Object));
	});

	describe('RegisterStepProvider', function() {
		it('should register a basic step', function() {
			// given
			var barStep = {
				name: 'bar-state'
			};

			var fooBarStepName = 'foo-bar-state';
			var fooBarStep = {};

			fakeFlows.push({
				state: 'foo-state',
				stepsStates: {
					'bar-state': true,
					'foo-bar-state': true
				}
			});

			// when
			StepsManagerProvider.addStep(barStep);
			StepsManagerProvider.addStep(fooBarStepName, fooBarStep);
			StepsManager.registerFlowsSteps();

			// then
			expect($stateProvider.state).toHaveBeenCalledWith('foo-state.bar-state', jasmine.any(Object));
		});


		it('should register a step using name', function() {
			// given
			var stepName = 'goo-state';
			var step = {};

			var steps = {};
			steps[stepName] = true;

			var flowState = 'hoo-state';

			fakeFlows.push({
				state: flowState,
				stepsStates: steps
			});

			// when
			StepsManagerProvider.addStep(stepName, step);
			StepsManager.registerFlowsSteps();

			// then
			expect($stateProvider.state).toHaveBeenCalledWith(
				[flowState, stepName].join('.'),
				jasmine.any(Object)
			);
		});

		it('should set proper manager state name on step view', function() {
			// given
			var stepName = 'goo-state';
			var step = {
				views: {
					'view-name@flow': {}
				}
			};

			var steps = {};
			steps[stepName] = true;

			var flowState = 'hoo-state';

			fakeFlows.push({
				state: flowState,
				stepsStates: steps
			});

			// when
			StepsManagerProvider.addStep(stepName, step);
			StepsManager.registerFlowsSteps();

			// then
			var stateArg = $stateProvider.state.calls.mostRecent().args[1];
			expect(stateArg.views['view-name@foo-manager-state']).toBeDefined();
		});

		it('should not register a step when it is not used by any flow', function() {
			// given
			var stepName = 'goo-state';
			var step = {};

			var steps = {};

			var flowState = 'hoo-state';

			fakeFlows.push({
				state: flowState,
				stepsStates: steps
			});

			// when
			StepsManagerProvider.addStep(stepName, step);
			StepsManager.registerFlowsSteps();

			// then
			expect($stateProvider.state).not.toHaveBeenCalled();
		});

		it('should throw error when trying to register two steps by same name', function() {
			// given
			var stepName = 'foo-bar-step';
			var step1 = {
				name: stepName
			};
			var step2 = {};

			// when
			var tesFn = function () {
				StepsManagerProvider.addStep(step1);
				StepsManagerProvider.addStep(stepName, step2);
			};

			// then
			expect(tesFn).toThrowError('Wizard Manager: given step name is already registerd "foo-bar-step"');
		});

		it('should throw error when trying to use not registered step', function() {
			// given
			var stepName = 'foo-bar-step';
			var stepsStates = {};
			stepsStates[stepName] = {};

			fakeFlows.push({
				state: 'foo-flow-state',
				stepsStates: stepsStates
			});

			// when
			var tesFn = function () {
				StepsManager.registerFlowsSteps();
			};

			// then
			expect(tesFn).toThrowError('Wizard Manager: given step name is not registerd "foo-bar-step"');
		});
	});
});
