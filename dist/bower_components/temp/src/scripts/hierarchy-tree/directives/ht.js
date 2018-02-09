'use strict';

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
                        dataType: 'any',
                        status: 1,
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
                if (dataType === 'any') {
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
