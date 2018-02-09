'use strict';

var module = angular.module('TT-UI.Auth.Config', []);

function AUTH_CONFIG() {
	return {
		TOKEN_STORAGE: 'localStorage'
	};
}

module.constant('AUTH_CONFIG', AUTH_CONFIG());
module.value('authErrorMessage', 'Authorization failed. Please login into system.');