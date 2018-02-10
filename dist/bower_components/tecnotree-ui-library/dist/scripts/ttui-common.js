/*! TT-UI Lib 0.6.24.19 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-common';
}

(function (window, angular, undefined) {
	"use strict";


// Source: src/scripts/common/polyfills/Function.name.js
// Source: https://github.com/JamesMGreene/Function.name

(function () {
/* jshint -W040 */
	/* jshint -W068 */

	var fnNamePrefixRegex = /^[\S\s]*?function\s*/;
	var fnNameSuffixRegex = /[\s\(\/][\S\s]+$/;

	function _name() {
		var name = '';
		if (this === Function || this === Function.prototype.constructor) {
			name = 'Function';
		}
		else if (this !== Function.prototype) {
			name = ('' + this).replace(fnNamePrefixRegex, '').replace(fnNameSuffixRegex, '');
		}
		return name;
	}

	// Inspect the polyfill-ability of this browser
	var needsPolyfill = !('name' in Function.prototype && 'name' in (function x() {
	}));
	var canDefineProp = typeof Object.defineProperty === 'function' &&
		(function () {
			var result;
			try {
				Object.defineProperty(Function.prototype, '_xyz', {
					get: function () {
						return 'blah';
					},
					configurable: true
				});
				result = Function.prototype._xyz === 'blah';
				delete Function.prototype._xyz;
			}
			catch (e) {
				result = false;
			}
			return result;
		})();


	Function.prototype._name = _name;

	if (canDefineProp && needsPolyfill) {
		Object.defineProperty(Function.prototype, 'name', {
			get: _name
		});
	}

})();


// Source: src/scripts/common/angular-strap.js
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
.config(function ($provide, momentProvider) {
	$provide.decorator('datepickerViews', function ($delegate, $dateFormatter, $sce, $dateParser) {

		function split(arr, size) {
			var arrays = [];
			while (arr.length > 0) {
				arrays.push(arr.splice(0, size));
			}
			return arrays;
		}

		function daysBuildWithJalaliSupport(picker, viewDate) {
			function mod(n, m) {
				return (n % m + m) % m;
			}

			function isJalaliCalendar() {
				return /^jD+/.test(options.dayFormat);
			}

			var moment = momentProvider.getMoment();
			var scope = picker.$scope;
			var options = picker.$options;
			var lang = options.lang;
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
	});
})
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

	$provide.decorator('$datepicker', function($delegate, $translate, $rootScope) {
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
	});
}])
.config(function ($provide, momentProvider) {
	var moment = momentProvider.getMoment();

	$provide.decorator('$dateFormatter', function ($delegate, CONFIG, $translate) {
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
	});
});


// Source: src/scripts/common/config.js
var module = angular.module('TT-UI.Common.Config', []);

function COMMON_CONFIG() {
	return {
		BASE_URL: 'scripts/common/' // Slash at the end
	};
}

module.constant(COMMON_CONFIG.name, COMMON_CONFIG());

// Source: src/scripts/common/directives.js
angular.module('TT-UI.Common.Directives', [
	'TT-UI.Common.Config',
	'TT-UI.Common.Directives.ActionLinks',
	'TT-UI.Common.Directives.Breadcrumbs',
	'TT-UI.Common.Directives.Forms',
	'TT-UI.Common.Directives.NavMenu',
	'TT-UI.Common.Directives.MultiselectDropdown',
	'TT-UI.Common.Directives.MultiselectDropdownLegacy',
	'TT-UI.Common.Directives.Pagination',
	'TT-UI.Common.Directives.PostMessage',
	'TT-UI.Common.Directives.ProgressBar',
	'TT-UI.Common.Directives.RouteLabel',
	'TT-UI.Common.Directives.Select',
	'TT-UI.Common.Directives.Sortable',
	'TT-UI.Common.Directives.Spinner',
	'TT-UI.Common.Directives.SpinnerInside',
	'TT-UI.Common.Directives.Tabs',
	'TT-UI.Common.Directives.Toggle',
	'TT-UI.Common.Directives.AutoFormatDate',
	'TT-UI.Common.Directives.AutoFocus',
	'TT-UI.Common.Directives.DateValidator',
	'TT-UI.Common.Directives.DateInputMask',
	'TT-UI.Common.Directives.FieldValidator',
	'TT-UI.Common.Directives.BootstrapUiTmplates',
	'TT-UI.Common.Directives.ChargesTable',
	'TT-UI.Common.Directives.RtlHref',
	'TT-UI.Common.Directives.SimpleTimeline'
])

.value('VIEW_CONFIG', ['COMMON_CONFIG', function(COMMON_CONFIG) {
	return {
		URL: COMMON_CONFIG.BASE_URL + '/views/',
		DIRECTIVE_URL: COMMON_CONFIG.BASE_URL + '/views/directives/'
	};
}]);


// Source: src/scripts/common/directives/action-links.js
angular.module('TT-UI.Common.Directives.ActionLinks', [
	'TT-UI.Common.States'
])

.directive('actionLinks', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,

		scope: true,

		controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
			$scope.links  = [];
			$scope.params = {};

			var unbound = $scope.$on('$stateChangeSuccess', function() {
				$scope.links.length = 0;

				var state = $state.$current;

				while (state.parent) {
					if (state.name.indexOf('.') === -1) {
						break;
					}

					state = state.parent;
				}

				if (state && state.children) {
					state.children.forEach(function(state) {
						if (state.url && state.label && !state.ownParams.length && !state.aside) {
							$scope.links.push(state);
						}
					});
				}
			});

			$scope.params = $stateParams;

			$scope.$on('$destroy', unbound);
		}],

		template:
			'<ul class="shortcuts">' +
				'<li ng-repeat="state in links">' +
					'<a href="{{state.url.format(params)}}" ui-sref="{{state.name}}({{params}})" data-action="{{state.data.action}}" ng-bind="state.label"></a>' +
				'</li>' +
			'</ul>'
	};
});


// Source: src/scripts/common/directives/auto-format-date.js
angular.module('TT-UI.Common.Directives.AutoFormatDate', [
	'TT-UI.Config'
])

.constant('FORMAT_CONFIG', {
	SEPARATOR_PATTERN: /[^a-zA-Z0-9]/
})

.directive('autoFormatDate', ['$timeout', 'CONFIG', 'FORMAT_CONFIG', function($timeout, CONFIG, FORMAT_CONFIG) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {

			var format, timeoutPromise;

			var once = attrs.$observe('autoFormatDate', function(value) {
				if(value !== '') {
					format = value;
				} else {
					format = CONFIG.DATE_FORMAT;
				}
				once();
			});

			var formatValue = function() {
				if (!format) { return; }

				var cv = element.val();
				var nextIdx = cv.length;

				if (nextIdx < format.length && FORMAT_CONFIG.SEPARATOR_PATTERN.test(format[nextIdx])) {
					element.val(cv + format[nextIdx]);
				}
			};

			var keypressHandler = function() {
				timeoutPromise = $timeout(formatValue, 0);
			};

			element.on('keypress', keypressHandler);

			scope.$on('$destroy', function() {
				$timeout.cancel(timeoutPromise);
				element.off('keypress', keypressHandler);
			});
		}
	};
}]);


// Source: src/scripts/common/directives/autofocus.js
angular.module('TT-UI.Common.Directives.AutoFocus', [])

.directive('autofocus', ['$timeout', function($timeout) {
	/**
	 * the HTML5 autofocus property can be finicky when it comes to dynamically loaded
	 * templates and such with AngularJS. Use this simple directive to
	 * tame this beast once and for all.
	 *
	 * Usage:
	 * <input type="text" autofocus>
	 */
	return {
		restrict: 'A',
		link: {
			pre: function(scope, element, attrs) {
				if (!attrs.autofocus) {
					return;
				}

				$timeout(function() {
					element[0].focus();
				});
			}
		}
	};
}]);


// Source: src/scripts/common/directives/bootstrap-ui-templates.js
angular.module('TT-UI.Common.Directives.BootstrapUiTmplates', [
	'TT-UI.Common.Config',
	'ui.bootstrap.dropdown'
])

.run(['$http', '$templateCache', 'COMMON_CONFIG', function($http, $templateCache, COMMON_CONFIG) {
	var DIRECTIVE_URL = COMMON_CONFIG.BASE_URL + 'views/directives/';

	var templates = [
		{
			path: DIRECTIVE_URL + 'bootstrap/accordion/accordion.tpl.html',
			bootstrapPath: 'uib/template/accordion/accordion.html'
		},
		{
			path:  DIRECTIVE_URL + 'bootstrap/accordion/accordion-group.tpl.html',
			bootstrapPath: 'uib/template/accordion/accordion-group.html'
		}
	];

	templates.forEach(function(template) {
		$http.get(template.path, {
			cache: $templateCache
		}).then(function(res) {
			$templateCache.put(template.bootstrapPath, res.data);
		});
	});
}]);


// Source: src/scripts/common/directives/breadcrumbs.js
angular.module('TT-UI.Common.Directives.Breadcrumbs', [
	'ui.router'
])

.directive('breadcrumbs', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,

		scope: true,

		controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
			$scope.path   = [];
			$scope.params = $stateParams;
			$scope.goTo   = function(state) {
				$state.go(state.name, $stateParams, {reload: true});
			};

			var unbound = $scope.$on('$stateChangeSuccess', function() {
				$scope.path.length = 0;

				$state.$current.path.some(function(state)  {
					if (!state.url || !state.label || state.modal || state.aside) {
						return true;
					}

					$scope.path.push(state);
				});
			});

			$scope.$on('$destroy', unbound);
		}],

		template:
			'<ul class="breadcrumbs">' +
				'<li ng-repeat="state in path">' +
					'<a href="#{{state.url.format(params)}}" ng-click="goTo(state); $event.preventDefault()" ng-bind="state.label"></a>' +
				'</li>' +
			'</ul>'
	};
});


// Source: src/scripts/common/directives/charges-table.js
angular.module('TT-UI.Common.Directives.ChargesTable', [
	'smart-table'
])
.directive('chargesTable', ['$translate', '$filter', 'translateFilter', function($translate, $filter, translateFilter) {
	var template =
		'<div>' +
			'<table class="table table-data-ttui">' +
				'<thead>' +
					'<tr>' +
						'<th translate="Description">Description</th>' +
						'<th translate="Type">Type</th>' +
						'<th translate="Periodicity">Periodicity</th>' +
						'<th translate="Tax">Tax</th>' +
						'<th translate="Amount">Amount</th>' +
						'<th translate="Net Amount">Net Amount</th>' +
						'<th translate="Amount">Amount</th>' +
						'<th translate="Net Amount">Net Amount</th>' +
					'</tr>' +
				'</thead>' +
				'<tbody>' +

					'<tr ng-repeat="payment in monthlyPayments">' +
						'<td>{{ payment.commercialArticleName || payment.commercialArticle }}</td>' +
						'<td>{{ payment.chargeType }}</td>' +
						'<td>Monthly</td>' +
						'<td  class="format-price">{{ formatPrice(1, totalCurrencySymbol) }}</td>' +
						'<td  class="format-price">{{ formatPrice(payment.amount, totalCurrencySymbol) }}</td>' +
						'<td>' +
							'<strong  class="format-price">{{ formatPrice(payment.netAmount, totalCurrencySymbol) }}</strong><br/>' +
							'<small>-{{ payment.discountPercentage*100 | number: 0 }}%</small>' +
						'</td>' +
						'<td>-</td>' +
						'<td>-</td>' +
					'</tr>' +
					'<tr ng-repeat="payment in oneTimePayments">' +
						'<td>{{ payment.commercialArticleName || payment.commercialArticle }}</td>' +
						'<td>{{ payment.chargeType }}</td>' +
						'<td>One Time</td>' +
						'<td  class="format-price">{{ formatPrice(payment.taxRate, totalCurrencySymbol) }}</td>' +
						'<td>-</td>' +
						'<td>-</td>' +
						'<td  class="format-price">{{ formatPrice(payment.amount, totalCurrencySymbol) }}</td>' +
						'<td>' +
							'<strong  class="format-price">{{ formatPrice(payment.netAmount, totalCurrencySymbol) }}</strong><br/>' +
							'<small>-{{ payment.discountPercentage*100 | number: 0 }}%</small>' +
						'</td>' +
					'</tr>' +
					'<tr>' +
						'<td></td>' +
						'<td></td>' +
						'<td></td>' +
						'<td>' +
							'<strong translate="TOTAL inc. TAX">TOTAL inc. TAX</strong><br>' +
						'</td>' +
						'<td></td>' +
						'<td>' +
							'<strong  class="format-price">{{ formatPrice(totalNetMounthly, totalCurrencySymbol) }}</strong><br>' +
							'<small translate="Monthly Charge">Monthly Charge</small>' +
						'</td>' +
						'<td></td>' +
						'<td>' +
							'<strong  class="format-price">{{ formatPrice(totalNetOnetime, totalCurrencySymbol) }}</strong><br>' +
							'<small translate="Pay Upfront">Pay Upfront</small>' +
						'</td>' +
					'</tr>' +
				'</tbody>' +
			'</table>' +
		'</div>';

	function agregatePayments(scope){

		var __ = translateFilter;
		var payments = angular.copy(scope.payments);
		var totalNetMonthly = 0;
		var totalNetOnetime = 0;
		var totalCurrencySymbol;

		if (!angular.isArray(payments)){ // if this is not an array of payments
			payments = [payments];
		}

		scope.monthlyPayments = [];
		scope.oneTimePayments = [];
		scope.formatPrice = formatPrice;

		angular.forEach(payments, function(payment){
			scope.monthlyPayments.push(payment.getMonthlyPayments());
			scope.oneTimePayments.push(payment.getOneTimePayments());
			totalNetMonthly += payment.getTotalNetMonthly();
			totalNetOnetime += payment.getTotalNetOnetime();

			if (payment.payment && payment.payment.currency) {
				totalCurrencySymbol = payment.payment.currency; // currency for the total prices will be the last defined payment's currency
			}
		});

		scope.totalCurrencySymbol = totalCurrencySymbol;
		scope.monthlyPayments = [].concat.apply([], scope.monthlyPayments);
		scope.oneTimePayments = [].concat.apply([], scope.oneTimePayments);
		scope.totalNetMounthly = Math.round(totalNetMonthly * 100) / 100;
		scope.totalNetOnetime = Math.round(totalNetOnetime * 100) / 100;

		angular.forEach(scope.monthlyPayments.concat(scope.oneTimePayments), function(c){
			c.amount = Math.round(c.amount * 100) / 100;
			c.netAmount = Math.round(c.netAmount * 100) / 100;
		});

		function formatPrice(amount, currency) {
			var translationId = 'currencySymbols.';
			var currencySymbol = '';

			if (!amount) {
				return;
			}

			if (!currency) {
				return $filter('currency')(amount);
			}

			translationId += currency;
			currencySymbol = __(translationId);

			return translationId === currencySymbol ? $filter('currency')(amount) : $filter('currency')(amount, currencySymbol);
		}
	}

	return {
		require: '?ngModel',
		restrict: 'E',
		scope: {
			payments: '='
		},
		link: function(scope){
			if (!scope.payments){
				return;
			}

			scope.$watch('payments', function(){
				agregatePayments(scope);
			});
		},
		replace: true,
		template: template
	};
}]);


// Source: src/scripts/common/directives/date-input-mask.js
var module = angular.module('TT-UI.Common.Directives.DateInputMask', []);

function dateInputMask() {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function (scope, element, attrs, controller) {
			var $element = $(element);
			$element.mask(attrs.dateInputMaskFormat);
			$element.on('keyup', function () {
				scope.$apply(function(){
					controller.$setViewValue($element.val());
				});
			});
		}
	};
}

module.directive('dateInputMask', dateInputMask);


// Source: src/scripts/common/directives/date-validator.js
var module = angular.module('TT-UI.Common.Directives.DateValidator', [
	'TT-UI.Config',
	'TT-UI.Common.AngularStrap'
]);

function dateValidator(CONFIG, moment) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			var format = attrs.dateFormat || CONFIG.DATE_FORMAT;

			ctrl.$validators.dateValidator = function(modelValue, viewValue) {
				if (ctrl.$isEmpty(modelValue)) {
					return true;
				}

				function isValidByMoment() {
					var momentProvider = moment.getMoment();
					var momentFormat = format.replace(/y/g, 'Y').replace(/d/g, 'D');
					return momentProvider(viewValue, momentFormat, true).isValid();
				}

				if (angular.isDate(viewValue)) {
					return true;
				}
				return isValidByMoment();
			};
		}
	};
}
dateValidator.$inject = ['CONFIG', 'moment'];
module.directive('dateValidator', dateValidator);


// Source: src/scripts/common/directives/field-validator.js
var module = angular.module('TT-UI.Common.Directives.FieldValidator', [
	'TT-UI.FieldValidator.Config',
	'TT-UI.Common.Translate'
]);

