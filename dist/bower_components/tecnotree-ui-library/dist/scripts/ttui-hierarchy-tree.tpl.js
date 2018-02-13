/*! TT-UI Lib 0.6.24.19 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-hierarchy-tree.tpl';
}

(function (window, angular, undefined) {
	"use strict";

   angular.module('TT-UI.HierarchyTree.Tpl', []).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/hierarchy-tree/views/directives/ht-container.tpl.html',
    "<div class=\"hierarchy-tree-ttui\"><ol id=\"{{model.id}}-ol\" class=\"tree-nodes\" hierarchy-tree-nodes ng-model=\"::model\"><ng-transclude></ng-transclude><li id=\"{{node.id}}-li-{{node.dataType}}\" hierarchy-tree-node ng-repeat=\"node in model\" ng-class=\"{'background-none': root()}\" ng-include=\"recursionTemplate\" ng-show=\"visible(node)\"></li></ol></div>"
  );


  $templateCache.put('scripts/hierarchy-tree/views/directives/ht-recursion-template-default.tpl.html',
    "<div id=\"{{node.id}}-div-{{node.dataType}}\" ng-class=\"getNodeContentClasses();\" dnd-list=\"node.nodes\" dnd-dragover=\"dragoverCallback(event, index, external, type)\" dnd-drop=\"dropCallback(event, index, item)\" dnd-draggable=\"node\" dnd-type=\"node.dataType\" dnd-moved=\"removeNode()\" dnd-dragstart=\"dragstartCallback(event)\" dnd-dragend=\"dragendCallback(event)\"><span ng-show=\"node.nodes&&node.nodes.length > 0\" ng-click=\"toggle(this)\"><span ng-mouseover=\"iconHover(true)\" ng-mouseleave=\"iconHover(false)\" ng-class=\"getIconClasses();\"></span></span> <span id=\"{{node.id}}-span-{{node.dataType}}\" ng-mouseover=\"hover(true)\" ng-mouseleave=\"hover(false)\"><span ng-show=\"hovered && !selected\" class=\"glyphicon glyphicon-move pull-right\"></span> <input id=\"{{node.id}}-input-{{node.dataType}}\" ng-readonly=\"readonly();\" type=\"text\" placeholder=\"title\" ng-click=\"selectItem();\" ng-model=\"node.title\"></span> <span class=\"pull-right\" ng-show=\"selected\"><span ng-show=\"hovered\" class=\"glyphicon glyphicon-move\"></span> <span ng-click=\"removeWithTimeout();\" class=\"glyphicon glyphicon-remove\"></span></span><div id=\"{{node.id}}-button-div-{{node.dataType}}\" class=\"buttons\" ng-show=\"selected&&maxDepth();\" ng-class=\"{'no-children': !hasChild()}\"><button class=\"btn btn-primary btn-sm\" ng-click=\"newSubItem(this);\"><span class=\"glyphicon glyphicon-plus\"></span> sub profile</button></div></div><ol id=\"{{node.id}}-ol-{{node.dataType}}\" class=\"tree-nodes\" hierarchy-tree-nodes ng-model=\"node.nodes\" uib-collapse=\"collapsed\" dnd-list=\"node.nodes\" dnd-dragover=\"dragoverCallback(event, index, external, type)\"><li id=\"{{node.id}}-li-{{node.dataType}}\" hierarchy-tree-node ng-repeat=\"node in node.nodes\" ng-include=\"recursionTemplate\" ng-show=\"visible(node)\"></li></ol>"
  );

}]);
return angular;
})(window, window.angular);