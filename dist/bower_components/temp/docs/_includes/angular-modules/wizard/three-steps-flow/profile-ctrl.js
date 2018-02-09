(function(angular) {
	'use strict';

	var module = angular.module('TT-APP.Controllers.Profile', [
		'TT-UI.WizardManager'
	]);

	function stateConfigFn(StepsManagerProvider, CONFIG) {
		var moduleViewUrl = CONFIG.BASE_URL + '/views/';

		StepsManagerProvider.addStep('profile', {
			url: 'profile/',
			label: 'Profile',
			views: {
				'step-content@flow': {
					controller: 'ProfileCtrl as profile',
					templateUrl: moduleViewUrl + 'profile.tpl.html'
				},
				'step-aside@flow': {
					templateUrl: moduleViewUrl + 'profile-aside.tpl.html'
				}
			}
		});
	}
	stateConfigFn.$inject = ['StepsManagerProvider', 'CONFIG'];
	module.config(stateConfigFn);

	function ProfileCtrl($scope, $rootScope, FLOW_MANAGER_CONFIG) {
		this.formModel = {
			surname: 'Doe',
			testField: 'foo-bar'
		};

		this.formValidityStatusChange = function(isValid) {
			var error = 'Customer profile form is invalid';

			$rootScope.$emit(FLOW_MANAGER_CONFIG.STEP_VALID_STATUS_EVENT, isValid, error);
		};

		this.triggerFormValidation = function() {
			this.form.$commitViewValue();
			this.form.$setSubmitted();
		};

		var bound = $rootScope.$on(FLOW_MANAGER_CONFIG.STEP_CHANGE_START, this.triggerFormValidation.bind(this));
		$scope.$on('$destroy', bound);
	}
	ProfileCtrl.$inject = ['$scope', '$rootScope', 'FLOW_MANAGER_CONFIG'];
	module.controller(ProfileCtrl.name, ProfileCtrl);
})(window.angular);