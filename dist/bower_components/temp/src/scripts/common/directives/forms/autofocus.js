'use strict';

var module = angular.module('TT-UI.Common.Directives.Forms');

function autofocus($timeout) {
	return {
		restict: 'A',
		replace: false,
		scope: false,
		compile: function() {
			return {
				post: function(scope, el, attr) {
					if (!attr.autofocus) {
						return;
					}

					$timeout(function() {
						el[0].focus();
					}, 0);
				}
			};
		}
	};
}
autofocus.$inject = ['$timeout'];

module.directive(autofocus.name, autofocus);
