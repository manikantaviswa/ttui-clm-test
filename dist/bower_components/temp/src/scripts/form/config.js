'use strict';

var module = angular.module('TT-UI.Form.Config', []);

function FORM_CONFIG() {
	return {
		BASE_URL: 'scripts/form/' // Slash at the end
	};
}

module.constant('FORM_CONFIG', FORM_CONFIG());
