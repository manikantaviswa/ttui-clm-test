'use strict';

var module = angular.module('TT-UI.Common.Services.Validator', [
	'TT-UI.Common.Helpers.Form'
]);

function ValidatorFactory($q, $parse, $log, translateFilter, FormHelper) {

	var __ = translateFilter;

	var createPathWithArrayIndex = function(path, index){
		return path.replace(/\[\]/g, '[' + (angular.isNumber(index) ? index : 0) + ']');
	};

	var Validator = function(ruleName, name, inline) {
		this._ruleName = ruleName;
		this._name = name || ruleName;
		this._inline = !!inline;

		this._schema =  [];
		this._formModel = null;
		this._model = null;
		this._reportConfig = null;
		this._isFormNotification = false;
	};

	Validator.prototype.getRuleName = function() {
		return this._ruleName;
	};

	Validator.prototype.getName = function() {
		return this._name;
	};

	Validator.prototype.isInline = function() {
		return this._inline;
	};

	Validator.prototype.setSchema = function(schema) {
		this._schema = schema;

		return this;
	};

	Validator.prototype.getSchema = function() {
		return this._schema;
	};

	Validator.prototype.setFormNotification = function(isFormNotification) {
		this._isFormNotification = isFormNotification;
		return this;
	};

	Validator.prototype.setForm = function(formModel) {
		this._formModel = formModel;
		return this;
	};

	Validator.prototype.getForm = function() {
		return this._formModel;
	};

	Validator.prototype.setModel = function(model) {
		this._model = model;

		return this;
	};

	Validator.prototype.getModel = function() {
		return this._model;
	};

	Validator.prototype.setReportConfig = function(reportConfig) {
		this._reportConfig = reportConfig;

		return this;
	};

	Validator.prototype.getReportConfig = function() {
		return this._reportConfig;
	};

	Validator.prototype._canPopulateModel = function(){
		return angular.isObject(this.getModel()) && angular.isObject(this.getReportConfig());
	};

	Validator.prototype.populateModelWithValidationResult = function(result, fieldIndex) {
		if (!this._canPopulateModel() || !angular.isObject(result)) {
			return;
		}

		var reportConfig = this.getReportConfig();
		var model = this.getModel();

		var getValue = function(value) {
			return (typeof value === 'boolean') ? (value ? 'PASSED' : 'FAILED') : value;
		};
		if (!angular.isNumber(fieldIndex)){
			fieldIndex = 0;
		}

		angular.forEach(reportConfig, function(validatorPath, modelPath) {
			var path = createPathWithArrayIndex(modelPath, fieldIndex);
			FormHelper.fixArrayParse(path, model);
			$parse(path).assign(model, getValue($parse(validatorPath)(result)));
		});
	};

	Validator.prototype._getLocalData = function(locals) {
		return locals;
	};

	Validator.prototype._collectData = function(locals) {
		var model = this.getModel();
		var localData = this._getLocalData(locals);
		var requestData = {};

		angular.forEach(this.getSchema(), function(jsonPath, requestPath) {
			var value = '';
			if (jsonPath) {
				value = $parse(jsonPath)(model, localData);
			}
			$parse(requestPath).assign(requestData, value ? value.toString() : '');
		});

		return requestData;
	};

	Validator.prototype._collectArrayData = function(fieldIndex, locals) {
		var model = this.getModel();
		var localData = this._getLocalData(locals);
		var requestData = {};

		angular.forEach(this.getSchema(), function(jsonPath, requestPath) {
			var value = '';
			if (jsonPath) {
				value = $parse(createPathWithArrayIndex(jsonPath, fieldIndex))(model, localData);
			}
			$parse(requestPath).assign(requestData, value ? value.toString() : '');
		});

		return requestData;
	};

	Validator.prototype._hasValues = function(requestData) {
		return Object.keys(requestData).every(function(key) {
			var value = requestData[key];
			return angular.isObject(value) ? this._hasValues(value) : value;
		}, this);
	};

	Validator.prototype._getMissingValues = function(requestData) {
		var value;
		var missingValues = [];

		Object.keys(requestData).forEach(function(key) {
			value = requestData[key];

			if (angular.isObject(value)) {
				missingValues.push.apply(missingValues, this._getMissingValues(value));
			} else if (!value) {
				missingValues.push(key);
			}
		}, this);

		return missingValues;
	};

	Validator.prototype._resolver = function(status, message) {
		return $q.when({
			status:  status,
			message: message
		});
	};

	Validator.prototype._rejector = function(status, message) {
		return $q.reject({
			status:  status,
			message: message
		});
	};

	Validator.prototype._apiSuccessResolver = function(response) {
		var isValid = this._isResponseValid(response);
		var message = this._getResponseMessage(response);

		return this._resolver(isValid, message);
	};

	Validator.prototype._apiFailureResolver = function() {
		return this._rejector(false, __('API failed'));
	};

	Validator.prototype._missingValuesResolver = function(missingValues) {
		$log.error('Missing validator values', this.getName(), missingValues);

		return this._rejector(null, __('Missing values ({{valuesNum}})', {
			valuesNum: missingValues.length
		}));
	};

	Validator.prototype.notifyForm = function(validationStatus) {
		if (this._isFormNotification && this._formModel){
			this._formModel.$setValidity(this._ruleName, validationStatus || false);
		}
	};

	Validator.prototype._isResponseValid = function() {
		throw new Error('isResponseValid method was not implemented yet');
	};

	Validator.prototype._getResponseMessage = function() {
		throw new Error('getResponseMessage method was not implemented yet');
	};

	Validator.prototype._buildRequest = function() {
		throw new Error('buildRequest method was not implemented yet');
	};

	Validator.prototype.validate = function() {
		throw new Error('Validate method was not implemented yet');
	};

	return Validator;
}

ValidatorFactory.$inject = ['$q', '$parse', '$log', 'translateFilter', 'FormHelper'];
module.factory('Validator', ValidatorFactory);