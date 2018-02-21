	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Services.Loaders.AbstractLoader', []);

	function AbstractLoaderFactory(){

		var AbstractLoader = function(){};

		AbstractLoader.prototype.load = function() {
			throw new Error('load method must be implemented');
		};

		AbstractLoader.prototype.updateValues = function(ngModel, form, values){
			if (angular.isUndefined(form.schema) || !angular.isArray(values)){
				return;
			}

			form.titleMap = createTitleMap(values);
			form.schema.enum = createEnumList(values, form.required);

			if (ngModel.$invalid && ngModel.$error['tv4-1']) {
				ngModel.$setValidity('tv4-1', true);
			}
		};

		function createTitleMap(values){
			return values.map(function(item){
				return {
					name: item.name,
					value: item.code
				};
			});
		}

		function createEnumList(values, isRequired){
			var list =  values.map(function(item){
				return item.code;
			});
			if (!isRequired){
				list.push(null);
			}
			return list;
		}

		return AbstractLoader;
	}

	module.factory('AbstractLoader', AbstractLoaderFactory);