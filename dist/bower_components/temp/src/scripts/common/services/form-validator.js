'use strict';

angular.module('TT-UI.Common.Services.FormValidator', [
	'schemaForm',
	'TT-UI.Config',
	'TT-UI.Common.Services.Validator'
])

.constant('VALIDATION_EVENTS', {
	VALIDATE:    'schemaFormValidate',
	STATUS:      '$validation',
	IN_PROGRESS: '$validation.inProgress',
	VALID:       '$validation.valid',
	INVALID:     '$validation.invalid'
})

.factory('PathName', function PathName() {
	return {
		get: function(path) {
			return path.join('.').replace(/\.([0-9]+)/, '[$1]');
		}
	};
})

.directive('sfValidate', ['$timeout', 'VALIDATION_EVENTS', function($timeout, VALIDATION_EVENTS) {
	return {
		resrict: 'A',
		require: [
			'^form',
			'^sfSchema'
		],
		priority: 100,
		controller: function($scope) {
			var timer;

			function validate() {
				$scope.$broadcast(VALIDATION_EVENTS.VALIDATE);
			}

			this.fieldNotify = function() {
				$timeout.cancel(timer);
				timer = $timeout(validate, 250);
			};

		}
	};
}])

.directive('schemaName', ['PathName', function(PathName) {
	return {
		restrict: 'A',
		replace: false,
		scope: false,
		priority: 100,
		require: [
			'ngModel',
			'^sfValidate'
		],
		link: function(scope, element, attrs, ctrls) {
			var name = PathName.get(scope.form.key);
			var ngModel = ctrls[0];

			element.attr('name', name);
			scope.formCtrl.$$renameControl(ngModel, name);
		}
	};
}])

.provider('FormValidator', [function FormValidatorProvider() {
	var validators = {};
	var fieldCache = {};

	this.$get = ['$injector', '$rootScope', '$q', 'Validator', 'VALIDATION_EVENTS', 'CONFIG',
	function FormValidator($injector, $rootScope, $q, Validator, VALIDATION_EVENTS, CONFIG
	) {
		var triggerFieldValidator = function(val, field) {
			var validator;

			field.validators.forEach(function(serviceName) {
				validator = validators[serviceName];

				this._runValidation(validator, field);
			}, this);
		};

		var assignForm2Validators = function($scope, formName){
			var unwatch = $scope.$watch(formName, function(form) {
				if (!formName) {
					return;
				}
				unwatch();
				angular.forEach(validators, function(validator) {
					validator.setForm(form);
				});
			});
		};

		var triggerPreValidationEvents = function(validator, fieldIndex){
			var form = validator.getForm();
			if (angular.isDefined(form)){
				$rootScope.$emit(VALIDATION_EVENTS.IN_PROGRESS, form.$name, validator, fieldIndex);
			}
		};

		var triggerPostValidationEvents = function(validator, isValid, message, fieldIndex){
			var form = validator.getForm();
			if (!angular.isDefined(form)) {
				return;
			}
			$rootScope.$emit(VALIDATION_EVENTS.STATUS, form.$name, validator, isValid, message, fieldIndex);

			if (typeof isValid === 'boolean'){
				var eventName = isValid ? VALIDATION_EVENTS.VALID : VALIDATION_EVENTS.INVALID;
				$rootScope.$emit(eventName + '.' + validator.getRuleName(), form.$name, validator, isValid, message, fieldIndex);
			}
		};

		return {

			registerValidators: function($scope, formName, model, validatorsJson) {
				validatorsJson.forEach(function(metaData) {
					if ((CONFIG.DISABLED_VALIDATORS || []).indexOf(metaData.validator) === -1) {
						this.registerValidator(metaData.validator, metaData, model);
					}
				}, this);
				assignForm2Validators($scope, formName);
			},

			unregisterAllValidators: function() {
				Object.keys(validators).forEach(function(serviceName) {
					this.unregisterValidator(serviceName);
				}, this);
			},

			unregisterValidators: function(validatorsJson) {
				validatorsJson.forEach(function(metaData) {
					this.unregisterValidator(metaData.validator);
				}, this);
			},

			registerValidator: function(serviceName, config, model) {
				var ValidatorService = $injector.get(serviceName);

				if (!(ValidatorService.prototype instanceof Validator)) {
					throw new Error('Given service name "' + serviceName + '" is not a Validator instance');
				}

				var validator = new ValidatorService(serviceName, config.name, config.inline)
					.setModel(model)
					.setSchema(config.schema)
					.setFormNotification(config.formNotification)
					.setReportConfig(config.report);

				angular.forEach(validator.getSchema(), function(formPath) {
					if (!angular.isArray(fieldCache[formPath])) {
						fieldCache[formPath] = [];
					}
					else if (-1 !== fieldCache[formPath].indexOf(serviceName)) {
						return;
					}

					fieldCache[formPath].push(serviceName);
				});

				validators[serviceName] = validator;

				return validator;
			},

			unregisterValidator: function(serviceName) {
				if (!validators.hasOwnProperty(serviceName)) {
					throw new Error('Given validator name "' + serviceName + '" is not registered');
				}

				var validator = validators[serviceName];

				delete validators[serviceName];

				angular.forEach(validator.getSchema(), function(formPath) {
					if (!fieldCache.hasOwnProperty(formPath)) {
						return;
					}

					var fieldValidators = fieldCache[formPath];
					var index = fieldValidators.indexOf(serviceName);

					fieldValidators.splice(index, 1);
				});
			},

			registerField: function(field) {
				var fieldName = field.key.reduce(function(name, part, i) {
					return name + (!part ? '[]' : (i ? '.' + part : part));
				});

				if (!fieldCache.hasOwnProperty(fieldName)) {
					return;
				}

				if (!field.hasOwnProperty('onChange')) {
					field.validators = fieldCache[fieldName];
					field.onChange    = angular.bind(this, triggerFieldValidator);
				}
			},

			validateForm: function(formModel, skipInvalidForm) {
				var isValid = this.isFormValid(formModel);

				if (!isValid && skipInvalidForm) {
					return $q.reject();
				}

				var queue = [];

				angular.forEach(validators, function(validator) {
					if (validator.isInline()) {
						return;
					}

					queue.push(this._runValidation(validator));
				}, this);

				return $q.all(queue).then(function(results) {
					return results.every(function(response) {
						return response.status;
					});
				});
			},

			isFormValid: function(formModel) {
				return formModel.$valid;
			},

			_runValidation: function(validator, field) {
				var fieldIndex;

				validator.notifyForm(false);

				if (field) {
					// TODO: Add support for nested arrays
					field.key.some(function(part) {
						if (angular.isNumber(part)) {
							fieldIndex = part;
						}

						return fieldIndex;
					});
				}

				triggerPreValidationEvents(validator, fieldIndex);

				var resolver = function(response) {
					return this._resolveValidation(response, validator, fieldIndex);
				}.bind(this);

				return validator.validate(fieldIndex)
					.then(resolver)
					.catch(resolver);
			},

			_resolveValidation: function(response, validator, fieldIndex) {
				var isValid = response.status;
				var message = response.message || null;

				validator.notifyForm(isValid);
				validator.populateModelWithValidationResult(response, fieldIndex);

				triggerPostValidationEvents(validator, isValid, message, fieldIndex);
				return isValid === false ? $q.reject(response) : response;
			}
		};
	}];
}]);
