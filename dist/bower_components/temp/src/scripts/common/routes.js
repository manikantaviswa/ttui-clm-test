'use strict';

angular.module('TT-UI.Common.Routes', [
	'TT-UI.Config',
	'TT-UI.Common.States'
])

.config(['$stateProvider', '$urlRouterProvider', 'CONFIG', function($stateProvider, $urlRouterProvider) {

	var redirectToHome = function($state, $timeout, CONFIG){
		$timeout(function(){
			$state.go(CONFIG.HOME_STATE);
		});
	};

	redirectToHome.$inject = ['$state', '$timeout', 'CONFIG'];

	$urlRouterProvider.when('', redirectToHome);
	$urlRouterProvider.when('/', redirectToHome);

	$stateProvider
		.state('index', {
			abstract: true,
			url: '/',
			label: ''
		});

}]);
