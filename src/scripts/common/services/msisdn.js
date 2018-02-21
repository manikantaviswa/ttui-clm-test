	'use strict';

	angular.module('CLM-UI.Corporate.Services.MSISDN', [
		'TT-UI.Common.Tpl'
	])

		.constant('MSISDN_SETTINGS', {
			GET_MOBILE_NUMBERS_API:  'GetAvailableNumbers/json/query',
			GET_BY_TOKEN_API:        'GetMobileDetailsByReservationTokenRequest/json/query',
			BLOCK_API:               'BlockMSISDNRequest/json/',
			RELEASE_API:             'ReleaseMSISDNRequest/json/',
			BLOCK_CORP_API:          'BlockMSISDNBulkRequest/json/1',
			RELEASE_CORP_API:        'ReleaseMSISDBulkNRequest/json/1',
			SERVER_PAGE_SIZE:        100,
			UI_PAGE_SIZE:            10,
			RESPONSE_JSON_PATH:      'numbersList',
			SUCCESS_RESPONSE:        'SUCCESS',
			CACHE_ID:                'msisdnCache',
			SELECTION_TYPE_AUTO:     'Automatic',
			SELECTION_TYPE_MANUAL:   'Manual',
			SELECTION_TYPE_RESERVED: 'Reserved',
			PAGE_SIZE:        10
		})

		.factory('MSISDNNumberProvider', ['$q', '$cacheFactory', '$parse', 'commonRequestInventoryFn', 'MSISDN_SETTINGS', function($q, $cacheFactory, $parse, commonRequestInventoryFn, MSISDN_SETTINGS) {
			var msisdnCache = $cacheFactory(MSISDN_SETTINGS.CACHE_ID, {number: 10});
			var activeRequestsCache = {};
			var lastQuery;
			var isMoreButton = false;

			var getQueryParams = function(msisdnCategory, msisdn) {
				var page = 1;
				// If we are requesting data with the same parameters,
				// we increase page number and request next page, otherwise we reset to first page
				if (lastQuery && isMoreButton &&
					lastQuery.msisdnCategory === msisdnCategory &&
					lastQuery.msisdn === msisdn) {
					page = lastQuery.page + 1;
				}

				lastQuery = {
					msisdnCategory: msisdnCategory,
					msisdn: msisdn,
					page: page
				};
				return lastQuery;
			};

			var createCacheKey = function(msisdnCategory, msisdn) {
				return '' + msisdnCategory + '#' + msisdn;
			};

			return {
				requestNextPage: function(serviceDetails) {
					//var queryParams = getQueryParams(msisdnCategory, msisdn);

					/*var nmsOptions = {
						msisdnCategory: queryParams.msisdnCategory,
						pageNumber: queryParams.page,
						pageSize: pageSize || MSISDN_SETTINGS.SERVER_PAGE_SIZE,
						msisdn: queryParams.msisdn || ''
					};*/

					return commonRequestInventoryFn(MSISDN_SETTINGS.GET_MOBILE_NUMBERS_API, serviceDetails).then(function(results) {
						if (angular.isUndefined(results.mobileNumbersList)) {
							return $q.reject('Missing mobile numbers');
						}
						return $parse(MSISDN_SETTINGS.RESPONSE_JSON_PATH)(results);
					}, function(){
						return $q.reject('Missing mobile numbers');
					});
				},

				clearCache: function() {
					msisdnCache.removeAll();
				},

				getData: function(serviceDetails, msisdn) {
					var pageSize = $parse('pageSize')(serviceDetails);
					var deferred = $q.defer();
					//count = 0;
					var cacheKey = createCacheKey($parse('category')(serviceDetails), msisdn);
					delete msisdnCache[cacheKey];
					activeRequestsCache[cacheKey] = this.requestNextPage(serviceDetails).then(function(response) {
								/*var newData = (msisdnCache.get(cacheKey) || []).concat(response);*/
								msisdnCache.put(cacheKey, response);
								delete activeRequestsCache[cacheKey];
								deferred.resolve(response);
							}, function(error){
								return deferred.resolve(error);
							});
					return deferred.promise;
				},

				getNext: function(msisdnCategory, msisdn) {
					var deferred = $q.defer();
					var cacheKey = createCacheKey(msisdnCategory, msisdn);
					var data = (msisdnCache.get(cacheKey) || []);
					if (data.length === 0){
						this.isMoreButtonSelected(true);
						return this.getData(msisdnCategory, msisdn).then(function(numbers) {
							if (angular.isArray(numbers) && numbers.length){
								return numbers.splice(0,  MSISDN_SETTINGS.UI_PAGE_SIZE);
							} else {
								return numbers;
							}

						});
					}else {
						delete msisdnCache[cacheKey];
						var remainingNumbers;
						if (data.length === MSISDN_SETTINGS.SERVER_PAGE_SIZE){
							remainingNumbers = data.splice(MSISDN_SETTINGS.UI_PAGE_SIZE,  data.length - 1);
						}else {
							remainingNumbers = data;
						}
						msisdnCache.put(cacheKey, remainingNumbers);
						deferred.resolve(remainingNumbers.splice(0,  MSISDN_SETTINGS.UI_PAGE_SIZE) || []);
					}
					return deferred.promise;
				},

				getNumbers: function(serviceDetails, msisdn) {
					var cacheKey = createCacheKey($parse('category')(serviceDetails), msisdn);
					this.isMoreButtonSelected(false);
					var pageSize = $parse('pageSize')(serviceDetails);
					return this.getData(serviceDetails, msisdn).then(function(response) {
						if (angular.isArray(response) && response.length){
							delete msisdnCache[cacheKey];
							var numbers = angular.copy(response);
							msisdnCache.put(cacheKey, numbers);
							return response.splice(0,  MSISDN_SETTINGS.UI_PAGE_SIZE);
						} else {
							return response || [];
						}

					});
				},
				isMoreButtonSelected : function(more) {
					return isMoreButton = more;
				}
			};
		}])

		.factory('MSISDN', ['$q', '$parse', 'MSISDNNumberProvider', 'commonRequestInventoryFn', 'MSISDN_SETTINGS', function($q, $parse, MSISDNNumberProvider, commonRequestInventoryFn, MSISDN_SETTINGS) {

			var checkResponse = function(response) {
				if (response !== MSISDN_SETTINGS.SUCCESS_RESPONSE) {
					$q.reject('Missing response', response);
				}
				return response;
			};

			var checkIfNumberExist = function(number) {
				if (!number) {
					return $q.reject('Missing MSISDN number');
				}
				return $q.when(number);
			};

			var callBlockApi = function(number) {
				return callBlockAndReleaseApi(number, MSISDN_SETTINGS.BLOCK_API);
			};

			var callReleaseApi = function(number) {
				return callBlockAndReleaseApi(number, MSISDN_SETTINGS.RELEASE_API);
			};

			var callCorpBlockApi = function(numbers) {
				return callCorpBlockAndReleaseApi(MSISDN_SETTINGS.BLOCK_CORP_API, numbers);
			};

			function callCorpReleaseApi(numbers) {
				return callCorpBlockAndReleaseApi(MSISDN_SETTINGS.RELEASE_CORP_API, numbers);
			}

			function callBlockAndReleaseApi(number, type) {
				return commonRequestInventoryFn(type + number).then(checkResponse);
			}

			var callCorpBlockAndReleaseApi = function(apiPath, numbers) {
				var data = {
					msisdnNumber : numbers
				};
				if (!_.isEmpty($parse('msisdnNumber[0]')(data))) {
					return commonRequestInventoryFn(apiPath, data).then(checkResponse);
				}
			};

			var prepareGetOneNumberRequest = function(serviceDetails){
				/*if (!msisdnCategory){
					return $q.reject('Missing MSISDN category');
				}

				return $q.when({
					msisdnCategory: msisdnCategory,
					msisdn: msisdnPrefix || '',
					pageNumber: page || 1,
					hlrNumber: hlrNumber,
					pageSize: pageSize || 1
				});*/

				return serviceDetails;
			};

			var prepareGetByReservationTokenRequest = function(token, page) {
				if (!token){
					return $q.reject('Missing MSISDN Reservation Token');
				}

				return $q.when({
					resTokenNumber: token,
					hlrNumber: 1,
					pageNumber: page || 1,
					pageSize: MSISDN_SETTINGS.PAGE_SIZE || 1
				});
			};

			var prepareGetByReservationMsisdnRequest = function(token, msisdn) {
				if (!token){
					return $q.reject('Missing MSISDN Reservation Token');
				}

				return $q.when({
					resTokenNumber: token,
					msisdn: msisdn,
					hlrNumber: 1
				});
			};

			var callGetByReservationToken = function(options){
				return commonRequestInventoryFn(MSISDN_SETTINGS.GET_BY_TOKEN_API, options).then(function(response) {
					var numberList = $parse(MSISDN_SETTINGS.RESPONSE_JSON_PATH)(response);
					if (!angular.isArray(numberList)) {
						return $q.reject('Missing mobile number');
					}
					return numberList;
				});
			};

			var callGetMobileNumberApi = function(options){
				return commonRequestInventoryFn(MSISDN_SETTINGS.GET_MOBILE_NUMBERS_API, options).then(function(response) {
					var numberList = $parse(MSISDN_SETTINGS.RESPONSE_JSON_PATH)(response);
					if (!angular.isArray(numberList)) {
						return $q.reject('Missing mobile number');
					}
					return numberList;
				});
			};
			var fetchFirstNumberFromList = function(numbers){
				var firstNumber = numbers.shift();
				if (angular.isUndefined(firstNumber.mobileNumber)){
					return $q.reject('Missing mobile number');
				}
				return firstNumber;
			};

			return {

				getNumberFromCategory : function(category, prefix, hlrNumber){
					return prepareGetOneNumberRequest(category, prefix, 1, 1, hlrNumber)
						.then(callGetMobileNumberApi)
						.then(fetchFirstNumberFromList);
				},

				getNumbers: function(serviceDetails){
					return prepareGetOneNumberRequest(serviceDetails)
						.then(callGetMobileNumberApi);
				},

				getMoreItems: function(msisdnCategory, filter) {
					return MSISDNNumberProvider.getNext(msisdnCategory, filter, MSISDN_SETTINGS.UI_PAGE_SIZE);
				},

				getNumberByReservation: function(token, page) {
					return prepareGetByReservationTokenRequest(token, page)
						.then(callGetByReservationToken);
				},

				getNumberByReservationMsisdn: function(token, msisdn) {
					return prepareGetByReservationMsisdnRequest(token, msisdn)
						.then(callGetByReservationToken);
				},

				blockNumber: function(number) {
					return checkIfNumberExist(number).then(callBlockApi);
				},

				releaseNumber: function(number) {
					return checkIfNumberExist(number).then(callReleaseApi);
				},

				blockNumbers: function(number) {
					return checkIfNumberExist(number).then(callCorpBlockApi);
				},

				releaseNumbers: function(number) {
					return checkIfNumberExist(number).then(callCorpReleaseApi);
				},

				reserveNumberByCategory : function(category, prefix, hlrNumber){
					return this.getNumberFromCategory(category, prefix, hlrNumber).then(function(number){
						return this.blockNumber(number.mobileNumber).then(function(){
							return number;
						});
					}.bind(this));
				},

				isAutomaticMode: function(selectionType){
					return selectionType === MSISDN_SETTINGS.SELECTION_TYPE_AUTO;
				},

				isManualMode: function(selectionType){
					return selectionType === MSISDN_SETTINGS.SELECTION_TYPE_MANUAL;
				}
			};
		}]);
