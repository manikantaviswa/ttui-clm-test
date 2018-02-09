'use strict';

var module = angular.module('TT-UI.Auth.Services.ApiInterceptor', [
	'TT-UI.Auth.Services.OAuth',
	'TT-UI.Auth.Services.ApiResponse',
	'TT-UI.Auth.Services.RefreshToken',
	'TT-UI.Auth.Config'
]);

function ApiInterceptor($injector, OAUTH_AUTH, $rootScope, $q, $timeout, AccessToken, RefreshToken, ApiResponse) {

	return {
		request: function (config) {

			if (isAuthorizationHeaderRequired(config) && isAccessTokenAvailable()) {
				setAuthorizationHeader(config, AccessToken.get().access_token);
			}
			return config;

		},

		responseError: function (response) {
			if(ApiResponse.isTokenExpired(response.data)) {
				return RefreshToken.doRefresh(response.config);
			} else if (response.status === 401 && !ApiResponse.isAuthorized(response)) {
				return handleNotAuthorized(response);
			} else {
				return $q.reject(response);
			}
		}

	};

	function handleNotAuthorized(response) {
		AccessToken.destroy();
		$rootScope.$emit('oauth:denied');
		return $q.reject(response);
	}

	function isRefreshingRequest(config){
		return config.data && config.data.refresh_token;
	}

	function isAccessTokenAvailable(){
		return !!AccessToken.get() && !!AccessToken.get().access_token;
	}

	function isRetryRequest(config){
		return !!config.retry;
	}

	function isAuthorizationHeaderMissing(config){
		return angular.isUndefined(config.headers[OAUTH_AUTH.HTTP_HEADER_NAME]);
	}

	function isAuthorizationHeaderRequired(config){
		return !isRefreshingRequest(config) && (isRetryRequest(config) || isAuthorizationHeaderMissing(config));
	}

	function setAuthorizationHeader(config, accessToken){
		var headerValue = OAUTH_AUTH.HTTP_HEADER_VALUE.replace('{{accessToken}}', accessToken);
		config.headers[OAUTH_AUTH.HTTP_HEADER_NAME] = headerValue;
		return config;
	}
}

ApiInterceptor.$inject = ['$injector', 'OAUTH_AUTH', '$rootScope', '$q', '$timeout', 'AccessToken', 'RefreshToken', 'ApiResponse'];
module.factory('ApiInterceptor', ApiInterceptor);
