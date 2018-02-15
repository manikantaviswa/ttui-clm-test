/*! TT-UI Lib 0.6.24.19 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-auth';
}

(function (window, angular, undefined) {
	"use strict";


// Source: src/scripts/auth/config.js
var module = angular.module('TT-UI.Auth.Config', []);

function AUTH_CONFIG() {
	return {
		TOKEN_STORAGE: 'sessionStorage'
	};
}

module.constant('AUTH_CONFIG', AUTH_CONFIG());
module.value('authErrorMessage', 'Authorization failed. Please login into system.');


// Source: src/scripts/auth/controllers/login-ctrl.js
angular.module('TT-UI.Auth.Controllers.Login', [
	'ui.router',
	'oauth',
	'pascalprecht.translate',
	'TT-UI.Config',
	'TT-UI.Auth.Config',
	'TT-UI.Auth.Services.StateHistory',
	'TT-UI.Auth.Services.OAuth'
])

.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state('login', {
		url: '/login/',
		views: {
			'@': {
				controller: 'LoginCtrl as login',
				templateUrl: 'scripts/auth/views/login.tpl.html'
			}
		},
		data : {
			authenticatedAccess : false
		},
		label: 'Login',
		onEnter: ['$state', '$rootScope', 'CONFIG', 'StateHistory', function($state, $rootScope, CONFIG, StateHistory) {
				if ($rootScope.userAuthorized){
					$state.go(StateHistory.getPreviousStateName() || CONFIG.HOME_STATE);
				}
			}]
	});
}])

.controller('LoginCtrl', ['CONFIG', 'AUTH_CONFIG', function(CONFIG, AUTH_CONFIG) {
	this.getSsoUri = function() {
		return CONFIG.SSO_OAUTH_URI;
	};

	this.getSsoUriPath = function() {
		return CONFIG.SSO_OAUTH_URI_PATH;
	};

	this.getSsoClientId = function() {
		return CONFIG.SSO_OAUTH_CLIENT_ID;
	};

	this.getSsoRedirectUri = function() {
		return CONFIG.SSO_OAUTH_REDIRECT_URI;
	};

	this.getSsoScope = function() {
		return CONFIG.SSO_OAUTH_SCOPE;
	};

	this.getSsoState = function() {
		return CONFIG.SSO_OAUTH_STATE;
	};

	this.getSsoProfileUri = function() {
		return CONFIG.SSO_PROFILE_URI;
	};

	this.getSsoTemplate = function() {
		return 'scripts/auth/views/login-oauth.tpl.html';
	};

	this.getSsoResponseType = function() {
		return CONFIG.SSO_OAUTH_RESPONSE_TYPE !== 'code' ? 'token' : 'code';
	};

	this.getStorage = function() {
		return AUTH_CONFIG.TOKEN_STORAGE;
	};

}]);


// Source: src/scripts/auth/module.js
angular.module('TT-UI.Auth', [
	'ui.router',
	'oauth',
	'TT-UI.Config',
	'TT-UI.Common.Services.FlashMessage',
	'TT-UI.Auth.Config',
	'TT-UI.Auth.Controllers.Login',
	'TT-UI.Auth.AuthFactory',
	'TT-UI.Auth.Services.StateHistory',
	'TT-UI.Auth.Services.RefreshToken'
])
.run(['authErrorMessage', '$rootScope', '$state', 'FlashMessage', 'AuthFactory', 'StateHistory', 'AccessToken', 'RefreshToken', 'Storage', 'AUTH_CONFIG', 'CONFIG',
	function(authErrorMessage, $rootScope, $state, FlashMessage, AuthFactory, StateHistory, AccessToken, RefreshToken, Storage, AUTH_CONFIG, CONFIG) {
	var Auth = AuthFactory.get(CONFIG.AUTH_MODULE);

	Storage.use(AUTH_CONFIG.TOKEN_STORAGE);

	var setUserAuthorized = function() {
		$rootScope.userAuthorized = true;
	};

	var setUserUnauthorized = function() {
		$rootScope.userAuthorized = false;
	};

	var redirectToLogin = function() {
		var LOGIN_STATE = 'login';

		setUserUnauthorized();

		if($state.current.name === LOGIN_STATE){
			return;
		}

		$state.go(LOGIN_STATE);
	};

	var authorizationError = function() {
		if (authErrorMessage) {
			FlashMessage.show('Error', authErrorMessage, 'danger', true);
		}
		redirectToLogin();
	};

	var updateTokens = function() {
		AccessToken.set();
		RefreshToken.update();
	};

	var stateChangeHandler = function(event, toState) {
		if (Auth.isAuthenticationRequired(toState) && !Auth.isAuthorized()) {
			event.preventDefault();
			redirectToLogin();
		}
	};

	$rootScope.logout = function() {
		setUserUnauthorized();
		Auth.logout();
		window.localStorage.clear();
		StateHistory.removePreviousState();
	};

	setUserUnauthorized();

	var updateTokensOnEvents = [
		'oauth:authorized',
		'oauth:login',
		'oauth:logout',
		'oauth:loggedOut',
		'oauth:denied',
		'oauth:expired'
	];

	updateTokensOnEvents.forEach(function (eventName) {
		$rootScope.$on(eventName, updateTokens);
	});

	$rootScope.$on('oauth:authorized', setUserAuthorized);
	$rootScope.$on('oauth:logout', redirectToLogin);
	$rootScope.$on('oauth:loggedOut', redirectToLogin);
	$rootScope.$on('oauth:denied', authorizationError);
	$rootScope.$on('$stateChangeStart', stateChangeHandler);
}]);


// Source: src/scripts/auth/services/api-interceptor.js
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


// Source: src/scripts/auth/services/api-response.js
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


// Source: src/scripts/auth/services/auth-factory.js
angular.module('TT-UI.Auth.AuthFactory', ['TT-UI.Auth.Services.FakeAuth', 'TT-UI.Auth.Services.OAuth'])
.factory('AuthFactory', ['FakeAuth', 'OAuth', function(FakeAuth, OAuth){
	return {
		get : function(authModuleName){
			switch (authModuleName){
				case 'FakeAuth' : return FakeAuth;
				case 'OAuth' : return OAuth;
				default: return OAuth;
			}
		}
	};
}]);


// Source: src/scripts/auth/services/fake-auth.js
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


// Source: src/scripts/auth/services/oauth.js
angular.module('TT-UI.Auth.Services.OAuth', [
		'ui.router',
		'oauth',
		'TT-UI.Config',
		'TT-UI.Auth.Services.ApiInterceptor',
		'TT-UI.Auth.Services.TokenUtils',
		'TT-UI.Common.Directives.Spinner'
	])

	.constant('AUTH', {
		ERROR_NOT_AUTH: '$auth.notAuthorized'
	})

	.constant('OAUTH_TOKEN_TYPE', {
		ACCESS: 'access_token',
		REFRESH: 'refresh_token'
	})

	.constant('OAUTH_AUTH', {
		HTTP_HEADER_NAME: 'Authorization',
		HTTP_HEADER_VALUE: 'Bearer {{accessToken}}',

		HTTP_ERROR_CODES: [400, 401]
	})

	.config(['$httpProvider', '$stateProvider', 'CONFIG', function($httpProvider, $stateProvider, CONFIG) {

		if (CONFIG.AUTH_MODULE !== 'OAuth') {
			return;
		}

		$httpProvider.interceptors.push('ApiInterceptor');

		var oauthTokenState = {
			url: '/{accessToken}',
			onEnter: ['TokenUtils', function(TokenUtils) {
				return TokenUtils.fetchAccessTokenFromUrl();
			}],
			data: {
				authenticatedAccess: false
			}
		};

		var oauthCodeState = {
			url: '/authcode',
			onEnter: ['TokenUtils', function(TokenUtils) {
				return TokenUtils.fetchAccessTokenByAuthCode();
			}],
			data: {
				authenticatedAccess: false
			}
		};

		if (CONFIG.SSO_OAUTH_RESPONSE_TYPE === 'code') {
			$stateProvider.state('oauth-code', oauthCodeState);
		} else {
			$stateProvider.state('oauth-token', oauthTokenState);
		}
		
		$stateProvider.state('oauth-update', {
			url: '/oauth-update',
			onEnter: ['TokenUtils', function(TokenUtils) {
				return TokenUtils.fetchTokensFromQueryString();
			}],
			data: {
				authenticatedAccess: false
			}
		});

	}])

	.factory('OAuth', ['$rootScope',
		'$interpolate',
		'$http',
		'$window',
		'AccessToken',
		'RefreshToken',
		'TokenUtils',
		'CONFIG',
		'OAUTH_TOKEN_TYPE',
		'SPINNER_EVENTS',
		function($rootScope, $interpolate, $http, $window, AccessToken, RefreshToken, TokenUtils, CONFIG,
			OAUTH_TOKEN_TYPE, SPINNER_EVENTS) {

			var logoutFunction;

			var logoutForTokenResponse = function() {
				$rootScope.$emit('oauth:logout');
				AccessToken.destroy();
				RefreshToken.destroy();
				$rootScope.$emit('oauth:loggedOut');
			};

			var getRevokeTokenValueForCodeResponse = function(token, tokenType) {
				var value = token.get();
				return (value && OAUTH_TOKEN_TYPE.ACCESS === tokenType) ? value[OAUTH_TOKEN_TYPE.ACCESS] : value;
			};

			var buildRevokeTokenUriForCodeResponse = function(token, tokenType) {
				return $interpolate(CONFIG.SSO_REVOKE_TOKEN_URI)({
					tokenType: tokenType,
					tokenValue: getRevokeTokenValueForCodeResponse(token, tokenType)
				});
			};

			var logoutForCodeResponse = function() {
				var revokeAccessTokenUri = buildRevokeTokenUriForCodeResponse(AccessToken, OAUTH_TOKEN_TYPE.ACCESS);
				var revokeRefreshTokenUri = buildRevokeTokenUriForCodeResponse(RefreshToken, OAUTH_TOKEN_TYPE.REFRESH);

				AccessToken.destroy();
				RefreshToken.destroy();

				$rootScope.$emit(SPINNER_EVENTS.SHOW);
				$http.get(revokeRefreshTokenUri)
					.then($http.get.bind($http, revokeAccessTokenUri))
					.then(function(response) {
						$window.location.href = response.data;
					})
					.catch(function(error) {
						$rootScope.$emit(SPINNER_EVENTS.HIDE);
						TokenUtils.handleLogoutError(error);
						$rootScope.$emit('oauth:loggedOut');
					});
			};

			if (CONFIG.SSO_OAUTH_RESPONSE_TYPE === 'code') {
				logoutFunction = logoutForCodeResponse;
			} else {
				logoutFunction = logoutForTokenResponse;
			}

			return {

				logout: logoutFunction,

				isAuthenticationRequired: function(state) {
					var isFlagDefined = typeof state !== 'undefined' && typeof state.data !== 'undefined' &&
						typeof state.data.authenticatedAccess !== 'undefined';
					return isFlagDefined ? state.data.authenticatedAccess : true;
				},

				isAuthorized: function() {
					AccessToken.set();

					var token = AccessToken.get();

					if (token && token.access_token) {
						$rootScope.$emit('oauth:authorized', token);
						return true;
					}

					return false;
				}
			};
		}]);


// Source: src/scripts/auth/services/refresh-token.js
var module = angular.module('TT-UI.Auth.Services.RefreshToken', [
	'ngStorage',
	'TT-UI.Config'
]);

function RefreshToken($rootScope, $injector, $log, $q, $localStorage, AccessToken){

	var that = this;

	var REFRESH_TOKEN_LOCAL_STORAGE_KEY = 'refresh_token';
	var PENDING_PROMISE_STATUS = 0;

	var $http, TokenUtils;
	var refreshTokenValue = null;
	var refreshPromise;

	this.doRefresh = function(retryRequestConfig) {

		ensureDependencies();
		retryRequestConfig.retry = true;

		if(!this.get()){
			handleRefreshError();
			return $q.reject();
		} else if(!isRefreshingNow()){
			refreshPromise = createRefreshPromise();
		}

		return refreshPromise.then($http.bind($http, retryRequestConfig));
	};

	this.set = function(token){
		refreshTokenValue = token;
		$localStorage[REFRESH_TOKEN_LOCAL_STORAGE_KEY] = token;
	};

	this.get = function() {
		return refreshTokenValue;
	};

	this.update = function() {
		refreshTokenValue = $localStorage[REFRESH_TOKEN_LOCAL_STORAGE_KEY];
	};

	this.destroy = function() {
		this.set(null);
	};

	function isRefreshingNow(){
		return refreshPromise && refreshPromise.$$state.status === PENDING_PROMISE_STATUS;
	}

	function ensureDependencies(){
		if(!$http){
			$http = $injector.get('$http');
		}

		if(!TokenUtils){
			TokenUtils = $injector.get('TokenUtils');
		}
	}

	function createRefreshPromise() {
		return TokenUtils
			.exchangeRefreshTokenForAccessToken(refreshTokenValue)
			.then(TokenUtils.handleTokenResponse)
			.catch(handleRefreshError);
	}

	function handleRefreshError(error){
		$log.error(error);
		that.destroy();
		AccessToken.destroy();
		$rootScope.$emit('oauth:denied');
	}
}

RefreshToken.$inject = ['$rootScope', '$injector', '$log', '$q', '$localStorage', 'AccessToken'];
module.service('RefreshToken', RefreshToken);

// Source: src/scripts/auth/services/state-history.js
var module = angular.module('TT-UI.Auth.Services.StateHistory', ['angular-storage']);

module.constant('STATE_HISTORY_CONFIG', {
	STATES_NOT_FOR_STORE: ['login', 'oauth-token', 'oauth-code', 'oauth-update']
});

function StateHistory($rootScope, $window, $state, store, STATE_HISTORY_CONFIG) {

	var LOCAL_STORAGE_KEY = 'previousAppState';

	var isEligibleForStore = function(state){
		if (!state || !state.name){
			return false;
		} else {
			return STATE_HISTORY_CONFIG.STATES_NOT_FOR_STORE.indexOf(state.name) < 0;
		}
	};

	this.setPreviousState = function(state, fallbackState) {
		if (isEligibleForStore(state)){
			store.set(LOCAL_STORAGE_KEY, state.name);
			return state;
		} else if (isEligibleForStore(fallbackState)){
			store.set(LOCAL_STORAGE_KEY, fallbackState.name);
			return fallbackState;
		} else {
			return;
		}
	};

	this.getPreviousStateName = function() {
		return store.get(LOCAL_STORAGE_KEY);
	};

	this.removePreviousState = function() {
		store.remove(LOCAL_STORAGE_KEY);
	};

	this.saveCurrentState  = function(){
		this.setPreviousState($state.current);
	};

	$window.onbeforeunload = this.saveCurrentState.bind(this);

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
		this.setPreviousState(fromState, toState);
	}.bind(this));

}

StateHistory.$inject = ['$rootScope', '$window', '$state', 'store', 'STATE_HISTORY_CONFIG'];
module.service('StateHistory', StateHistory);


// Source: src/scripts/auth/services/token-utils.js
var module = angular.module('TT-UI.Auth.Services.TokenUtils', [
	'ui.router',
	'oauth',
	'TT-UI.Auth.Services.StateHistory',
	'TT-UI.Auth.Services.RefreshToken',
	'TT-UI.Common.Services.FlashMessage',
	'TT-UI.Common.Directives.Spinner'
]);

function TokenUtils($injector, $rootScope, $location, $log, $state, $http, $q, $interpolate, AccessToken, FlashMessage, StateHistory, CONFIG, SPINNER_EVENTS){

	var RefreshToken;

	this.fetchAccessTokenFromUrl = function() {
		var path = $location.path().replace(/^[\#\/]/, '');
		AccessToken.setTokenFromString(path);
		$state.go(StateHistory.getPreviousStateName() || CONFIG.HOME_STATE);
	};

	this.fetchTokensFromQueryString = function() {
		var urlParams = $location.search();

		var accessToken = urlParams.access_token;
		var expiresIn = urlParams.expires_in;
		var refreshToken = urlParams.refresh_token;

		if (accessToken && expiresIn && refreshToken) {

			if(!RefreshToken){
				RefreshToken = $injector.get('RefreshToken');
			}

			AccessToken.setTokenFromString(createAccessTokenString(urlParams));
			RefreshToken.set(refreshToken);
		} else {
			FlashMessage.show('Invalid redirection url');
		}

		return $state.go(CONFIG.HOME_STATE);
	};

	this.fetchAccessTokenByAuthCode = function() {
		var code = $location.search().code;

		if (code) {
			$rootScope.$emit(SPINNER_EVENTS.SHOW);
			return exchangeAuthCodeForAccessToken(code).finally(hideSpinner);
		} else {
			FlashMessage.show('Missing auth code');

			return $state.go(CONFIG.HOME_STATE);
		}
	};

	this.exchangeRefreshTokenForAccessToken = function(refreshToken) {
		return $http({
			method: 'POST',
			url: CONFIG.SSO_REFRESH_TOKEN_URI,
			headers: {
				'Content-type': 'application/json'
			},
			data: {refresh_token: refreshToken}
		});

	};

	this.handleTokenResponse = handleTokenResponse;

	function exchangeAuthCodeForAccessToken(authCode) {

		var getTokenUrlExp = $interpolate(CONFIG.SSO_GET_TOKEN_URI);
		var getTokenUrl = getTokenUrlExp({codeValue: authCode});

		return $http.get(getTokenUrl)
			.then(handleTokenResponse)
			.then(redirectToPreviousState)
			.catch(handleLoginError);
	}

	function redirectToPreviousState() {
		$state.go(StateHistory.getPreviousStateName() || CONFIG.HOME_STATE);
	}

	function handleTokenResponse(response) {
		var data = response.data;
		if(!RefreshToken){
			RefreshToken = $injector.get('RefreshToken');
		}

		if (data.access_token && data.refresh_token && data.statusCode !== 400) {
			return $q.when(setTokens(response));
		} else {
			AccessToken.destroy();
			RefreshToken.destroy();
			return $q.reject(response.data);
		}
	}

	function setTokens(response) {
		AccessToken.setTokenFromString(createAccessTokenString(response.data));
		RefreshToken.set(response.data.refresh_token);
	}

	function handleLoginError(error) {
		$log.error(error);
		FlashMessage.show('Error', 'Login error', 'danger');
		return $state.go(StateHistory.getPreviousStateName() || CONFIG.HOME_STATE);
	}

	this.handleLogoutError = function(error){
		$log.error(error);
		FlashMessage.show('Error', 'Logout error', 'danger');
	};

	function createAccessTokenString(reponseData){
		return 'access_token=' + reponseData.access_token + '&expires_in=' + reponseData.expires_in;
	}

	function hideSpinner () {
		$rootScope.$emit(SPINNER_EVENTS.HIDE);
	}
}

TokenUtils.$inject = ['$injector', '$rootScope', '$location', '$log', '$state', '$http', '$q', '$interpolate', 'AccessToken', 'FlashMessage', 'StateHistory', 'CONFIG', 'SPINNER_EVENTS'];
module.service('TokenUtils', TokenUtils);

return angular;
})(window, window.angular);