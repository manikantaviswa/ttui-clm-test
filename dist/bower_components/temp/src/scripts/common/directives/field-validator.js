'use strict';

var module = angular.module('TT-UI.Common.Directives.FieldValidator', [
	'TT-UI.FieldValidator.Config',
	'TT-UI.Common.Translate'
]);

function fieldValidator($parse, $q, $timeout, $log, FIELD_VALIDATOR_CONFIG, translateFilter) {
	var __ = translateFilter;

	return {
		restrict: 'A',
		require: 'ngModel',
		link: function($scope, element, attrs, ctrl) {
			var validation = $parse('form.schema.validation')($scope);

			if(!validation) {
				return;
			}

			var isStringValidation = angular.isString(validation);

			if(!isStringValidation && !angular.isArray(validation))  {
				$log.error('Wrong validation type: "' + validation + '"');
				return;
			}

			makeValidationList(validation, isStringValidation).forEach(function(validatorName){
				applyValidation ($scope, ctrl, validatorName);
			});
		}
	};

	function applyValidation ($scope, ctrl, validatorName){
		var basePath = $parse(validatorName)(FIELD_VALIDATOR_CONFIG);

		if(!basePath) {
			$log.error('Missing validator: "' + validatorName + '"');
			return;
		}

		var switcher = $parse(validatorName + '.switch')(FIELD_VALIDATOR_CONFIG);
		if(!angular.isString(switcher)) {
			updateSchema($scope, ctrl, validatorName, basePath);
		} else {
			switcher = updateSwitcher($scope, switcher);

			$scope.$watch('model.' + switcher, function(value){
				if(value){
					basePath = $parse(validatorName + '["' + value + '"]')(FIELD_VALIDATOR_CONFIG);
				} else {
					basePath = $parse(validatorName)(FIELD_VALIDATOR_CONFIG);
				}

				updateSchema($scope, ctrl, validatorName, basePath);
				ctrl.$$parseAndValidate();
			});
		}
	}

	function makeValidationList (validation, isStringValidation){
		if(isStringValidation) {
			return [validation];
		}

		return validation;
	}

	function updateSwitcher ($scope, switcher){
		return switcher.replace('arrayIndex', $scope.arrayIndex);
	}

	function removeValidator ($scope, ctrl, validatorName){
		delete ctrl.$asyncValidators[validatorName];
		$parse('form.validationMessage' + '["' + validatorName + '"]').assign($scope, undefined);
	}

	function updateSchema ($scope, ctrl, validatorName, basePath ){
		var newMessages = {};
		var oldMessage = $parse('form.validationMessage')($scope);
		var message = $parse('errorMessage')(basePath);

		if(angular.isObject(oldMessage)) {
			angular.extend(newMessages, oldMessage);
		} else {
			newMessages.default = oldMessage;
		}

		var pattern;
		var patternName = $parse('pattern')(basePath);

		if(!patternName){
			removeValidator ($scope, ctrl, validatorName);
			return;
		}

		// If pattern is not regExp but validatorName, take the regExp from config using this validatorName
		if(angular.isString(patternName)){
			pattern = $parse(patternName + '.pattern')(FIELD_VALIDATOR_CONFIG);
			message = message || $parse(patternName + '.errorMessage')(FIELD_VALIDATOR_CONFIG);
		} else {
			pattern = patternName;
		}

		if(!pattern) {
			$log.error('Missing validation pattern for: "' + patternName + '"');
			return;
		}

		newMessages[validatorName] = __(message);
		$parse('form.validationMessage').assign($scope, newMessages);

		ctrl.$validators[validatorName] = function(modelValue, viewValue) {
			if (!ctrl.$isEmpty(modelValue) && angular.isString(viewValue)) {
				return (pattern && angular.isFunction(pattern.test) && pattern.test(viewValue));
			}
			return true;
		};
	}
}

fieldValidator.$inject = ['$parse', '$q', '$timeout', '$log', 'FIELD_VALIDATOR_CONFIG', 'translateFilter'];
module.directive('fieldValidator', fieldValidator);
