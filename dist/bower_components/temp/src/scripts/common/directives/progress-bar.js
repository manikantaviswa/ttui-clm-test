'use strict';

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
