'use strict';

function FIELD_VALIDATOR_CONFIG() {
	return {};
}

// Create module if not defined
try { angular.module('TT-UI.FieldValidator.Config'); } catch(err) {
	var module = angular.module('TT-UI.FieldValidator.Config', []);

	module.constant('FIELD_VALIDATOR_CONFIG', FIELD_VALIDATOR_CONFIG());
}
