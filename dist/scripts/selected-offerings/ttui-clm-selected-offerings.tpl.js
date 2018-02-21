/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";

angular.module('undefined',[]).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/selected-offerings/views/selected-offerings.tpl.html',
    "<style>/* Style the tab content */\r" +
    "\n" +
    "	/*Reset Padding*/\r" +
    "\n" +
    "	.pl-0 {\r" +
    "\n" +
    "		padding-left: 0\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	.pr-0 {\r" +
    "\n" +
    "		padding-right: 0\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	.plr-0 {\r" +
    "\n" +
    "		padding-left: 0;\r" +
    "\n" +
    "		padding-right: 0;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	.bt-1x {\r" +
    "\n" +
    "		border-top: 1px solid #ddd;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	.pt-5x {\r" +
    "\n" +
    "		padding-top: 5px;\r" +
    "\n" +
    "	}\r" +
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
    "	.table-list {\r" +
    "\n" +
    "		float: left;\r" +
    "\n" +
    "		width: 100%;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	.table-list li {\r" +
    "\n" +
    "		float: left;\r" +
    "\n" +
    "		width: 100%;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	.table-list li.list-group-item {\r" +
    "\n" +
    "		border: none;\r" +
    "\n" +
    "		border-bottom: 1px solid #ddd;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	.show-table {\r" +
    "\n" +
    "		display: table\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	.selectOffering table>tbody>tr.expanding-row.show-row {\r" +
    "\n" +
    "		display: table-row\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	;\r" +
    "\n" +
    "	.ttui-table.ttui-table>tbody>tr.expanding-row>td .table>tbody {\r" +
    "\n" +
    "		background: transparent !important;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	.selectOffering table>tbody>tr.expanding-row.show-row .table {\r" +
    "\n" +
    "		background: transparent !important;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	.equipment-table.table>tbody>tr>td {\r" +
    "\n" +
    "		border-top: none;\r" +
    "\n" +
    "	}\r" +
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
    "	.charges-table.table>tbody>tr>th.border-top {\r" +
    "\n" +
    "		border-top: 1px solid #ddd;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	/* Style the tab */\r" +
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
    "	.selectOffering table.ttui-table.table.show {\r" +
    "\n" +
    "		display: table !important;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	.selectOffering table>tbody>tr.expanding-row {\r" +
    "\n" +
    "		display: none;\r" +
    "\n" +
    "	}</style><div class=\"col-md-12\" style=\"padding: 0px\">{{masterData}}</div>"
  );
}]);
return angular;
})(window, window.angular);
