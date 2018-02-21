'use strict';

var module = angular.module('TT-UI-CLM.SelectedOfferings.Services.SelectedOfferingsAPIService', [
    'TT-UI.Common'
]);

module.constant('API_CONFIG', {
    API_URL: 'http://10.2.53.113/upc/rest/dataservice/1/UPC/1.1/ListOfVASRequest/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

function SelectOfferingPlanAPIService($q, $parse, Api, ResourceFactory, API_CONFIG) {

    var prepareRequest = function (payload) {
        var requestData = {
            "offering": {
                "filters": {
                  "filter": [
                    {
                      "key": "SalesChannel",
                      "value": "CLM"
                    },
                    {
                      "value": "GSM",
                      "key": "LoB"
                    },
                    {
                      "value": "GSM",
                      "key": "disableService"
                    },
                    {
                      "value": "I",
                      "key": "CustomerType"
                    },
                    {
                      "value": "Postpaid",
                      "key": "BusinessType"
                    },
                    {
                      "value": "MU",
                      "key": "Country"
                    },
                    {
                      "value": "Voice",
                      "key": "ProductType"
                    },
                    {
                      "value": "S2",
                      "key": "State"
                    },
                    {
                      "value": "L19",
                      "key": "City"
                    },
                    {
                      "value": "POSTPLANO07",
                      "key": "planOfferingCode"
                    },
                    {
                      "value": "Generic",
                      "key": "OfferingSubCategory"
                    }
                  ]
                }
              }
        };
        return requestData;
    };

    var sendRequest = function (payload) {
        var apiService = ResourceFactory(Api.getUrl(), API_CONFIG.API_URL, API_CONFIG.API_METHOD);
        return apiService.fetch(prepareRequest(payload)).$promise;
    };

    var getErrors = function (response) {

        var errors = $parse(API_CONFIG.RESPONSE_ERROR_JSON_PATH)(response);
        if (angular.isArray(errors) && errors.length) {
            return $q.reject(errors.map(function (error) {
                return error.desc;
            }));
        }
        return response;
    };

    var getData = function (result) {
        return result;
    };

    return function (payload) {
        return sendRequest(payload)
            .then(getErrors)
            .then(getData);
    };

}

SelectOfferingPlanAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'API_CONFIG'];
module.factory(SelectOfferingPlanAPIService.name, SelectOfferingPlanAPIService);
