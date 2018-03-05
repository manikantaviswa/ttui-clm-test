'use strict';

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
