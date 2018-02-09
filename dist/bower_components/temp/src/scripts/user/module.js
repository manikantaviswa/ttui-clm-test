'use strict';

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
					$state.go(toState, toParams, {reload: true, notify: true});
				}
			});
		}
	});
}
moduleConfig.$inject = ['$rootScope', '$state', 'CONFIG', 'CurrentUser', 'UserInfoFactory', 'Permissions',  'FlashMessage'];
module.run(moduleConfig);
