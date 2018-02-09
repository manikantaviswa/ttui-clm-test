describe('Wizard Manager: StatesHelper', function() {
	'use strict';

	var $state;
	var StatesHelperProvider;
	var StatesHelper;

	beforeEach(angular.mock.module('TT-UI.WizardManager.Services.StatesHelper', function($injector) {
		StatesHelperProvider = $injector.get('StatesHelperProvider');
	}));
	beforeEach(angular.mock.inject(function($injector) {
		$state = $injector.get('$state');
		StatesHelper = $injector.get('StatesHelper');
	}));

	it('should check if provider exists', function() {
		expect(StatesHelperProvider).toEqual(jasmine.any(Object));
	});

	it('should set proper manager state name on flow view', function() {
		// given
		var fakeFlow = 'foo-manager-state';
		var views = {
			'flow-view-name@flow': {},
			'not-flow-view-name@': {},
			'modal@some-state': {}
		};

		// when
		StatesHelperProvider.setStateNameAtViews(fakeFlow, views);

		// then
		expect(views['flow-view-name@foo-manager-state']).toBeDefined();
		expect(views['flow-view-name@flow']).not.toBeDefined();
		expect(views['not-flow-view-name@']).toBeDefined();
		expect(views['modal@some-state']).toBeDefined();
	});

	it('should expose stateBelongsToFlow function', function() {
		expect(StatesHelper.stateBelongsToFlow).toEqual(jasmine.any(Function));
	});

	it('should check if given root flow state belongs to wizard flow state and return flow state', function() {
		// given
		var stateName = 'flow-state-name';
		var wizardStateName = 'fake-wizard-state-name';

		var fakeState = {
			name: stateName,
			parent: wizardStateName
		};
		spyOn($state, 'get').and.callFake(function(state) {
			return state === stateName ? fakeState : null;
		});

		// when
		var results = StatesHelper.stateBelongsToFlow(stateName, wizardStateName);

		// then
		expect(results).toEqual('flow-state-name');
	});

	it('should check if given flow state belongs to wizard flow state and return flow state', function() {
		// given
		var flowStateName = 'flow-state-name';
		var stateName = flowStateName+'.flow-state-name';
		var wizardStateName = 'fake-wizard-state-name';

		var fakeState = {
			name: flowStateName,
			parent: wizardStateName
		};
		spyOn($state, 'get').and.callFake(function(state) {
			return state === flowStateName ? fakeState : null;
		});

		// when
		var results = StatesHelper.stateBelongsToFlow(stateName, wizardStateName);

		// then
		expect(results).toEqual('flow-state-name');
	});

	it('should check if given invalid flow state do not belongs to wizard flow state', function() {
		// given
		var flowStateName = 'flow-state-name';
		var stateName = flowStateName+'.flow-state-name';
		var wizardStateName = 'fake-wizard-state-name';

		spyOn($state, 'get').and.returnValue(null);

		// when
		var results = StatesHelper.stateBelongsToFlow(stateName, wizardStateName);

		// then
		expect(results).not.toEqual('flow-state-name');
	});
});