'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Directives', [
    'TT-UI-CLM.FeasibilitySearch.Views',
    'TT-UI-CLM.FeasibilitySearch.Controllers',
    'TT-UI-CLM.FeasibilitySearch.Services',
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
        link: function(scope, ele, attrs) {
        },
        controller: 'feasibilitySearchCtrl',
        templateUrl: 'views/feasibility-search.tpl'
    };
});
