
	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Api.Inventory.Msisdn.GetMobileDetailsByReservationToken', [
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Api.Inventory.CommonRequestInventory'
	]);

	function getMobileDetailsByReservationTokenFactory($parse, Assert, commonRequestInventoryFn) {

		var URL = 'GetMobileDetailsByReservationTokenRequest/json/query';
		var RESPONSE_PATH = 'mobileNumbersList.mobileNumbers';
		var PAGE_SIZE = '10';
		var parseResponse;

		function getMobileDetailsByReservationTokenFn(token, hlrNumber, pageNumber, msisdnNumber, pageSize) {
			Assert.isDefined(token, 'Mandatory parameter `token` not given or empty.');

			var request = prepareRequest(token, hlrNumber,  pageNumber, msisdnNumber, pageSize);
			return commonRequestInventoryFn(URL, request).then(parseResponse);
		}
		parseResponse = $parse(RESPONSE_PATH);

		function prepareRequest(token, hlrNumber,  pageNumber, msisdnNumber, pageSize) {
			return {
				resTokenNumber: token,
				hlrNumber: hlrNumber || '',
				pageNumber: pageNumber || '1',
				pageSize: pageSize || PAGE_SIZE,
				msisdn: msisdnNumber || ''
			};
		}

		return getMobileDetailsByReservationTokenFn;
	}

	getMobileDetailsByReservationTokenFactory.$inject = ['$parse', 'Assert', 'commonRequestInventoryFn'];

	module.factory('getMobileDetailsByReservationTokenFn', getMobileDetailsByReservationTokenFactory);
