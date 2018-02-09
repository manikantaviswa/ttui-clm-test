'use strict';

var module = angular.module('TT-UI.Auth.Services.FakeAuth', [
	'oauth',
	'TT-UI.Config'
]);

function fakeHttpProviderConfig($httpProvider, CONFIG) {
	if(CONFIG.AUTH_MODULE === 'FakeAuth'){
		$httpProvider.interceptors.push('FakeApiInterceptor');
	}
}
fakeHttpProviderConfig.$inject = ['$httpProvider', 'CONFIG'];
module.config(fakeHttpProviderConfig);

function FakeApiInterceptor(OAUTH_AUTH, $rootScope, $q, AccessToken, FakeApiResponse) {
	var token;

	var events = [
		'oauth:authorized',
		'oauth:login',
		'oauth:logout',
		'oauth:loggedOut',
		'oauth:denied',
		'oauth:expired'
	];

	var updateToken = function() {
		token = AccessToken.get();
	};

	events.forEach(function(eventName) {
		$rootScope.$on(eventName, updateToken);
	});

	return {
		request: function(config) {
			if (token && token.access_token && angular.isUndefined(config.headers[OAUTH_AUTH.HTTP_HEADER_NAME])) {
				var headerValue = OAUTH_AUTH.HTTP_HEADER_VALUE.replace('{{accessToken}}', token.access_token);

				config.headers[OAUTH_AUTH.HTTP_HEADER_NAME] = headerValue;
			}

			return config;
		},

		responseError: function(response) {
			if (!FakeApiResponse.isAuthorized(response)) {
				AccessToken.destroy();

				$rootScope.$emit('oauth:denied');
			}

			return $q.reject(response);
		}
	};
}

FakeApiInterceptor.$inject = ['OAUTH_AUTH', '$rootScope', '$q', 'AccessToken', 'FakeApiResponse'];
module.factory('FakeApiInterceptor', FakeApiInterceptor);

function FakeApiResponse(OAUTH_AUTH) {

	function hasOauthHeader(headers) {
		return headers.hasOwnProperty(OAUTH_AUTH.HTTP_HEADER_NAME) &&
			headers[OAUTH_AUTH.HTTP_HEADER_NAME].indexOf('Bearer') === 0;
	}

	this.isAuthorized = function (response) {

		if(!hasOauthHeader(response.config.headers)) {
			return true;
		}

		var statusCode = response.status;

		return (
		statusCode !== OAUTH_AUTH.HTTP_UNAUTHORIZED_CODE &&
		statusCode !== OAUTH_AUTH.HTTP_BAD_REQUEST_CODE);
	};

}
FakeApiResponse.$inject = ['OAUTH_AUTH'];
module.service('FakeApiResponse', FakeApiResponse);

function FakeAuth($rootScope, AccessToken) {
	return {
		logout : function(){
			$rootScope.$emit('oauth:logout');
			$rootScope.$emit('oauth:loggedOut');
		},

		isAuthenticationRequired : function(){
			return true;
		},

		isAuthorized: function() {
			AccessToken.set();

			var token = AccessToken.get();

			$rootScope.$emit('oauth:authorized', token);
			return true;
		}
	};
}
FakeAuth.$inject = ['$rootScope', 'AccessToken'];
module.factory('FakeAuth', FakeAuth);
