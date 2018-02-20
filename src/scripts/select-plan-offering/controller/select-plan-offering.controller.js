'use strict';

var module = angular.module('TT-UI-CLM.SelectPlanOffering.Controllers.SelectPlanOfferingCtrl', [

])

function SelectPlanOfferingCtrl($scope, $parse) {
    $scope.selectedVariant = {
        code: ""
    };
    $scope.selectAllowance = "";



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
    }

	$scope.getOfferingDetailsView = function () {

		$scope.tabs = []
		$scope.offeringData.map(function (offerDetails, $index) {

			$scope.tabs = $parse('details')(offerDetails);
		})
	}

	this.tabId = 0;

	this.setTab = function (tabId) {

		this.tabId = tabId;
	};

	this.isSet = function (tabId) {
		return this.tabId === tabId;
	};

}

SelectPlanOfferingCtrl.$inject = [
	'$scope',
	'$parse'
]
module.controller(SelectPlanOfferingCtrl.name, SelectPlanOfferingCtrl)