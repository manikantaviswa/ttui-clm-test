'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Directives', [
    'TT-UI-CLM.FeasibilitySearch.views',
    'ui.select'
]);

module.directive('feasibilitySearch', function($log) {
    return {
        restrict: 'EA',
        scope: {},
        link: function(scope, ele, attrs) {
            $log.info('msg from directive', ele, attrs);
        },
        templateUrl: 'views/feasibility-search.tpl'
    };
});