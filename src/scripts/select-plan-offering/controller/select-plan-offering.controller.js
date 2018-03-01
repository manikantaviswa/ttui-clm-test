'use strict';

var module = angular.module('TT-UI-CLM.SelectPlanOffering.Controllers.CommonSelectPlanOfferingCtrl', [
    'smart-table',
    'TT-UI.Table',
    'ttui-table.tpl',
    'uib/template/modal/window.html',
    'uib/template/modal/backdrop.html',
    'ui.bootstrap.modal'
])

function CommonSelectPlanOfferingCtrl($scope, $parse, $timeout, $uibModa, $filter, COMMON_CONSTANTS_CONFIG, CommonConfiguration) {
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
    
    $scope.selectOffering.config = {
        itemsByPage: CommonConfiguration.getConfigForKey(COMMON_CONSTANTS_CONFIG.maximumOfferingsPerPage),
        displayedPages: 5
    };

}

CommonSelectPlanOfferingCtrl.$inject = [
	'$scope',
    '$parse',
    '$timeout',
    '$uibModal',
    '$filter',
    'COMMON_CONSTANTS_CONFIG',
    'CommonConfiguration'
]
module.controller(CommonSelectPlanOfferingCtrl.name, CommonSelectPlanOfferingCtrl)
