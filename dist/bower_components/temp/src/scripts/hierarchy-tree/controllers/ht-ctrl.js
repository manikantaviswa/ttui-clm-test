'use strict';

var module = angular.module('TT-UI.HierarchyTree.Controllers.HierarchyTreeController', [
]);

function HierarchyTreeController($scope) {
    this.scope = $scope;
    $scope.$nodesScope = null; // root nodes
    $scope.$type = 'Tree';
    $scope.$callbacks = null;
    $scope.$rootNode = null;
    $scope.$treeFilter = null;
    $scope.$options = null;

    // Check if it's a empty tree
    $scope.isEmpty = function() {
        return ($scope.$nodesScope && $scope.$nodesScope.$modelValue &&
            $scope.$nodesScope.$modelValue.length === 0);
    };

    var clearSelections = function(scope) {
        var i, subScope, nodes = scope.childNodes();
        for (i = 0; i < nodes.length; i++) {
            nodes[i].unSelect();
            subScope = nodes[i].$childNodesScope;
            if (subScope) {
                clearSelections(subScope);
            }
        }
        // unselect root node
        if ($scope.$rootNode) {
            $scope.$rootNode.unSelect();
        }
    };

    var collapseOrExpand = function(scope, collapsed) {
        var i, subScope, nodes = scope.childNodes();
        for (i = 0; i < nodes.length; i++) {
            collapsed ? nodes[i].collapse() : nodes[i].expand();
            subScope = nodes[i].$childNodesScope;
            if (subScope) {
                collapseOrExpand(subScope, collapsed);
            }
        }
    };

    $scope.clearAll = function() {
        clearSelections($scope.$nodesScope);
    };

    $scope.collapseAll = function() {
        collapseOrExpand($scope.$nodesScope, true);
    };

    $scope.expandAll = function() {
        collapseOrExpand($scope.$nodesScope, false);
    };

    $scope.$on('hierarchy-tree-collapse-all', function (/*event, args*/) {
        $scope.collapseAll();
    });

    $scope.$on('hierarchy-tree-expand-all', function (/*event, args*/) {
        $scope.expandAll();
    });
}

HierarchyTreeController.$inject = ['$scope'];
module.controller('HierarchyTreeController', HierarchyTreeController);
