/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";


// Source: src/scripts/select-plan-offering/index.js
angular.module('TT-UI-CLM.CommonSelectPlanOffering',[
    'TT-UI-CLM.CommonSelectPlanOffering.Directives.SelectPlanOffering',
])


// Source: src/scripts/select-plan-offering/controller/select-plan-offering.controller.js
var module = angular.module('TT-UI-CLM.CommonSelectPlanOffering.Controllers.CommonSelectPlanOfferingCtrl', [
    'TT-UI-CLM.CommonSelectPlanOffering.Services.SelectOfferingPlanService',
    'smart-table',
    'TT-UI.Table',
    'ttui-table.tpl',
    'uib/template/modal/window.html',
    'uib/template/modal/backdrop.html',
    'ui.bootstrap.modal'

])

function CommonSelectPlanOfferingCtrl($scope, $parse, $timeout, $uibModa, $filter, SelectOfferingPlanService) {
    $scope.selectedVariant = {
        code: ""
    };
    $scope.selectedPlan = {
        code: ""
    };
    $scope.selectAllowance = "";

    $scope.offeringTabs = [
        {
            id: 0,
            title: 'Plans',
            disabled: false,


        }, {
            id: 0,
            title: 'VAS',
            disabled: false
        }
    ];
    $scope.vasList = [];
    $scope.payments = [];
    $scope.selectOfferDetail = {};
    $scope.monthlyCharges = [];
    $scope.oneTimeCharges = [];
    $scope.chargesCurrency = '';
    $scope.upfront = "";
    $scope.billing = "";

    //selected Plan Offering Tabs
    $scope.offerTabId = 0;
    $scope.offerTab = function (tabId) {
        $scope.offerTabId = tabId;
    };
    $scope.isSetTab = function (tabId) {
        return $scope.offerTabId === tabId;
    };
    $scope.detailsTab = [{
        id: 'inclusions_allowance',
        title: 'Inclusions & Allowance',
        page: ''
    },
    {
        id: 'equipments',
        title: 'Equipments',
        page: ''
    },
    {
        id: 'charges',
        title: 'Charges',
        page: 'scripts/select-plan-offering/views/offerCharges.tpl.html'
    },
    {
        id: 'contracts_penalty',
        title: 'Contracts & Penalty',
        page: ''
    },
    {
        id: 'emi_plans',
        title: 'EMI Plans',
        page: ''
    }]


    this.setAllowanceDescription = function () {
        var offering = $scope.offeringData;

        $scope.offeringData = offering.map(function (offer) {
            return angular.extend({}, {
                allowanceDescription: offer.offering.allowances.allowance[0].dedicatedAccounts.dedicatedAccount[0].description
            }, offer);
        });

    }

    $scope.getSelectedVariant = function (selectedOffer) {
        setSelectedVariantAllowance(selectedOffer);
    }

    var setSelectedVariantAllowance = function (selectedOffer) {
        var selectedVariant = $scope.selectedVariant[selectedOffer.code];
        var offeringData = $scope.offeringData;
        $scope.offeringData.map(function (offer) {
            if (selectedOffer.code === offer.offering.code) {
                var allowance = $parse('allowances.allowance')(offer.offering)
                allowance.find(function (obj) {
                    obj.product.code === selectedVariant ? offer.allowanceDescription = obj.dedicatedAccounts.dedicatedAccount[0].description : "";
                });
            }

        });
    }

    $scope.selectOffering = function (offer) {
        var selectedVariant = $scope.selectedVariant.code;
        var offeringData = $scope.offeringData;
        $scope.offeringData.map(function (offer) {
            selectedOffer.code === offer.offering.code ? offer.selected = !offer.selected : "";
        });
        Spinner.inner.show();
        SelectOfferingPlanAPIService(req).then(function (res) {
            Spinner.inner.hide();
        }).catch(function (err) {
            Spinner.inner.hide();
            console.log(err);
        });
    }
    $scope.isSelect = false; //Select offer toggle State

    $scope.tabId = 0;
    $scope.setTab = function (tabId, $event) {
        $scope.tabId = tabId;
        $event.stopPropagation();
    };

    $scope.$on('offerDetailModel', function (event, data) {
        $scope.selectOfferDetail = $parse('offerDetail')(data);

        $scope.monthlyCharges = $parse('monthlyCharges')(data);
        $scope.oneTimeCharges = $parse('oneTimeCharges')(data);
        var payments = $parse('payments')(data.offerDetail);
        var payment = $parse('payment')(payments);
        $scope.chargesCurrency = $parse('currency')(payment);
        var totals = $parse('totals')(payment);
        $scope.upfront = $parse('upfront')(totals);
        $scope.billing = $parse('billing')(totals);

    });
}

