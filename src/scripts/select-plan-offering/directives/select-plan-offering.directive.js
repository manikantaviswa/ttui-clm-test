'use strict'

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