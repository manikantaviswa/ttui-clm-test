'use strict';

angular.module('TT-UI.WizardManager', [
	'TT-UI.WizardManager.Config',
	'TT-UI.WizardManager.ChangeFlow',
	'TT-UI.WizardManager.Controllers.StepCtrl',
	'TT-UI.WizardManager.Controllers.Wizard',
	'TT-UI.WizardManager.Services.FlowManager',
	'TT-UI.WizardManager.Services.WizardFlow',
	'TT-UI.WizardManager.Services.StepsManager',
	'TT-UI.WizardManager.Services.StatesHelper',
	'TT-UI.WizardManager.Directives.ValidityChange',
	'TT-UI.WizardManager.Directives.Wizard'
]);
