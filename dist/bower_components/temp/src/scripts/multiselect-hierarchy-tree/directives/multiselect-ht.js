'use strict';

var module = angular.module('TT-UI.MultiselectHierarchyTree.Directives.MultiselectHierarchyTree', [
]);

function MultiselectHierarchyTree(multiselectHierarchyTreeConfig, $timeout) {
    return {
        require: 'multiselectHierarchyTree',
        restrict:'E',
        controller: 'MultiselectHierarchyTreeController as mshtCtrl',
        scope: {}, // Create an isolate scope
        bindToController: { // but instead of using the scope, bind to controller so directive and controller can use the same namespace
            nodes: '='
        },
        link: function(scope, element, attrs, mshtCtrl) {
        	scope.hierarchyTreeAttrs = attrs;

            $timeout(function() {
                mshtCtrl.notifySelectionChange();
            }, 0);
        },
        templateUrl: multiselectHierarchyTreeConfig.templatePath + 'multiselect-ht.tpl.html'
    };
}

MultiselectHierarchyTree.$inject = ['multiselectHierarchyTreeConfig', '$timeout'];

module.directive('multiselectHierarchyTree', MultiselectHierarchyTree);
