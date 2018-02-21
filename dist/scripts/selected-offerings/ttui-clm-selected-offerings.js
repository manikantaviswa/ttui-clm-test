/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";


// Source: src/scripts/selected-offerings/index.js
angular.module('TT-UI-CLM.SelectedOfferings',[
    'TT-UI-CLM.SelectedOfferings.Directives.SelectedOfferings',
])


// Source: src/scripts/selected-offerings/controller/select-offerings.controller.js
var module = angular.module('TT-UI-CLM.SelectPlanOffering.Controllers.SelectedOfferingsCtrl', [
    
])

function SelectedOfferingsCtrl($scope, $parse) {
    $scope.selectedVariant = {
        code: ""
    };
    $scope.selectAllowance = "";
}

SelectedOfferingsCtrl.$inject = [
	'$scope',
    '$parse'
    
]
module.controller(SelectedOfferingsCtrl.name, SelectedOfferingsCtrl)

// Source: src/scripts/selected-offerings/directives/select-offerings.directive.js
var module = angular.module('TT-UI-CLM.SelectedOfferings.Directives.SelectedOfferings',[
    'TT-UI-CLM.SelectedOfferings.Controllers.SelectPlanOfferingCtrl',
    'TT-UI-CLM.SelectedOfferings.Tpl',
    'ngSanitize'
])

module.directive('selectedOfferings',function(){
    return{
        restrict:'EA',
        templateUrl:'scripts/selected-offerings/views/selected-offerings.tpl.html',
        controller:'SelectedOfferingsCtrl',
        scope:{
            selectedOfferingData: '=',
            masterData: '=',
        }
    }
})

// Source: src/scripts/selected-offerings/services/select-offerings-api.service.js
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

return angular;
})(window, window.angular);
