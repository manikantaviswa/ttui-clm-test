'use strict';

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
