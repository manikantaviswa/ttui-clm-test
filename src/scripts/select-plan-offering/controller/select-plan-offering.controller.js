'use strict';

var module = angular.module('TT-UI-CLM.SelectPlanOffering.Controllers', [
    'TT-UI-CLM.SelectPlanOffering.Services'
])

function SelectPlanOfferingCtrl($scope, selectPlanOfferingService) {
    $scope.offeringList = [];
    setInitialState();
    function setInitialState() {
        getOfferings();
    }
    function getOfferings() {
       // $scope.offering = selectPlanOfferingService.getOfferings($scope.masterData.response.body);
       $scope.offeringList = $scope.masterData.response.body;
    }
}

SelectPlanOfferingCtrl.$inject = [
    '$scope',
    'SelectPlanOfferingService'
]
module.controller(SelectPlanOfferingCtrl.name, SelectPlanOfferingCtrl)