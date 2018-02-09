'use strict';

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
