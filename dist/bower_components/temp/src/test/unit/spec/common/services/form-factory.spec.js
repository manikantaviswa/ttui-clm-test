describe('FormFactory service: ', function() {
	'use strict';

	var FormFactory;
	var $httpBackend;
	var $rootScope;


	beforeEach(function(){
		angular.mock.module('TT-UI.Common.Services.FormFactory');

		angular.mock.inject(function($injector) {
			FormFactory = $injector.get('FormFactory');
			$httpBackend = $injector.get('$httpBackend');
			$rootScope = $injector.get('$rootScope');
		});
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should load schema from given url', function() {
		// given
		var schemaUrl = 'data/forms/form.foo-form.json';
		var mockSchema = {test:'test'};

		$httpBackend.whenGET(schemaUrl).respond(mockSchema);

		// when
		var result;
		var form = new FormFactory(schemaUrl);
		form.getForm().then(function(response) {
			result = response;
		});
		$httpBackend.flush();

		// then
		expect(result.schema).toEqual(mockSchema);
	});

	it('should not resolve when loading schema url fails', function() {
		// given
		var schemaUrl = 'data/forms/form.foo-form.json';

		$httpBackend.whenGET(schemaUrl).respond(404, '');

		// when
		var form = new FormFactory(schemaUrl);
		var result;
		form.getForm().catch(function() {
			result = true;
		});
		$httpBackend.flush();

		// then
		expect(result).toBeTruthy();
	});

	it('should load structure from given url', function() {
		// given
		var structureUrl = 'data/structure/structure.foo-form.json';
		var structure = [{items: [{key: 'foo'}]}];

		$httpBackend.whenGET(structureUrl).respond(structure);

		// when
		var result;
		var form = new FormFactory(null, structureUrl);
		form.getForm().then(function(response) {
			result = response;
		});
		$httpBackend.flush();

		// then
		expect(result.structure).toEqual(structure);
	});

	it('should not resolve when loading sturcture url fails', function() {
		// given
		var structureUrl = 'data/structure/structure.foo-form.json';

		$httpBackend.whenGET(structureUrl).respond(404, '');

		// when
		var form = new FormFactory(null, structureUrl);
		var result;
		form.getForm().catch(function() {
			result = true;
		});
		$httpBackend.flush();

		// then
		expect(result).toBeTruthy();
	});

	it('should load options from given url', function() {
		// given
		var optionsUrl = 'data/options/options.foo-form.json';
		var options = {foo: 'bar'};

		$httpBackend.whenGET(optionsUrl).respond(options);

		// when
		var result;
		var form = new FormFactory(null, null, optionsUrl);
		form.getForm().then(function(response) {
			result = response;
		});
		$httpBackend.flush();

		// then
		expect(result.options).toEqual(options);
	});

	it('should not resolve when loading options url fails', function() {
		// given
		var optionsUrl = 'data/options/options.foo-form.json';

		$httpBackend.whenGET(optionsUrl).respond(404, '');

		// when
		var form = new FormFactory(null, null, optionsUrl);
		var result;
		form.getForm().catch(function() {
			result = true;
		});
		$httpBackend.flush();

		// then
		expect(result).toBeTruthy();
	});

	it('should return form model', function() {
		// given
		var form = new FormFactory();

		// when
		var results;
		form.getForm().then(function(res) {
			results = res;
		});
		$rootScope.$digest();

		// then
		expect(results.model).toEqual(jasmine.any(Object));
	});

	it('should populate schema with master data', function() {
		// given
		var schemaUrl = 'data/forms/form.foo-form.json';
		var mockSchema = {
			'$schema': 'http://json-schema.org/draft-04/schema#',
			'type': 'object',
			'properties': {
				'foo-field': {
					'type': 'string',
					'enum': []
				}
			}
		};

		$httpBackend.whenGET(schemaUrl).respond(mockSchema);

		var fakeMasterData = {
			boo: [
				'goo-value',
				'moo-value'
			]
		};

		var fakeMapping = {
			'foo-field': 'boo'
		};

		var form = new FormFactory(schemaUrl);
		form.addDictionary(fakeMapping, fakeMasterData);

		// when
		var results;
		form.getForm().then(function(res) {
			results = res;
		});
		$httpBackend.flush();

		// then
		var enm = results.schema.properties['foo-field']['enum'];
		expect(enm).toContain('goo-value');
		expect(enm).toContain('moo-value');
	});

	it('should add copy mappings and copy values', function() {
		// given
		var mappingsUri = 'data/forms/copy.foo-form.json';
		var mockMappings = [
			{
				source: 'foo.path',
				dest: 'moo.path'
			}
		];

		var sourceModel = {
			foo: {
				path: 'goo-value'
			}
		};

		$httpBackend.whenGET(mappingsUri).respond(mockMappings);

		var form = new FormFactory(mappingsUri);
		form.addCopyMappings(mappingsUri, sourceModel);

		// when
		var results;
		form.getForm().then(function(res) {
			results = res;
		});
		$httpBackend.flush();

		// then
		expect(results.model.moo.path).toEqual('goo-value');
	});

	it('should add copy mappings and not overwrite existing values', function() {
		// given
		var mappingsUri = 'data/forms/copy.foo-form.json';
		var mockMappings = [
			{
				source: 'foo.path',
				dest: 'moo.path'
			}
		];

		var sourceModel = {
			foo: {
				path: 'goo-value'
			}
		};

		var formModel = {
			moo: {
				path: 'boo-value'
			}
		};

		$httpBackend.whenGET(mappingsUri).respond(mockMappings);

		var form = new FormFactory(mappingsUri);
		form.addCopyMappings(mappingsUri, sourceModel);

		// when
		var results;
		form.getForm(formModel).then(function(res) {
			results = res;
		});
		$httpBackend.flush();

		// then
		expect(results.model.moo.path).not.toEqual('goo-value');
	});

	it('should allow to chain form instance after invoking addDictionary', function() {
		// give
		var form = new FormFactory();

		// when
		var results = form.addDictionary();

		// then
		expect(results).toBe(form);
	});

	it('should allow to chain form instance after invoking addCopyMappings', function() {
		// give
		var form = new FormFactory();

		// when
		var results = form.addCopyMappings();

		// then
		expect(results).toBe(form);
	});
});
