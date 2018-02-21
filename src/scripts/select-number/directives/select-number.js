'use strict';

var module = angular.module('TT-UI-CLM.SelectNumber.Directives.SelectNumberDirective', [
    'TT-UI-CLM.SelectNumber.Controller.SelectNumberController',
    'TT-UI-CLM.SelectNumber.Services.SelectNumberService'
]);

module.directive('selectNumber', function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            // config: '=',
            masterData: '=',
            // permissions: '=',
        },
        controller: 'SelectNumberController',
        templateUrl: 'scripts/select-number/views/select-number-view.tpl.html'
    };
});
