/*! TT-UI Lib 0.6.24.19 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-hierarchy-tree';
}

(function (window, angular, undefined) {
	"use strict";


// Source: src/scripts/hierarchy-tree/controllers/ht-ctrl.js
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
    $scope.isEmpty = function () {
        return ($scope.$nodesScope && $scope.$nodesScope.$modelValue &&
            $scope.$nodesScope.$modelValue.length === 0);
    };

    var clearSelections = function (scope) {
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

    var collapseOrExpand = function (scope, collapsed) {
        var i, subScope, nodes = scope.childNodes();
        for (i = 0; i < nodes.length; i++) {
            collapsed ? nodes[i].collapse() : nodes[i].expand();
            subScope = nodes[i].$childNodesScope;
            if (subScope) {
                collapseOrExpand(subScope, collapsed);
            }
        }
    };

    $scope.clearAll = function () {
        clearSelections($scope.$nodesScope);
    };

    $scope.collapseAll = function () {
        collapseOrExpand($scope.$nodesScope, true);
    };

    $scope.expandAll = function () {
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


// Source: src/scripts/hierarchy-tree/controllers/ht-node-ctrl.js
var module = angular.module('TT-UI.HierarchyTree.Controllers.HierarchyTreeNodeController', [
]);

function HierarchyTreeNodeController($scope, $element, $timeout) {
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

    $scope.getNodeContentClasses = function () {
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

    $scope.dropCallback = function (event, index, item) {
        $scope.expand();
        return item;
    };

    $scope.dragstartCallback = function (event) {
        var input = event.currentTarget.getElementsByTagName('input')[0].cloneNode(true);
        var title = document.createElement('div');
        if ($scope.hasChild()) {
            var arrow = event.currentTarget.getElementsByClassName('glyphicon')[0].cloneNode(true);
            title.appendChild(arrow);
        }
        title.appendChild(input);
        title.style.position = 'absolute';
        title.style.top = '0px';
        title.style.right = '0px';
        title.id = 'draggingImage';
        if ($scope.hasChild()) {
            var ghostCount = document.createElement('div');
            ghostCount.innerText = '(' + countNodes($scope.$modelValue) + ' items)';
            ghostCount.id = 'ghostCount';
            title.appendChild(ghostCount);
        }
        document.body.appendChild(title);
        event.dataTransfer.setDragImage(title, 0, 0);

        event.currentTarget.parentElement.style.opacity = 0.5;
        $scope.hover(false);
    };

    $scope.dragendCallback = function (event) {
        event.currentTarget.parentElement.style.opacity = 1;
        document.body.removeChild(document.getElementById('draggingImage'));
    };

    function countNodes(node) {
        var total = 1;
        angular.forEach(node.nodes, function (childNode) {
            var counts = countNodes(childNode);
            total += counts;
        });
        return total;
    }
}

HierarchyTreeNodeController.$inject = ['$scope', '$element', '$timeout'];
module.controller('HierarchyTreeNodeController', HierarchyTreeNodeController);


// Source: src/scripts/hierarchy-tree/controllers/ht-nodes-ctrl.js
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


// Source: src/scripts/hierarchy-tree/directives/ht-container.js
var module = angular.module('TT-UI.HierarchyTree.Directives.HierarchyTreeContainer', [
]);

module.directive('hierarchyTreeContainer', ['hierarchyTreeConfig', function (hierarchyTreeConfig) {
    return {
        restrict: 'E',
        require: ['^hierarchyTree'],
        scope: false,
        transclude: true,
        templateUrl: hierarchyTreeConfig.templatePath + 'ht-container.tpl.html',
        link: function (scope, element, attrs, controllersArr) {
            var config = {};
            angular.extend(config, hierarchyTreeConfig);
            angular.extend(config, controllersArr[0].scope.options);

            scope.recursionTemplate = config.templatePath + controllersArr[0].scope.recursionTemplate;
            scope.model = controllersArr[0].scope.model;
        }
    };
}]);


// Source: src/scripts/hierarchy-tree/directives/ht-filter.js
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

// Source: src/scripts/hierarchy-tree/directives/ht-node.js
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


// Source: src/scripts/hierarchy-tree/directives/ht-nodes.js
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


// Source: src/scripts/hierarchy-tree/directives/ht-root-node.js
var module = angular.module('TT-UI.HierarchyTree.Directives.HierarchyTreeContainerRootNode', [
]);

module.directive('hierarchyTreeContainerRootNode', [function () {
    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        template: '<div hierarchy-tree-node class="root-node" ng-class="{\'selected\': selected}">' +
        '<span ng-mouseover="iconHover(true);" ng-mouseleave="iconHover(false)" ng-click="selectItem();" ' +
        'class="glyphicon glyphicon-ttui" ' +
        'ng-class="{\'glyphicon-chevron-circle-down\': !iconHovered, \'glyphicon-chevron-circle-down-black\': iconHovered}"></span>' +
        '<span ng-click="selectItem();" ng-class="{\'hover\': hovered}" ng-mouseover="hover(true);" ng-mouseleave="hover(false);">' +
        '<ng-transclude></ng-transclude>' +
        '</span>' +
        '</div>'

    };
}]);

// Source: src/scripts/hierarchy-tree/directives/ht.js
var module = angular.module('TT-UI.HierarchyTree.Directives.HierarchyTree', [
]);

module.directive('hierarchyTree', ['hierarchyTreeConfig', function (hierarchyTreeConfig) {
    return {
        restrict: 'E',
        controller: 'HierarchyTreeController',
        scope: {
            recursionTemplate: '@',
            model: '=',
            options: '=?'
        },
        link: function (scope, element, attrs) {
            scope.$callbacks = null;

            var callbacks = {
                removedAction: null,
                selectedAction: null,
                rootSelectedAction: null,
                newSubItemAction: null,
                footerButtonAction: null,
                dragoverAction: null
            },
                config = {};

            angular.extend(config, hierarchyTreeConfig);
            angular.extend(config, scope.options);
            scope.$options = config;

            callbacks.removedAction = function (node) {
                return node;
            };

            callbacks.selectedAction = function (node) {
                return node;
            };

            callbacks.rootSelectedAction = function (node) {
                return node;
            };

            callbacks.newSubItemAction = function (scope, params) {
                if (scope.$modelValue &&
                    scope.maxDepth()) {
                    var nodeData = scope.$modelValue;
                    nodeData.nodes.push({
                        id: nodeData.id * 10 + nodeData.nodes.length,
                        title: nodeData.title + '.' + (nodeData.nodes.length + 1),
                        nodes: []
                    });
                } else { // root
                    var rootNodeData = scope.$parentNodesScope.$modelValue;
                    var id = rootNodeData.length + 1;
                    rootNodeData.push({
                        id: id,
                        title: 'Node' + id,
                        nodes: []
                    });
                }
                params = null;
            };

            callbacks.footerButtonAction = function (params) {
                params = null;
            };

            callbacks.dragoverAction = function (event, dataType) {
                // Custom rules to be overriden if necessary.
                if (event.target.id === '' || dataType === 'profile') {
                    return false;
                }
                var targetDataType = event.target.id.substring(event.target.id.lastIndexOf('-') + 1);
                if (event.target.nodeName === 'LI') {
                    // Check parent dataType since the node will actually be placed in parent list
                    var parentId = event.target.parentElement.id;
                    targetDataType = parentId.substring(parentId.lastIndexOf('-') + 1);
                }
                if (targetDataType === 'profile' || targetDataType === 'subProfile') {
                    if (dataType === 'subProfile' || dataType === 'billingAccount') {
                        return true;
                    }
                }
                if (targetDataType === 'billingAccount' && dataType === 'offering') {
                    return true;
                }
                return false;
            };
            
            // set callbacks
            scope.$watch(attrs.options, function (newVal) {
                angular.forEach(newVal, function (value, key) {
                    if (callbacks[key]) {
                        if (typeof value === 'function') {
                            callbacks[key] = value;
                        }
                    }
                });
                scope.$callbacks = callbacks;
            }, true);

        }
    };
}]);


// Source: src/scripts/hierarchy-tree/module.js
angular.module('TT-UI.HierarchyTree.Config', [])
    .constant('hierarchyTreeConfig', {
        showRoot: false,
        readonly: true,
        selectPrevious: false,
        maxDepth: 0,
        templatePath: 'scripts/hierarchy-tree/views/directives/'
    });

angular.module('TT-UI.HierarchyTree', [
    'ui.bootstrap.collapse',
    'ngAnimate',
    'dndLists',
    'TT-UI.HierarchyTree.Config',
    'TT-UI.HierarchyTree.Controllers.HierarchyTreeController',
    'TT-UI.HierarchyTree.Controllers.HierarchyTreeNodesController',
    'TT-UI.HierarchyTree.Controllers.HierarchyTreeNodeController',
    'TT-UI.HierarchyTree.Directives.HierarchyTreeContainer',
    'TT-UI.HierarchyTree.Directives.HierarchyTreeNodes',
    'TT-UI.HierarchyTree.Directives.HierarchyTreeNode',
    'TT-UI.HierarchyTree.Directives.HierarchyTreeContainerRootNode',
    'TT-UI.HierarchyTree.Directives.HierarchyTreeFilter',
    'TT-UI.HierarchyTree.Directives.HierarchyTree'
]);
return angular;
})(window, window.angular);