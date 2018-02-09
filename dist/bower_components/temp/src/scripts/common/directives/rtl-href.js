'use strict';

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
