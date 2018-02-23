'use strict';

var module = angular.module('TT-UI-CLM.FeasibilityCheck.Services.FeasibilityCheckAPIService', [
    'TT-UI.Common'
]);

module.constant('FEASIBILITY_CHECK_API_CONFIG', {
    API_URL: 'clm-reg/rest/dataservice/:tenantId/CLM/:apiVersion/FeasibilityCheck/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

function FeasibilityCheckAPIService($q, $parse, Api, ResourceFactory, API_CONFIG) {

    var prepareRequest = function(payload) {
        var requestData = {
            feasibilityCheck: {
                serviceNumber: $parse('serviceNumber')(payload),
                locality: $parse('locality')(payload),
                subLocality: $parse('subLocality')(payload),
                street: $parse('street')(payload)
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

FeasibilityCheckAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'FEASIBILITY_CHECK_API_CONFIG'];
module.factory(FeasibilityCheckAPIService.name, FeasibilityCheckAPIService);
