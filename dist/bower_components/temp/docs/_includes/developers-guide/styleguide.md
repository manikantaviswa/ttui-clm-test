# Code style guide

The goal of this style guide is to present a set of best practices and style guidelines for Tecnotree UI Library development.

In this style guide you won't find common guidelines for JavaScript development. For AngularJS development recommended is the [Google's JavaScript style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml).

**Note:** This chapter is based on open source [AngularJS Style Guide](https://github.com/mgechev/angularjs-style-guide). 

# General

## Project structure

Since a large AngularJS application has many components it's best to structure it in a directory hierarchy.
When creating this hierarchy following rules should be applied:
 
* high-level divisions should be set by functionality and lower-level divisions by component types.

  In this way the directory structure will look like:
  
  ```
  .
  ├── app
  │   ├── app.js
  │   ├── common
  │   │   ├── controllers
  │   │   ├── directives
  │   │   ├── filters
  │   │   └── services
  │   ├── home
  │   │   ├── controllers
  │   │   │   ├── first-ctrl.js
  │   │   │   └── second-ctrl.js
  │   │   ├── directives
  │   │   │   └── directive1.js
  │   │   ├── filters
  │   │   │   ├── filter1.js
  │   │   │   └── filter2.js
  │   │   └── services
  │   │       ├── service1.js
  │   │       └── service2.js
  │   └── about
  │       ├── controllers
  │       │   └── third-ctrl.js
  │       ├── directives
  │       │   ├── directive2.js
  │       │   └── directive3.js
  │       ├── filters
  │       │   └── filter3.js
  │       └── services
  │           └── service3.js
  ├── partials
  ├── lib
  └── test
  ```
	
* In case the directory name contains multiple words, use lisp-case syntax:

  ```
  app
   ├── app.js
   └── my-complex-module
       ├── controllers
       ├── directives
       ├── filters
       └── services
  ```

* That applies also to file names, e.g. ``wizard-ctrl.js``
* Each JavaScript file should only hold **a single component**. The file should be named with the component's name.
* Use AngularJS project structure template for [TT-UI](../generator).

Conventions about component naming can be found in each component section.

## Markup

[TLDR;](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-6-move-scripts-bottom-7200.html) Put the scripts at the bottom.

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MyApp</title>
</head>
<body>
  <div ng-app="myApp">
    <div ng-view></div>
  </div>
  <script src="angular.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

Keep things simple and put AngularJS specific directives later. This way is easy to look to the code and find enhanced HTML by the framework (what improve the maintainibility).

```
<form class="frm" ng-submit="login.authenticate()">
  <div>
    <input class="ipt" type="text" placeholder="name" require ng-model="user.name">
  </div>
</form>
```

Other HTML atributes should follow the Code Guide's [recommendation](http://mdo.github.io/code-guide/#html-attribute-order)

## Others

* Use:
    * `$timeout` instead of `setTimeout`
    * `$interval` instead of `setInterval`
    * `$window` instead of `window`
    * `$document` instead of `document`
    * `$http` instead of `$.ajax`

This will make your testing easier and in some cases prevent unexpected behaviour (for example, if you missed `$scope.$apply` in `setTimeout`).

* Automate your workflow using tools like:
    * [Yeoman](http://yeoman.io)
    * [Gulp](http://gulpjs.com)
    * [Grunt](http://gruntjs.com)
    * [Bower](http://bower.io)

* Use promises (`$q`) instead of callbacks. It will make your code look more elegant and clean, and save you from callback hell.
* Use an AngularJS pre-minifier ([ng-annotate](https://github.com/olov/ng-annotate)) for preventing problems after minification.
* Don't use globals. Resolve all dependencies using Dependency Injection, this will prevent bugs and monkey patching when testing.
* Do not pollute your `$scope`. Only add functions and variables that are being used in the templates.
* Prefer the usage of [controllers instead of `ngInit`](https://github.com/angular/angular.js/pull/4366/files). The only appropriate use of `ngInit` is for aliasing special properties of `ngRepeat`. Besides this case, you should use controllers rather than `ngInit` to initialize values on a scope. The expression passed to `ngInit` should go through lexing, parsing and evaluation by the Angular interpreter implemented inside the `$parse` service. This leads to:
    - Performance impact, because the interpreter is implemented in JavaScript
    - The caching of the parsed expressions inside the `$parse` service doesn't make a lot of sense in most cases, since `ngInit` expressions are often evaluated only once
    - Is error-prone, since you're writing strings inside your templates, there's no syntax highlighting and further support by your editor
    - No run-time errors are thrown
* Wrap complex expressions in functions in controller:

  ```html
  
  <div ng-if="pageCtrl.isSectionEnabled()">
  
  ```

* Do not use `$` prefix for the names of variables, properties and methods. This prefix is reserved for AngularJS usage.
* Keep following structure of the file:
	* create AngularJS module and store in local variable.
	* define service as named function.
	* when resolving dependencies through the DI mechanism of AngularJS, sort the dependencies by their type - the built-in AngularJS dependencies should be first, then 3rd party dependencies, followed by your custom ones.
	* prefer using ``$inject`` property annotation over brackets notation 
	* register service in module
	 
  ```javascript
  
  	var module = angular.module('App.Feature.Services.MyService', [
  		'ngResource',
  		'TT-UI.Common',
  		'TT-UI.User.Services.CurrentUser'
  		'App.Feature.Service.MyCustomService'
  	]);
  	
  	function MyService($rootScope, $timeout, CurrentUser, MyCustomService) {
  		/* your code goes here */
  	}  	
  	MyService.$inject = ['$rootScope', '$timeout', 'CurrentUser', 'MyCustomService'];
  	
  	module.service(MyService.name, MyService);
  	
  ```

# Modules

* Modules should be named with UpperCamelCase. For indicating that module `b` is submodule of module `a` you can nest them by using namespacing like: `a.b`.

	There are two common ways for structuring the modules:

	0. By functionality
	0. By component type

	Currently there's not a big difference, but the first way looks cleaner. Also, if lazy-loading modules is implemented (currently not in the AngularJS roadmap), it will improve the app's performance.
	
* Module name should contain correct namespace with following information included:
	* project codename
	* functionality
	* component type
	* component name
		
	For example: ``TT-UI.Common.Service.Api``.
	
# Controllers

* Do not manipulate DOM in your controllers, this will make your controllers harder for testing and will violate the [Separation of Concerns principle](https://en.wikipedia.org/wiki/Separation_of_concerns). Use directives instead.
* The naming of the controller is done using the controller's functionality (for example shopping cart, homepage, admin panel) and the substring `Ctrl` in the end.
* Controllers are plain javascript [constructors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor), so they will be named UpperCamelCase (`HomePageCtrl`, `ShoppingCartCtrl`, `AdminPanelCtrl`, etc.).
* The controllers should not be defined as globals (even though AngularJS allows this, it is a bad practice to pollute the global namespace).
* Use the following syntax for defining controllers:

  ```JavaScript
  function MyCtrl(dependency1, dependency2, ..., dependencyn) {
    // ...
  }
  module.controller(MyCtrl.name, MyCtrl);
  ```

  In order to prevent problems with minification, you can automatically generate the array definition syntax from the standard one using tools like [ng-annotate](https://github.com/olov/ng-annotate) (and grunt task [grunt-ng-annotate](https://github.com/mzgol/grunt-ng-annotate)).
  Please note that ``name`` property of the constructor function should be used to register controller in AngularJS module. 
* Prefer using `controller as` syntax:

  ```
  <div ng-controller="MainCtrl as main">
  	{% raw %} {{ main.title }} {% endraw %}
  </div>
  ```

  ```JavaScript
  app.controller(MainCtrl.name, MainCtrl);

  function MainCtrl () {
    this.title = 'Some title';
  }
  ```

  The main benefits of using this syntax:
  
  * Creates an 'isolated' component - binded properties are not part of `$scope` prototype chain. This is good practice since `$scope` prototype inheritance has some major drawbacks (this is probably the reason it was removed on Angular 2):
     * It is hard to track where data is coming from.
     * Scope's value changes can affect places you did not intend to affect.
     * Harder to refactor.
     * The '[dot rule](http://jimhoskins.com/2012/12/14/nested-scopes-in-angularjs.html)'.
  * Removes the use of `$scope` when no need for special operations (like `$scope.$broadcast`). This is a good preparation for AngularJS V2.
  * Syntax is closer to that of a 'vanilla' JavaScript constructor

   Digging more into `controller as`: [digging-into-angulars-controller-as-syntax](http://toddmotto.com/digging-into-angulars-controller-as-syntax/)
* If using array definition syntax, use the original names of the controller's dependencies. This will help you produce more readable code:

  ```JavaScript
  function MyCtrl(s) {
    // ...
  }
  MyCtrl.$inject = ['$scope'];
  module.controller(MyCtrl.name, MyCtrl);
  ```

   which is less readable than:

  ```JavaScript
  function MyCtrl($scope) {
    // ...
  }
  MyCtrl.$inject = ['$scope'];
  module.controller(MyCtrl.name, MyCtrl);
  ```

   This especially applies to a file that has so much code that you'd need to scroll through. This would possibly cause you to forget which variable is tied to which dependency.

* Make the controllers as lean as possible. Abstract commonly used functions into a service.
* Avoid writing business logic inside controllers. Delegate business logic to a `model`, using a service.
  For example:

  ```Javascript
  //This is a common behaviour (bad example) of using business logic inside a controller.
  var module = angular.module('Store', []);
  
  function OrderCtrl($scope) {
    $scope.items = [];

    $scope.addToOrder = function (item) {
      $scope.items.push(item);//-->Business logic inside controller
    };

    $scope.removeFromOrder = function (item) {
      $scope.items.splice($scope.items.indexOf(item), 1);//-->Business logic inside controller
    };

    $scope.totalPrice = function () {
      return $scope.items.reduce(function (memo, item) {
        return memo + (item.qty * item.price);//-->Business logic inside controller
      }, 0);
    };  
  }
  OrderCtrl.$inject = ['$scope'];
  
  module.controller(OrderCtrl.name, OrderCtrl);
  ```

  When delegating business logic into a 'model' service, controller will look like this (see 'use services as your Model' for service-model implementation):

  ```javascript
  //Order is used as a 'model'
  var module = angular.module('Store', [])
  
  function OrderCtrl(Order) {                    
	$scope.items = Order.items;

	$scope.addToOrder = function (item) {
	  Order.addToOrder(item);
	};

	$scope.removeFromOrder = function (item) {
	  Order.removeFromOrder(item);
	};

	$scope.totalPrice = function () {
	  return Order.total();
	};
  }
  OrderCtrl.$inject = ['Order'];
  
  module.controller(OrderCtrl.name, OrderCtrl);
  ```

  Why business logic / app state inside controllers is bad?
  
  * Controllers instantiated for each view and dies when the view unloads
  * Controllers are not reusable - they are coupled with the view
  * Controllers are not meant to be injected

* Communicate within different controllers using method invocation (possible when a child wants to communicate with its parent) or `$emit`, `$broadcast` and `$on` methods. The emitted and broadcasted messages should be kept to a minimum.
* Make a list of all messages which are passed using `$emit`, `$broadcast` and manage it carefully because of name collisions and possible bugs.

  Example:
    
  ```javascript
  // app.js
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  Custom events:
    - 'authorization-message' - description of the message
      - { user, role, action } - data format
        - user - a string, which contains the username
        - role - an ID of the role the user has
        - action - specific ation the user tries to perform
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  ```  
* When you need to format data encapsulate the formatting logic into a [filter](#filters) and declare it as dependency:

  ```JavaScript
  function myFormat() {
    return function () {
      // ...
    };
  }
  module.filter(myFormat.name, myFormat);  
  function MyCtrl($scope, myFormatFilter) {
    // ...
  }  
  module.controller(MyCtrl.name, MyCtrl);
  ```
* In case of nested controllers use "nested scoping" (the `controllerAs` syntax):
 
  **app.js**
  
  ```javascript
  
  function configFn($routeProvider) {
      $routeProvider
        .when('/route', {
          templateUrl: 'partials/template.html',
          controller: 'HomeCtrl',
          controllerAs: 'home'
        });
  }
  
  module.config(configFn);
  ```
  **HomeCtrl**
  
  ```javascript
  function HomeCtrl() {
    this.bindingValue = 42;
  }
  ```
  **template.html**
  
  ```
  <div ng-bind="home.bindingValue"></div>
  ```

# Directives

* Name your directives with lowerCamelCase. 
* Use `scope` instead of `$scope` in your link function. In the compile, post/pre link functions you have already defined arguments which will be passed when the function is invoked, you won't be able to change them using DI. This style is also used in AngularJS's source code.
* Use `tt` prefix for TTUI library directives, e.g. ``ttMagicThing``.
* Do not use `ng` or `ui` prefixes since they are reserved for AngularJS and AngularJS UI usage.
* DOM manipulations must be done only through directives.
* Create an isolated scope when you develop reusable components.
* Use directives as attributes or elements instead of comments or classes, this will make your code more readable.
* Use `scope.$on('$destroy', fn)` for cleaning up. This is especially useful when you're wrapping third-party plugins as directives.
  Another good example is unregistering listeners from $rootScope, e.g.
  
  ```javascript
  
  function MyCtrl($scope) {
  	var $rootScope = $scope.$root;
  	
  	var cleanUpListener = $rootScope.$on('oauth:loggedOut', function() {...});
  	
  	$scope.$on($destroy, cleanUpListener);
  }
  
  ```
* Do not forget to use `$sce` when you should deal with untrusted content.

# Filters

* Name your filters with lowerCamelCase.
* Make your filters as light as possible. They are called often during the `$digest` loop so creating a slow filter will slow down your app.
* Do a single thing in your filters, keep them coherent. More complex manipulations can be achieved by piping existing filters.

# Services

This section includes information about the service component in AngularJS. It is not dependent of the way of definition (i.e. as provider, `.factory`, `.service`), except if explicitly mentioned.

* Use camelCase to name your services.
  * UpperCamelCase (PascalCase) for naming your services, used as constructor functions i.e.:

    ```JavaScript
    function MainCtrl($scope, User) {
      $scope.user = new User('foo', 42);
    }

    module.controller(MainCtrl.name, MainCtrl);

    function User(name, age) {
      this.name = name;
      this.age = age;
    }

    module.factory(User.name, function () {
      return User;
    });
    ```

  * lowerCamelCase for all other services.
  * use ``Fn`` suffix for services implemented as function:
  
    ```javascript
    function makePaymentFn(data) {
    	//...
    }
    module.value(makePaymentFn.name, makePaymentFn); 
    ```

* Encapsulate all the business logic in services. Prefer using it as your `model`. For example:

  ```Javascript
  //Order is the 'model'
  var module = angular.module('Store');
  
  function Order() {
  	var add = function (item) {
   	  this.items.push (item);
    };
  
    var remove = function (item) {
      if (this.items.indexOf(item) > -1) {
        this.items.splice(this.items.indexOf(item), 1);
      }
    };
  
    var total = function () {
      return this.items.reduce(function (memo, item) {
        return memo + (item.qty * item.price);
      }, 0);
    };
  
    return {
      items: [],
      addToOrder: add,
      removeFromOrder: remove,
      totalPrice: total
    };
  }
  
  module.factory(Order.name, Order);
  ```

  See 'Avoid writing business logic inside controllers' for an example of a controller consuming this service.
* For session-level cache you can use `$cacheFactory`. This should be used to cache results from requests or heavy computations.
* If given service requires configuration define the service as provider and configure it in the `config` callback like:

  ```JavaScript
  var module = angular.module('demo', []);
  
  function sample() {
    var foo = 42;
    return {
      setFoo: function (f) {
    	foo = f;
      },
      $get: function () {
    	return {
    	  foo: foo
    	};
      }
    };
  }
  
  module.provider(sample.name, sample);

  var demo = angular.module('demo');
  
  demo.config(function (sampleProvider) {
    sampleProvider.setFoo(41);
  });
  ```

# Templates

* Use `ng-bind` or `ng-cloak` instead of simple {% raw %} `{{ }}` {% endraw %} to prevent flashing content.
* Avoid writing complex expressions in the templates.
* When you need to set the `src` of an image dynamically use `ng-src` instead of `src` with {% raw %} `{{ }}` {% endraw %} template.
* When you need to set the `href` of an anchor tag dynamically use `ng-href` instead of `href` with {% raw %} `{{ }}` {% endraw %} template.
* Instead of using scope variable as string and using it with `style` attribute with {% raw %} `{{ }}` {% endraw %}, use the directive `ng-style` with object-like parameters and scope variables as values:

  ```HTML
  <script>
  ...
  $scope.divStyle = {
    width: 200,
    position: 'relative'
  };
  ...
  </script>
  
  <div ng-style="divStyle">my beautifully styled div which will work in IE</div>;
  ```
* Use [one-time bindings](https://docs.angularjs.org/guide/expression#one-time-binding) whenever possible.

# Routing

* Use [ui-router](https://github.com/angular-ui/ui-router) instead of Angular's native solution.
* Use `resolve` to resolve dependencies before the view is shown.
* Do not place explicit RESTful calls inside the `resolve` callback. Isolate all the requests inside appropriate services. This way you can enable caching and follow the separation of concerns principle.

## i18n

* Use [`angular-translate`](https://github.com/angular-translate/angular-translate).

## Performance

* Optimize the digest cycle

	* Watch only the most vital variables. When required to invoke the `$digest` loop explicitly (it should happen only in exceptional cases), invoke it only when required (for example: when using real-time communication, don't cause a `$digest` loop in each received message).
	* For content that is initialized only once and then never changed, use single-time watchers like [`bindonce`](https://github.com/Pasvaz/bindonce) for older versions of AngularJS or one-time bindings in AngularJS >=1.3.0.
	* Make the computations in `$watch` as simple as possible. Making heavy and slow computations in a single `$watch` will slow down the whole application (the `$digest` loop is done in a single thread because of the single-threaded nature of JavaScript).
	* When watching collections, do not watch them deeply when not strongly required. Better use `$watchCollection`, which performs a shallow check for equility of the result of the watched expression and the previous value of the expression's evaluation.
	* Set third parameter in `$timeout` function to false to skip the `$digest` loop when no watched variables are impacted by the invocation of the `$timeout` callback function.
	* When dealing with big collections, which change rarely, [use immutable data structures](http://blog.mgechev.com/2015/03/02/immutability-in-angularjs-immutablejs/).
	* Use one-time binding within ``ng-repeate`` if collection on which it's based doesn't change:
	
	  ```javascript
	  <ul>
        <li ng-repeat="item in ::items | orderBy:'name'">
         {% raw %} {{ item.name }} {% endraw %}
        </li>
      </ul>
	  ```

* Consider decreasing number of network requests by bundling/caching html template files into your main javascript file, using [grunt-html2js](https://github.com/karlgoldstein/grunt-html2js) / [gulp-html2js](https://github.com/fraserxu/gulp-html2js). See [here](http://ng-learn.org/2014/08/Populating_template_cache_with_html2js/) and [here](http://slides.com/yanivefraim-1/real-world-angularjs#/34) for details. This is particularly useful when the project has a lot of small html templates that can be a part of the main (minified and gzipped) javascript file.
