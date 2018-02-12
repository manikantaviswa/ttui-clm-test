 'use strict';   

    var module = angular.module('TT-UI-CLM.FxlSelectOffering.Controllers.FxlSelectOfferingCtrl', [
        'TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingService',
        'TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingAPIService'
    ]);

    FxlSelectOfferingCtrl.$inject = ['$scope','FxlSelectOfferingService'];
        
    function FxlSelectOfferingCtrl($scope,FxlSelectOfferingService) {
        $scope.directivelist = FxlSelectOfferingService.getAllList($scope.list);
      
      }

    module.controller(FxlSelectOfferingCtrl.name, FxlSelectOfferingCtrl);
