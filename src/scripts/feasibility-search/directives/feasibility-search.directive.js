'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Directives', [
    'ui.select'
]);

module.directive('feasibilitySearch', function($log) {
    return {
        restrict: 'E',
        scope: {},
        link: function(scope, ele, attrs) {
            $log.info('msg from directive', ele, attrs);
        },
        templateUrl: 'views/feasibility-search.tpl'
    };
});
