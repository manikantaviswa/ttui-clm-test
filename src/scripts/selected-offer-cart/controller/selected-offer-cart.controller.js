'use strict';

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