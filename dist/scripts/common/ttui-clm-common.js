/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";


// Source: src/scripts/common/index.js
angular.module('TT-UI-CLM.CommonComponents', [
    'TT-UI-CLM.Common.Services.CommonMasterDataResults',
    'TT-UI-CLM.Common.Services.CommonMasterDataUtil',
    'TT-UI-CLM.Common.Services.Config'
]);


// Source: src/scripts/common/config.js
var module = angular.module('TT-UI-CLM.Common.Services.Config', [])
    .constant('COMMON_CONFIG', {
        MASTER_CUSTOMER_TYPE: 'masterData.partyTypes.partyType',
        MASTER_INDUSTRIES: 'masterData.industries.industry',
        MASTER_ADDRESS_TYPES: 'masterData.addressTypes.addressType',
        MASTER_COUNTRIES: 'countries.country',
        MASTER_CONTACT_TYPES: 'masterData.contactTypes.contactType',
        MASTER_PREMISES_TYPES: 'masterData.premises.premise',
        MASTER_LANGUAGES: 'masterData.languages.language',
        MASTER_PREFERRED_MODE_OF_COMMUNICATIONS: 'masterData.preferredModeOfCommunications.preferredModeOfCommunication',
        MASTER_PREFERRED_TIMES: 'masterData.preferredTimes.preferredTime',
        MASTER_SUFFIX: 'masterData.suffixes.suffix',
        MASTER_TITLE: 'masterData.titles.title',
        MASTER_CURRENCIES: 'masterData.currencies.currency',
        MASTER_ACCOUNT_TYPES: 'masterData.accountTypes.accountType',
        MASTER_BILL_PERIODICITY: 'billPeriodicities.billPeriodicity',
        MASTER_BILL_DISPATCH_DETAILS: 'masterData.billDispatchModes.billDispatchMode',
        MASTER_CARD_TYPES: 'masterData.cardTypes.cardType',
        MASTER_DUNNING_SCHEDULE: 'dunningSchedules.dunningSchedule',
        MASTER_BANKS: 'masterData.banks.bank',
        MASTER_MSISDN_CATEGORY : 'masterData.MSISDNCategories.MSISDNCategory',
        MASTER_MSISDN_SELECTION : 'masterData.MSISDNSelections.MSISDNSelection',
        MASTER_BUSINESS_TYPE : 'masterData.businessTypes.businessType',
        MASTER_SERVICE_TYPE : 'masterData.serviceTypes.serviceType',
        MASTER_COUNTRY : 'countries.country',
        MASTER_REG_TYPE : 'masterData.regTypes.regType',
        MASTER_SUB_SEGMENT : 'masterData.segments.segment',
        MASTER_APPLICATION_MODE : 'masterData.applicationModes.applicationMode',
        MASTER_QUALIFICATION : 'masterData.highestQualifications.highestQualification',
        MASTER_INCOME_RANGE : 'masterData.incomeRanges.incomeRange',
        MASTER_OCCUPATION : 'masterData.occupations.occupation',
        MASTER_SUBSIDIARY : 'masterData.subsidiaries.subsidiary',
        MASTER_PURPOSES: 'masterData.purposes.purpose',
        MASTER_DOCUMENT_TYPES: 'masterData.documentTypes.documentType',
        MASTER_PERSONAL_QUESTIONS: 'masterData.personalQuestions',
        MASTER_LOCALITIES: 'masterData.localities.locality',
        MASTER_SERVICE_LIMIT_TYPE : 'masterData.serviceLimitTypes.serviceLimitType',
        MASTER_DOMAIN_TYPE : 'masterData.domains.domain',
        MASTER_BASE_STATION_IP_TYPE : 'masterData.baseStations.baseStation',
        MASTER_MOBILE_MONEY_ACCOUNT_TYPE : 'masterData.mobileMoneyAccounts.mobileMoneyAccount',
        MASTER_NATIONALITY: 'masterData.nationalities.nationality',
        MASTER_VIRTUAL_ADDRESS_TYPE: 'masterData.addressTypes.virtualIndividualAddressType',
        MASTER_CS_HOME_REGION: 'masterData.CSHomeRegions.CSHomeRegion',
        MASTER_TAX_EXEMPTION :'masterData.taxExemptionCategories.taxExemptionCategory',
        MASTER_DEBIT_ACCOUNT_TYPE: 'masterData.debitAccountTypes.debitAccountType',
        MASTER_TAX_POLICIES: 'masterData.taxPolicyIds.taxPolicyId',
        MASTER_REGISTRATION_TYPE: 'masterData.cvTypes.cvType',
        MASTER_PAYMENT_METHOD: 'paymentMethods.paymentMethod',
        MASTER_PAYMENT_CURRENCY: 'masterData.paymentCurrencies.paymentCurrency',
        MASTER_BILLING_REGION: 'masterData.billingRegions.billingRegion',
        MASTER_LANDLORD_DESIGNATION: 'masterData.designations.designation',
        MASTER_CV_APPROVE_REASONS: 'masterData.cvApprReasons.cvApprReason',
        MASTER_CV_REJECT_REASONS: 'masterData.cvRejReasons.cvRejReason',
        MASTER_WAIVE_OFF_APPR_REASONS: 'masterData.waiveOffApprReasons.waiveOffApprReason',
        MASTER_WAIVE_OFF_REJECT_REASONS: 'masterData.waiveOffRejReasons.waiveOffRejReason',
		MASTER_TELEPHONE_CATEGORIES: 'masterData.telephoneCategories.telephoneCategory',
        MASTER_TELEPHONE_SELECTIONS: 'masterData.telephoneSelections.telephoneSelection'

    })
    .constant('COMMON_MASTER_CONFIG', {
        CUSTOMER_TYPE: 'MASTER_CUSTOMER_TYPE',
        INDUSTRIES: 'MASTER_INDUSTRIES',
        ADDRESS_TYPES: 'MASTER_ADDRESS_TYPES',
        COUNTRIES: 'MASTER_COUNTRIES',
        CONTACT_TYPES: 'MASTER_CONTACT_TYPES',
        PREMISES_TYPES: 'MASTER_PREMISES_TYPES',
        LANGUAGES: 'MASTER_LANGUAGES',
        PREFERRED_MODE_OF_COMMUNICATIONS: 'MASTER_PREFERRED_MODE_OF_COMMUNICATIONS',
        PREFERRED_TIMES: 'MASTER_PREFERRED_TIMES',
        SUFFIX: 'MASTER_SUFFIX',
        TITLE: 'MASTER_TITLE',
        ACCOUNT_TYPES: 'MASTER_ACCOUNT_TYPES',
        CURRENCIES: 'MASTER_CURRENCIES',
        BILL_PERIODICITY: 'MASTER_BILL_PERIODICITY',
        BILL_DISPATCH_DETAILS: 'MASTER_BILL_DISPATCH_DETAILS',
        CARD_TYPES: 'MASTER_CARD_TYPES',
        DUNNING_SCHEDULE: 'MASTER_DUNNING_SCHEDULE',
        BANKS: 'MASTER_BANKS',
        MSISDN_CATEGORIES : 'MASTER_MSISDN_CATEGORY',
        MSISDN_SELECTIONS : 'MASTER_MSISDN_SELECTION',
        BUSINESS_TYPE : 'MASTER_BUSINESS_TYPE',
        SERVICE_TYPE : 'MASTER_SERVICE_TYPE',
        COUNTRY : 'MASTER_COUNTRY',
        REG_TYPE : 'MASTER_REG_TYPE',
        DOMAIN_TYPE : 'MASTER_DOMAIN_TYPE',
        BASE_STATION_IP_TYPE : 'MASTER_BASE_STATION_IP_TYPE',
        SUB_SEGMENT : 'MASTER_SUB_SEGMENT',
        APPLICATION_MODE : 'MASTER_APPLICATION_MODE',
        QUALIFICATION : 'MASTER_QUALIFICATION',
        INCOME_RANGE : 'MASTER_INCOME_RANGE',
        OCCUPATION : 'MASTER_OCCUPATION',
        SUBSIDIARY : 'MASTER_SUBSIDIARY',
        PURPOSES: 'MASTER_PURPOSES',
        DOCUMENT_TYPES: 'MASTER_DOCUMENT_TYPES',
        PERSONAL_QUESTIONS: 'MASTER_PERSONAL_QUESTIONS',
        DEFAULT_DOCUMENT_PURPOSE : 'POID',
        LOCALITIES: 'MASTER_LOCALITIES',
        SERVICE_LIMIT_TYPE : 'MASTER_SERVICE_LIMIT_TYPE',
        MOBILE_MONEY_ACCOUNT_TYPE : 'MASTER_MOBILE_MONEY_ACCOUNT_TYPE',
        NATIONALITY: 'MASTER_NATIONALITY',
        VIRTUAL_ADDRESS_TYPE: 'MASTER_VIRTUAL_ADDRESS_TYPE',
        CS_HOME_REGION: 'MASTER_CS_HOME_REGION',
        TAX_EXEMPTION : 'MASTER_TAX_EXEMPTION',
        DEBIT_ACCOUNT_TYPE: 'MASTER_DEBIT_ACCOUNT_TYPE',
        TAX_POLICIES: 'MASTER_TAX_POLICIES',
        REGISTRATION_TYPE: 'MASTER_REGISTRATION_TYPE',
        PAYMENT_METHOD:'MASTER_PAYMENT_METHOD',
        PAYMENT_CURRENCY:'MASTER_PAYMENT_CURRENCY',
        BILLING_REGION:'MASTER_BILLING_REGION',
        LANDLORD_DESIGNATION:'MASTER_LANDLORD_DESIGNATION',
        CV_APPROVE_REASONS:'MASTER_CV_APPROVE_REASONS',
        CV_REJECT_REASONS:'MASTER_CV_REJECT_REASONS',
        WAIVE_OFF_APPR_REASONS:'MASTER_WAIVE_OFF_APPR_REASONS',
        WAIVE_OFF_REJECT_REASONS:'MASTER_WAIVE_OFF_REJECT_REASONS',
		TELEPHONE_CATEGORIES: 'MASTER_TELEPHONE_CATEGORIES',
		TELEPHONE_SELECTIONS: 'MASTER_TELEPHONE_SELECTIONS'
    });


