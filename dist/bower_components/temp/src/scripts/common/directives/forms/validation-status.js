'use strict';

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
