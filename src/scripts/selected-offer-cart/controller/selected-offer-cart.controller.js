'use strict';

var module = angular.module('TT-UI-CLM.SelectedOfferCart.Controllers.SelectedOfferCartCtrl', [
  
])

function SelectedOfferCartCtrl($scope, $parse,$rootScope) {
  $scope.testMsg ="cart";
  $scope.selectedOfferItems={}; 
  $scope.showPanel = false;  
  $scope.selectedOfferItems = $scope.selectedOffering;
  $scope.showCartList = function (){
    $scope.showPanel = !$scope.showPanel;
  }
  $scope.onRemove = function(){

  }
  // $rootScope.$on('selectedOfferItem',function(event,data){
  //   $scope.itemsSelected = data;
  // })

}

SelectedOfferCartCtrl.$inject = [
	'$scope','$parse','$rootScope' 
]
module.controller(SelectedOfferCartCtrl.name, SelectedOfferCartCtrl)