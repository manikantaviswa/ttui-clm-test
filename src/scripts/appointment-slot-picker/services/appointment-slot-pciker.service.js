'use strict';

var module = angular.module('TT-UI-CLM.AppointmentSlotPicker.Services.AppointmentSlotPickerService', [
    'TT-UI-CLM.Common.Services.CommonMasterDataResults',
    'TT-UI-CLM.Common.Services.Config'
]);

function AppointmentSlotPickerFactory($parse, CommonMasterDataResults, COMMON_MASTER_CONFIG) {

    function AppointmentSlotPickerService(masterData) {
        this.masterDataResults = CommonMasterDataResults.getMasterDataResults(masterData);
    }

    AppointmentSlotPickerService.prototype.getInstallationTypes = function(){
        return this.masterDataResults[COMMON_MASTER_CONFIG.INSTALLATION_TYPES];
    };
    return AppointmentSlotPickerService;
}
AppointmentSlotPickerFactory.$inject = ['$parse', 'CommonMasterDataResults', 'COMMON_MASTER_CONFIG']
module.factory('AppointmentSlotPickerService', AppointmentSlotPickerFactory);
