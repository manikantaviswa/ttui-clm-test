/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";


// Source: src/scripts/select-plan-offering/index.js
angular.module('TT-UI-CLM.SelectPlanOffering',[
    'TT-UI.Table',
	'ttui-table.tpl',
    'TT-UI-CLM.SelectPlanOffering.Directives.SelectPlanOffering',
   
])

// Source: src/scripts/select-plan-offering/controller/select-plan-offering.controller.js
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

// Source: src/scripts/select-plan-offering/directives/select-plan-offering.directive.js
var module = angular.module('TT-UI-CLM.SelectPlanOffering.Directives.SelectPlanOffering',[
  
    'TT-UI-CLM.SelectPlanOffering.Controllers.SelectPlanOfferingCtrl',
    'TT-UI-CLM.SelectPlanOffering.Services.SelectPlanOfferingService',
    'TT-UI-CLM.SelectPlanOffering.Tpl',
    'ngSanitize'
    
])

module.directive('selectPlanOffering',function(){
    return{
        restrict:'EA',
        templateUrl:'scripts/select-plan-offering/views/select-plan-offering.tpl.html',
        controller:'SelectPlanOfferingCtrl',
        scope:{
            model: '=',
            masterData: '=',
        }
    }
})

// Source: src/scripts/select-plan-offering/services/select-plan-offering.service.js
var module = angular.module('TT-UI-CLM.SelectPlanOffering.Services.SelectPlanOfferingService', [])
function SelectPlanOfferingService($parse) {
    return {
        getOfferings: getOfferings
    }

    function getOfferings(masterData) {
        var offeringList = [];
        masterData.map(function (data, key) {
            offeringList.push($parse('offering')(data));
        });
        return offeringList;
    }
}

SelectPlanOfferingService.$inject = ['$parse'];
module.service(SelectPlanOfferingService.name, SelectPlanOfferingService)
return angular;
})(window, window.angular);
