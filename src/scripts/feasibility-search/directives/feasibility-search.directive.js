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

            scope.searchAddressFeasibility = function() {
                scope.onSearch({$result: scope.model});
            };

            scope.$watch('masterData', function(newVal) {
                //scope.localities = feasibilitySearchService.getLocalities(masterData);
                //scope.subLocalities = feasibilitySearchService.getSubLocalities(masterData);
                //scope.streets = feasibilitySearchService.getStreets(masterData);
            }, true);
        },
        controller: 'feasibilitySearchCtrl',
        templateUrl: 'views/feasibility-search.tpl'
    };
});
