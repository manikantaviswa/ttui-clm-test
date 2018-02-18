/*! TT-UI-Navigation 0.0.33 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-navigation';
}

(function (window, angular, undefined) {
	"use strict";


// Source: src/scripts/ttui-navigation/module.js
angular.module('TT-UI.Navigation', [
	'ngAnimate',
	'ui.router',
	'ui.bootstrap.collapse',
	'ui.bootstrap.dropdown',
	'TT-UI.Navigation.Directives.Navigation'
]);


// Source: src/scripts/ttui-navigation/navigation.js
var module = angular.module('TT-UI.Navigation.Directives.Navigation', [
]);

// provider
function navigation() {
	/* jshint validthis: true */
	this.apiPath = 'navigation-apps.json';
	this.apiParams = [];
	this.apiMethod = 'GET';

	this.$get = function() {
		var provider = {};

		provider.apiPath = this.apiPath;
		provider.apiParams = this.apiParams;
		provider.apiMethod = this.apiMethod;

		provider.getApiPath = function() {
			return provider.apiPath;
		};

		provider.getApiParams = function() {
			return provider.apiParams;
		};

		provider.getApiMethod = function() {
			return provider.apiMethod;
		};

		return provider;
	};

	this.setApiPath = function(path) {
		this.apiPath = path;
	};

	this.setApiParams = function(params) {
		this.apiParams = params;
	};

	this.setApiMethod = function(method) {
		this.apiMethod = method;
	};

	/* jshint validthis: false */
}

module.provider('navigation', navigation);

function ttNavigation($rootScope, $timeout, $compile, $window, $log, $parse, navigateDataFactory) {
	return {
		restrict: 'E',
		scope: false,
		link: function(scope, element, attributes) {
			var appSwitcherEnabled = $rootScope.navigate.appSwitcherEnabled = false;

			if (angular.isDefined(attributes.appSwitcherEnabled)) {
				appSwitcherEnabled = $parse(attributes.appSwitcherEnabled)(scope);
				$rootScope.navigate.appSwitcherEnabled = appSwitcherEnabled;
			}

			$rootScope.navigate.apps = [{
				name: 'app 1',
				link: ''
			}];

			navigateDataFactory.query().then(function(result) {
				if (angular.isArray(result.data)) {
					$rootScope.navigate.apps = result.data;
				} else {
					appSwitcherEnabled = false;
				}
			}, function() {
				$log.warn('navigation: app switcher is not configured');
				appSwitcherEnabled = false;
			});

			var toggle = false;
			var body = angular.element(document).find('body');
			var switcherIcon = angular.element(element.find('.app-switcher'));

			var switcher = angular.element(
				'<nav class="navbar switcher-nav">' +
					'<ul class="nav nav-justified">' +
						'<li ng-click="navigate.switchApp(app.link)" ng-repeat="app in navigate.apps"><a ng-bind="app.name"></a></li>' +
					'</ul>' +
				'</nav>'
			);

			$rootScope.navigate.toggleAppSwitcher = function() {
				if (appSwitcherEnabled) {
					toggle = !toggle;
					body.toggleClass('switch-open', toggle);
					switcher.toggleClass('switcher-nav-open', toggle);
					switcherIcon.toggleClass('rotate', toggle);
				}
			};

			$rootScope.navigate.switchApp = function(link) {
				// TODO: permission check
				$rootScope.navigate.toggleAppSwitcher();
				$timeout(function() {
					$window.open(link, '_self');
				}, 1200);
			};

			// close switcher on scroll down
			angular.element($window).bind('scroll', function() {
				if (toggle) {
					if (this.pageYOffset >= 80) {
						$rootScope.navigate.toggleAppSwitcher();
					}
				}
			});

			// show when document is ready
			$timeout(function() {
				if (appSwitcherEnabled) {
					$compile(switcher)(scope);
					body.addClass('ttui-navigation-switch');
					body.prepend(switcher);
				}

				element.addClass('show');
			}, 0);
		}
	};
}

ttNavigation.$inject = ['$rootScope', '$timeout', '$compile', '$window', '$log', '$parse', 'navigateDataFactory'];
module.directive('ttNavigation', ttNavigation);