// Source: src/scripts/common/services/common-master-data-results.js
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


// Source: src/scripts/common/services/common-master-data-service.js
var module = angular.module('TT-UI-CLM.Common.Services.CommonMasterDataUtil', [
		'TT-UI.Common',
		'CLM-UI.Customers.Services.Loaders.CustomerSubCategoryLoader',
		'CLM-UI.Customers.Services.Loaders.CustomerCategoryLoader',
		'CLM-UI.Customers.Services.Loaders.SubServiceLoader',
		'CLM-UI.Customers.Services.Loaders.ProvincesLoader',
		'CLM-UI.Customers.Services.Loaders.CitiesLoader',
		'CLM-UI.Customers.Services.Loaders.TechnologyLoader',
		'CLM-UI.Customers.Services.Loaders.BillCyclesLoader',
		'CLM-UI.Customers.Services.Loaders.AddressFormatLoader',
		'CLM-UI.Corporate.Config',
		'CLM-UI.Corporate.Services.DocumentsLoaderTypeService',
		'CLM-UI.Corporate.Services.DocumentsPurposeLoaderService',
		'CLM-UI.Corporate.Services.Loaders.CorporateDunningScheduleLoader',
		'CLM-UI.Customers.Services.Loaders.ISPDocumentsLoader',
		'CLM-UI.Customers.Services.Loaders.LatitudeLoader',
		'CLM-UI.Customers.Services.Loaders.LongitudeLoader'
	]);

	function CommonMasterDataUtil($q, $http, $parse, COMMON_CONFIG, CustomerSubCategoryLoaderFactory, CustomerCategoryLoaderFactory,
							SubServiceLoaderFactory, ProvincesLoaderFactory, CitiesLoaderFactory, TechnologyLoaderFactory,
							BillCyclesLoader, DocumentsLoaderTypeService, DocumentPurposeLoaderService, AddressFormatLoaderFactory,
							CorporateDunningScheduleLoaderFactory, PostOfficeCodeLoaderFactory, SubLocalityLoaderFactory,
							StreetAddressLoaderFactory, PostalCodeLoaderFactory, ISPDocumentsLoaderService, LatitudeLoaderFactory, LongitudeLoaderFactory) {

		var getMasterDataValues = function(masterData, valuesMap) {
			var results = {};
			angular.forEach(valuesMap, function(key) {
				results[key] = $parse(COMMON_CONFIG[key])(masterData);
			});
			return results;
		};

		var getMasterDataDefault = function(masterData, valuesMap) {
			var results = {};
			var masterDataValues = getMasterDataValues(masterData, valuesMap);
			angular.forEach(masterDataValues , function(value, key) {
				var defaultValue;
				if (!angular.isUndefined(value)){
					value.some(function(option) {
						if (option.default === 'Y'){
							defaultValue = option.code;
						}
						results[key] = defaultValue;
					});
				}
			});
			return results;
		};

		var getCustomerCategory = function(customerType) {
			return CustomerCategoryLoaderFactory('customerType')
				.load({}, {customerType: customerType});
		};

		var getCustomerSubCategory = function(customerType, customerCategory) {
			return CustomerSubCategoryLoaderFactory('customerType', 'customerCategory')
				.load({}, {customerType: customerType, customerCategory: customerCategory});

		};

		var getCities = function(country, province) {
			return CitiesLoaderFactory('country', 'province')
				.load({}, {country: country, province: province});
		};
		var getSubService = function(serviceType) {
			return SubServiceLoaderFactory('serviceType')
				.load({}, {serviceType: serviceType});
		};

		var getTechnology = function(serviceType) {
			return TechnologyLoaderFactory('serviceType')
				.load({}, {serviceType: serviceType});

		};

		var getProvince = function(country) {
			return ProvincesLoaderFactory('country')
				.load({}, {country: country});

		};

		var getAddressFormat = function(addressType) {
			return AddressFormatLoaderFactory('addressType')
				.load({}, {addressType: addressType});
		};

		var getDocumentTypeList = function(customerType, customerSubCategory, documentPurpose) {
			return DocumentsLoaderTypeService('customerType', 'customerSubCategory', 'documentPurpose')
				.load({}, {customerType: customerType, customerSubCategory: customerSubCategory, documentPurpose: documentPurpose});

		};

		var getDocumentPurposeList = function(customerType, customerCategory, customerSubCategory) {
			return DocumentPurposeLoaderService('customerType', 'customerCategory', 'customerSubCategory')
				.load({}, {customerType: customerType, customerCategory: customerCategory, customerSubCategory: customerSubCategory});

		};

		var getDunningSchedule = function(riskCategory, isDunningApplicable) {
			return CorporateDunningScheduleLoaderFactory('riskCategory', 'isDefaultDunningApplicable')
				.load({}, {riskCategory:riskCategory, isDunningApplicable: isDunningApplicable});
		};

		var getPostOfficeCode = function(city) {
			return PostOfficeCodeLoaderFactory('city')
				.load({}, {city: city});
		};

		var getSubLocalities = function(city) {
			return SubLocalityLoaderFactory('city')
				.load({}, {city: city});
		};

		var getStreets = function(city, subLocality) {
			return StreetAddressLoaderFactory('city', 'subLocality')
				.load({}, {city: city, subLocality: subLocality});
		};

		var getPostalCode = function(city, subLocality) {
			return PostalCodeLoaderFactory('city', 'subLocality')
				.load({}, {city: city, subLocality: subLocality});
		};

		var getDocuments = function(customerType, customerSubCategory, documentPurpose, serviceType, activatedVia) {
			return ISPDocumentsLoaderService('customerType', 'customerSubCategory', 'documentPurpose', 'serviceType', 'activatedVia')
				.load({}, {customerType: customerType, customerSubCategory: customerSubCategory, documentPurpose: documentPurpose,
				serviceType: serviceType, activatedVia: activatedVia});

		};

		var getLatituides = function(city, neighbourhood) {
			return LatitudeLoaderFactory('city', 'neighbourhood')
				.load({}, {city:city, neighbourhood: neighbourhood});
		};

		var getLongitudes = function(city, neighbourhood) {
			return LongitudeLoaderFactory('city', 'neighbourhood')
				.load({}, {city:city, neighbourhood: neighbourhood});
		};

		return {
			getMasterDataValues: getMasterDataValues,
			getMasterDataDefault: getMasterDataDefault,
			getCustomerSubCategory: getCustomerSubCategory,
			getCustomerCategory: getCustomerCategory,
			getCities: getCities,
			getSubService: getSubService,
			getTechnology: getTechnology,
			getProvince: getProvince,
			getAddressFormat : getAddressFormat,
			getDocumentTypeList: getDocumentTypeList,
			getDocumentPurposeList: getDocumentPurposeList,
			getDunningSchedule: getDunningSchedule,
			getPostOfficeCode: getPostOfficeCode,
			getSubLocalities: getSubLocalities,
			getStreets: getStreets,
			getPostalCode: getPostalCode,
			getDocuments: getDocuments,
			getLatituides: getLatituides,
			getLongitudes: getLongitudes
		};
	}

    CommonMasterDataUtil.$inject = ['$q', '$http', '$parse', 'COMMON_CONFIG', 'CustomerSubCategoryLoaderFactory', 'CustomerCategoryLoaderFactory',
		'SubServiceLoaderFactory', 'ProvincesLoaderFactory', 'CitiesLoaderFactory', 'TechnologyLoaderFactory',  'BillCyclesLoader',
		'DocumentsLoaderTypeService', 'DocumentPurposeLoaderService', 'AddressFormatLoaderFactory', 'CorporateDunningScheduleLoaderFactory',
		'PostOfficeCodeLoaderFactory', 'SubLocalityLoaderFactory', 'StreetAddressLoaderFactory', 'PostalCodeLoaderFactory',
		'ISPDocumentsLoaderService', 'LatitudeLoaderFactory', 'LongitudeLoaderFactory'];
	module.factory(CommonMasterDataUtil.name, CommonMasterDataUtil);


// Source: src/scripts/common/services/get-registration-data.js
var module = angular.module('TT-UI-CLM.SelectNumber.Services.GetRegistrationDataService', [
]);

function GetRegistrationDataService($parse) {

    function getServiceType(){

    }

    function getTechnology(){

    }

    return {
        getServiceType : getServiceType,
        getTechnology : getTechnology
    };
}
GetRegistrationDataService.$inject = ['$parse']
module.service(GetRegistrationDataService.name, GetRegistrationDataService);
return angular;
})(window, window.angular);
