
	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Api.Inventory.CommonInventoryRequestApi', [
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Api.Inventory.CommonRequestInventory'
	]);

	function commonInventoryRequestApiFactory($q, Assert, commonRequestInventoryFn) {

		function commonInventoryRequestApiFn(URL, model) {
			//Assert.isDefined(model.serviceNumbers, 'Mandatory input number not given or empty.');
			return commonRequestInventoryFn(URL , model).then(function(data){
				return data;
			}, function(error){
				return $q.reject(error);
			});
		}

		return commonInventoryRequestApiFn;
	}

    commonInventoryRequestApiFactory.$inject = ['$q', 'Assert', 'commonRequestInventoryFn'];

	module.factory('commonInventoryRequestApiFn', commonInventoryRequestApiFactory);
