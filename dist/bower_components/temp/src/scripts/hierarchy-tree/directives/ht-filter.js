'use strict';
// will be removed if not deeded
var module = angular.module('TT-UI.HierarchyTree.Directives.HierarchyTreeFilter', [
]);

module.directive('hierarchyTreeFilter', [function () {
    return {
        restrict: 'E',
        require: ['^hierarchyTree'],
        scope: {
            placeholder: '@',
            filter: '=?'
        },
        transclude: false,
        template: '<input type="text" class="form-control" placeholder="{{placeholder}}" ng-model="filter" ng-change="find();"><hr>',
        link: function (scope, element, attrs, treeCtrl) {
            // update filter
            scope.find = function () {
                treeCtrl[0].scope.$treeFilter = scope.filter;
            };
        }
    };
}]);