/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";


// Source: src/scripts/fxl-select-number/index.js
angular.module('TT-UI-CLM.SelectNumber', [
    'TT-UI-CLM.SelectNumber.Directives.SelectNumberDirective',
    'TT-UI-CLM.CommonComponents'
]);


// Source: src/scripts/fxl-select-number/controller/select-number.controller.js
var module = angular.module('TT-UI-CLM.SelectNumber.Controller.SelectNumberController', [
    'TT-UI-CLM.SelectNumber.Services.SelectNumberService',
    'TT-UI-CLM.Common.Services.OfferingData',
    'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.MSISDNPresentaionModel',
    'TT-UI-CLM.Common.Utils.CommonDataModel',
    'TT-UI-CLM.Common.Services.Loaders.CommonMSISDNPrefixLoader',
    'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonMsisdnLocker'
]).constant('SELECT_SERVICE_SETTINGS', {
    MSISDN_SELECTION_AUTO : 'Automatic',
    MSISDN_SELECTION_MANUAL	: 'Manual',
    MSISDN_SELECTION_RESERVE : 'Reserved'
});

function SelectNumberController($rootScope, $scope, $parse, SelectNumberService, SELECT_SERVICE_SETTINGS, SPINNER_EVENTS, CommonMSISDNPrefixLoader, OfferingData, FlashMessage, translateFilter, CommonMsisdnPresentationModel, CommonDataModel, CommonMsisdnLocker) {
    var __ = translateFilter;

    var serviceNumberService = new SelectNumberService($scope.model.masterData);
    var offerDataService = new OfferingData($scope.model.selectedOffering);


    var msisdn = CommonDataModel.create($scope.model, {
        mobileNumber: 'serviceDetails.gsmService.stDirect.MSISDN',
        hlrOfMsisdn: 'serviceDetails.gsmService.stDirect.hlrMSISDN',
        hlrOfSim: 'serviceDetails.gsmService.stDirect.hlrSIM',
        category: 'serviceDetails.gsmService.stDirect.MSISDNCategory.masterCode',
        selectionType: 'serviceDetails.gsmService.stDirect.MSISDNSelection.masterCode',
        prefix: 'serviceDetails.gsmService.stDirect.MSISDNPrefix',
        reservationId: 'serviceDetails.gsmService.stDirect.MSISDNReservation',
        businessType: 'serviceDetails.gsmService.stDirect.businessType.masterCode',
        serviceType: 'selectedOffering.associatedProducts.associatedProduct[0].product.lineOfBusiness.code',
        subServiceType: 'selectedOffering.associatedProducts.associatedProduct[0].product.productType.code',
        technology: 'selectedOffering.associatedProducts.associatedProduct[0].product.technicalChannels.technicalChannel[0].code',
        activatedVia: 'serviceDetails.gsmService.activatedVia.masterCode'
    });

    $scope.msisdnPM = new CommonMsisdnPresentationModel(msisdn, true);

    CommonMsisdnLocker.start.bind($scope.msisdnPM)

    $scope.model.msisdnPM = $scope.msisdnPM;
    //console.log("$scope.msisdnPM>>>>>>",$scope.msisdnPM)

    $scope.getPrefixList = function(){
        if ($scope.model.serviceDetails.gsmService.stDirect.MSISDNSelection.masterCode === SELECT_SERVICE_SETTINGS.MSISDN_SELECTION_MANUAL){
            var commonRequestPayload = $scope.getCommonRequestPayload();
            var serviceDetails = commonRequestPayload;
            var msisdnLoader = CommonMSISDNPrefixLoader(serviceDetails);
            msisdnLoader.load().then(function(response){
                $scope.prefixList = response;
                //console.log(" $scope.prefixList>>>>", $scope.prefixList)
            });
        }
    };

    $scope.getCommonRequestPayload = function(){
        return {
            'serviceType': offerDataService.getServiceType(),
            'subServiceType': offerDataService.getSubServiceType(),
            'technology': offerDataService.getTechnology(),
            'category': $scope.model.serviceDetails.gsmService.stDirect.MSISDNCategory.masterCode,
            'activatedVia': $scope.model.serviceDetails.gsmService.activatedVia.masterCode,
            'businessType': offerDataService.getBusinessType()
        };
    };

    $scope.categoryList = serviceNumberService.getCategoryList();
    $scope.selectionList = serviceNumberService.getSelectionList();
    // $scope.prefixList = serviceNumberService.getPrefixList();

    $scope.selectNumberConstant = SELECT_SERVICE_SETTINGS;


}
SelectNumberController.$inject = [
    '$rootScope',
    '$scope',
    '$parse',
    'SelectNumberService',
    'SELECT_SERVICE_SETTINGS',
    'SPINNER_EVENTS',
    'CommonMSISDNPrefixLoader',
    'OfferingData',
    'FlashMessage',
    'translateFilter',
    'CommonMsisdnPresentationModel',
    'CommonDataModel',
    'CommonMsisdnLocker',
];
module.controller(SelectNumberController.name, SelectNumberController);


// Source: src/scripts/fxl-select-number/directives/select-number.js
var module = angular.module('TT-UI-CLM.SelectNumber.Directives.SelectNumberDirective', [
    'TT-UI-CLM.SelectNumber.Controller.SelectNumberController',
    'TT-UI-CLM.SelectNumber.Services.SelectNumberService'
]);

module.directive('selectNumber', function() {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            // config: '=',
            masterData: '=',
            // permissions: '=',
        },
        controller: 'SelectNumberController',
        templateUrl: 'scripts/select-number/views/select-number-view.tpl.html'
    };
});


// Source: src/scripts/fxl-select-number/services/select-number-service.js
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

return angular;
})(window, window.angular);
