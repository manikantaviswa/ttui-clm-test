describe('Service: FieldMapping', function() {
	'use strict';

	var FieldMapping, $log;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Services.FieldMapping');

		angular.mock.inject(function($injector) {
			$log = $injector.get('$log');
			FieldMapping = $injector.get('FieldMapping');
		});
	});

	it('should check if FieldMapping module exists', function() {
		expect(!!FieldMapping).toBe(true);
		expect(FieldMapping).toEqual(jasmine.any(Object));
	});

	it('should check basic path mapping with empty string', function() {
		var model = {
			data: {text: ''}
		};
		var results = FieldMapping.extractFields(model, 'data.text', 'target.property.text');

		expect(results.length).toEqual(1);
		expect(results[0].sourcePath).toEqual('data.text');
		expect(results[0].targetPath).toEqual('target.property.text');
	});

	it('should check basic path mapping with string value', function() {
		var model = {
			data: {text: 'X'}
		};
		var results = FieldMapping.extractFields(model, 'data.text', 'target.property.text');

		expect(results.length).toEqual(1);
		expect(results[0].sourcePath).toEqual('data.text');
		expect(results[0].targetPath).toEqual('target.property.text');
	});

	it('should check basic path mapping with zero numeric value', function() {
		var model = {
			data: {value: 0}
		};
		var results = FieldMapping.extractFields(model, 'data.value', 'target.property.value');

		expect(results.length).toEqual(1);
		expect(results[0].sourcePath).toEqual('data.value');
		expect(results[0].targetPath).toEqual('target.property.value');
	});

	it('should check basic path mapping with bool false value', function() {
		var model = {
			data: {value: false}
		};
		var results = FieldMapping.extractFields(model, 'data.value', 'target.property.value');

		expect(results.length).toEqual(1);
		expect(results[0].sourcePath).toEqual('data.value');
		expect(results[0].targetPath).toEqual('target.property.value');
	});

	it('should check single level array to array mapping', function() {
		var model = {
			items: [
				{value: 0},
				{value: 1},
				{value: 2}
			]
		};
		var results = FieldMapping.extractFields(model, 'items[].value', 'target.array[].val');

		expect(results.length).toEqual(3);
		expect(results[0].sourcePath).toEqual('items[0].value');
		expect(results[0].targetPath).toEqual('target.array[0].val');
		expect(results[1].sourcePath).toEqual('items[1].value');
		expect(results[1].targetPath).toEqual('target.array[1].val');
		expect(results[2].sourcePath).toEqual('items[2].value');
		expect(results[2].targetPath).toEqual('target.array[2].val');
	});

	it('should check multi level array to array mapping', function() {
		var model = {
			items: [
				{data: {items: [{value: 1}, {value: 2}]}},
				{data: {items: [{value: 1}]}},
				{data: {items: [{value: 1}, {value: 2}, {value: 3}]}}
			]
		};
		var results = FieldMapping.extractFields(model, 'items[].data.items[].value', 'target.array[].items[].val');

		expect(results.length).toEqual(6);
		expect(results[0].sourcePath).toEqual('items[0].data.items[0].value');
		expect(results[0].targetPath).toEqual('target.array[0].items[0].val');
		expect(results[1].sourcePath).toEqual('items[0].data.items[1].value');
		expect(results[1].targetPath).toEqual('target.array[0].items[1].val');
		expect(results[2].sourcePath).toEqual('items[1].data.items[0].value');
		expect(results[2].targetPath).toEqual('target.array[1].items[0].val');
		expect(results[3].sourcePath).toEqual('items[2].data.items[0].value');
		expect(results[3].targetPath).toEqual('target.array[2].items[0].val');
		expect(results[4].sourcePath).toEqual('items[2].data.items[1].value');
		expect(results[4].targetPath).toEqual('target.array[2].items[1].val');
		expect(results[5].sourcePath).toEqual('items[2].data.items[2].value');
		expect(results[5].targetPath).toEqual('target.array[2].items[2].val');
	});

	it('should log invalid source fields', function() {
		var model = {data: {}};

		spyOn($log, 'debug');

		var results = FieldMapping.extractFields(model, 'data.xx.yy.zz', 'target.value');

		expect($log.debug).toHaveBeenCalled();
		expect(results.length).toEqual(0);
	});

	it('should log unsupported array mapping', function() {
		var model = {
			items: [
				{value: 0},
				{value: 1},
				{value: 2}
			]
		};

		spyOn($log, 'error');

		var results = FieldMapping.extractFields(model, 'items[].value', 'target.value');

		expect($log.error).toHaveBeenCalled();
		expect(results.length).toEqual(0);
	});

	describe('when includeEmpty flag is set', function() {

		it('should return mapping for undefined value', function() {
			// given
			var model = {
				source: {
					field: undefined
				}
			};

			// when
			var results = FieldMapping.extractFields(model, 'source.field', 'source.field', true);

			// then
			expect(results.length).toEqual(1);
		});

		it('should return mapping for one level array', function() {
			// given
			var model = {
				sourceArray: [
					{
						field: undefined
					},
					{
						field: 'something'
					}
				]
			};

			// when
			var results = FieldMapping.extractFields(model, 'sourceArray[].field', 'targetArray[].field', true);

			// then
			expect(results.length).toEqual(2);
			expect(results[0].sourcePath).toEqual('sourceArray[0].field');
			expect(results[0].targetPath).toEqual('targetArray[0].field');
			expect(results[1].sourcePath).toEqual('sourceArray[1].field');
			expect(results[1].targetPath).toEqual('targetArray[1].field');
		});

		it('should return mapping for two level array', function() {
			// given
			var model = {
				sourceArray: [
					{
						subArray: [
							{
								field: undefined
							},
							{
								field: 'something'
							}
						]
					}
				]
			};

			// when
			var results = FieldMapping.extractFields(model, 'sourceArray[].subArray[].field', 'targetArray[].subArray[].field', true);

			// then
			expect(results.length).toEqual(2);
			expect(results[0].sourcePath).toEqual('sourceArray[0].subArray[0].field');
			expect(results[0].targetPath).toEqual('targetArray[0].subArray[0].field');
			expect(results[1].sourcePath).toEqual('sourceArray[0].subArray[1].field');
			expect(results[1].targetPath).toEqual('targetArray[0].subArray[1].field');
		});

		it('should not return mapping if array is undefined', function() {
			// given
			var model = {
				sourceArray: undefined
			};

			// when
			var results = FieldMapping.extractFields(model, 'sourceArray[].field', 'targetArray[].field', true);

			// then
			expect(results.length).toEqual(0);
		});

		it('should not return mapping if array is empty', function() {
			// given
			var model = {
				sourceArray: []
			};

			// when
			var results = FieldMapping.extractFields(model, 'sourceArray[].field', 'targetArray[].field', true);

			// then
			expect(results.length).toEqual(0);
		});

		it('should not return mapping if second level array is undefined', function() {
			// given
			var model = {
				sourceArray: [
					{
						subArray: undefined
					}
				]
			};

			// when
			var results = FieldMapping.extractFields(model, 'sourceArray[].subArray[].field', 'targetArray[].subArray[].field', true);

			// then
			expect(results.length).toEqual(0);
		});

		it('should not return mapping if second level array is empty', function() {
			// given
			var model = {
				sourceArray: [
					{
						subArray: []
					}
				]
			};

			// when
			var results = FieldMapping.extractFields(model, 'sourceArray[].subArray[].field', 'targetArray[].subArray[].field', true);

			// then
			expect(results.length).toEqual(0);
		});

		it('should return mappings if first item is empty but second contains value', function() {
			// given
			var model = {
				array: [
					{foo: undefined},
					{foo: 'bar'}
				]
			};

			// when
			var results = FieldMapping.extractFields(model, 'array[].foo', 'targetArray[].field');

			// then
			expect(results.length).toEqual(1);
			expect(results[0]).toEqual({sourcePath: 'array[1].foo', targetPath: 'targetArray[1].field'});
		});

		it('should not return any value if value does not exist in any element of array', function() {
			// given
			var model = {
				array: [
					{x: 0},
					{x: 1}
				]
			};

			// when
			var results = FieldMapping.extractFields(model, 'array[].foo', 'targetArray[].field');

			// then
			expect(results.length).toEqual(0);
		});

		it('should return one mapping even though one element is undefined', function() {
			// given
			var model = {
				array: [
					undefined,
					{foo: 'bar'}
				]
			};

			// when
			var results = FieldMapping.extractFields(model, 'array[].foo', 'targetArray[].field');

			// then
			expect(results.length).toEqual(1);
			expect(results[0]).toEqual({sourcePath: 'array[1].foo', targetPath: 'targetArray[1].field'});
		});

	});

});
