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
        this.setAllowanceDescription();
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
}

SelectPlanOfferingCtrl.$inject = [
    '$scope',
    '$parse',
    'SelectPlanOfferingService'
]
module.controller(SelectPlanOfferingCtrl.name, SelectPlanOfferingCtrl)