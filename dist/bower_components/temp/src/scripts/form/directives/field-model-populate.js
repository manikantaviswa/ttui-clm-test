'use strict';

var module = angular.module('TT-UI.Form.Directives.FieldModelPopulate', [
	'schemaForm'
]);

function populateTo($log, $injector, $parse, VALIDATION_EVENTS) {

	function populateFields(scope, formCtrl, populateTo, data) {
		data = data || {};

		populateTo.forEach(function(field) {
			field.key = updateFieldKey(scope, field.key);

			var ngModel = formCtrl[field.key];
			var value = $parse(field.source)(data, {
				results: data
			});

			if (angular.isUndefined(ngModel)) {
				$log.error('Populate directive: Can not find field for path "' + field.key + '"');
				return;
			}

			ngModel.$$autopopulated = true;
			ngModel.$setViewValue(value);
			ngModel.$render();
		});

		formCtrl.$commitViewValue();
		scope.$broadcast(VALIDATION_EVENTS.VALIDATE);
	}

	function updateFieldKey(scope, key) {
		var arrayIndex = scope && scope.arrayIndex;
		if (!angular.isNumber(arrayIndex)) {
			return key;
		}
		return key.replace(/\[arrayIndex\]/, '[' + arrayIndex + ']');
	}

	function listener(scope, ngModel, formCtrl, actionFn, populateTo, chainingEnabled) {
		if (chainingEnabled || !ngModel.$$autopopulated) {
			var populateFn = populateFields.bind(populateFields, scope, formCtrl, populateTo);
			actionFn(ngModel.$modelValue, scope.model)
				.then(populateFn)
				.catch(populateFn);
		} else {
			ngModel.$$autopopulated = false;
		}
	}

	function getService(serviceName) {
		if (!$injector.has(serviceName)) {
			return false;
		}

		return $injector.get(serviceName);
	}

	function getServiceFn(service, actionName) {
		var actionFn = service[actionName];

		if (!angular.isFunction(actionFn)) {
			return false;
		}

		return actionFn;
	}

	return {
		require: ['ngModel', '^form'],
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs, ctrls) {
			var ngModel = ctrls[0];
			var formCtrl = ctrls[1];

			var attrName = 'populateTo';
			var form = scope.$eval(attrs[attrName]);
			var populateConfig = form && form.populate;

			if (angular.isUndefined(populateConfig)) {
				return;
			}

			var chainingEnabled = angular.isUndefined(populateConfig.chainingEnabled) || populateConfig.chainingEnabled;
			var service = getService(populateConfig.service);
			var actionFn = getServiceFn(service, populateConfig.action);
			if (!actionFn) {
				$log.error('Populate directive: Service "' + populateConfig.service + '" or action "' + populateConfig.action + '" can not be invoked');
				return;
			}

			ngModel.$viewChangeListeners.push(listener.bind(
				listener, scope, ngModel, formCtrl, actionFn.bind(service), populateConfig.populateTo, chainingEnabled
			));
		}
	};
}
populateTo.$inject = ['$log', '$injector', '$parse', 'VALIDATION_EVENTS'];
module.directive('populateTo', populateTo);
