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
    "	.tablist {\r" +
    "\n" +
    "		margin-top: 80px;\r" +
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
    "	.table-list li.list-group-item{\r" +
    "\n" +
    "		border:none;\r" +
    "\n" +
    "		border-bottom: 1px solid #ddd;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	\r" +
    "\n" +
    "	.prodcutSummary {\r" +
    "\n" +
    "		border-bottom: 1px solid #ccc;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "		.equipment-table.table>tbody>tr>td{\r" +
    "\n" +
    "			border-top:none;\r" +
    "\n" +
    "		}\r" +
    "\n" +
    "		.charges-table.table>tbody>tr>td,\r" +
    "\n" +
    "		.contractsPenalty-table.table>tbody>tr>td,\r" +
    "\n" +
    "		.charges-table.table>tbody>tr>th,\r" +
    "\n" +
    "		.EMIPlan-tabl.table>tbody>tr>td{\r" +
    "\n" +
    "          border-top:none;\r" +
    "\n" +
    "		}\r" +
    "\n" +
    "		\r" +
    "\n" +
    "		.charges-table.table>tbody>tr>th.border-top{\r" +
    "\n" +
    "		  border-top:1px solid #ddd;\r" +
    "\n" +
    "		}\r" +
    "\n" +
    "		\r" +
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
    "	}</style><div class=\"col-md-12\" style=\"padding: 0px\"><div class=\"panel panel-default\"><div class=\"panel-body table-no-padding\"><table tt-table st-table=\"offeringList\" st-safe-src=\"plansList\" st-items-by-page=\"10\" class=\"table ttui-table\"><thead class=\"table-extra-header\"><tr><th colspan=\"8\"><span class=\"table-extra-header-left\"><tt-table-filter-tags tags=\"tableCtrl.tableState.search.predicateObject\"></tt-table-filter-tags></span><span class=\"table-extra-header-right\"><a ng-show=\"tableCtrl.showActions()\" class=\"btn btn-default\" ng-click=\"example.executeAction(tableCtrl.getSelectionModel())\" href>action 1</a> <a ng-show=\"tableCtrl.showActions()\" class=\"btn btn-default\" href>action 2</a> <a ng-show=\"tableCtrl.showActions()\" class=\"btn btn-default\" href>action 3</a></span></th></tr></thead><thead class=\"main-header\"><tr><th translate=\"Offerings\">Offerings</th><th translate=\"Variant\">Variant</th><th translate=\"Allowance\">Allowance</th><th st-sort=\"charges.sumOfRC\" translate=\"Charges\">Charges</th><th></th><th></th><th></th><th></th></tr></thead><tbody ng-repeat=\"items in offeringData track by $index\"><tr ng-class=\"{'active':items.selected}\"><td ng-bind=\"::items.offering.name\" data-mobile-label=\"Offering\"></td><td><select ng-init=\"items.offering.code =items.offering.code \" ng-model=\"selectedVariant.code\" ng-options=\"variant.product.code as variant.product.name for \r" +
    "\n" +
    "							 variant in items.offering.associatedProducts.associatedProduct | filter:variant.mandatory === false\" ng-change=\"getSelectedVariant(items.offering)\"><option value=\"\">Select</option></select></td><td ng-bind=\"items.allowanceDescription\" data-mobile-label=\"Allowance\"></td><td ng-bind=\"::items.offering.charges.sumOfRC | currency  : items.offering.currency.code\"></td><td translate=\"%\">%</td><td translate=\"EMI\">EMI</td><td><a class=\"list-group-item-link\" href ng-if=\"items.selected\" ng-click=\"items.selected = !items.selected; $event.stopPropagation();\" translate=\"Select\">Selected</a> <a class=\"list-group-item-link\" href ng-if=\"!items.selected\" ng-click=\"items.selected = !items.selected; $event.stopPropagation();\" translate=\"Select\">Select</a></td><td><a class=\"list-group-item-link\" translate=\"Details\" ng-click=\"items._meta.expanded=!items._meta.expanded; getOfferingDetailsView()\">Details</a></td></tr><tr class=\"expanding-row\" ng-class=\"{'hide':!items._meta.expanded}\"><td colspan=\"8\"><div uib-collapse=\"items._meta.expanded\"><div class=\"col-sm-3 tablist plr-0\"><ul class=\"nav nav-list nav-stacked\"><li role=\"presentation\" ng-init=\"$parent.selected = 'inclusionsAllowance0'\" ng-repeat=\"tab in tabs\" ng-class=\"{'active':$parent.selected == (tab.code + $parent.$index)}\"><a href=\"\" ng-click=\"$parent.selected = (tab.code + $parent.$index);reach(111);\" translate=\"{{tab.title}}\">{{tab.title}}</a></li></ul></div><div class=\"col-sm-9 plr-0\"><div class=\"tab-content\"><div class=\"tab-pane\" ng-init=\"$parent.selected = 'inclusionsAllowance0'\" ng-repeat=\"(key, val) in tabs\" ng-class=\"{'show':$parent.selected == (val.code + $parent.$index)}\"><div class=\"col-sm-12 pr-0\"><p class=\"prodcutSummary\">{{val.summary}}</p><div class=\"col-sm-12 plr-0\" ng-show=\"key == 0\"><ul class=\"list-group table-list\"><li class=\"list-group-item\"><div class=\"col-sm-6 plr-0\"><label>BROADBAND</label><p><span>Volume</span></p></div><div class=\"col-sm-6 plr-0\"><label>Allowance</label><p><span>50 Channels</span> <span class=\"pull-right\">FULL LIST</span></p></div></li></ul></div><table class=\"table equipment-table\" ng-show=\"key == 1\"><thead><tr><th>Equipment</th><th>Make</th><th>Model</th></tr></thead><tbody><tr><td>Set Top Box First Room</td><td>Huawei</td><td>u45we</td></tr><tr><td>Wi Fi Router</td></tr><tr><td>Range Extender</td></tr></tbody></table><table class=\"table charges-table\" ng-show=\"key == 2\"><tbody><tr><td>Monthly Rental</td><td><span>%</span> MUR 345.00 /mo <span class=\"pull-right\"><s>MUR 399.00 /mo</s></span></td></tr><tr><td>Security Deposit</td><td>MUR 100.00 <span>Upfront</span></td></tr><tr><td>Insatallation Charge</td><td>MUR 100.00</td></tr><tr><th class=\"border-top\">TOTAL (incl. Tax) Upfront</th><th class=\"border-top\">MUR 140.00</th></tr><tr><th>TOTAL AMOUNT in 1st Invoice</th><th>MUR 445.00</th></tr></tbody></table><table class=\"table contractsPenalty-table\" ng-show=\"key == 3\"><tbody><tr><td>Minimum Term Contract</td><td>12 Months</td></tr><tr><td>Earliest Exit</td><td>12/12/2018</td></tr><tr><td>Contract Breach Penalty</td><td>MUR 100.00</td></tr><tr><td>Downgrading Penalty</td><td>MUR 500.00 upfront</td></tr><tr><td>Upgrading Penalty</td><td>--</td></tr><tr><td>Equipment (Not Returned/ Broken )</td><td>Show the rule of penalty if not value</td></tr><tr><td>Suspension Penalty/Rules</td><td>Allowed</td></tr><tr><td>No. of Suspensions Allowed</td><td>3</td></tr></tbody></table><table class=\"table EMIPlan-table\" ng-show=\"key == 4\"><thead><tr><th>Plan</th><th>Interest Rate</th><th>Cost</th><th>Interest</th><th>Total Payable</th><th>EMI</th><th></th></tr></thead><tbody><tr><td>3 Months EMI</td><td>12% p.a</td><td>MUR 350.00</td><td>MUR 50.00</td><td>MUR 400.00</td><td>MUR 133.00</td><td>SELECT</td></tr></tbody></table></div></div></div></div></div></td></tr></tbody></table></div><tfoot><tr><td colspan=\"8\"><div st-pagination=\"\" st-items-by-page=\"10\" st-displayed-pages=\"20\" st-template=\"scripts/ttui-table/table-pagination.tpl.html\" class=\"pull-right\"></div></td></tr></tfoot></div></div>"
  );
}]);
return angular;
})(window, window.angular);
