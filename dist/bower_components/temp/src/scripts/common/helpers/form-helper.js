'use strict';

var module = angular.module('TT-UI.Common.Helpers.Form', [
	'schemaForm',
	'TT-UI.Common.Helpers.XhrHelper',
	'TT-UI.Common.Services.FieldMapping'
]);

module.constant('FORM_HELPER', {
	DEFAULT_VALUE: 'Y'
});

function FormHelper($log, $q, $parse, sfPath, XhrHelper, FieldMapping, FORM_HELPER) {
	// TODO: Clean-up dependencies
	this.putJsonDeferred  = XhrHelper.putJsonDeferred;
	this.loadJsonDeferred = XhrHelper.loadJsonDeferred;
	this.postJsonDeferred = XhrHelper.postJsonDeferred;

	this.loadMetaInformationDeffered = function(path, uri) {
		return this.loadJsonDeferred(uri).then(function(json) {
			return {
				path: path,
				json: json
			};
		});
	};

	this.loadAllMetaInformation = function(queue) {
		return $q.all(queue).then(function(res) {
			var results = {};

			res.forEach(function(data) {
				results[data.path] = data.json;
			});

			return results;
		});
	};

	this.mergeExtractedMasterData = function(queue) {
		return $q.all(queue).then(function(res) {
			var results = {};

			res.forEach(function(masterData) {
				results[masterData.schema] = masterData.data;
			});

			return results;
		});
	};

	this.populateSchemaWithMasterData = function(schema, masterData, mapping){
		var values = this.extractValuesFromMasterData(masterData, mapping);
		this.applyValuesToSchema(schema, values);
	};

	this.extractValuesFromMasterData = function(masterData, valuesMap) {
		var results = {};
		angular.forEach(valuesMap, function(masterDataJsonPath, formSchemaJsonPath) {
			results[formSchemaJsonPath] = $parse(masterDataJsonPath)(masterData);
		});
		return results;
	};

	this.applyValuesToSchema = function(schema, masterValues) {
		if (!angular.isObject(masterValues) || !angular.isObject(schema.properties)) {
			return;
		}

		angular.forEach(masterValues, function(values, schemaPath) {
			this.iterateMasterInformation(schema, schemaPath, values);
		}, this);
	};

	function getDefaultValueFromMasterData(options, getDefaultValue) {
		var value;

		options.some(function(option) {
			if (option.default === getDefaultValue){
				value = option.code;
			}

			return value;
		});

		return value;
	}

	function setPropertyDefaultValue(property, values) {
		var defaultValue;
		var enm = property['enum'];

		if (angular.isArray(property['enum'])) {
			enm.length = 0;
			enm.push.apply(enm, values);

			defaultValue = getDefaultValueFromMasterData(values, FORM_HELPER.DEFAULT_VALUE);
		}
		else if (angular.isDefined(values.code)) {
			defaultValue = values.code;
		}

		if (angular.isDefined(defaultValue)) {
			property.default = defaultValue;
		}
	}

	this.getDefaultValueFromMasterData = getDefaultValueFromMasterData;

	function getPropertyByKey(property, key, schemaJsonPath) {
		var prop = property[key];

		if (angular.isUndefined(prop)) {
			throw new Error('Can not get property by key "'+key+'" for schema JSON path "'+schemaJsonPath+'"');
		}

		if (prop.type === 'array' && prop.items && angular.isObject(prop.items)) {
			prop = prop.items;
		}

		if (prop.type === 'object' && prop.properties && angular.isObject(prop.properties)) {
			prop = prop.properties;
		}

		return prop;
	}

	this.iterateMasterInformation = function(schema, schemaJsonPath, values) {
		if (angular.isUndefined(values)) {
			throw new Error('Values object for schema "' + schemaJsonPath + '" is not defined');
		}

		var pathArray = sfPath.parse(schemaJsonPath).filter(function(val) {return val;});
		var property = schema.properties;
		var key;

		while ((key = pathArray.shift())) {
			property = getPropertyByKey(property, key, schemaJsonPath);
		}

		setPropertyDefaultValue(property, values);
	};

	this.copyValues = function(valuesMap, data) {
		valuesMap.forEach(function(values) {
			this.fixArrayParse(values.dest, data);

			var sourceValue = $parse(values.source)(data);
			var destValue = $parse(values.dest)(data);

			if (!angular.isUndefined(sourceValue) && !destValue) {
				$parse(values.dest).assign(data, angular.copy(sourceValue));
			}
		}, this);
	};

	this.copyValuesFrom = function(mappings, source, dest) {
		mappings.forEach(function(values) {
			this.fixArrayParse(values.dest, dest);

			var sourceValue = $parse(values.source)(source);
			var destValue = $parse(values.dest)(dest);

			var destinationConditionFailed = values.destinationCondition && !$parse(values.destinationCondition)(dest);
			var sourceConditionFailed = values.sourceCondition && !$parse(values.sourceCondition)(source);

			var conditionsFailing = destinationConditionFailed || sourceConditionFailed;
			var destinationIsNotTouched = !destValue;
			var sourceValueDefined = angular.isDefined(sourceValue);

			if (sourceValueDefined && destinationIsNotTouched && !conditionsFailing) {
				$parse(values.dest).assign(dest, angular.copy(sourceValue));
			}
		}, this);

		return dest;
	};

	this.convertValues = function(mappings, serviceRequest) {
		function itemShouldBeMapped (item) {
			return !item.hasOwnProperty('setBooleanIfExists');
		}

		function isBooleanValue(item) {
			return item.modelType === 'boolean';
		}

		function convertBooleanValue(value) {
			switch (value.toLowerCase()) {
				case 'y':
					return true;
				case 'n':
					return false;
				default:
					return value;
			}
		}

		var data = {};

		mappings
			.filter(itemShouldBeMapped)
			.forEach(function(item) {
				var itemMappings = FieldMapping.extractFields(serviceRequest, item.serverPath, item.modelPath);

				if (!angular.isArray(itemMappings) || !itemMappings.length) {
					return;
				}

				itemMappings.forEach(function(itemMapping) {
					var value = $parse(itemMapping.sourcePath)(serviceRequest);

					if (isBooleanValue(item)) {
						value = convertBooleanValue(value);
					}

					if (value === null) {
						value = '';
					}

					this.fixArrayParse(itemMapping.targetPath, data);

					$parse(itemMapping.targetPath).assign(data, value);

				}, this);

			}, this);

		return data;
	};

	this.fixArrayParse = function(path, data) {
		if (path.match(/\[[0-9]+\]/)) {
			this.assignArray(path, data);
		}
	};

	this.assignArray = function(expression, data) {
		var parts = expression.split(/\[([0-9]+)\]/);
		var partsNum = parts.length;

		if (partsNum === 1) {
			return;
		}

		if (parts[partsNum - 1] === '') {
			parts.pop();
		}

		var isArrayIndex = function(index) {
			return parseInt(index, 10).toString() === index;
		};

		var jsonPath = '';

		parts.forEach(function(part) {
			if (!isArrayIndex(part)) {
				jsonPath += part;
				return;
			}

			var parsed = $parse(jsonPath);

			if (!angular.isArray(parsed(data))) {
				parsed.assign(data, []);
			}

			jsonPath += '[' + part + ']';
		});
	};

	this.enumToTitleMapFromMasterData = function(form, values) {
		var enm = form.schema['enum'];

		enm.length = 0;
		form.titleMap.length = 0;

		if (!form.schema.hasOwnProperty('masterData')) {
			$log.error('Field schema masterData are missing', form.schema, values);
			return;
		}

		form.schema.masterData.forEach(function(opt) {
			var found = this.findObjectByCode(values, opt.code);
			if (angular.isDefined(found)) {
				form.titleMap.push({
					name:  opt.name,
					value: opt.code
				});

				enm.push(opt.code);
			}
		}, this);

		if (!form.required) {
			enm.push(null);
		}
	};

	/**
	 * @deprecated remove when all loaders will be refactored
	 */
	this.enumToTitleMapFromObject = function(form, values) {
		var enm = form.schema['enum'];

		enm.length = 0;
		form.titleMap.length = 0;

		values.forEach(function(opt) {
			form.titleMap.push({
				name:  opt.name,
				value: opt.code
			});

			enm.push(opt.code);
		});

		if (!form.required) {
			enm.push(null);
		}
	};

	this.findObjectByCode = function(array, code) {
		return array.filter(function(obj) {
			return obj.masterCode === code;
		})[0];
	};

	this.triggerFormValidation = function(formCtrl) {
		var removeAngularProperties = function(key) {
			return (key[0] !== '$');
		};

		var removeNoneNgModelProperties = function(key) {
			return formCtrl[key].$name === key;
		};

		var validateFormFields = function(key) {
			var fieldCtrl = formCtrl[key];

			fieldCtrl.$validate();

			if (fieldCtrl.$invalid) {
				fieldCtrl.$setDirty();
			}
		};

		Object.keys(formCtrl)
			.filter(removeAngularProperties)
			.filter(removeNoneNgModelProperties)
			.forEach(validateFormFields);
	};
}

FormHelper.$inject = ['$log', '$q', '$parse', 'sfPath', 'XhrHelper', 'FieldMapping', 'FORM_HELPER'];
module.service('FormHelper', FormHelper);
