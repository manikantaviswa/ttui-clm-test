'use strict';

var module = angular.module('TT-UI.Common.Config', []);

function COMMON_CONFIG() {
	return {
		BASE_URL: 'scripts/common/' // Slash at the end
	};
}

module.constant('COMMON_CONFIG', COMMON_CONFIG());
