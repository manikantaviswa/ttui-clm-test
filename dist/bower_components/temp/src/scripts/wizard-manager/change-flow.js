'use strict';

var module = angular.module('TT-UI.WizardManager.ChangeFlow', [
	'TT-UI.WizardManager.Config',
	'TT-UI.WizardManager.Services.FlowManager'
]);

function changeFlow($rootScope, FlowManager, FLOW_MANAGER_CONFIG) {
	$rootScope.$on('$stateChangeStart', FlowManager.setCurrentFlowListener);
	$rootScope.$on('$stateChangeSuccess', FlowManager.redirectToFirstStep);
	$rootScope.$on(FLOW_MANAGER_CONFIG.STEP_VALID_STATUS_EVENT, FlowManager.setCurrentStateValidity);
}
changeFlow.$inject = ['$rootScope', 'FlowManager', 'FLOW_MANAGER_CONFIG'];
module.run(changeFlow);
