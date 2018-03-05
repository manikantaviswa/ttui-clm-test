/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";

angular.module('TT-UI-CLM.SelectedOfferCart.Tpl',[]).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/selected-offer-cart/views/selected-offer-cart.tpl.html',
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
    "	.selectedOfferCart .list-group {\r" +
    "\n" +
    "		margin-bottom: 0px;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.selectedOfferCart .list-group-item {\r" +
    "\n" +
    "		display: inline-block;\r" +
    "\n" +
    "		width: 100%;\r" +
    "\n" +
    "		padding: 0;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.selectedOfferCart .totalAmount {\r" +
    "\n" +
    "		padding-top: 10px;\r" +
    "\n" +
    "		font-weight: 600;\r" +
    "\n" +
    "		background-color: #fff;\r" +
    "\n" +
    "		border: 1px solid #ccc;\r" +
    "\n" +
    "		border-top: 2px solid #7d7d7d;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "\r" +
    "\n" +
    "	.selectedOfferCart .cartHeader {\r" +
    "\n" +
    "		width: 100%;\r" +
    "\n" +
    "		line-height: 40px;\r" +
    "\n" +
    "		border-bottom: 1px solid #ccc;\r" +
    "\n" +
    "		padding-left: 5px;\r" +
    "\n" +
    "		margin-bottom: 0;\r" +
    "\n" +
    "	}\r" +
    "\n" +
    "	.selectedOfferCart .removeIcon{\r" +
    "\n" +
    "	line-height: 35px;\r" +
    "\n" +
    "    margin-right: 8px;\r" +
    "\n" +
    "    text-decoration: none;\r" +
    "\n" +
    "	float: right;\r" +
    "\n" +
    "	}</style><div class=\"block block-ttui block-aside\" role=\"complementary\"><div class=\"block-heading\"><h2 class=\"block-title\"><span translate=\"Selected Offering\">Selected Offering</span> <i ng-if=\"selectedOfferItems.length > 0\" class=\"pull-right glyphicon\" ng-click=\"showCartList()\" ng-class=\"{'glyphicon-chevron-down': showPanel, 'glyphicon-chevron-right': !showPanel}\"></i></h2></div><div class=\"col-sm-12 plr-0 selectedOfferCart\"><ul class=\"list-group\" ng-if=\"selectedOfferItems.length > 0\"><li class=\"list-group-item\" ng-repeat=\"item in selectedOfferItems\"><label class=\"cartHeader\">{{item.name}} <a class=\"removeIcon glyphicon glyphicon-remove ng-scope\" aria-label=\"Remove\" ng-click=\"onRemove(item)\"></a></label><div class=\"col-sm-12\" ng-show=\"showPanel\" ng-repeat=\"payment in item.paymentDetails \"><div class=\"col-sm-12 plr-0\" ng-show=\"payment.type === 'rental'\"><div class=\"col-sm-7 text-left pl-0\">{{payment.commercialArticle.name}}</div><div class=\"col-sm-2 text-center plr-0\">{{item.currency.code}}</div><div class=\"col-sm-3 pull-right text-right plr-0\">{{payment.chargeAmount}} <span class=\"text-right pull-right\">/mo</span></div></div><div class=\"col-sm-12 plr-0\" ng-show=\"payment.type === 'oneTimeCharge'\"><div class=\"col-sm-7 text-left pl-0\">{{payment.commercialArticle.name}}</div><div class=\"col-sm-2 text-center plr-0\">{{item.currency.code}}</div><div class=\"col-sm-3 pull-right text-right plr-0\">{{payment.chargeAmount}} <span class=\"text-right pull-right\">/{{payment.collectionOption.code}}</span></div></div></div></li></ul><div class=\"col-sm-12 totalAmount\" ng-if=\"selectedOfferItems.length > 0\"><p><span class=\"font-weight-bold\">Total incl. Tax (Upfront)</span> <span class=\"pull-right font-weight-bold\">40.00 MUR</span></p><p><span class=\"font-weight-bold\">Total incl. Tax (Upfront)</span> <span class=\"pull-right font-weight-bold\">199.00 MUR</span></p></div><div class=\"col-sm-12 totalAmount\" ng-if=\"selectedOfferItems.length == 0\"><p translate=\"No offering selected yet\">No offering selected yet</p></div></div></div>"
  );
}]);
return angular;
})(window, window.angular);
