/*! TT-UI Lib 0.6.24.19 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-wizard-manager.tpl';
}

(function (window, angular, undefined) {
	"use strict";

   angular.module('TT-UI.WizardManager.Tpl', []).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/wizard-manager/views/directives/wizard-step.tpl.html',
    "<li class=\"step\" ng-class=\"{'current': isStepSelected(state.name), 'disabled': isStateDisabled(state)}\"><span translate=\"{{::state.label}}\"></span></li>"
  );


  $templateCache.put('scripts/wizard-manager/views/directives/wizard.tpl.html',
    "<div class=\"row wizard-bar\"><div class=\"col-sm-12\"><ol class=\"wizard\" ng-transclude></ol></div></div>"
  );


  $templateCache.put('scripts/wizard-manager/views/wizard.tpl.html',
    "<wizard ng-if=\"wizard.showWizardSteps()\"><wizard-step ng-repeat=\"step in wizard.getWizardSteps() track by step.name\" name=\"{{::step.name}}\" disabled=\"{{!step.enabled}}\"></wizard-step></wizard><div auto-tab-form class=\"row\" ng-class=\"{'has-extended-footer': wizard.isFooterExtended()}\"><div class=\"equal-col\" ng-if=\"!wizard.isFullscreenStep()\"><div class=\"col-md-4\"><ui-view name=\"step-aside\"></ui-view></div><div class=\"col-md-8 section-main\"><ui-view name=\"step-content\"></ui-view></div></div><div class=\"col-md-12\" ng-if=\"wizard.isFullscreenStep()\"><ui-view name=\"step-content\"></ui-view></div><div class=\"row wizard-nav\"><div class=\"row\"><ui-view name=\"step-footer\"></ui-view></div><div class=\"row\"><div class=\"col-md-4 wizard-nav-inline-block\"><span ng-click=\"wizard.persistFlow()\" ng-if=\"wizard.showPersistButton()\" class=\"btn btn-link btn-lg\" role=\"button\" data-role=\"action\" data-action=\"save\" ng-bind=\"wizard.getActionLabel('Save')\" translate=\"{{ wizard.getActionLabel('Save') }}\"></span> <span class=\"btn btn-link btn-lg\" role=\"button\" data-role=\"action\" data-action=\"cancel\" ng-click=\"wizard.cancelFlow()\" ng-if=\"wizard.showCancelButton()\" ng-bind=\"wizard.getActionLabel('Cancel')\" translate=\"{{ wizard.getActionLabel('Cancel') }}\"></span></div><div class=\"col-md-8 wizard-nav-inline-block\"><button ng-if=\"wizard.showSubmitButton()\" ng-click=\"wizard.submitFlow()\" class=\"btn btn-primary btn-lg pull-right\" type=\"button\" data-role=\"action\" data-action=\"submit\" tabindex=\"1000\" ng-bind=\"wizard.getActionLabel('Submit')\" translate=\"{{ wizard.getActionLabel('Submit') }}\"></button> <button ng-if=\"wizard.hasNextStep() && !wizard.showSubmitButton()\" ng-click=\"wizard.goToNextStep()\" class=\"btn btn-primary btn-lg pull-right\" type=\"button\" data-role=\"action\" data-action=\"next\" tabindex=\"1000\" ng-bind=\"wizard.getActionLabel('Next')\" translate=\"{{ wizard.getActionLabel('Next') }}\"></button> <button ng-if=\"wizard.hasPrevStep()\" ng-click=\"wizard.goToPrevStep()\" class=\"btn btn-primary btn-lg pull-right\" type=\"button\" data-role=\"action\" data-action=\"previous\" tabindex=\"1001\" ng-bind=\"wizard.getActionLabel('Previous')\" translate=\"{{ wizard.getActionLabel('Previous') }}\"></button> <button ng-if=\"!wizard.hasPrevStep() && !wizard.hasNextStep()\" ng-click=\"wizard.finishFlow()\" class=\"btn btn-primary btn-lg pull-right\" type=\"button\" data-role=\"action\" data-action=\"finish\" tabindex=\"1000\" ng-bind=\"wizard.getActionLabel('Done')\" translate=\"{{ wizard.getActionLabel('Done') }}\"></button></div></div></div></div>"
  );

}]);
return angular;
})(window, window.angular);