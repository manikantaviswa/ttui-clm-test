'use strict';

angular.module('TT-UI.Common.Services.Resource', [
	'ngResource',
	'TT-UI.Config',
	'TT-UI.Common.Services.Api',
	'TT-UI.Common.Services.ResourceResponseParser',
	'TT-UI.Common.Services.ErrorsInterceptor'
])

.service('ResourceTransform', ['$http', '$log', 'resourceResponseParserFn', 'parseErrorsFn', 'emitErrorPopupFn', function($http, $log, resourceResponseParserFn, parseErrorsFn, emitErrorPopupFn) {
	function forceObjectResponse(data, uri) {
		if (angular.isArray(data)) {
			$log.error('API response error: Expecting object but instead received array', uri, data);

			return data[0];
		}

		return data;
	}

	function forceArrayResponse(data, uri) {
		if (!angular.isArray(data)) {
			$log.error('API response error: Expecting array but instead received object', uri, data);

			return [data];
		}

		return data;
	}

	this.getTransformations = function(isArray, uri) {
		var transformFn = isArray ? forceArrayResponse : forceObjectResponse;

		return $http.defaults.transformResponse
			.concat(resourceResponseParserFn)
			.concat(function(data){
				return transformFn(data, uri);
			});
	};

	this.interceptResponse = function(response) { //parseErrorsFn
		var res = response.resource;
		var data = response.data;
		var result;

		if (angular.isArray(data) && angular.isArray(res)){
			result = res.map(function(r) {
				return r.hasOwnProperty('$promise') ? r.toJSON() : r;
			});
		} else if (angular.isObject(data) && angular.isObject(res)){
			result = res.toJSON();
		} else {
			result = data;
		}

		var errors = parseErrorsFn(angular.isArray(result) ? result[0] : result);

		if (errors){
			emitErrorPopupFn(errors);
		}

		return result;
	};
}])

.factory('ResourceFactory', ['$resource', 'CONFIG', 'ResourceTransform', function($resource, CONFIG, ResourceTransform) {
	return function(uriHost, uriPath, method, isArray) {
		isArray = !!isArray;
		var uri = uriHost + uriPath;

		return $resource(
			uri, {
				tenantId:   CONFIG.API_TENANT_ID,
				apiVersion: CONFIG.API_VERSION
			}, {
				fetch: {
					method: method,
					isArray: isArray,
					transformResponse: ResourceTransform.getTransformations(isArray, uri),
					interceptor: {
						response: ResourceTransform.interceptResponse
					}
				}
			}
		);
	};
}])

.factory('AlternateApiVersionResourceFactory', ['$resource', 'CONFIG', 'ResourceTransform', function($resource, CONFIG, ResourceTransform) {
	return function(uriHost, uriPath, method, isArray) {
		isArray = !!isArray;

		var uri = uriHost + uriPath;

		return $resource(
			uri, {
				tenantId:   CONFIG.API_TENANT_ID,
				apiVersion: CONFIG.API_VERSION_ALTERNATE
			}, {
				fetch: {
					method: method,
					isArray: isArray,
					transformResponse: ResourceTransform.getTransformations(isArray, uri),
					interceptor: {
						response: ResourceTransform.interceptResponse
					}
				}
			}
		);
	};
}]);
