	'use strict';
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
