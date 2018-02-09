describe('Helper: Form ', function() {
	'use strict';

	var FormHelper;
	var $parse;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Helpers.Form');

		angular.mock.inject(function($injector) {
			FormHelper = $injector.get('FormHelper');
			$parse = $injector.get('$parse');
		});
	});

	describe('Master Data iterator', function() {
		it('should iterate over master data and  set enums from array', function() {
			// given
			var schema = {
				$schema: 'http://json-schema.org/draft-04/schema#',
				type: 'object',
				properties: {
					fooObject: {
						type: 'object',
						properties: {
							mooField: {
								type: 'string',
								enum: []
							}
						}
					}
				}
			};
			var schemaJsonPath = 'fooObject.mooField';
			var values = [
				'foo', 'boo', 'moo', 'goo'
			];

			// when
			FormHelper.iterateMasterInformation(schema, schemaJsonPath, values);

			// then
			var mooField = $parse('properties.fooObject.properties.mooField')(schema);
			expect(mooField['enum']).toEqual(values);
		});

		it('should iterate over master data and set default enums from array', function() {
			// given
			var schema = {
				$schema: 'http://json-schema.org/draft-04/schema#',
				type: 'object',
				properties: {
					fooObject: {
						type: 'object',
						properties: {
							mooField: {
								type: 'string',
								enum: []
							}
						}
					}
				}
			};
			var schemaJsonPath = 'fooObject.mooField';
			var values = [
				{
					code: 'foo value'
				},
				{
					code: 'boo value',
					default: 'Y'
				}
			];

			// when
			FormHelper.iterateMasterInformation(schema, schemaJsonPath, values);

			// then
			var mooField = $parse('properties.fooObject.properties.mooField')(schema);
			expect(mooField.default).toEqual('boo value');
		});


		it('should iterate over master data and set default string value', function() {
			// given
			var schema = {
				$schema: 'http://json-schema.org/draft-04/schema#',
				type: 'object',
				properties: {
					fooObject: {
						type: 'object',
						properties: {
							mooField: {
								type: 'string'
							}
						}
					}
				}
			};
			var schemaJsonPath = 'fooObject.mooField';
			var values = {
				code: 'moo value'
			};


			// when
			FormHelper.iterateMasterInformation(schema, schemaJsonPath, values);

			// then
			var mooField = $parse('properties.fooObject.properties.mooField')(schema);
			expect(mooField.default).toEqual('moo value');
		});

		it('should throw exception when schema JSON path is wrong', function() {
			// given
			var schema = {
				$schema: 'http://json-schema.org/draft-04/schema#',
				type: 'object',
				properties: {
					fooObject: {
						type: 'object',
						properties: {
							mooField: {
								type: 'string'
							}
						}
					}
				}
			};
			var schemaJsonPath = 'fooObject.notExistingField';

			// when
			function fn() {
				FormHelper.iterateMasterInformation(schema, schemaJsonPath, jasmine.any(Array));
			}

			// then
			expect(fn).toThrowError('Can not get property by key "notExistingField" for schema JSON path "fooObject.notExistingField"');
		});

		it('should throw exception when schema JSON path is wrong', function() {
			// given
			var schemaJsonPath = 'fooObject.notExistingField';

			// when
			function fn() {
				FormHelper.iterateMasterInformation(jasmine.any(Object), schemaJsonPath);
			}

			// then
			expect(fn).toThrowError('Values object for schema "fooObject.notExistingField" is not defined');
		});
	});

	describe('populate form schema with master data', function(){

		it('should populate object', function(){
			// given
			var schema = {};
			var masterData = {};
			var mapping = {'gender.masterCode': 'masterData.genders.gender'};

			var propertySchema = {
				title : 'Gender',
				enum : []
			};
			var dictionary = [
				{code:'F', name:'Female'},
				{code:'M', name:'Male'}
			];
			$parse('masterData.genders.gender').assign(masterData, dictionary);
			$parse('properties.gender.properties.masterCode').assign(schema, propertySchema);
			$parse('properties.gender.type').assign(schema, 'object');

			// when
			FormHelper.populateSchemaWithMasterData(schema, masterData, mapping);

			// then
			expect(schema.properties.gender.properties.masterCode.enum).toEqual(dictionary);
		});

		it('should populate array', function(){
			// given
			var schema = {};
			var masterData = {};
			var mapping = {'contactDetails.contactType': 'masterData.types.type'};

			var propertySchema = {
				title: 'Contact Person',
				type: 'array',
				minItems: 1,
				items: {
					type: 'object',
					properties: {
						contactType: {
							title: 'Contact Type',
							description: 'Select',
							type: 'string',
							enum: []
						}
					}
				}
			};

			var dictionary = [
				{code:'F', name:'Female'},
				{code:'M', name:'Male'}
			];
			$parse('masterData.types.type').assign(masterData, dictionary);
			$parse('properties.contactDetails').assign(schema, propertySchema);

			// when
			FormHelper.populateSchemaWithMasterData(schema, masterData, mapping);

			// then
			expect(schema.properties.contactDetails.items.properties.contactType.enum).toEqual(dictionary);
		});

		it('should not change schema when mapping is empty', function(){
			// given
			var schema = {};
			var masterData = {};
			var mapping = {};

			var propertySchema = {
				title : 'Gender',
				enum : []
			};
			var dictionary = [
				{code:'F', name:'Female'},
				{code:'M', name:'Male'}
			];
			$parse('masterData.genders.gender').assign(masterData, dictionary);
			$parse('properties.gender.properties.masterCode').assign(schema, propertySchema);
			$parse('properties.gender.type').assign(schema, 'object');

			// when
			FormHelper.populateSchemaWithMasterData(schema, masterData, mapping);

			// then
			expect(schema.properties.gender.properties.masterCode.enum).toEqual([]);
		});

		it('should not change schema when masterData is empty', function(){
			// given
			var schema = {};
			var masterData = {};
			var mapping = {};

			var propertySchema = {
				title : 'Gender',
				enum : []
			};
			$parse('properties.gender.properties.masterCode').assign(schema, propertySchema);
			$parse('properties.gender.type').assign(schema, 'object');

			// when
			FormHelper.populateSchemaWithMasterData(schema, masterData, mapping);

			// then
			expect(schema.properties.gender.properties.masterCode.enum).toEqual([]);
		});

		it('should throw exception when mapping is wrong object', function(){
			// given
			var schema = {};
			var masterData = {};
			var mapping = {'gender.masterCode': 'masterData.test.test'};

			var propertySchema = {
				title : 'Gender',
				enum : []
			};
			var dictionary = [
				{code:'F', name:'Female'},
				{code:'M', name:'Male'}
			];
			$parse('masterData.genders.gender').assign(masterData, dictionary);
			$parse('properties.gender.properties.masterCode').assign(schema, propertySchema);
			$parse('properties.gender.type').assign(schema, 'object');

			// when && then
			expect(
				function(){
					FormHelper.populateSchemaWithMasterData(schema, masterData, mapping);
				}
			).toThrowError('Values object for schema "gender.masterCode" is not defined');
		});

	});

	describe('copyValues function', function() {
		it('should copy unassigned value in form model', function() {
			// given
			var obj = {foo: 'foo-test'};
			var valuesMap = [
				{
					source: 'foo',
					dest: 'bar'
				}
			];

			// when
			FormHelper.copyValues(valuesMap, obj);

			// then
			expect(Object.keys(obj)).toContain('bar');
			expect(obj.bar).toEqual(obj.foo);
		});

		it('should copy and overwrite empty value in form model', function() {
			// given
			var obj = {foo: 'foo-test', bar: ''};
			var valuesMap = [
				{
					source: 'foo',
					dest: 'bar'
				}
			];

			// when
			FormHelper.copyValues(valuesMap, obj);

			// then
			expect(Object.keys(obj)).toContain('bar');
			expect(obj.bar).toEqual(obj.foo);
		});

		it('should copy and overwrite undefined value in form model', function() {
			// given
			var obj = {foo: 'foo-test', bar: void(true)};
			var valuesMap = [
				{
					source: 'foo',
					dest: 'bar'
				}
			];

			// when
			FormHelper.copyValues(valuesMap, obj);

			// then
			expect(Object.keys(obj)).toContain('bar');
			expect(obj.bar).toEqual(obj.foo);
		});

		it('should not copy and overwite any values in form model', function() {
			// given
			var obj = {foo: 'foo-test', bar: 'bar-test'};
			var valuesMap = [
				{
					source: 'foo',
					dest: 'bar'
				}
			];

			// when
			FormHelper.copyValues(valuesMap, obj);

			// then
			expect(obj.bar).not.toEqual(obj.foo);
		});

		it('should parse expression and assign value', function() {
			// given
			var obj = {
				foo: {
					bar: [
						'abc'
					]
				}
			};

			var valuesMap = [
				{
					source: 'foo.bar',
					dest: 'pathName.keyName'
				}
			];

			// when
			FormHelper.copyValues(valuesMap, obj);

			// then
			expect(obj.hasOwnProperty('pathName')).toBe(true);
			expect(obj.pathName.hasOwnProperty('keyName')).toBe(true);

			expect(obj.pathName.keyName).toEqual(obj.foo.bar);
		});

		it('should parse complex expression and assign value', function() {
			// given
			var obj = {
				foo: 'foo-test',
				bar: 'bar-test'
			};

			var valuesMap = [
				{
					source: 'foo + " " + bar',
					dest: 'concat'
				}
			];

			// when
			FormHelper.copyValues(valuesMap, obj);

			// then
			expect(obj.concat).toEqual(
				obj.foo + ' ' + obj.bar
			);
		});

		it('should copy array type value without reference', function() {
			// given
			var obj = {
				foo: [
					'abc'
				]
			};

			var valuesMap = [
				{
					source: 'foo',
					dest: 'bar'
				}
			];

			// when
			FormHelper.copyValues(valuesMap, obj);
			obj.foo.push('foo');

			// then
			expect(obj.bar).toBeTruthy();
			expect(obj.bar.length).not.toEqual(obj.foo.length);
		});

		it('should copy object type value without reference', function() {
			// given
			var obj = {
				foo: {
					fooBar: 'test'
				}
			};

			var valuesMap = [
				{
					source: 'foo',
					dest: 'bar'
				}
			];

			// when
			FormHelper.copyValues(valuesMap, obj);
			obj.foo.fooBar = true;

			// then
			expect(obj.bar).toBeTruthy();
			expect(JSON.stringify(obj.bar)).not.toEqual(JSON.stringify(obj.foo));
		});

		it('should copy data from array', function() {
			// given
			var results = {
				foo: [
					{
						bar: true
					}
				]
			};

			var valuesMap = [
				{
					source: 'foo[0].bar',
					dest: 'bar'
				}
			];

			// when
			FormHelper.copyValues(valuesMap, results);

			// then
			expect(results.bar).toBeTruthy();
		});

		it('should copy data into array', function() {
			// given
			var results = {
				foo: true
			};

			var valuesMap = [
				{
					source: 'foo',
					dest: 'bar[0].foo'
				}
			];

			// when
			FormHelper.copyValues(valuesMap, results);

			// then
			expect(results.bar).toEqual(jasmine.any(Array));
			expect(results.bar[0].foo).toBeTruthy();
		});
	});

	describe('copyValuesFrom function', function() {
		it('should copy unassigned value in form model', function() {
			// given
			var source = {foo: 'foo-test'};
			var mappings = [
				{
					source: 'foo',
					dest: 'bar'
				}
			];

			var dest = {};

			// when
			FormHelper.copyValuesFrom(mappings, source, dest);

			// then
			expect(dest.bar).toEqual(source.foo);
		});

		it('should copy and overwrite empty value in form model', function() {
			// given
			var source = {foo: 'foo-test'};
			var mappings = [
				{
					source: 'foo',
					dest: 'bar'
				}
			];

			var dest = {
				bar: ''
			};

			// when
			FormHelper.copyValuesFrom(mappings, source, dest);

			// then
			expect(dest.bar).toEqual(source.foo);
		});

		it('should copy and overwrite undefined value in form model', function() {
			// given
			var source = {foo: 'foo-test'};
			var mappings = [
				{
					source: 'foo',
					dest: 'bar'
				}
			];
			var dest = {
				 bar: void(true)
			};

			// when
			FormHelper.copyValuesFrom(mappings, source, dest);

			// then
			expect(dest.bar).toEqual(source.foo);
		});

		it('should not copy and overwite any values in form model', function() {
			// given
			var source = {foo: 'foo-test'};
			var mappings = [
				{
					source: 'foo',
					dest: 'bar'
				}
			];
			var dest = {
				bar: 'bar-test'
			};

			// when
			FormHelper.copyValuesFrom(mappings, source, dest);

			// then
			expect(dest.bar).not.toEqual(source.foo);
		});

		it('should parse expression and assign value', function() {
			// given
			var source = {
				foo: {
					bar: [
						'abc'
					]
				}
			};

			var mappings = [
				{
					source: 'foo.bar',
					dest: 'pathName.keyName'
				}
			];

			var dest = {};

			// when
			FormHelper.copyValuesFrom(mappings, source, dest);

			// then
			expect(dest.pathName.keyName).toEqual(source.foo.bar);
		});

		it('should parse complex expression and assign value', function() {
			// given
			var source = {
				foo: 'foo-test',
				bar: 'bar-test'
			};

			var dest = {};

			var mappings = [
				{
					source: 'foo + " " + bar',
					dest: 'concat'
				}
			];

			// when
			FormHelper.copyValuesFrom(mappings, source, dest);

			// then
			expect(dest.concat).toEqual(
				source.foo + ' ' + source.bar
			);
		});

		it('should copy array type value without reference', function() {
			// given
			var source = {
				foo: [
					'abc'
				]
			};

			var mappings = [
				{
					source: 'foo',
					dest: 'bar'
				}
			];

			var dest = {};

			// when
			FormHelper.copyValuesFrom(mappings, source, dest);
			source.foo.push('foo');

			// then
			expect(dest.bar).toBeTruthy();
			expect(dest.bar.length).not.toEqual(source.foo.length);
		});

		it('should copy object type value without reference', function() {
			// given
			var source = {
				foo: {
					fooBar: 'test'
				}
			};

			var mappings = [
				{
					source: 'foo',
					dest: 'bar'
				}
			];

			var dest = {};

			// when
			FormHelper.copyValuesFrom(mappings, source, dest);
			source.foo.fooBar = true;

			// then
			expect(dest.bar).toBeTruthy();
			expect(JSON.stringify(dest.bar)).not.toEqual(JSON.stringify(source.foo));
		});

		describe('conditional', function(){
			var sourceVariablePath;
			var destinationVariablePath;
			var sourceValue;

			var source;
			var destination;

			function buildMappings(sourceCondition, destinationCondition){
				return [
					{
						source: sourceVariablePath,
						dest: destinationVariablePath,
						sourceCondition: sourceCondition,
						destinationCondition: destinationCondition
					}
				];
			}

			function applyMapping(sourceCondition, destinationCondition){
				var mappings = buildMappings(sourceCondition, destinationCondition);
				FormHelper.copyValuesFrom(mappings, source, destination);
			}

			function expectDestinationValueToBe(expectedDestinationValue){
				expect($parse(destinationVariablePath)(destination)).toEqual(expectedDestinationValue);
			}

			beforeEach(function(){
				sourceVariablePath = 'some.source.variable';
				destinationVariablePath = 'some.destination.variable';

				sourceValue = 'some.source.value';

				source = {};
				destination = {};

				$parse(sourceVariablePath).assign(source, sourceValue);
			});

			it('should not copy value with false condition in mappings', function() {
				// given
				var expectedDestinationValue = angular.undefined;
				var sourceCondition = 'false';
				var destinationCondition = null;

				applyMapping(sourceCondition, destinationCondition);

				// then
				expectDestinationValueToBe(expectedDestinationValue);
			});

			it('should copy value with logical source condition statement in mappings', function() {
				// given
				var expectedDestinationValue = 3;
				var sourceCondition = sourceVariablePath + ' === ' + expectedDestinationValue;
				var destinationCondition = null;

				// when
				$parse(sourceVariablePath).assign(source, expectedDestinationValue);
				applyMapping(sourceCondition, destinationCondition);

				// then
				expectDestinationValueToBe(expectedDestinationValue);
			});

			it('should not copy value with failing logical source condition statement in mappings', function() {
				// given
				var expectedDestinationValue = angular.undefined;
				var someOtherValue = 123;
				var sourceCondition = sourceVariablePath + ' === ' + someOtherValue;
				var destinationCondition = null;

				// when
				applyMapping(sourceCondition, destinationCondition);

				// then
				expectDestinationValueToBe(expectedDestinationValue);
			});

			it('should stay with old value on failing logical destination condition statement in mappings', function() {
				// given
				var expectedDestinationValue = angular.undefined;
				var someOtherValue = 123;
				var sourceCondition = null;
				var destinationCondition = destinationVariablePath + ' === ' + someOtherValue;

				// when
				$parse(sourceVariablePath).assign(source, 'some.other.source.value');
				applyMapping(sourceCondition, destinationCondition);

				// then
				expectDestinationValueToBe(expectedDestinationValue);
			});

			it('should change value to new one on valid logical destination condition statement in mappings', function() {
				// given
				var expectedDestinationValue = sourceValue;
				var someOtherDestinationValue = 'some.other.source.value';
				var someOtherDestinationVariablePath = 'some.other.destination.variable.path';
				var sourceCondition = null;
				var destinationCondition = someOtherDestinationVariablePath + ' === "' + someOtherDestinationValue + '"';

				// when
				$parse(someOtherDestinationVariablePath).assign(destination, someOtherDestinationValue);
				applyMapping(sourceCondition, destinationCondition);

				// then
				expectDestinationValueToBe(expectedDestinationValue);

			});
		});

		it('should copy data from array', function() {
			// given
			var source = {
				foo: [
					{
						bar: true
					}
				]
			};

			var dest = {};

			var mappings = [
				{
					source: 'foo[0].bar',
					dest: 'bar'
				}
			];

			// when
			FormHelper.copyValuesFrom(mappings, source, dest);

			// then
			expect(dest.bar).toBeTruthy();
		});

		it('should copy data into array', function() {
			// given
			var source = {
				foo: true
			};

			var mappings = [
				{
					source: 'foo',
					dest: 'bar[0].foo'
				}
			];

			var dest = {};

			// when
			FormHelper.copyValuesFrom(mappings, source, dest);

			// then
			expect(dest.bar).toEqual(jasmine.any(Array));
			expect(dest.bar[0].foo).toBeTruthy();
		});
	});

	describe('convertValues', function() {
		var serviceRequestData, mapping;
		beforeEach(function(){

			mapping = [{
				'modelPath': 'profileDetails.basicDetails.firstName',
				'modelType': 'string',
				'serverPath': 'serviceRequest.customer.profileDetails.basicDetails.firstName'
			}, {
				'modelPath': 'profileDetails.basicDetails.lastName',
				'modelType': 'string',
				'serverPath': 'serviceRequest.customer.profileDetails.basicDetails.lastName'
			}, {
				'modelPath': 'profileDetails.address.addressDetails[].building',
				'modelType': 'string',
				'serverPath': 'serviceRequest.customer.profileDetails.addresses.addressDetails[].building'
			}, {
				'modelPath': 'profileDetails.identificationDetails.identificationDetail.idNumber',
				'modelType': 'string',
				'serverPath': 'serviceRequest.customer.profileDetails.identificationDetails.identificationDetail[0].idNumber'
			}, {
				'modelPath': 'notifications.email',
				'serverPath': 'serviceRequest.customer.profileDetails.notificationDetails.preferredMedium.isContactByEmail',
				'modelType': 'boolean',
				'setBooleanIfExists': true
			}, {
				'modelPath': 'profileDetails.basicDetails.vip',
				'modelType': 'boolean',
				'serverPath': 'serviceRequest.customer.profileDetails.basicDetails.VIP'
			}];
			serviceRequestData = {
				serviceRequest: {
					customer: {
						profileDetails: {
							basicDetails: {
								firstName: 'Iwona',
								lastName: 'Zielinska',
								VIP: 'Y'
							},
							addresses: {
								addressDetails: [
									{
										building: '123'
									},
									{
										building: '124'
									}
								]
							},
							identificationDetails: {
								identificationDetail: [{
									idNumber: 'APJ1203'
								}]
							},
							notificationDetails: {
								preferredMedium: {
									isContactByEmail: 'Y'
								}
							}
						}
					}
				}
			};
		});

		it('customer identificationDetails', function(){
			// when
			var data = FormHelper.convertValues(mapping, serviceRequestData);

			// then
			expect(data.profileDetails.identificationDetails.identificationDetail).toBeDefined();
			expect(data.profileDetails.identificationDetails.identificationDetail).toEqual(serviceRequestData.serviceRequest.customer.profileDetails.identificationDetails.identificationDetail[0]);
		});

		it('customer firstName', function(){
			// when
			var data = FormHelper.convertValues(mapping, serviceRequestData);

			// then
			expect(data.profileDetails.basicDetails.firstName).toBeDefined();
			expect(data.profileDetails.basicDetails.firstName).toEqual(serviceRequestData.serviceRequest.customer.profileDetails.basicDetails.firstName);
		});

		it('customer adresses', function(){
			// when
			var data = FormHelper.convertValues(mapping, serviceRequestData);

			// then
			expect(data.profileDetails.address.addressDetails).toBeDefined();
			expect(data.profileDetails.address.addressDetails.length).toBe(serviceRequestData.serviceRequest.customer.profileDetails.addresses.addressDetails.length);
			expect(data.profileDetails.address.addressDetails).toEqual(serviceRequestData.serviceRequest.customer.profileDetails.addresses.addressDetails);
		});

		it('customer vip (boolean)', function() {
			// when
			var data = FormHelper.convertValues(mapping, serviceRequestData);

			// then
			expect(data.profileDetails.basicDetails.vip).toBeDefined();
			expect(data.profileDetails.basicDetails.vip).toBeTruthy();
		});

		it('customer preferredMedium (with setBooleanIfExists - should not map)', function() {
			// when
			var data = FormHelper.convertValues(mapping, serviceRequestData);

			// then
			expect(data.notifications).not.toBeDefined();
		});

		it('should conver null type value to empty string', function() {
			// given
			var mappings = [{
				'modelPath': 'foo.bar',
				'modelType': 'string',
				'serverPath': 'moo.goo'
			}];

			var fakeServerData = {
				moo: {
					goo: null
				}
			};

			// when
			var data = FormHelper.convertValues(mappings, fakeServerData);

			// then
			expect(data.foo.bar).toEqual(jasmine.any(String));
		});
	});

	describe('fixParseArray', function() {
		var serviceRequestData, mapping;
		beforeEach(function(){

			mapping = [{
				'modelPath': 'profileDetails.address.addressDetails[].building',
				'modelType': 'string',
				'serverPath': 'serviceRequest.customer.profileDetails.addresses.addressDetails[].building'
			}];
			serviceRequestData = {
				serviceRequest: {
					customer: {
						profileDetails: {
							addresses: {
								addressDetails: [
									{
										building: '123'
									},
									{
										building: '123'
									}
								]
							}
						}
					}
				}
			};
		});

		it('customer adresses (have to be an array)', function(){
			// when
			var data = FormHelper.convertValues(mapping, serviceRequestData);

			// then
			expect(data.profileDetails.address.addressDetails).toBeDefined();
			expect(data.profileDetails.address.addressDetails.length).toBe(2);
			expect(data.profileDetails.address.addressDetails).toEqual(serviceRequestData.serviceRequest.customer.profileDetails.addresses.addressDetails);
		});
	});

	describe('enumToTitleMapFromMasterData', function() {
		var form, values;
		beforeEach(function(){
			form = {
				schema: {
					'enum': [],
					masterData: [
						{code: 'foo', name: 'bar'},
						{code: 'PANCARD', name: 'PANCARD'},
						{code: 'PASSPORT', name: 'PASSPORT'}
					]
				},
				titleMap: []
			};
		});

		it('should map items from masterData', function(){
			// given
			values = [{masterCode: 'foo'}];
			var mappedItem = {
				name: form.schema.masterData[0].name,
				value: values[0].masterCode
			};

			// when
			FormHelper.enumToTitleMapFromMasterData(form, values);

			// then
			expect(form.titleMap).toBeDefined();
			expect(form.titleMap.length).toEqual(values.length);
			expect(form.titleMap[0]).toEqual(mappedItem);
		});

		it('should not map items from masterData if values are wrong', function(){
			// given
			values = [{masterCode: 'wrong'}];

			// when
			FormHelper.enumToTitleMapFromMasterData(form, values);

			// then
			expect(form.titleMap).toBeDefined();
			expect(form.titleMap.length).toEqual(0);
			expect(form.titleMap[0]).not.toBeDefined();
		});
	});

	describe('assignArray', function() {
		it('should not modify data', function() {
			// given
			var data = {};
			var jsonPath = 'abc';

			// when
			FormHelper.assignArray(jsonPath, data);

			// then
			expect(data).toEqual({});
		});

		it('should set array on abc object', function() {
			// given
			var data = {};
			var jsonPath = 'abc[0]';

			// when
			FormHelper.assignArray(jsonPath, data);

			// then
			expect(data).not.toEqual({});
			expect(data.abc).toEqual(jasmine.any(Array));
			expect(data.abc.length).toEqual(0);
		});

		it('should set array on abc array object', function() {
			// given
			var data = {};
			var jsonPath = 'abc[0].foo[0]';

			// when
			FormHelper.assignArray(jsonPath, data);

			// then
			expect(data).not.toEqual({});
			expect(data.abc).toEqual(jasmine.any(Array));
			expect(data.abc[0].foo).toEqual(jasmine.any(Array));
			expect(data.abc[0].foo.length).toEqual(0);
		});

		it('should not set array on abc[0].foo[0].bar object', function() {
			// given
			var data = {};
			var jsonPath = 'abc[0].foo[0].bar';

			// when
			FormHelper.assignArray(jsonPath, data);

			// then
			expect(data).not.toEqual({});
			expect(data.abc).toEqual(jasmine.any(Array));
			expect(data.abc[0].foo).toEqual(jasmine.any(Array));
			expect(data.abc[0].foo.length).toEqual(0);
		});
	});

	it('get master default value ', function(){
		var defaultValue = 'Y';
		var valuesMap = [
			{
				code: 'Email',
				name: 'Email',
				default: 'Y'
			}
		];
		// when
		var results = FormHelper.getDefaultValueFromMasterData(valuesMap, defaultValue);

		// then
		expect(results).toEqual('Email');
	});

	it('get master default value not  Equal to empty', function(){
		var defaultValue = 'Y';
		var valuesMap = [
			{
				code: 'Email',
				name: 'Email',
				default: 'Y'
			}
		];
		// when
		var results = FormHelper.getDefaultValueFromMasterData(valuesMap, defaultValue);

		// then
		expect(results).not.toEqual('');
	});

	it('get master default value is not defined', function(){
		var defaultValue = 'Y';
		var valuesMap = [
			{
				code: 'Email',
				name: 'Email',
				default: 'true'
			}
		];
		// when
		var results = FormHelper.getDefaultValueFromMasterData(valuesMap, defaultValue);

		// then
		expect(results).toBeUndefined();
	});
});
