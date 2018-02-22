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
  'TT-UI-CLM.AppointmentSlotPicker.Services.FetchAppointmentAPIService'
]);

function AppointmentSlotPickerCtrl($scope, $compile, FetchAppointmentAPIService) {
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  $scope.slots = [];
  $scope.selectedSlot = [];
  
  $scope.colors = ['#ccc', '#ffa500', '#65abff', '#008000',];
  $scope.colorMeaning = ['No Slots', 'Morning Slots Free', 'Afternoon Slots Free', 'Both the slots are free']
  function getSlots() {
    return Math.floor(Math.random() * ($scope.colors.length));
  }

  for(var i=0; i<90; i++) {
    var slots = getSlots();
    console.log(slots);
    var slotObjs = [];
    switch(slots) {
      case 1: 
        slotObjs = [{time: '10:00 AM to 12:30 AM', free: 2}]
        break;
      case 2: 
        slotObjs = [{time: '02:00 AM to 4:30 AM', free: 3}]
        break;
      case 3:
        slotObjs = [{time: '10:00 AM to 12:30 AM', free: 1}, {time: '02:00 AM to 4:30 AM', free: 5}]
    };
    $scope.slots.push({
      title: 'Slot',
      allDay: true,
      start: new Date(y, m, d+i),
      rendering: 'background',
      backgroundColor: $scope.colors[slots],
      freeSlots: slotObjs
    });
  }

  $scope.selectDate = function( date, jsEvent, view ) {
    var filtered = $scope.slots.filter(function(slot) {
      return moment(slot.start).format('DD-MMM-YYYY') === moment(date.toDate()).format('DD-MMM-YYYY')
    });

    FetchAppointmentAPIService({
      installationType: "building",
      startDate: "2018-11-11T00:00:00.000Z",
      endDate: "2018-11-13T00:00:00.000Z"
    }).then(function(res) {
      debugger;
      this;
    })
    $scope.selectedSlot = [{
      title: 'Selected',
      allDay: true,
      start: date.toDate(),
      rendering: 'background',
      backgroundColor: 'dodgerblue',
      freeSlots: filtered[0].freeSlots
    }];
    console.log(filtered);
  };

  /* config object */
  $scope.uiConfig = {
    calendar:{
      editable: false,
      header:{
        left: 'title',
        center: '',
        right: 'today prev,next'
      },
      dayClick: $scope.selectDate
    }
  };
  $scope.eventSources = [$scope.slots, $scope.selectedSlot];
}

AppointmentSlotPickerCtrl.$inject = [
    '$scope',
    '$compile',
    'FetchAppointmentAPIService'
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
        templateUrl: 'scripts/appointment-slot-picker/views/appointment-slot-picker.tpl.html'
    };
});


// Source: src/scripts/appointment-slot-picker/services/fetch-appointments.api.service.js
var module = angular.module('TT-UI-CLM.AppointmentSlotPicker.Services.FetchAppointmentAPIService', [
    'TT-UI.Common'
]);

module.constant('FETCH_APPOINTMENT_API_CONFIG', {
    API_URL: 'clm-reg/rest/dataservice/:tenantId/CLM/:apiVersion/GetFreeAppointmentSlots/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

function FetchAppointmentAPIService($q, $parse, Api, ResourceFactory, API_CONFIG) {

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

FetchAppointmentAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'FETCH_APPOINTMENT_API_CONFIG'];
module.factory(FetchAppointmentAPIService.name, FetchAppointmentAPIService);

return angular;
})(window, window.angular);
