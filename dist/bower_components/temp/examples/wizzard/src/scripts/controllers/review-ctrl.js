'use strict';

var module = angular.module('TT-APP.Controllers.Review', [
	'TT-UI.WizardManager'
]);

function stateConfigFn(StepsManagerProvider, CONFIG) {
	var moduleViewUrl = CONFIG.BASE_URL + 'views/';

	StepsManagerProvider.addStep('the-review', {
		url: 'review/',
		label: 'Review',
		views: {
			'step-content@flow': {
				controller: 'ReviewCtrl as review',
				templateUrl: moduleViewUrl + 'review.tpl.html'
			}
		}
	});
}
stateConfigFn.$inject = ['StepsManagerProvider', 'CONFIG'];
module.config(stateConfigFn);

function ReviewCtrl($rootScope, FLOW_MANAGER_CONFIG) {
	$rootScope.$emit(FLOW_MANAGER_CONFIG.STEP_VALID_STATUS_EVENT, true);
}

ReviewCtrl.$inject = ['$rootScope', 'FLOW_MANAGER_CONFIG'];
module.controller(ReviewCtrl.name, ReviewCtrl);
