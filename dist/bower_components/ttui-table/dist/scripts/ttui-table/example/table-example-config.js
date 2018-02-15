'use strict';

var module = angular.module('TT-UI.Table.Example.Config', [
]);

var config = {
	default: {
		columns: [
			{
				title: 'Code',
				path: 'code'
			},
			{
				title: 'Name',
				path: 'name',
				filters: [
					{title: 'Bundle 0', path: 'name'},
					{title: 'Bundle 1', path: 'name'},
					{title: 'Bundle 2', path: 'name'}
				]
			},
			{title: 'Description very long one indeed', path: 'description'},
			{title: 'Available from', path: 'dateFrom', type: 'date'},
			{title: 'Available to', path: 'dateTo', type: 'date'},
		]
	}
};

module.constant('tableConfig', config);
