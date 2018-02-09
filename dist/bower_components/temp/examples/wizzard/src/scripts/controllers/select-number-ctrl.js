'use strict';

var module = angular.module('TT-APP.Controllers.SelectNumber', [
	'TT-UI.WizardManager'
]);

function stateConfigFn(StepsManagerProvider, CONFIG) {
	var moduleViewUrl = CONFIG.BASE_URL + 'views/';

	StepsManagerProvider.addStep('select-a-number', {
		url: 'select-number/',
		label: 'Select Number',
		views: {
			'step-content@flow': {
				controller: 'SelectNumberCtrl as selectNumber',
				templateUrl: moduleViewUrl + 'select-number.tpl.html'
			}
		}
	});
}

stateConfigFn.$inject = ['StepsManagerProvider', 'CONFIG'];
module.config(stateConfigFn);

function SelectNumberCtrl($scope, $rootScope, FLOW_MANAGER_CONFIG) {
	this.formModel = {};

	this.formValidityStatusChange = function(isValid) {
		$rootScope.$emit(FLOW_MANAGER_CONFIG.STEP_VALID_STATUS_EVENT, isValid);
	};

	this.triggerFormValidation = function() {
		this.form.$commitViewValue();
		this.form.$setSubmitted();
	};

	var bound = $rootScope.$on(FLOW_MANAGER_CONFIG.STEP_CHANGE_START, this.triggerFormValidation.bind(this));
	$scope.$on('$destroy', bound);
}

SelectNumberCtrl.$inject = ['$scope', '$rootScope', 'FLOW_MANAGER_CONFIG'];
module.controller(SelectNumberCtrl.name, SelectNumberCtrl);