function navigateDataFactory(navigation, $http) {
	/* jshint validthis: true */
	this.query = function() {
		return $http({
			method: navigation.getApiMethod(),
			url: navigation.getApiPath() + '?' + navigation.getApiParams().join('&')
		});
	};

	return {
		query: this.query
	};
	/* jshint validthis: false */
}

navigateDataFactory.$inject = ['navigation', '$http'];
module.factory('navigateDataFactory', navigateDataFactory);

function navigateMainMenu($rootScope, $timeout, $state, $animate) {
	return {
		restrict: 'A',
		scope: true,
		link: function(scope, element, attrs) {

			if (!angular.isDefined($rootScope.navigate)) {
				$rootScope.navigate = {};
			}

			var menuState = attrs.navigateMainMenu;
			var defaultState = attrs.defaultState;

			$rootScope.$on('$stateChangeSuccess', function(event, toState) {
				if (toState.parent === menuState) {
					element.addClass('active');
				} else {
					element.removeClass('active');
				}
			});

			function onMouseLeave() {
				$rootScope.navigate.activeMenuTimeout = $timeout(hideMenu, 100);
			}

			function onMouseMove() {
				$rootScope.navigate.navHover = true;

				if ($rootScope.navigate.activeMenuTimeout) {
					$timeout.cancel($rootScope.navigate.activeMenuTimeout);
					$rootScope.navigate.activeMenuTimeout = null;
				}

				if ($rootScope.navigate.setMenuTimeout) {
					$timeout.cancel($rootScope.navigate.setMenuTimeout);
					$rootScope.navigate.setMenuTimeout = null;
				}

				$rootScope.navigate.setMenuTimeout = $timeout(showMenu, 100);
			}

			function showMenu() {
				$rootScope.navigate.navHover = true;

				if (menuState) {
					$rootScope.navigate.activeMenu = menuState;
				}
			}

			function hideMenu() {
				$rootScope.navigate.navHover = false;
				$rootScope.navigate.activeMenu = $rootScope.navigate.activeStateMenu;
			}

			function onClick() {
				if (defaultState) {
					$state.go(defaultState);
				}
			}

			$rootScope.navigate.activeMenu = $rootScope.navigate.activeStateMenu;

			function onHover() {
				if ($rootScope.navigate.activeMenu === menuState) {
					$animate.addClass(element, 'hover');
				} else {
					$animate.removeClass(element, 'hover');
				}
			}

			function onNavHover() {
				if ($rootScope.navigate.navHover === true) {
					$animate.addClass(element.parent(), 'nav-hover');
				} else {
					$animate.removeClass(element.parent(), 'nav-hover');
				}
			}

			element.on('mousemove', onMouseMove);
			element.on('mouseleave', onMouseLeave);
			element.on('click', onClick);

			scope.$watch('navigate.activeMenu', onHover);
			scope.$watch('navigate.navHover', onNavHover);

			scope.$on('$destroy', function() {
				element.off('mousemove', onMouseMove);
				element.off('mouseleave', onMouseLeave);
				element.off('click', onClick);
			});
		}
	};
}

navigateMainMenu.$inject = ['$rootScope', '$timeout', '$state', '$animate'];
module.directive('navigateMainMenu', navigateMainMenu);

function navigateMenuContent($rootScope, $animate) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {

			var menuState = attrs.navigateMenuContent;

			function onMenuChanged(value) {
				if (!menuState && !value) {
					$animate.removeClass(element, 'ng-hide');
				} else {
					if (value === menuState) {
						$animate.removeClass(element, 'ng-hide');
					} else {
						$animate.addClass(element, 'ng-hide');
					}
				}
			}

			scope.$watch('navigate.activeMenu', onMenuChanged);
		}
	};
}

navigateMenuContent.$inject = ['$rootScope', '$animate'];
module.directive('navigateMenuContent', navigateMenuContent);

