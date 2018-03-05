/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";

angular.module('TT-UI-CLM.AppointmentSlotPicker.Tpl',[]).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/appointment-slot-picker/views/appointment-slot-picker.tpl.html',
    "<div ng-form=\"appointment-form\" class=\"row\"><div class=\"col-sm-7\"><div class=\"row form-horizontal form-horizontal-ttui\"><div class=\"col-md-12\"><div class=\"form-group\"><label for=\"installation-type\" class=\"col-sm-4 control-label\">Installation Type</label><div class=\"control-content col-sm-2\"><select class=\"form-control\" name=\"installationType\" id=\"installation-type\" ng-model=\"model.installationType\" ng-options=\"installationType.code as installationType.name for installationType in installationTypeList\" ng-change=\"onSelectInstallationType()\"><option value=\"\">Select</option></select></div></div></div><div class=\"col-md-12\"><calendar-picker config=\"config\" model=\"model\" master-data=\"masterData\" events=\"events\"></calendar-picker></div></div></div><div class=\"col-sm-5\"><div class=\"appointment-info-panel form-horizontal form-horizontal-ttui\"><div class=\"form-group form-group-summary\"><label class=\"col-sm-4 control-label grayText\" translate=\"Appointment\">Appointment</label><div class=\"control-content col-sm-2\">{{selectedAppointment.startsAt}}</div></div><div class=\"form-group form-group-summary\"><label class=\"col-sm-4 control-label grayText\" translate=\"Time\">Time</label><div class=\"control-content col-sm-2\">{{selectedAppointment.endsAt}}</div></div><div class=\"form-group\"><label for=\"remarks\" class=\"col-sm-12 control-label\" translate=\"Installation Remarks\">Installation Remarks</label><div class=\"col-sm-12\"><textarea class=\"form-control\" id=\"remarks\" name=\"remarks\" ng-model=\"model.remarks\" maxlength=\"1000\" rows=\"6\"></div></div></div></div></div>"
  );
}]);
return angular;
})(window, window.angular);
