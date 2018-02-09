'use strict';

var module = angular.module('TT-UI.Common.Filters.RegExpFilter', []);

function escape() {
	var pattern = /[\.\?\*\+\^\$\[\]\\(\)\{\}\|\-]/g;
	var replacement = '\\$&';

	function escapeFilter(input) {
		return input.replace(pattern, replacement);
	}

	return escapeFilter;
}
module.filter(escape.name, escape);