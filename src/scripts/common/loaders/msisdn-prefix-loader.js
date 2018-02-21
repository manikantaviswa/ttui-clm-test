	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Services.Loaders.MSISDNPrefixLoader', [
		'TT-UI.Common',
        'TT-UI-CLM.Common.Services.Loaders.AbstractLoader',
        'TT-UI-CLM.Common.Services.MSISDNPrefix'
	]);

	function MSISDNPrefixLoaderFactory($q, $parse, AbstractLoader, getMSISDNPrefixFn) {

		var MSISDNPrefixLoader = function(serviceDetails){
			this.serviceDetails = serviceDetails;
			/*this.activatedViaPath = activatedVia;
			this.msisdnCategoryPath = msisdnCategory;*/
		};
		/*MSISDNPrefixLoader.prototype = Object.create(AbstractLoader.prototype);
		MSISDNPrefixLoader.prototype.constructor = MSISDNPrefixLoader;*/

		MSISDNPrefixLoader.prototype.load = function(){
			/*var msisdnCategory = values[this.msisdnCategoryPath];
			var activatedVia = $parse(this.activatedViaPath)(formModel);*/
			return getMSISDNPrefixFn(this.serviceDetails).then(this._getData.bind(this));
		};

		MSISDNPrefixLoader.prototype._getData = function(msisdnPrefixesData){
			var result = [];
			msisdnPrefixesData.forEach(function(msisdnPrefix){
				result.push({'name': msisdnPrefix, 'code': msisdnPrefix});
			});
			return result;
		};

		return function(serviceDetails){
			return new MSISDNPrefixLoader(serviceDetails);
		};

	}

	MSISDNPrefixLoaderFactory.$inject = ['$q', '$parse', 'AbstractLoader', 'getMSISDNPrefixFn'];
	module.factory('MSISDNPrefixLoader', MSISDNPrefixLoaderFactory);
