
'use strict';

describe('Wizard Manager: Change Flow', function() {
	var $rootScope;
	var FakeFlowManager;
	var FLOW_MANAGER_CONFIG;

	beforeEach(angular.mock.module('TT-UI.WizardManager.ChangeFlow', function($provide) {
		FakeFlowManager = jasmine.createSpyObj('FlowManager', [
			'setCurrentFlowListener',
			'redirectToFirstStep',
			'setCurrentStateValidity'
		]);

		$provide.value('FlowManager', FakeFlowManager);
	}));

	beforeEach(angular.mock.inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		FLOW_MANAGER_CONFIG = $injector.get('FLOW_MANAGER_CONFIG');
	}));

	it('should check if changing state calls setCurrentFlow ', function() {
		// given, when
		$rootScope.$emit('$stateChangeStart');

		// then
		expect(FakeFlowManager.setCurrentFlowListener).toHaveBeenCalled();
	});

	it('should check if changing state calls redirectToFirstStep', function() {
		// given, when
		$rootScope.$emit('$stateChangeSuccess');

		// then
		expect(FakeFlowManager.redirectToFirstStep).toHaveBeenCalled();
	});

	it('should check if changing state calls redirectToFirstStep', function() {
		// given, when
		$rootScope.$emit(FLOW_MANAGER_CONFIG.STEP_VALID_STATUS_EVENT);

		// then
		expect(FakeFlowManager.setCurrentStateValidity).toHaveBeenCalled();
	});
});
