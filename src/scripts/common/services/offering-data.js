'use strict';

var module = angular.module('TT-UI-CLM.Common.Services.OfferingData', [
    'TT-UI-CLM.Common.Services.CommonMasterDataResults'
]);

function OfferingDataFactory($parse, CommonMasterDataResults, COMMON_MASTER_CONFIG) {

    function OfferingData(offering) {
        this.offering = offering;
    }

    OfferingData.prototype.getServiceType = function(){
        return $parse('associatedProducts.associatedProduct[0].product.lineOfBusiness.code')(this.offering);
    };

    OfferingData.prototype.getSubServiceType = function(){
        return $parse('associatedProducts.associatedProduct[0].product.productType.code')(this.offering);
    };

    OfferingData.prototype.getTechnology = function(){
        return $parse('associatedProducts.associatedProduct[0].product.technicalChannels.technicalChannel[0].code')(this.offering);
    };

    OfferingData.prototype.getBusinessType = function(){
        return $parse('associatedProducts.associatedProduct[0].businessType.code')(this.offering);
    };

    return OfferingData;
}
OfferingDataFactory.$inject = ['$parse', 'CommonMasterDataResults', 'COMMON_MASTER_CONFIG']
module.factory('OfferingData', OfferingDataFactory);
