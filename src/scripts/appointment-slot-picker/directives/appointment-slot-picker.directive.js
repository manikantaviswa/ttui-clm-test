'use strict';

var module = angular.module('TT-UI-CLM.AppointmentSlotPicker.Directives.AppointmentSlotPicker', [
    'TT-UI-CLM.AppointmentSlotPicker.Controllers.AppointmentSlotPickerCtrl',
    'TT-UI-CLM.AppointmentSlotPicker.Tpl',
    'mwl.calendar'
]);

module.directive('appointmentSlotPicker', function() {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            // config: '=',
            masterData: '=',
            onSearch: '&'
        },
        controller: 'AppointmentSlotPickerCtrl',
        templateUrl: 'scripts/appointment-slot-picker/views/appointment-slot-picker.tpl.html'
    };
});
