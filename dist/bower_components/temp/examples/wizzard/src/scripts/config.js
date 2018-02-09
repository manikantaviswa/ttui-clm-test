'use strict';

var module = angular.module('TT-UI.Config', []);

module.constant('CONFIG', {
	INDEX_STATE: 'three-steps-flow',
	DATE_FORMAT: 'dd/MM/yyyy',
	DATETIME_FORMAT: 'dd/MM/yyyy HH:mm:ss',
	MODEL_DATE_FORMAT: 'yyyy-MM-ddT00:00:00.000[Z]',
	HOME_STATE: 'three-steps-flow',
	MIN_YEAR_OF_BIRTH: 1900,
	BASE_URL: 'scripts/', // Slash at the end
	LOCALE_PATH:   'scripts/langs/', // Slash at the end
	LOCALE_PREFIX: 'lang-',
	LOCALE_SUFFIX: '.json',
	LOCALE_DEFAULT: 'en',
	LOCALE_LIST: {
		en: { lang:'en' }
	}
});
