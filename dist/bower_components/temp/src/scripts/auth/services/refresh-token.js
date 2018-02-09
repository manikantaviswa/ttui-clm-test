'use strict';

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