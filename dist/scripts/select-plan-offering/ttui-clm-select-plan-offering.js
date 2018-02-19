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
var module = angular.module('TT-UI-CLM.SelectPlanOffering.Controllers.SelectPlanOfferingCtrl', [
    'TT-UI-CLM.SelectPlanOffering.Services.SelectPlanOfferingService',
    //  'TT-UI-CLM.SelectPlanOffering.Services.SelectOfferingPlanAPIService',
])

function SelectPlanOfferingCtrl($scope, $parse, selectPlanOfferingService) {
    $scope.offeringData = [];
    $scope.selectedVariant = {
        code: ""
    };
    $scope.selectAllowance = "";

    this.setInitialState = function () {
        this.getOfferings();
    }

    this.getOfferings = function () {
        this.setSelectOfferings();
        //this.setAllowanceDescription();
    }

    this.setSelectOfferings = function () {
        var offering = $parse('masterData.response.body')($scope);

        $scope.offeringData = offering.map(function (offering) {
            return angular.extend({}, {
                selected: false
            }, offering);
        });
    }
    this.setAllowanceDescription = function () {
        var offering = $parse('masterData.response.body')($scope);

        $scope.offeringData = offering.map(function (offer) {
            return angular.extend({}, {
                allowanceDescription: offer.offering.allowances.allowance[0].dedicatedAccounts.dedicatedAccount[0].description
            }, offer);
        });

    }

    $scope.getSelectedVariant = function (selectedOffer) {
        setSelectedVariantAllowance(selectedOffer);
	}

	this.setSelectOfferings = function () {

		var offering = $parse('masterData.response.body')($scope);
		var items = [{
				summary: "My T 100 M comes with detfult Essential  bouquet offering, and a choice of 3 other bouquets at a diferential price to choose from (this is the offering description). With upto 500 channels and 100 GB of data.",
				title: "inclusions Allowance",
				id:0,
				code:"inclusionsAllowance",
				inclusionsAllowance: [{
						code: 1212331,
						item1: 'Item 1 product name',
						item2: 'Item 2 product name'
					},
					{   
						code: 122212331,
						item1: 'Item 3 product name',
						item2: 'Item 4 product name'
					}
				],
			},
			{id:1,	
				summary: 'My T 200 M comes with detfult Essential  bouquet offering, and a choice of 3 other bouquets at a diferential price to choose from (this is the offering description). With upto 500 channels and 100 GB of data.',
				title: "Equipments",
				id:1,
				code:"equipments",
				equipments: [{
						code: 1212331,
						item1: 'Item 1 product name',
						item2: 'Item 2 product name'
					},
					{
						code: 122212331,
						item1: 'Item 3 product name',
						item2: 'Item 4 product name'
					}
				],
			},
			{id:2,	
				summary: 'My T 300 M comes with detfult Essential  bouquet offering, and a choice of 3 other bouquets at a diferential price to choose from (this is the offering description). With upto 500 channels and 100 GB of data.',
				title: "Charges",
				id:2,
				code:"charges",
				charges: [{
						code: 1212331,
						item1: 'Item 1 product name',
						item2: 'Item 2 product name'
					},
					{
						code: 122212331,
						item1: 'Item 3 product name',
						item2: 'Item 4 product name'
					}
				],
			},
			{id:3,	
				summary: 'My T 100 M comes with detfult Essential  bouquet offering, and a choice of 3 other bouquets at a diferential price to choose from (this is the offering description). With upto 500 channels and 100 GB of data.',
				title: "Contracts Penalty",
				id:3,
				code:"contractsPenalty",
				contractsPenalty: [{
						code: 1212331,
						item1: 'Item 1 product name',
						item2: 'Item 2 product name'
					},
					{
						code: 122212331,
						item1: 'Item 3 product name',
						item2: 'Item 4 product name'
					}
				],
			},
			{id:4,	
				summary: 'My T 100 M comes with detfult Essential  bouquet offering, and a choice of 3 other bouquets at a diferential price to choose from (this is the offering description). With upto 500 channels and 100 GB of data.',
				title: "EMI Plans",
				id:4,
				code:"EMIPlans",
				EMIPlans: [{
						code: 1212331,
						item1: 'Item 1 product name',
						item2: 'Item 2 product name'
					},
					{
						code: 122212331,
						item1: 'Item 3 product name',
						item2: 'Item 4 product name'
					}
				]
			}
		];

		$scope.offeringData = offering.map(function (offering) {
			return angular.extend({}, {
				selected: false,
				details: items,
				allowanceDescription: offering.offering.allowances.allowance[0].dedicatedAccounts.dedicatedAccount[0].description

			}, offering);
		});
		
	}

     var setSelectedVariantAllowance = function (selectedOffer) {
        var selectedVariant = $scope.selectedVariant.code;
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
        // SelectOfferingPlanAPIService(req).then(function(res) {
        //     debugger
        //     Spinner.inner.hide();
        // }).catch(function(err) {
        //     Spinner.inner.hide();            
        //     console.log(err);
        // });
    }
	this.setInitialState();
	$scope.getOfferingDetailsView = function () {
		
		$scope.tabs = []
		$scope.offeringData.map(function (offerDetails, $index) {
			
			$scope.tabs = $parse('details')(offerDetails);
		})
	}

	this.tabId = 0;

	this.setTab = function (tabId) {
		debugger
		this.tabId = tabId;
	};

	this.isSet = function (tabId) {
		debugger
		return this.tabId === tabId;
	};

}

SelectPlanOfferingCtrl.$inject = [
	'$scope',
	'$parse',
	'SelectPlanOfferingService'
]
module.controller(SelectPlanOfferingCtrl.name, SelectPlanOfferingCtrl)

// Source: src/scripts/select-plan-offering/directives/select-plan-offering.directive.js
var module = angular.module('TT-UI-CLM.SelectPlanOffering.Directives.SelectPlanOffering',[
    'TT-UI-CLM.SelectPlanOffering.Controllers.SelectPlanOfferingCtrl',
    'TT-UI-CLM.SelectPlanOffering.Services.SelectPlanOfferingService',
   // 'TT-UI-CLM.SelectPlanOffering.Services.SelectOfferingPlanAPIService',
    'TT-UI-CLM.SelectPlanOffering.Tpl',
    'ngSanitize'
])

module.directive('selectPlanOffering',function(){
    return{
        restrict:'EA',
        templateUrl:'scripts/select-plan-offering/views/select-plan-offering.tpl.html',
        controller:'SelectPlanOfferingCtrl',
        scope:{
            model: '=',
            masterData: '=',
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


// Source: src/scripts/select-plan-offering/services/select-plan-offering.service.js
var module = angular.module('TT-UI-CLM.SelectPlanOffering.Services.SelectPlanOfferingService', [])
function SelectPlanOfferingService($parse) {
    return {
        getOfferings: getOfferings
    }

    function getOfferings(masterData) {
        var offeringList = [];
        masterData.map(function (data, key) {
            offeringList.push($parse('offering')(data));
        });
        return offeringList;
    }
}

SelectPlanOfferingService.$inject = ['$parse'];
module.service(SelectPlanOfferingService.name, SelectPlanOfferingService)
return angular;
})(window, window.angular);
