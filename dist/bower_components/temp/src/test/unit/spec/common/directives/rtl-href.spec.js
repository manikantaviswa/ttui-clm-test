'use strict';

describe('Directive: rtlHref ', function() {

	var $compile, $translate, $scope, $rootScope, rtlService;
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

	beforeEach(function() {

		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', __CONFIG);
		});

		angular.mock.module('TT-UI.Common.Services.Rtl');

		angular.mock.module('TT-UI.Common.Directives.RtlHref');

		angular.mock.inject(function(_$rootScope_, _rtlService_, _$compile_, _$translate_) {
			$rootScope = _$rootScope_;
			rtlService = _rtlService_;
			$compile = _$compile_;
			$translate = _$translate_;
			$scope = $rootScope.$new();
		});
	});

	it('Should check if directive have procesed element', function() {
		// given
		var html = $compile('<link href="app.css" rel="stylesheet" rtl-href="app-rtl.css">')($scope);

		// when
		$scope.$digest();

		// then
		expect(html).not.toBeNull();
		expect(html.length).not.toEqual(0);
		expect(html.prop('tagName').toLowerCase()).not.toEqual('rtlHref');
	});

	it('Should test if element contains proper structure -ltr css', function() {
		// given
		var html = $compile('<link href="app.css" rel="stylesheet" rtl-href="app-rtl.css">')($scope);

		// when
		$scope.$digest();

		expect(html.attr('href')).toEqual('app.css');
	});

	it('Should test if element contains proper structure -rtl css', function() {
		// given
		var html = $compile('<link href="app.css" rel="stylesheet" rtl-href="app-rtl.css">')($scope);

		// when
		spyOn($translate, 'proposedLanguage').and.returnValue('fa');
		spyOn(rtlService, 'getDirection').and.returnValue('rtl');

		$scope.$digest();

		$translate.use('fa');

		expect(html.attr('href')).toEqual('app-rtl.css');
	});

	it('Should test if element is destroyed', function() {
		// given
		$compile('<link href="app.css" rel="stylesheet" rtl-href="app-rtl.css">')($scope);

		// when
		$scope.$digest();

		$scope.$destroy();
	});
});
