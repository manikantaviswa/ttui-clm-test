'use strict';

angular.module('TT-UI.MultiselectHierarchyTree.Config', [])
	.constant('multiselectHierarchyTreeConfig', {
    	templatePath: 'scripts/multiselect-hierarchy-tree/views/directives/'
});

angular.module('TT-UI.MultiselectHierarchyTree', [
	'ui.bootstrap.collapse',
	'ngAnimate',
	'TT-UI.MultiselectHierarchyTree.Config',
	'TT-UI.MultiselectHierarchyTree.Services.TreeNodeFactory',
	'TT-UI.MultiselectHierarchyTree.Filters.TreeNodeFilter',
	'TT-UI.MultiselectHierarchyTree.Controllers.MultiselectHierarchyTreeController',
	'TT-UI.MultiselectHierarchyTree.Controllers.MultiselectHierarchyTreeNodeController',
	'TT-UI.MultiselectHierarchyTree.Directives.MultiselectHierarchyTreeNode',
	'TT-UI.MultiselectHierarchyTree.Directives.MultiselectHierarchyTree',
	'TT-UI.MultiselectHierarchyTree.Directives.TreeBackgroundRows'
]);