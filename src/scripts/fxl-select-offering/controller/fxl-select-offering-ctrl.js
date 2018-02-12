 'use strict';   

    var module = angular.module('TT-UI-CLM.FxlSelectOffering.Controllers.FxlSelectOfferingCtrl', [
        'TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingService',
        'TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingAPIService'
    ]);

    FxlSelectOfferingCtrl.$inject = ['$scope','FxlSelectOfferingService'];
        
    function FxlSelectOfferingCtrl($scope,FxlSelectOfferingService) {
        debugger;
        $scope.directivelist = FxlSelectOfferingService.getAllList($scope.list);

        // $scope.directivelist = [{
        //   name: ' controller a custom directive',
        //   completed: true
        // }, {
        //   name: 'MainLearn about restrict test',
        //   completed: true
        // }]
          
      }

      module.controller(FxlSelectOfferingCtrl.name, FxlSelectOfferingCtrl);