function fieldValidator($parse, $q, $timeout, $log, FIELD_VALIDATOR_CONFIG, translateFilter) {
	var __ = translateFilter;

	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, element, attrs, ctrl) {
			var validation = $parse('form.schema.validation')($scope);

			if(!validation) {
				return;
			}

			var isStringValidation = angular.isString(validation);

			if(!isStringValidation && !angular.isArray(validation))  {
				$log.error('Wrong validation type: "' + validation + '"');
				return;
			}

			makeValidationList(validation, isStringValidation).forEach(function(validatorName){
				applyValidation ($scope, ctrl, validatorName);
			});
		}
	};

	function applyValidation ($scope, ctrl, validatorName){
		var basePath = $parse(validatorName)(FIELD_VALIDATOR_CONFIG);

		if(!basePath) {
			$log.error('Missing validator: "' + validatorName + '"');
			return;
		}

		var switcher = $parse(validatorName + '.switch')(FIELD_VALIDATOR_CONFIG);
		if(!angular.isString(switcher)) {
			updateSchema($scope, ctrl, validatorName, basePath);
		} else {
			switcher = updateSwitcher($scope, switcher);

			$scope.$watch('model.' + switcher, function(value){
				if(value){
					basePath = $parse(validatorName + '["' + value + '"]')(FIELD_VALIDATOR_CONFIG);
				} else {
					basePath = $parse(validatorName)(FIELD_VALIDATOR_CONFIG);
				}

				updateSchema($scope, ctrl, validatorName, basePath);
				ctrl.$$parseAndValidate();
			});
		}
	}

	function makeValidationList (validation, isStringValidation){
		if(isStringValidation) {
			return [validation];
		}

		return validation;
	}

	function updateSwitcher ($scope, switcher){
		return switcher.replace('arrayIndex', $scope.arrayIndex);
	}

	function removeValidator ($scope, ctrl, validatorName){
		delete ctrl.$asyncValidators[validatorName];
		$parse('form.validationMessage' + '["' + validatorName + '"]').assign($scope, undefined);
	}

	function updateSchema ($scope, ctrl, validatorName, basePath ){
		var newMessages = {};
		var oldMessage = $parse('form.validationMessage')($scope);
		var message = $parse('errorMessage')(basePath);

		if(angular.isObject(oldMessage)) {
			angular.extend(newMessages, oldMessage);
		} else {
			newMessages.default = oldMessage;
		}

		var pattern;
		var patternName = $parse('pattern')(basePath);

		if(!patternName){
			removeValidator ($scope, ctrl, validatorName);
			return;
		}

		// If pattern is not regExp but validatorName, take the regExp from config using this validatorName
		if(angular.isString(patternName)){
			pattern = $parse(patternName + '.pattern')(FIELD_VALIDATOR_CONFIG);
			message = message || $parse(patternName + '.errorMessage')(FIELD_VALIDATOR_CONFIG);
		} else {
			pattern = patternName;
		}

		if(!pattern) {
			$log.error('Missing validation pattern for: "' + patternName + '"');
			return;
		}

		newMessages[validatorName] = __(message);
		$parse('form.validationMessage').assign($scope, newMessages);

		ctrl.$validators[validatorName] = function(modelValue, viewValue) {
			if (!ctrl.$isEmpty(modelValue) && angular.isString(viewValue)) {
				return (pattern && angular.isFunction(pattern.test) && pattern.test(viewValue));
			}
			return true;
		};
	}
}

fieldValidator.$inject = ['$parse', '$q', '$timeout', '$log', 'FIELD_VALIDATOR_CONFIG', 'translateFilter'];
module.directive('fieldValidator', fieldValidator);


// Source: src/scripts/common/directives/forms.js
var module = angular.module('TT-UI.Common.Directives.Forms', [
	'schemaForm',
	'ui.bootstrap.accordion',
	'ui.bootstrap.typeahead',
	'uib/template/typeahead/typeahead-match.html',
	'uib/template/typeahead/typeahead-popup.html',
	'ngAnimate',
	'TT-UI.Common.AngularStrap',
	'TT-UI.Common.Config',
	'TT-UI.Common.Services.FormValidator',
	'TT-UI.Common.Directives.BootstrapUiTmplates',
	'TT-UI.Common.Filters.ObjectFieldFilter'
]);

module.constant('SCHEMA_FORM_PREPROCESSOR', {
	wrapper: function(form) {
		return this.logic(form);
	}
});
module.config(extendSchemaForm);
module.config(configureSchemaFormForTTUI);
module.run(configureSchemaFormPreprocessor);

function extendSchemaForm($provide) {
	$provide.decorator('sfPath', ['$delegate', function($delegate) {
		var parse = $delegate.parse;

		var numberRegExp = /^[0-9]+$/;

		$delegate.parse = function() {
			var parts = parse.apply($delegate, arguments);

			parts.map(function(part) {
				return angular.isString(part) && part.match(numberRegExp) ? +part : part;
			});

			return parts;
		};

		return $delegate;
	}]);
	$provide.decorator('schemaForm', function($delegate) {
		var mergeFn = $delegate.merge;
		$delegate.merge = function(schema, form, ignore, options, readonly) {
			var addons = ['columns', 'accordion', 'columns-inline'];
			form = form.map(function(obj) {
				var items = [];
				addons.forEach(function(addon) {
					if (obj[addon]) {
						obj[addon].forEach(function(item) {
							items.push(item);
						});
					}
				});

				if (items.length) {
					if (obj.items) {
						Array.prototype.push.apply(obj.items, items);
					} else {
						obj.items = items;
					}
				}

				return obj;
			});
			return mergeFn.call(this, schema, form, ignore, options, readonly);
		};

		return $delegate;
	});
}
extendSchemaForm.$inject = ['$provide'];

function configureSchemaFormForTTUI(decoratorsProvider, schemaFormProvider, PathProvider, COMMON_CONFIG, SCHEMA_FORM_PREPROCESSOR) {
	var DIRECTIVE_URL = COMMON_CONFIG.BASE_URL + 'views/directives/';
	var FORMS_URL = DIRECTIVE_URL + 'forms/';

	var getSchemaType = function(schema) {
		var type = schema.type;

		if (angular.isArray(type) && type.length === 2) {
			if (type[0] === 'null') {
				return type[1];
			}

			if (type[1] === 'null') {
				return type[0];
			}
		}

		return type;
	};

	var datepicker = function(name, schema, options) {
		var type = getSchemaType(schema);

		if ((type === 'string' || type === 'number') && (schema.format === 'date' || schema.format === 'date-time')) {
			var f = schemaFormProvider.createStandardForm(name, schema, options);

			f.key = options.path;
			f.type = schema.format === 'date' ? 'datepicker' : 'datetimepicker';
			f.dateType = schema.dateType;

			options.lookup[PathProvider.stringify(options.path)] = f;

			return f;
		}
	};

	var enumToTitleMap = function(schema, form) {
		var enm = schema['enum'];
		var titleMap = angular.isArray(enm) && angular.isObject(enm[0]) ? enumObjectToTitleMap(schema, form) : enumArrayToTitleMap(schema, form);

		enm = schema['enum']; // Referance may change

		if (!form.required && enm.indexOf(null) === -1) {
			enm.push(null);
		}

		return titleMap;
	};

	var enumObjectToTitleMap = function(schema) {
		schema.masterData = schema['enum'];

		var enm = schema['enum'] = [];
		var enumNames = schema.names = {};
		var titleMap = [];

		schema.masterData.forEach(function(opt) {
			titleMap.push({
				name: opt.name,
				value: opt.code
			});

			enm.push(opt.code);
			enumNames[opt.code] = opt.name;
		});

		return titleMap;
	};

	var enumArrayToTitleMap = function(schema) {
		var titleMap = [];
		var enm = schema['enum'];
		var names = angular.isObject(schema.names) ? schema.names : false;
		var name;

		enm.forEach(function(value) {
			if (value === null) {
				return;
			}

			name = names ? names[value] : value;
			titleMap.push({name: name, value: value});
		});

		return titleMap;
	};

	var dropdown = function(name, schema, options) {
		var type = getSchemaType(schema);
		var enm = schema['enum'];

		if (type === 'string' && enm) {
			var f = schemaFormProvider.createStandardForm(name, schema, options);

			f.key = options.path;
			f.type = 'select';
			f.titleMap = enumToTitleMap(schema, f);

			options.lookup[PathProvider.stringify(options.path)] = f;

			return f;
		}
	};

	var checkboxes = function(name, schema, options) {
		var type = getSchemaType(schema);
		var enm = schema.items['enum'];

		if (type === 'array' && schema.items && enm) {
			var f = schemaFormProvider.createStandardForm(name, schema, options);

			f.key = options.path;
			f.type = 'checkboxes';
			f.titleMap = enumToTitleMap(schema.items, f);

			options.lookup[PathProvider.stringify(options.path)] = f;

			return f;
		}
	};

	var defaults = schemaFormProvider.defaults;

	defaults.string.splice(0, 1, datepicker, dropdown);
	defaults.number.unshift(datepicker);
	defaults.array.splice(0, 1, checkboxes);

	schemaFormProvider.postProcess(SCHEMA_FORM_PREPROCESSOR.wrapper.bind(SCHEMA_FORM_PREPROCESSOR));

	decoratorsProvider.createDecorator('ttuiDecorator', {
		textarea: FORMS_URL + 'textarea.tpl.html',
		fieldset: FORMS_URL + 'tmp.tpl.html',
		array: FORMS_URL + 'array.tpl.html',
		tabarray: FORMS_URL + 'tmp.tpl.html',
		tabs: FORMS_URL + 'tmp.tpl.html',
		section: FORMS_URL + 'section.tpl.html',
		conditional: FORMS_URL + 'section.tpl.html',
		actions: FORMS_URL + 'tmp.tpl.html',
		select: FORMS_URL + 'select.tpl.html',
		checkbox: FORMS_URL + 'tmp.tpl.html',
		checkboxes: FORMS_URL + 'checkboxes.tpl.html',
		number: FORMS_URL + 'default.tpl.html',
		password: FORMS_URL + 'default.tpl.html',
		submit: FORMS_URL + 'submit.tpl.html',
		button: FORMS_URL + 'tmp.tpl.html',
		radios: FORMS_URL + 'radios.tpl.html',
		'radios-inline': FORMS_URL + 'radios-inline.tpl.html',
		radiobuttons: FORMS_URL + 'tmp.tpl.html',
		help: FORMS_URL + 'help.tpl.html',
		'default': FORMS_URL + 'default.tpl.html',
		columns: FORMS_URL + 'columns.tpl.html',
		'columns-inline': FORMS_URL + 'columns-inline.tpl.html',
		accordion: FORMS_URL + 'accordion.tpl.html',
		'break': FORMS_URL + 'break.tpl.html',
		multiselect: FORMS_URL + 'multiselect.tpl.html',
		datepicker: FORMS_URL + 'datepicker.tpl.html',
		'validation-status': FORMS_URL + 'validation-status.tpl.html',
		'multiselect-dropdown': FORMS_URL + 'multiselect-dropdown.tpl.html',
		typeahead: FORMS_URL + 'typeahead.tpl.html',
		'suggestion-box': FORMS_URL + 'suggestion-box.tpl.html',
		static: FORMS_URL + 'static.tpl.html'
	}, []);

	//manual use directives
	decoratorsProvider.createDirectives({
		textarea: FORMS_URL + 'tmp.tpl.html',
		select: FORMS_URL + 'select.tpl.html',
		checkbox: FORMS_URL + 'tmp.tpl.html',
		checkboxes: FORMS_URL + 'checkboxes.tpl.html',
		number: FORMS_URL + 'default.tpl.html',
		submit: FORMS_URL + 'submit.tpl.html',
		button: FORMS_URL + 'tmp.tpl.html',
		text: FORMS_URL + 'default.tpl.html',
		date: FORMS_URL + 'default.tpl.html',
		password: FORMS_URL + 'default.tpl.html',
		input: FORMS_URL + 'default.tpl.html',
		radios: FORMS_URL + 'tmp.tpl.html',
		'radios-inline': FORMS_URL + 'tmp.tpl.html',
		radiobuttons: FORMS_URL + 'tmp.tpl.html',
		multiselect: FORMS_URL + 'multiselect.tpl.html',
		datepicker: FORMS_URL + 'datepicker.tpl.html',
		'multiselect-dropdown': FORMS_URL + 'multiselect-dropdown.tpl.html',
		typeahead: FORMS_URL + 'typeahead.tpl.html'
	});
}
configureSchemaFormForTTUI.$inject = [
	'schemaFormDecoratorsProvider', 'schemaFormProvider', 'sfPathProvider', 'COMMON_CONFIG', 'SCHEMA_FORM_PREPROCESSOR'
];

function configureSchemaFormPreprocessor(FormValidator, SCHEMA_FORM_PREPROCESSOR) {
	SCHEMA_FORM_PREPROCESSOR.logic = function(form) {
		form.forEach(function(field) {
			if (field.key) {
				FormValidator.registerField(field);
			}
			var type = (field.schema || {}).type || '';
			var format = (field.schema || {}).format || '';

			// Remove title from items if format of array is 'table'
			if (type === 'array' && format === 'table') {
				(angular.isArray(field.items) && field.items || []).forEach(function(item) {
					item.notitle = true;
				});
			}
		});
		return form;
	};
}
configureSchemaFormPreprocessor.$inject = ['FormValidator', 'SCHEMA_FORM_PREPROCESSOR'];


// Source: src/scripts/common/directives/forms/auto-tab-field.js
var module = angular.module('TT-UI.Common.Directives.Forms');

function autoTabField() {
	return {
		restrict: 'A',
		replace: false,
		scope: false,
		require: '^autoTabForm',
		link: function(scope, element, attr, ctrl) {
			if (!scope.form.required) {
				return;
			}

			element.attr('tabindex', ++ctrl.counter.fields);
		}
	};
}

module.directive(autoTabField.name, autoTabField);


// Source: src/scripts/common/directives/forms/auto-tab-form.js
var module = angular.module('TT-UI.Common.Directives.Forms');

function autoTabForm() {
	return {
		restrict: 'A',
		replace: false,
		scope: false,
		require: '^form',
		controller: ['$scope', function($scope) {
			var counter = this.counter = {
				fields: 0,
				buttons: 0
			};

			$scope.$on('$destroy', function() {
				counter.fields = 0;
				counter.buttons = 0;
			});
		}]
	};
}

module.directive(autoTabForm.name, autoTabForm);


// Source: src/scripts/common/directives/forms/auto-tab-submit.js
var module = angular.module('TT-UI.Common.Directives.Forms');

function autoTabSubmit() {
	return {
		restrict: 'A',
		replace: false,
		scope: false,
		require: '^autoTabForm',
		link: function(scope, element, attr, ctrl) {
			var buttonCounter = ctrl.counter.buttons++;

			scope.$watch(function() {
				return ctrl.counter.fields;
			}, function() {
				element.attr('tabindex', ctrl.counter.fields + buttonCounter);
			});
		}
	};
}

module.directive(autoTabSubmit.name, autoTabSubmit);


// Source: src/scripts/common/directives/forms/autofocus.js
var module = angular.module('TT-UI.Common.Directives.Forms');

function autofocus($timeout) {
	return {
		restict: 'A',
		replace: false,
		scope: false,
		compile: function() {
			return {
				post: function(scope, el, attr) {
					if (!attr.autofocus) {
						return;
					}

					$timeout(function() {
						el[0].focus();
					}, 0);
				}
			};
		}
	};
}
autofocus.$inject = ['$timeout'];

module.directive(autofocus.name, autofocus);


// Source: src/scripts/common/directives/forms/schema-validate.js
var module = angular.module('TT-UI.Common.Directives.Forms');

function schemaValidate() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, $element, $attribute, ngModelCtrl) {
			$scope.$on('schemaFormValidate', function() {
				// reset committed value and validation results before re-validate
				if(ngModelCtrl) {
					Object.keys(ngModelCtrl.$error).forEach(function(key) {
						ngModelCtrl.$setValidity(key, true);
					});
					ngModelCtrl.$$lastCommittedViewValue = Number.NaN;
				}
			});
		}
	};
}

module.directive(schemaValidate.name, schemaValidate);


// Source: src/scripts/common/directives/forms/sf-array.js
var module = angular.module('TT-UI.Common.Directives.Forms');

function sfArray($parse, schemaForm) {

	return {
		restrict: 'A',
		scope: true,
		priority: -1,
		require: '?ngModel',
		link: function(scope, element, attrs) {
			var cleanup = scope.$watch(attrs.sfArray, function(form) {
				if (!form) {
					return;
				}

				fillDefaultValuesInArrayModel(form);

				scope.canDeleteFromArray = function() {
					if (!form.schema.hasOwnProperty('minItems')) {
						return true;
					}
					return scope.modelArray.length > form.schema.minItems;
				};

				scope.canAppendToArray = function() {
					if (!form.schema.hasOwnProperty('maxItems')) {
						return true;
					}
					return scope.modelArray.length < form.schema.maxItems;
				};

				cleanup();
			});

			function fillDefaultValuesInArrayModel(form) {
				schemaForm.traverseForm(form, function(item) {
					var defaultValue;
					if (defaultValue = getItemDefaultValue(item)) {
						var array = getArrayModel(form);
						for (var arrayIndex = 0; arrayIndex < array.length; arrayIndex++) {
							var elementModel = $parse(getArrayElementPath(item, arrayIndex));
							if(angular.isUndefined(elementModel(scope.model))) {
								elementModel.assign(scope.model, defaultValue);
							}
						}
					}
				});
			}

			function getItemDefaultValue(item) {
				return $parse('default')(item) || $parse('schema.default')(item);
			}

			function getArrayModel(form) {
				var arrayPath = form.key.join('.');
				return $parse(arrayPath)(scope.model) || [];
			}

			function getArrayElementPath(item, arrayIndex) {
				return item.key.join('.').replace('..', '[' + arrayIndex + '].');
			}
		}
	};
}
sfArray.$inject = ['$parse', 'schemaForm'];

module.directive(sfArray.name, sfArray);


// Source: src/scripts/common/directives/forms/validation-status.js
var module = angular.module('TT-UI.Common.Directives.Forms');

