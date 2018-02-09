'use strict';

describe('Service: rtlService', function() {

	var CONFIG;
	var __CONFIG = {
		LOCALE_DEFAULT: 'en',
		LOCALE_LIST: {
			en: {lang: 'en'},
			pl: {lang: 'pl'},
			fr: {lang: 'fr'},
			fa: {
				lang: 'fa',
				dir: 'rtl',
				dateFormat: 'jDD/jMM/jYYYY',
				datePicker: {
					dateFormat: 'jDD/jMM/jYYYY',
					dayFormat: 'jD',
					monthFormat: 'jMMM',
					yearFormat: 'jYYYY',
					monthTitleFormat: 'jMMMM jYYYY',
					yearTitleFormat: 'jYYYY'
				}
			}
		}
	};
	var $translate;
	var $document;
	var rtlService;

	beforeEach(function() {
		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', __CONFIG);
		});

		angular.mock.module('TT-UI.Common.Services.Rtl');

		angular.mock.inject(function(_CONFIG_, _$translate_, _$document_, _rtlService_) {
			CONFIG = _CONFIG_;
			$translate = _$translate_;
			$document = _$document_;
			rtlService = _rtlService_;
		});

	});

	it('should check if Rtl module exists', function() {
		expect(!!rtlService).toBe(true);
		expect(typeof rtlService).toEqual('object');
	});

	it('should check getDirection -method returns default value', function() {
		spyOn($translate, 'proposedLanguage').and.returnValue('en');
		expect(rtlService.getDirection()).not.toBeDefined();
		expect(rtlService.isCurrentLanguageRtl()).toBe(false);
	});

	it('should check getDirection -method returns default value (no proposedLanguage)', function() {
		spyOn($translate, 'proposedLanguage').and.returnValue(null);
		expect(rtlService.getDirection()).not.toBeDefined();
		expect(rtlService.isCurrentLanguageRtl()).toBe(false);
	});

	it('should check getDirection -method returns rtl value', function() {
		spyOn($translate, 'proposedLanguage').and.returnValue('fa');
		expect(rtlService.getDirection()).toEqual('rtl');
		expect(rtlService.isCurrentLanguageRtl()).toBe(true);
	});
});
