
	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Api.Inventory.Msisdn.GetCommonMobileDetailsByMSISDN', [
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Api.Inventory.CommonRequestInventory'
	]);

	function getCommonMobileDetailsByMSISDNFactory($parse, Assert, commonRequestInventoryFn) {

		var URL = 'GetAvailableNumbers/json/query';
		var PAGE_SIZE = '10';
		var RESPONSE_PATH = 'numbersList';

		function getCommonMobileDetailsByMSISDNFn(msisdn, model, pageNumber, pageSize) {
			var request = prepareRequest(msisdn, model, pageNumber, pageSize);
			return commonRequestInventoryFn(URL, request).then(function(response){
                //var response = {"numbersList":[{"category":"NPOST","hlrNumber":"0","number":"52501115"},{"category":"NPOST","hlrNumber":"0","number":"52501116"}]};
				return parseResponse(response);
            });
		}

		function prepareRequest(msisdn, model, pageNumber,  pageSize) {
			//console.log("model>>>>>>>>",model)
			var commonRequestPayload = {
				serviceType: model.serviceType,
				subServiceType: model.subServiceType,
				technology: model.technology,
				businessType: model.businessType,
				activatedVia: model.activatedVia,
				category: model.category || '',
                serviceNumber: msisdn || '',
				hlrNumber: 'MDF-01',
				pageNumber: pageNumber || '1',
				pageSize: pageSize || PAGE_SIZE
			};
			return commonRequestPayload;
		}

		var parseResponse = function(response){
			return $parse(RESPONSE_PATH)(response);
        };

		return getCommonMobileDetailsByMSISDNFn;
	}

    getCommonMobileDetailsByMSISDNFactory.$inject = ['$parse', 'Assert', 'commonRequestInventoryFn'];

	module.factory('getCommonMobileDetailsByMSISDNFn', getCommonMobileDetailsByMSISDNFactory);
