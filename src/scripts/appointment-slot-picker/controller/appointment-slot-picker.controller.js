'use strict';

var module = angular.module('TT-UI-CLM.AppointmentSlotPicker.Controllers.AppointmentSlotPickerCtrl', [
    'TT-UI-CLM.AppointmentSlotPicker.Services.FetchAppointmentsAPIService',
    'TT-UI-CLM.AppointmentSlotPicker.Services.AppointmentSlotPickerService'
]);

function AppointmentSlotPickerCtrl($scope, moment, calendarConfig, FetchAppointmentsAPIService, AppointmentSlotPickerService) {

    var appointmentSlotPickerService = new AppointmentSlotPickerService($scope.masterData);

    function loadAppointments() {
        var req = {
            // @TODO need to get it from form or some constants
            getAppointmentSlot: {
                installationType: "building",
                startDate: "2018-11-11T00:00:00.000Z",
                endDate: "2018-11-13T00:00:00.000Z"
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
    loadAppointments();

    $scope.installationTypeList = appointmentSlotPickerService.getInstallationTypes();
}

AppointmentSlotPickerCtrl.$inject = [
    '$scope',
    'moment',
    'calendarConfig',
    'FetchAppointmentsAPIService',
    'AppointmentSlotPickerService'
];
module.controller(AppointmentSlotPickerCtrl.name, AppointmentSlotPickerCtrl);
