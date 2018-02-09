'use strict';

var module = angular.module('TT-UI.Common.Filters.ObjectFieldFilter', []);

function objectField() {
	return function(input, pattern, sourceField) {
		var filtered = [];

		pattern = (pattern || '').toLowerCase();

		angular.forEach(input, function(item) {
			var value = item[sourceField];

			if (value) {
				value = ('' + value).toLowerCase();

				if (value.indexOf(pattern) >= 0) {
					filtered.push(item);
				}
			}
		});

		return filtered;
	};
}
module.filter(objectField.name, objectField);