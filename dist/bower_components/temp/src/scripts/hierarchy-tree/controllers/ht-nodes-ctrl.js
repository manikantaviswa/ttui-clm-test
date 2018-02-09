'use strict';

var module = angular.module('TT-UI.HierarchyTree.Controllers.HierarchyTreeNodesController', [
]);

function HierarchyTreeNodesController($scope) {
    this.scope = $scope;
    $scope.$modelValue = null;
    $scope.$nodeScope = null; // the scope of node which the nodes belongs to
    $scope.$treeScope = null;
    $scope.$type = 'TreeNodes';
    $scope.$nodesMap = {};

    this.initSubNode = function (subNode) {
        if (!subNode.$modelValue) {
            return null;
        }
        $scope.$nodesMap[subNode.$modelValue.$$hashKey] = subNode;
    };

    this.destroySubNode = function (subNode) {
        if (!subNode.$modelValue) {
            return null;
        }
        $scope.$nodesMap[subNode.$modelValue.$$hashKey] = null;
    };

    $scope.isParent = function (node) {
        return angular.equals(node.$parentNodesScope, $scope);
    };

    $scope.hasChild = function () {
        return $scope.$modelValue.length > 0;
    };

    $scope.noRootChildren = function (node) {
        var index = $scope.$treeScope.model.indexOf(node.$modelValue);
        if (index > -1) {
            var found = $scope.$treeScope.model[index];
            return found.nodes.length === 0;
        }
        return false;
    };

    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.removeNode = function (node) {
        var index = $scope.$modelValue.indexOf(node.$modelValue);
        if (index > -1) {
            $scope.safeApply(function () {
                $scope.$modelValue.splice(index, 1)[0];
            });
            return node;
        }
        return null;
    };

    $scope.insertNode = function (index, nodeData) {
        $scope.safeApply(function () {
            $scope.$modelValue.splice(index, 0, nodeData);
        });
    };

    $scope.childNodes = function () {
        var i, nodes = [];
        if ($scope.$modelValue) {
            for (i = 0; i < $scope.$modelValue.length; i++) {
                nodes.push($scope.$nodesMap[$scope.$modelValue[i].$$hashKey]);
            }
        }
        return nodes;
    };

    $scope.depth = function () {
        if ($scope.$nodeScope) {
            return $scope.$nodeScope.depth();
        }
        return 0; // if it has no $nodeScope, it's root
    };

    // check if depth limit has reached
    $scope.outOfDepth = function (sourceNode) {
        var maxDepth = $scope.$treeScope.$options.maxDepth;
        if (maxDepth > 0) {
            return $scope.depth() + sourceNode.maxSubDepth() + 1 > maxDepth;
        }
        return false;
    };

    $scope.dragoverCallback = function (event, index, external, dndType) {
        var isDropOk = $scope.$treeScope.$callbacks.dragoverAction(event, dndType);
        if (isDropOk) {
            // Set placeholder position according to target.
            var placeholder = document.getElementsByClassName('dndPlaceholder')[0];
            // Target element should always be a div element. All nodes elements should have id "{{node.id}}-nodeName or other identifier-{{node.dataType}}".
            var liId = event.target.id.replace(/\-div|\-input|\-span|\-ol|\-button\-div?/, '-li');
            var li = document.getElementById(liId);
            var isCollapsed = li.getElementsByTagName('ol')[0].className.indexOf('collapse') !== -1 ? true : false;
            var nodes = li.getElementsByClassName('tree-node-content');
            var node = nodes[0];
            var firstChild = nodes[1];
            // Hide the placeholder if there is a glitch and we cannot find a good position for it.
            var top = -9999;
            var left = -9999;
            var offset = 5;  // offset to avoid line from going under the background of selected node.
            // Add the node in target root (position doesn't matter)
            if (event.target.nodeName === 'DIV' || event.target.nodeName === 'INPUT') {
                if (firstChild && !isCollapsed) {
                    top = firstChild.offsetTop - offset;
                    left = firstChild.offsetLeft;
                } else {
                    top = node.offsetTop + node.offsetHeight + offset;
                    left = node.offsetLeft;
                }
            } else if (event.target.nodeName === 'LI') {
                // add in list in a certain position
                top = node.offsetTop - offset;
                left = node.offsetLeft - offset;
            }
            placeholder.style.top = top + 'px';
            placeholder.style.left = left + 'px';
            return true;
        }
        return false;
    };

}

HierarchyTreeNodesController.$inject = ['$scope'];
module.controller('HierarchyTreeNodesController', HierarchyTreeNodesController);
