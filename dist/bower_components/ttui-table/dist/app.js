'use strict';

angular.module('TableDemo', [
	'TT-UI.Table.Example.Controller', // example table controller
	'TT-UI.Table'])

.controller('demoCtrl', ['$scope', function($scope) {
		$scope.data = [
			{
				code: 234123,
				name: 'John1',
				description: 'Description of aaa',
				date: '10/10/1990',
				invoice: 3050,
				upfront: 30,
				items: [
					{
						code: 1134234,
						name: 'John',
						date: '10/10/1990',
						invoice: 1550,
						upfront: 15,
						item1: 'Item 1 name',
						item2: 'Item 2 name aaa bbb ccc ddd eee fff hhh',
						tax: '10%'
					},
					{
						code: 123423,
						name: 'John',
						date: '10/10/1990',
						invoice: 1500,
						upfront: 15,
						item1: 'Item 1 name',
						item2: 'Item 2 name',
						tax: '10%'
					}
				]
			},
			{
				code: 23211,
				name: 'John2',
				description: 'Description of aaa bbb ccc ddd',
				date: '10/11/1991',
				invoice: 1500,
				upfront: 45,
				items: [
					{
						code: 1163135,
						name: 'John',
						date: '11/10/1990',
						invoice: 500,
						upfront: 15,
						item1: 'Item 1 name',
						item2: 'Item 2 name',
						tax: '10%'
					},
					{
						code: 1264245,
						name: 'John',
						date: '12/10/1990',
						invoice: 500,
						upfront: 15,
						item1: 'Item 1 name',
						item2: 'Item 2 name',
						tax: '10%'
					},
					{
						code: 1362345,
						name: 'John',
						date: '13/10/1990',
						invoice: 500,
						upfront: 15,
						item1: 'Item 1 name',
						item2: 'Item 2 name',
						tax: '10%'
					}
				]
			},
			{
				code: 314545,
				name: 'John3',
				description: 'Description of bbb',
				date: '10/12/1992',
				invoice: 2000,
				upfront: 60,
				items: [
					{
						code: 3455433,
						name: 'John',
						date: '11/10/1990',
						invoice: 500,
						upfront: 20,
						item1: 'Item 1 name',
						item2: 'Item 2 name',
						tax: '10%'
					},
					{
						code: 533355,
						name: 'John',
						date: '12/10/1990',
						invoice: 500,
						upfront: 20,
						item1: 'Item 1 name',
						item2: 'Item 2 name',
						tax: '10%'
					},
					{
						code: 23231233,
						name: 'John',
						date: '13/10/1990',
						invoice: 1000,
						upfront: 20,
						item1: 'Item 1 name',
						item2: 'Item 2 name',
						tax: '10%'
					}
				]
			},
			{
				code: 4452345,
				name: 'John4',
				description: 'Description of ccc',
				date: '10/12/1993',
				invoice: 150,
				upfront: 55,
				items: [
					{
						code: 234322222,
						name: 'John',
						date: '11/10/1990',
						invoice: 150,
						upfront: 55,
						item1: 'Item 1 name',
						item2: 'Item 2 name',
						tax: '10%'
					}
				]
			}
		];

		$scope.codeFilters = [
			{title: '23211', path: 'code'},
			{title: '4452345', path: 'code'}
		]

		$scope.dataCopy = angular.copy($scope.data);
		$scope.data2 = angular.copy($scope.data);
	}
]);
