'use strict';

describe('Service: DataObject', function() {
	// instantiate service
	var DataObject, DataObjectCollection;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Services.DataObject');

		angular.mock.inject(function(_DataObject_, _DataObjectCollection_) {
			DataObject = _DataObject_;
			DataObjectCollection = _DataObjectCollection_;
		});
	});

	describe('DataObject', function() {
		it('should check if DataObject module exists', function() {
			expect(!!DataObject).toBe(true);
			expect(typeof DataObject).toEqual('function');
		});

		it('should cunstruct object', function() {
			expect(new DataObject()).toEqual(jasmine.any(Object));
		});

		it('should expose setData method', function() {
			// given
			var data = {};

			// when
			var obj = new DataObject(data);

			// then
			expect(obj.setData).toBeDefined();
		});

		it('should expose initDataObject method', function() {
			// given
			var data = {};

			// when
			var obj = new DataObject(data);

			// then
			expect(obj.initDataObject).toBeDefined();
		});

		it('should expose getName method', function() {
			// given
			var data = {};

			// when
			var obj = new DataObject(data);

			// then
			expect(obj.getName).toBeDefined();
		});

		it('should expose getName method', function() {
			// given
			var data = {};

			// when
			var obj = new DataObject(data);

			// then
			expect(obj.getName).toBeDefined();
		});

		it('should expose getDescription method', function() {
			// given
			var data = {};

			// when
			var obj = new DataObject(data);

			// then
			expect(obj.setData).toBeDefined();
		});
	});

	describe('DataObjectCollection', function() {
		it('should check if DataObjectCollection module exists', function() {
			expect(!!DataObjectCollection).toBe(true);
			expect(typeof DataObjectCollection).toEqual('function');
		});

		it('should cunstruct object', function() {
			expect(new DataObjectCollection()).toEqual(jasmine.any(Object));
		});

		it('should expose setData method', function() {
			// given
			var data = {};

			// when
			var obj = new DataObjectCollection(data);

			// then
			expect(obj.setData).toBeDefined();
		});

		it('should expose initDataObjects method', function() {
			// given
			var data = {};

			// when
			var obj = new DataObjectCollection(data);

			// then
			expect(obj.initDataObjects).toBeDefined();
		});

		it('should expose getDataObjectByName method', function() {
			// given
			var data = {};

			// when
			var obj = new DataObjectCollection(data);

			// then
			expect(obj.getDataObjectByName).toBeDefined();
		});

		it('should expose getDataObjectByCode method', function() {
			// given
			var data = {};

			// when
			var obj = new DataObjectCollection(data);

			// then
			expect(obj.getDataObjectByCode).toBeDefined();
		});

		it('should expose getDataObjectBy method', function() {
			// given
			var data = {};

			// when
			var obj = new DataObjectCollection(data);

			// then
			expect(obj.getDataObjectBy).toBeDefined();
		});

		it('should expose getAllDataObjects method', function() {
			// given
			var data = {};

			// when
			var obj = new DataObjectCollection(data);

			// then
			expect(obj.getAllDataObjects).toBeDefined();
		});
	});
});
