/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";

angular.module('TT-UI-CLM.FxlSelectOffering.Tpl',[]).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/fxl-select-offering/views/fxl-select-offering.tpl.html',
    "<style>.block-ttui .panel>.panel-heading {\r" +
    "\n" +
    "    border-top: none;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .badgeClose {\r" +
    "\n" +
    "    margin-left: 15px;\r" +
    "\n" +
    "    cursor: pointer;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .labelView {\r" +
    "\n" +
    "    margin-top: -15px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "  .mb-2x{\r" +
    "\n" +
    "    margin-bottom:10px;\r" +
    "\n" +
    "  }</style><uib-accordion class=\"accordion\" close-others=\"false\"><uib-accordion-group is-open=\"defaultState.showOfferingsFilter\" is-disabled=\"defaultState.hasPreselectedOffering\"><uib-accordion-heading><span ng-hide=\"defaultState.hasPreselectedOffering\"><i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': defaultState.showOfferingsFilter, 'glyphicon-chevron-right': !defaultState.showOfferingsFilter}\"></i></span></uib-accordion-heading><form class=\"form-horizontal\"><div class=\"col-sm-4\"><label translate=\"Registration of Service\">Registration of Service</label><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"service\" translate=\"Sub Service Type\">Service:</label><div class=\"col-sm-8\"><select class=\"form-control\" id=\"service\" ng-model=\"searchofferingModel.offering.ProductType\" ng-options=\"service.code as service.name for service in services\"><option value=\"\">Select</option></select></div></div><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"technology\" translate=\"Technology\">Technology:</label><div class=\"col-sm-8\"><select class=\"form-control\" id=\"technology\" ng-model=\"searchofferingModel.offering.Technology\" ng-options=\"technology.code as technology.name for technology in technologies\"><option value=\"\">Select</option></select></div></div></div><div class=\"col-sm-4\"><label>For Customer</label><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"category\" translate=\"Category\">Category:</label><div class=\"col-sm-8\"><select class=\"form-control\" id=\"customer-category\" ng-model=\"searchofferingModel.offering.CustomerCategory\" ng-options=\"customerCategory.code as customerCategory.name for customerCategory in customerCategories\" ng-change=\"getCustomerCategory(searchofferingModel.offering.CustomerCategory)\"><option value=\"\">Select</option></select></div></div><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"subcategory\" translate=\"Sub Category\">Sub Category:</label><div class=\"col-sm-8\"><select class=\"form-control\" id=\"customer-subcategory\" ng-model=\"searchofferingModel.offering.CustomerSubCategory\" ng-options=\"subCategory.code as subCategory.name for subCategory in customerSubCategoryList\"><option value=\"\">Select</option></select></div></div><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"Nationality\" translate=\"Nationality\">Nationality:</label><div class=\"col-sm-8\"><select class=\"form-control\" id=\"Nationality\" ng-model=\"searchofferingModel.offering.Nationality\" ng-options=\"nationality.code as nationality.name for nationality in nationalities\" ng-change=\"goo()\"><option value=\"\">Select</option></select></div></div></div><div class=\"col-sm-4\"><label>Plan Details</label><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"business-type\" translate=\"Business Type\">Business Type:</label><div class=\"col-sm-8\"><select class=\"form-control\" id=\"business-type\" ng-model=\"searchofferingModel.offering.BusinessType\" ng-options=\"businessType.code as businessType.name  for businessType in businessTypes\"><option value=\"\">Select</option></select></div></div><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"plan\" translate=\"Plan\">Plan:</label><div class=\"col-sm-8\"><select class=\"form-control\" id=\"plan\" ng-model=\"searchofferingModel.offering.plan\" ng-options=\"plan.code as plan.name for plan in plans\"><option value=\"\">Select</option></select></div></div></div><div class=\"col-sm-12 mb-2x\"><button type=\"button\" class=\"btn btn-primary btn-lg pull-right\" data-role=\"action\" data-action=\"submit\" ng-click=\"onSearch(searchofferingModel)\" translate=\"Search\">Search</button></div></form></uib-accordion-group><div class=\"col-sm-11 labelView\" ng-show=\"!defaultState.showOfferingsFilter\"><div class=\"col-sm-4\"><label translate=\"Service\">Service</label><p ng-hide='defaultState.isServiceRemoved ==\"ProductType\" || searchofferingModel.offering.ProductType==\"\" || searchofferingModel.offering.ProductType== undefined || searchofferingModel.offering.ProductType==null'><span class=\"badge\">{{searchofferingModel.offering.ProductType}} <span class=\"pull-right badgeClose\" ng-click=\"removeSerive('ProductType', searchofferingModel)\">x</span></span></p><p ng-hide='defaultState.isServiceRemoved ==\"Technology\" || searchofferingModel.offering.Technology==\"\" || searchofferingModel.offering.Technology==undefined || searchofferingModel.offering.Technology==null'><span class=\"badge\">{{searchofferingModel.offering.Technology}} <span class=\"pull-right badgeClose\" ng-click=\"removeSerive('Technology',searchofferingModel)\">x</span></span></p></div><div class=\"col-sm-4\"><label translate=\"Customer\">Customer</label><p><span ng-hide='defaultState.isServiceRemoved==\"CustomerCategory\"  || searchofferingModel.offering.CustomerCategory==\"\" || searchofferingModel.offering.CustomerCategory== undefined || searchofferingModel.offering.CustomerCategory==null' class=\"badge\">{{searchofferingModel.offering.CustomerCategory}} <span class=\"pull-right badgeClose\" ng-click=\"removeSerive('CustomerCategory', searchofferingModel)\">x</span> </span><span ng-hide='defaultState.isServiceRemoved==\"CustomerSubCategory\"  || searchofferingModel.offering.CustomerSubCategory==\"\" || searchofferingModel.offering.CustomerSubCategory== undefined || searchofferingModel.offering.CustomerSubCategory==null' class=\"badge\">{{searchofferingModel.offering.CustomerSubCategory}} <span class=\"pull-right badgeClose\" ng-click=\"removeSerive('CustomerSubCategory', searchofferingModel)\">x</span></span></p><p ng-hide='defaultState.isServiceRemoved==\"Nationality\" || searchofferingModel.offering.Nationality==\"\" || searchofferingModel.offering.Nationality == undefined || searchofferingModel.offering.Nationality==null'><span class=\"badge\">{{searchofferingModel.offering.Nationality}} <span class=\"pull-right badgeClose\" ng-click=\"removeSerive('Nationality', searchofferingModel)\">x</span></span></p></div><div class=\"col-sm-4\"><label translate=\"Plan\">Plan:</label><p ng-hide='defaultState.isServiceRemoved==\"BusinessType\" || searchofferingModel.offering.BusinessType==\"\" || searchofferingModel.offering.BusinessType == undefined || searchofferingModel.offering.BusinessType==null'><span class=\"badge\">{{searchofferingModel.offering.BusinessType}} <span class=\"pull-right badgeClose\" ng-click=\"removeSerive('BusinessType', searchofferingModel)\">x</span></span></p></div></div></uib-accordion>"
  );
}]);
return angular;
})(window, window.angular);
