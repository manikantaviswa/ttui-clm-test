'use strict';

angular.module('TT-UI.Common.Errors', [
	'ui.router',
	'TT-UI.Common.Routes',
	'TT-UI.Common.Services.FlashMessage',
	'TT-UI.Common.Services.ErrorsInterceptor',
	'TT-UI.Common.ErrorMessageString'
])

.run(['$rootScope', '$log', 'ERRORS_HANDLING', 'FlashMessage', 'createErrorMessageString',
	function($rootScope, $log, ERRORS_HANDLING, FlashMessage, createErrorMessageString) {
	var stateChangeInProgress = false;

	function showFetchErrorPopups(errors){
		angular.forEach(errors, function(error){
			$log.error(error);
			FlashMessage.show('Error', error.description, 'danger');
		});
	}

	function isBackendError(error){
		return angular.isArray(error);
	}

	$rootScope.$on('$stateChangeStart', function(){
		stateChangeInProgress = true;
	});

	$rootScope.$on('$stateChangeSuccess', function(){
		stateChangeInProgress = false;
	});

	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
		stateChangeInProgress = false;

		if (isBackendError(error)){
			return showFetchErrorPopups(error);
		}

		var errorMessageString = createErrorMessageString(error);

		$log.error(errorMessageString);
		FlashMessage.show('Error', errorMessageString, 'danger');
	});

	$rootScope.$on(ERRORS_HANDLING.RESOURCE_FETCH_ERROR_EVENT, function(event, errors) {
		if (stateChangeInProgress){
			return;
		}

		showFetchErrorPopups(errors);
	});
}])
;
