/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";

angular.module('TT-UI-CLM.AppointmentSlotPicker.Tpl',[]).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/appointment-slot-picker/views/appointment-slot-picker.tpl.html',
    "<div class=\"row\"><div class=\"col-sm-8 pr-0\"><div class=\"col-md-12 text-center clm-Calender\"><div class=\"col-sm-6 col-sm-offset-3 input-group text-center\"><span class=\"input-group-btn\"><button class=\"btn btn-primary\" mwl-date-modifier date=\"vm.viewDate\" decrement=\"vm.calendarView\" ng-click=\"vm.cellIsOpen = false\" type=\"button\"><span class=\"glyphicon glyphicon-chevron-left\"></span>&nbsp;</button> </span><input type=\"text\" class=\"form-control\" ng-model=\"vm.calendarTitle\" readonly=\"readonly\"> <span class=\"input-group-btn\"><button class=\"btn btn-primary\" mwl-date-modifier date=\"vm.viewDate\" increment=\"vm.calendarView\" ng-click=\"vm.cellIsOpen = false\" type=\"button\"><span class=\"glyphicon glyphicon-chevron-right\"></span>&nbsp;</button></span></div></div><mwl-calendar events=\"vm.events\" view=\"vm.calendarView\" view-title=\"vm.calendarTitle\" view-date=\"vm.viewDate\" on-event-click=\"vm.eventClicked(calendarEvent)\" on-event-times-changed=\"vm.eventTimesChanged(calendarEvent); calendarEvent.startsAt = calendarNewEventStart; calendarEvent.endsAt = calendarNewEventEnd\" cell-is-open=\"vm.cellIsOpen\" day-view-start=\"00:00\" day-view-end=\"23:59\" day-view-split=\"30\" cell-auto-open-disabled=\"true\" on-timespan-click=\"vm.timespanClicked(calendarDate, calendarCell)\"></mwl-calendar><div class=\"col-md-12\"><div class=\"pull-right\"><label class=\"btn btn-primary\" ng-model=\"vm.calendarView\" uib-btn-radio=\"'year'\" ng-click=\"vm.cellIsOpen = false\">Year</label><label class=\"btn btn-primary\" ng-model=\"vm.calendarView\" uib-btn-radio=\"'month'\" ng-click=\"vm.cellIsOpen = false\">Month</label><label class=\"btn btn-primary\" ng-model=\"vm.calendarView\" uib-btn-radio=\"'week'\" ng-click=\"vm.cellIsOpen = false\">Week</label><label class=\"btn btn-primary\" ng-model=\"vm.calendarView\" uib-btn-radio=\"'day'\" ng-click=\"vm.cellIsOpen = false\">Day</label></div></div></div><div class=\"col-sm-4 pl-0\"><div class=\"col-sm-12 event-Details\"><label class=\"current-Date col-sm-4\">20th</label><label class=\"current-day col-sm-4\">Tuesday</label></div><div class=\"col-sm-12 pr-0 event-list\"><ul class=\"list-group\"><li class=\"list-group-item\">Event 1</li><li class=\"list-group-item\">Dapibus ac facilisis in</li><li class=\"list-group-item\">Morbi leo risus</li><li class=\"list-group-item\">Porta ac consectetur ac</li><li class=\"list-group-item\">Vestibulum at eros</li></ul></div></div></div>"
  );
}]);
return angular;
})(window, window.angular);