function validationStatus($injector, $rootScope, $alert, VALIDATION_EVENTS) {
	return {
		restrict: 'E',
		replace: false,
		scope: false,
		require: '^sfSchema',
		link: function(scope, element, attr) {
			var validatorName = attr.validator;
			var index = scope.arrayIndex;
			var validatorService = $injector.get(validatorName);

			var options = {
				container: element,
				title: '',
				content: '',
				type: 'danger',
				show: false
			};
			var notification = $alert(options);

			var unbounds = [];

			unbounds.push($rootScope.$on(VALIDATION_EVENTS.STATUS, function(e, formName, validator, isValid, status, fieldIndex) {
				if (!(validator instanceof validatorService) || !validator.isInline() || fieldIndex !== index) {
					return;
				}

				if (isValid || isValid === null) {
					notification.hide();
					return;
				}

				var resultsMsg = [];

				if (angular.isArray(status)) {
					status.forEach(function(msg) {
						angular.forEach(msg, function(val) {
							resultsMsg.push(val);
						});
					});
				} else if (angular.isString(status)) {
					resultsMsg.push(status);
				}

				angular.extend(notification.$options, {
					title: resultsMsg.join('<br>')
				});

				angular.extend(notification.$scope, notification.$options);

				notification.show();
			}));

			unbounds.push($rootScope.$on(VALIDATION_EVENTS.IN_PROGRESS, function(e, formName, validator, fieldIndex) {
				if (!(validator instanceof validatorService) || !validator.isInline() || fieldIndex !== index) {
					return;
				}

				notification.hide();
			}));

			scope.$on('$destroy', function() {
				notification.hide();

				unbounds.forEach(function(unbound) {
					unbound();
				});
			});
		}
	};
}
validationStatus.$inject = ['$injector', '$rootScope', '$alert', 'VALIDATION_EVENTS'];

module.directive(validationStatus.name, validationStatus);


// Source: src/scripts/common/directives/is-date-after-validator.js
angular.module('TT-UI.Common.Directives.IsDateAfterValidator', [
	'TT-UI.Config',
	'TT-UI.Common.AngularStrap',
	'TT-UI.Common.AngularStrap',
	'TT-UI.Common.Services.FormValidator'
])

.directive('isDateAfterValidator', ['$dateParser', '$log', 'CONFIG', function($dateParser, $log, CONFIG) {

	var dateParser = $dateParser({format: CONFIG.MODEL_DATE_FORMAT});

	return {
		restrict: 'A',
		require: ['?ngModel', '^form'],
		link: function(scope, element, attr, controllers) {
			if (!attr.isDateAfterValidator){
				return;
			}

			var ngModel  = controllers[0];
			var form = controllers[1];

			var fieldId = attr.isDateAfterValidator;

			var relativeNgModel = form[fieldId];

			scope.$watch(function(){
				return relativeNgModel.$modelValue;
			}, ngModel.$validate);

			ngModel.$validators.shouldBeAfter = function(modelValue){
				if (!modelValue){
					return true;
				}

				var relativeDate = dateParser.parse(relativeNgModel.$modelValue);
				var myDate = dateParser.parse(modelValue);

				if (!relativeDate || !myDate){
					$log.error('Date format exception (is-date-after-validator): one of dates is not in correct format. ' + relativeDate + ' ' + myDate);
					return false;
				}

				var relativeTime = relativeDate.getTime();
				var myTime = myDate.getTime();

				return myTime >= relativeTime;
			};
		}
	};
}]);


// Source: src/scripts/common/directives/multiselect-dropdown-legacy.js
angular.module('TT-UI.Common.Directives.MultiselectDropdownLegacy', [])
	.directive('multiselectDropdownLegacy', function() {
		/* globals $: true */
		var template = '<div tabindex="0" class="btn-group ui-multiselect-dropdown" ng-class="{open: open}" ng-init="open=false" data-role="multiselect">' +
			'<div class="ui-multiselect-dropdown-description" ng-bind="selectedDescription || \'Select\'"></div>' +
			'<ul class="dropdown-menu" autofocus="autofocus">' +
			'<li ng-click="selectAll()" class="ui-multiselect-dropdown-option" data-role="option" data-value="select-all">Check All</li>' +
			'<li ng-click="deselectAll();" class="ui-multiselect-dropdown-option" data-role="option" data-value="unselect-all">Uncheck All</li>' +
			'<li class="divider"></li>' +
			'<li ng-repeat="option in options" ng-click="setSelectedItem(option)" class="ui-multiselect-dropdown-option" ng-class="{selected: keyBoardPointer(option.value)}" data-role="option" ng-attr-data-value="{{::option.value}}" data-type="value" ng-attr-data-checked="{{isChecked(option.value) ? 1 : 0}}">' +
			'{{::option.name}}' +
			'<span ng-class="{\'glyphicon glyphicon-ok pull-right\': isChecked(option.value)}"></span>' +
			'</li>' +
			'</ul>' +
			'</div>';

		return {
			require: 'ngModel',
			restrict: 'E',
			scope: {
				options: '=',
				preselected: '='
			},
			replace: true,
			link: function(scope, element, attributes, ngModel) {
				// General multiselect-dropdown functionality
				var el = element[0];
				var currentSelectedOption = '';

				scope.selectedDescription = '';
				scope.model = scope.preselected || [];

				if (scope.model.length !== 0) {
					changeModel();
					ngModel.$setPristine();
				}

				ngModel.$formatters.push(updateDescription);
				ngModel.$parsers.push(updateDescription);

				function changeModel() {
					var model = scope.model;
					var newModelValue = angular.copy(model);

					ngModel.$setViewValue(newModelValue);
					// TODO: Fix me. $setViewValue set dirtines of field to true

					updateDescription(model);
				}

				function updateDescription(model) {
					if (angular.isUndefined(model)) {
						scope.selectedDescription = '';
					} else {
						var labels = model.map(function(value){
							var label;
							
							scope.options.some(function(option){
								if(option.value === value){
									return label = option.name;
								}
							});
							
							return label || value;
						});
						scope.selectedDescription = labels.length > 4 ? labels.length + ' items selected' : labels.join(', ');
					}

					return model;
				}

				$(el).click(function(event) {
					var el = $(event.target);
					if (el.hasClass('ui-multiselect-dropdown-option') || attributes.disabled) { // one of the options is being clicked
						return;
					}

					scope.open = !scope.open;
					scope.$digest();
				});

				scope.selectAll = function() {
					scope.model = pluck(scope.options, 'value');
					changeModel();
				};

				scope.deselectAll = function() {
					scope.model.length = 0;
					changeModel();
				};

				scope.setSelectedItem = function(option) {
					var value = option.value;
					if (contains(scope.model, value)) {
						scope.model = without(scope.model, value);
					} else {
						scope.model.push(value);
					}
					currentSelectedOption = value;
					changeModel();
					return false;
				};

				scope.isChecked = function(value) {
					return contains(scope.model, value);
				};

				scope.keyBoardPointer = function(value) {
					return currentSelectedOption === value;
				};

				// Keyboard events handling section

				var keys = {
					32: {name: 'space', preventDefault: true},
					13: {name: 'space', preventDefault: true},
					38: {name: 'arrowUp', preventDefault: true},
					40: {name: 'arrowDown', preventDefault: true},
					27: {name: 'escape', preventDefault: false}
				};

				function arrowCallback(direction) { // arrows handler
					return function() {
						if (!scope.open) {
							scope.open = true;
						}

						var opts = pluck(scope.options, 'value');
						if (currentSelectedOption === '') { // for the first dropdown opening set current select as first one
							currentSelectedOption = opts[0];
							return;
						}

						var index = opts.indexOf(currentSelectedOption);
						if (index + direction > opts.length - 1) {
							currentSelectedOption = opts[0];
						} else if (index + direction < 0) {
							currentSelectedOption = opts[opts.length - 1];
						} else {
							currentSelectedOption = opts[index + direction];
						}
					};
				}

				var keyDownCallbacks = { //keyboard callbacks bindings
					space: function() { // space button handler
						if (!scope.open || currentSelectedOption === '') {
							scope.open = true;
						} else if (currentSelectedOption !== '') {
							scope.setSelectedItem({value: currentSelectedOption}); // probably not the best solution
						}
					},
					arrowUp: arrowCallback(-1),
					arrowDown: arrowCallback(1),
					escape: function() { // escape button handler. Close dropdown
						scope.open = false;
						currentSelectedOption = '';
						scope.$digest();
					}
				};

				$(el).keydown(function(event) {
					if (attributes.disabled) {
						return;
					}

					var key = keys[event.keyCode];

					if (key) {
						if (key.preventDefault) {
							event.preventDefault(); // prevent default actions for binded keys
						}
						keyDownCallbacks[key.name](); // if we got handler - execute it and update the scope
						scope.$digest();
					}
				});

				// close list on focus out

				$(el).focusout(function() {
					keyDownCallbacks.escape(); //close dropdown
				});

				// Those three below are substitures for pluck, contains and without functions of underscore.js

				function pluck(obj, field) {
					var ret = [];
					var p;

					for (p in obj) {
						if (obj.hasOwnProperty(p) && obj[p][field] !== undefined) {
							ret.push(obj[p][field]);
						}
					}
					return ret;
				}

				function contains(array, name) {
					return array.indexOf(name) !== -1;
				}

				function without(array, name) {
					var index = array.indexOf(name);
					if (index !== -1) {
						array.splice(index, 1);
					}
					return array;
				}

			},
			template: template
		};
	});


// Source: src/scripts/common/directives/multiselect-dropdown.js
angular.module('TT-UI.Common.Directives.MultiselectDropdown', ['ngAnimate'])
.directive('multiselectDropdown', function ($sce) {

	return {
		require: 'ngModel',
		restrict: 'E',
		scope: {
			options: '=',
			preselected: '=?',
			saveValueOnly: '=?',
			ngModel: '=',
			isDisabled: '=?'
		},
		link: function (scope, element, attributes, ngModel) {
			var currentSelectedOption = '';
			scope.open = false;
			scope.allSelected = false;
			scope.limitNo = 8;
			scope.limit = scope.limitNo;
			scope.showAll = false;

			scope.$watchCollection(function () { return ngModel.$viewValue; }, function () {
				updateSelected();
				updateCount();
				ngModel.$commitViewValue();
			});

			var loadOnce = scope.$watch('preselected', function (value) {
				if (value && value.length > 0) {
					loadOnce();
					ngModel.$setViewValue(value);
					ngModel.$setPristine();
				}
			}, true);

			ngModel.$isEmpty = function () {
				return !ngModel.$modelValue || ngModel.$modelValue.length === 0;
			};

			function updateSelected() {
				var model = ngModel.$viewValue;
				if (angular.isUndefined(model)) {
					scope.selectedOptions = [];
				} else {
					// save value only
					if (scope.saveValueOnly) {
						scope.selectedOptions = getSelectedOptions(model);
					} else {
						scope.selectedOptions = model;
					}
				}
				return model;
			}

			function getSelectedOptions(model) {
				var options = [];
				angular.forEach(model, function(value) {
					var found = find(scope.options, value);

					if (found) {
						// needed for showing tags
						options.push({
							name: found.name,
							value: found.value
						});
					}
				});
				return options;
			}

			function getSelectAllOptions(model) {
				var options = [];
				angular.forEach(model, function(value) {
					var found = find(scope.options, value.value);

					if (found) {
						options.push(found.value);
					}
				});
				return options;
			}

			scope.toggleDropdown = function() {
				scope.open = !scope.open;
			};

			scope.toggleSelectAll = function(event) {
				event.stopPropagation();

				if (!scope.isDisabled) {
					if (scope.filteredOptions.length !== scope.options.length) {
						if (!allOptionsSelected(scope.filteredOptions)) {
							selectAll();
						} else {
							deselectAll();
						}
					} else if (!scope.allSelected) {
						selectAll();
					} else {
						deselectAll();
					}
				}
			};

			var selectAll = function() {
				if (!scope.isDisabled) {
					if (scope.filteredOptions.length === scope.options.length) {
						// Select all

						// save value only
						if (scope.saveValueOnly) {
							ngModel.$setViewValue(getSelectAllOptions(scope.options));
						} else {
							ngModel.$setViewValue(angular.copy(scope.options));
						}
					} else {
						// Select all filtered unselected
						var model = ngModel.$viewValue || [];
						for (var i = 0; i < scope.filteredOptions.length; i++) {
							if (!contains(model, scope.filteredOptions[i].value)) {
								// save value only
								if (scope.saveValueOnly) {
									model = model.concat(angular.copy(scope.filteredOptions[i].value));
								} else {
									model = model.concat(angular.copy(scope.filteredOptions[i]));
								}
							}
						}
						ngModel.$setViewValue(model);
					}
				}
			};

			var deselectAll = function () {
				if (!scope.isDisabled) {
					if (scope.filteredOptions.length === scope.options.length) {
						// Deselect all
						ngModel.$setViewValue([]);
					} else {
						// Deselect all filtered selected
						var model = ngModel.$viewValue || [];
						for (var i = 0; i < scope.filteredOptions.length; i++) {
							if (contains(model, scope.filteredOptions[i].value)) {
								model = without(model, scope.filteredOptions[i].value);
							}
						}
						ngModel.$setViewValue(model);
					}
				}
			};

			function allOptionsSelected(options) {
				for (var i = 0; i < options.length; i++) {
					if (!scope.isChecked(options[i].value)) {
						return false;
					}
				}
				return true;
			}

			function updateCount() {
				var model = ngModel.$viewValue;
				if (model) {
					scope.count = model.length;
					if (scope.count === scope.options.length) {
						scope.allSelected = true;
					} else {
						scope.allSelected = false;
					}
				}
			}

			scope.setSelectedItem = function(option, ev) {
				ev.preventDefault();
				ev.stopPropagation();
				ev.stopImmediatePropagation();

				if (scope.isDisabled) {
					return false;
				}

				var value = option.value;
				var model = ngModel.$viewValue || [];

				// save value only
				if (scope.saveValueOnly) {
					// remove
					if (find(model, value)) {
						ngModel.$setViewValue(without(model, value));
					// add
					} else {
						ngModel.$setViewValue(model.concat(value));
					}
				// save full object
				} else {
					// remove
					if (contains(model, value)) {
						ngModel.$setViewValue(without(model, value));
					// add
					} else {
						ngModel.$setViewValue(model.concat(option));
					}
				}

				ngModel.$setDirty();
				currentSelectedOption = option;
				focusElement();

				return false;
			};

			scope.$on('schemaFormValidate', function () {
				ngModel.$commitViewValue();
				ngModel.$validate();
			});

			scope.isChecked = function (value) {
				return ngModel.$viewValue && contains(ngModel.$viewValue, value);
			};

			scope.keyBoardPointer = function (value) {
				return currentSelectedOption.value === value;
			};

			scope.toggleShowAll = function () {
				scope.showAll = !scope.showAll;
				if (scope.showAll) {
					scope.limit = scope.options.length;
				} else {
					scope.limit = scope.limitNo;
				}
			};

			// Keyboard events handling section
			var keys = {
				32: { name: 'space', preventDefault: true },
				13: { name: 'enter', preventDefault: true },
				38: { name: 'arrowUp', preventDefault: true },
				40: { name: 'arrowDown', preventDefault: true },
				27: { name: 'escape', preventDefault: false }
			};

			function arrowCallback(direction) {
				return function () {
					if (!scope.open) {
						scope.open = true;
						return;
					}

					var opts = scope.filteredOptions;
					if (currentSelectedOption === '') {
						currentSelectedOption = opts[0];
						focusElement();
						return;
					}

					var index = opts.indexOf(currentSelectedOption);
					if (index + direction > opts.length - 1) {
						currentSelectedOption = opts[0];
					} else if (index + direction < 0) {
						currentSelectedOption = opts[opts.length - 1];
					} else {
						currentSelectedOption = opts[index + direction];
					}
					focusElement();
				};
			}

			function keyboardSelectOption(event) {
				if (event.target.id === 'select-all') {
					scope.toggleSelectAll(event);
				} else if (!scope.open || currentSelectedOption === '') {
					scope.open = true;
				} else if (currentSelectedOption !== '') {
					scope.setSelectedItem(currentSelectedOption, event);
				}
			}

			function focusElement() {
				if (currentSelectedOption !== '') {
					var elems = element.find('li');
					for (var i = 0; i < elems.length; i++) {
						if (elems[i].id === currentSelectedOption.value) {
							elems[i].focus();
							return;
						}
					}
				}
			}

			var keyDownCallbacks = {
				enter: function (event) {
					keyboardSelectOption(event);
				},
				space: function (event) {
					keyboardSelectOption(event);
				},
				arrowUp: arrowCallback(-1),
				arrowDown: arrowCallback(1),
				escape: function () {
					scope.open = false;
					scope.clearCurrentSelected();
				}
			};

			element.on('keydown', function (event) {
				if (attributes.disabled) {
					return;
				}

				var key = keys[event.keyCode];

				if (key) {
					if (key.preventDefault) {
						event.preventDefault();
					}
					keyDownCallbacks[key.name](event);
					scope.$digest();
				}
			});

			element.on('click', function (event) {
				event.stopPropagation();
			});

			document.addEventListener('click', function () {
				scope.onBlur();
				scope.$digest();
			});

			scope.onBlur = function () {
				scope.open = false;
				scope.clearCurrentSelected();
				ngModel.$validate();
			};

			scope.onMenuMouseDown = function (ev) {
				ev.preventDefault();
				ev.stopPropagation();
				return false;
			};

			scope.highlightMatching = function (option, searchText) {
				if (!searchText) {
					return $sce.trustAsHtml(option);
				}
				return $sce.trustAsHtml(option.replace(new RegExp(searchText, 'gi'), '<span class="highlightedText">$&</span>'));
			};

			scope.clearCurrentSelected = function () {
				currentSelectedOption = '';
			};

			//
			// underscore.js functions (modified)
			//
			function contains(array, name) {
				return arrayObjectIndexOf(array, name) !== -1;
			}

			function find(array, name) {
				var index = arrayObjectIndexOf(array, name);
				if (index !== -1) {
					return array[index];
				} else {
					return null;
				}
			}

			function without(array, name) {
				var index = arrayObjectIndexOf(array, name);
				if (index !== -1) {
					array.splice(index, 1);
				}
				return array;
			}

			function arrayObjectIndexOf(arr, obj) {
				for (var i = 0; i < arr.length; i++) {
					if (angular.isDefined(arr[i].value)) {
						if (angular.equals(arr[i].value, obj)) {
							return i;
						}
					} else {
						if (angular.equals(arr[i], obj)) {
							return i;
						}
					}
				}
				return -1;
			}
		},
		templateUrl: 'scripts/common/views/directives/multiselect-dropdown.tpl.html'
	};
});


