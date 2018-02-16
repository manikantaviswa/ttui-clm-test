/*! TT-UI Lib 0.6.24.19 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-user';
}

(function (window, angular, undefined) {
	"use strict";


// Source: src/scripts/user/module.js
var module =  angular.module('TT-UI.User', [
	'ui.router',
	'TT-UI.Config',
	'TT-UI.Common.Services.FlashMessage',
	'TT-UI.User.Services.CurrentUser',
	'TT-UI.User.Services.UserInfoFactory',
	'TT-UI.User.Services.Permissions'
]);

function moduleConfig($rootScope, $state, CONFIG, CurrentUser, UserInfoFactory, Permissions, FlashMessage) {
	var userInfoFetchService = UserInfoFactory.get(CONFIG.AUTH_MODULE);
	CurrentUser.clearData();

	$rootScope.User = CurrentUser;

	$rootScope.$watch('userAuthorized', function (userAuthorized) {
		if (!userAuthorized) {
			CurrentUser.clearData();
			return;
		}

		userInfoFetchService.$fetch()
			.then(CurrentUser.populateData)
			.catch(CurrentUser.clearData);
	});
	var bypass;
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
		if (angular.isString(toState.permission)) {
			if(bypass) {
				bypass = false;
				return;
			}
			event.preventDefault();
			CurrentUser.getPermissions().then(function (permissions) {
				if (!Permissions.hasUserPermission(toState.permission, permissions)) {
					FlashMessage.show('Error', 'It seems that you have tried to perform an operation which you are not permitted to perform. If you think this message is wrong, please contact admin', 'danger', true);
					$state.go(CONFIG.HOME_STATE);
				} else {
					bypass = true;
					$state.go(toState, toParams);
				}
			});
		}
	});
}
moduleConfig.$inject = ['$rootScope', '$state', 'CONFIG', 'CurrentUser', 'UserInfoFactory', 'Permissions',  'FlashMessage'];
module.run(moduleConfig);


// Source: src/scripts/user/services/current-user.js
var module = angular.module('TT-UI.User.Services.CurrentUser', [
	'TT-UI.Common.AngularStrap'
]);

function CurrentUser($q, moment) {
	var user;
	var deferred = $q.defer();
	var userPermissions;

	function getUserAttribute(attributeName, fallbackAttributeName) {
		if (!user){
			return null;
		}

		return user[attributeName] || user[fallbackAttributeName];
	}

	var getLoginTimeInDate = function(loginTimeValue) {
		var mnt = moment.getMoment();
		if(loginTimeValue){
			var momentValue = mnt(loginTimeValue, 'YYYYMMDDHHmmssZZ');
			var dateValue = new Date(momentValue).toUTCString();
			return dateValue;
		} else {
			return null;
		}
	};

	return {
		populateData: function(response) {
			user = response;
			var permissions = user && user.permissions ? user.permissions.split(',') : [];
			userPermissions = permissions;
			deferred.resolve(permissions);
		},

		clearData: function() {
			user = null;
			userPermissions = [];
		},

		getGivenName: getUserAttribute.bind({}, 'given_name', 'name'),
		getFamilyName: getUserAttribute.bind({}, 'family_name', 'name'),

		getFullName: function() {
			if (!user){
				return null;
			}

			if (user.given_name && user.family_name){
				return user.given_name + ' ' + user.family_name;
			}

			return user.name;
		},

		getLastLoginTime: function() {
			if (!user){
				return null;
			}
			if (user.login_time) {
				var loginTimeValues = user.login_time.split(',');
				var lastLoginTime = getLoginTimeInDate(loginTimeValues[1]);
				return lastLoginTime;
			}

			return null;
		},

		getCurrentLoginTime: function() {
			if (!user){
				return null;
			}
			if (user.login_time) {
				var loginTimeValues = user.login_time.split(',');
				var currentLoginTime = getLoginTimeInDate(loginTimeValues[0]);
				return currentLoginTime;
			}

			return null;
		},

		getLoginName: function() {
			return user && user.preferred_username ? user.preferred_username : null;
		},

		//this one works only for first .then, every next .then won't recieive permissions
		//TODO: use getPermissionsV2 this one is depricated
		getPermissions: function() {
			return deferred.promise;
		},

		getPermissionsV2: function () {
			var localDeferred = $q.defer();
			if (userPermissions) {
				localDeferred.resolve(userPermissions);
			} else {
				deferred.promise.then(function () {
					localDeferred.resolve(userPermissions);
				});
			}
			return localDeferred.promise;
		},

		getUserPhoto: function() {
			return user ? user.picture : null;
		},

		getUserLocation: function() {
			return user && user.location ? user.location : null;
		},

		getSalesChannel: function() {
			return 'CLM'; // TODO: Fix me
		},

		getOrganization: function() {
			return user && user.organization ? user.organization : null;
		},

		get : function(){
			return user ? {
				userName : this.getFullName(),
				loginName : this.getLoginName(),
				location: this.getUserLocation(),
				salesChannel: this.getSalesChannel(),
				lastLoginTime : this.getLastLoginTime(),
				currentLoginTime : this.getCurrentLoginTime(),
				organization: this.getOrganization()
			} : null;
		}
	};
}
CurrentUser.$inject = ['$q', 'moment'];
module.factory('CurrentUser', CurrentUser);


// Source: src/scripts/user/services/fake-user-info.js
var module = angular.module('TT-UI.User.Services.FakeUserInfo', []);

function FakeUserInfoProvider() {
	var userInfo;

	this.setFakeUserInfo = function(fakeUserInfo) {
		userInfo = fakeUserInfo;
	};

	function FakeUserInfo($q) {
		return function() {
			return {
				$fetch: function(){
					return $q.resolve(userInfo);
				}
			};
		};
	}
	FakeUserInfo.$inject = ['$q'];

	this.$get = FakeUserInfo;
}

module.provider('FakeUserInfo', FakeUserInfoProvider);

// Source: src/scripts/user/services/oauth-user-info.js
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


// Source: src/scripts/user/services/permissions.js
var module = angular.module('TT-UI.User.Services.Permissions', []);

function PermissionsProvider() {
	var mappings = {};

	this.setMappings = function(mappingsConf) {
		mappings = mappingsConf;
	};

	function Permissions($log) {
		function getMappedPermissionValue(permission) {
			var mappedPermission = mappings[permission];
			if (!mappedPermission) {
				$log.warn('Permission ' + permission + ' isn\'t mapped');
				mappedPermission = permission;
			}
			return mappedPermission;
		}

		function isPermissionCorrect (permission) {
			return angular.isString(permission) && permission !== '';
		}

		function replaceToRegularExpression(permission) {
			var pattern = permission.split('.').join('\\.');
			pattern = pattern.split('+').join('\\+');
			pattern = pattern.split('?').join('\\?');
			pattern = pattern.split('$').join('\\$');

			if (pattern.slice(-1) !== '*' ) {
				pattern += '$';
			}
			return new RegExp(pattern);
		}

		function hasUserPermission(permission, userPermissions) {
			var testedPermission = getMappedPermissionValue(permission);
			return angular.isArray(userPermissions) &&
				userPermissions.filter(isPermissionCorrect).some(
					function (userPermission) {
						if (userPermission === '*') {
							return true;
						}
						if (testedPermission.slice(-1) === '*' && userPermission.length > testedPermission.length) {
							return replaceToRegularExpression(testedPermission).test(userPermission);
						}
						return replaceToRegularExpression(userPermission).test(testedPermission);
					}
				);
		}

		return {
			hasUserPermission: hasUserPermission
		};
	}
	Permissions.$inject = ['$log'];

	this.$get = Permissions;
}
module.provider('PermissionsProvider'.replace('Provider', ''), PermissionsProvider);


// Source: src/scripts/user/services/user-info-factory.js
angular.module('TT-UI.User.Services.UserInfoFactory', [
	'TT-UI.User.Services.OAuthUserInfo',
	'TT-UI.User.Services.FakeUserInfo'
])
.factory('UserInfoFactory', ['OAuthUserInfo', 'FakeUserInfo', function(OAuthUserInfo, FakeUserInfo){
	return {
		get : function(authModuleName){
			switch (authModuleName){
				case 'FakeAuth' : return new FakeUserInfo();
				case 'OAuth' : return new OAuthUserInfo();
				default: return new OAuthUserInfo();
			}
		}
	};
}]);

return angular;
})(window, window.angular);