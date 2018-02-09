'use strict';

var ngModule = angular.module('TT-UI.Config', []);

function CONFIG() {
	return {
		API_URL: '',
		MOCK_API_URL: '',
		UPC_API_URL: '',
		CLM_360_URL: '',
		CLM_360_API_URL: ''
	};
}

ngModule.constant(CONFIG.name, CONFIG());
