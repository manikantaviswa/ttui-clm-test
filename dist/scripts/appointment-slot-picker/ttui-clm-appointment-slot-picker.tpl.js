/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";

angular.module('TT-UI-CLM.AppointmentSlotPicker.Tpl',[]).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/appointment-slot-picker/views/appointment-slot-picker.tpl.html',
    "<div class=\"row\"><div class=\"col-sm-8 pr-0\"><div class=\"col-md-12 text-center clm-Calender\"><div class=\"col-sm-6 col-sm-offset-3 input-group text-center\"><span class=\"input-group-btn\"><button class=\"btn btn-primary\" mwl-date-modifier date=\"viewDate\" decrement=\"calendarView\" ng-click=\"cellIsOpen = false\" type=\"button\"><span class=\"glyphicon glyphicon-chevron-left\"></span>&nbsp;</button> </span><input type=\"text\" class=\"form-control\" ng-model=\"calendarTitle\" readonly=\"readonly\"> <span class=\"input-group-btn\"><button class=\"btn btn-primary\" mwl-date-modifier date=\"viewDate\" increment=\"calendarView\" ng-click=\"cellIsOpen = false\" type=\"button\"><span class=\"glyphicon glyphicon-chevron-right\"></span>&nbsp;</button></span></div></div><mwl-calendar events=\"events\" view=\"calendarView\" view-title=\"calendarTitle\" view-date=\"viewDate\" on-event-click=\"eventClicked(calendarEvent)\" on-event-times-changed=\"eventTimesChanged(calendarEvent); calendarEvent.startsAt = calendarNewEventStart; calendarEvent.endsAt = calendarNewEventEnd\" cell-is-open=\"cellIsOpen\" day-view-start=\"00:00\" day-view-end=\"23:59\" day-view-split=\"30\" cell-auto-open-disabled=\"true\" on-timespan-click=\"timespanClicked(calendarDate, calendarCell)\"></mwl-calendar><div class=\"col-md-12\"><div class=\"pull-right\"><label ng-repeat=\"view in views\" class=\"btn btn-primary\" ng-model=\"calendarView\" uib-btn-radio=\"view.value\" ng-click=\"cellIsOpen = false\">{{view.value}}</label></div></div></div><div class=\"col-sm-4 pl-0\"><div class=\"col-sm-12 event-Details\"><label class=\"current-Date col-sm-4\">{{viewDate}}</label><label class=\"current-day col-sm-4\">Tuesday</label></div><div class=\"col-sm-12 pr-0 event-list\"><ul class=\"list-group\"><li class=\"list-group-item\">Event 1</li><li class=\"list-group-item\">Dapibus ac facilisis in</li><li class=\"list-group-item\">Morbi leo risus</li><li class=\"list-group-item\">Porta ac consectetur ac</li><li class=\"list-group-item\">Vestibulum at eros</li></ul></div></div></div>"
  );
}]);
return angular;
})(window, window.angular);