// Source: src/scripts/common/directives/nav-menu.js
angular.module('TT-UI.Common.Directives.NavMenu', [
	'TT-UI.Common.States',
	'TT-UI.Common.Translate'
])

.directive('navMenu', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,

		scope: {
			state: '@'
		},

		controller: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
			$scope.links      = [];
			$scope.asideLinks = [];
			$scope.params     = $stateParams;

			$scope.goTo = function(state) {
				$state.go(state.name, $stateParams, {
					reload: true,
					notify: !state.locale
				});
			};

			var foundState = $state.$current,
				found = false,
				findChildren;

			// Find up to the root
			while (foundState.parent) {
				foundState = foundState.parent;

				if (foundState.name === $scope.state) {
					found = true;
					break;
				}
			}

			// Find in children
			if (!found) {
				findChildren = function(state) {
					if (state.name === $scope.state) {
						foundState = state;
						found = true;
					}

					if (!found && state.children && state.children.length) {
						found = state.children.some(findChildren);
						return found;
					}

					return found;
				};

				findChildren(foundState);
			}

			if (found) {
				$scope.links.length = 0;
				$scope.asideLinks.length = 0;

				if (foundState.children) {
					foundState.children.forEach(function(state) {
						if (state.label) {
							state.aside ? $scope.asideLinks.push(state) : $scope.links.push(state);
						}
					});
				}
			}

			$scope.isStateActive = function(state) {
				return $state.$current.includes[state.name];
			};
		}],

		template:
			'<nav class="main-menu">' +
				'<ul>' +
					'<li ng-repeat="state in links" ng-class="{selected: isStateActive(state), home: state.name === \'home\'}">' +
						'<a href="#{{state.url.format(params)}}" ng-click="goTo(state); $event.preventDefault()" ng-bind="state.label"></a>' +
					'</li>' +
				'</ul>' +

				'<div class="right">' +
					'<a ng-repeat="state in asideLinks" href="#{{state.url.format(params)}}" ng-click="goTo(state); $event.preventDefault()" class="{{state.className}}" title="{{state.label | translate}}" data-action="{{state.data.action}}" data-role="{{state.data.role}}"></a>' + // TODO: Fix title
				'</div>' +
			'</nav>'
	};
});


// Source: src/scripts/common/directives/pagination.js
angular.module('TT-UI.Common.Directives.Pagination', [
	'ui.router',
	'TT-UI.Common.Translate'
])

.filter('range', function() {
	return function(input, start, end) {
		if (!end) {
			end   = start;
			start = 1;
		}

		start = parseInt(start, 10);
		end   = parseInt(end,   10);

		for (start; start <= end; start++) {
			input.push(start);
		}

		return input;
	};
})

.constant('PAGINATION', {
	STATE_PARAM: 'page'
})

.directive('pagination', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: false,

		scope: {
			pages: '=',
			page:  '='
		},

		controller: ['$scope', '$state', '$stateParams', 'PAGINATION', function($scope, $state, $stateParams, PAGINATION) {
			$scope.showPrev = function() {
				return $scope.page > 1;
			};

			$scope.showNext = function() {
				return $scope.page < $scope.pages;
			};

			$scope.hasPages = function() {
				return $scope.pages && $scope.pages > 1;
			};

			$scope.isCurrent = function(page) {
				return page === $scope.page;
			};

			// Navigate
			$scope.goToPrevPage = function() {
				$scope.changePage($scope.getPrevPage());
			};

			$scope.goToFirstPage = function() {
				$scope.changePage($scope.getFirstPage());
			};

			$scope.goToNextPage = function() {
				$scope.changePage($scope.getNextPage());
			};

			$scope.goToLastPage = function() {
				$scope.changePage($scope.getLastPage());
			};

			// Getters
			$scope.getFirstPage = function() {
				return 1;
			};

			$scope.getNextPage = function() {
				var page = $scope.page + 1;

				if (page > $scope.getLastPage()) {
					page = $scope.getLastPage();
				}

				return page;
			};
			$scope.getPrevPage = function() {
				var page = $scope.page - 1;

				if (page < 1) {
					page = 1;
				}

				return page;
			};

			$scope.getLastPage = function() {
				return $scope.pages;
			};

			$scope.changePage = function(page) {
				if (page === $scope.page) {
					return;
				}

				if (page < 1) {
					page = 1;
				} else if (page > $scope.pages) {
					page = $scope.pages;
				}

				var params = {};
				params[PAGINATION.STATE_PARAM] = page;

				params = angular.extend({}, $stateParams, params);

				$state.go($state.current, params);
			};
		}],

		template:
			'<section class="pager-container">' +
				'<ul class="inline-pager" ng-show="hasPages()" data-role="pagination">' +
					'<li class="pager-prev" ng-click="goToFirstPage()" ng-class="{enabled: showPrev(), disabled: !showPrev()}" data-role="first-page" data-page="{{getFirstPage()}}" title="{{\'First page\' | translate}}">&lt;&lt;</li>' +
					'<li class="pager-prev" ng-click="goToPrevPage()"  ng-class="{enabled: showPrev(), disabled: !showPrev()}" data-role="prev-page"  data-page="{{getPrevPage()}}"  translate="&amp;lt; Prev">&lt; Prev</li>' +

					'<li ng-repeat="page in [] | range:pages" ng-click="changePage(page)" ng-class="{enabled: !isCurrent(page), current: isCurrent(page)}" data-role="page" data-page="{{page}}" ng-bind="page"></li>' +

					'<li class="pager-next" ng-click="goToNextPage()" ng-class="{enabled: showNext(), disabled: !showNext()}" data-role="next-page" data-page="{{getNextPage()}}" translate="Next &amp;gt;">Next &gt;</li>' +
					'<li class="pager-next" ng-click="goToLastPage()" ng-class="{enabled: showNext(), disabled: !showNext()}" data-role="last-page" data-page="{{getLastPage()}}" title="{{\'Last page\' | translate}}">&gt;&gt;</li>' +
				'</ul>' +
			'</section>'
	};
});


// Source: src/scripts/common/directives/post-message.js
angular.module('TT-UI.Common.Directives.PostMessage', [])

.constant('POST_MESSAGE', {
	SEND_EVENT: '$sendMessage',

	GREETINGS_INTERVAL: 100,

	MSG_HANDSHAKE: 'handshake',
	MSG_WELCOME:   'welcome',
	MSG_GREETINGS: 'greetings'
})

.directive('postMessage', ['$window', '$interval', 'POST_MESSAGE', function($window, $interval, POST_MESSAGE) {
	var service = {
		queue: [],
		run: function() {}
	}, timer, sendMessage;

	return {
		restrict: 'A',

		controller: function() {
			timer = $interval(function() {
				sendMessage(null, POST_MESSAGE.MSG_HANDSHAKE, 'welcome');
			}, POST_MESSAGE.GREETINGS_INTERVAL);

			// Exchange runner when handshake successed
			timer.catch(function() {
				service.run = sendMessage;

				service.queue.forEach(function(message) {
					service.run({}, message.type, message.data);
				});

			});
		},

		compile: function() {
			service.queue.length = 0;

			service.run = function(event, type, data) {
				service.queue.push({
					type: type,
					data: data
				});
			};

			return function link($scope, element) {
				var $rootScope = $scope.$root,
					unbind;

				unbind = $rootScope.$on(POST_MESSAGE.SEND_EVENT, service.run);
				$scope.$on('$destroy', unbind);

				$scope.frameWin = element.get(0).contentWindow;

				// Wait for greetings from iframe
				angular.element($window).bind('message', function(event) {
					if (event.originalEvent) {
						event = event.originalEvent;
					}

					var message = event.data || {};

					if (message.type &&
						message.type === POST_MESSAGE.MSG_HANDSHAKE &&
						message.data === POST_MESSAGE.MSG_GREETINGS
					) {
						$interval.cancel(timer);
					}
				});

				// Post Message sender
				sendMessage = function(event, type, data) {
					if ($scope.frameWin) {
						var message = {
							status: 200,
							type:   type,
							data:   data
						};

						$scope.frameWin.postMessage(message, '*');
					}
				};
			};
		}
	};
}]);


// Source: src/scripts/common/directives/progress-bar.js
angular.module('TT-UI.Common.Directives.ProgressBar', [])

.directive('progressBar', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			value: '@'
		},

		link: function(scope, element) {
			scope.$watch('value', function(value) {
				element.children().css('width', value + '%');
			});
		},

		template:
			'<div class="progress-bar">' +
				'<span class="value" data-value="{{value}}"></span>' +
			'</div>'
	};
});


// Source: src/scripts/common/directives/route-label.js
angular.module('TT-UI.Common.Directives.RouteLabel', [
	'ui.router'
])

.directive('routeLabel', function(translateFilter) {
	return {
		restrict: 'A',
		transclude: true,

		controller: ['$scope', '$state', function($scope, $state) {
			$scope.currentState = {
				label: ''
			};

			$scope.currentStateRefreshToggle = false;

			var unbound = $scope.$on('$stateChangeSuccess', function() {
				var state = $state.$current,
					currentState;

				while (state) {
					if (state.label && state.url && !state.isStep) {
						currentState = state;
						break;
					}

					state = state.parent;
				}

				$scope.currentState = currentState;
				$scope.currentStateRefreshToggle = !$scope.currentStateRefreshToggle;

			});

			$scope.$on('$destroy', unbound);
		}],

		link: function(scope, element) {
			scope.$watch( function(scope) {
				return scope.currentState && scope.currentState.label ? scope.currentStateRefreshToggle : null;
			}, function() {
				element.text(translateFilter(scope.currentState.label));
			});
		}
	};
});


// Source: src/scripts/common/directives/rtl-href.js
var module = angular.module('TT-UI.Common.Directives.RtlHref', [
	'TT-UI.Common.Services.Rtl'
]);

function rtlHref($rootScope, rtlService) {
	return {
		restrict: 'A',
		scope: {},
		compile: function(element, attrs) {

			var href = attrs.href,
				rtlHref = attrs.rtlHref;

			var setHref = function() {
				var direction = rtlService.getDirection();
				rtlService.setDocumentDirection(direction);

				if (direction === 'rtl') {
					attrs.$set('href', rtlHref);
				} else {
					attrs.$set('href', href);
				}
			};

			setHref();

			return function(scope) {
				var unbindTranslateLanguage = $rootScope.$on('$translateChangeSuccess', setHref);

				scope.$on('$destroy', function() {
					unbindTranslateLanguage();
				});
			};
		}
	};
}

rtlHref.$inject = ['$rootScope', 'rtlService'];
module.directive('rtlHref', rtlHref);


// Source: src/scripts/common/directives/select.js
angular.module('TT-UI.Common.Directives.Select', [])

.directive('selectUi', function() {
	return {
		restrict: 'C',

		link: function(scope, element) {
			element.wrap('<div class="styled-select" />');

			var wrapper = element.parent();

			if (element.hasClass('length-small')) {
				wrapper.addClass('length-small');
			}

			if (element.hasClass('length-medium')) {
				wrapper.addClass('length-medium');
			}
		}
	};
});


// Source: src/scripts/common/directives/simple-timeline.js
var module = angular.module('TT-UI.Common.Directives.SimpleTimeline', [
]);

module.filter('timelineRangeFilter', function() {
	return function(items, ctrl) {
		// if date filter is disabled, just return all items
		if (!ctrl.showDateFilter) {
			ctrl.filteredEventsLength = items.length;
			return items;
		}

		var outItems = [];
		var fromDate = new Date(ctrl.startTime);
		var toDate = new Date(ctrl.endTime);

		for (var i = items.length - 1; i >= 0; i--) {
			var itemDate = new Date(items[i].time);

			// always add undefined dates (i.e. button type)
			if (items[i].time === undefined) {
				outItems.push(items[i]);
			// check if date is in range
			} else if (itemDate >= fromDate && itemDate <= toDate) {
				outItems.push(items[i]);
			}
		}

		ctrl.filteredEventsLength = outItems.length;

		return outItems;
	};
});

module.filter('timelineContentFilter', function($filter) {
	return function(items, ctrl) {
		// if content filter is disabled, just return all items
		if (!ctrl.filter) {
			ctrl.filteredEventsLength = items.length;
			return items;
		}

		var outItems = $filter('filter')(items, {type: ctrl.filter.type, status: ctrl.filter.status});
		ctrl.filteredEventsLength = outItems.length;

		return outItems;
	};
});

module.filter('timelineOrderByFilter', function($filter) {
	return function(items) {
		return $filter('orderBy')(items, 'time', true);
	};
});

function simpleTimeline($filter, $parse) {
	var template =
		'<div class="simple-timeline-ttui">' +
			'<div class="timeline-filters" ng-if="simpleTimelineCtrl.showDateFilter">' +
				'<div class="timeline-filters-container">' +
					'<span class="timeline-filters-item" ng-class="{\'active\':simpleTimelineCtrl.isActive($index)}" ng-repeat="filter in simpleTimelineCtrl.filters" ng-bind="filter.title" ng-click="simpleTimelineCtrl.setFilter(filter, $index)" ng-if="simpleTimelineCtrl.showFilter($index)"></span>' +
					'<span class="timeline-filters-item" ng-click="simpleTimelineCtrl.showAllFilters()" ng-bind="simpleTimelineCtrl.moreFiltersText"></span>' +
				'</div>' +
				'<div class="input-group">' +
					'<input class="form-control input-prepend" type="text" placeholder="from" name="startTimePicker" data-autoclose="1" ng-model="simpleTimelineCtrl.startTime" bs-datepicker />' +
					'<span class="input-group-addon">' +
						'<i class="fa fa-calendar-minus-o fa-lg fa-fw"></i>' +
					'</span>' +
					'<input class="form-control input-append" style="text-align: right;" type="text" placeholder="to" name="endTimePicker" data-autoclose="1" ng-model="simpleTimelineCtrl.endTime" bs-datepicker />' +
				'</div>' +
			'</div>' +
			'<ul class="fa-ul" ng-class="{\'no-line\':simpleTimelineCtrl.hideLine}">' +
				'<li ng-repeat="event in simpleTimelineCtrl.events | timelineRangeFilter:simpleTimelineCtrl | timelineContentFilter:simpleTimelineCtrl | timelineOrderByFilter" ng-switch on="event.type" ng-if="simpleTimelineCtrl.showEvent($index)" ng-click="simpleTimelineCtrl.action(event)" ng-class="{\'no-bubble\':event.type === \'button\'}">' +
					'<i ng-class="event.status">' +
						'<i class="fa-li" ng-class="[simpleTimelineCtrl.getBadgeIconClass(event), simpleTimelineCtrl.getBadgeSizeClass()]"></i>' +
					'</i>' +
					'<div ng-class-even="\'timeline-panel-inverse\'" ng-class-odd="\'timeline-panel\'">' +
						'<div ng-switch-default>' +
							'<div class="time" ng-bind="event.time | date:\'mediumDate\'"></div>' +
							'<div class="header" ng-bind="event.title"></div>' +
						'</div>' +
						'<div ng-switch-when="image">' +
							'<div class="time" ng-bind="event.time | date:\'mediumDate\'"></div>' +
							'<div class="header" ng-bind="event.title"></div>' +
							'<img ng-src="{{event.src}}" class=""></img>' +
						'</div>' +
						'<div ng-switch-when="button">' +
							'<button class="btn btn-primary" type="button">{{event.title}}</button>' +
						'</div>' +
						'<div ng-class="{\'content\': !event.type, \'content-btn\': event.type === \'button\', \'content-img\': event.type === \'image\'}" ng-bind="event.content"></div>' +
					'</div>' +
				'</li>' +
				'<li ng-if="simpleTimelineCtrl.filteredEventsLength > 0 && simpleTimelineCtrl.showEndBadge">' +
					'<i class="primary">' +
						'<i class="fa-li fa fa-circle" ng-class="[simpleTimelineCtrl.getBadgeSizeClass()]"></i>' +
					'</i>' +
					'<div>&nbsp;</div>' +
				'</li>' +
				'<li ng-if="simpleTimelineCtrl.filteredEventsLength > 0 && simpleTimelineCtrl.showMoreBadgeFn()">' +
					'<i class="primary" ng-click="simpleTimelineCtrl.showAll()" data-role="more-click">' +
						'<i class="fa-li fa" ng-class="[simpleTimelineCtrl.getMoreClass(), simpleTimelineCtrl.getBadgeSizeClass()]"></i>' +
					'</i>' +
					'<div class="content-more-badge">&nbsp;</div>' +
				'</li>' +
			'</ul>' +
			'<div class="timeline-filters" ng-if="simpleTimelineCtrl.filteredEventsLength === 0">' +
				'No results' +
			'</div>' +
		'</div>';

	return {
		restrict: 'E',
		scope: {
			events: '=',
			showEventsMax: '=?',
			hideLine: '=?',
			showEndBadge: '=?',
			showMoreBadge: '=?',
			badgeSize: '@?',
			showDateFilter: '=?',
			filters: '=?',
			setDefaultDateFilterRange: '=?'
		},
		bindToController: true,
		controllerAs: 'simpleTimelineCtrl',
		template: template,
		controller: function() {

			var visibleFiltersToggle = false;

			var setDefaultDateRange = function() {
				var today = new Date();
				var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
				var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
				this.startTime = firstDay;
				this.endTime = lastDay;
			}.bind(this);

			if (!angular.isDefined(this.showEventsMax) || this.showEventsMax < 0) {
				this.showEventsMax = -1;
			}

			if (this.setDefaultDateFilterRange === true) {
				setDefaultDateRange();
			}

			this.showAllEventsToggle = false;
			this.showEventsMaxOriginal = this.showEventsMax;

			this.visibleFiltersMax = 3;
			this.visibleFiltersMaxOriginal = this.visibleFiltersMax;
			this.moreFiltersText = 'More...';

			this.action = function(event) {
				var actionFn = $parse(event.action);
				actionFn(event);
			};

			this.showEvent = function(index) {
				return index < this.showEventsMax || this.showEventsMax < 0;
			};

			this.showDownArrow = function() {
				return this.filteredEventsLength > this.showEventsMax && this.showEventsMax > 0;
			};

			this.showAll = function() {
				this.showAllEventsToggle = !this.showAllEventsToggle;

				if (this.showAllEventsToggle) {
					this.showEventsMax = -1;
				} else {
					this.showEventsMax = this.showEventsMaxOriginal;
				}
			};

			this.showMoreBadgeFn = function() {
				return this.showMoreBadge &&
					this.filteredEventsLength > this.showEventsMaxOriginal &&
					this.showEventsMaxOriginal > 0;
			};

			this.showFilter = function(index) {
				if (index < this.visibleFiltersMaxOriginal || this.visibleFiltersMax < 0) {
					return true;
				}

				return false;
			};

			this.showAllFilters = function() {
				visibleFiltersToggle = !visibleFiltersToggle;

				if (visibleFiltersToggle) {
					this.visibleFiltersMax = -1;
					this.moreFiltersText = 'Less...';
				} else {
					this.visibleFiltersMax = this.visibleFiltersMaxOriginal;
					this.moreFiltersText = 'More...';
				}
			};

			this.activeFilterIndex = undefined;

			this.setFilter = function(filter, index) {
				this.filter = filter;
				this.activeFilterIndex = index;
			};

			this.isActive = function(index) {
				return index === this.activeFilterIndex;
			};

			this.getBadgeIconClass = function(event) {
				return event.badgeIconClass;
			};

			this.getBadgeSizeClass = function() {
				// small is default
				if (this.badgeSize) {
					return this.badgeSize + '-badge';
				}
			};

			this.getMoreClass = function() {
				var classes = '';

				if (this.showDownArrow()) {
					classes += 'fa-arrow-circle-o-down';
				} else {
					classes += 'fa-arrow-circle-o-up';
				}

				return classes;
			};
		}
	};
}

