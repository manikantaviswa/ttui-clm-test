'use strict';

var module = angular.module('TT-UI-CLM.AppointmentSlotPicker.Controllers.AppointmentSlotPickerCtrl', [
    'TT-UI-CLM.AppointmentSlotPicker.Services.FetchAppointmentsAPIService',
    'TT-UI-CLM.AppointmentSlotPicker.Services.AppointmentSlotPickerService'
]);

function AppointmentSlotPickerCtrl($scope, $parse, moment, calendarConfig, FetchAppointmentsAPIService, AppointmentSlotPickerService) {

    var appointmentSlotPickerService = new AppointmentSlotPickerService($scope.masterData);

    function loadAppointments() {
        var fromDate = moment().startOf('day').toDate();
        var toDate = moment(fromDate).add('month', 3).toDate();
        var req = {
            // @TODO need to get it from form or some constants
            getAppointmentSlot: {
                installationType: $parse('model.installationType')($scope),
                startDate: fromDate,
                endDate: toDate
            }
        };
        new FetchAppointmentsAPIService(req).then(function(res) {
            $scope.events = res.appointmentSlot.map(function(slot, index) {
                slot.color = calendarConfig.colorTypes.info;
                slot.title = index;
                slot.startsAt = new Date(slot.startsAt)
                slot.endsAt = new Date(slot.endsAt)
                return slot;
            });
            console.log('updated');
        });
    }

    $scope.onSelectInstallationType = function() {
        loadAppointments();
    };

    $scope.installationTypeList = appointmentSlotPickerService.getInstallationTypes();
}

AppointmentSlotPickerCtrl.$inject = [
    '$scope',
    '$parse',
    'moment',
    'calendarConfig',
    'FetchAppointmentsAPIService',
    'AppointmentSlotPickerService'
];
module.controller(AppointmentSlotPickerCtrl.name, AppointmentSlotPickerCtrl);
