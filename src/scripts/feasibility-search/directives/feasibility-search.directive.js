'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Directives.FeasibilitySearch', [
    'TT-UI-CLM.FeasibilitySearch.Controllers.FeasibilitySearchCtrl',
    'TT-UI-CLM.FeasibilitySearch.Services.FeasibilitySearchService',
    'ui.select',
    'ngSanitize'
]);

module.directive('feasibilitySearch', function() {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            // config: '=',
            masterData: '=',
            // permissions: '=',
            onSearch: '&'
        },
        controller: 'FeasibilitySearchCtrl',
        templateUrl: 'scripts/feasibility-search/views/feasibility-search.tpl.html'
    };
});
