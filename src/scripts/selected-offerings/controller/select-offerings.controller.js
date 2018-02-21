'use strict';

var module = angular.module('TT-UI-CLM.SelectPlanOffering.Controllers.SelectedOfferingsCtrl', [
    
])

function SelectedOfferingsCtrl($scope, $parse) {
    $scope.selectedVariant = {
        code: ""
    };
    $scope.selectAllowance = "";
}

SelectedOfferingsCtrl.$inject = [
	'$scope',
    '$parse'
    
]
module.controller(SelectedOfferingsCtrl.name, SelectedOfferingsCtrl)