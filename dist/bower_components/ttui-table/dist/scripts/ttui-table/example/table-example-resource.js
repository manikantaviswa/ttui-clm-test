// http://lorenzofox3.github.io/smart-table-website/#section-pipe
// Table mock server
'use strict';

var module = angular.module('TT-UI.Table.Example.Resource', [
]);

function mock($q, $filter, $timeout) {

	//this would be the service to call your server, a standard bridge between your model an $http

	// the database (normally on your server)
	var serverItems = [];
	var shortDate = 'dd/MM/yyyy';
	var items = {
		summary: 'Summary content',
		products: [
			{
				code: 1212331,
				item1: 'Item 1 product name',
				item2: 'Item 2 product name'
			},
			{
				code: 122212331,
				item1: 'Item 3 product name',
				item2: 'Item 4 product name'
			}
		],
		services: [
			{
				code: 1212331,
				item1: 'Item 1 service name',
				item2: 'Item 2 service name'
			},
			{
				code: 122212331,
				item1: 'Item 3 service name',
				item2: 'Item 4 service name'
			}
		]
	};

	function randomDateAfterDate(start, days) {
		var date = new Date(start.getTime() + (Math.random() * days * 24 * 60 * 60 * 1000));
		return $filter('date')(date, shortDate);
	}

	function createRandomItem(code) {
		return {
			code: code,
			name: 'Bundle ' + code,
			description: 'Description ' + Math.floor(Math.random() * 100),
			dateFrom: randomDateAfterDate(new Date(2015, 0, 1), 100),
			dateTo: randomDateAfterDate(new Date(2015, 0, 1), 100),
			items: items
		};
	}

	for (var i = 0; i < 100; i++) {
		serverItems.push(createRandomItem(i));
	}

	//fake call to the server, normally this service would serialize table state to send it to the server (with query parameters for example) and parse the response
	//in our case, it actually performs the logic which would happened in the server
	function getPage(start, number, params) {
		var deferred = $q.defer();
		var filtered = params.search.predicateObject ? $filter('filter')(serverItems, params.search.predicateObject) : serverItems;

		// clear object references
		filtered = angular.copy(filtered);

		if (params.sort.predicate) {
			filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
		}

		var result = filtered.slice(start, start + number);

		$timeout(function() {
			//note, the server passes the information about the data set size
			deferred.resolve({
				data: result,
				numberOfPages: Math.ceil(filtered.length / number)
			});
		}, 1000);

		return deferred.promise;
	}

	return {
		getPage: getPage
	};
}

mock.$inject = ['$q', '$filter', '$timeout'];
module.factory('MockResource', mock);
