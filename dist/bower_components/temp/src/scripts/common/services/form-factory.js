'use strict';

var module = angular.module('TT-UI.Common.Services.FormFactory', [
	'schemaForm',
	'TT-UI.Common.Helpers.XhrHelper',
	'TT-UI.Common.Helpers.Form',
	'TT-UI.Common.Spread'
]);

function factory($q, XhrHelper, FormHelper) {
	var FormFactory = function(schemaUrl, structureUrl, optionsUrl) {
		this._schemaUrl = schemaUrl;
		this._structureUrl = structureUrl;
		this._optionsUrl = optionsUrl;

		this._mappings = [];
		this._dictionaries = [];

		this._model = {};
	};

	FormFactory.prototype._loadForm = function() {
		return $q.all([
			this._getSchema(),
			this._getStructure(),
			this._getOptions()
		]);
	};

	function loadXhr(uri) {
		return uri ? XhrHelper.loadJsonDeferred(uri) : null;
	}

	FormFactory.prototype._getStructure = function(){
		return loadXhr(this._structureUrl);
	};

	FormFactory.prototype._getSchema = function(){
		return loadXhr(this._schemaUrl);
	};

	FormFactory.prototype._getOptions = function(){
		return loadXhr(this._optionsUrl);
	};

	FormFactory.prototype.addCopyMappings = function(mappingsUri, model){
		this._mappings.push({
			uri: mappingsUri,
			model: model
		});

		return this;
	};

	FormFactory.prototype.addDictionary = function(mappings, masterData) {
		this._dictionaries.push({
			mappings: mappings,
			masterData: masterData
		});

		return this;
	};

	FormFactory.prototype._runDictionaries = function(form) {
		this._dictionaries.forEach(function(dictionary) {
			FormHelper.populateSchemaWithMasterData(form.schema, dictionary.masterData, dictionary.mappings);
		});

		return form;
	};

	FormFactory.prototype._copyMappings = function(form) {
		var mappingsStorage = this._mappings;

		function iterateMappingsResults(mappings, i) {
			var model = mappingsStorage[i].model;
			FormHelper.copyValuesFrom(mappings, model, form.model);
		}

		var loadMappingsPromise = mappingsStorage
			.map(function(mapping) { return mapping.uri; })
			.map(XhrHelper.loadJsonDeferred);

		return $q.all(loadMappingsPromise)
			.then(function(results) {
				results.forEach(iterateMappingsResults);
				return form;
			});
	};

	FormFactory.prototype.getForm = function(model) {
		function resolveForm(schema, structure, options) {
			return {
				schema: schema,
				structure: structure,
				options: options,
				model: model || {}
			};
		}

		return this._loadForm()
			.then($q.spread(resolveForm))
			.then(this._runDictionaries.bind(this))
			.then(this._copyMappings.bind(this));
	};

	return FormFactory;
}
factory.$inject = ['$q', 'XhrHelper', 'FormHelper'];

module.factory('FormFactory', factory);