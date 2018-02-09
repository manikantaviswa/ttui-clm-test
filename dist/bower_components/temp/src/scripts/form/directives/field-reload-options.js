'use strict';

var module = angular.module('TT-UI.Form.Directives.FieldReloadOptions', [
	'schemaForm'
]);

function reloadOptions($log, $injector, $q) {
	function isNgModelInitialized(ngModel) {
		return !(angular.isNumber(ngModel.$modelValue) && isNaN(ngModel.$modelValue));
	}

	function getNgModelName(arrayIndex, ngModelExpName) {
		return ngModelExpName.replace('[arrayIndex]', '[' + arrayIndex + ']');
	}

	function ngModelHasValue(watchedNgModels, ngModelExpName) {
		var ngModel = watchedNgModels[ngModelExpName];
		return angular.isDefined(ngModel.$modelValue);
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

	function collectNgModels(arrayIndex, formCtrl, ngModelExpNames) {
		return ngModelExpNames.reduce(function(ngModels, ngModelExpName) {
			var ngModelName = getNgModelName(arrayIndex, ngModelExpName);
			ngModels[ngModelExpName] = formCtrl[ngModelName];
			return ngModels;
		}, {});
	}

	function collectValues(ngModels) {
		return Object.keys(ngModels).reduce(function(values, ngModelName) {
			var ngModel = ngModels[ngModelName];
			values[ngModelName] = ngModel.$modelValue;
			return values;
		}, {});
	}

	function updateFieldValue(ngModel, value) {
		ngModel.$setViewValue(value);
		ngModel.$commitViewValue();
	}

	function updateFieldValues(form, formModel, ngModel, updateFn, data) {
		data = data || {};

		if (form.type === 'text' || form.type === 'number') {
			updateFieldValue(ngModel, updateFn(ngModel, formModel, data));
		} else {

			updateFn(ngModel, form, data);

			if (angular.isArray(ngModel.$viewValue)) {

				var validOptions = ngModel.$viewValue.filter(function(item) {
					return angular.isArray(form.titleMap) && form.titleMap.some(function(opt) {
						return angular.equals(opt.value, item);
					});
				});

				if (validOptions.length !== ngModel.$viewValue.length) {
					updateFieldValue(ngModel, validOptions);
				}

			} else {
				var hasValue = angular.isArray(form.titleMap) && form.titleMap.some(function(opt) {
					return angular.equals(opt.value, ngModel.$viewValue);
				});

				// Workaround for problem with Angular not updating model when options list have changed
				if (angular.isDefined(ngModel.$modelValue) && !hasValue) {
					updateFieldValue(ngModel);
				}

				// Trigger re-validation when field seems to have proper value
				else if (ngModel.$invalid) {
					ngModel.$validate();
				}

			}

			// Selecting default option from returned data
			if (angular.isUndefined(ngModel.$modelValue)){
				angular.isArray(data) && data.some(function(option, index){
					if (option.default || (index === 0 && form.reload.preselectFirst)){
						updateFieldValue(ngModel, option.code);

						return true;
					}
					return false;
				});
			}
		}
	}

	function disableField(form) {
		form.readonly = true;
	}

	function enableField(form) {
		if (form.type === 'text' || form.type === 'number') {
			form.readonly = false;
		} else {
			form.readonly = form.titleMap.length ? false : true;
		}
	}

	function triggerReload(form, formModel, watchedNgModels, ngModel, fetchFn, updateFn) {
		var values = collectValues(watchedNgModels);
		var updateFieldValuesFn = updateFieldValues.bind(updateFieldValues, form, formModel, ngModel, updateFn);

		disableField(form);

		$q.when(fetchFn(formModel, values))
			.then(updateFieldValuesFn)
			.catch(updateFieldValuesFn)
			.finally(enableField.bind(enableField, form));
	}

	function setFieldViewWatch(watchedNgModels, reloadFn, ngModelExpName) {
		var watchedNgModel = watchedNgModels[ngModelExpName];
		watchedNgModel.$viewChangeListeners.push(reloadFn);
	}

	return {
		require: ['ngModel', '^form'],
		restrict: 'AC',
		priority: 500,
		scope: false,
		link: function postLink(scope, element, attrs, ctrls) {
			var ngModel = ctrls[0];
			var formCtrl = ctrls[1];

			var attrName = 'reloadOptions';
			var form = scope.$eval(attrs[attrName]);
			var reloadConfig = form && form.reload;

			if (angular.isUndefined(reloadConfig)) {
				return;
			}

			var service = getService(reloadConfig.service);
			var fetchFn = getServiceFn(service, reloadConfig.fetchAction);
			var updateFn = getServiceFn(service, reloadConfig.updateAction);

			if (!fetchFn) {
				$log.error('Reload directive: Service "' + reloadConfig.service + '" or fetch function "' + reloadConfig.fetchAction + '" can not be invoked');
				return;
			}

			if (!updateFn) {
				$log.error('Reload directive: Service "' + reloadConfig.service + '" or update function "' + reloadConfig.updateAction + '" can not be invoked');
				return;
			}

			var ngModelExpNames = reloadConfig.watch;
			var unwatch;

			function checkNgModelsAreReady(scope) {
				return ngModelExpNames
					.map(getNgModelName.bind(getNgModelName, scope.arrayIndex))
					.every(function(ngModelName) {
						return formCtrl.hasOwnProperty(ngModelName) && isNgModelInitialized(formCtrl[ngModelName]);
					});
			}

			function assignWatchesToNgModels(hasFields) {
				if (!hasFields) {
					return;
				}
				unwatch();

				var watchedNgModels = collectNgModels(scope.arrayIndex, formCtrl, ngModelExpNames);
				var triggerReloadFn = triggerReload.bind(triggerReload, form, scope.model, watchedNgModels, ngModel, fetchFn.bind(service), updateFn.bind(service));

				if (ngModelExpNames.every(ngModelHasValue.bind(ngModelHasValue, watchedNgModels))) {
					triggerReloadFn();
				}

				ngModelExpNames.forEach(
					setFieldViewWatch.bind(setFieldViewWatch, watchedNgModels, triggerReloadFn)
				);
			}

			unwatch = scope.$watch(checkNgModelsAreReady, assignWatchesToNgModels);
		}
	};
}
reloadOptions.$injector = ['$log', '$injector', '$q'];
module.directive('reloadOptions', reloadOptions);
