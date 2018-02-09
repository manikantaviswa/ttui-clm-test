describe('Service: Validator', function() {
	'use strict';

	var $rootScope;
	var $parse;
	var $log;
	var Validator;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Services.Validator');

		angular.mock.inject(function($injector) {
			$parse = $injector.get('$parse');
			$rootScope = $injector.get('$rootScope');
			$log = $injector.get('$log');
			Validator = $injector.get('Validator');
		});
	});

	it('should check if Validator module exists', function() {
		expect(!!Validator).toBe(true);
		expect(typeof Validator).toEqual('function');
	});

	it('should return validator rule name', function() {
		// given
		var ruleName = 'FooValidator';
		var validator = new Validator(ruleName);

		// when
		var results = validator.getRuleName();

		// then
		expect(results).toEqual(ruleName);
	});

	it('should return validator name', function() {
		// given
		var ruleName = 'FooValidator';
		var name = 'Foo Checker';
		var validator = new Validator(ruleName, name);

		// when
		var results = validator.getName();

		// then
		expect(results).toEqual(name);
	});

	it('should check if validator is inline', function() {
		// given
		var ruleName = 'FooValidator';
		var name = 'Foo Checker';
		var inline = false;
		var validator = new Validator(ruleName, name, inline);

		// when
		var results = validator.isInline();

		// then
		expect(results).toEqual(inline);
	});

	describe('initialize', function() {
		var validator;
		beforeEach(function() {
			validator = new Validator();
		});

		it('should check setting and getting schema', function() {
			// given
			var schema = {
				foo: 'bar'
			};

			// when
			var results = validator.setSchema(schema);

			// then
			expect(results).toBe(validator);
			expect(validator.getSchema()).toBe(schema);
		});

		it('should check setting and getting form', function() {
			// given
			var form = {
				foo: 'bar'
			};

			// when
			var results = validator.setForm(form);

			// then
			expect(results).toBe(validator);
			expect(validator.getForm()).toBe(form);
		});

		it('should check setting and getting model', function() {
			// given
			var model = {
				foo: 'bar'
			};

			// when
			var results = validator.setModel(model);

			// then
			expect(results).toBe(validator);
			expect(validator.getModel()).toBe(model);
		});

		it('should populate model value with array on the path ', function(){
			// given
			var report = {
				'validation.fooStatusCheck[].status': 'status'
			};
			var model = {
				foo : 'fuzz'
			};
			validator.setReportConfig(report).setModel(model);
			var validationResult = {
				status : true
			};
			var index = 0;

			//when
			validator.populateModelWithValidationResult(validationResult, index);

			//then
			expect($parse('validation.fooStatusCheck')(model)).toEqual(jasmine.any(Array));
			expect($parse('validation.fooStatusCheck[0].status')(model)).toEqual('PASSED');
		});


		it('should populate model with success validation status ', function(){
			// given
			var report = {
				'validation.fooStatusCheck': 'status'
			};
			var model = {
				foo : 'bar'
			};
			validator.setReportConfig(report).setModel(model);
			var validationResult = {
				status : true
			};

			//when
			validator.populateModelWithValidationResult(validationResult);

			//then
			expect($parse('validation.fooStatusCheck')(model)).toEqual('PASSED');
		});

		it('should populate model with failed validation status ', function(){
			// given
			var report = {
				'validation.fooStatusCheck': 'status'
			};
			var model = {
				foo : 'bar'
			};
			validator.setReportConfig(report).setModel(model);
			var validationResult = {
				status : false
			};

			//when
			validator.populateModelWithValidationResult(validationResult);

			//then
			expect($parse('validation.fooStatusCheck')(model)).toEqual('FAILED');
		});

		it('should populate model with validation message ', function(){
			// given
			var report = {
				'validation.fooStatusCheck': 'status',
				'test.test': 'message'
			};
			var model = {
				foo : 'bar'
			};
			validator.setReportConfig(report).setModel(model);
			var validationResult = {
				status : false,
				message: 'AlaMaKota'
			};

			//when
			validator.populateModelWithValidationResult(validationResult);

			//then
			expect($parse('validation.fooStatusCheck')(model)).toEqual('FAILED');
			expect($parse('test.test')(model)).toEqual(validationResult.message);
		});

		it('should not populate model with validation message when message path is not provided', function(){
			// given
			var report = {
				'validation.fooStatusCheck': 'status'
			};
			var model = {
				foo : 'bar'
			};
			validator.setReportConfig(report).setModel(model);
			var validationResult = {
				status : false,
				message: 'AlaMaKota'
			};

			//when
			validator.populateModelWithValidationResult(validationResult);

			//then
			expect($parse('validation.fooStatusCheck')(model)).toBeDefined();
			expect(model).not.toEqual(validationResult.message);
		});

		it('should not populate model with validation message when status path is not provided', function(){
			// given
			var report = {
				'validation.fooStatusCheck': 'message'
			};
			var model = {
				foo : 'bar'
			};
			validator.setReportConfig(report).setModel(model);
			var validationResult = {
				status : false,
				message: 'AlaMaKota'
			};

			//when
			validator.populateModelWithValidationResult(validationResult);

			//then
			expect($parse('validation.fooStatusCheck')(model)).toBeDefined();
			expect(model).not.toEqual(validationResult.status);
			expect(model).not.toEqual('FAILED');
			expect(model).not.toEqual('PASSED');
		});

		it('should not populate model when validation status is not a boolean type ', function(){
			// given
			var report = {
				'validation.fooStatusCheck': 'status'
			};
			var model = {
				foo : 'bar'
			};
			validator.setReportConfig(report).setModel(model);

			//when
			validator.populateModelWithValidationResult(null);

			//then
			expect($parse('validation.fooStatusCheck')(model)).not.toBeDefined();
		});

		it('should be able to populate model when model and report path are provided', function(){
			// given
			var report = {
				'validation.fooStatusCheck': 'status'
			};
			var model = {
				foo : 'bar'
			};
			validator.setReportConfig(report).setModel(model);

			//then
			expect(validator._canPopulateModel()).toBe(true);
		});

		it('should not be able to populate model when report path is not  be provided', function(){
			// given
			var model = {
				foo : 'bar'
			};
			validator.setModel(model);

			//then
			expect(validator._canPopulateModel()).toBe(false);
		});

		describe('collect from flat list', function() {
			it('should collect data from model', function() {
				// given
				var value = 'some value';
				var model = {
					foo: {
						bar: value
					}
				};
				var schema = {
					'reqFooBarVal': 'foo.bar'
				};
				spyOn(validator, 'getModel').and.returnValue(model);
				spyOn(validator, 'getSchema').and.returnValue(schema);

				// when
				var results = validator._collectData();

				// then
				expect(results).toEqual(jasmine.any(Object));
				expect(results.reqFooBarVal).toBeDefined();
				expect(results.reqFooBarVal).toEqual(value);
			});

			it('should collect data from model and locals', function() {
				// given
				var localValue = 'local foo value';
				var value = 'bar value';
				var model = {modelBar: value};
				var locals = {localFoo: localValue};
				var schema = {
					'reqLocalFoo':  'localFoo',
					'reqFooBarVal': 'modelBar'
				};
				spyOn(validator, 'getModel').and.returnValue(model);
				spyOn(validator, 'getSchema').and.returnValue(schema);

				// when
				var results = validator._collectData(locals);

				// then
				expect(results).toEqual(jasmine.any(Object));
				expect(results.reqFooBarVal).toBeDefined();
				expect(results.reqLocalFoo).toBeDefined();
				expect(results.reqFooBarVal).toEqual(value);
				expect(results.reqLocalFoo).toEqual(localValue);
			});

			it('should collect missing data as empty strings', function() {
				// given
				var model = {};
				var schema = {
					'req.foo': 'model.foo',
					'req.bar':  'model.bar'
				};
				spyOn(validator, 'getModel').and.returnValue(model);
				spyOn(validator, 'getSchema').and.returnValue(schema);

				// when
				var results = validator._collectData();

				// then
				expect(results).toEqual(jasmine.any(Object));
				expect(results.req).toBeDefined();
				expect(results.req.foo).toBeDefined();
				expect(results.req.bar).toBeDefined();

				expect(results.req.foo).toEqual('');
				expect(results.req.bar).toEqual('');
			});
		});

		describe('collect from array list', function() {
			it('should collect data from array model', function() {
				// given
				var index = 2;
				var value = 'some value';
				var model = {
					foo: [
						{},
						{},
						{
							bar: value
						}
					]
				};
				var schema = {
					'reqFooBarVal': 'foo[].bar'
				};
				spyOn(validator, 'getModel').and.returnValue(model);
				spyOn(validator, 'getSchema').and.returnValue(schema);

				// when
				var results = validator._collectArrayData(index);

				// then
				expect(results).toEqual(jasmine.any(Object));
				expect(results.reqFooBarVal).toBeDefined();
				expect(results.reqFooBarVal).toEqual(value);
			});

			it('should collect data from array model and locals', function() {
				// given
				var index = 1;
				var localValue = 'local foo value';
				var value = 'bar value';
				var model = {modelList: [{}, {bar: value}]};
				var locals = {localFoo: localValue};
				var schema = {
					'reqLocalFoo':  'localFoo',
					'reqFooBarVal': 'modelList[1].bar'
				};
				spyOn(validator, 'getModel').and.returnValue(model);
				spyOn(validator, 'getSchema').and.returnValue(schema);

				// when
				var results = validator._collectArrayData(index, locals);

				// then
				expect(results).toEqual(jasmine.any(Object));
				expect(results.reqFooBarVal).toBeDefined();
				expect(results.reqLocalFoo).toBeDefined();
				expect(results.reqFooBarVal).toEqual(value);
				expect(results.reqLocalFoo).toEqual(localValue);
			});

			it('should collect missing data as empty strings', function() {
				// given
				var index = 4;
				var model = {};
				var schema = {
					'req.foo': 'model[].foo',
					'req.bar':  'model[].bar'
				};
				spyOn(validator, 'getModel').and.returnValue(model);
				spyOn(validator, 'getSchema').and.returnValue(schema);

				// when
				var results = validator._collectArrayData(index);

				// then
				expect(results).toEqual(jasmine.any(Object));
				expect(results.req).toBeDefined();
				expect(results.req.foo).toBeDefined();
				expect(results.req.bar).toBeDefined();

				expect(results.req.foo).toEqual('');
				expect(results.req.bar).toEqual('');
			});
		});

		it('should check if request data has all values', function() {
			// given
			var values = {
				foo: 'bar',
				list: [
					{
						key: 'key value'
					},
					{
						key: 'key value'
					}
				]
			};

			// when
			var results = validator._hasValues(values);

			// then
			expect(results).toBe(true);
		});

		it('should check if request has at least one empty value', function() {
			// given
			var values = {
				foo: 'bar',
				list: [
					{
						key: 'key value'
					},
					{
						key: ''
					},
					{
						key: 'key value'
					}
				]
			};

			// when
			var results = validator._hasValues(values);

			// then
			expect(results).toBe(false);
		});

		it('should return name of missing value', function() {
			// given
			var values = {
				foo: {
					bar: ''
				}
			};

			// when
			var results = validator._getMissingValues(values);

			// then
			expect(results.length).toEqual(1);
			expect(results).toContain('bar');
		});

		it('should return names of all missing value', function() {
			// given
			var values = {
				foo: {
					bar: '',
					filled: 'test',
					empty: ''
				}
			};

			// when
			var results = validator._getMissingValues(values);

			// then
			expect(results.length).toEqual(2);
			expect(results).toContain('bar');
			expect(results).toContain('empty');
		});

		it('should throw error for not implemented validate method', function() {
			expect(validator.validate).toThrow();
		});

		it('should throw error for not implemented _isResponseValid method', function() {
			expect(validator._isResponseValid).toThrow();
		});

		it('should throw error for not implemented _getResponseMessage method', function() {
			expect(validator._getResponseMessage).toThrow();
		});

		it('should throw error for not implemented _buildRequest method', function() {
			expect(validator._buildRequest).toThrow();
		});

		it('should resolve validator with success status', function() {
			// given
			var response = {
				foo: 'bar'
			};
			var message = 'Foo msg';
			spyOn(validator, '_isResponseValid').and.returnValue(true);
			spyOn(validator, '_getResponseMessage').and.returnValue(message);

			// when
			var results;
			validator._apiSuccessResolver(response).then(function(response) {
				results = response;
			});
			$rootScope.$digest();

			// then
			expect(validator._isResponseValid).toHaveBeenCalledWith(response);
			expect(validator._getResponseMessage).toHaveBeenCalledWith(response);

			expect(results).toBeDefined();
			expect(results.status).toBeTruthy();
			expect(results.message).toEqual(message);
		});

		it('should reject validator with failure status', function() {
			// given
			// when
			var results;
			validator._apiFailureResolver().catch(function(response) {
				results = response;
			});
			$rootScope.$digest();

			// then
			expect(results).toBeDefined();
			expect(results.status).toBeFalsy();
			expect(results.message).toEqual(jasmine.any(String));
		});

		it('should reject validator with failure status when values are missing', function() {
			// given
			var missingValues = ['foo', 'bar'];

			// when
			var results;
			validator._missingValuesResolver(missingValues).catch(function(response) {
				results = response;
			});
			$rootScope.$digest();

			// then
			expect(results).toBeDefined();
			expect(results.status).toBeNull();
			expect(results.message).toEqual(jasmine.any(String));
			expect($log.error.logs.length).toBeGreaterThan(0);
		});

	});

	describe('form notification', function(){

		var form;

		beforeEach(function(){
			form = jasmine.createSpyObj('form', ['$setValidity']);
			form.$setValidity.calls.reset();
		});

		it('should notify form when notification is set', function(){
			// given
			var isValid = false;
			var ruleName = 'ABC';
			var validator = new Validator(ruleName).setFormNotification(true).setForm(form);

			// when
			validator.notifyForm(isValid);

			// then
			expect(form.$setValidity).toHaveBeenCalledWith(ruleName, isValid);
		});

		it('should not notify form when notification is set on false', function(){
			// given
			var isValid = false;
			var ruleName = 'BBBB';
			var validator = new Validator(ruleName).setFormNotification(false).setForm(form);

			// when
			validator.notifyForm(isValid);

			// then
			expect(form.$setValidity).not.toHaveBeenCalled();
		});

		it('should not notify form is not assigned', function(){
			// given
			var isValid = false;
			var ruleName = 'ZZZZ';
			var validator = new Validator(ruleName).setFormNotification(true);

			// when
			validator.notifyForm(isValid);

			// then
			expect(form.$setValidity).not.toHaveBeenCalled();
		});

	});
});