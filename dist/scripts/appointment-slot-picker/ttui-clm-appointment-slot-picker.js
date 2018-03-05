/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";


// Source: src/scripts/appointment-slot-picker/index.js
angular.module('TT-UI-CLM.AppointmentSlotPicker', [
    'TT-UI-CLM.AppointmentSlotPicker.Directives.AppointmentSlotPicker',
    'TT-UI-CLM.CommonComponents'
]);


// Source: src/scripts/appointment-slot-picker/controller/appointment-slot-picker.controller.js
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


// Source: src/scripts/appointment-slot-picker/directives/appointment-slot-picker.directive.js
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


// Source: src/scripts/appointment-slot-picker/services/appointment-slot-pciker.service.js
var module = angular.module('TT-UI-CLM.AppointmentSlotPicker.Services.AppointmentSlotPickerService', [
    'TT-UI-CLM.Common.Services.CommonMasterDataResults',
    'TT-UI-CLM.Common.Services.Config'
]);

function AppointmentSlotPickerFactory($parse, CommonMasterDataResults, COMMON_MASTER_CONFIG) {

    function AppointmentSlotPickerService(masterData) {
        this.masterDataResults = CommonMasterDataResults.getMasterDataResults(masterData);
    }

    AppointmentSlotPickerService.prototype.getInstallationTypes = function(){
        return this.masterDataResults[COMMON_MASTER_CONFIG.INSTALLATION_TYPES];
    };
    return AppointmentSlotPickerService;
}
AppointmentSlotPickerFactory.$inject = ['$parse', 'CommonMasterDataResults', 'COMMON_MASTER_CONFIG']
module.factory('AppointmentSlotPickerService', AppointmentSlotPickerFactory);


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