simpleTimeline.$inject = ['$filter', '$parse'];
module.directive('simpleTimeline', simpleTimeline);


// Source: src/scripts/common/directives/sortable.js
angular.module('TT-UI.Common.Directives.Sortable', [
	'ui.router',
	'TT-UI.Common.Directives.Pagination'
])

.constant('SORTABLE', {
	CLASS_ASC:  'asc',
	CLASS_DESC: 'desc',

	ORDER_ASC:  'asc',
	ORDER_DESC: 'desc',

	STATE_PARAM_SORT:  'sort',
	STATE_PARAM_ORDER: 'order',

	EVENT_CHANGE: '$sortable.change'
})

.directive('sortable', ['$stateParams', '$state', 'PAGINATION', 'SORTABLE', function($stateParams, $state, PAGINATION, SORTABLE) {
	return {
		restrict: 'C',

		link: function($scope, element, attr) {
			var $rootScope   = $scope.$root,
				currentSort  = $stateParams[SORTABLE.STATE_PARAM_SORT]  || null,
				currentOrder = $stateParams[SORTABLE.STATE_PARAM_ORDER] || null,
				className    = null,
				unbind;

			// Set current sorting
			if (currentSort === attr.sort) {
				switch (currentOrder) {
					case SORTABLE.ORDER_ASC:
						className = SORTABLE.CLASS_ASC;
						break;

					case SORTABLE.CLASS_DESC:
						className = SORTABLE.CLASS_DESC;
						break;
				}

				if (className) {
					element.addClass(className);
				}
			}

			// Watch for changes and remove current sort
			unbind = $rootScope.$on(SORTABLE.EVENT_CHANGE, function(e, sort) {
				if (sort !== attr.sort) {
					element.removeClass(SORTABLE.CLASS_ASC).removeClass(SORTABLE.CLASS_DESC);
				}
			});
			$scope.$on('$destroy', unbind);

			// Change sorting
			element.bind('click', function(e) {
				e.preventDefault();

				var order, params = {};

				if (element.hasClass(SORTABLE.CLASS_ASC)) {
					order = SORTABLE.ORDER_DESC;
					element.addClass(SORTABLE.CLASS_DESC).removeClass(SORTABLE.CLASS_ASC);
				} else {
					order = SORTABLE.ORDER_ASC;
					element.addClass(SORTABLE.CLASS_ASC).removeClass(SORTABLE.CLASS_DESC);
				}

				$rootScope.$emit(SORTABLE.EVENT_CHANGE, attr.sort);

				params[PAGINATION.STATE_PARAM]     = 1;
				params[SORTABLE.STATE_PARAM_SORT]  = attr.sort;
				params[SORTABLE.STATE_PARAM_ORDER] = order;

				params = angular.extend({}, $stateParams, params);

				$state.go($state.current, params);
			});
		}
	};
}]);


// Source: src/scripts/common/directives/spinner-inside.js
angular.module('TT-UI.Common.Directives.SpinnerInside', [
	'ui.router'
])

.constant('SPINNER_INSIDE_EVENTS', {
	SHOW: 'TT-UI.Common.Directives.SpinnerInside.Show',
	HIDE: 'TT-UI.Common.Directives.SpinnerInside.Hide'
})

.constant('SPINNER_INSIDE_CONFIG', {
	DEFAULT_MESSAGE: 'Please wait'
})

.directive('spinnerInside', ['$rootScope', 'SPINNER_INSIDE_EVENTS', 'SPINNER_INSIDE_CONFIG', function($rootScope, SPINNER_INSIDE_EVENTS, SPINNER_INSIDE_CONFIG) {
	return {
		restrict: 'A',
		template: function(element) {
			var spinner = '<div class="spinner-overlay spinner-inside hidden">' +
											'<div class="content">' +
												'<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>' +
												'<span>{{ message }}</span>' +
											'</div>' +
										'</div>';
			element.append(spinner);
			element.addClass('spinner-container');
		},
		link: {
			post: function($scope, element) {
				var unbindEvents = [];
				var children = element.children('div').eq(-1);
				var spinner = angular.element(children);

				$scope.message = SPINNER_INSIDE_CONFIG.DEFAULT_MESSAGE;

				unbindEvents.push($rootScope.$on(SPINNER_INSIDE_EVENTS.SHOW, function(e, args) {
					$scope.message = args && args.message ? args.message : SPINNER_INSIDE_CONFIG.DEFAULT_MESSAGE;
					spinner.removeClass('hidden');
				}));
				unbindEvents.push($rootScope.$on(SPINNER_INSIDE_EVENTS.HIDE, function() {
					spinner.addClass('hidden');
				}));

				$scope.$on('$destroy', function() {
					unbindEvents.forEach(function(unbind) {
						unbind();
					});
				});
			}
		}
	};
}]);


// Source: src/scripts/common/directives/spinner.js
angular.module('TT-UI.Common.Directives.Spinner', [
	'ui.router'
])

.constant('SPINNER_EVENTS', {
	SHOW: 'TT-UI.Common.Directives.Spinner.Show',
	HIDE: 'TT-UI.Common.Directives.Spinner.Hide'
})

.constant('SPINNER_CONFIG', {
	DEFAULT_MESSAGE: 'Please wait'
})

.directive('spinnerOverlay', ['$rootScope', 'SPINNER_EVENTS', 'SPINNER_CONFIG', function($rootScope, SPINNER_EVENTS, SPINNER_CONFIG) {
	return {
		restrict: 'E',
		template:
			'<div ng-show="spinnerOverlayVisible" class="spinner-overlay">' +
				'<div class="content">' +
					'<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>' +
					'<span>{{ message }}</span>' +
				'</div>' +
			'</div>',
		link: function($scope) {
			var unbindEvents = [];

			$scope.spinnerOverlayVisible = false;
			$scope.message = SPINNER_CONFIG.DEFAULT_MESSAGE;

			unbindEvents.push($rootScope.$on(SPINNER_EVENTS.SHOW, function(e, args) {
				$scope.message = args && args.message ?
					args.message :
					SPINNER_CONFIG.DEFAULT_MESSAGE;

				$scope.spinnerOverlayVisible = true;
			}));
			unbindEvents.push($rootScope.$on(SPINNER_EVENTS.HIDE, function() {
				$scope.spinnerOverlayVisible = false;
			}));

			$scope.$on('$destroy', function() {
				unbindEvents.forEach(function(unbind) {
					unbind();
				});
			});
		}
	};
}]);


// Source: src/scripts/common/directives/tabs.js

angular.module('TT-UI.Common.Directives.Tabs', [
	'ui.router',
	'TT-UI.Common.Translate'
])

.directive('tabset', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			viewName: '@'
		},

		controller: ['$scope', '$state', '$timeout', function($scope, $state, $timeout) {
			$scope.templateUrl = '';
			$scope.tabs = [];

			var tabs          = $scope.tabs,
				currentState  = $state.$current,
				stateName     = $state.$current.name,
				parentName    = $state.$current.parent.name,
				autoSelectTab = true,
				controller    = this;

			if (currentState.modal) {
				stateName  = parentName;
				parentName = currentState.parent.parent.name;
			}

			this.selectTab = function(tab, skipChangingState) {
				tabs.forEach(function(tab) {
					tab.selected = false;
				});

				stateName = tab.state;
				tab.selected = true;
				controller.setTabTemplate(tab.templateUrl);

				if (!skipChangingState) {
					$state.go(stateName);
				}
			};

			this.setTabTemplate = function(templateUrl) {
				$scope.templateUrl = templateUrl;
			};

			this.addTab = function(tab) {
				if (stateName === tab.state) {
					controller.selectTab(tab, true);
					autoSelectTab = false;
				}

				tabs.push(tab);
			};

			// Go to state from first tab when loading parent state
			$timeout(function() {
				if (autoSelectTab && tabs.length) {
					controller.selectTab(tabs[0]);
				}
			}, 0);

			// Go to state when changing URI
			var ubound = $scope.$on('$stateChangeSuccess', function(e, state, params, newState) {
				if (state.name === newState.name || state.name === stateName || state.modal) {
					return;
				}

				// Reload state
				var foundTab;

				tabs.some(function(tab) {
					if (tab.state === state.name) {
						foundTab = tab;
						return true;
					}
				});

				controller.selectTab(foundTab || tabs[0], !!foundTab);
			});

			$scope.$on('$destroy', ubound);
		}],

		template:
			'<div class="tabs ui-tabs ui-widget ui-widget-content ui-corner-all">' +
				'<ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" ng-transclude></ul>' +
				'<ui-view></ui-view>' +
			'</div>'
	};
})

.directive('tab', function() {
	return {
		restrict: 'E',
		replace: true,
		require: '^tabset',
		scope: {
			title: '@',
			state: '@',
			templateUrl: '@'
		},

		link: function(scope, element, attrs, tabsetController) {
			tabsetController.addTab(scope);

			scope.select = function() {
				tabsetController.selectTab(scope);
			};
		},

		template:
			'<li class="ui-state-default" ng-class="{\'ui-state-active\': selected}">' +
				'<a href="" ng-click="select()" ng-bind="title | translate"></a>' +
			'</li>'
	};
});


// Source: src/scripts/common/directives/toggle.js
angular.module('TT-UI.Common.Directives.Toggle', [])

.directive('toggle', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		require: '^ngModel',

		scope: {
			ngModel: '=',
			on: '=?'
		},

		link: function($scope, element) {
			$scope.on = angular.isDefined($scope.on) ? $scope.on : false;

			element.find('input[type="checkbox"]').prop('checked', $scope.on);
			$scope.ngModel = $scope.on;
		},

		template: function() {
			var randomStr = function() {
				return Date.now().toString(32) + Math.random().toString(32);
			}, toggleId = 'toggle-' + randomStr();

			return '<div class="toggle-on-off">' +
				'<input type="checkbox" id="' + toggleId + '" ng-model="ngModel" />'  +
				'<label for="' + toggleId + '"></label>' +
			'</div>';
		}
	};
});


// Source: src/scripts/common/errors.js
angular.module('TT-UI.Common.Errors', [
	'ui.router',
	'TT-UI.Common.Routes',
	'TT-UI.Common.Services.FlashMessage',
	'TT-UI.Common.Services.ErrorsInterceptor',
	'TT-UI.Common.ErrorMessageString'
])

.run(['$rootScope', '$log', 'ERRORS_HANDLING', 'FlashMessage', 'createErrorMessageString',
	function($rootScope, $log, ERRORS_HANDLING, FlashMessage, createErrorMessageString) {
	var stateChangeInProgress = false;

	function showFetchErrorPopups(errors){
		angular.forEach(errors, function(error){
			$log.error(error);
			FlashMessage.show('Error', error.description, 'danger');
		});
	}

	function isBackendError(error){
		return angular.isArray(error);
	}

	$rootScope.$on('$stateChangeStart', function(){
		stateChangeInProgress = true;
	});

	$rootScope.$on('$stateChangeSuccess', function(){
		stateChangeInProgress = false;
	});

	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
		stateChangeInProgress = false;

		if (isBackendError(error)){
			return showFetchErrorPopups(error);
		}

		var errorMessageString = createErrorMessageString(error);

		$log.error(errorMessageString);
		FlashMessage.show('Error', errorMessageString, 'danger');
	});

	$rootScope.$on(ERRORS_HANDLING.RESOURCE_FETCH_ERROR_EVENT, function(event, errors) {
		if (stateChangeInProgress){
			return;
		}

		showFetchErrorPopups(errors);
	});
}])
;


// Source: src/scripts/common/filters.js
angular.module('TT-UI.Common.Filters', [
	'TT-UI.Common.Filters.DateFilter',
	'TT-UI.Common.Filters.ObjectFieldFilter',
	'TT-UI.Common.Filters.RegExpFilter'
]);

// Source: src/scripts/common/filters/date-filter.js
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


// Source: src/scripts/common/filters/is-array-filter.js
angular.module('TT-UI.Common.Filters.IsArrayFilter', [])

.filter('isArray', [function() {
	return function(anArray, not) {
		var isArray = angular.isArray(anArray);

		return angular.isUndefined(not) ? isArray : !isArray;
	};
}]);


// Source: src/scripts/common/filters/object-field-filter.js
var module = angular.module('TT-UI.Common.Filters.ObjectFieldFilter', []);

function objectField() {
	return function(input, pattern, sourceField) {
		var filtered = [];

		pattern = (pattern || '').toLowerCase();

		angular.forEach(input, function(item) {
			var value = item[sourceField];

			if (value) {
				value = ('' + value).toLowerCase();

				if (value.indexOf(pattern) >= 0) {
					filtered.push(item);
				}
			}
		});

		return filtered;
	};
}
module.filter(objectField.name, objectField);

// Source: src/scripts/common/filters/reg-exp-filter.js
var module = angular.module('TT-UI.Common.Filters.RegExpFilter', []);

function escape() {
	var pattern = /[\.\?\*\+\^\$\[\]\\(\)\{\}\|\-]/g;
	var replacement = '\\$&';

	function escapeFilter(input) {
		return input.replace(pattern, replacement);
	}

	return escapeFilter;
}
module.filter(escape.name, escape);

// Source: src/scripts/common/helpers/form-helper.js
angular.module('TT-UI.Common.Helpers.Form', [
	'schemaForm',
	'TT-UI.Common.Helpers.XhrHelper',
	'TT-UI.Common.Services.FieldMapping'
])

.constant('FORM_HELPER', {
	DEFAULT_VALUE: 'Y'
})

