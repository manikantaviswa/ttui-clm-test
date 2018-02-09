describe('Service: FormValidator', function() {
	'use strict';

	// instantiate service
	var $compile;
	var $q;
	var $rootScope;
	var $scope;
	var $provide;
	var FormValidator;
	var PathName;
	var Validator;
	var $timeout;
	var VALIDATION_EVENTS;
	var CONFIG;

	var formCtrl = jasmine.createSpyObj('formCtrl', ['$$renameControl']);

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Services.FormValidator');

		angular.mock.module(function(_$provide_) {
			$provide  = _$provide_;
		});

		angular.mock.inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			$compile =  $injector.get('$compile');
			$q =  $injector.get('$q');
			$timeout = $injector.get('$timeout');

			FormValidator =  $injector.get('FormValidator');
			Validator =  $injector.get('Validator');
			PathName =  $injector.get('PathName');
			VALIDATION_EVENTS = $injector.get('VALIDATION_EVENTS');
			CONFIG = $injector.get('CONFIG');
		});
	});

	describe('sf-validate directive', function(){

		it('should broadcast validation event only when $timeout has happen', function() {
			// given
			spyOn($scope,'$broadcast');
			var html = $compile('<form sf-validate></form>')($scope)[0];
			var ctrl = angular.element(html).controller('sfValidate');

			// when
			ctrl.fieldNotify();
			expect($scope.$broadcast).not.toHaveBeenCalledWith(VALIDATION_EVENTS.VALIDATE);
			$timeout.flush();

			// then
			expect(VALIDATION_EVENTS.VALIDATE).toEqual(jasmine.any(String));
			expect($scope.$broadcast).toHaveBeenCalledWith(VALIDATION_EVENTS.VALIDATE);
		});

	});

	it('should check if FormValidator provider exists', function() {
		expect(!!FormValidator).toBe(true);
		expect(FormValidator).toEqual(jasmine.any(Object));
	});

	it('should check if PathName service exists', function() {
		expect(!!PathName).toBe(true);
		expect(PathName).toEqual(jasmine.any(Object));
	});

	it('should rename field name using "schema-name" directive', function() {
		// given
		$scope.form = {
			key: [
				'foo', 'bar'
			]
		};
		$scope.formCtrl = formCtrl;

		var html = $compile('<form sf-validate><input ng-model="foo" schema-name></form>')($scope);

		// when
		$scope.$digest();

		// then
		expect(html.children().attr('name')).toEqual('foo.bar');
	});

	describe('FormValidator service', function() {
		var validatorName, FooValidator;

		beforeEach(function() {
			validatorName = 'FooValidator';
			FooValidator = function() {};
			FooValidator.prototype = Object.create(Validator.prototype);
			FooValidator.prototype.constructor = FooValidator;
		});

		it('should try register a new validator without exception', function() {
			// given
			$provide.value(validatorName, FooValidator);
			var config = {
				name: 'test',
				inline: null,
				schema: {}
			};

			// when
			var fn = function() {
				FormValidator.registerValidator(validatorName, config);
			};

			// then
			expect(fn).not.toThrow();
		});

		it('should not register a function and throw an exception', function() {
			// given
			$provide.value(validatorName, function() {});
			var config = {
				name: 'test',
				inline: null,
				schema: {}
			};

			// when
			var fn = function() {
				FormValidator.registerValidator(validatorName, config);
			};

			// then
			expect(fn).toThrow();
		});

		it('should register new validator and return instance', function() {
			// given
			$provide.value(validatorName, FooValidator);
			var config = {
				name: 'test',
				inline: null,
				schema: {}
			};

			// when
			var validator = FormValidator.registerValidator(validatorName, config);

			// then
			expect(validator).toEqual(jasmine.any(Validator));
		});

		it('should unregister a validator without exception', function() {
			// given
			$provide.value(validatorName, FooValidator);
			var config = {
				name: 'test',
				inline: null,
				schema: {}
			};
			FormValidator.registerValidator(validatorName, config);

			// when
			var fn = function() {
				FormValidator.unregisterValidator(validatorName);
			};

			// then
			expect(fn).not.toThrow();
		});

		it('should register new validator with reportConfig when it is provided', function() {
			// given
			$provide.value(validatorName, FooValidator);
			var model = {};
			var validatorConfig = {
				name: 'test',
				validator: validatorName,
				inline: null,
				schema: {},
				report: {
					status : 'test.test'
				}
			};

			// when
			var validator = FormValidator.registerValidator(validatorName, validatorConfig, model);

			// then
			expect(validator).toEqual(jasmine.any(Validator));
			expect(validator._canPopulateModel()).toBe(true);
		});

		it('should invoke populateModelWithValidationResult when validation be resolved', function() {
			// given
			$provide.value(validatorName, FooValidator);
			var model = {};
			var validationResult = {
				status : true,
				message: 'test'
			};

			var validatorConfig = {
				name: 'test',
				validator: validatorName,
				inline: null,
				schema: {},
				report: {
					status : 'test.test'
				}
			};


			var validator = FormValidator.registerValidator(validatorName, validatorConfig, model);
			spyOn(validator, 'getForm').and.returnValue({$name:'fooName'});
			spyOn(validator, 'validate').and.returnValue($q.when(validationResult));
			spyOn(validator, 'populateModelWithValidationResult');

			// when
			FormValidator._runValidation(validator);
			$rootScope.$digest();

			// then
			expect(validator.populateModelWithValidationResult).toHaveBeenCalled();
			expect(validator.populateModelWithValidationResult.calls.mostRecent().args[0]).toEqual(validationResult);
		});

		it('should invoke populateModelWithValidationResult when validation be resolved with false', function() {
			// given
			$provide.value(validatorName, FooValidator);
			var validatorConfig = {
				name: 'test',
				validator: validatorName,
				inline: null,
				schema: {},
				report: {
					status : 'test.test'
				}
			};

			var model = {};
			var validationResult = {
				status : false,
				message: 'test'
			};

			var validator = FormValidator.registerValidator(validatorName,validatorConfig, model);
			spyOn(validator, 'getForm').and.returnValue({$name:'fooName'});
			spyOn(validator, 'validate').and.returnValue($q.when(validationResult));
			spyOn(validator, 'populateModelWithValidationResult');

			// when
			FormValidator._runValidation(validator);
			$rootScope.$digest();

			// then
			expect(validator.populateModelWithValidationResult).toHaveBeenCalled();
			expect(validator.populateModelWithValidationResult.calls.mostRecent().args[0]).toEqual(validationResult);
		});

		it('should invoke populateModelWithValidationResult when validation be reject', function() {
			// given
			$provide.value(validatorName, FooValidator);
			var schema = {};
			var model = {};
			var name = 'test';
			var inline = null;
			var reportConfig = {
				status : 'test.test'
			};
			var validationResult = {status: false, message: 'Validation failed'};

			var validator = FormValidator.registerValidator(validatorName, name, schema, inline, model, reportConfig);
			spyOn(validator, 'getForm').and.returnValue({$name:'fooName'});
			spyOn(validator, 'validate').and.returnValue($q.reject(validationResult));
			spyOn(validator, 'populateModelWithValidationResult');

			// when
			FormValidator._runValidation(validator);
			$rootScope.$digest();

			// then
			expect(validator.populateModelWithValidationResult).toHaveBeenCalled();
			expect(validator.populateModelWithValidationResult.calls.mostRecent().args[0]).toEqual(validationResult);
		});

		it('should not unregister missing validator and throw exception', function() {
			// given

			// when
			var fn = function() {
				FormValidator.unregisterValidator(validatorName);
			};

			// then
			expect(fn).toThrow();
		});

		it('should not register same validator to same field twice', function() {
			// given
			$provide.value(validatorName, FooValidator);
			var model = {};
			var faleValidatorConfig = {
				name: 'test',
				validator: validatorName,
				schema: {
					'foo.req': 'a.b.c'
				}
			};

			var fakeField = {
				key: ['a', 'b', 'c']
			};

			// when
			FormValidator.registerValidator(validatorName, faleValidatorConfig, model);
			FormValidator.registerValidator(validatorName, faleValidatorConfig, model);
			FormValidator.registerField(fakeField);

			// then
			var fieldValidators = fakeField.validators;
			expect(fieldValidators).toContain('FooValidator');
			expect(fieldValidators.length).toEqual(1);
		});

		it('should not register disabled validator', function() {
			// given
			spyOn(FormValidator, 'registerValidator');
			$provide.value(validatorName, FooValidator);
			var fakeValidatorConfig = {
				validator: validatorName
			};
			CONFIG.DISABLED_VALIDATORS = [validatorName];

			// when
			FormValidator.registerValidators($scope, 'FormName', {}, [fakeValidatorConfig]);

			// then
			expect(FormValidator.registerValidator).not.toHaveBeenCalled();
		});
	});

	describe('FormValidator form notification', function() {

		var form;
		var $scope;
		var validatorServiceName = 'BooValidator';
		var BooValidator;
		var validatorConfig = {
			name: 'Test Check',
			validator: validatorServiceName,
			inline: false,
			schema: {
				'customerType.masterCode': 'profileDetails.customerType.masterCode'
			}
		};

		var registerValidators = function(form, validatorConfig){
			var model = {};
			FormValidator.registerValidators($scope, form.$name, model, [validatorConfig]);
			$scope[form.$name] = form;
			$rootScope.$digest();
		};

		var invalidResponse = function(){
			return $q.when({
				status: false,
				message: 'test'
			});
		};
		var validResponse = function(){
			return $q.when({
				status: true,
				message: 'test'
			});
		};

		beforeEach(function () {
			BooValidator = function(){
				Validator.apply(this, arguments);
			};
			BooValidator.prototype = Object.create(Validator.prototype);
			BooValidator.prototype.constructor = BooValidator;

			$provide.value(validatorServiceName, BooValidator);
			$scope = $rootScope.$new();

			form = {
				$name: 'FormName',
				$setValidity: jasmine.createSpy('$setValidity')
			};
			form.$setValidity.calls.reset();
		});

		it('should not notify form when form  is not provided', function () {
			// given
			var config = angular.extend({}, validatorConfig, {
				formNotification: true
			});
			BooValidator.prototype.validate = invalidResponse;

			FormValidator.registerValidators($scope, form.$name, {}, [config]);
			$scope[form.$name] = undefined;
			$rootScope.$digest();

			// when
			FormValidator.validateForm(form);
			$rootScope.$digest();

			// then
			expect(form.$setValidity).not.toHaveBeenCalled();
		});

		it('should notify form when form notification provided', function () {
			// given
			var config = angular.extend({}, validatorConfig, {
				formNotification: true
			});

			BooValidator.prototype.validate = invalidResponse;
			registerValidators(form, config);

			// when
			FormValidator.validateForm(form);
			$rootScope.$digest();

			// then
			expect(form.$setValidity).toHaveBeenCalled();
		});

		it('should not notify form when form notification is not provided', function () {
			// given
			var config = angular.extend({}, validatorConfig, {
				formNotification: true
			});
			delete(config.formNotification);

			BooValidator.prototype.validate = invalidResponse;
			registerValidators(form, config);

			// when
			FormValidator.validateForm(form);
			$rootScope.$digest();

			// then
			expect(form.$setValidity).not.toHaveBeenCalled();
		});

		it('should notify form when validation passed', function () {
			// given
			var config = angular.extend({}, validatorConfig, {
				formNotification: true
			});

			BooValidator.prototype.validate = validResponse;
			registerValidators(form, config);

			// when
			FormValidator.validateForm(form);
			$rootScope.$digest();

			// then
			var isValid = true;
			expect(form.$setValidity.calls.mostRecent().args).toEqual([validatorServiceName, isValid]);
		});

		it('should notify form when validation failed', function () {
			// given
			var config = angular.extend({}, validatorConfig, {
				formNotification: true
			});

			BooValidator.prototype.validate = invalidResponse;
			registerValidators(form, config);

			// when
			FormValidator.validateForm(form);
			$rootScope.$digest();

			// then
			var isValid = false;
			expect(form.$setValidity.calls.mostRecent().args).toEqual([validatorServiceName, isValid]);
		});

		it('should notify form when validation rejected', function () {
			// given
			var config = angular.extend({}, validatorConfig, {
				formNotification: true
			});

			BooValidator.prototype.validate = function () {
				return $q.reject({});
			};
			registerValidators(form, config);

			// when
			FormValidator.validateForm(form);
			$rootScope.$digest();

			// then
			var isValid = false;
			expect(form.$setValidity.calls.mostRecent().args).toEqual([validatorServiceName, isValid]);
		});

		it('should emit validation in progress event when validation has been started', function () {
			// given
			spyOn($rootScope, '$emit');
			BooValidator.prototype.validate = function () {
				return $q.reject({});
			};
			registerValidators(form, validatorConfig);

			// when
			FormValidator.validateForm(form);
			$rootScope.$digest();

			// then
			expect($rootScope.$emit).toHaveBeenCalled();
			expect($rootScope.$emit.calls.first().args[0]).toEqual(VALIDATION_EVENTS.IN_PROGRESS);
			expect($rootScope.$emit.calls.first().args[1]).toEqual(form.$name);
		});

		it('should emit validation INVALID event when validation has failed', function () {
			// given
			spyOn($rootScope, '$emit');
			BooValidator.prototype.validate = invalidResponse;
			registerValidators(form, validatorConfig);

			// when
			FormValidator.validateForm(form);
			$rootScope.$digest();

			// then
			expect($rootScope.$emit).toHaveBeenCalled();
			expect($rootScope.$emit.calls.mostRecent().args[0]).toEqual(VALIDATION_EVENTS.INVALID + '.' + validatorServiceName);
		});

		it('should emit validation VALID event when validation has passed', function () {
			// given
			spyOn($rootScope, '$emit');
			BooValidator.prototype.validate = validResponse;
			registerValidators(form, validatorConfig);

			// when
			FormValidator.validateForm(form);
			$rootScope.$digest();

			// then
			expect($rootScope.$emit).toHaveBeenCalled();
			expect($rootScope.$emit.calls.mostRecent().args[0]).toEqual(VALIDATION_EVENTS.VALID + '.' + validatorServiceName);
		});

	});
});
