'use strict';

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