.service('FormHelper', [
	'$log', '$q', '$parse', 'sfPath', 'XhrHelper', 'FieldMapping', 'FORM_HELPER',
function FormHelper($log, $q, $parse, sfPath, XhrHelper, FieldMapping, FORM_HELPER
) {
	// TODO: Clean-up dependencies
	this.putJsonDeferred  = XhrHelper.putJsonDeferred;
	this.loadJsonDeferred = XhrHelper.loadJsonDeferred;
	this.postJsonDeferred = XhrHelper.postJsonDeferred;

	this.loadMetaInformationDeffered = function(path, uri) {
		return this.loadJsonDeferred(uri).then(function(json) {
			return {
				path: path,
				json: json
			};
		});
	};

	this.loadAllMetaInformation = function(queue) {
		return $q.all(queue).then(function(res) {
			var results = {};

			res.forEach(function(data) {
				results[data.path] = data.json;
			});

			return results;
		});
	};

	this.mergeExtractedMasterData = function(queue) {
		return $q.all(queue).then(function(res) {
			var results = {};

			res.forEach(function(masterData) {
				results[masterData.schema] = masterData.data;
			});

			return results;
		});
	};

	this.populateSchemaWithMasterData = function(schema, masterData, mapping){
		var values = this.extractValuesFromMasterData(masterData, mapping);
		this.applyValuesToSchema(schema, values);
	};

	this.extractValuesFromMasterData = function(masterData, valuesMap) {
		var results = {};
		angular.forEach(valuesMap, function(masterDataJsonPath, formSchemaJsonPath) {
			results[formSchemaJsonPath] = $parse(masterDataJsonPath)(masterData);
		});
		return results;
	};

	this.applyValuesToSchema = function(schema, masterValues) {
		if (!angular.isObject(masterValues) || !angular.isObject(schema.properties)) {
			return;
		}

		angular.forEach(masterValues, function(values, schemaPath) {
			this.iterateMasterInformation(schema, schemaPath, values);
		}, this);
	};

	function getDefaultValueFromMasterData(options, getDefaultValue) {
		var value;

		options.some(function(option) {
			if (option.default === getDefaultValue){
				value = option.code;
			}

			return value;
		});

		return value;
	}

	function setPropertyDefaultValue(property, values) {
		var defaultValue;
		var enm = property['enum'];

		if (angular.isArray(property['enum'])) {
			enm.length = 0;
			enm.push.apply(enm, values);

			defaultValue = getDefaultValueFromMasterData(values, FORM_HELPER.DEFAULT_VALUE);
		}
		else if (angular.isDefined(values.code)) {
			defaultValue = values.code;
		}

		if (angular.isDefined(defaultValue)) {
			property.default = defaultValue;
		}
	}

	this.getDefaultValueFromMasterData = getDefaultValueFromMasterData;

	function getPropertyByKey(property, key, schemaJsonPath) {
		var prop = property[key];

		if (angular.isUndefined(prop)) {
			throw new Error('Can not get property by key "'+key+'" for schema JSON path "'+schemaJsonPath+'"');
		}

		if (prop.type === 'array' && prop.items && angular.isObject(prop.items)) {
			prop = prop.items;
		}

		if (prop.type === 'object' && prop.properties && angular.isObject(prop.properties)) {
			prop = prop.properties;
		}

		return prop;
	}

	this.iterateMasterInformation = function(schema, schemaJsonPath, values) {
		if (angular.isUndefined(values)) {
			throw new Error('Values object for schema "' + schemaJsonPath + '" is not defined');
		}

		var pathArray = sfPath.parse(schemaJsonPath).filter(function(val) {return val;});
		var property = schema.properties;
		var key;

		while ((key = pathArray.shift())) {
			property = getPropertyByKey(property, key, schemaJsonPath);
		}

		setPropertyDefaultValue(property, values);
	};

	this.copyValues = function(valuesMap, data) {
		valuesMap.forEach(function(values) {
			this.fixArrayParse(values.dest, data);

			var sourceValue = $parse(values.source)(data);
			var destValue = $parse(values.dest)(data);

			if (!angular.isUndefined(sourceValue) && !destValue) {
				$parse(values.dest).assign(data, angular.copy(sourceValue));
			}
		}, this);
	};

	this.copyValuesFrom = function(mappings, source, dest) {
		mappings.forEach(function(values) {
			this.fixArrayParse(values.dest, dest);

			var sourceValue = $parse(values.source)(source);
			var destValue = $parse(values.dest)(dest);

			var destinationConditionFailed = values.destinationCondition && !$parse(values.destinationCondition)(dest);
			var sourceConditionFailed = values.sourceCondition && !$parse(values.sourceCondition)(source);

			var conditionsFailing = destinationConditionFailed || sourceConditionFailed;
			var destinationIsNotTouched = !destValue;
			var sourceValueDefined = angular.isDefined(sourceValue);

			if (sourceValueDefined && destinationIsNotTouched && !conditionsFailing) {
				$parse(values.dest).assign(dest, angular.copy(sourceValue));
			}
		}, this);

		return dest;
	};

	this.convertValues = function(mappings, serviceRequest) {
		function itemShouldBeMapped (item) {
			return !item.hasOwnProperty('setBooleanIfExists');
		}

		function isBooleanValue(item) {
			return item.modelType === 'boolean';
		}

		function convertBooleanValue(value) {
			switch (value.toLowerCase()) {
				case 'y':
					return true;
				case 'n':
					return false;
				default:
					return value;
			}
		}

		var data = {};

		mappings
			.filter(itemShouldBeMapped)
			.forEach(function(item) {
				var itemMappings = FieldMapping.extractFields(serviceRequest, item.serverPath, item.modelPath);

				if (!angular.isArray(itemMappings) || !itemMappings.length) {
					return;
				}

				itemMappings.forEach(function(itemMapping) {
					var value = $parse(itemMapping.sourcePath)(serviceRequest);

					if (isBooleanValue(item)) {
						value = convertBooleanValue(value);
					}

					if (value === null) {
						value = '';
					}

					this.fixArrayParse(itemMapping.targetPath, data);

					$parse(itemMapping.targetPath).assign(data, value);

				}, this);

			}, this);

		return data;
	};

	this.fixArrayParse = function(path, data) {
		if (path.match(/\[[0-9]+\]/)) {
			this.assignArray(path, data);
		}
	};

	this.assignArray = function(expression, data) {
		var parts = expression.split(/\[([0-9]+)\]/);
		var partsNum = parts.length;

		if (partsNum === 1) {
			return;
		}

		if (parts[partsNum - 1] === '') {
			parts.pop();
		}

		var isArrayIndex = function(index) {
			return parseInt(index, 10).toString() === index;
		};

		var jsonPath = '';

		parts.forEach(function(part) {
			if (!isArrayIndex(part)) {
				jsonPath += part;
				return;
			}

			var parsed = $parse(jsonPath);

			if (!angular.isArray(parsed(data))) {
				parsed.assign(data, []);
			}

			jsonPath += '[' + part + ']';
		});
	};

	this.enumToTitleMapFromMasterData = function(form, values) {
		var enm = form.schema['enum'];

		enm.length = 0;
		form.titleMap.length = 0;

		if (!form.schema.hasOwnProperty('masterData')) {
			$log.error('Field schema masterData are missing', form.schema, values);
			return;
		}

		form.schema.masterData.forEach(function(opt) {
			var found = this.findObjectByCode(values, opt.code);
			if (angular.isDefined(found)) {
				form.titleMap.push({
					name:  opt.name,
					value: opt.code
				});

				enm.push(opt.code);
			}
		}, this);

		if (!form.required) {
			enm.push(null);
		}
	};

	/**
	 * @deprecated remove when all loaders will be refactored
	 */
	this.enumToTitleMapFromObject = function(form, values) {
		var enm = form.schema['enum'];

		enm.length = 0;
		form.titleMap.length = 0;

		values.forEach(function(opt) {
			form.titleMap.push({
				name:  opt.name,
				value: opt.code
			});

			enm.push(opt.code);
		});

		if (!form.required) {
			enm.push(null);
		}
	};

	this.findObjectByCode = function(array, code) {
		return array.filter(function(obj) {
			return obj.masterCode === code;
		})[0];
	};

	this.triggerFormValidation = function(formCtrl) {
		var removeAngularProperties = function(key) {
			return (key[0] !== '$');
		};

		var removeNoneNgModelProperties = function(key) {
			return formCtrl[key].$name === key;
		};

		var validateFormFields = function(key) {
			var fieldCtrl = formCtrl[key];

			fieldCtrl.$validate();

			if (fieldCtrl.$invalid) {
				fieldCtrl.$setDirty();
			}
		};

		Object.keys(formCtrl)
			.filter(removeAngularProperties)
			.filter(removeNoneNgModelProperties)
			.forEach(validateFormFields);
	};
}]);


// Source: src/scripts/common/helpers/xhr-helper.js
var module = angular.module('TT-UI.Common.Helpers.XhrHelper', []);

function XhrHelper($http, $q) {
	this.putJsonDeferred = function(uri, data) {
		var deferred = $q.defer();

		$http.put(uri, data).success(function(res) {
			deferred.resolve(res);
		}).error(function(res) {
			deferred.reject(res);
		});

		return deferred.promise;
	};

	this.loadJsonDeferred = function(uri) {
		var deferred = $q.defer();

		$http.get(uri).success(function(res) {
			deferred.resolve(res);
		}).error(function(res) {
			deferred.reject(res);
		});

		return deferred.promise;
	};

	this.postJsonDeferred = function(uri, data) {
		var deferred = $q.defer();

		$http.post(uri, data).success(function(res) {
			deferred.resolve(res);
		}).error(function(res) {
			deferred.reject(res);
		});

		return deferred.promise;
	};
}
XhrHelper.$inject = ['$http', '$q'];

module.service(XhrHelper.name, XhrHelper);


// Source: src/scripts/common/module.js
angular.module('TT-UI.Common', [
	'ng',
	'ui.router',
	'angular-storage',
	'TT-UI.Form', // TODO: Remove me when Form components will be fully extracted from Common into Form module
	'TT-UI.Common.Config',
	'TT-UI.Common.States',
	'TT-UI.Common.Errors',
	'TT-UI.Common.Routes',
	'TT-UI.Common.Directives',
	'TT-UI.Common.Filters',
	'TT-UI.Common.Services',
	'TT-UI.Common.Helpers.XhrHelper',
	'TT-UI.Common.Helpers.Form',
	'TT-UI.Common.Translate',
	'TT-UI.Common.AngularStrap',
	'TT-UI.Common.Spread',
	'TT-UI.Common.Tv4'
]);


// Source: src/scripts/common/moment-provider.js
angular.module('TT-UI.Common.MomentProvider', [])
	.provider('moment', function() {
		this.getMoment = function() {
			return window.moment;
		};

		this.$get = function () {
			return this;
		};
});


// Source: src/scripts/common/routes.js
angular.module('TT-UI.Common.Routes', [
	'TT-UI.Config',
	'TT-UI.Common.States'
])

.config(['$stateProvider', '$urlRouterProvider', 'CONFIG', function($stateProvider, $urlRouterProvider) {

	var redirectToHome = function($state, $timeout, CONFIG){
		$timeout(function(){
			$state.go(CONFIG.HOME_STATE);
		});
	};

	redirectToHome.$inject = ['$state', '$timeout', 'CONFIG'];

	$urlRouterProvider.when('', redirectToHome);
	$urlRouterProvider.when('/', redirectToHome);

	$stateProvider
		.state('index', {
			abstract: true,
			url: '/',
			label: ''
		});

}]);


// Source: src/scripts/common/services.js
angular.module('TT-UI.Common.Services', [
	'TT-UI.Common.Services.Api',
	'TT-UI.Common.Services.ModalDialog',
	'TT-UI.Common.Services.ConfirmationDialog',
	'TT-UI.Common.Services.DataObject',
	'TT-UI.Common.Services.FieldMapping',
	'TT-UI.Common.Services.FlashMessage',
	'TT-UI.Common.Services.FormValidator',
	'TT-UI.Common.Services.FormFactory',
	'TT-UI.Common.Services.NotJsonParser',
	'TT-UI.Common.Services.Resource',
	'TT-UI.Common.Services.ErrorsInterceptor',
	'TT-UI.Common.Services.ResourceResponseParser',
	'TT-UI.Common.Services.Rtl'
]);


// Source: src/scripts/common/services/api.js
angular.module('TT-UI.Common.Services.Api', [
	'TT-UI.Config'
])

.factory('Api', ['CONFIG', function(CONFIG) {
	var truncateUrlRegExp = /[\/]?$/;

	var baseUrl = CONFIG.API_URL.replace(truncateUrlRegExp, '') + '/';
	var mockBaseUrl = CONFIG.MOCK_API_URL.replace(truncateUrlRegExp, '') + '/';
	var upcUrl = CONFIG.UPC_API_URL.replace(truncateUrlRegExp, '') + '/';
	var clm360Url = CONFIG.CLM_360_URL.replace(truncateUrlRegExp, '') + '/';
	var clm360ApiUrl = CONFIG.CLM_360_API_URL.replace(truncateUrlRegExp, '') + '/';

	return {
		getUrl: function() {
			return baseUrl;
		},
		getMockUrl: function() {
			return mockBaseUrl;
		},
		getUpcUrl: function() {
			return upcUrl;
		},
		getClm360Url: function() {
			return clm360Url;
		},
		getClm360ApiUrl: function() {
			return clm360ApiUrl;
		}
	};
}]);


// Source: src/scripts/common/services/confirmation-dialog.js
var module = angular.module('TT-UI.Common.Services.ConfirmationDialog', [
	'ui.router',
	'TT-UI.Common.Services.ModalDialog'
]);

function ConfirmationDialog($rootScope, $q, ModalDialog, translateFilter) {
	var __ = translateFilter;
	var defaults = {
		title:   'Confirmation request',
		content: 'Please confirm',
		namespace: 'panel-dialog',
		buttons: [
			{ name:'Confirm', action: confirm },
			{ name:'Cancel',  action: cancel }
		]
	};

	var persistent = false;
	var deferred;
	var dialog = ModalDialog();

	function confirm() {
		deferred.resolve();
		dialog.hide();
	}

	function cancel() {
		deferred.reject();
		dialog.hide();
	}

	$rootScope.$on('$stateChangeStart', function() {
		if (persistent) {
			persistent = false;
			return;
		}
	});

	this.confirm = function(message, title, dialogType, isPersistent, nameSpace) {
		persistent = isPersistent;
		deferred = $q.defer();
		var buttons;

		if(dialogType === 'ok') {
			buttons = [
				{ name: __('Ok'), action: confirm }
			];
		}

		dialog.show({
			title: title     ||  __(defaults.title),
			content: message || __(defaults.message),
			buttons: buttons || defaults.buttons,
			namespace: nameSpace || defaults.namespace
		});

		dialog.on('.hide', function() {
			deferred.reject();
		});

		return deferred.promise;
	};

	this.hide = function() {
		dialog.hide();
	};
}

ConfirmationDialog.$inject = ['$rootScope', '$q', 'ModalDialog', 'translateFilter'];
module.service('ConfirmationDialog', ConfirmationDialog);


// Source: src/scripts/common/services/dataObject.js
angular.module('TT-UI.Common.Services.DataObject', [])
.factory('DataObject', [function(){

	function DataObject(){}
	DataObject.prototype = {
		setData: function(dataObjectData){
			if (dataObjectData){
				angular.extend(this, dataObjectData);
				this.initDataObject();
			}
		},
		initDataObject: function(){
			// override this for some specific initions
		},
		getName: function(){
			return this.name;
		},
		getCode: function(){
			return this.code;
		},
		getDescription: function(){
			return this.description;
		}
	};

	return DataObject;
}])

.factory('DataObjectCollection', function(){
	function DataObjectCollection(){}

	DataObjectCollection.prototype = {
		setData: function(dataObjectCollectionData){
			if (dataObjectCollectionData){
				angular.extend(this, dataObjectCollectionData);
			}
			this.dataObjects = this.initDataObjects();
		},
		initDataObjects: function(){
			// Override this function in every specific case.
			return []; // should return an array of dataObjects
		},
		getDataObjectByName: function(name){
			return this.getDataObjectBy('name', name);
		},
		getDataObjectByCode: function(code){
			return this.getDataObjectBy('code', code);
		},
		getDataObjectBy: function(fieldName, fieldValue){
			for (var i = 0; i < this.dataObjects.length; i++){
				if (this.dataObjects[i][fieldName] === fieldValue){
					return this.dataObjects[i];
				}
			}
			return null;
		},
		getAllDataObjects: function(){
			return this.dataObjects;
		}
	};

	return DataObjectCollection;
});


// Source: src/scripts/common/services/error-message-string.js
angular.module('TT-UI.Common.ErrorMessageString', [])
.factory('createErrorMessageString', ['ErrorsDictionary', '$parse', function(ErrorsDictionary, $parse) {
return function(errorElement) {
    if (angular.isArray($parse('data[0].response.errors.error')(errorElement))) {
      var errorElementsArray = $parse('data[0].response.errors.error')(errorElement);
      var lastArrayElement = errorElementsArray[errorElementsArray.length - 1];
      return ErrorsDictionary.getError(lastArrayElement.desc) || lastArrayElement.desc;
    } else if (typeof(errorElement) === 'object') {
      return ErrorsDictionary.getError(errorElement.statusText) ||
        ErrorsDictionary.getError(errorElement.status) ||
        errorElement.statusText ||
        errorElement.status ||
        'Unknown error';
    } else {
      return ErrorsDictionary.getError(errorElement) || errorElement || 'Unknown error';
    }
  };
}]);

// Source: src/scripts/common/services/errors-interceptor.js
angular.module('TT-UI.Common.Services.ErrorsInterceptor', [])

.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('ErrorsInterceptor');
}])

.constant('ERRORS_HANDLING', {
	ERRORS_PATH: 'response.errors.error',
	DEFAULT_ERROR_DESCRIPTION: 'Unknown Error',
	RESOURCE_FETCH_ERROR_EVENT: 'resourceFetchError'
})

.factory('emitErrorPopupFn', ['$rootScope', 'ERRORS_HANDLING', function($rootScope, ERRORS_HANDLING){
	return function(errors){
		$rootScope.$emit(ERRORS_HANDLING.RESOURCE_FETCH_ERROR_EVENT, errors);
	};
}])

.provider('ErrorsDictionary', function() {
	var errorsDictionary = {};

	this.setDictionary = function(dictionary) {
		errorsDictionary = dictionary.errors || {};
	};

	this.$get = function() {
		function getError(error) {
			return errorsDictionary[error.code] || errorsDictionary[error] || error.desc;
		}

		return {
			getError: getError,
			errorsDictionary: errorsDictionary
		};
	};
})

.factory('parseErrorsFn', ['$parse', '$log', 'ErrorsDictionary', 'ERRORS_HANDLING', function($parse, $log, ErrorsDictionary, ERRORS_HANDLING) {
	function getErrorDescription(error){
		var errorDescription = ErrorsDictionary.getError(error);

		if (angular.isUndefined(error.code) || angular.isUndefined(errorDescription)){
			$log.error('Backend Error Interceptor: Error Code or Error Description is undefined. code: ' + error.code + ', description: ' + errorDescription);
			errorDescription = ERRORS_HANDLING.DEFAULT_ERROR_DESCRIPTION;
		}

		return errorDescription;
	}

	return function(responseData){
		var errors = $parse(ERRORS_HANDLING.ERRORS_PATH)(responseData);

		return angular.isUndefined(errors) ? false : angular.isArray(errors) ?
			errors.map(function(error){
				return {
					code: error.code,
					description: getErrorDescription(error)
				};
			}) : errors;
	};
}])

