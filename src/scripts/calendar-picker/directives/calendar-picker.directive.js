'use strict';

var module = angular.module('TT-UI-CLM.CalendarPicker.Directives.CalendarPicker', [
    'TT-UI-CLM.CalendarPicker.Controllers.CalendarPickerCtrl',
    'TT-UI-CLM.CalendarPicker.Tpl',
    'mwl.calendar'
]);

module.directive('calendarPicker', function() {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            events: '=',
            masterData: '=',
            onSearch: '&'
        },
        controller: 'CalendarPickerCtrl',
        controllerAs: 'CalendarPickerCtrl as vm',
        templateUrl: 'scripts/calendar-picker/views/calendar-picker.tpl.html'
    };
});
