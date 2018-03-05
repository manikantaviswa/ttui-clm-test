
'use strict';

angular.module('TT-UI-CLM.AutoDebitNew.Directives.AutoDebitNew', [])
    .directive('autoDebitNew', autoDebitNew);

autoDebitNew.$inject = [];

function autoDebitNew() {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            masterCode: '=',
            isFormValid: '=',
            isTitleVisible: '=',
            review: '='
        },
        controller: 'autoDebitNewController',
        templateUrl: 'scripts/auto-debit-new/views/auto-debit-new.tpl.html'

    };
}

