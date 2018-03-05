'use strict';

var module = angular.module('TT-UI-CLM.CommonSelectPlanOffering.Services.SelectOfferingPlanService',[]);


function SelectOfferingPlanService($parse){
    this.getPayment = function(masterData){
        var payment = $parse('payments.payment')(masterData);
        var charges = $parse('payments')(payment);
        return charges;
    }

    this.getOneTimeCharges = function(payments){
        var onetimecharge = $parse('onetime')(payments);
        return onetimecharge;
    }

    
    this.getMonthlyCharges = function(payments){
        var monthlycharges = $parse('monthly')(payments);
        return monthlycharges;
    }
}

SelectOfferingPlanService.$inject = ['$parse'];
module.service('SelectOfferingPlanService',SelectOfferingPlanService);