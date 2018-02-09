'use strict';

angular.module('TT-UI.MultiselectHierarchyTree.Filters.TreeNodeFilter', [
])
.filter('searchNode', searchNodeFilter);

searchNodeFilter.$inject = [];

function searchNodeFilter() {

    function search(nodes, text) {
        if (!text) {
            return nodes;
        }

        text = text.toLowerCase();

        return nodes.filter(function(node) {
            var nodeName = node.title.toLowerCase();
            var parentName = '';
            if (node.parent) {
                parentName = node.parent.title.toLowerCase();
            }
            var match = nodeName.indexOf(text.toLowerCase()) >= 0 || parentName.indexOf(text.toLowerCase()) >= 0 || !node.parent;

            return match || search(node.nodes, text).length > 0;
        });
    }

    return search;
}
