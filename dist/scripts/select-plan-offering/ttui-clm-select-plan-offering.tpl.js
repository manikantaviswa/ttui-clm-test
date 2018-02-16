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
    "	}</style><div class=\"col-md-12\" style=\"padding: 0px\" ng-controller=\"SelectPlanOfferingCtrl as tabctrl\"><div class=\"panel panel-default\"><div class=\"panel-body table-no-padding\"><table tt-table st-table=\"offeringList\" st-safe-src=\"plansList\" st-items-by-page=\"10\" class=\"table table-hover ttui-table\"><thead class=\"table-extra-header\"><tr><th colspan=\"8\"><span class=\"table-extra-header-left\"><tt-table-filter-tags tags=\"tableCtrl.tableState.search.predicateObject\"></tt-table-filter-tags></span><span class=\"table-extra-header-right\"><a ng-show=\"tableCtrl.showActions()\" class=\"btn btn-default\" ng-click=\"example.executeAction(tableCtrl.getSelectionModel())\" href>action 1</a> <a ng-show=\"tableCtrl.showActions()\" class=\"btn btn-default\" href>action 2</a> <a ng-show=\"tableCtrl.showActions()\" class=\"btn btn-default\" href>action 3</a></span></th></tr></thead><thead class=\"main-header\"><tr><th translate=\"Offerings\">Offerings</th><th translate=\"Variant\">Variant</th><th translate=\"Allowance\">Allowance</th><th st-sort=\"charges.sumOfRC\" translate=\"Charges\">Charges</th><th></th><th></th><th></th><th></th></tr></thead><tbody ng-repeat=\"items in offeringData track by $index\"><tr ng-class=\"{'active':items.selected}\"><td ng-bind=\"::items.offering.name\" data-mobile-label=\"Offering\"></td><td><select ng-init=\"items.offering.code =items.offering.code \" ng-model=\"selectedVariant.code\" ng-options=\"variant.product.code as variant.product.name for \r" +
    "\n" +
    "							 variant in items.offering.associatedProducts.associatedProduct | filter:variant.mandatory === false\" ng-change=\"getSelectedVariant(items.offering)\"><option value=\"\">Select</option></select></td><td ng-bind=\"items.allowanceDescription\" data-mobile-label=\"Allowance\"></td><td ng-bind=\"::items.offering.charges.sumOfRC | currency  : items.offering.currency.code\"></td><td translate=\"%\">%</td><td translate=\"EMI\">EMI</td><td><a class=\"list-group-item-link\" href ng-if=\"items.selected\" ng-click=\"items.selected = !items.selected; $event.stopPropagation();\" translate=\"Select\">Selected</a> <a class=\"list-group-item-link\" href ng-if=\"!items.selected\" ng-click=\"items.selected = !items.selected; $event.stopPropagation();\" translate=\"Select\">Select</a></td><td><a class=\"list-group-item-link\" translate=\"Details\" ng-click=\"items._meta.expanded=!items._meta.expanded; getOfferingDetailsView()\">Details</a></td></tr><tr class=\"expanding-row\" ng-class=\"{'hide':!items._meta.expanded}\"><td colspan=\"8\"><div uib-collapse=\"items._meta.expanded\"><div class=\"col-sm-3\"><ul class=\"nav nav-list nav-stacked\"><li role=\"presentation\" ng-repeat=\"tab in tabs\"><a href=\"\" ng-click=\"$parent.selected = ($parent.$index); reach(111);\" translate=\"{{tab.title}}\">{{tab.title}}</a></li></ul></div><div class=\"col-sm-9\"><div ng-class=\"{'show': $parent.selected == '0'}\"><h4>Tab 1</h4></div><div ng-class=\"{'show': $parent.selected == '1'}\"><h4>Tab 2</h4></div><div ng-class=\"{'show': $parent.selected == '2'}\"><h4>Tab 3</h4></div></div></div></td></tr></tbody><tfoot><tr><td colspan=\"8\"><div st-pagination=\"\" st-items-by-page=\"10\" st-displayed-pages=\"20\" st-template=\"scripts/ttui-table/table-pagination.tpl.html\" class=\"pull-right\"></div></td></tr></tfoot></table></div></div></div>"
  );
}]);
return angular;
})(window, window.angular);
