'use strict';

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

			var logoutHref = CONFIG.SSO_OAUTH_URI + '/commonauth' +
				'?commonAuthLogout=true' +
				'&type=oidc2' +
				'&commonAuthCallerPath=' + CONFIG.SSO_OAUTH_REDIRECT_URI +
				'&relyingParty=' + CONFIG.SSO_OAUTH_CLIENT_ID;

			var logoutForTokenResponse = function() {
				$rootScope.$emit('oauth:logout');
				AccessToken.destroy();
				RefreshToken.destroy();
				$rootScope.$emit('oauth:loggedOut');
				$window.location.href = logoutHref;
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
