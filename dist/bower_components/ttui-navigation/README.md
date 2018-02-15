# TT-UI.Navigation

An AngularJS module that provides navigation menu for your application. Styles provided by [bootstrap-sass](https://github.com/twbs/bootstrap-sass).

# Quick links
- [Demo](#demo)
- [Installation](#installation)
    - [Bower](#install-with-bower)
- [Usage](#usage)
    - [Configure routes](#configure-routes)
    - [Include styles](#include-the-css-and-js-files)
    - [Add module dependency](#add-module-dependency)
    - [Include html](#include-html)
- [Support](#support)
    - [Found a bug?](#found-a-bug)

# Demo

Visit demo [page](http://10.4.11.11/ttui-navigation/#/).

# Installation

Component depends on [ngAnimate](https://docs.angularjs.org/api/ngAnimate) for transitions and animations, [ui.router](https://github.com/angular-ui/ui-router) for routing and [ui.bootstrap](https://github.com/angular-ui/bootstrap) for collapse/dropdown effects. Versions >=0.0.18 require angular-bootstrap version 1.x.

### Install with Bower
```sh
$ bower install git@git.tecnotree.com:tec_common/ttui-navigation.git
```
or
```sh
$ bower install http://git.tecnotree.com/tec_common/ttui-navigation.git
```

# Usage

### Configure routes:

Include onEnter and onExit attributes to your route configuration (each state and sub state). In home state clear all after setting, to show tip of the day.

```no-highlight
.state('home', {
	url: 'home',
	onEnter: ['$rootScope', function($rootScope) {
		$rootScope.navigate.activeStateMenu = $rootScope.navigate.activeMenu = 'home';
		$rootScope.navigate.activeStateMenu = $rootScope.navigate.activeMenu = undefined;
		$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = undefined;
	}]
})
.state('main-item-1', {
	url: '/main-item-1/',
	onEnter: ['$rootScope', function($rootScope) {
		$rootScope.navigate.activeStateMenu = $rootScope.navigate.activeMenu = 'main-item-1';
	}],
	onExit: ['$rootScope', function($rootScope) {
		$rootScope.navigate.activeStateMenu = $rootScope.navigate.activeMenu = undefined;
	}]
.state('offerings', {
	parent: 'main-item-1',
	url: 'main-item-1-sub-item-1',
	onEnter: ['$rootScope', function($rootScope) {
		$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = 'main-item-1-sub-item-1';
	}],
	onExit: ['$rootScope', function($rootScope) {
		$rootScope.navigate.activeStateSubMenu = $rootScope.navigate.activeSubMenu = undefined;
	}]
})
```

### Include the CSS and JS files:


```no-highlight
<!-- Just component bootstrap styles (+ bootstrap)-->
<link href="path/to/bootstrap.css" rel="stylesheet">
<link href="bower_components/ttui-navigation/dist/css/navigation.css" rel="stylesheet">
<!-- Or with component styles compiled with bootstrap -->
<link href="bower_components/ttui-navigation/dist/css/navigation-bootstrap.css" rel="stylesheet">
<!-- Or with ui-library -->
<link href="css/tecnotree-ui-library.css" rel="stylesheet">
<link href="css/navigation.css" rel="stylesheet">

<script type="text/javascript" src="bower_components/angular/angular.js"></script>
<script type="text/javascript" src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
<script type="text/javascript" src="bower_components/angular-bootstrap/ui-bootstrap.js"></script>
<script type="text/javascript" src="bower_components/angular-animate/angular-animate.js"></script>
<script type="text/javascript" src="bower_components/ttui-navigation/dist/scripts/ttui-navigation.js"></script>
```

#### Sass files also provided to compile within your project:

```no-highlight
@import "../bower_components/ttui-navigation/dist/sass/navigation-ext.scss";
```

### Add module dependency:

```no-highlight
var myapp = angular.module('myapp', ['TT-UI.Navigation']);
```

### Include HTML:

# Wrap navigation menus inside \<tt-navigation> -tag.

```no-highlight
<tt-navigation>
	<!-- Main menu -->
	<!-- Sub menu -->
	<!-- Mobile menu -->
</tt-navigation>
```

Main menu:


```no-highlight
	<!-- Main menu -->
	<nav class="ttui-navigation navbar navbar-default navbar-static-top hidden-xs">
		<div class="container-fluid">
			<div>
				<div class="navbar-header">
					<!-- desktop/mobile logo-->
					<a class="navbar-brand hidden-sm hidden-md" href ui-sref="home" tabindex="-1">
						<img src="images/upc-logo.png"></img>
					</a>
					<!-- tablet/small screen logo-->
					<a class="navbar-brand visible-sm visible-md" href ui-sref="home" tabindex="-1">
						<img src="images/upc-logo-short.png"></img>
					</a>
				</div>
				<ul class="nav navbar-nav">
					<li class="top-nav-item" navigate-main-menu="home" default-state="home">
						<a href tabindex="-1">home</a>
					</li>
					<li class="top-nav-item" navigate-main-menu="main-item-1" default-state="main-item-1-sub-item-1">
						<a href tabindex="-1">main-item-1</a>
					</li>
					<li class="top-nav-item" navigate-main-menu="main-item-2" default-state="main-item-2">
						<a href tabindex="-1">main-item-2</a>
					</li>
				</ul>
				<!-- user menu -->
				<ul class="nav navbar-nav navbar-right">
					<li class="top-nav-item" navigate-main-menu="settings" default-state="configuration">
						<a href tabindex="-1">
							<span class="glyphicon glyphicon-cog nav-icon-large"></span>
						</a>
					</li>
					<li class="dropdown" uib-dropdown>
						<a href class="dropdown-toggle" tabindex="-1" uib-dropdown-toggle>
							<span class="glyphicon glyphicon-user nav-icon-large"></span>
							<span class="icon-padding hidden-sm hidden-md">User Name</span>
							<span class="glyphicon glyphicon-triangle-bottom"></span>
						</a>
						<ul class="dropdown-menu" role="menu">
							<li>
								<a href tabindex="-1">Change Language</a>
							</li>
							<li>
								<a href tabindex="-1">Change Password</a>
							</li>
							<li class="divider"></li>
							<li>
								<a href tabindex="-1">Logout</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<!-- / Main menu -->
```


Sub menu:


```no-highlight
	<!-- Sub items -->
	<nav class="ttui-navigation navbar navbar-default hidden-xs" navigate-main-menu="" navigate-sticky="50">
		<div class="container-fluid">
			<!-- tip roller -->
			<ul class="nav navbar-nav" navigate-menu-content navigate-tip-roller>
				<li class="navigation-tip ng-hide">
					<a tabindex="-1">Start by selecting any of the links above</a>
				</li>
				<li class="navigation-tip ng-hide">
					<a tabindex="-1">Tip of the day #1</a>
				</li>
			</ul>
			<!-- / tip roller -->
			<ul class="nav navbar-nav ng-hide" navigate-menu-content="main-item-1">
				<li ui-sref-active="active" navigate-menu-icon="main-item-1-sub-item-1">
					<a ui-sref="main-item-1-sub-item-1" tabindex="-1">main-item-1-sub-item-1</a>
				</li>
				<li ui-sref-active="active" navigate-menu-icon="main-item-1-sub-item-2">
					<a ui-sref="main-item-1-sub-item-2" tabindex="-1">main-item-1-sub-item-2</a>
				</li>
			</ul>
			<ul class="nav navbar-nav ng-hide" navigate-menu-content="settings">
				<li ui-sref-active="active" navigate-menu-icon="configuration">
					<a ui-sref="configuration" tabindex="-1">Configuration</a>
				</li>
			</ul>
		</div>
	</nav>
	<!-- / Sub items -->
```


Mobile menu:


```no-highlight
	<!-- Mobile menu -->
	<navigate-mobile-menu logo-url="images/path/logo.png">
		<ul class="navigation-mobile">
			<!-- mobile menu for offering elements -->
			<navigate-mobile-menu-item menu-state="main-menu-1" default-state="sub-menu-1" collapse-trigger="navigate.collapseMain1">
				<a href tabindex="-1">Main menu 1</a>
			</navigate-mobile-menu-item>
			<!-- mobile sub menu for offering elements -->
			<ul uib-collapse="navigate.collapseMain1">
				<navigate-mobile-menu-sub-item menu-state="sub-menu-1">
					<a ui-sref="sub-menu-1" tabindex="-1">sub-menu-1</a>
				</navigate-mobile-menu-sub-item>
				<navigate-mobile-menu-sub-item menu-state="sub-menu-2">
					<a ui-sref="sub-menu-2" tabindex="-1">sub-menu-2</a>
				</navigate-mobile-menu-sub-item>
				<navigate-mobile-menu-sub-item menu-state="sub-menu-3">
					<a ui-sref="sub-menu-3" tabindex="-1">sub-menu-3</a>
				</navigate-mobile-menu-sub-item>
			</ul>
		</ul>
		<ul class="nav navbar-nav navbar-right">
			<li>
				<a ui-sref="configuration" tabindex="-1" ng-click="navigate.collapse();">
					<span class="glyphicon glyphicon-cog nav-icon-large"></span>
					<span class="icon-padding">
						<span>Configuration</span>
					</span>
				</a>
			</li>
			<li class="dropdown" uib-dropdown>
				<a href class="dropdown-toggle" tabindex="-1" uib-dropdown-toggle>
					<span class="glyphicon glyphicon-user nav-icon-large"></span>
					<span class="icon-padding" ng-if="userAuthorized" ng-bind="User.getUserName()"></span>
					<span class="glyphicon glyphicon-triangle-bottom pull-right"></span>
				</a>
				<ul class="dropdown-menu" role="menu">
					<li><a href tabindex="-1">Change Language</a></li>
					<li><a href tabindex="-1">Change Password</a></li>
					<li class="divider"></li>
					<li><a href tabindex="-1">Logout</a></li>
				</ul>
			</li>
		</ul>
	</navigate-mobile-menu>
	<!-- / Mobile menu -->
```

#### More detailed example code can be found from [dist/index.html](http://git.tecnotree.com/tec_common/ttui-navigation/blob/master/dist/index.html) and [dist/app.js](http://git.tecnotree.com/tec_common/ttui-navigation/blob/master/dist/app.js)

# Support

### Found a Bug?

Report an issue [here](http://git.tecnotree.com/tec_common/ttui-navigation/issues).