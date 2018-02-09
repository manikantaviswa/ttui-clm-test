'use strict';

var module = angular.module('TT-UI.MultiselectHierarchyTree.Directives.MultiselectHierarchyTreeNode', []);

function MultiselectHierarchyTreeNode(multiselectHierarchyTreeConfig) {
    return {
        require: ['multiselectHierarchyTreeNode', '^multiselectHierarchyTree'],
        restrict:'A',
        controller: 'MultiselectHierarchyTreeNodeController as mshtNodeCtrl',
        scope: {},
        bindToController: {
            model: '=',
            searchText: '='
        },
        templateUrl: multiselectHierarchyTreeConfig.templatePath + 'multiselect-ht-node.tpl.html',
        link: function (scope, element, attrs, controllers) {
            scope.recursionTemplate = multiselectHierarchyTreeConfig.templatePath + 'multiselect-ht-recursion.tpl.html';

            var mshtNodeCtrl = controllers[0];
            var mshtCtrl = controllers[1];

            mshtNodeCtrl.toggleSelect = function() {
                mshtNodeCtrl.model.toggleSelect();
                mshtCtrl.notifySelectionChange();
            };
        }
    };
}

MultiselectHierarchyTreeNode.$inject = ['multiselectHierarchyTreeConfig'];

module.directive('multiselectHierarchyTreeNode', MultiselectHierarchyTreeNode);
