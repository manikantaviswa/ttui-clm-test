/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";

angular.module('TT-UI-CLM.SelectPlanOffering.Tpl',[]).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/select-plan-offering/views/select-plan-offering.tpl.html',
    "<style>/* Style the tab content */\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.tabcontent {\r" +
    "\n" +
    "		float: left;\r" +
    "\n" +
    "		padding: 0px 12px;\r" +
    "\n" +
    "		border: 1px solid #ccc;\r" +
    "\n" +
    "		width: 80%;\r" +
    "\n" +
    "		border-left: none;\r" +
    "\n" +
    "		height: auto;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	/* Style the tab */\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.tab {\r" +
    "\n" +
    "		float: left;\r" +
    "\n" +
    "		border: 1px solid #ccc;\r" +
    "\n" +
    "		background-color: #f1f1f1;\r" +
    "\n" +
    "		width: 20%;\r" +
    "\n" +
    "		height: auto;\r" +
    "\n" +
    "	}</style><div class=\"col-md-12\" style=\"padding: 0px\"><div class=\"panel panel-default\"><div class=\"panel-body table-no-padding\"><table tt-table st-table=\"offeringList\" st-safe-src=\"plansList\" st-items-by-page=\"10\" class=\"table table-hover ttui-table\"><thead class=\"table-extra-header\"><tr><th colspan=\"{{tableCtrl.colspan}}\"><span class=\"table-extra-header-left\"><tt-table-filter-tags tags=\"tableCtrl.tableState.search.predicateObject\"></tt-table-filter-tags></span><span class=\"table-extra-header-right\"><a ng-show=\"tableCtrl.showActions()\" class=\"btn btn-default\" ng-click=\"example.executeAction(tableCtrl.getSelectionModel())\" href>action 1</a> <a ng-show=\"tableCtrl.showActions()\" class=\"btn btn-default\" href>action 2</a> <a ng-show=\"tableCtrl.showActions()\" class=\"btn btn-default\" href>action 3</a></span></th></tr></thead><thead class=\"main-header\"><tr><th uib-dropdown is-open=\"dropdownCtrl.isOpen\" auto-close=\"disabled\" tt-table-dropdown path=\"column.path\" set-filters=\"column.filters\"><tt-table-text-tooltip text=\"'Offering'\" uib-dropdown-toggle></tt-table-text-tooltip></th><th st-sort=\"charges.sumOfOTC\" translate=\"Charge Upfront\">Charge Upfront</th><th st-sort=\"charges.sumOfRC\" translate=\"Charge in Invoice\">Charge in Invoice</th><th></th></tr></thead><tbody ng-repeat=\"items in offeringData track by $index\">{{items._meta.selected}}<tr ng-class=\"{'active':items._meta.selected}\" ng-click=\"tableCtrl.toggleExpanded(items)\"><td ng-bind=\"::items.name\" data-mobile-label=\"Offering\"></td><td ng-bind=\"::items.charges.sumOfOTC | currency : items.currency.code \"></td><td ng-bind=\"::items.charges.sumOfRC | currency  : items.currency.code\"></td><td><a class=\"list-group-item-link\" href ng-if=\"!items.selected\" ng-click=\"selectPlanOffering(items); $event.stopPropagation();\" translate=\"Select\">Select</a> <a class=\"list-group-item-link\" href ng-if=\"items.selected\" ng-click=\"unselectOffering(items); $event.stopPropagation();\" translate=\"Unselect\">Unselect</a> <a class=\"glyphicon glyphicon-chevron-right\" href ng-if=\"!items.selected\" ng-class=\"{'rotate-right':items._meta.expanded}\"></a></td></tr><tr class=\"expanding-row\" ng-if=\"item.items\"><td colspan=\"{{tableCtrl.colspan}}\"><div uib-collapse=\"!item._meta.expanded\"></div></td></tr></tbody><tfoot ng-if=\"tableCtrl.enablePagination\"><tr><td colspan=\"7\"><div st-pagination=\"\" st-items-by-page=\"15\" st-displayed-pages=\"10\" st-template=\"bower_components/ttui-table/table-pagination.tpl.html\" class=\"pull-right\"></div></td></tr></tfoot></table></div></div></div>"
  );
}]);
return angular;
})(window, window.angular);
