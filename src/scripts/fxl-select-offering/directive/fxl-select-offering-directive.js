 'use strict';
   var module = angular.module('TT-UI-CLM.FxlSelectOffering.Directives.SelectOffering', [
    'TT-UI-CLM.FxlSelectOffering.Controllers.FxlSelectOfferingCtrl',
    'TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingService',
   
]);

module.directive('selectOffering', selectOfferingDetail)

    function selectOfferingDetail() {
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: { 
              list: '=', 
              title: '@',
              schema:'=',
              form:"=",
              model:'='
            },
              controller: 'FxlSelectOfferingCtrl',
              templateUrl: 'scripts/fxl-select-offering/views/fxl-select-offering.tpl.html',
           
        };
        return directive;
    }

