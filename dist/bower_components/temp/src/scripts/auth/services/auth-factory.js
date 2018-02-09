'use strict';

angular.module('TT-UI.Auth.AuthFactory', ['TT-UI.Auth.Services.FakeAuth', 'TT-UI.Auth.Services.OAuth'])
.factory('AuthFactory', ['FakeAuth', 'OAuth', function(FakeAuth, OAuth){
	return {
		get : function(authModuleName){
			switch (authModuleName){
				case 'FakeAuth' : return FakeAuth;
				case 'OAuth' : return OAuth;
				default: return OAuth;
			}
		}
	};
}]);
