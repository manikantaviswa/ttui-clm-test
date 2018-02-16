'use strict';

var module = angular.module('TT-UI-CLM.FxlSelectOffering.Services.ListOfFxlPlansRequestAPIService', [
]);

module.constant('API_CONFIG', {
    API_URL: 'upc/rest/dataservice/1/UPC/1.2/ListOfFxlPlansRequest/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

function ListOfFxlPlansRequestAPIService($q, $parse, Api, ResourceFactory, API_CONFIG) {



    var sendRequest = function(requestPayload){
        var apiService = ResourceFactory(Api.getUpcUrl(), API_CONFIG.API_URL, API_CONFIG.API_METHOD);
        return apiService.fetch(requestPayload).$promise;
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

    return function(requestPayload) {
        return sendRequest(requestPayload)
            .then(getErrors)
            .then(getData);
    };

}

ListOfFxlPlansRequestAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'API_CONFIG'];
module.factory(ListOfFxlPlansRequestAPIService.name, ListOfFxlPlansRequestAPIService);
