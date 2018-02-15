'use strict';

angular.module('NavigationDemo', [
	'TT-UI.Navigation'])

.config(['$stateProvider', 'navigationProvider', function($stateProvider, navigationProvider) {
	$stateProvider.state('home', {
		url: 'home',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateMenu = $rootScope.navigate.activeMenu = 'home';
			$rootScope.navigate.activeStateMenu = $rootScope.navigate.activeMenu = undefined;
			$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = undefined;
		}]
	})
	// ---
	.state('settings', {
		url: '/settings/',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateMenu = $rootScope.navigate.activeMenu = 'settings';
		}],
		onExit: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateMenu = $rootScope.navigate.activeMenu = undefined;
		}]
	})
	.state('configuration', {
		url: 'configuration',
		parent: 'settings',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = 'configuration';
		}],
		onExit: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = undefined;
		}]
	})
	// ---
	.state('offering-items', {
		url: '/offering/',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateMenu = $rootScope.navigate.activeMenu = 'offering-items';
		}],
		onExit: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateMenu = $rootScope.navigate.activeMenu = undefined;
		}],
		views: {
			'demo@': {
				controller: 'demoCtrl',
				template: 
				'<div class="col-md-12">' +
					'<div class="col-md-12">' +
						'<div class="panel panel-default" style="opacity: .85;">' +
							'<div class="panel-heading">Offering Elements</div>' + 
							'<div class="panel-body" style="height: 100px;">content</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			}
		}
	})
	.state('offerings', {
		parent: 'offering-items',
		url: 'offerings',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = 'offerings';
		}],
		onExit: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = undefined;
		}],
		views: {
			'demo@': {
				controller: 'demoCtrl',
				template: 
				'<div class="col-md-12">' +
					'<div class="col-md-12">' +
						'<div class="panel panel-default" style="opacity: .85;">' +
							'<div class="panel-heading">Offerings</div>' + 
							'<div class="panel-body">content</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			}
		}
	})
	.state('products', {
		parent: 'offering-items',
		url: 'products',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = 'products';
		}],
		views: {
			'demo@': {
				controller: 'demoCtrl',
				template: 
				'<div class="col-md-12">' +
					'<div class="col-md-12">' +
						'<div class="panel panel-default" style="opacity: .85;">' +
							'<div class="panel-heading">Products</div>' + 
							'<div class="panel-body">content</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			}
		}
	})
	.state('services', {
		parent: 'offering-items',
		url: 'services',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = 'services';
		}],
		views: {
			'demo@': {
				controller: 'demoCtrl',
				template: 
				'<div class="col-md-12">' +
					'<div class="col-md-12">' +
						'<div class="panel panel-default" style="opacity: .85;">' +
							'<div class="panel-heading">Services</div>' + 
							'<div class="panel-body">content</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			}
		}
	})
	.state('bundles', {
		parent: 'offering-items',
		url: 'bundles',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = 'bundles';
		}],
		views: {
			'demo@': {
				controller: 'demoCtrl',
				template: 
				'<div class="col-md-12">' +
					'<div class="col-md-12">' +
						'<div class="panel panel-default" style="opacity: .85;">' +
							'<div class="panel-heading">Bundles</div>' + 
							'<div class="panel-body">content</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			}
		}
	})
	// ---
	.state('resource-items', {
		url: '/resource/',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateMenu = $rootScope.navigate.activeMenu = 'resource-items';
		}],
		onExit: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateMenu = $rootScope.navigate.activeMenu = undefined;
		}],
		views: {
			'demo@': {
				controller: 'demoCtrl',
				template: 
				'<div class="col-md-12">' +
					'<div class="col-md-12">' +
						'<div class="panel panel-default" style="opacity: .85;">' +
							'<div class="panel-heading">Resources</div>' + 
							'<div class="panel-body" style="height: 200px;">content</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			}
		}
	})
	.state('resources', {
		parent: 'resource-items',
		url: 'resources',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = 'resources';
		}]
	})
	.state('composite-resources', {
		parent: 'resource-items',
		url: 'composite-resources',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = 'composite-resources';
		}]
	})
	.state('resource-attributes', {
		parent: 'resource-items',
		url: 'resource-attributes',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = 'resource-attributes';
		}]
	})
	.state('resource-templates', {
		parent: 'resource-items',
		url: 'resource-templates',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = 'resource-templates';
		}]
	})
	// ---
	.state('commercial-items', {
		url: '/commercial/',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateMenu = $rootScope.navigate.activeMenu = 'commercial-items';
		}],
		onExit: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateMenu = $rootScope.navigate.activeMenu = undefined;
		}],
		views: {
			'demo@': {
				controller: 'demoCtrl',
				template: 
				'<div class="col-md-12">' +
					'<div class="col-md-12">' +
						'<div class="panel panel-default" style="opacity: .85;">' +
							'<div class="panel-heading">Commercials</div>' + 
							'<div class="panel-body" style="height: 300px;">content</div>' +
						'</div>' +
					'</div>' +
				'</div>'
			}
		}
	})
	.state('tariffs', {
		parent: 'commercial-items',
		url: 'tariffs',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = 'tariffs';
		}]
	})
	.state('discounts', {
		parent: 'commercial-items',
		url: 'discounts',
		onEnter: ['$rootScope', function($rootScope) {
			$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = 'discounts';
		}]
	});

	//navigationProvider.setApiMethod('GET');
	// navigationProvider.setApiParams([
	// 	'param=value',
	// 	'myparam=myvalue'
	// ]);
	navigationProvider.setApiPath('navigation-apps.json');
}])

.controller('demoCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

		// fake user stuff
		$scope.userAuthorized = true;

		$scope.User = {
			getUserName: function () {
				return 'Fooooooooo Bar';
			},
			getUserPhoto: function () {
				return 'images/avatar.png';
			}

		};

		console.log('demo app loaded');
	}
])

;
