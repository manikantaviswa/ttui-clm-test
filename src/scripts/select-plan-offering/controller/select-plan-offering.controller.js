'use strict';

var module = angular.module('TT-UI-CLM.SelectPlanOffering.Controllers.SelectPlanOfferingCtrl', [
    'TT-UI-CLM.SelectPlanOffering.Services.SelectPlanOfferingService'
])

function SelectPlanOfferingCtrl($scope,$parse, selectPlanOfferingService) {
    $scope.offeringData = [];
    function setInitialState() {
        getOfferings();
    }
    function getOfferings() {
       // $scope.offering = selectPlanOfferingService.getOfferings($scope.masterData.response.body);
       var offering = $parse('masterData')($scope);
       $scope.offeringData = offering;
       $scope.ready = "Welcome to fxl";
    }
    setInitialState();
    function selectPlanOffering(offering){
        
    }
}

SelectPlanOfferingCtrl.$inject = [
    '$scope',
    '$parse',
    'SelectPlanOfferingService'
  
]
module.controller(SelectPlanOfferingCtrl.name, SelectPlanOfferingCtrl)