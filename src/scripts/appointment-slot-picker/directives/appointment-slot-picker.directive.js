'use strict';

var module = angular.module('TT-UI-CLM.AppointmentSlotPicker.Directives.AppointmentSlotPicker', [
    'TT-UI-CLM.AppointmentSlotPicker.Controllers.AppointmentSlotPickerCtrl',
    'TT-UI-CLM.AppointmentSlotPicker.Tpl',
    'TT-UI-CLM.CalendarPicker.Directives.CalendarPicker',    
]);

module.directive('appointmentSlotPicker', function() {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            // config: '=',
            masterData: '='
        },
        controller: 'AppointmentSlotPickerCtrl',
        controllerAs: 'AppointmentSlotPickerCtrl as vm',
        templateUrl: 'scripts/appointment-slot-picker/views/appointment-slot-picker.tpl.html'
    };
});
