'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Services.SearchFeasibilityAPIService', [
    'TT-UI.Common'
]);

module.constant('API_CONFIG', {
    API_URL: 'clm-reg/rest/dataservice/1/CLM/1/FeasibilityCheck/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

function SearchFeasibilityAPIService($q, $parse, Api, ResourceFactory, API_CONFIG) {

    var prepareRequest = function(payload) {
        var requestData = {
            feasibilityCheck: {
                serviceNumber: $parse('serviceNumber')(payload),
                locality: $parse('locality.name')(payload),
                subLocality: $parse('subLocality.name')(payload),
                street: $parse('street.name')(payload)
            }
        };
        return requestData;
    };

    var sendRequest = function(payload){
        var apiService = ResourceFactory(Api.getUrl(), API_CONFIG.API_URL, API_CONFIG.API_METHOD);
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

SearchFeasibilityAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'API_CONFIG'];
module.factory(SearchFeasibilityAPIService.name, SearchFeasibilityAPIService);
