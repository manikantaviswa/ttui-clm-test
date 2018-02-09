'use strict';

describe('Wizard Manager: Config', function() {
	var FLOW_MANAGER_CONFIG;

	beforeEach(angular.mock.module('TT-UI.WizardManager.Config'));

	beforeEach(angular.mock.inject(function($injector) {
		FLOW_MANAGER_CONFIG = $injector.get('FLOW_MANAGER_CONFIG');
	}));

	it('should check if const is defined', function() {
		expect(FLOW_MANAGER_CONFIG).toEqual(jasmine.any(Object));
	});

	it('should check if manger state name is valid', function() {
		expect(FLOW_MANAGER_CONFIG.WIZARD_STATE).toEqual('flow-manager');
	});

	it('should check if step validation event name is valid', function() {
		expect(FLOW_MANAGER_CONFIG.STEP_VALID_STATUS_EVENT).toEqual('stepValidStatus');
	});

	it('should check if step validation event name is valid', function() {
		expect(FLOW_MANAGER_CONFIG.STEP_COLLECT_DATA_EVENT).toEqual('stepCollectData');
	});

	it('should check if module base url is valid', function() {
		expect(FLOW_MANAGER_CONFIG.BASE_URL).toEqual('scripts/wizard-manager/');
	});
});