function navigateMenuIcon($rootScope, $animate, $compile) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {

			if (!angular.isDefined($rootScope.navigate)) {
				$rootScope.navigate = {};
			}

			var spanElement = angular.element('<span class="glyphicon glyphicon-menu-right selection-bar"></span>');
			var iconState = attrs.navigateMenuIcon;

			element.append(spanElement);
			$compile(spanElement)(scope);

			function onSubMenuChanged() {
				iconState = attrs.navigateMenuIcon;
				if ($rootScope.navigate.activeSubMenu === iconState) {
					$animate.addClass(spanElement, 'selection-bar-slide');
				} else {
					$animate.removeClass(spanElement, 'selection-bar-slide');
				}
			}
			scope.$watch('navigate.activeSubMenu', onSubMenuChanged);
		}
	};
}

navigateMenuIcon.$inject = ['$rootScope', '$animate', '$compile'];
module.directive('navigateMenuIcon', navigateMenuIcon);

function navigateTipRoller($animate, $interval) {
	return {
		restrict: 'A',
		scope: true,
		link: function(scope, element, attrs) {

			var start, index = 0;
			scope.timer = 5000;

			if (attrs.navigateTipRoller) {
				scope.timer = attrs.navigateTipRoller;
			}

			scope.items = element.find('li');

			scope.hideItems = function() {
				if (scope.items.length > 0)  {
					angular.forEach(scope.items, function(item) {
						$animate.addClass(item, 'ng-hide');
					});
				}
			};

			scope.showItem = function() {
				scope.hideItems();
				if (scope.items.length > 0) {
					if (index >= scope.items.length) {
						index = 0;
					}
					$animate.removeClass(scope.items[index], 'ng-hide');
					index++;
				}
			};

			scope.hideItems();
			scope.showItem();
			start = $interval(scope.showItem, scope.timer);
			scope.$on('$destroy', function() {
				$interval.cancel(start);
			});
		}
	};
}

navigateTipRoller.$inject = ['$animate', '$interval'];
module.directive('navigateTipRoller', navigateTipRoller);

function navigateDisplayMode($window, $rootScope, $timeout) {
	return {
		template: '<div class="visible-xs"></div><div class="visible-sm"></div><div class="visible-md"></div><div class="visible-lg"></div>',
		restrict: 'E',
		replace: false,
		scope: true,
		link: function(scope, _element) {

			if (!angular.isDefined($rootScope.navigate)) {
				$rootScope.navigate = {};
			}

			scope.isVisible = function isVisible(element) {
				if (angular.isDefined(element)) {
					return element.css('display') === 'block';
				}
				return false;
			};

			scope.markers = _element.find('div');

			scope.update = function update() {
				angular.forEach(scope.markers, function(element) {
					var e = angular.element(element);
					if (scope.isVisible(e)) {
						var navigateDisplayMode = element.className;
						if (navigateDisplayMode === 'visible-xs') {
							$rootScope.navigate.navigateDisplayMode = 'mobile';
						} else if (navigateDisplayMode === 'visible-md') {
							$rootScope.navigate.navigateDisplayMode = 'tablet';
						} else if (navigateDisplayMode === 'visible-lg') {
							$rootScope.navigate.navigateDisplayMode = 'desktop';
						}
						return false;
					}
				});
			};

			angular.element($window).bind('resize', function() {
				$timeout(function() {
					scope.update();
				}, 100);
			});

			scope.update();
		}
	};
}

navigateDisplayMode.$inject = ['$window', '$rootScope', '$timeout'];
module.directive('navigateDisplayMode', navigateDisplayMode);

function navigateSticky($window, $timeout) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
			scope.update = function() {
				var offset = 0;
				if (attrs.navigateSticky) {
					offset = attrs.navigateSticky;
				}

				if ($window.pageYOffset <= 0) {
					element.removeClass('navbar-fixed-top');
				} else if ($window.pageYOffset >= offset) {
					element.addClass('navbar-fixed-top');
				}
			};

			angular.element($window).bind('scroll', function() {
				$timeout(function() {
					scope.update();
				}, 0);
			});
		}
	};
}

navigateSticky.$inject = ['$window', '$timeout'];
module.directive('navigateSticky', navigateSticky);

