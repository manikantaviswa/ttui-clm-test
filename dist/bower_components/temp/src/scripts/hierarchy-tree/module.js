'use strict';

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
    'TT-UI.HierarchyTree.Directives.HierarchyTree',
    'TT-UI.HierarchyTree.Directives.Sticky'
]);