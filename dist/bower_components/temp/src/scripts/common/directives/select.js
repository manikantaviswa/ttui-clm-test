'use strict';

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
