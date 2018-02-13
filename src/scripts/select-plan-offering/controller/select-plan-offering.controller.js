'use strict';

var module = angular.module('TT-UI-CLM.SelectPlanOffering.Controllers.SelectPlanOfferingCtrl', [
    'TT-UI-CLM.SelectPlanOffering.Services.SelectPlanOfferingService'
])

function SelectPlanOfferingCtrl($scope,$parse, selectPlanOfferingService) {
    $scope.offeringList = [];
    setInitialState();
    function setInitialState() {
       
        getOfferings();
    }
    function getOfferings() {
       // $scope.offering = selectPlanOfferingService.getOfferings($scope.masterData.response.body);
       var offering = $parse('masterData.response.body')($scope);
       $scope.offeringList = offering;
    }
}

SelectPlanOfferingCtrl.$inject = [
    '$scope',
    '$parse',
    'SelectPlanOfferingService'
]
module.controller(SelectPlanOfferingCtrl.name, SelectPlanOfferingCtrl)