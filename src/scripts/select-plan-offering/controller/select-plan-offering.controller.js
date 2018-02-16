'use strict';

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
			id:0,	
			summary: "My T 100 M comes with detfult Essential  bouquet offering, and a choice of 3 other bouquets at a diferential price to choose from (this is the offering description). With upto 500 channels and 100 GB of data.",
				title: "inclusionsAllowance",
				show:true,
				type: "Row",
				
				inclusionsAllowance: [
					{   
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
				title: "equipments",
				show:false,
				type: "Table",
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
				title: "charges",
				show:false,
				type: "Table",
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
				title: "contracts Penalty",
				show:false,
				type: "Row",
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
				show:false,
				type: "Row",
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