/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";

angular.module('TT-UI-CLM.FxlSelectOffering.Tpl',[]).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/fxl-select-offering/views/fxl-select-offering.tpl.html',
    "<div class=\"panel-body forms-ttui row\"><form class=\"form-horizontal\"><div class=\"col-sm-4\"><label translate=\"Registration of Service\">Registration of Service</label><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"service\">Service:</label><div class=\"col-sm-8\"><select class=\"form-control\" id=\"service\" ng-model=\"masterdata.Technology\" ng-options=\"service.code as technology.name for service in filtersForm.serviceList\"><option value=\"\">Select</option></select></div></div><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"technology\">Technology:</label><div class=\"col-sm-8\"><select class=\"form-control\" id=\"technology\" ng-model=\"masterdata.Technology\" ng-options=\"technology.code as technology.name for technology in filtersForm.technologyList\"><option value=\"\">Select</option></select></div></div></div><div class=\"col-sm-4\"><label>For Customer</label><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"category\">category:</label><div class=\"col-sm-8\"><select class=\"form-control\" id=\"customer-category\" ng-model=\"masterdata.CustomerCategory\" ng-options=\"customerCategory.code as customerCategory.name for customerCategory in filtersForm.customerCategoryList\" ng-change=\"\"><option value=\"\">Select</option></select></div></div><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"subcategory\">Subcategory:</label><div class=\"col-sm-8\"><select class=\"form-control\" id=\"customer-subcategory\" ng-model=\"masterdata.CustomerSubCategory\" ng-options=\"subCategory.code as subCategory.name for subCategory in filtersForm.customerSubCategoryList\"><option value=\"\">Select</option></select></div></div><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"Nationality\">Nationality:</label><div class=\"col-sm-8\"><select class=\"form-control\" id=\"Nationality\" ng-model=\"masterdata.Country\" ng-options=\"country.code as country.name for country in filtersForm.countries\" ng-change=\"\"><option value=\"\">Select</option></select></div></div></div><div class=\"col-sm-4\"><label>Plan Details</label><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"business-type\">Business Type:</label><div class=\"col-sm-8\"><select class=\"form-control\" id=\"business-type\" ng-model=\"masterdata.BusinessType\" ng-options=\"businessType.code as businessType.name for businessType in\r" +
    "\n" +
    "                    filtersForm.businessTypeList\"><option value=\"\">Select</option></select></div></div><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"plan\">Plan:</label><div class=\"col-sm-8\"><select class=\"form-control\" id=\"plan\" ng-model=\"masterdata.BusinessType\" ng-options=\"businessType.code as businessType.name for businessType in\r" +
    "\n" +
    "                      filtersForm.businessTypeList\"><option value=\"\">Select</option></select></div></div></div></form></div>"
  );
}]);
return angular;
})(window, window.angular);
