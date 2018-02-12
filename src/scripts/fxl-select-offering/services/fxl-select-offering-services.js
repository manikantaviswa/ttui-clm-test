'use strict';

    var module = angular.module('TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingService', []);
       
    module.service('FxlSelectOfferingService', FxlSelectOfferingService);

    function FxlSelectOfferingService() {

        this.message = '';
        this.getAllList = function (todoMain) {
        this.message = todoMain;
        return this.message;
    };
    }
