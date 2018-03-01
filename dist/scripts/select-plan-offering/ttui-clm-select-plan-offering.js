/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";


// Source: src/scripts/select-plan-offering/index.js
angular.module('TT-UI-CLM.SelectPlanOffering',[
    'TT-UI-CLM.SelectPlanOffering.Directives.SelectPlanOffering',
])


// Source: src/scripts/select-plan-offering/controller/select-plan-offering.controller.js
var module = angular.module('TT-UI-CLM.SelectPlanOffering.Controllers.CommonSelectPlanOfferingCtrl', [
    'smart-table',
    'TT-UI.Table',
    'ttui-table.tpl',
    'uib/template/modal/window.html',
    'uib/template/modal/backdrop.html',
    'ui.bootstrap.modal'
])

function CommonSelectPlanOfferingCtrl($scope, $parse, $timeout, $uibModa, $filter) {
    $scope.selectedVariant = {
        code: ""
    };
    $scope.selectAllowance = "";

    $scope.offeringTabs = [
        {
            id:0,
            title: 'Plans',
            disabled: false,
            

        }, {
            id:0,
            title: 'VAS',
            disabled: false
        }
    ];
    $scope.vasList = [];

    //selected Plan Offering Tabs
    $scope.offerTabId = 0;
    $scope.offerTab = function (tabId) {
       $scope.offerTabId = tabId;
    };
    $scope.isSetTab = function (tabId) {     
        return $scope.offerTabId === tabId;
    };


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
         SelectOfferingPlanAPIService(req).then(function(res) {
             debugger
             Spinner.inner.hide();
         }).catch(function(err) {
             Spinner.inner.hide();
             console.log(err);
        });
    }
    $scope.isSelect = false; //Select offer toggle State
  
	$scope.getOfferingDetailsView = function () {
		$scope.tabs = []
		$scope.offeringData.map(function (offerDetails, $index) {
			$scope.tabs = $parse('details')(offerDetails);
		})
	}

	$scope.tabId = 0;
	$scope.setTab = function (tabId, $event) {
	    $scope.tabId = tabId;
        $event.stopPropagation();
	};
}

CommonSelectPlanOfferingCtrl.$inject = [
	'$scope',
    '$parse',
    '$timeout',
    '$uibModal',
    '$filter'
]
module.controller(CommonSelectPlanOfferingCtrl.name, CommonSelectPlanOfferingCtrl)

// Source: src/scripts/select-plan-offering/directives/select-plan-offering.directive.js
var module = angular.module('TT-UI-CLM.SelectPlanOffering.Directives.SelectPlanOffering',[
    'TT-UI-CLM.SelectPlanOffering.Controllers.CommonSelectPlanOfferingCtrl',
    'TT-UI-CLM.SelectPlanOffering.Tpl',
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
            tmUnselectPlanOffering: '='
        }
    }
})

// Source: src/scripts/select-plan-offering/services/select-plan-offering-api.service.js
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

return angular;
})(window, window.angular);
