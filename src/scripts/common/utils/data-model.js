
	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Utils.CommonDataModel', []);

	function CommonDataModelFactory($parse) {

		function CommonDataModel(source, mappings) {
			Object.defineProperty(this, 'source', {
				enumerable: false,
				value: source
			});
			Object.keys(mappings || {}).forEach(function(key) {
				this.addProperty(key, mappings[key]);
			}, this);
		}

        CommonDataModel.prototype.addProperty = function(name, mapping) {
			var accessor = $parse(mapping);
			Object.defineProperty(this, name, {
				get: function() {
					return accessor(this.source);
				}.bind(this),
				set: function(value) {
					accessor.assign(this.source, value);
				}.bind(this),
				enumerable: true
			});
		};

        CommonDataModel.prototype.getSource = function() {
			return this.source;
		};

		return {
			create: function(source, mappings) {
				return new CommonDataModel(source, mappings);
			}
		};

	}

    CommonDataModelFactory.$inject = ['$parse'];

	module.factory('CommonDataModel', CommonDataModelFactory);
