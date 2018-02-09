'use strict';

var module = angular.module('TT-UI.HierarchyTree.Directives.HierarchyTreeNode', [
]);

module.directive('hierarchyTreeNode', [function () {
    return {
        require: ['^hierarchyTreeNodes', '^hierarchyTree'],
        restrict: 'A',
        controller: 'HierarchyTreeNodeController',
        link: function (scope, element, attrs, controllersArr) {
            scope.init(controllersArr);
        }
    };
}]);
