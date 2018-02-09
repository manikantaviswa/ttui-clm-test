'use strict';

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
