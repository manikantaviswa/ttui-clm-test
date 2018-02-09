'use strict';

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

		getUserGroup: function () {
			return user ? user.group : null;
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
				organization: this.getOrganization(),
				group: this.getUserGroup()
			} : null;
		}
	};
}
CurrentUser.$inject = ['$q', 'moment'];
module.factory('CurrentUser', CurrentUser);
