'use strict';

var module = angular.module('TT-UI-CLM.SelectPlanOffering.Services.SelectOfferingPlanAPIService', [
    'TT-UI.Common'
]);

module.constant('API_CONFIG', {
    API_URL: 'http://10.2.53.113/upc/rest/dataservice/1/UPC/1.1/GetOfferingDetailsWithTaxRequest/json/query',
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
                            "key": "oid",
                            "value": "58d905958cd213ced660bf4e"
                        },
                        {
                            "key": "BusinessType",
                            "value": "Postpaid"
                        },
                        {
                            "key": "salesChannel",
                            "value": "CLM"
                        },
                        {
                            "key": "LoB",
                            "value": "GSM"
                        },
                        {
                            "key": "ProductType",
                            "value": "Voice"
                        },
                        {
                            "key": "Technology",
                            "value": "GSM"
                        },
                        {
                            "key": "CustomerType",
                            "value": "I"
                        },
                        {
                            "key": "Country",
                            "value": "CI"
                        },
                        {
                            "key": "State",
                            "value": "GM"
                        },
                        {
                            "key": "City",
                            "value": "78"
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
