'use strict'

var module = angular.module('TT-UI-CLM.SelectedOfferings.Directives.SelectedOfferings',[
    'TT-UI-CLM.SelectedOfferings.Controllers.SelectPlanOfferingCtrl',
    'TT-UI-CLM.SelectedOfferings.Tpl',
    'ngSanitize'
])

module.directive('selectedOfferings',function(){
    return{
        restrict:'EA',
        templateUrl:'scripts/selected-offerings/views/selected-offerings.tpl.html',
        controller:'SelectedOfferingsCtrl',
        scope:{
            selectedOfferingData: '=',
            masterData: '=',
        }
    }
})