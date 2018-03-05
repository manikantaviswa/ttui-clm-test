/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";


// Source: src/scripts/selected-offer-cart/index.js
angular.module('TT-UI-CLM.SelectedOfferCart',[
    'TT-UI-CLM.SelectedOfferCart.Directives.SelectedOfferCart',
])


// Source: src/scripts/selected-offer-cart/controller/selected-offer-cart.controller.js
var module = angular.module('TT-UI-CLM.SelectedOfferCart.Controllers.SelectedOfferCartCtrl', [
  
])

function SelectedOfferCartCtrl($scope, $parse,$rootScope) {
  $scope.testMsg ="cart";
  $scope.selectedOfferItems={}; 
  $scope.showPanel = false;  
  $scope.selectedOfferItems = $scope.selectedOffering;
  $scope.showCartList = function (){
    $scope.showPanel = !$scope.showPanel;
  }
  $scope.onRemove = function(){

  }
  // $rootScope.$on('selectedOfferItem',function(event,data){
  //   $scope.itemsSelected = data;
  // })

}

SelectedOfferCartCtrl.$inject = [
	'$scope','$parse','$rootScope' 
]
module.controller(SelectedOfferCartCtrl.name, SelectedOfferCartCtrl)

// Source: src/scripts/selected-offer-cart/directives/selected-offer-cart.directive.js
var module = angular.module('TT-UI-CLM.SelectedOfferCart.Directives.SelectedOfferCart',[
    'TT-UI-CLM.SelectedOfferCart.Controllers.SelectedOfferCartCtrl',
    'TT-UI-CLM.SelectedOfferCart.Tpl',
    'ngSanitize'
])

module.directive('selectedOfferCart',function(){
    return{
        restrict:'EA',
        templateUrl:'scripts/selected-offer-cart/views/selected-offer-cart.tpl.html',
        controller:'SelectedOfferCartCtrl',
        scope:{
            selectedOffering: '=',
            masterData: '=',
            defaultState:'='
        }
    }
})

// Source: src/scripts/selected-offer-cart/services/selected-offer-cart-api.service.js
var module = angular.module('TT-UI-CLM.selectedOfferCart.Services.selectedOfferCartAPIService', [
    'TT-UI.Common'
]);

module.constant('SELECTED_OFFERING_CART_API_CONFIG', {
    API_URL: 'http://10.2.53.113/upc/rest/dataservice/1/UPC/1.1/GetOfferingDetailsWithTaxRequest/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

function selectedOfferCartAPIService($q, $parse, Api, ResourceFactory, API_CONFIG) {

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

selectedOfferCartAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'SELECTED_OFFERING_CART_API_CONFIG'];
module.factory(selectedOfferCartAPIService.name, selectedOfferCartAPIService);
return angular;
})(window, window.angular);
