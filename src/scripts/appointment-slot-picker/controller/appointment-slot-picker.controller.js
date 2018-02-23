'use strict';

var module = angular.module('TT-UI-CLM.AppointmentSlotPicker.Controllers.AppointmentSlotPickerCtrl', [
    'TT-UI-CLM.AppointmentSlotPicker.Services.FetchAppointmentsAPIService'
]);

function AppointmentSlotPickerCtrl($scope, moment, calendarConfig, FetchAppointmentsAPIService) {
    $scope.views = [
        { label: 'Year',    value: 'year'   },
        { label: 'Month',   value: 'month'  },
        { label: 'Week',    value: 'week'   },
        { label: 'Day',     value: 'day'    }
    ];

    $scope.calendarView = $scope.views[1].value;
    $scope.viewDate = new Date();

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
            var startDate = null;
            $scope.events = res.appointmentSlot.map(function(slot, index) {
                slot.color = calendarConfig.colorTypes.info;
                slot.title = index;
                if(!startDate || startDate > slot.startsAt) {
                    startDate = slot.startsAt;
                }
                return slot;
            });
            $scope.viewDate = startDate;
            console.log('updated');
        });
    }
    loadAppointments();

    $scope.events = [{
        color: calendarConfig.colorTypes.info,
        title: 'Event title 1',
        startsAt: moment('2018-02-26T10:00:00.000Z').toDate(),
        endsAt: moment('2018-02-26T12:30:00.000Z').toDate(),
        appointments: {
            free: 0,
            booked: 10,
            maxAllowed: 10		
        }
    }, {
        color: calendarConfig.colorTypes.warning,
        title: 'Event title 2',
        startsAt: moment('2018-02-26T14:00:00.000Z').toDate(),
        endsAt: moment('2018-02-26T16:30:00.000Z').toDate(),
        appointments: {
            free: 9,
            booked: 1,
            maxAllowed: 10		
        }
    }, {
        color: calendarConfig.colorTypes.important,
        title: 'Event title 3',
        startsAt: moment('2018-02-26T17:00:00.000Z').toDate(),
        endsAt: moment('2018-02-26T19:30:00.000Z').toDate(),
        appointments: {
            free: 5,
            booked: 5,
            maxAllowed: 10		
        }
    }];

    $scope.eventClicked = function(event) {
        console.log('Clicked', event);
    };

    $scope.timespanClicked = function(date, cell) {
        if ($scope.calendarView === 'month' && cell.events.length !== 0) {
            $scope.viewDate =  date;
        }
    };
}

AppointmentSlotPickerCtrl.$inject = [
    '$scope',
    'moment',
    'calendarConfig',
    'FetchAppointmentsAPIService'
];
module.controller(AppointmentSlotPickerCtrl.name, AppointmentSlotPickerCtrl);