.factory('ErrorsInterceptor', ['$q', 'parseErrorsFn', 'emitErrorPopupFn', function($q, parseErrorsFn, emitErrorPopupFn) {
	return {
		responseError: function(response) {
			var errors = parseErrorsFn(response && response.data);

			if (!errors) {
				return $q.reject(response);
			}

			emitErrorPopupFn(errors);
			return $q.reject(errors);
		}
	};
}]);


// Source: src/scripts/common/services/field-mapping.js
var module = angular.module('TT-UI.Common.Services.FieldMapping', []);

function FieldMapping($log, $parse) {
	var findNextArray = function(path) {
		if (path) {
			var index = path.indexOf('[]');

			if (index >= 0) {
				return {
					arrayPath: path.substring(0, index),
					remainingPath: path.substring(index + 2)
				};
			}
		}
	};

	var hasArray = function(path) {
		return !!findNextArray(path);
	};

	var fieldExists = function(model, path) {
		return !angular.isUndefined($parse(path)(model));
	};

	var makeArrayPath = function(variablePath, index) {
		return variablePath + '[' + index + ']';
	};

	var extractArrayPaths = function(model, sourcePath, sourcePathPrefix, targetPath, targetPathPrefix, includeEmpty) {
		var paths = [];
		var arrayIndex;

		var src = findNextArray(sourcePath);
		var dst = findNextArray(targetPath);

		if (dst) {
			var array = $parse(sourcePathPrefix + src.arrayPath)(model);
			if (array) {
				for (arrayIndex = 0; arrayIndex < array.length; arrayIndex++) {
					var srcArrayPath = sourcePathPrefix + makeArrayPath(src.arrayPath, arrayIndex);
					var dstArrayPath = targetPathPrefix + makeArrayPath(dst.arrayPath, arrayIndex);
					var subPaths = [];

					if (fieldExists(model, srcArrayPath)) {
						subPaths = extract(model, src.remainingPath, srcArrayPath, dst.remainingPath, dstArrayPath, includeEmpty);
					}

					paths = paths.concat(subPaths);
				}
			}
		} else {
			$log.error('Unsupported array mapping', [].slice.call(arguments));
		}
		return paths;
	};

	var extractSinglePropertyPath = function(model, sourcePath, sourcePathPrefix, targetPath, targetPathPrefix, includeEmpty) {
		var paths = [];
		var sourceFullPath = sourcePathPrefix + sourcePath;
		var targetFullPath = targetPathPrefix + targetPath;

		if (includeEmpty || fieldExists(model, sourceFullPath)) {
			paths.push({
				sourcePath: sourceFullPath,
				targetPath: targetFullPath
			});
		} else {
			$log.debug('Problems with mapping, possible missing value', [].slice.call(arguments));
		}

		return paths;
	};

	var extract = function(model, sourcePath, sourcePathPrefix, targetPath, targetPathPrefix, includeEmpty) {
		includeEmpty = !!includeEmpty;
		return hasArray(sourcePath) ?
			extractArrayPaths(model, sourcePath, sourcePathPrefix, targetPath, targetPathPrefix, includeEmpty) :
			extractSinglePropertyPath(model, sourcePath, sourcePathPrefix, targetPath, targetPathPrefix, includeEmpty);
	};

	return {
		extractFields: function(model, sourcePath, targetPath, includeEmpty) {
			return extract(model, sourcePath, '', targetPath, '', includeEmpty);
		}
	};
}
FieldMapping.$inject = ['$log', '$parse'];

module.factory(FieldMapping.name, FieldMapping);


// Source: src/scripts/common/services/flash-message.js
angular.module('TT-UI.Common.Services.FlashMessage', [
	'ngSanitize',
	'ui.router',
	'TT-UI.Common.AngularStrap',
	'TT-UI.Common.Translate'
])
.service('FlashMessage', ['$rootScope', '$alert', '$document', 'translateFilter', function FlashMessageService($rootScope, $alert, $document, translateFilter) {
	var __ = translateFilter;

	var options = {
		title: '',
		content: '',
		type: 'info',
		placement: 'top',
		container: $document[0].querySelector('alerts-container') ? 'alerts-container' : 'body',
		show: false
	};
	var persistent = false;
	var alerts = [];

	function createAlert(title, content, type){
		var alert = $alert(options);

		angular.extend(alert.$options, {
			title:   __(title),
			content: __(content),
			type:    type
		});

		angular.extend(alert.$scope, alert.$options);

		alerts.push(alert);
		return alert;
	}

	$rootScope.$on('$stateChangeStart', function() {
		if (persistent) {
			persistent = false;
			return;
		}

		this.hide();
	}.bind(this));

	this.show = function(title, content, type, persist) {
		var alert = createAlert(title, content, type);

		persistent = !!persist;

		alert.$promise.then(alert.show);
	};

	this.hide = function(){
		angular.forEach(alerts, function(alert){
			alert.hide();
		});

		alerts.length = 0;
	};
}]);


// Source: src/scripts/common/services/flow.js
angular.module('TT-UI.Common.Services.Flow', ['TT-UI.Common.Helpers.XhrHelper'])

.factory('FlowFactory', ['$log', '$q', 'XhrHelper', function($log, $q, XhrHelper) {

	var FlowFactory = function(entryState, exitState, states) {
		this._entryState = entryState;
		this._exitState  = exitState;
		this._states = states;
	};

	FlowFactory.prototype._isStateVisible = function(stateName) {
		var states = this.getStates();

		if (!states.hasOwnProperty(stateName)) {
			$log.error('Missing state', stateName);
			return false;
		}
		var options = states[stateName];
		var isAvailable =  options === null ? true : options.visible;

		return isAvailable !== false;
	};

	FlowFactory.prototype._findRelativeNextState = function(currentState, relative) {
		var stateNames = Object.keys(this.getStates());

		var num = relative ? 1 : -1;
		var nextState;

		var getNextVisibleState = function(stateName, i, visibleStateNames) {
			var prevState = visibleStateNames[i + num];

			if (!currentState) {
				nextState = stateName;
			} else if (prevState === currentState) {
				nextState = stateName;
			}

			return nextState;
		};

		stateNames
			.filter(this._isStateVisible, this)
			.some(getNextVisibleState, this);

		return nextState;
	};

	FlowFactory.prototype.getNextStepState = function(currentState) {
		return this._findRelativeNextState(currentState, false);
	};

	FlowFactory.prototype.getPrevStepState = function(currentState) {
		return this._findRelativeNextState(currentState, true);
	};

	FlowFactory.prototype.getValidators = function(stateName){
		var states = this.getStates();
		if (!states.hasOwnProperty(stateName)) {
			return $q.reject('Missing state :' + stateName);
		}
		var validatorsUrls = angular.isArray(states[stateName].validators) ? states[stateName].validators : [];
		return $q.all(validatorsUrls.map(XhrHelper.loadJsonDeferred));
	};

	FlowFactory.prototype.getStates = function() {
		return this._states;
	};

	FlowFactory.prototype.getEntryState = function() {
		return this._entryState;
	};

	FlowFactory.prototype.getExitState = function() {
		return this._exitState;
	};

	FlowFactory.prototype.start = function() {
		this.clear();
		return this.getEntryState();
	};

	FlowFactory.prototype.getSubmitState = function() {
		$log.error('isSubmitStep method must be implemented');
	};

	FlowFactory.prototype.clear = function() {
		$log.error('clear method must be implemented');
	};

	FlowFactory.prototype.resume = function() {
		throw new Error('resume method must be implemented');
	};

	FlowFactory.prototype.persist = function() {
		throw new Error('persist method must be implemented');
	};

	FlowFactory.prototype.store = function() {
		throw new Error('store method must be implemented');
	};

	FlowFactory.prototype.submit = function() {
		throw new Error('submit method must be implemented');
	};

	FlowFactory.prototype.cancel = function() {
		throw new Error('cancel method must be implemented');
	};

	FlowFactory.prototype.finish = function () {
		throw new Error('finish method must be implemented');
	};

	FlowFactory.prototype.isValid = function() {
		throw new Error('isValid method must be implemented');
	};

	return FlowFactory;
}]);


// Source: src/scripts/common/services/form-factory.js
var module = angular.module('TT-UI.Common.Services.FormFactory', [
	'schemaForm',
	'TT-UI.Common.Helpers.XhrHelper',
	'TT-UI.Common.Helpers.Form',
	'TT-UI.Common.Spread'
]);

function factory($q, XhrHelper, FormHelper) {
	var FormFactory = function(schemaUrl, structureUrl, optionsUrl) {
		this._schemaUrl = schemaUrl;
		this._structureUrl = structureUrl;
		this._optionsUrl = optionsUrl;

		this._mappings = [];
		this._dictionaries = [];

		this._model = {};
	};

	FormFactory.prototype._loadForm = function() {
		return $q.all([
			this._getSchema(),
			this._getStructure(),
			this._getOptions()
		]);
	};

	function loadXhr(uri) {
		return uri ? XhrHelper.loadJsonDeferred(uri) : null;
	}

	FormFactory.prototype._getStructure = function(){
		return loadXhr(this._structureUrl);
	};

	FormFactory.prototype._getSchema = function(){
		return loadXhr(this._schemaUrl);
	};

	FormFactory.prototype._getOptions = function(){
		return loadXhr(this._optionsUrl);
	};

	FormFactory.prototype.addCopyMappings = function(mappingsUri, model){
		this._mappings.push({
			uri: mappingsUri,
			model: model
		});

		return this;
	};

	FormFactory.prototype.addDictionary = function(mappings, masterData) {
		this._dictionaries.push({
			mappings: mappings,
			masterData: masterData
		});

		return this;
	};

	FormFactory.prototype._runDictionaries = function(form) {
		this._dictionaries.forEach(function(dictionary) {
			FormHelper.populateSchemaWithMasterData(form.schema, dictionary.masterData, dictionary.mappings);
		});

		return form;
	};

	FormFactory.prototype._copyMappings = function(form) {
		var mappingsStorage = this._mappings;

		function iterateMappingsResults(mappings, i) {
			var model = mappingsStorage[i].model;
			FormHelper.copyValuesFrom(mappings, model, form.model);
		}

		var loadMappingsPromise = mappingsStorage
			.map(function(mapping) { return mapping.uri; })
			.map(XhrHelper.loadJsonDeferred);

		return $q.all(loadMappingsPromise)
			.then(function(results) {
				results.forEach(iterateMappingsResults);
				return form;
			});
	};

	FormFactory.prototype.getForm = function(model) {
		function resolveForm(schema, structure, options) {
			return {
				schema: schema,
				structure: structure,
				options: options,
				model: model || {}
			};
		}

		return this._loadForm()
			.then($q.spread(resolveForm))
			.then(this._runDictionaries.bind(this))
			.then(this._copyMappings.bind(this));
	};

	return FormFactory;
}
factory.$inject = ['$q', 'XhrHelper', 'FormHelper'];

module.factory('FormFactory', factory);

// Source: src/scripts/common/services/form-validator.js
angular.module('TT-UI.Common.Services.FormValidator', [
	'schemaForm',
	'TT-UI.Config',
	'TT-UI.Common.Services.Validator'
])

.constant('VALIDATION_EVENTS', {
	VALIDATE:    'schemaFormValidate',
	STATUS:      '$validation',
	IN_PROGRESS: '$validation.inProgress',
	VALID:       '$validation.valid',
	INVALID:     '$validation.invalid'
})

.factory('PathName', function PathName() {
	return {
		get: function(path) {
			return path.join('.').replace(/\.([0-9]+)/, '[$1]');
		}
	};
})

.directive('sfValidate', ['$timeout', 'VALIDATION_EVENTS', function($timeout, VALIDATION_EVENTS) {
	return {
		resrict: 'A',
		require: [
			'^form',
			'^sfSchema'
		],
		priority: 100,
		controller: function($scope) {
			var timer;

			function validate() {
				$scope.$broadcast(VALIDATION_EVENTS.VALIDATE);
			}

			this.fieldNotify = function() {
				$timeout.cancel(timer);
				timer = $timeout(validate, 250);
			};

		}
	};
}])

.directive('schemaName', ['PathName', function(PathName) {
	return {
		restrict: 'A',
		replace: false,
		scope: false,
		priority: 100,
		require: [
			'ngModel',
			'^sfValidate'
		],
		link: function(scope, element, attrs, ctrls) {
			var name = PathName.get(scope.form.key);
			var ngModel = ctrls[0];

			element.attr('name', name);
			scope.formCtrl.$$renameControl(ngModel, name);
		}
	};
}])

.provider('FormValidator', [function FormValidatorProvider() {
	var validators = {};
	var fieldCache = {};

	this.$get = ['$injector', '$rootScope', '$q', 'Validator', 'VALIDATION_EVENTS', 'CONFIG',
	function FormValidator($injector, $rootScope, $q, Validator, VALIDATION_EVENTS, CONFIG
	) {
		var triggerFieldValidator = function(val, field) {
			var validator;

			field.validators.forEach(function(serviceName) {
				validator = validators[serviceName];

				this._runValidation(validator, field);
			}, this);
		};

		var assignForm2Validators = function($scope, formName){
			var unwatch = $scope.$watch(formName, function(form) {
				if (!formName) {
					return;
				}
				unwatch();
				angular.forEach(validators, function(validator) {
					validator.setForm(form);
				});
			});
		};

		var triggerPreValidationEvents = function(validator, fieldIndex){
			var form = validator.getForm();
			if (angular.isDefined(form)){
				$rootScope.$emit(VALIDATION_EVENTS.IN_PROGRESS, form.$name, validator, fieldIndex);
			}
		};

		var triggerPostValidationEvents = function(validator, isValid, message, fieldIndex){
			var form = validator.getForm();
			if (!angular.isDefined(form)) {
				return;
			}
			$rootScope.$emit(VALIDATION_EVENTS.STATUS, form.$name, validator, isValid, message, fieldIndex);

			if (typeof isValid === 'boolean'){
				var eventName = isValid ? VALIDATION_EVENTS.VALID : VALIDATION_EVENTS.INVALID;
				$rootScope.$emit(eventName + '.' + validator.getRuleName(), form.$name, validator, isValid, message, fieldIndex);
			}
		};

		return {

			registerValidators: function($scope, formName, model, validatorsJson) {
				validatorsJson.forEach(function(metaData) {
					if ((CONFIG.DISABLED_VALIDATORS || []).indexOf(metaData.validator) === -1) {
						this.registerValidator(metaData.validator, metaData, model);
					}
				}, this);
				assignForm2Validators($scope, formName);
			},

			unregisterAllValidators: function() {
				Object.keys(validators).forEach(function(serviceName) {
					this.unregisterValidator(serviceName);
				}, this);
			},

			unregisterValidators: function(validatorsJson) {
				validatorsJson.forEach(function(metaData) {
					this.unregisterValidator(metaData.validator);
				}, this);
			},

			registerValidator: function(serviceName, config, model) {
				var ValidatorService = $injector.get(serviceName);

				if (!(ValidatorService.prototype instanceof Validator)) {
					throw new Error('Given service name "' + serviceName + '" is not a Validator instance');
				}

				var validator = new ValidatorService(serviceName, config.name, config.inline)
					.setModel(model)
					.setSchema(config.schema)
					.setFormNotification(config.formNotification)
					.setReportConfig(config.report);

				angular.forEach(validator.getSchema(), function(formPath) {
					if (!angular.isArray(fieldCache[formPath])) {
						fieldCache[formPath] = [];
					}
					else if (-1 !== fieldCache[formPath].indexOf(serviceName)) {
						return;
					}

					fieldCache[formPath].push(serviceName);
				});

				validators[serviceName] = validator;

				return validator;
			},

			unregisterValidator: function(serviceName) {
				if (!validators.hasOwnProperty(serviceName)) {
					throw new Error('Given validator name "' + serviceName + '" is not registered');
				}

				var validator = validators[serviceName];

				delete validators[serviceName];

				angular.forEach(validator.getSchema(), function(formPath) {
					if (!fieldCache.hasOwnProperty(formPath)) {
						return;
					}

					var fieldValidators = fieldCache[formPath];
					var index = fieldValidators.indexOf(serviceName);

					fieldValidators.splice(index, 1);
				});
			},

			registerField: function(field) {
				var fieldName = field.key.reduce(function(name, part, i) {
					return name + (!part ? '[]' : (i ? '.' + part : part));
				});

				if (!fieldCache.hasOwnProperty(fieldName)) {
					return;
				}

				if (!field.hasOwnProperty('onChange')) {
					field.validators = fieldCache[fieldName];
					field.onChange    = angular.bind(this, triggerFieldValidator);
				}
			},

			validateForm: function(formModel, skipInvalidForm) {
				var isValid = this.isFormValid(formModel);

				if (!isValid && skipInvalidForm) {
					return $q.reject();
				}

				var queue = [];

				angular.forEach(validators, function(validator) {
					if (validator.isInline()) {
						return;
					}

					queue.push(this._runValidation(validator));
				}, this);

				return $q.all(queue).then(function(results) {
					return results.every(function(response) {
						return response.status;
					});
				});
			},

			isFormValid: function(formModel) {
				return formModel.$valid;
			},

			_runValidation: function(validator, field) {
				var fieldIndex;

				validator.notifyForm(false);

				if (field) {
					// TODO: Add support for nested arrays
					field.key.some(function(part) {
						if (angular.isNumber(part)) {
							fieldIndex = part;
						}

						return fieldIndex;
					});
				}

				triggerPreValidationEvents(validator, fieldIndex);

				var resolver = function(response) {
					return this._resolveValidation(response, validator, fieldIndex);
				}.bind(this);

				return validator.validate(fieldIndex)
					.then(resolver)
					.catch(resolver);
			},

			_resolveValidation: function(response, validator, fieldIndex) {
				var isValid = response.status;
				var message = response.message || null;

				validator.notifyForm(isValid);
				validator.populateModelWithValidationResult(response, fieldIndex);

				triggerPostValidationEvents(validator, isValid, message, fieldIndex);
				return isValid === false ? $q.reject(response) : response;
			}
		};
	}];
}]);


