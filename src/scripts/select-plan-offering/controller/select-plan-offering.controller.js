'use strict';

var module = angular.module('TT-UI-CLM.SelectPlanOffering.Controllers.SelectPlanOfferingCtrl', [
	'TT-UI-CLM.SelectPlanOffering.Services.SelectPlanOfferingService',
	'smart-table',
	'TT-UI.Table',
	'ttui-table.tpl',
	'uib/template/modal/window.html',
	'uib/template/modal/backdrop.html',
	'ui.bootstrap.modal'
	//  'TT-UI-CLM.SelectPlanOffering.Services.SelectOfferingPlanAPIService',
])

function SelectPlanOfferingCtrl($scope, $parse, selectPlanOfferingService, $timeout, $uibModal) {
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
				id: 0,
				code: "inclusionsAllowance",
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
			{
				summary: 'My T 200 M comes with detfult Essential  bouquet offering, and a choice of 3 other bouquets at a diferential price to choose from (this is the offering description). With upto 500 channels and 100 GB of data.',
				title: "Equipments",
				id: 1,
				code: "equipments",
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
			{
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
			{
				summary: 'My T 100 M comes with detfult Essential  bouquet offering, and a choice of 3 other bouquets at a diferential price to choose from (this is the offering description). With upto 500 channels and 100 GB of data.',
				title: "Contracts Penalty",
				id: 3,
				code: "contractsPenalty",
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
			{
				summary: 'My T 100 M comes with detfult Essential  bouquet offering, and a choice of 3 other bouquets at a diferential price to choose from (this is the offering description). With upto 500 channels and 100 GB of data.',
				title: "EMI Plans",
				id: 4,
				code: "EMIPlans",
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
		//     
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

	$scope.tabId = 0;

	$scope.setTab = function (tabId, $event) {

		$scope.tabId = tabId;
		$event.stopPropagation();
	};

}

SelectPlanOfferingCtrl.$inject = [
	'$scope',
	'$parse',
	'SelectPlanOfferingService',
	'$timeout',
	'$uibModal',
]
module.controller(SelectPlanOfferingCtrl.name, SelectPlanOfferingCtrl)