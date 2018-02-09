'use strict';

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
