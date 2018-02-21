
	'use strict';

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
