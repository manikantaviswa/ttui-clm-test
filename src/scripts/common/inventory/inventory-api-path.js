
	'use strict';

	angular.module('TT-UI-CLM.Common.Api.Inventory.CommonApiPath', [])

		.constant('COMMON_INVENTORY_API_PATH', {
			IMEI_BLOCK:    'BlockDongleRequest/json/',
			IMEI_RELEASE:  'ReleaseDongleRequest/json/',
			MSISDN_BLOCK:   'BlockNumber/json/query',
			MSISDN_RELEASE:  'ReleaseNumber/json/query',
			GET_SIM_DETAILS_API: 'GetSimDetailsBySIMNumberRequest/json/query',
			GET_SIM_BY_KIT_API: 'GetSimDetailsByKitNumberRequest/json/query',
			SIM_BLOCK: 'BlockSIMNumberRequest/json/',
			SIM_RELEASE: 'ReleaseSIMNumberRequest/json/',
			CORP_SIM_BLOCK: 'BlockMSISDNBulkRequest/json/1',
			CORP_SIM_RELEASE: 'ReleaseMSISDBulkNRequest/json/1',
			RESPONSE_JSON_PATH: 'simDetails.simDetail',
			SUCCESS_RESPONSE: 'SUCCESS'
		});

