/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";

angular.module('TT-UI-CLM.CommonSelectPlanOffering.Tpl',[]).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/select-plan-offering/views/offerCharges.tpl.html',
    "<table class=\"table charges-table\" ng-show=\"key == 0\"><tbody><tr ng-repeat=\"payment in monthlyCharges track by $index\"><td>Monthly Rental</td><td><strong class=\"format-price\"><span>{{chargesCurrency}}</span><span> {{payment.netAmount }}</span><span>/mo</span></strong></td></tr><tr ng-repeat=\"payment in oneTimeCharges track by $index\"><td>One Time Charges</td><td><strong class=\"format-price\"><span>{{chargesCurrency}}</span> <span>{{payment.netAmount }}</span></strong></td><td ng-if=\"payment.chargeType === 'OneTimeCharge' && displayWaiveOff()\" is-allowed=\"waiveOffLinkView\"><a class=\"list-group-item-link\" href ng-if=\"!payment.waiveOff\" ng-click=\"waiveOffOneTimeCharges($index, payment.commercialArticle); $event.stopPropagation();\" translate=\"Waive Off\">Waive Off</a> <a class=\"list-group-item-link\" href ng-if=\"payment.waiveOff\" ng-click=\"undoWaiveOff($index, payment.commercialArticle); $event.stopPropagation();\" translate=\"Undo\">Undo</a></td></tr><tr><th class=\"border-top\">TOTAL (incl. Tax) Upfront</th><th class=\"border-top\"><span>{{chargesCurrency}}</span> <span>{{upfront.netAmount+upfront.tax}}</span></th></tr><tr><th>TOTAL AMOUNT in 1st Invoice</th><th><span>{{chargesCurrency}}</span> <span>{{billing.netAmount + billing.tax}}</span></th></tr></tbody></table>"
  );


  $templateCache.put('scripts/select-plan-offering/views/select-plan-offering.tpl.html',
    "<style>/* Style the tab content */\r" +
    "\n" +
    "\r" +
    "\n" +
    "	/*Reset Padding*/\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.pl-0 {\r" +
    "\n" +
    "		padding-left: 0\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.pr-0 {\r" +
    "\n" +
    "		padding-right: 0\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.plr-0 {\r" +
    "\n" +
    "		padding-left: 0;\r" +
    "\n" +
    "		padding-right: 0;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.bt-1x {\r" +
    "\n" +
    "		border-top: 1px solid #ddd;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.pt-5x {\r" +
    "\n" +
    "		padding-top: 5px;\r" +
    "\n" +
    "	}\r" +
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
    "		border-top: 1px solid #ccc\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.table-list {\r" +
    "\n" +
    "		float: left;\r" +
    "\n" +
    "		width: 100%;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.table-list li {\r" +
    "\n" +
    "		float: left;\r" +
    "\n" +
    "		width: 100%;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.table-list li.list-group-item {\r" +
    "\n" +
    "		border: none;\r" +
    "\n" +
    "		border-bottom: 1px solid #ddd;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.show-table {\r" +
    "\n" +
    "		display: table\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.selectOffering table>tbody>tr.expanding-row.show-row {\r" +
    "\n" +
    "		display: table-row\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	;\r" +
    "\n" +
    "	.ttui-table.ttui-table>tbody>tr.expanding-row>td .table>tbody {\r" +
    "\n" +
    "		background: transparent !important;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.selectOffering table>tbody>tr.expanding-row.show-row .table {\r" +
    "\n" +
    "		background: transparent !important;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.equipment-table.table>tbody>tr>td {\r" +
    "\n" +
    "		border-top: none;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.charges-table.table>tbody>tr>td,\r" +
    "\n" +
    "	.contractsPenalty-table.table>tbody>tr>td,\r" +
    "\n" +
    "	.charges-table.table>tbody>tr>th,\r" +
    "\n" +
    "	.EMIPlan-tabl.table>tbody>tr>td {\r" +
    "\n" +
    "		border-top: none;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.charges-table.table>tbody>tr>th.border-top {\r" +
    "\n" +
    "		border-top: 1px solid #ddd;\r" +
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
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.selectOffering table.ttui-table.table.show {\r" +
    "\n" +
    "		display: table !important;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.selectOffering table>tbody>tr.expanding-row {\r" +
    "\n" +
    "		display: none;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.selectPlanOfferview {\r" +
    "\n" +
    "		float: left;\r" +
    "\n" +
    "		width: 100%;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.accordion.selectPlanOffer {\r" +
    "\n" +
    "		float: left;\r" +
    "\n" +
    "		width: 100%;\r" +
    "\n" +
    "		background: #fff;\r" +
    "\n" +
    "	}</style><div class=\"selectPlanOfferview\" ng-hide=\"defaultState.hasPreselectedOffering\"><uib-accordion class=\"accordion selectPlanOffer\" close-others=\"false\"><uib-accordion-group is-open=\"defaultState.showPlansList\" is-disabled=\"defaultState.hasPreselectedOffering\"><uib-accordion-heading><span translate=\"Eligible offerings\" bs-collapse-toggle>Eligible offerings</span> <i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': defaultState.showPlansList, 'glyphicon-chevron-right': !defaultState.showPlansList}\"></i></uib-accordion-heading><ul class=\"nav nav-tabs\"><li ng-repeat=\"tab in offeringTabs\" ng-class=\"{active:isSetTab($index)}\"><a href ng-click=\"offerTab($index)\">{{tab.title}}</a></li></ul><div ng-show=\"isSetTab(0)\"><div class=\"col-md-12 selectOffering\"><div class=\"panel panel-default\"><div class=\"panel-body table-no-padding\"><table ng-if=\"offeringData.length > 0\" tt-table st-table=\"offeringDisplayedList\" st-safe-src=\"offeringData\" st-items-by-page=\"1\" class=\"ttui-table table\"><thead class=\"table-extra-header\"><tr><th colspan=\"{{tableCtrl.colspan}}\"><span class=\"table-extra-header-left\"><tt-table-filter-tags tags=\"tableCtrl.tableState.search.predicateObject\"></tt-table-filter-tags></span><span class=\"table-extra-header-right\"><a ng-show=\"tableCtrl.showActions()\" class=\"btn btn-default\" ng-click=\"example.executeAction(tableCtrl.getSelectionModel())\" href>action 1</a> <a ng-show=\"tableCtrl.showActions()\" class=\"btn btn-default\" href>action 2</a> <a ng-show=\"tableCtrl.showActions()\" class=\"btn btn-default\" href>action 3</a></span></th></tr></thead><thead class=\"main-header\"><tr><th uib-dropdown tt-table-dropdown is-open=\"dropdownCtrl.isOpen\" disable-auto-filters=\"true\" auto-close=\"disabled\" path=\"'offering'\" set-filters=\"codeFilters\"><tt-table-text-tooltip text=\"'Offerings'\" uib-dropdown-toggle></tt-table-text-tooltip></th><th translate=\"Variant\">Variant</th><th translate=\"Allowance\">Allowance</th><th uib-dropdown tt-table-dropdown is-open=\"dropdownCtrl.isOpen\" disable-auto-filters=\"true\" auto-close=\"disabled\" path=\"'charges.sumOfRC'\" set-filters=\"codeFilters\"><tt-table-text-tooltip text=\"'Charges'\" uib-dropdown-toggle></tt-table-text-tooltip></th><th></th><th></th><th></th><th></th></tr></thead><tbody ng-repeat=\"items in offeringDisplayedList\"><tr ng-class=\"{'active':isSelect}\"><td ng-bind=\"::items.offering.name\" data-mobile-label=\"Offering\"></td><td><span ng-show=\"items.offering.associatedProducts.associatedProduct[0].mandatory === true\">-</span><select ng-show=\"items.offering.associatedProducts.associatedProduct[0].mandatory === false\" ng-init=\"items.offering.code =items.offering.code \" ng-model=\"selectedVariant[items.offering.code]\" ng-options=\"variant.product.code as variant.product.name for\r" +
    "\n" +
    "													 variant in items.offering.associatedProducts.associatedProduct | filter:variant.mandatory === false\" ng-change=\"getSelectedVariant(items.offering)\"><option value=\"\">Select</option></select></td><td ng-bind=\"items.allowanceDescription\" data-mobile-label=\"Allowance\"></td><td ng-bind=\"::items.offering.charges.sumOfRC | currency  : items.offering.currency.code\"></td><td translate=\"%\">%</td><td translate=\"EMI\">EMI</td><td><a href class=\"list-group-item-link\"><span ng-show=\"!items.selected\" translate=\"Select\" ng-click=\"tmSelectPlanOffering(items)\">Select</span> <span ng-show=\"items.selected\" translate=\"Selected\" ng-click=\"tmUnselectPlanOffering(items)\">Selected</span></a></td><td><a class=\"list-group-item-link\" translate=\"Details\" ng-click=\"items._meta.expanded=!items._meta.expanded; getSelectedOffering(items)\">Details</a></td></tr><tr class=\"expanding-row\" ng-class=\"{'show-row':items._meta.expanded}\"><td colspan=\"{{tableCtrl.colspan}}\"><div class=\"col-sm-12\" uib-collapse=\"!items._meta.expanded\"><div class=\"col-sm-12 pr-0\" ng-repeat=\"(key, val) in detailsTab\" ng-show=\"key == $parent.tabId\"><p class=\"col-sm-9 col-sm-offset-3 prodcutSummary\">{{offerDetailModel.description}}</p></div><div class=\"col-sm-3 tablist plr-0 pt-5x bt-1x\"><ul class=\"nav nav-list nav-stacked\"><li role=\"presentation\" ng-repeat=\"tab in detailsTab track by $index\" ng-class=\"{'active': $index == $parent.tabId}\"><a href ng-click=\"setTab($parent.$index,$event);\" translate=\"{{tab.title}}\">{{tab.title}}</a></li></ul></div><div class=\"col-sm-9 plr-0 pt-5x bt-1x\"><div class=\"tab-content\"><div class=\"tab-pane\" ng-repeat=\"(key, tab) in detailsTab\" ng-class=\"{'show': key == $parent.tabId}\"><div class=\"col-sm-12 pr-0\"><div ng-include=\"tab.page\"></div></div></div></div></div></div></td></tr></tbody><tfoot ng-if=\"tableCtrl.enablePagination\"><tr><td colspan=\"8\"><div st-pagination=\"\" st-items-by-page=\"selectOffering.config.itemsByPage\" st-displayed-pages=\"selectOffering.config.displayedPages\" st-template=\"scripts/ttui-table/table-pagination.tpl.html\" class=\"pull-right\"></div></td></tr></tfoot></table><div class=\"row panel-body\" ng-if=\"offeringData == 0\"><div class=\"col-xs-12\" translate=\"To see eligible plans list you need to select plan first\">To see eligible plans list you need to select plan first</div></div></div></div></div></div><div ng-show=\"isSetTab(1)\"><h4>No Vases</h4></div></uib-accordion-group></uib-accordion></div>"
  );
}]);
return angular;
})(window, window.angular);
