'use strict';

var module = angular.module('TT-UI.HierarchyTree.Directives.HierarchyTreeNodes', [
]);

module.directive('hierarchyTreeNodes', [function () {
    return {
        require: ['ngModel', '?^hierarchyTreeNode', '^hierarchyTree'],
        restrict: 'EA',
        scope: true,
        controller: 'HierarchyTreeNodesController',
        link: function (scope, element, attrs, controllersArr) {

            var ngModel = controllersArr[0],
                treeNodeCtrl = controllersArr[1],
                treeCtrl = controllersArr[2];

            if (treeNodeCtrl) {
                treeNodeCtrl.scope.$childNodesScope = scope;
                scope.$nodeScope = treeNodeCtrl.scope;
            } else {
                // find the root nodes if there is no parent node and have a parent tree
                treeCtrl.scope.$nodesScope = scope;
            }
            scope.$treeScope = treeCtrl.scope;

            if (ngModel) {
                ngModel.$render = function () {
                    if (!angular.isArray(ngModel.$modelValue)) {
                        scope.$modelValue = [];
                    }
                    scope.$modelValue = ngModel.$modelValue;
                };
            }
        }
    };
}]);
