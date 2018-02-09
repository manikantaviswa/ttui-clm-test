'use strict';

angular.module('TT-UI.Common.Filters.DateFilter', ['TT-UI.Config', 'TT-UI.Common.MomentProvider'])

.constant('timezoneISO8601', 'tz')
.config(['$provide', 'timezoneISO8601', 'momentProvider', function($provide, timezoneISO8601, momentProvider) {
	function pad(num) {
		var neg = '';

		if (num < 0) {
			neg = '-';
			num = -num;
		}

		if (num < 10) {
			num = '0' + num;
		}

		return neg + num;
	}

	function timeZoneGetter(date) {
		var tz = -1 * date.getTimezoneOffset();
		var output = (tz >= 0) ? '+' : '';

		output += pad(Math[tz > 0 ? 'floor' : 'ceil'](tz / 60));
		output += ':';
		output += pad(Math.abs(tz % 60));

		return output;
	}

	$provide.decorator('dateFilter', ['$delegate', 'CONFIG', function($delegate, CONFIG) {
		var dateFilter = $delegate;
		var moment =  momentProvider.getMoment();

		return function customDateFilter(date, format, timezone) {
			format = format || CONFIG.DATE_FORMAT;
			var output;
			var isJalaliFormat = /^j+/.test(format);

			if(isJalaliFormat && date && moment(date).isValid()) {
				output = moment(date).format(format);
			} else {
				output = dateFilter.call(dateFilter, date, format, timezone);
			}

			if (!angular.isString(output) || angular.isString(date)) {
				return output;
			}

			return output.replace(timezoneISO8601, timeZoneGetter(date));
		};
	}]);
}]);
