define([
	'angular',
	'ttui-common',
	'ttui-common.tpl',
	'common/services/common-utility'

], function(angular) {
	'use strict';

	angular.module('CLM-UI.Common.Services.GetAutoDebitDetails', [
		'TT-UI.Common',
		'TT-UI.Common.Tpl',
		'CLM-UI.Common.Services.CommonUtility'
	])
		.constant('GET_AUTO_DEBIT_DETAIL', {
			CACHE_STORAGE_NS: 'loginUserInfo',
			API_NAME: 'GetAutoDebitDetails',
			API_METHOD: 'PUT'
		})
		.factory('GetAutoDebitDetails', GetAutoDebitDetails);

	GetAutoDebitDetails.$inject = ['GET_AUTO_DEBIT_DETAIL', '$q', 'Api', 'ResourceFactory', 'LoginUserInfo', 'store', '$parse', 'SR_API_CONFIG'];

	function GetAutoDebitDetails(GET_AUTO_DEBIT_DETAIL, $q, Api, ResourceFactory, LoginUserInfo, store, $parse, SR_API_CONFIG) {
		function getAutoDebitDetails() {
			var deferred = $q.defer();
			var sessionStorage = store.getNamespacedStore(null, 'sessionStorage');
			var loginUserData = sessionStorage.get(GET_AUTO_DEBIT_DETAIL.CACHE_STORAGE_NS);
			var userInfo = JSON.parse(localStorage.getItem('ngStorage-token'));

			var requestData = {
				'accountPendingCharges': {
					'filter': [{
						'key': 'accountCode',
						'value': $parse('accountCode')(userInfo)
					}],
					'userDetails':{
						'loginName': $parse('preferred_username')(loginUserData),
						'userName': $parse('given_name')(loginUserData)
					},
					salesDetails: {
						'salesChannel': {'masterCode': $parse('getSalesChannel')(LoginUserInfo)}
					}
				}
			};



			var sendRequest = function(data) {
				var apiService = ResourceFactory(Api.getUrl(), SR_API_CONFIG.SR_API_PATH + GET_AUTO_DEBIT_DETAIL.API_NAME + SR_API_CONFIG.JSON_QUERY, GET_AUTO_DEBIT_DETAIL.API_METHOD);
				return apiService.fetch(data).$promise;
			};

			sendRequest(requestData).then(function (response) {
				deferred.resolve(response);
			});

			return deferred.promise;
		}



		return {
			GetAutoDebitDetails: getAutoDebitDetails
		};

	}
});
