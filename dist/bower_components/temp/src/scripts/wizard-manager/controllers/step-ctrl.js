'use strict';

var module = angular.module('TT-UI.WizardManager.Controllers.StepCtrl', [
	'TT-UI.WizardManager.Config'
]);

function StepCtrl($scope, $rootScope, FLOW_MANAGER_CONFIG) {
	var listeners = [];

	this.on = function(event, listenerFnName){
		listeners.push($rootScope.$on(event, function(){
			if (angular.isFunction(this[listenerFnName])){
				this[listenerFnName].apply(this, arguments);
			}
		}.bind(this)));
	};

	$scope.$on('$destroy', function() {
		listeners.forEach(function(listenerUnbindFn) {
			listenerUnbindFn();
		});
	});

	this.on(FLOW_MANAGER_CONFIG.STEP_COLLECT_DATA_EVENT, 'onCollectData');
	this.on(FLOW_MANAGER_CONFIG.STEP_CHANGE_START, 'onStepChangeStart');
	this.on(FLOW_MANAGER_CONFIG.STEP_CHANGE_END, 'onStepChangeEnd');

	this.formValidityStatusChange = function(isValid, errors) {
		$rootScope.$emit(FLOW_MANAGER_CONFIG.STEP_VALID_STATUS_EVENT, isValid, errors);
	};

	/**
	 * @param {object} event
	 * @param {object} storage - extend this object to populate data
	 */
	this.onCollectData  = function(){};

	/**
	 * @param {object} event
	 */
	this.onStepChangeEnd  = function(){};

	/**
	 * @param {object} event
	 */
	this.onStepChangeStart  = function(){};
}


function stepCtrlFn() {
	return StepCtrl;
}
module.factory('stepCtrlFn', stepCtrlFn);