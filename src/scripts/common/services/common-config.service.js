define([
	'angular',
	'angular-storage',
	'ttui-common'
], function(angular) {
	'use strict';
	angular.module('CLM-UI.customers.Customershome.Services.Configuration', [
		'angular-storage',
		'TT-UI.Common'
	])
		.constant('OPCO_CONFIG_DATA', {
			CACHE_STORAGE_NS: 'config',
			OPCO_URL: 'data/envirnoments/config.',
			CORE_URL : 'data/envirnoments/config.core.json'
		})

		.factory('CommonConfiguration', CommonConfiguration);
	CommonConfiguration.$inject = ['$translate', 'CONFIG', 'XhrHelper', '$parse', '$q', 'OPCO_CONFIG_DATA', '$log', 'store',
		'COMMON_CONSTANTS_CORPORATE', 'COMMON_CONSTANTS_RETAIL', 'COMMON_CONSTANTS_CONFIG'];
	function CommonConfiguration($translate, CONFIG, XhrHelper, $parse, $q, OPCO_CONFIG_DATA, $log, store, COMMON_CONSTANTS_CORPORATE,
			COMMON_CONSTANTS_RETAIL, COMMON_CONSTANTS_CONFIG) {

		var getConfigForKey  = function(key) {
			var	data = store.get(OPCO_CONFIG_DATA.CACHE_STORAGE_NS);
			return $parse(key)(data);
		};

		var getConfigKeys = function(valuesMap, customerType) {
			var results = {};
			var COMMON_CONSTANT = customerType === 'Retail' ? COMMON_CONSTANTS_RETAIL : COMMON_CONSTANTS_CORPORATE;

			var	data = store.get(OPCO_CONFIG_DATA.CACHE_STORAGE_NS);
			angular.forEach(valuesMap, function(key) {
				var values = $parse(COMMON_CONSTANT[key])(data) === true ? true : false;
				results[key] = values;
			});
			return results;
		};
		var getCommonConfigKeys = function(valuesMap) {
			var results = {};

			var	data = store.get(OPCO_CONFIG_DATA.CACHE_STORAGE_NS);
			angular.forEach(valuesMap, function(key) {
				var values = $parse(COMMON_CONSTANTS_CONFIG[key])(data) === true ? true : false;
				results[key] = values;
			});
			return results;
		};
		var getConfigKeyValues = function(valuesMap, constants) {
			var results = {};
			var	data = store.get(OPCO_CONFIG_DATA.CACHE_STORAGE_NS);
			angular.forEach(valuesMap, function(key) {
				results[key] = $parse(constants[key])(data);
			});
			return results;
		};

		return {
			getConfigForKey: getConfigForKey,
			getConfigKeys: getConfigKeys,
			getConfigKeyValues: getConfigKeyValues,
			getCommonConfigKeys: getCommonConfigKeys,
			getOpcosConfig: function() {
				var deferred = $q.defer();
				$translate('CLM').then(this.getFromCache).then(function(data){
					return data;
				}).catch(this.loadOpcoConfig.bind(this))
					.then(this.readOpcoData)
					.then(this.storeInCache)
					.then(deferred.resolve)
					.catch(deferred.reject)
					.catch($log.error);
				return deferred.promise;
			},

			loadOpcoConfig: function() {
				var opcoUrl = OPCO_CONFIG_DATA.OPCO_URL + CONFIG.OPCO + '.json';
				return XhrHelper.loadJsonDeferred(opcoUrl).then(function(data){
					return data;
				},
					this.loadDefaultConfig);
			},

			loadDefaultConfig: function() {
				return XhrHelper.loadJsonDeferred(OPCO_CONFIG_DATA.CORE_URL);

			},

			readOpcoData: function(response) {
				var data = response;
				return data || $q.reject('Missing Config data', data);
			},

			getFromCache: function() {
				var data;
				try {
					data = store.get(OPCO_CONFIG_DATA.CACHE_STORAGE_NS);
				}
				catch (e) {
				}

				if (data) {
					return data;
				}

				return $q.reject();
			},

			storeInCache: function(opcoData) {
				store.set(OPCO_CONFIG_DATA.CACHE_STORAGE_NS, opcoData);

				return opcoData;
			},

			clearCache: function() {
				store.remove(OPCO_CONFIG_DATA.CACHE_STORAGE_NS);
			},
			getRequiredData: function() {
				return store.get(OPCO_CONFIG_DATA.CACHE_STORAGE_NS);
			},
			populateCustomerProfileFields: function(form) {
				var schemaPaths = [
					'profileDetails.basicDetails',
					'profileDetails.address.addressDetails.items'
				];
				var requiredData = this.getRequiredData();
				this.populateRequiredFields(form, requiredData.customerProfilePage, schemaPaths);
				return form;
			},
			populateServiceUsersFields: function(form) {
				var schemaPaths = [
					'serviceUser.basicDetails',
					'serviceUser.address.addressDetails.items',
					'serviceUser.demographics'
				];
				var requiredData = this.getRequiredData();
				this.populateRequiredFields(form, requiredData.serviceUsersPage, schemaPaths);
				return form;
			},
			populateBillingAccountDetailsFields: function(form) {
				var schemaPaths = [
					'billingAccounts.billingAccount.accountOwnerDetails',
					'billingAccounts.billingAccount.billingAddressDetails',
					'billingAccounts.billingAccount',
					'billingAccounts.billingAccount.relationshipManager'
				];
				var requiredData = this.getRequiredData();
				this.populateRequiredFields(form, requiredData.billingAccountDetailsPage, schemaPaths);
				return form;
			},
			populateMandatoryDocumentFields: function(form){
				var schemaPaths = [
					'collectDocuments.identificationDetail.items'
				];
				var requiredData = this.getRequiredData();
				this.populateRequiredFields(form, requiredData.mandatoryDocuments, schemaPaths);
				return form;
			},
			populateServiceDetailFields: function(form){
				var schemaPaths = [
					'serviceDetails.gsmService.stDirect'
				];
				var requiredData = this.getRequiredData();
				this.populateRequiredFields(form, requiredData.serviceDetailsPage, schemaPaths);
				return form;
			},
			populateRequiredFields : function(form, requiredData, schemaPaths) {
				var schema = form.schema;
				angular.forEach(schemaPaths, function(schemaPath) {
					var propertySchemaPath = this.getPropertySchema(schemaPath, schema);
					var propertyReqPropSchema = $parse(schemaPath)(requiredData);
					propertySchemaPath.required = propertyReqPropSchema.required;

				}.bind(this));
			},
			createPathForPropertySchema: function(path){
				var customPath = 'properties.' + path.replace(/\./g, '.properties.');
				var addItemsPath = customPath.replace(/\.properties.items/g, '.items');
				return addItemsPath;
			},
			getPropertySchema: function(path, schema){
				var schemaGetter = $parse(this.createPathForPropertySchema(path));
				return schemaGetter(schema);
			},

			setReqFeildsForSubType: function(form, serviceReqSubType) {
				if (!_.isEmpty(serviceReqSubType)) {
					var reqFields = getConfigForKey('reqFeildsForSubType');
					if (!_.isEmpty(reqFields[serviceReqSubType])) {
						angular.forEach(reqFields[serviceReqSubType], function(field) {
							var paths = COMMON_CONSTANTS_CONFIG.schemaPathsReqForSubType[field];
							angular.forEach(paths, function(path) {
								var schema = $parse(path)(form.schema);
								if (schema) {
									if (!schema.required) {
										schema.required = [];
									}
									schema.required.push(field);
									if ($parse('properties.' + field + '.properties.masterCode')(schema)) {
										$parse('properties.' + field + '.required').assign(schema, ['masterCode']);
									} else {
										$parse('properties.' + field + '.required').assign(schema, true);
									}
								}
							});
						});
					}
				}
				return form;
			}
		};

	}
});
