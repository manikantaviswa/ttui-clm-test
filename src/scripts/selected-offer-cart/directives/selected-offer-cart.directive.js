'use strict'

var module = angular.module('TT-UI-CLM.SelectedOfferCart.Directives.SelectedOfferCart',[
    'TT-UI-CLM.SelectedOfferCart.Controllers.SelectedOfferCartCtrl',
    'TT-UI-CLM.SelectedOfferCart.Tpl',
    'ngSanitize'
])

module.directive('selectedOfferCart',function(){
    return{
        restrict:'EA',
        templateUrl:'scripts/selected-offer-cart/views/selected-offer-cart.tpl.html',
        controller:'SelectedOfferCartCtrl',
        scope:{
            selectedOffering: '=',
            masterData: '=',
            defaultState:'=',
            removeSelectedOfferCart:'='
        }
    }
})