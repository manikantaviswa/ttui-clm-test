'use strict';

var module = angular.module('TT-UI.Form.Directives.FieldModelAutopopulate', [
	'schemaForm',
	'TT-UI.Common.Filters.RegExpFilter'
]);

function autopopulateTo($log, escapeFilter) {
	var arrayItemRegExp = /\[\]/;

	var indexSubstitute = '%%index%%';
	var arrayIndexSubstitute = '\\[[0-9]+\\]';

	function getNgModel(formCtrl, ngModelName) {
		var ngModel = formCtrl && getNestedModel(formCtrl, ngModelName);

		if (angular.isUndefined(ngModel) || angular.isUndefined(ngModel.$name)) {
			$log.warn('Autopopulate: Missing "' + ngModelName + '" ngModel field');
		}

		return ngModel;
	}

	function isNgModelInitialized(ngModel) {
		return !(angular.isNumber(ngModel.$modelValue) && isNaN(ngModel.$modelValue));
	}

	function getNestedModel(formCtrl, ngModelName) {
		if (formCtrl && angular.isUndefined(formCtrl[ngModelName]) && ngModelName.match(/\./)) {
			var splited = ngModelName.split('.');
			var formName = splited[0];

			return getNestedModel(formCtrl[formName], splited.slice(1).join('.'));
		}

		return formCtrl && formCtrl[ngModelName];
	}

	function isNgModelNameAnArray(ngModelName) {
		return arrayItemRegExp.test(ngModelName);
	}

	function createNgModelNamesGetter(formCtrl, ngModelName) {
		var regExp = escapeFilter(ngModelName.replace(arrayItemRegExp, indexSubstitute));
		var ngModelRegExp = new RegExp('^' + regExp.replace(indexSubstitute, arrayIndexSubstitute) + '$');

		return function() {
			return Object.keys(formCtrl)
				.filter(isAngularPropertyName)
				.filter(function(ngModelName) {
					return ngModelRegExp.test(ngModelName);
				});
		};
	}

	function isAngularPropertyName(prop) {
		return prop[0] !== '$';
	}

	function syncTargetField(formCtrl, targetNgModelName, sourcePrevViewValue, value) {
		var targetNgModel = getNgModel(formCtrl, targetNgModelName);

		if (!targetNgModel) {
			return;
		}

		if (isTargetFieldInSync(targetNgModel, sourcePrevViewValue)) {
			updateTargetField(targetNgModel, angular.copy(value));
		}

		return value;
	}

	function isTargetFieldInSync(targetNgModel, sourcePrevViewValue){
		var value = targetNgModel.$viewValue;

		if (targetNgModel.$touched){
			return false;
		} else {
			return isFieldEmpty(value) || angular.equals(value, sourcePrevViewValue.value);
		}
	}

	function isFieldEmpty(fieldValue){
		return angular.isUndefined(fieldValue) || fieldValue === null;
	}

	function updateTargetField(targetNgModel, value){
		targetNgModel.$setViewValue(value);
		targetNgModel.$commitViewValue();
		targetNgModel.$render();
	}

	function syncAllTargetFields(formCtrl, targetNgModelName, sourcePrevViewValue, value) {
		var getNgModelNamesFn = createNgModelNamesGetter(formCtrl, targetNgModelName);

		getNgModelNamesFn().forEach(function(ngModelName) {
			syncTargetField(formCtrl, ngModelName, sourcePrevViewValue, value);
		});

		return value;
	}

	function getPopulateFn(formCtrl, targetNgModelName, sourcePrevViewValue) {
		return isNgModelNameAnArray(targetNgModelName) ?
			syncAllTargetFields.bind(syncAllTargetFields, formCtrl, targetNgModelName, sourcePrevViewValue) :
			syncTargetField.bind(syncTargetField, formCtrl, targetNgModelName, sourcePrevViewValue);
	}

	function getSourceViewValue(sourceNgModel) {
		return {
			value: sourceNgModel.$viewValue
		};
	}

	function initNgModelPopulation(formCtrl, sourceNgModel, scope, targetNgModelName) {
		var sourcePrevViewValue = getSourceViewValue(sourceNgModel);
		var populateFn = getPopulateFn(formCtrl, targetNgModelName, sourcePrevViewValue);

		return scope.$watch(function(){
			return sourceNgModel.$modelValue;
		}, function(value){
			if (angular.isUndefined(value)){
				return;
			}

			populateFn(sourceNgModel.$viewValue);
			sourcePrevViewValue.value = sourceNgModel.$$lastCommittedViewValue;
		});
	}

	function getRootForm(formCtrl) {
		while (angular.isDefined(formCtrl.$$parentForm) && angular.isDefined(formCtrl.$$parentForm.$name)) {
			formCtrl = formCtrl.$$parentForm;
		}

		return formCtrl;
	}

	return {
		require: ['ngModel', '^form'],
		restrict: 'A',
		priority: 500,
		scope: false,
		link: function postLink(scope, element, attrs, ctrls) {
			var sourceNgModel = ctrls[0];
			var formCtrl = getRootForm(ctrls[1]);

			var attrName = 'autopopulateTo';
			var form = scope.$eval(attrs[attrName]);
			var targetNgModelNames = form && form.autopopulateTo;

			if (!angular.isArray(targetNgModelNames)) {
				return;
			}

			var unwatch;
			var unwatchOnDestroy = [];

			function assignWatchesToNgModels() {
				unwatch();

				targetNgModelNames.forEach(function(targetNgModelName){
					var watcher = initNgModelPopulation(formCtrl, sourceNgModel, scope, targetNgModelName);
					unwatchOnDestroy.push(watcher);
				});
			}

			unwatch = scope.$watch(function() {
				return isNgModelInitialized(sourceNgModel);
			}, assignWatchesToNgModels);

			scope.$on('$destroy', function(){
				unwatchOnDestroy.forEach(function(watcher){
					watcher();
				});
			});
		}
	};
}
autopopulateTo.$inject = ['$log', 'escapeFilter'];

module.directive('autopopulateTo', autopopulateTo);