function navigateMobileMenu($rootScope, $injector) {

	function getCollapseDirective() {
		if ($injector.has('uibCollapseDirective')) {
			return 'uib-collapse';
		} else {
			return 'collapse';
		}
	}

	return {
		restrict: 'E',
		scope: {
			logoUrl: '@',
			logoText: '@'
		},
		transclude: true,
		// jscs:disable
		template: 
			'<nav class="ttui-navigation navbar navbar-default visible-xs">'+
				'<div class="container-fluid">'+
					'<div class="navbar-header">'+
						'<button type="button" class="navbar-toggle" ng-click="$root.navigate.collapsed = !$root.navigate.collapsed;" ng-class="{collapsed: $root.navigate.collapsed}">'+
							'<span class="sr-only">Toggle navigation</span>'+
							'<span class="icon-bar top-bar"></span>'+
							'<span class="icon-bar middle-bar"></span>'+
							'<span class="icon-bar bottom-bar"></span>'+
						'</button>'+
						'<a class="app-switcher navbar-brand" href tabindex="-1" ng-click="$root.navigate.toggleAppSwitcher();" ng-show="$root.navigate.appSwitcherEnabled">' +
							'<p class="navbar-text glyphicon glyphicon-th-large"></p>' +
						'</a>' +
						'<a class="navbar-brand" href ui-sref="home" tabindex="-1" ng-if="logoUrl">'+
							'<img ng-src="{{logoUrl}}"></img>'+
						'</a>'+
						'<a class="navbar-brand" href ui-sref="home" tabindex="-1" ng-if="logoText">'+
							'<p class="navbar-text logo-text" ng-bind="logoText"></p>'+
						'</a>'+
					'</div>'+
					'<div ' + getCollapseDirective() + '="$root.navigate.collapsed">'+
						'<ng-transclude></ng-transclude>'+
					'</div>'+
				'</div>'+
			'</nav>',
		// jscs:enable
		link: function(scope, element, attrs) {

			if (!angular.isDefined($rootScope.navigate)) {
				$rootScope.navigate = {};
			}

			$rootScope.navigate.collapse = function() {
				$rootScope.navigate.collapsed = true;
			};

			if (attrs.logoUrl) {
				scope.logoUrl = attrs.logoUrl;
			}
		}
	};
}

navigateMobileMenu.$inject = ['$rootScope', '$injector'];
module.directive('navigateMobileMenu', navigateMobileMenu);

function navigateMobileMenuItem($rootScope, $timeout) {
	return {
		restrict: 'E',
		scope: {
			collapseTrigger: '=',
			defaultState: '@',
			menuState: '@'
		},
		transclude: true,
		// jscs:disable
		template: 
			'<li navigate-main-menu="{{menuState}}" default-state="{{defaultState}}">'+
				'<ng-transclude ng-click="trigger()"></ng-transclude>'+
				'<span class="glyphicon pull-right" ng-class="{\'glyphicon-triangle-bottom\': !collapseTrigger, \'glyphicon-triangle-right\': collapseTrigger}"></span>'+
			'</li>',
		// jscs:enable
		link: function(scope) {
			scope.trigger = function() {
				if (!angular.isDefined(scope.collapseTrigger)) {
					scope.collapseTrigger = false;
				}
				scope.collapseTrigger = !scope.collapseTrigger;
			};

			scope.toCollapse = function() {
				if ($rootScope.navigate.activeMenu !== scope.menuState) {
					scope.trigger();
				}
			};

			// will fire when document is ready
			$timeout(scope.toCollapse, 0);
		}
	};
}

navigateMobileMenuItem.$inject = ['$rootScope', '$timeout'];
module.directive('navigateMobileMenuItem', navigateMobileMenuItem);

function navigateMobileMenuSubItem($rootScope) {
	return {
		restrict: 'E',
		scope: true,
		transclude: true,
		// jscs:disable
		template: '<li ui-sref-active="active" navigate-menu-icon="{{menuState}}"><a ng-click="collapse();" ng-transclude></a></li>',
		// jscs:enable
		link: function(scope, element, attrs) {
			scope.menuState = attrs.menuState;
			scope.collapse = function() {
				$rootScope.navigate.collapsed = true;
			};
		}
	};
}

navigateMobileMenuSubItem.$inject = ['$rootScope'];
module.directive('navigateMobileMenuSubItem', navigateMobileMenuSubItem);

return angular;
})(window, window.angular);