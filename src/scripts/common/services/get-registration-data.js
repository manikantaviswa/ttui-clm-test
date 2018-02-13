'use strict';

var module = angular.module('TT-UI-CLM.SelectNumber.Services.GetRegistrationDataService', [
]);

function GetRegistrationDataService($parse) {

    function getServiceType(){

    }

    function getTechnology(){

    }

    return {
        getServiceType : getServiceType,
        getTechnology : getTechnology
    };
}
GetRegistrationDataService.$inject = ['$parse']
module.service(GetRegistrationDataService.name, GetRegistrationDataService);