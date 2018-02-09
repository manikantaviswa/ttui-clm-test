'use strict';

angular.module('TT-UI.Common.AngularStrap', [
	'ngAnimate',
	'mgcrea.ngStrap.affix',
	'mgcrea.ngStrap.helpers.dateParser',
	'mgcrea.ngStrap.alert',
	'mgcrea.ngStrap.modal',
	'mgcrea.ngStrap.datepicker',
	'mgcrea.ngStrap.tab',
	'TT-UI.Config',
	'TT-UI.Common.Config',
	'TT-UI.Common.Translate',
	'TT-UI.Common.Filters.DateFilter',
	'TT-UI.Common.Filters.IsArrayFilter',
	'TT-UI.Common.MomentProvider'
])

.config(['$provide', 'momentProvider', function ($provide, momentProvider) {
	$provide.decorator('datepickerViews', ['$delegate', '$dateFormatter', '$sce', '$dateParser', function ($delegate, $dateFormatter, $sce, $dateParser) {

		function split(arr, size) {
			var arrays = [];
			while (arr.length > 0) {
				arrays.push(arr.splice(0, size));
			}
			return arrays;
		}

		function daysBuildWithJalaliSupport(picker, viewDate) {
			var moment = momentProvider.getMoment();
			var scope = picker.$scope;
			var options = picker.$options;
			var lang = options.lang;

			function mod(n, m) {
				return (n % m + m) % m;
			}

			function isJalaliCalendar() {
				return /^jD+/.test(options.dayFormat);
			}

			var formatDate = function (date, format) {
				return $dateFormatter.formatDate(date, format, lang);
			};
			var dateParser = $dateParser({
				format: options.dateFormat,
				lang: lang,
				strict: options.strictFormat
			});

			var weekDaysMin = $dateFormatter.weekdaysShort(lang);
			if (isJalaliCalendar()) {
				options.startWeek = -1; //Jalali calendar starts from Saturday
				var jalaliMinDaysLabels = ['Yek', 'Dos', 'Seh', 'Che', 'Pan', 'Jom', 'Sha'];
				weekDaysMin = lang !== 'fa' ? jalaliMinDaysLabels : weekDaysMin;
			}

			var weekDaysLabels = weekDaysMin.slice(options.startWeek).concat(weekDaysMin.slice(0, options.startWeek));
			var weekDaysLabelsHtml = $sce.trustAsHtml('<th class="dow text-center">' + weekDaysLabels.join('</th><th class="dow text-center">') + '</th>');

			return function () {
				function isDayMuted(day) {
					if (isJalaliCalendar()) {
						return moment([viewDate.year, viewDate.month, viewDate.date]).jMonth() !== moment(day).jMonth();
					}
					return day.getMonth() !== viewDate.month;
				}

				var firstDayOfMonth = new Date(viewDate.year, viewDate.month, 1);

				if (isJalaliCalendar()) {
					moment = momentProvider.getMoment();
					firstDayOfMonth = moment([viewDate.year, viewDate.month, viewDate.date]).startOf('jMonth').toDate();
				}

				var firstDayOfMonthOffset = firstDayOfMonth.getTimezoneOffset();
				var firstDate = new Date(+firstDayOfMonth - mod(firstDayOfMonth.getDay() - options.startWeek, 7) * 864e5), firstDateOffset = firstDate.getTimezoneOffset();
				var today = dateParser.timezoneOffsetAdjust(new Date(), options.timezone).toDateString();
				if (firstDateOffset !== firstDayOfMonthOffset) {
					firstDate = new Date(+firstDate + (firstDateOffset - firstDayOfMonthOffset) * 6e4);
				}
				var days = [], day;
				for (var i = 0; i < 42; i++) {
					day = dateParser.daylightSavingAdjust(new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + i));
					days.push({
						date: day,
						isToday: day.toDateString() === today,
						label: formatDate(day, this.format),
						selected: picker.$date && this.isSelected(day),
						muted: isDayMuted(day),
						disabled: this.isDisabled(day)
					});
				}
				scope.title = formatDate(firstDayOfMonth, options.monthTitleFormat);
				scope.showLabels = true;
				scope.labels = weekDaysLabelsHtml;
				scope.rows = split(days, this.split);
				this.built = true;
			};
		}

		function yearsBuildWithJalaliSupport (picker, viewDate) {
			var scope = picker.$scope;
			var options = picker.$options;
			var lang = options.lang;

			var formatDate = function (date, format) {
				return $dateFormatter.formatDate(date, format, lang);
			};

			return function() {
				var firstYear = viewDate.year - viewDate.year % (this.split * 3);
				var moment = momentProvider.getMoment();
				var isJalaliYearFormat = /^jY+/.test(options.yearFormat);
				if (isJalaliYearFormat) {
					firstYear = moment([firstYear, viewDate.month, viewDate.date]).year();
				}
				var years = [], year;
				for (var i = 0; i < 12; i++) {
					year = new Date(firstYear + i, 0, 1);
					if (isJalaliYearFormat) {
						year = moment([firstYear + i, viewDate.month, viewDate.date]).startOf('jYear').toDate();
					}
					years.push({
						date: year,
						label: formatDate(year, this.format),
						selected: picker.$isSelected(year),
						disabled: this.isDisabled(year)
					});
				}
				scope.title = years[0].label + '-' + years[years.length - 1].label;
				scope.showLabels = false;
				scope.rows = split(years, this.split);
				this.built = true;
			};
		}


		function monthsBuildWithJalaliSupport(picker, viewDate) {
			var moment = momentProvider.getMoment();
			var scope = picker.$scope;
			var options = picker.$options;

			var lang = options.lang;
			var formatDate = function (date, format) {
				return $dateFormatter.formatDate(date, format, lang);
			};

			return function () {
				var isJalaliMonth = /^jM+$/.test(options.monthFormat);
				var months = [], month;
				for (var i = 0; i < 12; i++) {
					if(isJalaliMonth) {
						var year = moment([viewDate.year + 1, 0]);
						month = year.jMonth(i).toDate();
					} else {
						month = new Date(viewDate.year, i, 1);
					}
					months.push({
						date: month,
						label: formatDate(month, this.format),
						selected: picker.$isSelected(month),
						disabled: this.isDisabled(month)
					});
				}
				scope.title = formatDate(month, options.yearTitleFormat);
				scope.showLabels = false;
				scope.rows = split(months, this.split);
				this.built = true;
			};
		}

		function newDatepickerViews(picker) {
			var originValue = $delegate(picker);
			var jalaliViews = [
				{ build: daysBuildWithJalaliSupport(picker, originValue.viewDate)},
				{ build: monthsBuildWithJalaliSupport(picker, originValue.viewDate)},
				{ build: yearsBuildWithJalaliSupport(picker, originValue.viewDate)}
			];
			var minView = picker.$options.minView;
			jalaliViews = minView ? jalaliViews.slice(minView): jalaliViews;
			angular.merge(originValue.views, jalaliViews);
			return originValue;
		}

		return newDatepickerViews;
	}]);
}])

