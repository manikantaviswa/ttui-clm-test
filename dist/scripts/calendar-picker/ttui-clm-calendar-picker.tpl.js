/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";

angular.module('TT-UI-CLM.CalendarPicker.Tpl',[]).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/calendar-picker/views/calendar-picker.tpl.html',
    "<div class=\"row\" ng-if=\"viewDate\"><div class=\"col-md-8 pr-0\" ng-if=\"events && events.length > 0\"><div class=\"input-group text-center\"><span class=\"input-group-btn\"><button class=\"btn btn-primary\" mwl-date-modifier date=\"viewDate\" decrement=\"calendarView\" type=\"button\"><span class=\"glyphicon glyphicon-chevron-left\"></span></button> </span><input type=\"text\" class=\"form-control\" ng-model=\"calendarTitle\" readonly=\"readonly\"> <span class=\"input-group-btn\"><button class=\"btn btn-primary\" mwl-date-modifier date=\"viewDate\" increment=\"calendarView\" type=\"button\"><span class=\"glyphicon glyphicon-chevron-right\"></span></button></span></div><mwl-calendar events=\"events\" view=\"calendarView\" view-title=\"calendarTitle\" view-date=\"viewDate\" on-event-click=\"eventClicked(calendarEvent)\" on-event-times-changed=\"eventTimesChanged(calendarEvent); calendarEvent.startsAt = calendarNewEventStart; calendarEvent.endsAt = calendarNewEventEnd\" day-view-start=\"00:00\" day-view-end=\"23:59\" day-view-split=\"30\" cell-auto-open-disabled=\"true\" on-timespan-click=\"timespanClicked(calendarDate, calendarCell)\" , custom-template-urls=\"{\r" +
    "\n" +
    "                calendarMonthView: 'scripts/calendar-picker/views/custom-calendar-month-view.tpl.html',\r" +
    "\n" +
    "                calendarMonthCell: 'scripts/calendar-picker/views/custom-calendar-month-cell-view.tpl.html'\r" +
    "\n" +
    "            }\"></mwl-calendar></div><div class=\"col-md-4 pl-0\"><div class=\"col-sm-12 pr-0 event-list\"><ul class=\"list-group\"><li class=\"list-group-item\" ng-repeat=\"slot in selectedSlots\" ng-click=\"onSlotClick(slot)\" ng-class=\"{'active': activeSlot === slot}\">{{slot.startsAt | date: 'hh:mm'}} - {{slot.endsAt | date: 'hh:mm'}}</li></ul></div></div></div>"
  );


  $templateCache.put('scripts/calendar-picker/views/custom-calendar-month-cell-view.tpl.html',
    "<div class=\"cal-month-day {{ day.cssClass }}\" ng-class=\"{\r" +
    "\n" +
    "        'cal-day-outmonth': !day.inMonth,\r" +
    "\n" +
    "        'cal-day-inmonth': day.inMonth,\r" +
    "\n" +
    "        'cal-day-weekend': day.isWeekend,\r" +
    "\n" +
    "        'cal-day-past': day.isPast,\r" +
    "\n" +
    "        'cal-day-today': day.isToday,\r" +
    "\n" +
    "        'cal-day-future': day.isFuture,\r" +
    "\n" +
    "        'cal-day-has-events': day.events.length > 0,\r" +
    "\n" +
    "        'cal-day-selected': vm.selectedDate === day,\r" +
    "\n" +
    "        'cal-day-open': dayIndex === vm.openDayIndex\r" +
    "\n" +
    "    }\" ng-click=\"day.events.length > 0? vm.selectedDate = day: ''\"><small class=\"cal-events-num badge badge-important pull-left\" ng-show=\"day.badgeTotal > 0 && (vm.calendarConfig.displayAllMonthEvents || day.inMonth)\" ng-bind=\"day.badgeTotal\"></small> <span class=\"pull-right\" data-cal-date ng-click=\"vm.calendarCtrl.dateClicked(day.date)\" ng-bind=\"day.label\"></span><div class=\"cal-day-tick\" ng-show=\"dayIndex === vm.openDayIndex && (vm.cellAutoOpenDisabled || vm.view[vm.openDayIndex].events.length > 0) && !vm.slideBoxDisabled\"><i class=\"glyphicon glyphicon-chevron-up\"></i> <i class=\"fa fa-chevron-up\"></i></div><ng-include src=\"vm.customTemplateUrls.calendarMonthCellEvents || vm.calendarConfig.templates.calendarMonthCellEvents\"></ng-include></div>"
  );


  $templateCache.put('scripts/calendar-picker/views/custom-calendar-month-view.tpl.html',
    "<div class=\"cal-month-box\" ng-class=\"['cal-grid-' + vm.weekDays.length]\"><div class=\"cal-row-fluid cal-row-head\"><div class=\"cal-cell1\" ng-repeat=\"day in vm.weekDays track by $index\" ng-bind=\"day | limitTo: 2\"></div></div><div ng-repeat=\"rowOffset in vm.monthOffsets track by rowOffset\" ng-mouseenter=\"rowHovered = true\" ng-mouseleave=\"rowHovered = false\"><div class=\"cal-row-fluid cal-before-eventlist\"><div ng-repeat=\"day in vm.view | calendarLimitTo:vm.weekDays.length:rowOffset track by $index\" ng-init=\"dayIndex = vm.view.indexOf(day)\" class=\"cal-cell1 cal-cell {{ day.highlightClass }}\" ng-style=\"{backgroundColor: day.backgroundColor}\" ng-click=\"vm.dayClicked(day, false, $event)\" ng-class=\"{pointer: day.events.length > 0}\"><ng-include src=\"vm.customTemplateUrls.calendarMonthCell || vm.calendarConfig.templates.calendarMonthCell\"></ng-include></div></div><mwl-calendar-slide-box is-open=\"vm.openRowIndex === $index && (vm.cellAutoOpenDisabled || vm.view[vm.openDayIndex].events.length > 0) && !vm.slideBoxDisabled\" events=\"vm.view[vm.openDayIndex].events\" on-event-click=\"vm.onEventClick\" cell=\"vm.view[vm.openDayIndex]\" custom-template-urls=\"vm.customTemplateUrls\" template-scope=\"vm.templateScope\" draggable-auto-scroll=\"vm.draggableAutoScroll\"></mwl-calendar-slide-box></div></div>"
  );
}]);
return angular;
})(window, window.angular);
