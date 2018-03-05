'use strict';

var module = angular.module('TT-UI-CLM.CommonSelectPlanOffering.Controllers.SelectPlanOfferingCtrl', [
    'TT-UI-CLM.CommonSelectPlanOffering.Services.SelectOfferingPlanService',
    'smart-table',
    'TT-UI.Table',
    'ttui-table.tpl',
    'uib/template/modal/window.html',
    'uib/template/modal/backdrop.html',
    'ui.bootstrap.modal'
    
])

function SelectPlanOfferingCtrl($scope, $parse, $timeout, $uibModa, $filter,SelectOfferingPlanService) {
    $scope.selectedVariant = {
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
    $scope.payments =[];

    //selected Plan Offering Tabs
    $scope.offerTabId = 0;
    $scope.offerTab = function (tabId) {
        $scope.offerTabId = tabId;
    };
    $scope.isSetTab = function (tabId) {
        return $scope.offerTabId === tabId;
    };
    $scope.detailsTab = [{
        id:'charges',
        title:'Charges',
        page:'scripts/select-plan-offering/views/offerCharges.tpl.html'
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

    $scope.$on('offerDetailModel',function(event,data){
        $scope.monthlyCharges = $parse('monthlyCharges')(data);
        $scope.oneTimeCharges = $parse('oneTimeCharges')(data);
        var payments =  $parse('payments')(data.offerDetail);
        var payment = $parse('payment')(payments);
        $scope.chargesCurrency = $parse('currency')(payment);
        var totals = $parse('totals')(payment);
        $scope.upfront = $parse('upfront')(totals);
        $scope.billing = $parse('billing')(totals);
        debugger
    });
}

SelectPlanOfferingCtrl.$inject = [
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
