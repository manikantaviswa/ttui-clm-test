/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";

angular.module('TT-UI-CLM.FeasibilityCheck.Tpl',[]).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/feasibility-check/views/feasibility-check.tpl.html',
    "<div class=\"form-horizontal-ttui\" spinner-inside><div class=\"panel panel-ttui\" ng-form=\"form.localityCheck\"><div class=\"panel-body forms-ttui row\"><p class=\"col-sm-12\"><strong translate=\"Enter exact address of installation to check feasibility\">Enter exact address of installation to check feasibility</strong></p><div class=\"col-sm-6\"><div class=\"form-group\" ng-class=\"{'is-required': isRequired('locality'), 'has-error': requiredValidity('localityCheck', 'locality', model.locality.locality)}\"><label for=\"lacality\" class=\"col-sm-4 control-label\" translate=\"Locality\">Locality</label><div class=\"control-content col-sm-8\"><ui-select id=\"city\" name=\"locality\" ng-attr-required=\"{{isRequired('locality')}}\" theme=\"bootstrap\" ng-model=\"model.locality.locality\" append-to-body=\"true\" on-select=\"onSelectLocality($event, $item)\"><ui-select-match placeholder=\"Select / Search Localities\">{{$select.selected.name}}</ui-select-match><ui-select-choices repeat=\"locality.code as locality in localities | filter: {name: $select.search}\"><span ng-bind-html=\"locality.name | highlight: $select.search\"></span></ui-select-choices></ui-select><span class=\"help-block\" ng-show=\"requiredValidity('localityCheck', 'locality', model.locality.locality)\">This field is required</span></div></div><div class=\"form-group\" ng-class=\"{'is-required': isRequired('subLocality'), 'has-error': requiredValidity('localityCheck', 'subLocality', model.locality.subLocality)}\"><label for=\"lacality\" class=\"col-sm-4 control-label\" translate=\"Sub Locality\">Sub Locality</label><div class=\"control-content col-sm-8\"><ui-select id=\"city\" name=\"subLocality\" ng-attr-required=\"{{isRequired('subLocality')}}\" theme=\"bootstrap\" ng-model=\"model.locality.subLocality\" append-to-body=\"true\" on-select=\"onSelectSubLocality($event, $item)\"><ui-select-match placeholder=\"Select / Search Sub Localities\">{{$select.selected.name}}</ui-select-match><ui-select-choices repeat=\"sl.code as sl in subLocalities | filter: {name: $select.search}\"><span ng-bind-html=\"sl.name | highlight: $select.search\"></span></ui-select-choices></ui-select><span class=\"help-block\" ng-show=\"requiredValidity('localityCheck', 'subLocality', model.locality.subLocality)\">This field is required</span></div></div><div class=\"form-group\" ng-class=\"{'is-required': isRequired('street'), 'has-error': requiredValidity('localityCheck', 'street', model.locality.street)}\"><label for=\"street\" class=\"col-sm-4 control-label\" translate=\"Street\">Street</label><div class=\"control-content col-sm-8\"><ui-select id=\"city\" name=\"street\" ng-attr-required=\"{{isRequired('street')}}\" theme=\"bootstrap\" ng-model=\"model.locality.street\" append-to-body=\"true\" on-select=\"onSelectStreet($event, $item)\"><ui-select-match placeholder=\"Select / Search Street\">{{$select.selected.name}}</ui-select-match><ui-select-choices repeat=\"st.code as st in streets | filter: {name: $select.search}\"><span ng-bind-html=\"st.name | highlight: $select.search\"></span></ui-select-choices></ui-select><span class=\"help-block\" ng-show=\"requiredValidity('localityCheck', 'street', model.locality.street)\">This field is required</span></div></div><div class=\"form-group\"><label for=\"street\" class=\"col-sm-4 control-label\"></label><div class=\"control-content col-sm-8\"><button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"localityCheck.$invalid\" ng-click=\"checkAddressFeasibility(false)\">Check Feasibility</button></div></div></div><div class=\"col-sm-6\" ng-if=\"checkResult.localityCheck\"><div class=\"feasibility-check-result\"><div class=\"row\"><div class=\"col-xs-2\"><span class=\"glyphicon glyphicon-ok-sign\" style=\"font-size: 24px\"></span></div><div class=\"col-xs-10\"><div>The address &lt; <em>{{getItemByCode(localities, checkResult.locality.locality).name}}, {{getItemByCode(subLocalities, checkResult.locality.subLocality).name}}, {{getItemByCode(streets, checkResult.locality.street).name}}&gt;</em></div><p><strong>Has {{checkResult.technology}} Feasibility</strong></p><div>MDF: {{checkResult.MDF || \"--unknown--\"}}</div><div>Cabinet: {{checkResult.cabinet || \"--unknown--\"}}</div><div>FDP: {{checkResult.FDP || \"--unknown--\"}}</div></div></div></div></div></div></div><div class=\"panel panel-ttui\" ng-form=\"form.serviceNumCheck\"><div class=\"panel-body forms-ttui row\"><div class=\"col-sm-6 clearfix\"><p class=\"text-center\"><strong>------ Or ------</strong></p></div><p class=\"col-sm-12\"><strong translate=\"Enter your Fixed line or your Neighbour's Fixed Line Number\">Enter your Fixed line or your Neighbour's Fixed Line Number</strong></p><div class=\"col-sm-6\"><div class=\"form-group\" ng-class=\"{'is-required': isRequired('serviceNumber'), 'has-error': requiredValidity('serviceNumCheck', 'serviceNumber', model.serviceNumber)}\"><label class=\"col-sm-4 control-label\" translate=\"Fixed Line Number\">Fixed Line Number</label><div class=\"control-content col-sm-8\"><input type=\"text\" minlength=\"{{validators.serviceNumber.minLength}}\" maxlength=\"{{validators.serviceNumber.maxLength}}\" name=\"serviceNumber\" ng-model=\"model.serviceNumber\" ng-attr-required=\"{{isRequired('serviceNumber')}}\" class=\"form-control\"> <span class=\"help-block\" ng-show=\"requiredValidity('serviceNumCheck', 'serviceNumber', model.serviceNumber) && form.serviceNumCheck.serviceNumber.$error.required\">This field is required </span><span class=\"help-block\" ng-show=\"requiredValidity('serviceNumCheck', 'serviceNumber', model.serviceNumber) && form.serviceNumCheck.serviceNumber.$error.minlength\">Invalid fixed line number</span></div></div><div class=\"form-group\"><label for=\"street\" class=\"col-sm-4 control-label\"></label><div class=\"control-content col-sm-8\"><button type=\"button\" class=\"btn btn-primary\" ng-click=\"checkAddressFeasibility(true)\">Check Feasibility</button></div></div></div><div class=\"col-sm-6\" ng-if=\"checkResult.serviceNumberCheck\"><div class=\"feasibility-check-result\"><div class=\"row\"><div class=\"col-xs-2\"><span class=\"glyphicon glyphicon-ok-sign\" style=\"font-size: 24px\"></span></div><div class=\"col-xs-10\"><div>The fixed line number &lt; <em>{{checkResult.serviceNumber}} &gt;</em></div><p><strong>Has {{checkResult.technology}} Feasibility</strong></p><div>MDF: {{checkResult.MDF || \"--unknown--\"}}</div><div>Cabinet: {{checkResult.cabinet || \"--unknown--\"}}</div><div>FDP: {{checkResult.FDP || \"--unknown--\"}}</div></div></div></div></div></div></div></div>"
  );
}]);
return angular;
})(window, window.angular);
