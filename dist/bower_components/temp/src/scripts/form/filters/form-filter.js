'use strict';

var module = angular.module('TT-UI.Form.Filters.FormFilter', [
	'schemaForm'
]);

function formFilter (
	$injector,
	$log
) {
	return function(input, scope, model, form) {
		var result;

		if (form.filter){
			result = applyFilter(form.filter, input, scope, model);
		}

		return result || input;
	};

	function applyFilter(filterName, input, scope, model){
		var filter = getFilter(filterName);

		if (filter){
			return filter(input, scope, model);
		}
	}

	function getFilter(filterName) {
		try {
			return $injector.get(filterName + 'Filter');
		} catch (e){
			$log.error('No filter with the given name found: ' + filterName);
		}
	}
}

formFilter.$inject = [
	'$injector',
	'$log'
];
module.filter('form', formFilter);
