'use strict'

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