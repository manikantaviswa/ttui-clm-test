/*! TT-UI Lib 0.6.24.19 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-multiselect-hierarchy-tree.tpl';
}

(function (window, angular, undefined) {
	"use strict";

   angular.module('TT-UI.MultiselectHierarchyTree.Tpl', []).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/multiselect-hierarchy-tree/views/directives/multiselect-ht-node.tpl.html',
    "<div ng-class=\"mshtNodeCtrl.getNodeContentClasses()\"><span class=\"node-expand\" ng-if=\"mshtNodeCtrl.hasChildren()\" ng-click=\"mshtNodeCtrl.toggleExpand()\"><span ng-mouseover=\"mshtNodeCtrl.iconHover(true)\" ng-mouseleave=\"mshtNodeCtrl.iconHover(false)\" ng-class=\"mshtNodeCtrl.getIconClasses();\"></span></span> <span class=\"node-title\" ng-mouseover=\"mshtNodeCtrl.hover(true)\" ng-mouseleave=\"mshtNodeCtrl.hover(false)\" ng-click=\"mshtNodeCtrl.labelClick()\" ng-bind=\"::mshtNodeCtrl.model.title\"></span> <span class=\"pull-right\"><span class=\"counts\" ng-if=\"mshtNodeCtrl.hasChildren()\"><span class=\"included-count\" ng-bind=\"mshtNodeCtrl.model.getTotalCountsIncluded()\"></span> <span>/</span> <span class=\"total-count\" ng-bind=\"mshtNodeCtrl.model.getTotalCountsTotal()\"></span></span> <input class=\"css-checkbox\" type=\"checkbox\" id=\"{{$id}}-{{::mshtNodeCtrl.model.id}}\" ng-click=\"mshtNodeCtrl.toggleSelect()\" ng-checked=\"mshtNodeCtrl.model.isIncluded()\"><label class=\"css-label\" for=\"{{$id}}-{{::mshtNodeCtrl.model.id}}\"></label></span></div><div ng-include ng-if=\"mshtNodeCtrl.expanded || mshtNodeCtrl.searchText\" ng-init=\"model = mshtNodeCtrl.model\" src=\"recursionTemplate\"></div>"
  );


  $templateCache.put('scripts/multiselect-hierarchy-tree/views/directives/multiselect-ht-recursion.tpl.html',
    "<ol class=\"tree-nodes\" collapse=\"collapsed\"><li multiselect-hierarchy-tree-node ng-repeat=\"node in model.nodes | searchNode: mshtNodeCtrl.searchText\" model=\"node\" search-text=\"mshtNodeCtrl.searchText\"></li></ol>"
  );


  $templateCache.put('scripts/multiselect-hierarchy-tree/views/directives/multiselect-ht.tpl.html',
    "<div class=\"multiselect-hierarchy-tree-ttui\" id=\"multiselect-tree-container\"><div class=\"search-container\"><input class=\"form-control\" placeholder=\"type in to filter\" ng-model=\"mshtCtrl.searchText\" ng-model-options=\"{ debounce: { default: 200, blur: 0 }}\"></div><ol class=\"tree-nodes\" id=\"multiselect-tree\" tree-background-rows row-height=\"31.5\"><li class=\"background-none\" id=\"multiselect-tree-root\" ng-repeat=\"node in mshtCtrl.nodes | searchNode: mshtCtrl.searchText\" multiselect-hierarchy-tree-node model=\"node\" search-text=\"mshtCtrl.searchText\"></li></ol><div class=\"panel-footer\"><div class=\"pull-right\"><span class=\"included-count\">{{ mshtCtrl.counts.included }}</span> <span>/</span> <span class=\"total-count\">{{ mshtCtrl.counts.total }}</span> <span>SELECT ALL</span> <input class=\"css-checkbox\" id=\"select-all{{$id}}\" type=\"checkbox\" value=\"mshtCtrl.nodes[0].title\" ng-click=\"mshtCtrl.toggleSelectAll()\" ng-checked=\"mshtCtrl.isAllPossibleSelected()\"><label class=\"css-label\" for=\"select-all{{$id}}\"></label></div></div></div>"
  );

}]);
return angular;
})(window, window.angular);