'use strict';

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
