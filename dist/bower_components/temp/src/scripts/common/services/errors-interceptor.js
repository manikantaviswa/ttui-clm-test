'use strict';

angular.module('TT-UI.Common.Services.ErrorsInterceptor', [])

.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('ErrorsInterceptor');
}])

.constant('ERRORS_HANDLING', {
	ERRORS_PATH: 'response.errors.error',
	DEFAULT_ERROR_DESCRIPTION: 'Unknown Error',
	RESOURCE_FETCH_ERROR_EVENT: 'resourceFetchError'
})

.factory('emitErrorPopupFn', ['$rootScope', 'ERRORS_HANDLING', function($rootScope, ERRORS_HANDLING){
	return function(errors){
		$rootScope.$emit(ERRORS_HANDLING.RESOURCE_FETCH_ERROR_EVENT, errors);
	};
}])

.provider('ErrorsDictionary', function() {
	var errorsDictionary = {};

	this.setDictionary = function(dictionary) {
		errorsDictionary = dictionary.errors || {};
	};

	this.$get = function() {
		function getError(error) {
			return errorsDictionary[error.code] || errorsDictionary[error] || error.desc;
		}

		return {
			getError: getError,
			errorsDictionary: errorsDictionary
		};
	};
})

.factory('parseErrorsFn', ['$parse', '$log', 'ErrorsDictionary', 'ERRORS_HANDLING', function($parse, $log, ErrorsDictionary, ERRORS_HANDLING) {
	function getErrorDescription(error){
		var errorDescription = ErrorsDictionary.getError(error);

		if (angular.isUndefined(error.code) || angular.isUndefined(errorDescription)){
			$log.error('Backend Error Interceptor: Error Code or Error Description is undefined. code: ' + error.code + ', description: ' + errorDescription);
			errorDescription = ERRORS_HANDLING.DEFAULT_ERROR_DESCRIPTION;
		}

		return errorDescription;
	}

	return function(responseData){
		var errors = $parse(ERRORS_HANDLING.ERRORS_PATH)(responseData);

		return angular.isUndefined(errors) ? false : angular.isArray(errors) ?
			errors.map(function(error){
				return {
					code: error.code,
					description: getErrorDescription(error)
				};
			}) : errors;
	};
}])

.factory('ErrorsInterceptor', ['$q', 'parseErrorsFn', 'emitErrorPopupFn', function($q, parseErrorsFn, emitErrorPopupFn) {
	return {
		responseError: function(response) {
			var errors = parseErrorsFn(response && response.data);

			if (!errors) {
				return $q.reject(response);
			}

			emitErrorPopupFn(errors);
			return $q.reject(errors);
		}
	};
}]);
