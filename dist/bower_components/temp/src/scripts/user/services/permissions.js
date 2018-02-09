'use strict';

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
