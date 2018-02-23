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
    'TT-UI-CLM.Common.Services.Config',
    'TT-UI-CLM.Common.Services.OfferingData'
]);


// Source: src/scripts/common/config.js
var module = angular.module('TT-UI-CLM.Common.Services.Config', [])
    .constant('CLM_COMMON_CONFIG', {
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


// Source: src/scripts/common/inventory/inventory-api-path.js

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



// Source: src/scripts/common/inventory/inventory-request-api-fn.js

var module = angular.module('TT-UI-CLM.Common.Api.Inventory.CommonInventoryRequestApi', [
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Api.Inventory.CommonRequestInventory'
	]);

	function commonInventoryRequestApiFactory($q, Assert, commonRequestInventoryFn) {

		function commonInventoryRequestApiFn(URL, model) {
			//Assert.isDefined(model.serviceNumbers, 'Mandatory input number not given or empty.');
			return commonRequestInventoryFn(URL , model).then(function(data){
				return data;
			}, function(error){
				return $q.reject(error);
			});
		}

		return commonInventoryRequestApiFn;
	}

    commonInventoryRequestApiFactory.$inject = ['$q', 'Assert', 'commonRequestInventoryFn'];

	module.factory('commonInventoryRequestApiFn', commonInventoryRequestApiFactory);


// Source: src/scripts/common/inventory/msisdn/get-mobile-details-by-msisdn-fn.js

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


// Source: src/scripts/common/inventory/request-inventory-fn.js

var module = angular.module('TT-UI-CLM.Common.Api.Inventory.CommonRequestInventory', [
		'TT-UI.Common',
		'TT-UI.Common.Tpl',
		'TT-UI.User'
	]);

	var COMMON_INVENTORY_SETTINGS = {
		API_PATH: 'clm-reg/rest/dataservice/:tenantId/CLM/:apiVersion/',
		API_METHOD: 'PUT',
		RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
	};

	function commonRequestInventoryFn($q, $parse, Api, ResourceFactory, CurrentUser, COMMON_INVENTORY_SETTINGS) {

		var prepareRequest = function(apiPath, data) {
			//console.log("data:::::",data);
			var request = {
				nms:{
				},
				path: apiPath
			};
			if (angular.isDefined(data)) {
				request.nms.nms = data;
			}
			return $q.when(request);
		};

		var checkErrors = function(response) {
			var errors = $parse(COMMON_INVENTORY_SETTINGS.RESPONSE_ERROR_JSON_PATH)(response);

			if (angular.isArray(errors) && errors.length) {
				return $q.reject(errors.map(function(error) {
					return error.desc;
				}));
			}
			return response;
		};

		var callApi = function(request) {
			//console.log("request>>>>>>>>>",Api.getUrl(), COMMON_INVENTORY_SETTINGS.API_PATH + request.path, COMMON_INVENTORY_SETTINGS.API_METHOD)
			return ResourceFactory(Api.getUrl(), COMMON_INVENTORY_SETTINGS.API_PATH + request.path, COMMON_INVENTORY_SETTINGS.API_METHOD).fetch(request.nms).$promise;
		};

		return function(apiPath, data) {
			return prepareRequest(apiPath, data)
				.then(callApi)
				.then(checkErrors);
		};
	}

    commonRequestInventoryFn.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'CurrentUser', 'COMMON_INVENTORY_SETTINGS'];

	module.constant('COMMON_INVENTORY_SETTINGS', COMMON_INVENTORY_SETTINGS);
	module.factory(commonRequestInventoryFn.name, commonRequestInventoryFn);


// Source: src/scripts/common/loaders/abstract-loader.js
var module = angular.module('TT-UI-CLM.Common.Services.Loaders.CommonAbstractLoader', []);

	function CommonAbstractLoaderFactory(){

		var CommonAbstractLoader = function(){};

        CommonAbstractLoader.prototype.load = function() {
			throw new Error('load method must be implemented');
		};

        CommonAbstractLoader.prototype.updateValues = function(ngModel, form, values){
			if (angular.isUndefined(form.schema) || !angular.isArray(values)){
				return;
			}

			form.titleMap = createTitleMap(values);
			form.schema.enum = createEnumList(values, form.required);

			if (ngModel.$invalid && ngModel.$error['tv4-1']) {
				ngModel.$setValidity('tv4-1', true);
			}
		};

		function createTitleMap(values){
			return values.map(function(item){
				return {
					name: item.name,
					value: item.code
				};
			});
		}

		function createEnumList(values, isRequired){
			var list =  values.map(function(item){
				return item.code;
			});
			if (!isRequired){
				list.push(null);
			}
			return list;
		}

		return CommonAbstractLoader;
	}

	module.factory('CommonAbstractLoader', CommonAbstractLoaderFactory);

// Source: src/scripts/common/loaders/msisdn-prefix-loader.js
var module = angular.module('TT-UI-CLM.Common.Services.Loaders.CommonMSISDNPrefixLoader', [
		'TT-UI.Common',
        'TT-UI-CLM.Common.Services.Loaders.CommonAbstractLoader',
        'TT-UI-CLM.Common.Services.CommonMSISDNPrefix'
	]);

	function CommonMSISDNPrefixLoaderFactory($q, $parse, CommonAbstractLoader, commonGetMSISDNPrefixFn) {

		var CommonMSISDNPrefixLoader = function(serviceDetails){
			this.serviceDetails = serviceDetails;
			/*this.activatedViaPath = activatedVia;
			this.msisdnCategoryPath = msisdnCategory;*/
		};
		/*CommonMSISDNPrefixLoader.prototype = Object.create(AbstractLoader.prototype);
		CommonMSISDNPrefixLoader.prototype.constructor = CommonMSISDNPrefixLoader;*/

		CommonMSISDNPrefixLoader.prototype.load = function(){
			/*var msisdnCategory = values[this.msisdnCategoryPath];
			var activatedVia = $parse(this.activatedViaPath)(formModel);*/
			return commonGetMSISDNPrefixFn(this.serviceDetails).then(this._getData.bind(this));
		};

		CommonMSISDNPrefixLoader.prototype._getData = function(msisdnPrefixesData){
			var result = [];
			msisdnPrefixesData.forEach(function(msisdnPrefix){
				result.push({'name': msisdnPrefix, 'code': msisdnPrefix});
			});
			return result;
		};

		return function(serviceDetails){
			return new CommonMSISDNPrefixLoader(serviceDetails);
		};

	}

    CommonMSISDNPrefixLoaderFactory.$inject = ['$q', '$parse', 'CommonAbstractLoader', 'commonGetMSISDNPrefixFn'];
	module.factory('CommonMSISDNPrefixLoader', CommonMSISDNPrefixLoaderFactory);


// Source: src/scripts/common/loaders/msisdn-prefix.js
angular.module('TT-UI-CLM.Common.Services.CommonMSISDNPrefix', [
		'TT-UI.Common',
		'TT-UI.Common.Tpl'
	]);
    module.constant('COMMON_GET_MSISDN_PREFIX_CONFIG', {
        API_URL: 'clm-reg/rest/dataservice/:tenantId/CLM/:apiVersion/GetNumberPrefix/json/query',
        API_METHOD: 'PUT',
        RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
    })

	.factory('commonGetMSISDNPrefixFn', ['$parse', 'Api', 'FormHelper', 'ResourceFactory', 'COMMON_GET_MSISDN_PREFIX_CONFIG',  function($parse, Api, FormHelper, ResourceFactory, COMMON_GET_MSISDN_PREFIX_CONFIG){

		var commonGetMSISDNPrefixFn = function(serviceDetails){

			var request = prepare(serviceDetails);
			return send(request).then(getErrors).then(getResponse);
		};

		function prepare(serviceDetails){
			var request = {};

			$parse('nms').assign(request, getServiceDetails(serviceDetails));
			return request;
		}

		function getServiceDetails(serviceDetails){
			return serviceDetails;

		}

        var getErrors = function(response) {

            var errors = $parse(COMMON_GET_MSISDN_PREFIX_CONFIG.RESPONSE_ERROR_JSON_PATH)(response);
            if (angular.isArray(errors) && errors.length){
                return $q.reject(errors.map(function(error) {
                    return error.desc;
                }));
            }
            //var response = {"numberPrefix":["525", "570", "243","23234","2344","5353","75343"]};
            return response;
        };

		var send = function(request){
			var apiService = ResourceFactory(Api.getUrl(), COMMON_GET_MSISDN_PREFIX_CONFIG.API_URL, COMMON_GET_MSISDN_PREFIX_CONFIG.API_METHOD);
			return apiService.fetch(request).$promise;
		};

		var getResponse = function(rawResponse){
			return $parse('numberPrefix')(rawResponse) || [];
		};

		return commonGetMSISDNPrefixFn;
	}]);

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

	function CommonMasterDataUtil($q, $http, $parse, CLM_COMMON_CONFIG, CustomerSubCategoryLoaderFactory, CustomerCategoryLoaderFactory,
							SubServiceLoaderFactory, ProvincesLoaderFactory, CitiesLoaderFactory, TechnologyLoaderFactory,
							BillCyclesLoader, DocumentsLoaderTypeService, DocumentPurposeLoaderService, AddressFormatLoaderFactory,
							CorporateDunningScheduleLoaderFactory, PostOfficeCodeLoaderFactory, SubLocalityLoaderFactory,
							StreetAddressLoaderFactory, PostalCodeLoaderFactory, ISPDocumentsLoaderService, LatitudeLoaderFactory, LongitudeLoaderFactory) {

		var getMasterDataValues = function(masterData, valuesMap) {
			var results = {};
			angular.forEach(valuesMap, function(key) {
				results[key] = $parse(CLM_COMMON_CONFIG[key])(masterData);
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

    CommonMasterDataUtil.$inject = ['$q', '$http', '$parse', 'CLM_COMMON_CONFIG', 'CustomerSubCategoryLoaderFactory', 'CustomerCategoryLoaderFactory',
		'SubServiceLoaderFactory', 'ProvincesLoaderFactory', 'CitiesLoaderFactory', 'TechnologyLoaderFactory',  'BillCyclesLoader',
		'DocumentsLoaderTypeService', 'DocumentPurposeLoaderService', 'AddressFormatLoaderFactory', 'CorporateDunningScheduleLoaderFactory',
		'PostOfficeCodeLoaderFactory', 'SubLocalityLoaderFactory', 'StreetAddressLoaderFactory', 'PostalCodeLoaderFactory',
		'ISPDocumentsLoaderService', 'LatitudeLoaderFactory', 'LongitudeLoaderFactory'];
	module.factory(CommonMasterDataUtil.name, CommonMasterDataUtil);


// Source: src/scripts/common/services/offering-data.js
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


// Source: src/scripts/common/steps/service-details/helpers/abstract-locker.js

var module = angular.module('TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonAbstractLocker', [
        'TT-UI-CLM.Common.Api.Utils.Assert'
	]);

	function CommonAbstractLockerFactory($q, store, Assert) {

		function CommonAbsctractLocker() {
			this.sessionKey = 'session';
			this.localKey = 'local';
			this.lockerType = '';
			this.lockerName = '';
			this.subscriberService = {};
			this.subscriberStorage = store.getNamespacedStore('subscriber-number');
		}

        CommonAbsctractLocker.prototype = {

			start: function(number) {
				var storageKey = this._getSessionStorageKey();
				this.subscriberStorage.remove(storageKey);

				if (!_.isEmpty(number)) {
					this.subscriberStorage.set(storageKey, number);
				}

				if (this._hasLocalNumber()) {
					this.free();
				}
			},

			cleanup: function() {
				this.subscriberStorage.remove(this._getSessionStorageKey());
				this.subscriberStorage.remove(this._getLocalStorageKey());
			},

			endWithCancel: function() {
				var promise;

				if (this._hasLocalNumber()) {
					promise = this.free();
				} else {
					promise = $q.resolve();
				}

				return promise.then(this.cleanup.bind(this));
			},

			endWithSubmit: function() {
				var promise;
				var sessionNumber;

				if (this._hasLocalNumber() && this._hasSessionNumber()) {
					sessionNumber = this._getSessionNumber();
					promise = this.subscriberService.release(sessionNumber);
				} else {
					promise = $q.resolve();
				}

				return promise.then(this.cleanup.bind(this));
			},

			lock: function(number, model) {
				Assert.isDefined(number, 'Please provide ' + this.lockerName + ' number to lock.');
				return this.subscriberService.block(number, model)
					.then(this._setLocalNumber(number), this.remove(number));
			},

			remove: function(){
				var storageKey = this._getLocalStorageKey();
				var number = this.subscriberStorage.get(storageKey);
				this._removeStorageKey(number);
				this.cleanup.bind(this);
			},

			free: function(model) {
				var storageKey = this._getLocalStorageKey();
				var number = this.subscriberStorage.get(storageKey);
				if (angular.isDefined(model)){
                    model.number = number;
				}
				Assert.isDefined(number, 'No number available to release.');
				Assert.isNotNull(number, 'No number available to release.');

				return this.subscriberService.release(model)
					.then(this._removeStorageKey(storageKey));
			},

			_hasLocalNumber: function() {
				return !_.isEmpty(this.subscriberStorage.get(this._getLocalStorageKey()));
			},

			_setLocalNumber: function(number) {
				this.subscriberStorage.set(this._getLocalStorageKey(), number);
			},

			_getSessionNumber: function() {
				return this.subscriberStorage.get(this._getSessionStorageKey());
			},

			_hasSessionNumber: function() {
				return !_.isEmpty(this.subscriberStorage.get(this._getSessionStorageKey()));
			},

			_removeStorageKey: function(storageKey) {
				this.subscriberStorage.remove(storageKey);
			},

			_getLocalStorageKey: function() {
				return this.lockerType + '.' + this.localKey;
			},

			_getSessionStorageKey: function() {
				return this.lockerType + '.' + this.sessionKey;
			}
		};

		return CommonAbsctractLocker;

	}

    CommonAbstractLockerFactory.$inject = ['$q', 'store', 'Assert'];

	module.factory('CommonAbstractLocker', CommonAbstractLockerFactory);

// Source: src/scripts/common/steps/service-details/helpers/msisdn-locker.js

var module = angular.module('TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonMsisdnLocker', [
		'TT-UI.Common',
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonAbstractLocker',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Services.MsisdnService'
	]);

	function CommonMsisdnLockerFactory(CommonMsisdnService, CommonAbstractLocker) {

        CommonMsisdnLocker.prototype = Object.create(CommonAbstractLocker.prototype);
        CommonMsisdnLocker.prototype.constructor = CommonMsisdnLocker;

		function CommonMsisdnLocker() {
            CommonAbstractLocker.call(this);
			this.lockerType = 'msisdn';
			this.lockerName = 'MSISDN';
			this.subscriberService = CommonMsisdnService;
			_.bindAll(this);
		}

		return new CommonMsisdnLocker();
	}

	CommonMsisdnLockerFactory.$inject = ['CommonMsisdnService', 'CommonAbstractLocker'];

	module.factory('CommonMsisdnLocker', CommonMsisdnLockerFactory);

// Source: src/scripts/common/steps/service-details/presentation/msisdn-presentation-model.js
angular.module('TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.MSISDNPresentaionModel', [
    'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.CommonSuggestionBoxPresentationModel',
    'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Strategy.MSISDNStrategyFactory',
    'TT-UI-CLM.Common.Utils.ErrorHandler',
    'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonMsisdnLocker',
    'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Services.MsisdnService',
    'TT-UI-CLM.Common.Api.Utils.Assert',
    'TT-UI-CLM.Common.Steps.Presentation.Strategy.ManualMsisdnStrategy',
    'TT-UI-CLM.Common.Steps.Presentation.Strategy.AutomaticMsisdnStrategy'
])
    .constant('MSISDN_SELECT_SERVICE_SETTINGS', {
        MSISDN_SELECTION_AUTO : 'Automatic',
        MSISDN_SELECTION_MANUAL	: 'Manual',
        MSISDN_SELECTION_RESERVE : 'Reserved'
    });

function CommonMsisdnPresentationModelFactory($parse,
                                        $q,
                                        CommonSuggestionBoxPresentationModel,
                                        Assert,
                                        CommonMsisdnService,
                                        MsisdnStrategyFactory,
                                        CommonMsisdnLocker,
                                        errorHandlerFn,
                                        CONFIG,
                                        MSISDN_SELECT_SERVICE_SETTINGS, CommonManualMsisdnStrategy, CommonAutomaticMsisdnStrategy){

    CommonMsisdnPresentationModel.prototype = Object.create(CommonSuggestionBoxPresentationModel.prototype);
    CommonMsisdnPresentationModel.prototype.constructor = CommonMsisdnPresentationModel;

   // var captcha = CaptchaDialog();

    function CommonMsisdnPresentationModel(model, isMSISDNPrefixRequired) {
        CommonSuggestionBoxPresentationModel.call(this);
        Assert.isDefined(model);
        this.isMsisdnPrefixRequired = angular.isDefined(isMSISDNPrefixRequired) ? isMSISDNPrefixRequired : true;
        this.itemsSourceField = 'number';
        this.model = model;
        this.strategy = MsisdnStrategyFactory();
        //console.log("this.strategy>>>>>>>>>>>>>>>",this.strategy);
        this.captchaVerified = false;
        this.msisdnLocker = CommonMsisdnLocker;
        if (model.mobileNumber) {
            this.selectedItem = {
                number: model.mobileNumber
            };
        }

        _.bindAll(this);
    }

    CommonMsisdnPresentationModel.prototype.isSelectionAllowed = function(value) {
        return angular.isDefined(this._findMsisdnObjectForNumber(value));
    };

    CommonMsisdnPresentationModel.prototype.isReadonly = function() {
        return angular.isDefined(this.selectedItem);
    };

    CommonMsisdnPresentationModel.prototype.update = function(fieldName) {
        $parse('mobileNumber').assign(this.model, '');
        return $q.when(this._updateStrategy())
            .then(this._updateSelection)
            //.then(this.assignValueToModel(formModel))
            //.then(this._showCaptchaIfApplicable.bind(this, fieldName))
            //.then(this._fetchMoreIfNotSelected);
    };

    /*MsisdnPresentationModel.prototype._showCaptchaIfApplicable = function(fieldName) {
        var promise = $q.when();

        if (this._isCaptchaApplicable()){
            if (fieldName === 'MSISDNSelection'){
                promise = promise.then(this._showCaptcha);
            } else {
                promise = $q.reject();
            }
        }

        return promise;
    };*/

    /*MsisdnPresentationModel.prototype._isCaptchaApplicable = function(){
        return CONFIG.CAPTCHA_REQUIRED === 'true' && this.model.selectionType === 'Manual' && !this.captchaVerified;
    };

    MsisdnPresentationModel.prototype._showCaptcha = function(){
        return captcha.show()
            .then(this._setCaptchaVerified)
            .catch(this._resetSelectionField);
    };

    MsisdnPresentationModel.prototype._setCaptchaVerified = function(){
        this.captchaVerified = true;
    };*/

    CommonMsisdnPresentationModel.prototype._resetSelectionField = function(){
        this.model.selectionType = undefined;
    };

    CommonMsisdnPresentationModel.prototype._load = function(value) {
        if (angular.isUndefined(this.strategy.load)){
            this._updateStrategy();
        }
        return this.strategy.load(value, this.isMsisdnPrefixRequired).catch(errorHandlerFn);
    };

    CommonMsisdnPresentationModel.prototype._search = function(value) {
        this.toSearchNumber = value;
        this.strategy.update(this.model);
        return this.strategy.search(value, this.isMsisdnPrefixRequired).catch(errorHandlerFn);
    };

    CommonMsisdnPresentationModel.prototype._select = function(value) {
        var serviceNumbers = [value];
        //console.log("value>>>>>",value)
        return this.msisdnLocker.lock(serviceNumbers, this.model)
            .then(this._findMsisdnObjectForNumber.bind(this, value), this._clear.bind(this))
            .catch(errorHandlerFn);
    };

    CommonMsisdnPresentationModel.prototype._clear = function(errors) {
        this.model.mobileNumber = '';
        this.model.hlrOfMsisdn = '';
        this.selectedItem = '';
        return $q.reject(errors);
    };

    CommonMsisdnPresentationModel.prototype._deselect = function() {
        //console.log("this.model>>>>>>>>>", this.model);
        return this.msisdnLocker.free(this.model)
            .catch(errorHandlerFn);
    };

    CommonMsisdnPresentationModel.prototype._setSelectedItem = function(value) {
        var newItemSelected = angular.isDefined(value);

        this.selectedItem = value;
        if (newItemSelected) {
            this.model.mobileNumber = value.number;
            this.model.hlrOfMsisdn = value.hlrNumber;
        } else {
            this.model.mobileNumber = '';
            this.model.hlrOfMsisdn = '';
        }

        return newItemSelected;
    };

    CommonMsisdnPresentationModel.prototype._updateStrategy = function() {
        var selectionType = this.model.selectionType;
        //console.log("selectionType>>>>>",selectionType)
        if (_.get(this, 'strategy.name') !== selectionType) {
            var Strategy = this.getStrategy(selectionType);
            //var Strategy = MsisdnStrategyFactory(selectionType);
            this.strategy = new Strategy(CommonMsisdnService);
            //console.log("this.strategy?????????",this.strategy)
        }
        ////console.log("this.strategy.update(this.model)>>>>>",this.strategy.update(this.model))
        return this.strategy.update(this.model);
    };

    CommonMsisdnPresentationModel.prototype.getStrategy = function(selectionType) {
        if (selectionType === MSISDN_SELECT_SERVICE_SETTINGS.MSISDN_SELECTION_AUTO) {
            return CommonAutomaticMsisdnStrategy;
        } else if (selectionType === MSISDN_SELECT_SERVICE_SETTINGS.MSISDN_SELECTION_MANUAL){
            return CommonManualMsisdnStrategy;
        } else if (selectionType === MSISDN_SELECT_SERVICE_SETTINGS.MSISDN_SELECTION_RESERVE){

        } else {
            return this.DummyMsisdnStrategy;
        }
    };

    CommonMsisdnPresentationModel.prototype.DummyMsisdnStrategy = function() {
        this.name = 'Dummy';
        this.update = _.noop;
        this.load = _.constant($q.when([]));
    };

    CommonMsisdnPresentationModel.prototype._updateSelection = function(value) {
        var queue = $q.when();

        var oldSelectedItemAvailable = !_.isEmpty(this.selectedItem);
        var newSelectedItemAvailable = !_.isEmpty(value);
        var selectionChanged = oldSelectedItemAvailable || newSelectedItemAvailable;

        if (oldSelectedItemAvailable) {
            //console.log("this.toSearchNumber>>>", this.toSearchNumber, value);
            queue.then(this._deselect.bind(this, this.toSearchNumber));
        }

        if (newSelectedItemAvailable) {
            queue.then(this._select.bind(this, value.number));
        }

        if (selectionChanged) {
            queue.then(this._setSelectedItem.bind(this, value));
        }

        return queue;
    };

    CommonMsisdnPresentationModel.prototype._findMsisdnObjectForNumber = function(number) {
        //console.log("number>>>>>>>>>>",number)
        return _.find(this.itemsSource, {number: number} || number);
    };

    CommonMsisdnPresentationModel.prototype._fetchMoreIfNotSelected = function() {
        if (!this.selectedItem && _.get(this, 'strategy.name') !== 'Manual') {
            var prefix = angular.isDefined(this.model.prefix) ? this.model.prefix : '';
            var mobileNumber = angular.isDefined(this.toSearchNumber) ? this.toSearchNumber : '';
            var toSearchNumber = prefix + mobileNumber;
            return this.fetchMore(this.model, toSearchNumber);
        } else if (!this.selectedItem && _.get(this, 'strategy.name') === 'Manual'){
            return this.clearItemSource();
        }
    };

    return CommonMsisdnPresentationModel;
}


CommonMsisdnPresentationModelFactory.$inject = [
    '$parse',
    '$q',
    'CommonSuggestionBoxPresentationModel',
    'Assert',
    'CommonMsisdnService',
    'MsisdnStrategyFactory',
    'CommonMsisdnLocker',
    'errorHandlerFn',
    'CONFIG',
    'MSISDN_SELECT_SERVICE_SETTINGS',
    'CommonManualMsisdnStrategy',
    'CommonAutomaticMsisdnStrategy'
];
module.factory('CommonMsisdnPresentationModel', CommonMsisdnPresentationModelFactory);

// Source: src/scripts/common/steps/service-details/presentation/strategy/automatic-msisdn-strategy.js

var module = angular.module('TT-UI-CLM.Common.Steps.Presentation.Strategy.AutomaticMsisdnStrategy', [
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Services.MsisdnService',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.CommonSuggestionBoxPresentationModel',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonMsisdnLocker',
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Utils.ErrorHandler',
        'TT-UI-CLM.Common.Services.OfferingData'
	]);

	function CommonAutomaticMsisdnFactory($parse, CommonManualMsisdnStrategy, OfferingData) {

		function CommonAutomaticMsisdnStrategy(MsisdnService) {
            CommonManualMsisdnStrategy.call(this, MsisdnService);
			this.name = 'Automatic';
		}

        CommonAutomaticMsisdnStrategy.prototype = Object.create(CommonManualMsisdnStrategy.prototype, {
			constructor: CommonAutomaticMsisdnStrategy
		});

        CommonAutomaticMsisdnStrategy.prototype.update = function(model) {
            CommonManualMsisdnStrategy.prototype.update.call(this, model);

			return this.load(model).then(this.fetchFirst);
		};

        CommonAutomaticMsisdnStrategy.prototype.fetchFirst = function(value) {
            return value || {};
        };

        CommonAutomaticMsisdnStrategy.prototype.load = function(model){
			var pageSize = 1;
			return this.service.loadAvailable('', model, pageSize, pageSize);
		};

		return CommonAutomaticMsisdnStrategy;
	}
    CommonAutomaticMsisdnFactory.$inject = ['$parse', 'CommonManualMsisdnStrategy', 'OfferingData'];
    module.factory('CommonAutomaticMsisdnStrategy', CommonAutomaticMsisdnFactory);



// Source: src/scripts/common/steps/service-details/presentation/strategy/manual-msisdn-strategy.js

var module = angular.module('TT-UI-CLM.Common.Steps.Presentation.Strategy.ManualMsisdnStrategy', [
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Services.MsisdnService',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.CommonSuggestionBoxPresentationModel',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonMsisdnLocker',
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Utils.ErrorHandler',
        'TT-UI-CLM.Common.Services.OfferingData'
	]);

	function CommonManualMsisdnStrategyFactory($q, translateFilter, OfferingData) {
		var __ = translateFilter;

		function CommonManualMsisdnStrategy(MsisdnService) {
			this.service = MsisdnService;
			this.name = 'Manual';
		}

        CommonManualMsisdnStrategy.prototype.update = function(model) {
            this.msisdnCategory = model.category;
            this.prefix = model.prefix;
            this.hlrNumber = model.hlrOfSim;
            this.model = model;
        };
        CommonManualMsisdnStrategy.prototype.load = function(msisdnNumber, isMsisdnPrefixRequired) {
            //console.log("inside load")
            return this._fetchMore(this.model.msisdnCategory, msisdnNumber || this.prefix, this.hlrNumber, this.serviceData, isMsisdnPrefixRequired);
        };
        CommonManualMsisdnStrategy.prototype._fetchMore = function(msisdnNumber, isMsisdnPrefixRequired, model) {
            if (!mandatoryParametersProvided(this.msisdnCategory)) {
                return $q.resolve([]);
            } else if (!this.prefix && isMsisdnPrefixRequired){
                return $q.reject(__('MSISDN prefix is required'));
            } else if (!numberMatchesPrefix(this.prefix, msisdnNumber)) {
                return this._loadPage(numberToSearch(this.prefix, msisdnNumber),model);
            } else if (numberMatchesPrefix(this.prefix, msisdnNumber)) {
                return this._loadPage(msisdnNumber, model);
            } else {
                return $q.resolve([]);
            }
        };
        CommonManualMsisdnStrategy.prototype._loadPage = function(msisdnNumber, model) {
            var newToken = [msisdnNumber, model];
            //console.log("newToken>>>>>>>>>>>", newToken, this.token)
            if (!angular.equals(newToken, this.token)) {
                this.token = newToken;
                this.nextPageNumber = 0;
            }
            var parameters = this.token.concat([this.nextPageNumber++]);
            //console.log("parameters>>>>>>>>>>>", parameters)
            return this.service.loadAvailable.apply(this, parameters);
        };
        CommonManualMsisdnStrategy.prototype.search = function(msisdnNumber, isMsisdnPrefixRequired) {
            this.nextPageNumber = 0;
            return this._fetchMore(msisdnNumber, isMsisdnPrefixRequired, this.model);
        };


		function mandatoryParametersProvided() {
			return _.every(arguments, _.isDefined);
		}

		function numberMatchesPrefix(prefix, number) {
			if (!_.isEmpty(prefix)){
				var startPrefix = new RegExp('^' + prefix);
				if (_.isUndefined(number)){
					number = '';
				}
				return startPrefix.test(number);
			} else {
				return !_.isUndefined(number) ? number : '';
			}

		}

		function numberToSearch(prefix, number) {
			if (!_.isUndefined(number)){
				var serachNumber = !_.isEmpty(prefix) ? prefix + number : number;
				return serachNumber;
			}
			return !_.isEmpty(prefix) ? prefix : '';
		}

		return CommonManualMsisdnStrategy;
	}

    CommonManualMsisdnStrategyFactory.$inject = ['$q', 'translateFilter', 'OfferingData'];
    module.factory('CommonManualMsisdnStrategy', CommonManualMsisdnStrategyFactory);// try with service



// Source: src/scripts/common/steps/service-details/presentation/strategy/msisdn-strategy-factory.js
angular.module('TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Strategy.MSISDNStrategyFactory', [
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Services.MsisdnService',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.CommonSuggestionBoxPresentationModel',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonMsisdnLocker',
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Utils.ErrorHandler'
    ]);

	function MsisdnStrategyFactory($q, $injector) {
		var STRATEGY_SUFFIX = 'MsisdnStrategy';

		function DummyMsisdnStrategy() {
			this.name = 'Dummy';
			this.update = _.noop;
			this.load = _.constant($q.when([]));
		}

		return function(name) {
			var serviceName = name + STRATEGY_SUFFIX;
			if ($injector.has(serviceName)) {
				return $injector.get(serviceName);
			} else {
				return DummyMsisdnStrategy;
			}
		};
	}

	MsisdnStrategyFactory.$inject = ['$q', '$injector'];
    module.factory('MsisdnStrategyFactory', MsisdnStrategyFactory);


// Source: src/scripts/common/steps/service-details/presentation/strategy/reserved-msisdn-strategy.js

var module = angular.module('TT-UI-CLM.Common.Steps.Presentation.Strategy.ReservedMsisdnStrategy', [
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Services.MsisdnService',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.CommonSuggestionBoxPresentationModel',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonMsisdnLocker',
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Utils.ErrorHandler'
	]);

	function CommonReservedMsisdnStrategyFactory($q) {
		function CommonReservedMsisdnStrategy(MsisdnService) {
			this.service = MsisdnService;
			this.name = 'Reserved';
		}

        CommonReservedMsisdnStrategy.prototype = {
			update: function(model) {
				this.reserverationId = model.reservationId;
				this.hlrNumber = model.hlrOfSim;
			},
			load: function() {
				if (!_.isEmpty(this.reserverationId)) {
					return this._fetchMore(this.reserverationId, this.hlrNumber);
				} else {
					return $q.when([]);
				}
			},
			_fetchMore: function(reserverationId, hlrNumber, msisdnNumber) {
				if (!mandatoryParametersProvided(reserverationId)) {
					return $q.resolve([]);
				}

				return this._loadPage(reserverationId, hlrNumber, msisdnNumber);
			},
			_loadPage: function(reserverationId, hlrNumber, msisdnNumber) {
				var newToken = [reserverationId, hlrNumber];
				var parameters;

				if (!angular.equals(newToken, this.token)) {
					this.token = newToken;
					this.nextPageNumber = 0;
				}
				this.nextPageNumber++;
				if (typeof msisdnNumber === 'undefined') {
					msisdnNumber = '';
				}
				parameters = this.token.concat([this.nextPageNumber, msisdnNumber]);
				return this.service.loadReserved.apply(this, parameters);
			},
			search: function(msisdnNumber) {
				this.nextPageNumber = 0;
				if (!_.isEmpty(this.reserverationId)) {
					return this._fetchMore(this.reserverationId, this.hlrNumber, msisdnNumber);
				}

				return $q.when([]);
			}
		};

		function mandatoryParametersProvided() {
			return _.every(arguments, _.isDefined);
		}

		return CommonReservedMsisdnStrategy;
	}

    CommonReservedMsisdnStrategyFactory.$inject = ['$q'];

    module.factory('CommonReservedMsisdnStrategy', CommonReservedMsisdnStrategyFactory);




// Source: src/scripts/common/steps/service-details/presentation/suggestion-box-presentation-model.js
var module = angular.module('TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.CommonSuggestionBoxPresentationModel', [
        'TT-UI-CLM.Common.Services.OfferingData'
	]);
	function CommonSuggestionBoxPresentationModelFactory($parse, $q, OfferingData) {

		function CommonSuggestionBoxPresentationModel() {
			this.itemsSource = [];
			this.itemsSourceField = 'label';
		}

        CommonSuggestionBoxPresentationModel.prototype = {

			getOfferingDataService: function(offering){
                var offerDataService = new OfferingData(offering);
                return offerDataService;
			},
			selectAction: function(value) {
                /*var offerDataService = this.getOfferingDataService(value.selectedOffering);
                var serviceDetails = {
                    'serviceType': offerDataService.getServiceType(),
                    'subServiceType': offerDataService.getSubServiceType(),
					'numberSelectionMode': $parse('serviceDetails.gsmService.stDirect.MSISDNSelection.masterCode')(value),
					'serviceNumber': $parse('serviceDetails.gsmService.stDirect.MSISDN')(value)
				};*/
				$q.when(this._select(value))
					.then(this._setSelectedItem.bind(this));
			},

			changeAction: function(value) {
				$q.when(this._deselect(value))
					.then(this._setSelectedItem.bind(this, undefined))
					.then(this.fetchMore.bind(this));
			},

			fetchMore: function(model, searchNumber) {
				this._processResponseData(this._load(searchNumber));
			},

			searchMore: function(model, searchNumber) {
                /*var offerDataService = this.getOfferingDataService(model.selectedOffering);

				var serviceData = {
                    'serviceType': offerDataService.getServiceType(),
                    'subServiceType': offerDataService.getSubServiceType(),
                    'technology': offerDataService.getTechnology(),
                    'businessType': offerDataService.getBusinessType(),
                    'activatedVia': $parse('serviceDetails.gsmService.activatedVia.masterCode')(model)
				};
                //console.log("serviceData>>>>>>>>", serviceData)*/
				this._processResponseData(this._search(searchNumber));
			},

			isSelectionAllowed: function() {
				return true;
			},

			isReadonly: function() {
				return false;
			},

			_load: function() {
				return [];
			},

			_search: function() {
				return [];
			},

			_select: function() {
				throw new Error('To be implemented in inheriting function.');
			},

			_deselect: function() {
				throw new Error('To be implemented in inheriting function.');
			},

			_setSelectedItem: function() {

			},

			_processResponseData: function(promise) {
				//console.log("result>>>>>>>>>>>>>>>>>>>>>>>>>>>>",promise)
				this.isLoading = true;
				this.itemsSource = [];

				var saveItemsSource = function(result){
					this.itemsSource = result;
				}.bind(this);

				var restoreIsLoading = function(){
					this.isLoading = false;
				}.bind(this);

				var catchException = function() {
					this.itemsSource = [];
				}.bind(this);

				$q.when(promise)
					.then(saveItemsSource)
					.catch(catchException)
					.finally(restoreIsLoading);
			},

			clearItemSource: function() {
				this.itemsSource = [];
			}
		};

		return CommonSuggestionBoxPresentationModel;
	}

	CommonSuggestionBoxPresentationModelFactory.$inject = ['$parse', '$q', 'OfferingData'];

	module.factory('CommonSuggestionBoxPresentationModel', CommonSuggestionBoxPresentationModelFactory);

// Source: src/scripts/common/steps/service-details/services/msisdn-service.js

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

// Source: src/scripts/common/utils/assert.js

var module = angular.module('TT-UI-CLM.Common.Api.Utils.Assert', []);

	function AssertionError(message) {
		this.name = 'AssertionError';
		this.message = message || 'Assertion failed.';
		this.stack = (new Error()).stack;
	}

	AssertionError.prototype = Object.create(Error.prototype);
	AssertionError.prototype.constructor = AssertionError;

	function assertIsTrue(condition, optionalMessage) {
		if (condition !== true) {
			throw new AssertionError(optionalMessage);
		}
	}

	function assertIsDefined(value, optionalMessage) {
		assertIsTrue(angular.isDefined(value), optionalMessage);
	}

	function assertIsNotNull(value, optionalMessage) {
		assertIsTrue(!_.isNull(value), optionalMessage);
	}

	function assertHasProperty(object, propertyName, optionalMessage) {
		return assertIsDefined(_.get(object, propertyName), optionalMessage);
	}

	module.value('Assert', {
		isTrue: assertIsTrue,
		isDefined: assertIsDefined,
		hasProperty: assertHasProperty,
		isNotNull: assertIsNotNull
	});


// Source: src/scripts/common/utils/data-model.js

var module = angular.module('TT-UI-CLM.Common.Utils.CommonDataModel', []);

	function CommonDataModelFactory($parse) {

		function CommonDataModel(source, mappings) {
			Object.defineProperty(this, 'source', {
				enumerable: false,
				value: source
			});
			Object.keys(mappings || {}).forEach(function(key) {
				this.addProperty(key, mappings[key]);
			}, this);
		}

        CommonDataModel.prototype.addProperty = function(name, mapping) {
			var accessor = $parse(mapping);
			Object.defineProperty(this, name, {
				get: function() {
					return accessor(this.source);
				}.bind(this),
				set: function(value) {
					accessor.assign(this.source, value);
				}.bind(this),
				enumerable: true
			});
		};

        CommonDataModel.prototype.getSource = function() {
			return this.source;
		};

		return {
			create: function(source, mappings) {
				return new CommonDataModel(source, mappings);
			}
		};

	}

    CommonDataModelFactory.$inject = ['$parse'];

	module.factory('CommonDataModel', CommonDataModelFactory);


// Source: src/scripts/common/utils/error-handler-fn.js

var module = angular.module('TT-UI-CLM.Common.Utils.ErrorHandler', [
		'TT-UI.Common',
		'TT-UI.Common.ErrorMessageString'
	]);

	function ErrorHandlerFnFactory($q, $log, translateFilter, FlashMessage, createErrorMessageString) {
		var __ = translateFilter;

		function errorHandlerFn(errorMsg) {
			errorMsg = errorMsg || 'Unknown error';
			if (!angular.isArray(errorMsg)) {
				errorMsg = [errorMsg];
			}

			var errorMsgString;
			errorMsg.forEach(function(message) {
				errorMsgString = createErrorMessageString(message);
				$log.error(errorMsgString);
				FlashMessage.show(__('Error'), errorMsgString, 'danger');
			});

			return $q.reject(errorMsg);
		}

		return errorHandlerFn;
	}

	ErrorHandlerFnFactory.$inject = ['$q', '$log', 'translateFilter', 'FlashMessage', 'createErrorMessageString'];

	module.factory('errorHandlerFn', ErrorHandlerFnFactory);

return angular;
})(window, window.angular);
