'use strict';

var module = angular.module('TT-UI.Common.Services.Rtl', [
]);

function rtlService(CONFIG, $translate, $document) {
	var service = {};

	function getDirection() {
		if (CONFIG.LOCALE_LIST) {
			var locale = $translate.proposedLanguage() || CONFIG.LOCALE_DEFAULT;
			var direction = CONFIG.LOCALE_LIST[locale].dir;

			return direction;
		}
	}

	service.getDirection = function() {
		var direction = getDirection();

		return direction;
	};

	service.setDocumentDirection = function(direction) {
		$document[0].dir = direction || '';
	};

	service.isCurrentLanguageRtl = function() {
		return getDirection() === 'rtl' ? true : false;
	};

	return service;
}

rtlService.$inject = ['CONFIG', '$translate', '$document'];
module.service('rtlService', rtlService);

module.run(['rtlService', function(rtlService) {
	var direction = rtlService.getDirection();
	rtlService.setDocumentDirection(direction);
}]);
