'use strict';

var module = angular.module('TT-UI-CLM.CalendarPicker.Controllers.CalendarPickerCtrl', []);

function CalendarPickerCtrl($scope, moment) {

    $scope.views = [
        { label: 'Year',    value: 'year'   },
        { label: 'Month',   value: 'month'  },
        { label: 'Week',    value: 'week'   },
        { label: 'Day',     value: 'day'    }
    ];

    $scope.calendarView = $scope.views[1].value;

    // Update view date
    $scope.viewDate = new Date();
    $scope.$watch('events', function(newVal, oldVal) {
        if (newVal && newVal.length > 0) {
            $scope.viewDate = new Date(newVal[0].startsAt);
            $scope.selectedSlots = [];
            $scope.selectedSlots.push(newVal[0]);
        } else {
            $scope.viewDate = new Date();
        }
    });

    $scope.timespanClicked = function(date, cell) {
        if ($scope.calendarView === 'month' && cell.events.length !== 0) {
            $scope.viewDate = date;
            $scope.selectedSlots = cell.events;
        }
    };

    $scope.onSlotClick = function(slot) {
        $scope.activeSlot = slot;
    }

    $scope.isViewDate = function(day) {
        debugger;
        $scope;
    }
}

CalendarPickerCtrl.$inject = [
    '$scope',
    'moment'
];
module.controller(CalendarPickerCtrl.name, CalendarPickerCtrl);
