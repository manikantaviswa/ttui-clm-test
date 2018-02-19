	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Services.CommonMasterDataResults', [
		'TT-UI.Common',
		'TT-UI-CLM.Common.Services.Config',
        'TT-UI-CLM.Common.Services.CommonMasterDataUtil'
	]);

	function CommonMasterDataResults (COMMON_MASTER_CONFIG, CommonMasterDataUtil) {

		var getMasterDataResults = function(masterData) {
			return CommonMasterDataUtil.getMasterDataValues(masterData, [COMMON_MASTER_CONFIG.CUSTOMER_TYPE, COMMON_MASTER_CONFIG.INDUSTRIES, COMMON_MASTER_CONFIG.ADDRESS_TYPES,
				COMMON_MASTER_CONFIG.COUNTRIES, COMMON_MASTER_CONFIG.REGISTRATION_TYPE, COMMON_MASTER_CONFIG.CONTACT_TYPES, COMMON_MASTER_CONFIG.PREMISES_TYPES, COMMON_MASTER_CONFIG.LANGUAGES, COMMON_MASTER_CONFIG.PREFERRED_MODE_OF_COMMUNICATIONS,
				COMMON_MASTER_CONFIG.PREFERRED_TIMES, COMMON_MASTER_CONFIG.SUFFIX, COMMON_MASTER_CONFIG.TITLE, COMMON_MASTER_CONFIG.ACCOUNT_TYPES, COMMON_MASTER_CONFIG.CURRENCIES, COMMON_MASTER_CONFIG.BILL_PERIODICITY,
				COMMON_MASTER_CONFIG.BILL_DISPATCH_DETAILS, COMMON_MASTER_CONFIG.CARD_TYPES, COMMON_MASTER_CONFIG.DUNNING_SCHEDULE, COMMON_MASTER_CONFIG.BANKS,
				COMMON_MASTER_CONFIG.SUB_SEGMENT, COMMON_MASTER_CONFIG.APPLICATION_MODE, COMMON_MASTER_CONFIG.SUBSIDIARY, COMMON_MASTER_CONFIG.BUSINESS_TYPE, COMMON_MASTER_CONFIG.LOCALITIES,
				COMMON_MASTER_CONFIG.SERVICE_LIMIT_TYPE, COMMON_MASTER_CONFIG.NATIONALITY, COMMON_MASTER_CONFIG.OCCUPATION, COMMON_MASTER_CONFIG.INCOME_RANGE,
				COMMON_MASTER_CONFIG.QUALIFICATION, COMMON_MASTER_CONFIG.TAX_EXEMPTION, COMMON_MASTER_CONFIG.DEBIT_ACCOUNT_TYPE,
				COMMON_MASTER_CONFIG.PAYMENT_METHOD, COMMON_MASTER_CONFIG.PAYMENT_CURRENCY, COMMON_MASTER_CONFIG.BILLING_REGION, COMMON_MASTER_CONFIG.TAX_POLICIES, COMMON_MASTER_CONFIG.LANDLORD_DESIGNATION,
				COMMON_MASTER_CONFIG.CV_APPROVE_REASONS, COMMON_MASTER_CONFIG.CV_REJECT_REASONS, COMMON_MASTER_CONFIG.WAIVE_OFF_APPR_REASONS, COMMON_MASTER_CONFIG.WAIVE_OFF_REJECT_REASONS, COMMON_MASTER_CONFIG.TELEPHONE_CATEGORIES, COMMON_MASTER_CONFIG.TELEPHONE_SELECTIONS]);
		};

		var getDefaultValues = function(masterData) {
			return CommonMasterDataUtil.getMasterDataDefault(masterData, [COMMON_MASTER_CONFIG.CUSTOMER_TYPE, COMMON_MASTER_CONFIG.INDUSTRIES, COMMON_MASTER_CONFIG.ADDRESS_TYPES,
				COMMON_MASTER_CONFIG.COUNTRIES, COMMON_MASTER_CONFIG.REGISTRATION_TYPE, COMMON_MASTER_CONFIG.CONTACT_TYPES, COMMON_MASTER_CONFIG.PREMISES_TYPES, COMMON_MASTER_CONFIG.LANGUAGES, COMMON_MASTER_CONFIG.PREFERRED_MODE_OF_COMMUNICATIONS,
				COMMON_MASTER_CONFIG.PREFERRED_TIMES, COMMON_MASTER_CONFIG.SUFFIX, COMMON_MASTER_CONFIG.TITLE, COMMON_MASTER_CONFIG.ACCOUNT_TYPES, COMMON_MASTER_CONFIG.CURRENCIES, COMMON_MASTER_CONFIG.BILL_PERIODICITY,
				COMMON_MASTER_CONFIG.BILL_DISPATCH_DETAILS, COMMON_MASTER_CONFIG.CARD_TYPES, COMMON_MASTER_CONFIG.DUNNING_SCHEDULE, COMMON_MASTER_CONFIG.SUB_SEGMENT, COMMON_MASTER_CONFIG.APPLICATION_MODE,
				COMMON_MASTER_CONFIG.BUSINESS_TYPE, COMMON_MASTER_CONFIG.SERVICE_LIMIT_TYPE, COMMON_MASTER_CONFIG.NATIONALITY, COMMON_MASTER_CONFIG.DEBIT_ACCOUNT_TYPE,
				COMMON_MASTER_CONFIG.MOBILE_MONEY_ACCOUNT_TYPE, COMMON_MASTER_CONFIG.PAYMENT_METHOD, COMMON_MASTER_CONFIG.PAYMENT_CURRENCY, COMMON_MASTER_CONFIG.BILLING_REGION, COMMON_MASTER_CONFIG.TAX_POLICIES,
				COMMON_MASTER_CONFIG.LANDLORD_DESIGNATION, COMMON_MASTER_CONFIG.CV_APPROVE_REASONS, COMMON_MASTER_CONFIG.CV_REJECT_REASONS, COMMON_MASTER_CONFIG.WAIVE_OFF_APPR_REASONS, COMMON_MASTER_CONFIG.WAIVE_OFF_REJECT_REASONS, COMMON_MASTER_CONFIG.TELEPHONE_CATEGORIES, COMMON_MASTER_CONFIG.TELEPHONE_SELECTIONS]);
		};

		return {
			getMasterDataResults : getMasterDataResults,
			getDefaultValues : getDefaultValues
		};
	}
    CommonMasterDataResults.$inject = ['COMMON_MASTER_CONFIG', 'CommonMasterDataUtil'];
	module.factory(CommonMasterDataResults.name, CommonMasterDataResults);