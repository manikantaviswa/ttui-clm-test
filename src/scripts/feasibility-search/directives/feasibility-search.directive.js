'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Directives', [
    'TT-UI-CLM.FeasibilitySearch.Views',
    'ui.select',
    'ngSanitize'
]);

module.directive('feasibilitySearch', function($log) {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            config: '=',
            masterData: '=',
            permissions: '=',

            onSearch: '&'
        },
        link: function(scope, ele, attrs) {
            $log.info('msg from directive', scope);

            scope.searchAddressFeasibility = function() {
                scope.onSearch({$result: scope.model});
            };
        },
        templateUrl: 'views/feasibility-search.tpl'
    };
});
