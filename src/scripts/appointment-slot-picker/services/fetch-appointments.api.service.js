'use strict';

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
