'use strict';

var module = angular.module('TT-UI-CLM.SelectNumber.Services.SelectNumberService', [
    'TT-UI-CLM.Common.Services.CommonMasterDataResults',
    'TT-UI-CLM.Common.Services.Config'
]);

function SelectNumberFactory($parse, CommonMasterDataResults, COMMON_MASTER_CONFIG) {

    function SelectNumberService(masterData) {
        this.masterDataResults = CommonMasterDataResults.getMasterDataResults(masterData);
    }

    SelectNumberService.prototype.getCategoryList = function(){
        return this.masterDataResults[COMMON_MASTER_CONFIG.TELEPHONE_CATEGORIES];
    };

    SelectNumberService.prototype.getSelectionList = function(){
        return this.masterDataResults[COMMON_MASTER_CONFIG.TELEPHONE_SELECTIONS];
    };

    SelectNumberService.prototype.getPrefixList = function(){
        //return this.masterDataResults[COMMON_MASTER_CONFIG.TELEPHONE_SELECTIONS];
    };

    return SelectNumberService;
}
SelectNumberFactory.$inject = ['$parse', 'CommonMasterDataResults', 'COMMON_MASTER_CONFIG']
module.factory('SelectNumberService', SelectNumberFactory);
