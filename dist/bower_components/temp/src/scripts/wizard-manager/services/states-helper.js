'use strict';

var module = angular.module('TT-UI.WizardManager.Services.StatesHelper', [
	'ui.router'
]);

function StatesHelperProvider() {
	var flowViewportRegExp = /^([^@]+)@flow$/;
	var stateWithParentRegExp = /([^\.]+)\.[^\.]+$/;

	function getStateNameAtView(flowManagerStateName, viewName) {
		if (viewName.match(flowViewportRegExp)) {
			return viewName.replace(flowViewportRegExp, '$1@' + flowManagerStateName);
		}

		return viewName;
	}

	function setStateNameAtViews(flowManagerStateName, views) {
		var view;

		Object.keys(views).forEach(function(viewName) {
			view = views[viewName];

			delete views[viewName];

			views[getStateNameAtView(flowManagerStateName, viewName)] = view;
		});
	}

	this.setStateNameAtViews = setStateNameAtViews;

	function StatesHelper($state) {
		function stateBelongsToFlow(stateName, wizardStateName) {
			var hasParentState = stateName.match(stateWithParentRegExp);
			var flowStateName = hasParentState ? hasParentState.pop() : stateName;
			var flowState = $state.get(flowStateName);

			if (!flowState || !flowState.parent || flowState.parent !== wizardStateName) {
				return;
			}

			return flowState.name;
		}

		return {
			stateBelongsToFlow: stateBelongsToFlow
		};
	}
	StatesHelper.$inject = ['$state'];
	this.$get = StatesHelper;
}

module.provider('StatesHelper', StatesHelperProvider);
