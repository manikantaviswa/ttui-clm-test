'use strict';

describe('Application AngularStrap:', function() {
	var $compile;
	var $rootScope;
	var $scope;
	var $datepickerProvider;
	var $dateParser;
	var $translate;
	var $log;

	var dateFilter;

	var FAKE_CONFIG;

	var date;
	var fooDate;
	var fooDateTime;
	var jalaaliDate;
	var jalaaliDateTime;

	var pad = function(num) {
		if (num < 10) {
			return '0' + num;
		}

		return num;
	};

	var dateToLocalISO8601String = function(date) {
		return date.getFullYear() +
			'-' + pad(date.getMonth() + 1) +
			'-' + pad(date.getDate()) +
			'T' + pad(date.getHours()) +
			':' + pad(date.getMinutes()) +
			':' + pad(date.getSeconds()) +
			'.' + (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
			(date.getTimezoneOffset() < 0 ? '+' : '-') +
			pad(Math.abs(date.getTimezoneOffset() / 60)) +
			':' + pad(Math.abs(date.getTimezoneOffset() % 60))
			;
	};

	beforeEach(function() {
		FAKE_CONFIG = {
			MODEL_DATE_FORMAT: '',
			LOCALE_DEFAULT: 'en',
			LOCALE_DEFAULT_SETTINGS: {
		        lang: 'en',
		        dateFormat: 'dd/MM/yyyy',
		        datePicker: {
		        	dateFormat: 'DD/MM/YYYY',
		        	dayFormat: 'D',
					monthFormat: 'MMM',
					yearFormat: 'YYYY',
					monthTitleFormat: 'MMMM YYYY',
					yearTitleFormat: 'YYYY'
		        }
		    },
			LOCALE_LIST:    {
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

		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', FAKE_CONFIG);
		});

		angular.mock.module('TT-UI.Common.AngularStrap', function(_$datepickerProvider_) {
			$datepickerProvider = _$datepickerProvider_;
		});

		angular.mock.inject(function($injector) {
			$compile    = $injector.get('$compile');
			$rootScope  = $injector.get('$rootScope');
			$scope      = $rootScope.$new();
			$dateParser = $injector.get('$dateParser');
			$translate  = $injector.get('$translate');
			dateFilter  = $injector.get('dateFilter');
			$log = $injector.get('$log');
		});

		var tz = -1;
		var year = 2015;
		var month = 10;
		var day = 28;
		var hour = 22;
		var minutes = 58;
		var seconds = 31;

		date = new angular.mock.TzDate(tz,
			new Date(year, month - 1, day, hour, minutes, seconds, 0).getTime()
		);

		fooDate = [day, month, year].join('/');
		fooDateTime = [
			fooDate,
			[hour, minutes, seconds].join(':')
		].join(' ');

		// converted manually from fooDate
		jalaaliDate = '06/08/1394';
		jalaaliDateTime = '06/08/1394 22:58:31';
	});

	afterEach(function() {
		$scope.$destroy();
	});

	describe('from standard format', function(){

		it('should show months from  january to december on calendar months view', function () {
			//given
			var sandbox = jQuery('<div>').attr('id', 'sandbox');
			fooDate = new Date(2015, 8, 17);
			jasmine.clock().mockDate(fooDate);
			var datePicker = angular.element('<input type="text" ng-model="fooDate" bs-datepicker>');

			//when
			sandbox.append(datePicker);
			var elm = $compile(datePicker)($scope);
			$scope.$digest();
			angular.element(elm[0]).triggerHandler('focus');
			angular.element(sandbox.find('.dropdown-menu thead button:eq(1)')[0]).triggerHandler('click');

			//then
			expect(sandbox.find('.dropdown-menu tbody tr:eq(0) td:eq(0) button').text()).toBe('Jan');
			expect(sandbox.find('.dropdown-menu tbody tr:eq(2) td:eq(3) button').text()).toBe('Dec');
			expect(sandbox.find('.dropdown-menu thead button:eq(1)').text()).toBe('2015');
		});

		it('should set ngModel date in ISO8601 format with zerofied time', function() {
			// given
			var viewFormat = 'DD/MM/YYYY';
			var isoDate = dateToLocalISO8601String(date).slice(0, 11) + '00:00:00.000Z';

			FAKE_CONFIG.MODEL_DATE_FORMAT = 'YYYY-MM-DDT00:00:00.000[Z]';
			$datepickerProvider.defaults.modelDateFormat = FAKE_CONFIG.MODEL_DATE_FORMAT;

			var html = $compile('<input type="text" ng-model="fooField" data-date-format="' + viewFormat + '" bs-datepicker>')($scope);
			var ngModelCtrl = html.controller('ngModel');

			// when
			ngModelCtrl.$setViewValue(fooDate);
			$scope.$digest();

			// then
			expect(fooDate).toEqual('28/10/2015');
			expect(ngModelCtrl.$viewValue).toEqual(fooDate);
			expect(ngModelCtrl.$modelValue).toEqual(isoDate);
		});

		// fail on jenkins server
		xit('should set ngModel date in ISO8601 format with proper time and local timezone', function() {
			// given
			var viewFormat = 'DD/MM/YYYY HH:mm:ss';
			var isoDate = dateToLocalISO8601String(date);

			FAKE_CONFIG.MODEL_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
			$datepickerProvider.defaults.modelDateFormat = FAKE_CONFIG.MODEL_DATE_FORMAT;

			var html = $compile('<input type="text" ng-model="fooField" data-date-format="' + viewFormat + '" bs-datepicker>')($scope);
			var ngModelCtrl = html.controller('ngModel');

			// when
			ngModelCtrl.$setViewValue(fooDateTime);
			$scope.$digest();

			// then
			expect(fooDateTime).toEqual('28/10/2015 22:58:31');
			expect(ngModelCtrl.$viewValue).toEqual(fooDateTime);
			expect(ngModelCtrl.$modelValue).toEqual(isoDate);
		});

		it('should take date from view and set ngModel date in ISO8601 to YYYY-MM-DD format', function() {
			// given
			var viewFormat = 'DD/MM/YYYY';
			var isoDate = dateToLocalISO8601String(date).slice(0, 10);

			FAKE_CONFIG.MODEL_DATE_FORMAT = 'YYYY-MM-DD';
			$datepickerProvider.defaults.modelDateFormat = FAKE_CONFIG.MODEL_DATE_FORMAT;

			var html = $compile('<input type="text" ng-model="fooField" data-date-format="' + viewFormat + '" bs-datepicker>')($scope);
			var ngModelCtrl = html.controller('ngModel');

			// when
			ngModelCtrl.$setViewValue(fooDate);
			$scope.$digest();

			// then
			expect(fooDate).toEqual('28/10/2015');
			expect(ngModelCtrl.$viewValue).toEqual(fooDate);
			expect(ngModelCtrl.$modelValue).toEqual(isoDate);
		});

		it('should take date from scope and set ngModel date in ISO8601 to YYYY-MM-DD format', function() {
			// given
			var viewFormat = 'DD/MM/YYYY';
			var isoDate = dateToLocalISO8601String(date).slice(0, 10);

			FAKE_CONFIG.MODEL_DATE_FORMAT = 'YYYY-MM-DD';
			$datepickerProvider.defaults.modelDateFormat = FAKE_CONFIG.MODEL_DATE_FORMAT;

			var html = $compile('<input type="text" ng-model="fooField" data-date-format="' + viewFormat + '" bs-datepicker>')($scope);
			var ngModelCtrl = html.controller('ngModel');
			$scope.fooField = isoDate;

			// when
			$scope.$digest();

			// then
			expect(fooDate).toEqual('28/10/2015');
			expect(ngModelCtrl.$viewValue).toEqual(fooDate);
			expect(ngModelCtrl.$modelValue).toEqual(isoDate);
		});

		it('should take ISO8601 format with zerofied time from scope into model and set proper view value', function() {
			// given
			var viewFormat = 'DD/MM/YYYY';
			var isoDate = dateToLocalISO8601String(date).slice(0, 11) + '00:00:00.000Z';

			FAKE_CONFIG.MODEL_DATE_FORMAT = 'YYYY-MM-DDT00:00:00.000[Z]';
			$datepickerProvider.defaults.modelDateFormat = FAKE_CONFIG.MODEL_DATE_FORMAT;

			$scope.fooField = isoDate;

			var html = $compile('<input type="text" ng-model="fooField" data-date-format="' + viewFormat + '" bs-datepicker>')($scope);
			var ngModelCtrl = html.controller('ngModel');

			// when
			$scope.$digest();

			// then
			expect(fooDate).toEqual('28/10/2015');
			expect(ngModelCtrl.$viewValue).toEqual(fooDate);
			expect(ngModelCtrl.$modelValue).toEqual(isoDate);
		});

		it('should correctly display first day of the month when calendar is Gregorian', function () {
			//given
			$translate.use('en');
			var sandbox = jQuery('<div>').attr('id', 'sandbox');
			fooDate = new Date(2012, 2, 9);
			jasmine.clock().mockDate(fooDate);
			var datePicker = angular.element('<input type="text" ng-model="fooDate" bs-datepicker>');

			//when
			sandbox.append(datePicker);
			var elm = $compile(datePicker)($scope);
			$scope.$digest();
			angular.element(elm[0]).triggerHandler('focus');

			//then
			expect(sandbox.find('.dropdown-menu thead button:eq(1)').text()).toBe('March 2012');
			expect(sandbox.find('.dropdown-menu tbody tr td:eq(3) button').text().trim()).toBe('1');
			// change to next month
			angular.element(sandbox.find('.dropdown-menu thead button:eq(2)')[0]).triggerHandler('click');
			expect(sandbox.find('.dropdown-menu tbody tr td:eq(6) button span').text().trim()).toBe('1');
		});
	});

	it('shouldn\'t change visible month on click on the first day in Georgian calendar', function () {
			//given
			$translate.use('en');
			var sandbox = jQuery('<div>').attr('id', 'sandbox');
			fooDate = new Date(2012, 2, 9);
			jasmine.clock().mockDate(fooDate);
			var datePicker = angular.element('<input type="text" ng-model="fooDate" bs-datepicker>');

			//when
			sandbox.append(datePicker);
			var elm = $compile(datePicker)($scope);
			$scope.$digest();
			angular.element(elm[0]).triggerHandler('focus');

			//then
			expect(sandbox.find('.dropdown-menu thead button:eq(1)').text()).toBe('March 2012');
			expect(sandbox.find('.dropdown-menu tbody tr td:eq(3) button').text().trim()).toBe('1');
			angular.element(sandbox.find('.dropdown-menu tbody tr td:eq(3) button')[0]).triggerHandler('click');
			expect(sandbox.find('.dropdown-menu thead button:eq(1)').text()).toBe('March 2012');
		});

	describe('from jalaali format', function(){
		it('should show months from  farvardin to esfand on calendar months view', function () {
			//given
			$translate.use('en');
			FAKE_CONFIG.DATE_PICKER_LOCALE_DATE_FORMAT = 'fa';
			var sandbox = jQuery('<div>').attr('id', 'sandbox');
			fooDate = new Date(2015, 8, 17);
			jasmine.clock().mockDate(fooDate);
			var datePicker = angular.element('<input type="text" ng-model="fooDate" bs-datepicker>');

			//when
			sandbox.append(datePicker);
			var elm = $compile(datePicker)($scope);
			$scope.$digest();
			angular.element(elm[0]).triggerHandler('focus');
			angular.element(sandbox.find('.dropdown-menu thead button:eq(1)')[0]).triggerHandler('click');

			//then
			expect(sandbox.find('.dropdown-menu tbody tr:eq(0) td:eq(0) button').text()).toBe('Far');
			expect(sandbox.find('.dropdown-menu tbody tr:eq(2) td:eq(3) button').text()).toBe('Esf');
			expect(sandbox.find('.dropdown-menu thead button:eq(1)').text()).toBe('1394');
		});

		it('should show years from  1383 - 1394 Jalali years view', function () {
			//given
			$translate.use('en');
			FAKE_CONFIG.DATE_PICKER_LOCALE_DATE_FORMAT = 'fa';
			var sandbox = jQuery('<div>').attr('id', 'sandbox');
			fooDate = new Date(2015, 8, 17);
			jasmine.clock().mockDate(fooDate);
			var datePicker = angular.element('<input type="text" ng-model="fooDate" bs-datepicker>');

			//when
			sandbox.append(datePicker);
			var elm = $compile(datePicker)($scope);
			$scope.$digest();
			angular.element(elm[0]).triggerHandler('focus');
			angular.element(sandbox.find('.dropdown-menu thead button:eq(1)')[0]).triggerHandler('click');
			angular.element(sandbox.find('.dropdown-menu thead button:eq(1)')[0]).triggerHandler('click');

			//then
			expect(sandbox.find('.dropdown-menu tbody tr:eq(0) td:eq(0) button').text()).toBe('1383');
			expect(sandbox.find('.dropdown-menu tbody tr:eq(2) td:eq(3) button').text()).toBe('1394');
		});

		it('should show months on focus when data-min-view is set to 1', function () {
			//given
			$translate.use('en');
			var sandbox = jQuery('<div>').attr('id', 'sandbox');
			fooDate = new Date(2015, 8, 17);
			jasmine.clock().mockDate(fooDate);
			var datePicker = angular.element('<input type="text" ng-model="fooDate" data-min-view="1" bs-datepicker>');

			//when
			sandbox.append(datePicker);
			var elm = $compile(datePicker)($scope);
			$scope.$digest();
			angular.element(elm[0]).triggerHandler('focus');
			expect(sandbox.find('.dropdown-menu tbody tr:eq(0) td:eq(0) button').text()).toBe('Jan');
			angular.element(sandbox.find('.dropdown-menu thead button:eq(1)')[0]).triggerHandler('click');

			//then
			expect(sandbox.find('.dropdown-menu tbody tr:eq(0) td:eq(0) button').text()).toBe('2004');
		});

		it('should show years on focus when data-min-view is set to 2', function () {
			//given
			$translate.use('en');
			var sandbox = jQuery('<div>').attr('id', 'sandbox');
			fooDate = new Date(2015, 8, 17);
			jasmine.clock().mockDate(fooDate);
			var datePicker = angular.element('<input type="text" ng-model="fooDate" data-min-view="2" bs-datepicker>');

			//when
			sandbox.append(datePicker);
			var elm = $compile(datePicker)($scope);
			$scope.$digest();
			angular.element(elm[0]).triggerHandler('focus');

			//then
			expect(sandbox.find('.dropdown-menu tbody tr:eq(0) td:eq(0) button').text()).toBe('2004');
		});

		it('should correctly display first day of the month when calendar is Jalali', function () {
			//given
			$translate.use('en');
			FAKE_CONFIG.DATE_PICKER_LOCALE_DATE_FORMAT = 'fa';
			var sandbox = jQuery('<div>').attr('id', 'sandbox');
			fooDate = new Date(2012, 2, 9);
			jasmine.clock().mockDate(fooDate);
			var datePicker = angular.element('<input type="text" ng-model="fooDate" bs-datepicker>');

			//when
			sandbox.append(datePicker);
			var elm = $compile(datePicker)($scope);
			$scope.$digest();
			angular.element(elm[0]).triggerHandler('focus');

			//then
			expect(sandbox.find('.dropdown-menu thead button:eq(1)').text()).toBe('Esfand 1390');
			expect(sandbox.find('.dropdown-menu tbody tr td:eq(2) button').text().trim()).toBe('1');
			// change to next month
			angular.element(sandbox.find('.dropdown-menu thead button:eq(2)')[0]).triggerHandler('click');
			expect(sandbox.find('.dropdown-menu tbody tr td:eq(3) button span').text().trim()).toBe('1');
		});

		it('should correctly display first day of the month and year when calendar is Jalali', function () {
			//given
			$translate.use('en');
			FAKE_CONFIG.DATE_PICKER_LOCALE_DATE_FORMAT = 'fa';
			var sandbox = jQuery('<div>').attr('id', 'sandbox');
			fooDate = new Date(2012, 2, 20);//new year in Jalali
			jasmine.clock().mockDate(fooDate);
			var datePicker = angular.element('<input type="text" ng-model="fooDate" bs-datepicker>');

			//when
			sandbox.append(datePicker);
			var elm = $compile(datePicker)($scope);
			$scope.$digest();
			angular.element(elm[0]).triggerHandler('focus');

			//then
			expect(sandbox.find('.dropdown-menu thead button:eq(1)').text()).toBe('Farvardin 1391');
			expect(sandbox.find('.dropdown-menu tbody tr td:eq(3) button span').text().trim()).toBe('1');
		});

		it('shouldn\'t change visible month on click on the first day Jalali', function () {
			//given
			$translate.use('en');
			FAKE_CONFIG.DATE_PICKER_LOCALE_DATE_FORMAT = 'fa';
			var sandbox = jQuery('<div>').attr('id', 'sandbox');
			fooDate = new Date(2012, 2, 9);
			jasmine.clock().mockDate(fooDate);
			var datePicker = angular.element('<input type="text" ng-model="fooDate" bs-datepicker>');

			//when
			sandbox.append(datePicker);
			var elm = $compile(datePicker)($scope);
			$scope.$digest();
			angular.element(elm[0]).triggerHandler('focus');

			//then
			expect(sandbox.find('.dropdown-menu thead button:eq(1)').text()).toBe('Esfand 1390');
			expect(sandbox.find('.dropdown-menu tbody tr td:eq(2) button').text().trim()).toBe('1');
			angular.element(sandbox.find('.dropdown-menu tbody tr td:eq(2) button')[0]).triggerHandler('click');
			expect(sandbox.find('.dropdown-menu thead button:eq(1)').text()).toBe('Esfand 1390');
		});

		it('should start from Saturday', function () {
			//given
			$translate.use('en');
			FAKE_CONFIG.DATE_PICKER_LOCALE_DATE_FORMAT = 'fa';

			var sandbox = jQuery('<div>').attr('id', 'sandbox');
			fooDate = new Date(2012, 2, 9);
			jasmine.clock().mockDate(fooDate);
			var datePicker = angular.element('<input type="text" ng-model="fooDate" bs-datepicker>');

			//when
			sandbox.append(datePicker);
			var elm = $compile(datePicker)($scope);
			$scope.$digest();
			angular.element(elm[0]).triggerHandler('focus');

			//then
			expect(sandbox.find('.dropdown-menu thead tr:eq(1) th:eq(0)').text()).toBe('Sha');
		});

		xit('should set ngModel date in ISO8601 format with proper time and local timezone', function() {
			// given
			var viewFormat = 'jDD/jMM/jYYYY HH:mm:ss';
			var isoDate = dateToLocalISO8601String(date);

			FAKE_CONFIG.MODEL_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

			var html = $compile('<input type="text" ng-model="fooField" data-date-format="' + viewFormat + '" bs-datepicker>')($scope);
			var ngModelCtrl = html.controller('ngModel');

			// when
			ngModelCtrl.$setViewValue(jalaaliDateTime);
			$scope.$digest();

			// then
			expect(jalaaliDateTime).toEqual('06/08/1394 22:58:31');
			expect(ngModelCtrl.$viewValue).toEqual(jalaaliDateTime);
			expect(ngModelCtrl.$modelValue).toEqual(isoDate);
		});

		it('should set ngModel date in ISO8601 format with zerofied time', function() {
			// given
			var viewFormat = 'jDD/jMM/jYYYY';
			var isoDate = dateToLocalISO8601String(date).slice(0, 11) + '00:00:00.000Z';

			FAKE_CONFIG.MODEL_DATE_FORMAT = 'YYYY-MM-DDT00:00:00.000[Z]';
			$datepickerProvider.defaults.modelDateFormat = FAKE_CONFIG.MODEL_DATE_FORMAT;

			var html = $compile('<input type="text" ng-model="fooField" data-date-format="' + viewFormat + '" bs-datepicker>')($scope);
			var ngModelCtrl = html.controller('ngModel');

			// when
			ngModelCtrl.$setViewValue(jalaaliDate);
			$scope.$digest();

			// then
			expect(jalaaliDate).toEqual('06/08/1394');
			expect(ngModelCtrl.$viewValue).toEqual(jalaaliDate);
			expect(ngModelCtrl.$modelValue).toEqual(isoDate);
		});

		it('should take date from view and set ngModel date in ISO8601 to YYYY-MM-DD format', function() {
			// given
			var viewFormat = 'jDD/jMM/jYYYY';
			var isoDate = dateToLocalISO8601String(date).slice(0, 10);

			FAKE_CONFIG.MODEL_DATE_FORMAT = 'YYYY-MM-DD';
			$datepickerProvider.defaults.modelDateFormat = FAKE_CONFIG.MODEL_DATE_FORMAT;

			var html = $compile('<input type="text" ng-model="fooField" data-date-format="' + viewFormat + '" bs-datepicker>')($scope);
			var ngModelCtrl = html.controller('ngModel');

			// when
			ngModelCtrl.$setViewValue(jalaaliDate);
			$scope.$digest();

			// then
			expect(jalaaliDate).toEqual('06/08/1394');
			expect(ngModelCtrl.$viewValue).toEqual(jalaaliDate);
			expect(ngModelCtrl.$modelValue).toEqual(isoDate);
		});

		it('should take date from scope and set ngModel date in ISO8601 to YYYY-MM-DD format', function() {
			// given
			var viewFormat = 'jDD/jMM/jYYYY';
			var isoDate = dateToLocalISO8601String(date).slice(0, 10);

			FAKE_CONFIG.MODEL_DATE_FORMAT = 'YYYY-MM-DD';
			$datepickerProvider.defaults.modelDateFormat = FAKE_CONFIG.MODEL_DATE_FORMAT;

			var html = $compile('<input type="text" ng-model="fooField" data-date-format="' + viewFormat + '" bs-datepicker>')($scope);
			var ngModelCtrl = html.controller('ngModel');
			$scope.fooField = isoDate;

			// when
			$scope.$digest();

			// then
			expect(jalaaliDate).toEqual('06/08/1394');
			expect(ngModelCtrl.$viewValue).toEqual(jalaaliDate);
			expect(ngModelCtrl.$modelValue).toEqual(isoDate);
		});

		it('should take ISO8601 format with zerofied time from scope into model and set proper view value', function() {
			// given
			var viewFormat = 'jDD/jMM/jYYYY';
			var isoDate = dateToLocalISO8601String(date).slice(0, 11) + '00:00:00.000Z';

			FAKE_CONFIG.MODEL_DATE_FORMAT = 'YYYY-MM-DDT00:00:00.000[Z]';
			$datepickerProvider.defaults.modelDateFormat = FAKE_CONFIG.MODEL_DATE_FORMAT;

			$scope.fooField = isoDate;

			var html = $compile('<input type="text" ng-model="fooField" data-date-format="' + viewFormat + '" bs-datepicker>')($scope);
			var ngModelCtrl = html.controller('ngModel');

			// when
			$scope.$digest();

			// then
			expect(jalaaliDate).toEqual('06/08/1394');
			expect(ngModelCtrl.$viewValue).toEqual(jalaaliDate);
			expect(ngModelCtrl.$modelValue).toEqual(isoDate);
		});
	});
	describe('jalaali to en and backwards transition', function(){
		it('update datePicker.defaults on locale switch', function() {
			// given
			var expectedLocale = 'fa';
			var expectedLocaleData = FAKE_CONFIG.LOCALE_LIST[expectedLocale];

			$compile('<input ng-model="fooField" bs-datepicker>')($scope); // to decorate datePickerProvider with en.localeData;

			// when
			$translate.use(expectedLocale);

			// then
			expect($datepickerProvider.defaults.lang).toEqual(expectedLocaleData.lang);
			expect($datepickerProvider.defaults.dir).toEqual(expectedLocaleData.dir);
		});

		it('should not change CONFIG.LOCALE_LIST object', function(){
			// given
			var savedLocaleList = angular.copy(FAKE_CONFIG.LOCALE_LIST);
			$compile('<input ng-model="fooField" bs-datepicker>')($scope); // to decorate datePickerProvider with en.localeData;

			// when
			$translate.use('fa');

			// then
			expect(savedLocaleList).toEqual(FAKE_CONFIG.LOCALE_LIST);
		});

		it('should use explicit date format lang if specified', function() {
			// given
			var expectedLocale = FAKE_CONFIG.LOCALE_DEFAULT;
			var expectedLocaleData = FAKE_CONFIG.LOCALE_DEFAULT_SETTINGS;
			var dateFormatLocale = 'fa';
			var dateFormatLocaleData = FAKE_CONFIG.LOCALE_LIST[dateFormatLocale];
			FAKE_CONFIG.DATE_PICKER_LOCALE_DATE_FORMAT = dateFormatLocale;
			$compile('<input ng-model="fooField" bs-datepicker>')($scope);

			// when
			$translate.use(expectedLocale);

			// then
			expect($datepickerProvider.defaults.dateFormat).toEqual(dateFormatLocaleData.datePicker.dateFormat);
			expect($datepickerProvider.defaults.dayFormat).toEqual(dateFormatLocaleData.datePicker.dayFormat);
			expect($datepickerProvider.defaults.monthFormat).toEqual(dateFormatLocaleData.datePicker.monthFormat);
			expect($datepickerProvider.defaults.yearFormat).toEqual(dateFormatLocaleData.datePicker.yearFormat);
			expect($datepickerProvider.defaults.monthTitleFormat).toEqual(dateFormatLocaleData.datePicker.monthTitleFormat);
			expect($datepickerProvider.defaults.yearTitleFormat).toEqual(dateFormatLocaleData.datePicker.yearTitleFormat);
			expect($datepickerProvider.defaults.lang).toEqual(expectedLocaleData.lang);
		});
	});

	describe('$dateParser.parse with decorated dateFilter', function() {
		it('should parse "zerofied" version of date format', function() {
			// given
			FAKE_CONFIG.MODEL_DATE_FORMAT = 'YYYY-MM-DDT00:00:00.000Z';
			date = new Date(2020, 10, 1, 0, 0 , 0, 0);
			var dateFormat = 'yyyy-MM-ddT00:00:00.000Z';
			var formattedDate = dateFilter(date, dateFormat);
			var dateParser = $dateParser({format: FAKE_CONFIG.MODEL_DATE_FORMAT});

			// when
			var results = dateParser.parse(formattedDate);

			// then
			expect(results).toEqual(jasmine.any(Date));
			expect(results).toEqual(date);
		});

		it('should return date for minYearOfBirth value from CONFIG', function () {
			//given
			var now = new angular.mock.TzDate(0, '2000-07-07T10:00:00Z');
			FAKE_CONFIG.MIN_YEAR_OF_BIRTH = 1900;
			jasmine.clock().mockDate(now);

			//when
			var dateFromParser = $dateParser().getDateForAttribute('minDate', 'minYearOfBirth');

			//then
			expect(dateFromParser).toEqual(new Date(1900, 0));
		});

		it('should call originFn when value is not minYearOfBirth', function () {
			//given
			var now = new angular.mock.TzDate(0, '2000-07-07T10:00:00Z');
			jasmine.clock().mockDate(now);

			//when
			var dateFromParser = $dateParser().getDateForAttribute('minDate', 'today');

			//then
			expect(dateFromParser).toEqual(new Date(2000, 6, 7, 0));
		});
	});
});
