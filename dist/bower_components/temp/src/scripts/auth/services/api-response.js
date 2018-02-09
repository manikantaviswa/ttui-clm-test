'use strict';

var module = angular.module('TT-UI.Auth.Services.ApiResponse', [
	'TT-UI.Auth.Services.OAuth'
]);

function ApiResponse (OAUTH_AUTH) {

	var TOKEN_EXPIRED_ERROR = 'REGERR0129';
	var TOKEN_EXPIRED_SSO_ERROR = 'invalid_token';

	function hasOauthHeader(headers) {
		return headers.hasOwnProperty(OAUTH_AUTH.HTTP_HEADER_NAME) &&
			headers[OAUTH_AUTH.HTTP_HEADER_NAME].indexOf('Bearer') === 0;
	}

	this.isAuthorized = function (response) {

		if(!hasOauthHeader(response.config.headers)) {
			return true;
		}

		var statusCode = response.status;

		return (!OAUTH_AUTH.HTTP_ERROR_CODES.some(function(code) {
			return statusCode === code;
		}));
	};

	this.isTokenExpired = function(response) {
		if (response && response.error){
			if (angular.isArray(response.error)){
				return response.error.some(function(error) {
					return error.code === TOKEN_EXPIRED_ERROR;
				});
			}
			return response.error === TOKEN_EXPIRED_SSO_ERROR;
		}
		return false;
	};
}

ApiResponse.$inject = ['OAUTH_AUTH'];
module.service('ApiResponse', ApiResponse);
