'use strict';

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
