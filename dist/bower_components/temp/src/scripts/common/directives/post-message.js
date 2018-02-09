'use strict';

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
