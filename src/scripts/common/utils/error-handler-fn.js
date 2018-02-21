
	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Utils.ErrorHandler', [
		'TT-UI.Common',
		'TT-UI.Common.ErrorMessageString'
	]);

	function ErrorHandlerFnFactory($q, $log, translateFilter, FlashMessage, createErrorMessageString) {
		var __ = translateFilter;

		function errorHandlerFn(errorMsg) {
			errorMsg = errorMsg || 'Unknown error';
			if (!angular.isArray(errorMsg)) {
				errorMsg = [errorMsg];
			}

			var errorMsgString;
			errorMsg.forEach(function(message) {
				errorMsgString = createErrorMessageString(message);
				$log.error(errorMsgString);
				FlashMessage.show(__('Error'), errorMsgString, 'danger');
			});

			return $q.reject(errorMsg);
		}

		return errorHandlerFn;
	}

	ErrorHandlerFnFactory.$inject = ['$q', '$log', 'translateFilter', 'FlashMessage', 'createErrorMessageString'];

	module.factory('errorHandlerFn', ErrorHandlerFnFactory);
