/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";


// Source: src/scripts/appointment-slot-picker/index.js
angular.module('TT-UI-CLM.AppointmentSlotPicker', [
    'TT-UI-CLM.AppointmentSlotPicker.Directives.AppointmentSlotPicker',
]);


// Source: src/scripts/appointment-slot-picker/controller/appointment-slot-picker.controller.js
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


// Source: src/scripts/appointment-slot-picker/directives/appointment-slot-picker.directive.js
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
        controllerAs: 'AppointmentSlotPickerCtrl as vm',
        templateUrl: 'scripts/appointment-slot-picker/views/appointment-slot-picker.tpl.html'
    };
});


// Source: src/scripts/appointment-slot-picker/services/fetch-appointments.api.service.js
var module = angular.module('TT-UI-CLM.AppointmentSlotPicker.Services.FetchAppointmentsAPIService', [
    'TT-UI.Common'
]);

module.constant('FETCH_APPOINTMENT_API_CONFIG', {
    API_URL: 'clm-reg/rest/dataservice/:tenantId/CLM/:apiVersion/GetFreeAppointmentSlots/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

function FetchAppointmentsAPIService($q, $parse, Api, ResourceFactory, API_CONFIG) {

    var prepareRequest = function(payload) {
        var requestData = {
            getAppointmentSlot: {
                installationType: $parse('installationType')(payload),
                startDate: $parse('startDate')(payload),
                endDate: $parse('endDate')(payload)
            }
        };
        return requestData;
    };

    var sendRequest = function(payload){
        var apiService = new ResourceFactory(Api.getUrl(), API_CONFIG.API_URL, API_CONFIG.API_METHOD);
        return apiService.fetch(prepareRequest(payload)).$promise;
    };

    var getErrors = function(response) {

        var errors = $parse(API_CONFIG.RESPONSE_ERROR_JSON_PATH)(response);
        if (angular.isArray(errors) && errors.length){
            return $q.reject(errors.map(function(error) {
                return error.desc;
            }));
        }
        return response;
    };

    var getData = function(result) {
        return result;
    };

    return function(payload) {
        return sendRequest(payload)
            .then(getErrors)
            .then(getData);
    };

}

FetchAppointmentsAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'FETCH_APPOINTMENT_API_CONFIG'];
module.factory(FetchAppointmentsAPIService.name, FetchAppointmentsAPIService);

return angular;
})(window, window.angular);
