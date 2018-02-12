'use strict';

var module = angular.module('TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingAPIService', [
]);

module.constant('API_CONFIG', {
    API_URL: 'clm-reg/rest/dataservice/1/CLM/1/FeasibilityCheck/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

/*function SearchFeasibilityAPIService($q, $parse, Api, ResourceFactory, API_CONFIG) {

    var prepareRequest = function(msisdn) {
        var requestData = {
            'service':{
                'key': 'MSISDN',
                'value': msisdn
            }
        };
        return requestData;
    };

    var sendRequest = function(msisdn){
        var apiService = ResourceFactory(Api.getUrl(), API_CONFIG.API_URL, API_CONFIG.API_METHOD);
        return apiService.fetch(prepareRequest(msisdn)).$promise;
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

    return function(msisdn) {
        return sendRequest(msisdn)
            .then(getErrors)
            .then(getData);
    };

}

SearchFeasibilityAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'API_CONFIG'];
module.factory(SearchFeasibilityAPIService.name, SearchFeasibilityAPIService);
*/