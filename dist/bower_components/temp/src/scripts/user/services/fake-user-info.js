'use strict';

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