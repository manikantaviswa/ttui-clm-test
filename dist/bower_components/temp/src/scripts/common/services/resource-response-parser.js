'use strict';

angular.module('TT-UI.Common.Services.ResourceResponseParser', [])

.constant('RESOURCE_RESPONSE', {
	BODY_PATH: 'response.body'
})

.factory('resourceResponseParserFn', ['$parse', 'RESOURCE_RESPONSE', function($parse, RESOURCE_RESPONSE) {
	var parseResponseBody = function(response){
		return $parse(RESOURCE_RESPONSE.BODY_PATH)(response);
	};

	return function(response) {
		var responseBody = parseResponseBody(response);
		return angular.isDefined(responseBody) ? responseBody : response;
	};
}]);
