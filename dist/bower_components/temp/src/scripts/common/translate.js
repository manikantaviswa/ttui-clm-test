'use strict';

var module = angular.module('TT-UI.Common.Translate', [
	'ngCookies',
	'pascalprecht.translate',
	'TT-UI.Config'
]);

module.constant('TRANSLATE', {
	URI_REG_EXP: /(?:\?|\&)locale=([a-z]{2})/i,
	STATE_NAME_PREFIX: 'lang-',
	LANG_DIR_DEFAULT:  'ltr',
	LANG_DIR_RTL:      'rtl'
});

module.factory('$translateTtStorage', ['$translateLocalStorage', '$window', 'TRANSLATE',
	function $translateTtStorage($translateLocalStorage, $window, TRANSLATE) {
		var location = $window.location;

		return {
		get: function(name) {
			var forceLocale, tmp;

			// Force locale based on URI param
			if (location.search && (tmp = location.search.match(TRANSLATE.URI_REG_EXP))) {
				forceLocale = tmp.pop();
			}

			return forceLocale || $translateLocalStorage.get(name);
		},

		set: $translateLocalStorage.set,

		put: $translateLocalStorage.put
	};
}]);

module.factory('missingTranslationLog', ['$log', function missingTranslationLog($log) {
	return function(translationId) {
		$log.debug('Missing translation: "' + translationId + '"');
	};
}]);

function translateConfigFn($translateProvider, $windowProvider, CONFIG) {
	function detectLanguageList($window){
		var navigator  = $window.navigator;

		if (navigator.hasOwnProperty('languages')){
			return navigator.languages;
		} else if (navigator.userLanguage) {
			return [navigator.userLanguage]; // +IE10
		} else {
			return [navigator.language];
		}
	}

	$translateProvider.useStaticFilesLoader({
		prefix: CONFIG.LOCALE_PATH + CONFIG.LOCALE_PREFIX,
		suffix: CONFIG.LOCALE_SUFFIX
	});

	$translateProvider.useStorage('$translateTtStorage');

	$translateProvider.determinePreferredLanguage(function() {
		var localeList = CONFIG.LOCALE_LIST,
			langKey    = CONFIG.LOCALE_DEFAULT,
			languages  = detectLanguageList($windowProvider.$get());

		languages.some(function(lang) {
			lang = lang.split('-')[0];

			if (localeList.hasOwnProperty(lang)) {
				langKey = lang;

				return true;
			}
		});

		return langKey;
	});

	$translateProvider.useMissingTranslationHandler('missingTranslationLog');
	$translateProvider.useSanitizeValueStrategy(null);
}

translateConfigFn.$inject = ['$translateProvider', '$windowProvider', 'CONFIG'];
module.config(translateConfigFn);