// Source: src/scripts/common/services/modal-dialog.js
// Base modal dialog, see docs here: http://mgcrea.github.io/angular-strap/#/modals

var module = angular.module('TT-UI.Common.Services.ModalDialog', [
	'ui.router',
	'TT-UI.Common.Config',
	'TT-UI.Common.AngularStrap',
	'TT-UI.Common.Directives'
]);

module.directive('compileHtml', ['$compile', function ($compile) {
	return function(scope, element, attrs) {
		scope.$watch(function(scope) {
				return scope.$eval(attrs.compileHtml);
			},
			function(value) {
				$compile(element.append(value).contents())(scope);
			});
	};
}]);

module.constant('DIALOG_CONFIG', {
	EVENT_PREFIX: 'modalDialog'
});

function ModalDialog($log, $q, $modal, $compile, COMMON_CONFIG, DIALOG_CONFIG) {
	var baseOptions = {
		prefixEvent: DIALOG_CONFIG.EVENT_PREFIX,
		templateUrl: COMMON_CONFIG.BASE_URL + 'views/modal-panel-dialog.tpl.html',
		show: false
	};

	function Modal (){
		this.modal = $modal(baseOptions);
	}

	Modal.prototype.show = function (options) {
		if(!isOptionsValid(options)) {
			return;
		}

		var compileTemplate = function (templateUrl){
			if(!angular.isString(templateUrl)) {
				return;
			}
			return $compile('<div ng-include="\'' + templateUrl + '\'"></div>')(options.scope || this.modal.$scope);
		}.bind(this);

		angular.extend(this.modal.$options, {
			title:     options.title,
			content:   compileTemplate(options.contentUrl) || options.content,
			buttons:   options.buttons || this.modal.$options.buttons,
			footer:    compileTemplate(options.footerUrl),
			namespace: options.namespace || this.modal.$options.namespace
		});

		angular.extend(this.modal.$scope, this.modal.$options);

		return this.modal.$promise.then(this.modal.show.bind(this));
	};

	Modal.prototype.hide = function () {
		this.modal.hide();
	};

	Modal.prototype.on = function (event, callback) {
		this.modal.$scope.$on(DIALOG_CONFIG.EVENT_PREFIX + event, callback);
	};

	function isOptionsValid(options){
		if(!angular.isString(options.title)) {
			$log.error('Title should be a string, but got: ' + options.title);
			return false;
		}

		if(angular.isUndefined(options.content) && angular.isUndefined(options.contentUrl)) {
			$log.error('Content should be provided: ' + options.content + '; ' + options.contentUrl);
			return false;
		}

		return true;
	}

	return function(){
		return new Modal();
	};
}

ModalDialog.$inject = ['$log', '$q', '$modal', '$compile', 'COMMON_CONFIG', 'DIALOG_CONFIG'];
module.factory('ModalDialog', ModalDialog);


// Source: src/scripts/common/services/not-json-parser.js
angular.module('TT-UI.Common.Services.NotJsonParser', [])

.factory('NotJsonParser', function NotJsonParser() {
	var arrayRegExp = /^\[(.*)\]$/m;
	var listRegExp = /,\s*/m;

	return {
		parse: function(data) {
			if (!data && !angular.isString(data) || !data.match(arrayRegExp)) {
				throw new SyntaxError('notJSON Parser: Given data is not a valid notJSON');
			}

			var parsed = data.replace(arrayRegExp, '$1');

			return parsed.split(listRegExp);
		}
	};
});


// Source: src/scripts/common/services/resource-response-parser.js
angular.module('TT-UI.Common.Services.ResourceResponseParser', [])

.constant('RESOURCE_RESPONSE', {
	BODY_PATH: 'response.body'
})

.factory('resourceResponseParserFn', ['$parse', 'RESOURCE_RESPONSE', function($parse, RESOURCE_RESPONSE) {
	var parseResponseBody = function(response){
		return $parse(RESOURCE_RESPONSE.BODY_PATH)(response);
	};

	return function(response) {
		var responseBody = parseResponseBody(response);
		return angular.isDefined(responseBody) ? responseBody : response;
	};
}]);


// Source: src/scripts/common/services/resource.js
angular.module('TT-UI.Common.Services.Resource', [
	'ngResource',
	'TT-UI.Config',
	'TT-UI.Common.Services.Api',
	'TT-UI.Common.Services.ResourceResponseParser',
	'TT-UI.Common.Services.ErrorsInterceptor'
])

.service('ResourceTransform', ['$http', '$log', 'resourceResponseParserFn', 'parseErrorsFn', 'emitErrorPopupFn', function($http, $log, resourceResponseParserFn, parseErrorsFn, emitErrorPopupFn) {
	function forceObjectResponse(data, uri) {
		if (angular.isArray(data)) {
			$log.error('API response error: Expecting object but instead received array', uri, data);

			return data[0];
		}

		return data;
	}

	function forceArrayResponse(data, uri) {
		if (!angular.isArray(data)) {
			$log.error('API response error: Expecting array but instead received object', uri, data);

			return [data];
		}

		return data;
	}

	this.getTransformations = function(isArray, uri) {
		var transformFn = isArray ? forceArrayResponse : forceObjectResponse;

		return $http.defaults.transformResponse
			.concat(resourceResponseParserFn)
			.concat(function(data){
				return transformFn(data, uri);
			});
	};

	this.interceptResponse = function(response) { //parseErrorsFn
		var res = response.resource;
		var data = response.data;
		var result;

		if (angular.isObject(data) && angular.isObject(res) && data instanceof Blob) {
			result = data;
		} else if (angular.isArray(data) && angular.isArray(res)) {
			result = res.map(function(r) {
				return r.hasOwnProperty('$promise') ? r.toJSON() : r;
			});
		} else if (angular.isObject(data) && angular.isObject(res)) {
			result = res.toJSON();
		} else {
			result = data;
		}

		var errors = parseErrorsFn(angular.isArray(result) ? result[0] : result);

		if (errors) {
			emitErrorPopupFn(errors);
		}

		return result;
	};
}])

.factory('ResourceFactory', ['$resource', 'CONFIG', 'ResourceTransform', function($resource, CONFIG, ResourceTransform) {
	return function(uriHost, uriPath, method, isArray, responseType) {
		isArray = !!isArray;
		var uri = uriHost + uriPath;
		var fetchObj = {
			fetch: {
				method: method,
				isArray: isArray,
				transformResponse: ResourceTransform.getTransformations(isArray, uri),
				interceptor: {
					response: ResourceTransform.interceptResponse
				}
			}
		};

		if (responseType) {
			fetchObj.fetch.responseType = responseType;
		}

		return $resource(
			uri,
			{
				tenantId:   CONFIG.API_TENANT_ID,
				apiVersion: CONFIG.API_VERSION
			},
			fetchObj
		);
	};
}])

.factory('AlternateApiVersionResourceFactory', ['$resource', 'CONFIG', 'ResourceTransform', function($resource, CONFIG, ResourceTransform) {
	return function(uriHost, uriPath, method, isArray, responseType) {
		isArray = !!isArray;
		var uri = uriHost + uriPath;
		var fetchObj = {
			fetch: {
				method: method,
				isArray: isArray,
				transformResponse: ResourceTransform.getTransformations(isArray, uri),
				interceptor: {
					response: ResourceTransform.interceptResponse
				}
			}
		};

		if (responseType) {
			fetchObj.fetch.responseType = responseType;
		}

		return $resource(
			uri,
			{
				tenantId:   CONFIG.API_TENANT_ID,
				apiVersion: CONFIG.API_VERSION_ALTERNATE
			},
			fetchObj
		);
	};
}]);


// Source: src/scripts/common/services/rtl.js
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


// Source: src/scripts/common/services/validator.js
var module = angular.module('TT-UI.Common.Services.Validator', [
	'TT-UI.Common.Helpers.Form'
]);

function ValidatorFactory($q, $parse, $log, translateFilter, FormHelper) {

	var __ = translateFilter;

	var createPathWithArrayIndex = function(path, index){
		return path.replace(/\[\]/g, '[' + (angular.isNumber(index) ? index : 0) + ']');
	};

	var Validator = function(ruleName, name, inline) {
		this._ruleName = ruleName;
		this._name = name || ruleName;
		this._inline = !!inline;

		this._schema =  [];
		this._formModel = null;
		this._model = null;
		this._reportConfig = null;
		this._isFormNotification = false;
	};

	Validator.prototype.getRuleName = function() {
		return this._ruleName;
	};

	Validator.prototype.getName = function() {
		return this._name;
	};

	Validator.prototype.isInline = function() {
		return this._inline;
	};

	Validator.prototype.setSchema = function(schema) {
		this._schema = schema;

		return this;
	};

	Validator.prototype.getSchema = function() {
		return this._schema;
	};

	Validator.prototype.setFormNotification = function(isFormNotification) {
		this._isFormNotification = isFormNotification;
		return this;
	};

	Validator.prototype.setForm = function(formModel) {
		this._formModel = formModel;
		return this;
	};

	Validator.prototype.getForm = function() {
		return this._formModel;
	};

	Validator.prototype.setModel = function(model) {
		this._model = model;

		return this;
	};

	Validator.prototype.getModel = function() {
		return this._model;
	};

	Validator.prototype.setReportConfig = function(reportConfig) {
		this._reportConfig = reportConfig;

		return this;
	};

	Validator.prototype.getReportConfig = function() {
		return this._reportConfig;
	};

	Validator.prototype._canPopulateModel = function(){
		return angular.isObject(this.getModel()) && angular.isObject(this.getReportConfig());
	};

	Validator.prototype.populateModelWithValidationResult = function(result, fieldIndex) {
		if (!this._canPopulateModel() || !angular.isObject(result)) {
			return;
		}

		var reportConfig = this.getReportConfig();
		var model = this.getModel();

		var getValue = function(value) {
			return (typeof value === 'boolean') ? (value ? 'PASSED' : 'FAILED') : value;
		};
		if (!angular.isNumber(fieldIndex)){
			fieldIndex = 0;
		}

		angular.forEach(reportConfig, function(validatorPath, modelPath) {
			var path = createPathWithArrayIndex(modelPath, fieldIndex);
			FormHelper.fixArrayParse(path, model);
			$parse(path).assign(model, getValue($parse(validatorPath)(result)));
		});
	};

	Validator.prototype._getLocalData = function(locals) {
		return locals;
	};

	Validator.prototype._collectData = function(locals) {
		var model = this.getModel();
		var localData = this._getLocalData(locals);
		var requestData = {};

		angular.forEach(this.getSchema(), function(jsonPath, requestPath) {
			var value = '';
			if (jsonPath) {
				value = $parse(jsonPath)(model, localData);
			}
			$parse(requestPath).assign(requestData, value ? value.toString() : '');
		});

		return requestData;
	};

	Validator.prototype._collectArrayData = function(fieldIndex, locals) {
		var model = this.getModel();
		var localData = this._getLocalData(locals);
		var requestData = {};

		angular.forEach(this.getSchema(), function(jsonPath, requestPath) {
			var value = '';
			if (jsonPath) {
				value = $parse(createPathWithArrayIndex(jsonPath, fieldIndex))(model, localData);
			}
			$parse(requestPath).assign(requestData, value ? value.toString() : '');
		});

		return requestData;
	};

	Validator.prototype._hasValues = function(requestData) {
		return Object.keys(requestData).every(function(key) {
			var value = requestData[key];
			return angular.isObject(value) ? this._hasValues(value) : value;
		}, this);
	};

	Validator.prototype._getMissingValues = function(requestData) {
		var value;
		var missingValues = [];

		Object.keys(requestData).forEach(function(key) {
			value = requestData[key];

			if (angular.isObject(value)) {
				missingValues.push.apply(missingValues, this._getMissingValues(value));
			} else if (!value) {
				missingValues.push(key);
			}
		}, this);

		return missingValues;
	};

	Validator.prototype._resolver = function(status, message) {
		return $q.when({
			status:  status,
			message: message
		});
	};

	Validator.prototype._rejector = function(status, message) {
		return $q.reject({
			status:  status,
			message: message
		});
	};

	Validator.prototype._apiSuccessResolver = function(response) {
		var isValid = this._isResponseValid(response);
		var message = this._getResponseMessage(response);

		return this._resolver(isValid, message);
	};

	Validator.prototype._apiFailureResolver = function() {
		return this._rejector(false, __('API failed'));
	};

	Validator.prototype._missingValuesResolver = function(missingValues) {
		$log.error('Missing validator values', this.getName(), missingValues);

		return this._rejector(null, __('Missing values ({{valuesNum}})', {
			valuesNum: missingValues.length
		}));
	};

	Validator.prototype.notifyForm = function(validationStatus) {
		if (this._isFormNotification && this._formModel){
			this._formModel.$setValidity(this._ruleName, validationStatus || false);
		}
	};

	Validator.prototype._isResponseValid = function() {
		throw new Error('isResponseValid method was not implemented yet');
	};

	Validator.prototype._getResponseMessage = function() {
		throw new Error('getResponseMessage method was not implemented yet');
	};

	Validator.prototype._buildRequest = function() {
		throw new Error('buildRequest method was not implemented yet');
	};

	Validator.prototype.validate = function() {
		throw new Error('Validate method was not implemented yet');
	};

	return Validator;
}

ValidatorFactory.$inject = ['$q', '$parse', '$log', 'translateFilter', 'FormHelper'];
module.factory('Validator', ValidatorFactory);

// Source: src/scripts/common/spread.js
angular.module('TT-UI.Common.Spread', [])
	.config(['$provide', function ($provide) {
		// Taken from https://github.com/ThomasBurleson/angularjs-FlightDashboard/blob/master/lib/%24QDecorator.js

		// Partial application to build a resolve() function
		var resolveWith = function ($q) {
			return function resolved(val) {
				var dfd = $q.defer();
				dfd.resolve(val);

				return dfd.promise;
			};
		};

		// Register our $log decorator with AngularJS $provider

		$provide.decorator('$q', ['$delegate', function ($delegate) {
			if (angular.isUndefined($delegate.spread)) {
				// Let's add a `spread()` that is very useful
				// when using $q.all()

				$delegate.spread = function (targetFn, scope) {
					return function (results) {
						return targetFn.apply(scope, results);
					};
				};
			}

			if (angular.isUndefined($delegate.resolve)) {
				// Similar to $q.reject(), let's add $q.resolve()
				// to easily make an immediately-resolved promise
				// ... this is useful for mock promise-returning APIs.

				$delegate.resolve = resolveWith($delegate);
			}

			return $delegate;
		}]);
	}]);


// Source: src/scripts/common/states.js
angular.module('TT-UI.Common.States', [
	'ui.router'
])

.config(['$stateProvider', '$uiViewScrollProvider', function($stateProvider, $uiViewScrollProvider) {
	$stateProvider.decorator('parent', function($state, parent) {
		var _parent = parent($state);

		if (!_parent.children) {
			_parent.children = [];
		}

		_parent.children.push($state);

		return _parent;
	});

	$uiViewScrollProvider.useAnchorScroll();
}]);


// Source: src/scripts/common/translate.js
angular.module('TT-UI.Common.Translate', [
	'ngCookies',
	'pascalprecht.translate',
	'TT-UI.Config'
])

.constant('TRANSLATE', {
	URI_REG_EXP: /(?:\?|\&)locale=([a-z]{2})/i,
	STATE_NAME_PREFIX: 'lang-',
	LANG_DIR_DEFAULT:  'ltr',
	LANG_DIR_RTL:      'rtl'
})

.factory('$translateTtStorage', ['$translateLocalStorage', '$window', 'TRANSLATE', function $translateTtStorage($translateLocalStorage, $window, TRANSLATE) {
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
}])

.factory('missingTranslationLog', ['$log', function missingTranslationLog($log) {
	return function(translationId) {
		$log.debug('Missing translation: "' + translationId + '"');
	};
}])

.factory('localePartialLoaderErrorHandler', ['$q', function ($q) {
   return function () {
      return $q.when({});
   };
}])

// Detect available locales
.config(['$translateProvider', '$translatePartialLoaderProvider', '$windowProvider', 'CONFIG', function($translateProvider, $translatePartialLoaderProvider, $windowProvider, CONFIG) {
	$translateProvider.useStorage('$translateTtStorage');

	$translateProvider.useLoader('$translatePartialLoader', {
		urlTemplate: CONFIG.LOCALE_PATH + '{part}-{lang}' + CONFIG.LOCALE_SUFFIX,
		loadFailureHandler: 'localePartialLoaderErrorHandler'
	});

	$translatePartialLoaderProvider.addPart(CONFIG.LOCALE_PREFIX);

	if (CONFIG.LOCALE_OPCO) {
		$translatePartialLoaderProvider.addPart(CONFIG.LOCALE_OPCO);
	}

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
}])
;


// Source: src/scripts/common/tv4.js
var module = angular.module('TT-UI.Common.Tv4', []);

function tv4Config() {
	/* globals tv4: true */

	var formats = {
		'clm-phone-number':  /^(\+\d{1,4}[ \-]?)?[\d\- ]{6,12}$/,
		'clm-email': /^((?:(?:(?:[a-zA-Z0-9][\.\-\+_]?)*)[a-zA-Z0-9])+)\@((?:(?:(?:[a-zA-Z0-9][\.\-_]?){0,62})[a-zA-Z0-9])+)\.([a-zA-Z0-9]{2,6})$/
	};

	Object.keys(formats).forEach(function(key) {
		var pattern = formats[key];

		if (!(pattern instanceof RegExp)) {
			pattern = new RegExp(pattern);
		}

		tv4.addFormat(key, function(data) {
			if (data && !pattern.test(data)) {
				return 'Format error';
			}
		});
	});
}

module.run(tv4Config);

return angular;
})(window, window.angular);