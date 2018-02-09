'use strict';

angular.module('TT-UI.Common.Spread', [])
	.config(['$provide', function ($provide) {
		// Taken from https://github.com/ThomasBurleson/angularjs-FlightDashboard/blob/master/lib/%24QDecorator.js

		// Partial application to build a resolve() function
		var resolveWith = function ($q) {
			return function resolved(val) {
				var dfd = $q.defer();
				dfd.resolve(val);

				return dfd.promise;
			};
		};

		// Register our $log decorator with AngularJS $provider

		$provide.decorator('$q', ['$delegate', function ($delegate) {
			if (angular.isUndefined($delegate.spread)) {
				// Let's add a `spread()` that is very useful
				// when using $q.all()

				$delegate.spread = function (targetFn, scope) {
					return function (results) {
						return targetFn.apply(scope, results);
					};
				};
			}

			if (angular.isUndefined($delegate.resolve)) {
				// Similar to $q.reject(), let's add $q.resolve()
				// to easily make an immediately-resolved promise
				// ... this is useful for mock promise-returning APIs.

				$delegate.resolve = resolveWith($delegate);
			}

			return $delegate;
		}]);
	}]);
