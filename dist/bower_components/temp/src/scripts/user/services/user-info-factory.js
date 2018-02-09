'use strict';

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