CommonSelectPlanOfferingCtrl.$inject = [
    '$scope',
    '$parse',
    '$timeout',
    '$uibModal',
    '$filter',
    'SelectOfferingPlanService',
    'COMMON_CONSTANTS_CONFIG',
    'CommonConfiguration'
]
module.controller(CommonSelectPlanOfferingCtrl.name, CommonSelectPlanOfferingCtrl)


// Source: src/scripts/select-plan-offering/directives/select-plan-offering.directive.js
var module = angular.module('TT-UI-CLM.CommonSelectPlanOffering.Directives.SelectPlanOffering',[
    'TT-UI-CLM.CommonSelectPlanOffering.Controllers.CommonSelectPlanOfferingCtrl',
    'TT-UI-CLM.CommonSelectPlanOffering.Tpl',
    'ngSanitize'
])

module.directive('selectPlanOffering',function(){
    return{
        restrict:'EA',
        templateUrl:'scripts/select-plan-offering/views/select-plan-offering.tpl.html',
        controller:'CommonSelectPlanOfferingCtrl',
        scope:{
            offeringData: '=',
            masterData: '=',
            defaultState:'=',
            tmSelectPlanOffering:'=',
            tmUnselectPlanOffering: '=',
            getSelectedOffering:'=',
            offerDetailChargesModel:'=',
            offerDetailModel:'='
        }
    }
})

// Source: src/scripts/select-plan-offering/services/select-plan-offering-api.service.js
var module = angular.module('TT-UI-CLM.CommonSelectPlanOffering.Services.SelectOfferingPlanAPIService', [
    'TT-UI.Common'
]);

module.constant('SELECTC_PLAN_API_CONFIG', {
    API_URL: 'http://10.2.53.113/upc/rest/dataservice/1/UPC/1.1/GetOfferingDetailsWithTaxRequest/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

function SelectOfferingPlanAPIService($q, $parse, Api, ResourceFactory, SELECTC_PLAN_API_CONFIG) {

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
        var apiService = ResourceFactory(Api.getUrl(), SELECTC_PLAN_API_CONFIG.API_URL, SELECTC_PLAN_API_CONFIG.API_METHOD);
        return apiService.fetch(prepareRequest(payload)).$promise;
    };

    var getErrors = function (response) {

        var errors = $parse(SELECTC_PLAN_API_CONFIG.RESPONSE_ERROR_JSON_PATH)(response);
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

SelectOfferingPlanAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'SELECTC_PLAN_API_CONFIG'];
module.factory(SelectOfferingPlanAPIService.name, SelectOfferingPlanAPIService);


// Source: src/scripts/select-plan-offering/services/select-plan-offering.service.js
var module = angular.module('TT-UI-CLM.CommonSelectPlanOffering.Services.SelectOfferingPlanService',[]);


function SelectOfferingPlanService($parse){
    this.getPayment = function(masterData){
        var payment = $parse('payments.payment')(masterData);
        var charges = $parse('payments')(payment);
        return charges;
    }

    this.getOneTimeCharges = function(payments){
        var onetimecharge = $parse('onetime')(payments);
        return onetimecharge;
    }

    
    this.getMonthlyCharges = function(payments){
        var monthlycharges = $parse('monthly')(payments);
        return monthlycharges;
    }
}

SelectOfferingPlanService.$inject = ['$parse'];
module.service('SelectOfferingPlanService',SelectOfferingPlanService);
return angular;
})(window, window.angular);
