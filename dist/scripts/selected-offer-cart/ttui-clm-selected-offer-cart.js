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
var module = angular.module('TT-UI-CLM.SelectedOfferCart.Controllers.SelectedOfferCartCtrl', [])

function SelectedOfferCartCtrl($scope, $parse, $rootScope) {
  $scope.selectedOfferItems = [];
  $scope.showPanel = true;
  $scope.showCartList = function () {
    $scope.showPanel = !$scope.showPanel;
  }
  $scope.onRemove = function (item) {
    var index = $scope.selectedOfferItems.indexOf(item);
    $scope.selectedOfferItems.splice(index, 1);
  }

  $scope.payments = {
    "payment": {
      "currency": "MUR",
      "charges": [
        {
          "chargeAmount": 90,
          "refundable": false,
          "overrideCharge": false,
          "taxAmount": 27,
          "billingPeriod": {
            "code": "LifeLong"
          },
          "invalid": true,
          "taxable": true,
          "startAfter": 1,
          "periodicity": 1,
          "chargeMaster": {
            "code": "Rental"
          },
          "commercialArticle": {
            "name": "Monthly Rentals",
            "code": "1999000092"
          },
          "chargeType": {
            "code": "Fixed"
          },
          "taxPolicy": {
            "name": "VAT PLAN GROUP",
            "code": "VATG"
          },
          "conditionalPricings": {
            "conditionalPricing": [
              {
                "chargeAmount": 90,
                "taxAmount": 27,
                "segments": {
                  "segment": [
                    {
                      "name": "I",
                      "code": "I"
                    }
                  ]
                }
              }
            ]
          },
          "type": "rental",
          "taxRate": 27,
          "isUpfrontCharge": false,
          "isRecurringCharge": true
        }, {
          "chargeAmount": 0,
          "refundable": false,
          "taxable": true,
          "chargeMaster": {
            "code": "OneTimeCharge"
          },
          "overrideCharge": false,
          "taxAmount": 0,
          "installmentApplicable": false,
          "applyChargeOn": {
            "code": "Both"
          },
          "isConditionalPricing": true,
          "collectionOption": {
            "code": "Upfront"
          },
          "chargeType": {
            "code": "Charge"
          },
          "commercialArticle": {
            "name": "ADVANCE RENTAL INCOME FOR CB1",
            "code": "T_ARI00901"
          },
          "taxPolicy": {
            "name": "NIL TAX FORMULA",
            "code": "NILT"
          },
          "reflectInInvoice": true,
          "conditionalPricings": {
            "conditionalPricing": [
              {
                "chargeAmount": 1000,
                "taxAmount": 0,
                "nationality": {
                  "name": "Citizen",
                  "code": "Citizen"
                },
                "segments": {
                  "segment": [
                    {
                      "name": "I",
                      "code": "I"
                    }
                  ]
                }
              }, {
                "chargeAmount": 5000,
                "nationality": {
                  "name": "Foreigner",
                  "code": "Foreigner"
                },
                "segments": {
                  "segment": [
                    {
                      "name": "I",
                      "code": "I"
                    }
                  ]
                }
              }, {
                "chargeAmount": 2000,
                "segments": {
                  "segment": [
                    {
                      "name": "B",
                      "code": "B"
                    }
                  ]
                }
              }, {
                "chargeAmount": 0,
                "segments": {
                  "segment": [
                    {
                      "name": "embassy",
                      "code": "embassy"
                    }
                  ]
                }
              }
            ]
          },
          "type": "oneTimeCharge",
          "taxRate": 0,
          "isUpfrontCharge": true,
          "isRecurringCharge": false
        }
      ],
      "discounts": {},
      "payments": {
        "onetime": [
          {
            "commercialArticle": "T_ARI00901",
            "chargeType": "OneTimeCharge",
            "amount": 0,
            "discountPercentage": 0,
            "discountedAmount": 0,
            "taxRate": 0,
            "tax": 0,
            "netAmount": 0
          }
        ],
        "monthly": [
          {
            "commercialArticle": "1999000092",
            "chargeType": "Rental",
            "amount": 90,
            "discountPercentage": 0,
            "discountedAmount": 90,
            "taxRate": 27,
            "tax": 27,
            "netAmount": 117
          }
        ],
        "upfront": [
          {
            "commercialArticle": "T_ARI00901",
            "chargeType": "OneTimeCharge",
            "amount": 0,
            "discountPercentage": 0,
            "discountedAmount": 0,
            "taxRate": 0,
            "tax": 0,
            "netAmount": 0
          }
        ],
        "billing": [
          {
            "commercialArticle": "1999000092",
            "chargeType": "Rental",
            "amount": 90,
            "discountPercentage": 0,
            "discountedAmount": 90,
            "taxRate": 27,
            "tax": 27,
            "netAmount": 117
          }
        ]
      },
      "totals": {
        "onetime": {
          "amount": 0,
          "discountedAmount": 0,
          "tax": 0,
          "netAmount": 0
        },
        "monthly": {
          "amount": 90,
          "discountedAmount": 90,
          "tax": 27,
          "netAmount": 117
        },
        "upfront": {
          "amount": 0,
          "discountedAmount": 0,
          "tax": 0,
          "netAmount": 0
        },
        "billing": {
          "amount": 90,
          "discountedAmount": 90,
          "tax": 27,
          "netAmount": 117
        },
        "listPrice": 0
      }
    }
  }
  $rootScope.$on('selectedOfferItem', function (event, data) {
    $scope.selectedOfferItems = [];
    data.map(function (items) {
      items.payments = $scope.payments;
      var charges = $parse('charges')(items.payments.payment);
      var selectedPlan = $parse('name')(items);
      var currency = $parse('currency')(items);
      $scope.selectedOfferItems.push({
         name: selectedPlan,
         paymentDetails: charges,
         currency: currency});
    })

  });

}

SelectedOfferCartCtrl.$inject = ['$scope', '$parse', '$rootScope']
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
