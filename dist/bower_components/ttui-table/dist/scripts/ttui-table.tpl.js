/*! TT-UI.Table 0.0.42 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-table.tpl';
}

(function (window, angular, undefined) {
	"use strict";

	angular.module('ttui-table.tpl', []).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/ttui-table/table-filter-dropdown.tpl.html',
    "<ul class=\"table-filter-content\" uib-dropdown-menu role=\"menu\"><li><input class=\"form-control\" type=\"text\" ng-model=\"dropdownCtrl.input\" placeholder=\"Search\" tt-table-focus=\"{{dropdownCtrl.predicate}}\" tt-table-enter=\"dropdownCtrl.search()\"><span class=\"glyphicon glyphicon-search\" ng-click=\"dropdownCtrl.search()\"></span> <span class=\"icon-group\" ng-click=\"dropdownCtrl.sort();\"><span class=\"glyphicon glyphicon-arrow-up\" ng-class=\"{'active-filter-reverse':dropdownCtrl.reverse === true}\"></span> <span class=\"glyphicon glyphicon-arrow-down\" ng-class=\"{'active-filter-reverse':dropdownCtrl.reverse === false}\"></span></span></li><div><li><div class=\"table-filter-items\"><div class=\"filter-item\" ng-repeat=\"item in dropdownCtrl.items track by $index\" ng-click=\"dropdownCtrl.toggleSelectItem(item)\"><span ng-bind=\"item.title\"></span> <a class=\"table-checkbox glyphicon\" ng-class=\"{'ttui-table-checkbox-unchecked': !item.selected, 'ttui-table-checkbox-checked': item.selected}\"></a></div><div></div></div></li><li class=\"divider\"></li><li role=\"menuitem\"><a ng-click=\"dropdownCtrl.selectAll()\" ng-if=\"!dropdownCtrl.disableAutoFilters\">SELECT ALL</a><span ng-if=\"!dropdownCtrl.disableAutoFilters\">|</span><a ng-click=\"dropdownCtrl.clear()\">CLEAR</a><a class=\"ok-button\" ng-click=\"dropdownCtrl.close();dropdownCtrl.search()\">OK</a></li></div></ul>"
  );


  $templateCache.put('scripts/ttui-table/table-pagination.tpl.html',
    "<ul class=\"pagination ttui-table-pagination\" st-direction><li ng-click=\"selectPage(currentPage > 1 ? currentPage - 1 : 1)\" ng-class=\"{'disabled': currentPage <= 1 }\"><a aria-label=\"Previous\"><span class=\"glyphicon\" ng-class=\"{'glyphicon-triangle-left': stDirectionCtrl.direction === 'ltr', 'glyphicon-triangle-right': stDirectionCtrl.direction === 'rtl'}\" aria-hidden=\"true\"></span> {{'previous' | translate}}</a></li><li ng-if=\"currentPage > (stDisplayedPages / 2) + 1\"><a ng-click=\"selectPage(1)\">{{ 1 }}</a> <span class=\"clear-hover\">...</span></li><li ng-repeat=\"page in pages\" ng-class=\"{ active: currentPage === page }\" ng-click=\"selectPage(page)\"><a>{{ page }}</a></li><li ng-if=\"currentPage < numPages\"><span class=\"clear-hover\">...</span> <a ng-click=\"selectPage(numPages)\">{{ numPages }}</a></li><li ng-click=\"selectPage(currentPage < numPages ? currentPage + 1 : numPages)\" ng-class=\"{'disabled': currentPage >= numPages }\"><a>{{'next' | translate}} <span class=\"glyphicon\" ng-class=\"{'glyphicon-triangle-right': stDirectionCtrl.direction === 'ltr', 'glyphicon-triangle-left': stDirectionCtrl.direction === 'rtl'}\" aria-hidden=\"true\"></span></a></li></ul>"
  );

}]);
return angular;
})(window, window.angular);