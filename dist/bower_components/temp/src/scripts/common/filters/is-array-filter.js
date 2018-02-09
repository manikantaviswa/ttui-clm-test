'use strict';

angular.module('TT-UI.Common.Filters.IsArrayFilter', [])

.filter('isArray', [function() {
	return function(anArray, not) {
		var isArray = angular.isArray(anArray);

		return angular.isUndefined(not) ? isArray : !isArray;
	};
}]);
