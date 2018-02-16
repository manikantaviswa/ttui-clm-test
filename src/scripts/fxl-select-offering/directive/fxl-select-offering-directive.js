 'use strict';
   var module = angular.module('TT-UI-CLM.FxlSelectOffering.Directives.SelectOffering', [
    'TT-UI-CLM.FxlSelectOffering.Controllers.FxlSelectOfferingCtrl',
    'TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingService',
    'TT-UI-CLM.FxlSelectOffering.Tpl'

]);

module.directive('selectOffering', selectOfferingDetail)

    function selectOfferingDetail() {
        debugger;
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                searchofferingModel: '=',
                masterData: '=',
                onSearch: '='
            },
              controller: 'FxlSelectOfferingCtrl',
              templateUrl: 'scripts/fxl-select-offering/views/fxl-select-offering.tpl.html',

        };
        return directive;
    }

