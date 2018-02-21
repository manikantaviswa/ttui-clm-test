	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Services.Loaders.CommonMSISDNPrefixLoader', [
		'TT-UI.Common',
        'TT-UI-CLM.Common.Services.Loaders.AbstractLoader',
        'TT-UI-CLM.Common.Services.MSISDNPrefix'
	]);

	function CommonMSISDNPrefixLoaderFactory($q, $parse, AbstractLoader, getMSISDNPrefixFn) {

		var CommonMSISDNPrefixLoader = function(serviceDetails){
			this.serviceDetails = serviceDetails;
			/*this.activatedViaPath = activatedVia;
			this.msisdnCategoryPath = msisdnCategory;*/
		};
		/*CommonMSISDNPrefixLoader.prototype = Object.create(AbstractLoader.prototype);
		CommonMSISDNPrefixLoader.prototype.constructor = CommonMSISDNPrefixLoader;*/

		CommonMSISDNPrefixLoader.prototype.load = function(){
			/*var msisdnCategory = values[this.msisdnCategoryPath];
			var activatedVia = $parse(this.activatedViaPath)(formModel);*/
			return getMSISDNPrefixFn(this.serviceDetails).then(this._getData.bind(this));
		};

		CommonMSISDNPrefixLoader.prototype._getData = function(msisdnPrefixesData){
			var result = [];
			msisdnPrefixesData.forEach(function(msisdnPrefix){
				result.push({'name': msisdnPrefix, 'code': msisdnPrefix});
			});
			return result;
		};

		return function(serviceDetails){
			return new CommonMSISDNPrefixLoader(serviceDetails);
		};

	}

    CommonMSISDNPrefixLoaderFactory.$inject = ['$q', '$parse', 'AbstractLoader', 'getMSISDNPrefixFn'];
	module.factory('CommonMSISDNPrefixLoader', CommonMSISDNPrefixLoaderFactory);
