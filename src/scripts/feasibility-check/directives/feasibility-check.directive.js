'use strict';

var module = angular.module('TT-UI-CLM.FeasibilityCheck.Directives.FeasibilityCheck', [
    'TT-UI-CLM.FeasibilityCheck.Controllers.FeasibilityCheckCtrl',
    'TT-UI-CLM.FeasibilityCheck.Services.FeasibilityCheckService',
    'TT-UI-CLM.FeasibilityCheck.Tpl',
    'ui.select',
    'ngSanitize'
]);

module.directive('feasibilityCheck', function() {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            config: '=',
            masterData: '=',
            onCheck: '&'
        },
        controller: 'FeasibilityCheckCtrl',
        templateUrl: 'scripts/feasibility-check/views/feasibility-check.tpl.html'
    };
});
