'use strict';

angular.module('TT-UI.User.Services.OAuthUserInfo', [
	'ngResource',
	'TT-UI.Config'
])

.factory('UserInfoConfig', ['CONFIG', function(CONFIG){
	return {
		apiUrl : CONFIG.USER_SERVICE_API_URL,
		method : 'GET'
	};
}])

.factory('OAuthUserInfo', ['$resource', 'UserInfoConfig', function($resource, config) {
	return $resource(
		config.apiUrl, {}, {
			fetch: {
				method: config.method
			}
		}
	);
}]);
