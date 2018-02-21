'use strict';

var module = angular.module('TT-UI-CLM.SelectNumber.Controller.SelectNumberController', [
    'TT-UI-CLM.SelectNumber.Services.SelectNumberService',
    'CLM-UI.Customers.Services.Loaders.MSISDNPrefixLoader',
    'TT-UI-CLM.Common.Services.MSISDNPrefix',
    'TT-UI-CLM.Common.Services.OfferingData',
    'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.MSISDNPresentaionModel',
    'TT-UI-CLM.Common.Utils.DataModel',
    'TT-UI-CLM.Common.Services.Loaders.MSISDNPrefixLoader',
    'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.MsisdnLocker'
]).constant('SELECT_SERVICE_SETTINGS', {
    MSISDN_SELECTION_AUTO : 'Automatic',
    MSISDN_SELECTION_MANUAL	: 'Manual',
    MSISDN_SELECTION_RESERVE : 'Reserved'
});

function SelectNumberController($rootScope, $scope, $parse, SelectNumberService, SELECT_SERVICE_SETTINGS, SPINNER_EVENTS, MSISDNPrefixLoader, getMSISDNPrefixFn, OfferingData, FlashMessage, translateFilter, CommonMsisdnPresentationModel, DataModel, MsisdnLocker) {
    var __ = translateFilter;

    var serviceNumberService = new SelectNumberService($scope.model.masterData);
    var offerDataService = new OfferingData($scope.model.selectedOffering);


    var msisdn = DataModel.create($scope.model, {
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

    MsisdnLocker.start.bind($scope.msisdnPM)

    $scope.model.msisdnPM = $scope.msisdnPM;
    //console.log("$scope.msisdnPM>>>>>>",$scope.msisdnPM)

    $scope.getPrefixList = function(){
        if ($scope.model.serviceDetails.gsmService.stDirect.MSISDNSelection.masterCode === SELECT_SERVICE_SETTINGS.MSISDN_SELECTION_MANUAL){
            var commonRequestPayload = $scope.getCommoRequestPayload();
            var serviceDetails = commonRequestPayload;
            var msisdnLoader = MSISDNPrefixLoader(serviceDetails);
            msisdnLoader.load().then(function(response){
                $scope.prefixList = response;
                //console.log(" $scope.prefixList>>>>", $scope.prefixList)
            });
        }
    };

    $scope.getCommoRequestPayload = function(){
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
    'MSISDNPrefixLoader',
    'getMSISDNPrefixFn',
    'OfferingData',
    'FlashMessage',
    'translateFilter',
    'CommonMsisdnPresentationModel',
    'DataModel',
    'MsisdnLocker'
];
module.controller(SelectNumberController.name, SelectNumberController);
