'use strict';

describe('Filter: date', function() {
	var timezoneISO8601;
	var dateFilter;

	var FAKE_CONFIG = {};

	beforeEach(function(){
		angular.mock.module('TT-UI.Common.Filters.DateFilter');

		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', FAKE_CONFIG);
		});

		angular.mock.module(function(_timezoneISO8601_) {
			timezoneISO8601 = _timezoneISO8601_;
		});

		angular.mock.inject(function(_dateFilter_) {
			dateFilter = _dateFilter_;
		});
		FAKE_CONFIG.DATE_FORMAT = 'dd/MM/yyyy';
	});

	it('should check if timezone date format exists', function() {
		expect(timezoneISO8601).toEqual('tz');
	});

	it('should format date in defined format', function() {
		// given
		var date = new angular.mock.TzDate(0, '2015-03-20T07:51:10.257Z');
		var format = 'shortDate';

		// when
		var output = dateFilter(date, format);

		// then
		expect(output).toEqual('3/20/15');
	});

	it('should format date in text format from config (when format is not defined)', function() {
		// given
		var date = new angular.mock.TzDate(0, '2015-03-20T07:51:10.257Z');

		// when
		FAKE_CONFIG.DATE_FORMAT = 'short';
		var output = dateFilter(date);

		// then
		expect(output).toEqual('3/20/15 7:51 AM');
	});

	it('should format date in long format from config (when format is not defined)', function() {
		// given
		var date = new angular.mock.TzDate(0, '2015-03-20T07:51:10.257Z');

		// when
		FAKE_CONFIG.DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss Z';
		var output = dateFilter(date);

		// then
		expect(output).toEqual('2015-03-20 07:51:10 +0000');
	});

	it('should format date in format from config (when format is not defined)', function() {
		// given
		var date = new angular.mock.TzDate(0, '2015-03-20T07:51:10.257Z');

		// when
		var output = dateFilter(date);

		// then
		expect(output).toEqual('20/03/2015');
	});

	it('should format timezone in GMT 0', function() {
		// given
		var date = new angular.mock.TzDate(0, '2015-03-20T07:51:10.257Z');

		// when
		var output = dateFilter(date, timezoneISO8601);

		// then
		expect(output).toEqual('+00:00');
	});

	it('should format timezone in GMT +2', function() {
		// given
		var date = new angular.mock.TzDate(-2, '2015-03-20T07:51:10.257Z');

		// when
		var output = dateFilter(date, timezoneISO8601);

		// then
		expect(output).toEqual('+02:00');
	});

	it('should format timezone in GMT +4.5', function() {
		// given
		var date = new angular.mock.TzDate(-4.5, '2015-03-20T07:51:10.257Z');

		// when
		var output = dateFilter(date, timezoneISO8601);

		// then
		expect(output).toEqual('+04:30');
	});

	it('should format timezone in GMT -2', function() {
		// given
		var date = new angular.mock.TzDate(+2, '2015-03-20T07:51:10.257Z');

		// when
		var output = dateFilter(date, timezoneISO8601);

		// then
		expect(output).toEqual('-02:00');
	});

	it('should format timezone in GMT -4.5', function() {
		// given
		var date = new angular.mock.TzDate(+4.5, '2015-03-20T07:51:10.257Z');

		// when
		var output = dateFilter(date, timezoneISO8601);

		// then
		expect(output).toEqual('-04:30');
	});

	it('should not throw exception when input date is undefined', function() {
		// given
		var date = void(0);

		// when
		var fn = function() {
			return dateFilter(date);
		};

		// then
		expect(fn).not.toThrow();
	});

	it('should return undefined when input date is undefined', function() {
		//given, when
		var output = dateFilter();

		// then
		expect(output).toBeUndefined();
	});

	it('should not throw exception when input date is a string', function() {
		//given
		var date = 'not a date';

		//when
		var fn = function() {
			return dateFilter(date);
		};

		// then
		expect(fn).not.toThrow();
	});

	it('should return input date as an output when input date is a string', function() {
		//given
		var date = 'not a date';

		//when
		var output = dateFilter(date);

		// then
		expect(output).toEqual(date);
	});

	describe('jalali date format', function () {

		beforeEach(function(){
			FAKE_CONFIG.DATE_FORMAT = 'jDD/jMM/jYYYY';
		});

		it('should return date in jalali format for Date object', function () {
			//given
			var date = new Date('2015-03-20T07:51:10.257Z');

			//when
			var output = dateFilter(date);

			//then
			expect(output).toEqual('29/12/1393');
		});

		it('should return date in jalali format for string date (check also different format)', function () {
			//given
			FAKE_CONFIG.DATE_FORMAT = 'jMM-jDD-jYYYY';
			var stringFormat = '2015-03-20T07:51:10.257Z';

			//when
			var output = dateFilter(stringFormat);

			//then
			expect(output).toEqual('12-29-1393');
		});

		it('should return undefined when date is undefined', function () {
			//when
			var output = dateFilter();

			//then
			expect(output).toEqual(undefined);
		});


		it('should return undefined when date is in bad format', function () {
			//given
			var badDateFormat = '759badDate';

			//when
			var output = dateFilter(badDateFormat);

			//then
			expect(output).toEqual(badDateFormat);
		});

	});
});
