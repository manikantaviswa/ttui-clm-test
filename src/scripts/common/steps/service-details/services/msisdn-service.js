
	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Services.MsisdnService', [
		'TT-UI.Config',
        'TT-UI-CLM.Common.Api.Inventory.Msisdn.GetCommonMobileDetailsByMSISDN',
		'TT-UI-CLM.Common.Api.Inventory.CommonInventoryRequestApi',
        'TT-UI-CLM.Common.Api.Inventory.CommonApiPath'
	]);

	function CommonMsisdnService($q, getCommonMobileDetailsByMSISDNFn, CONFIG, commonInventoryRequestApiFn, COMMON_INVENTORY_API_PATH, validateMsisdn,
						validatePortInMsisdn) {

		this.loadAvailable = function(msisdn, model, pageNumber, pageSize) {
			//console.log("msisdn, model, pageNumber, pageSize>>>>>", msisdn, model, pageNumber, pageSize);
			return getCommonMobileDetailsByMSISDNFn(msisdn, model, pageNumber, pageSize);
		};

		/*this.loadReserved = function(token, hlrNumber, pageNumber, msisdnNumber, pageSize) {
			return getMobileDetailsByReservationTokenFn(token, hlrNumber, pageNumber , msisdnNumber, pageSize);
		};*/

		this.block = function(serviceNumbers, model) {
			model.serviceNumbers = serviceNumbers;
            var requestPayload = {
                serviceType : model.serviceType,
                subServiceType : model.subServiceType,
                numberSelectionMode : model.selectionType,
                serviceNumber : model.serviceNumbers
            };
			return commonInventoryRequestApiFn(COMMON_INVENTORY_API_PATH.MSISDN_BLOCK, requestPayload)
				.then(function(data){
					return data;
				}, function(errors){
					return $q.reject(errors);
				});
		};

		this.release = function(model) {
            var requestPayload = {
                serviceType : model.serviceType,
                subServiceType : model.subServiceType,
                serviceNumber : model.number
            };
			return commonInventoryRequestApiFn(COMMON_INVENTORY_API_PATH.MSISDN_RELEASE, requestPayload);
		};

		this.formatInternationalMSISDN = function(number) {
			return (CONFIG.MSISDN_COUNTRY_CODE || '') + number;
		};

		this.validateMsisdnNumberFn = function(msisdn) {
			return validateMsisdn(msisdn);
		};

		this.validatePortInMSISDNNumberFn = function(msisdn) {
			return validatePortInMsisdn(msisdn);
		};
	}

    CommonMsisdnService.$injector = ['$q', 'getCommonMobileDetailsByMSISDNFn', 'CONFIG', 'commonInventoryRequestApiFn', 'COMMON_INVENTORY_API_PATH', 'validateMsisdn',
	'validatePortInMsisdn'];

	module.service(CommonMsisdnService.name, CommonMsisdnService);