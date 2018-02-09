'use strict';

var module = angular.module('TT-UI.HierarchyTree.Controllers.HierarchyTreeNodeController', [
]);

function HierarchyTreeNodeController($scope, $element, $timeout, $filter) {
    this.scope = $scope;
    $scope.$element = $element;
    $scope.$modelValue = null; // Model value for node
    $scope.$parentNodeScope = null; // HierarchyTreeNode Scope of parent node
    $scope.$childNodesScope = null; // HierarchyTreeNodes Scope of child nodes
    $scope.$parentNodesScope = null; // HierarchyTreeNodes Scope of parent nodes
    $scope.$treeScope = null; // HierarchyTree scope
    $scope.$type = 'TreeNode';
    $scope.$$apply = false;

    $scope.collapsed = false;
    $scope.selected = false;
    $scope.hovered = false;
    $scope.iconHovered = false;
    $scope.status = 0;

    $scope.init = function (controllersArr) {
        var treeNodesCtrl = controllersArr[0];
        $scope.$treeScope = controllersArr[1] ? controllersArr[1].scope : null;

        // find the scope of it's parent node
        $scope.$parentNodeScope = treeNodesCtrl.scope.$nodeScope;
        // modelValue for current node
        if (treeNodesCtrl.scope.$modelValue !== null) { // ignore root node
            
            $scope.$modelValue = treeNodesCtrl.scope.$modelValue[$scope.$index];

            // set initial values from model
            if ($scope.$modelValue) {
                $scope.selected = $scope.$modelValue.selected;
                $scope.collapsed = $scope.$modelValue.collapsed;
                $scope.status = $scope.$modelValue.status;
                //  initialize other values here
            }
        }
        else { // add $rootnode to tree scope
            $scope.$treeScope.$rootNode = $scope;
            $scope.$modelValue = null; // root model value to null, for now
        }
        $scope.$parentNodesScope = treeNodesCtrl.scope;
        treeNodesCtrl.initSubNode($scope); // init sub nodes

        $element.on('$destroy', function () {
            treeNodesCtrl.destroySubNode($scope); // destroy sub nodes
        });
    };

    $scope.index = function () {
        return $scope.$parentNodesScope.$modelValue.indexOf($scope.$modelValue);
    };

    $scope.isSibling = function (targetNode) {
        return angular.equals($scope.$parentNodesScope, targetNode.$parentNodesScope);
    };

    $scope.isChild = function (targetNode) {
        var nodes = $scope.childNodes();
        return nodes && nodes.indexOf(targetNode) > -1;
    };

    $scope.root = function () {
        if ($scope.$treeScope.$options.showRoot === true) {
            return false;
        }
        return $scope.$treeScope.$rootNode === null;
    };

    $scope.prev = function () {
        var index = $scope.index();
        if (index > 0) {
            return $scope.siblings()[index - 1];
        }
        return null;
    };

    $scope.siblings = function () {
        return $scope.$parentNodesScope.childNodes();
    };

    $scope.childNodesCount = function () {
        return $scope.childNodes() ? $scope.childNodes().length : 0;
    };

    $scope.hasChild = function () {
        return $scope.childNodesCount() > 0;
    };

    var getNodeStatus = function(model) {
        var total = 0;
        total += ($filter('filter')(model.nodes, {status: 0})).length;

        if (total > 0) {
            model.status = 0;
        } else {
            model.status = 1;
        }

        return total;
    };

    var nodeStatusCount = 0;
    $scope.nodeStatus = function() {
        nodeStatusCount = 0;
        // 1 = OK
        // != 1 = NOK
        nodeStatusCount += getNodeStatus($scope.$modelValue);
        return nodeStatusCount === 0;
    };

    $scope.childNodes = function () {
        return $scope.$childNodesScope && $scope.$childNodesScope.$modelValue ?
            $scope.$childNodesScope.childNodes() : null;
    };

    $scope.removeNode = function () {
        var node = $scope.remove();
        return node;
    };

    var selectPrev = function () {
        var prev = $scope.prev();
        if (prev) {
            prev.selected = true;
            prev.$modelValue.selected = prev.selected;
        } else { // outside scope
            if ($scope.$nodeScope) {
                prev = $scope.$nodeScope;
                $scope.$nodeScope.selected = true;
                $scope.$nodeScope.$modelValue.selected = true;
            } else { // root
                prev = $scope.$treeScope.$rootNode;
                $scope.$treeScope.$rootNode.selected = true;
            }
        }
        $scope.$treeScope.$callbacks.selectedAction(prev);
    };

    $scope.remove = function () {
        // TODO: OK this from Maria
        if ($scope.$treeScope.$options.selectPrevious) {
            selectPrev();
        }
        $scope.$treeScope.$callbacks.removedAction($scope);
        return $scope.$parentNodesScope.removeNode($scope);
    };

    $scope.removeWithTimeout = function () {
        $scope.selected = false;
        $timeout(function () { $scope.removeNode(); }, 70);
    };

    $scope.toggle = function () {
        $scope.collapsed = !$scope.collapsed;
    };

    $scope.collapse = function () {
        $scope.collapsed = true;
    };

    $scope.expand = function () {
        $scope.collapsed = false;
    };

    $scope.hover = function (hover) {
        $scope.hovered = hover;
    };

    $scope.iconHover = function (hover) {
        $scope.iconHovered = hover;
    };

    $scope.readonly = function () {
        return $scope.$treeScope.$options.readonly;
    };

    // keep fast/simple
    $scope.visible = function (item) {
        if ($scope.$treeScope.$treeFilter && $scope.$treeScope.$treeFilter.length > 0) {
            return item.title.lastIndexOf($scope.$treeScope.$treeFilter) >= 0;
        }
        return true;
    };

    $scope.unSelect = function () {
        $scope.selected = false;
        if ($scope.$modelValue) {
            // update model
            $scope.$modelValue.selected = false;
        }
    };

    $scope.selectItem = function () {
        // clear all selections
        if ($scope.$treeScope) {
            $scope.$treeScope.clearAll();
        }
        // and then select one
        $scope.selected = true;
        if ($scope.$modelValue) {
            // update model
            $scope.$modelValue.selected = $scope.selected;
        }

        // expand on select
        $scope.expand();
        // callback
        $scope.$treeScope.$callbacks.selectedAction($scope);
    };

    $scope.selectRoot = function () {
        // clear all selections
        if ($scope.$treeScope) {
            $scope.$treeScope.clearAll();
        }
        // and then select root
        $scope.selected = true;
        // callback
        $scope.$treeScope.$callbacks.rootSelectedAction($scope);
    };

    $scope.newSubItem = function (scope, params) {
        $scope.$treeScope.$callbacks.newSubItemAction($scope, params);
    };

    $scope.footerButton = function (params) {
        $scope.$treeScope.$callbacks.footerButtonAction(params);
    };

    $scope.maxDepth = function () {
        var maxDepth = parseInt($scope.$treeScope.$options.maxDepth, 10);
        if (maxDepth === 0) {
            return true;
        }
        return $scope.depth() < maxDepth;
    };

    $scope.depth = function () {
        var parentNode = $scope.$parentNodeScope;
        if (parentNode) {
            return parentNode.depth() + 1;
        }
        return 1;
    };

    var subDepth = 0;
    function countSubDepth(scope) {
        var i, childNodes, count = 0,
            nodes = scope.childNodes();

        for (i = 0; i < nodes.length; i++) {
            childNodes = nodes[i].$childNodesScope;

            if (childNodes && childNodes.childNodesCount() > 0) {
                count = 1;
                countSubDepth(childNodes);
            }
        }
        subDepth += count;
    }

    $scope.maxSubDepth = function () {
        subDepth = 0;
        if ($scope.$childNodesScope) {
            countSubDepth($scope.$childNodesScope);
        }
        return subDepth;
    };

    $scope.getIconClasses = function () {
        var out = 'glyphicon glyphicon-ttui ';
        if ($scope.iconHovered) {
            out = out.concat('glyphicon-chevron-circle-right-black ');
        } else {
            out = out.concat('glyphicon-chevron-circle-right ');
        }
        if (!$scope.collapsed && !$scope.iconHovered) {
            out = out.concat('animate ');
        }
        if ($scope.collapsed && $scope.iconHovered) {
            out = out.concat('animate-back ');
        }
        return out;
    };

    $scope.getNodeContentClasses = function() {
        var out = 'tree-node-content ';
        if ($scope.selected) {
            out = out.concat('selected ');
        }
        if (!$scope.hasChild()) {
            out = out.concat('no-children ');
        }
        if ($scope.hovered) {
            out = out.concat('hover ');
        }
        return out;
    };

    $scope.dropCallback = function(event, index, item) {
        $scope.expand();
        return item;
    };

    $scope.dragstartCallback = function(event) {
        var input = event.currentTarget.getElementsByTagName('input')[0].cloneNode(true);
        input.style.border = 'none';

        var title = document.createElement('div');

        title.appendChild(input);

        if ($scope.hasChild()) {
            var ghostCount = document.createElement('div');
            ghostCount.innerText = '(' + countNodes($scope.$modelValue) + ' items)';
            ghostCount.id = 'ghostCount';
            title.appendChild(ghostCount);
        }

        title.style.position = 'absolute';
        title.style.top = '0px';
        title.style.left = '-1000px';
        title.id = 'draggingImage';
        title.style.background = 'white';
        title.style.border = '1px dashed #ccc';
        title.style.borderRadius = '3px';
        title.style.padding = '5px';

        document.body.appendChild(title);
        event.dataTransfer.setDragImage(title, -15, 15);
        event.dataTransfer.effectAllowed = 'copyMove';
        event.currentTarget.parentElement.style.opacity = 0.5;

        $scope.hover(false);
    };

    $scope.dragendCallback = function(event) {
        event.currentTarget.parentElement.style.opacity = 1;
        event.dataTransfer.clearData();
        document.body.removeChild(document.getElementById('draggingImage'));
    };

    function countNodes(node) {
        var total = 1;
        angular.forEach(node.nodes, function(childNode) {
            var counts = countNodes(childNode);
            total += counts;
        });
        return total;
    }
}

HierarchyTreeNodeController.$inject = ['$scope', '$element', '$timeout', '$filter'];
module.controller('HierarchyTreeNodeController', HierarchyTreeNodeController);
