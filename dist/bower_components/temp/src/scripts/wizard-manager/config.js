	'use strict';

var module = angular.module('TT-UI.WizardManager.Config', []);

function FLOW_MANAGER_CONFIG() {
	return {
		MAIN_STATE: 'index',
		WIZARD_STATE: 'flow-manager',

		STEP_VALID_STATUS_EVENT: 'stepValidStatus',

		STEP_CHANGE_START: 'flowStepChangeStart',
		STEP_CHANGE_END: 'flowStepChangeEnd',

		STEP_COLLECT_DATA_EVENT: 'stepCollectData',

		PREV_STEP_ACTION: 'prevStepAction',
		NEXT_STEP_ACTION: 'nextStepAction',
		SUBMIT_FLOW_ACTION: 'submitFlowAction',
		PERSIST_FLOW_ACTION: 'persistFlowAction',
		CANCEL_FLOW_ACTION: 'cancelFlowAction',
		FINISH_FLOW_ACTION: 'finishFlowAction',

		BASE_URL: 'scripts/wizard-manager/' // Slash at the end
	};
}

module.constant('FLOW_MANAGER_CONFIG', FLOW_MANAGER_CONFIG());
