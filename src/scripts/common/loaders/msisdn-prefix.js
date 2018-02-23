	'use strict';

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