.config(['$modalProvider', '$alertProvider', '$datepickerProvider', '$provide', 'CONFIG', 'COMMON_CONFIG', function ($modalProvider, $alertProvider, $datepickerProvider, $provide, CONFIG, COMMON_CONFIG) {
	var VIEW_PATH = COMMON_CONFIG.BASE_URL + 'views/angular-strap/';

	angular.extend($alertProvider.defaults, {
		animation: 'am-fade-and-slide-top',
		dismissable: false,
		duration: 3,
		keyboard: false,
		template: VIEW_PATH + 'alert.tpl.html'
	});

	angular.extend($modalProvider.defaults, {
		animation: 'am-fade-and-scale',
		placement: 'center',
		container: 'body',
		backdrop: 'static',
		keyboard: false
	});

	$provide.decorator('$datepicker', ['$delegate', '$translate', '$rootScope', function ($delegate, $translate, $rootScope) {
		var defaults = {
			dateType: 'string',
			startWeek: 1
		};

		var defaultLocaleData = angular.copy(CONFIG.LOCALE_DEFAULT_SETTINGS);

		function updateDatepickerOptions() {
			var datePickerLocale = CONFIG.DATE_PICKER_LOCALE_DATE_FORMAT || CONFIG.LOCALE_DEFAULT;
			var locale = $translate.use() || CONFIG.LOCALE_DEFAULT;

			var datePickerLocaleData = angular.extend({},
				defaultLocaleData.datePicker,
				angular.copy(CONFIG.LOCALE_LIST[datePickerLocale].datePicker)
			);
			var localeData = CONFIG.LOCALE_LIST[locale] || defaultLocaleData;

			datePickerLocaleData.modelDateFormat = CONFIG.MODEL_DATE_FORMAT;
			datePickerLocaleData.lang = localeData.lang;
			datePickerLocaleData.dir = localeData.dir;

			angular.extend($delegate.defaults, defaults, datePickerLocaleData);
		}

		updateDatepickerOptions();

		$rootScope.$on('$translateChangeEnd', updateDatepickerOptions);

		return $delegate;
	}]);
}])

.config(['$provide', 'momentProvider', function ($provide, momentProvider) {

	var moment = momentProvider.getMoment();

	$provide.decorator('$dateParser', ['$delegate', '$log', 'CONFIG', function ($delegate, $log, CONFIG) {
		var myParse = function (value, baseDate, format) {
			format = format || this.$format;
			format = format.replace(/'([^']+)'/g, '$1');

			var m = angular.isDate(value) ? moment(value) : moment(value, format);
			return m.toDate();
		};

		function getMinYearOfBirth() {
			return (new Date(CONFIG.MIN_YEAR_OF_BIRTH, 0));
		}

		return function () {
			var dateParser = $delegate.apply($delegate, arguments);
			dateParser.parse = myParse;
			dateParser.getDateForAttribute = (function (originFn) {
				return function (key, value) {
					if (value === 'minYearOfBirth') {
						return getMinYearOfBirth();
					}
					return originFn(key, value);
				};
			})(dateParser.getDateForAttribute);

			return dateParser;
		};
	}]);

	$provide.decorator('$dateFormatter', ['$delegate', 'CONFIG', '$translate', function ($delegate, CONFIG, $translate) {
		if (typeof(moment.loadPersian) === 'function') {
			moment.loadPersian();
		}

		function getMomentAvailableLocale(locale) {
			return moment.localeData(locale) ? locale : CONFIG.LOCALE_DEFAULT;
		}

		$delegate.getDefaultLocale = function () {
			return $translate.proposedLanguage() || CONFIG.LOCALE_DEFAULT;
		};

		$delegate.formatDate = function (date, format, locale) {
			format = $delegate.getDatetimeFormat(format, locale);
			return moment(date).locale(getMomentAvailableLocale(locale)).format(format);
		};

		$delegate.weekdaysShort = function (locale) {
			return moment.localeData(getMomentAvailableLocale(locale))._weekdaysShort;
		};

		$delegate.getDatetimeFormat = function (format, locale) {
			var momentFormat;
			if (format === 'shortDate') {
				momentFormat = 'L';
			} else if (format === 'shortTime') {
				momentFormat = 'LT';
			}
			if (momentFormat) {
				return moment.localeData(getMomentAvailableLocale(locale))._longDateFormat[momentFormat] || format;
			}
			return format;
		};

		return $delegate;
	}]);
}]);
