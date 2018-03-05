'use strict'

var module = angular.module('TT-UI-CLM.CommonSelectPlanOffering.Directives.SelectPlanOffering',[
    'TT-UI-CLM.CommonSelectPlanOffering.Controllers.CommonSelectPlanOfferingCtrl',
    'TT-UI-CLM.CommonSelectPlanOffering.Tpl',
    'ngSanitize'
])

module.directive('selectPlanOffering',function(){
    return{
        restrict:'EA',
        templateUrl:'scripts/select-plan-offering/views/select-plan-offering.tpl.html',
        controller:'CommonSelectPlanOfferingCtrl',
        scope:{
            offeringData: '=',
            masterData: '=',
            defaultState:'=',
            tmSelectPlanOffering:'=',
            tmUnselectPlanOffering: '=',
            getSelectedOffering:'=',
            offerDetailChargesModel:'=',
            offerDetailModel:'='
        }
    }
})