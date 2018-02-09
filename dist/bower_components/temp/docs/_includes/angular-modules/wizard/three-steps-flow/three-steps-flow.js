(function(angular) {
	'use strict';

	var module = angular.module('TT-APP.Services.Flows.ThreeStepsFlow', [
		'TT-UI.WizardManager',
		'TT-UI.WizardManager.Tpl',
		'TT-UI.Common.Directives.Spinner'
	]);

	function flowConfig(FlowManagerProvider,CONFIG) {
		var moduleViewUrl = CONFIG.BASE_URL + 'views/';

		FlowManagerProvider.registerFlow('ThreeStepsFlow', {
			service: 'ThreeStepsFlowFactory',
			state: 'three-steps-flow',
			url: 'three-steps-flow/',
			label: 'three steps flow',
			entryState: 'profile',
			exitState: 'three-steps-flow',
			stepsStates: {
				profile: {
					visible: true,
					nextActions: ['isCurrentStepValid']
				},
				'select-a-number': {
					visible: true,
					nextActions: []
				},
				'the-review': {
					visible: true,
					nextActions: ['submit']
				},
			},
			views: {
				'step-aside@flow': {
					templateUrl: moduleViewUrl + 'common-aside.tpl.html'
				}
			}
		});
	}
	flowConfig.$inject = ['FlowManagerProvider', 'CONFIG'];
	module.config(flowConfig);

	function ThreeStepsFlowFactory(WizardFlow, $q, $log, $rootScope, ConfirmationDialog) {

		function ThreeStepsFlow() {
			WizardFlow.apply(this, arguments);
		}

		ThreeStepsFlow.prototype = Object.create(WizardFlow.prototype);
		ThreeStepsFlow.prototype.constructor = ThreeStepsFlow;

		ThreeStepsFlow.prototype.submit = function() {

			console.log("Implement submitting here");

		};

		ThreeStepsFlow.prototype.persist = function(payload) {

			console.log("Implement persisting here");
			
		};

		ThreeStepsFlow.prototype.store = function(payload) {

			console.log("Implement storing here");
			
		};

		ThreeStepsFlow.prototype.isValid = function() {
			return true;
		};

		ThreeStepsFlow.prototype.getSubmitState = function() {
			return 'the-review';
		};

		return ThreeStepsFlow;
	}
	ThreeStepsFlowFactory.$inject = ['WizardFlow', '$q', '$log', '$rootScope', 'ConfirmationDialog'];
	module.factory(ThreeStepsFlowFactory.name, ThreeStepsFlowFactory);
})(window.angular);