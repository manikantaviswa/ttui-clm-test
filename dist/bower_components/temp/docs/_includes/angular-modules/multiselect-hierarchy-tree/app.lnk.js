'use strict';

var module = angular.module('TT-APP.MultiselectHierarchyTreeDemo', [
	'TT-UI.MultiselectHierarchyTree', 
	'TT-UI.MultiselectHierarchyTree.Tpl']);

function AppCtrl($scope) {

	$scope.data = 
	[
		{'id': 0,
		'title': 'BLStream',
		'selectionType': 'none',
		'nodes': [
			{
				'id': 2,
				'selectionType': 'none',
				'title': 'BLStream Austria',
				'nodes': []
			},
			{
				'id': 242,
				'title': 'BLStream Egypt',
				'selectionType': 'none',
				'nodes': []
			},
			{
				'id': 232,
				'selectionType': 'selected',
				'title': 'BLStream USA',
				'nodes': [
					{
						'id': 21,
						'selectionType': 'none',
						'title': 'Billing Marketing',
						'nodes': []
					},
					{
						'id': 22,
						'selectionType': 'none',
						'title': 'Billing UX',
						'nodes': []
					},
					{
						'id': 23,
						'selectionType': 'none',
						'title': 'Billing UX Marketing',
						'nodes': []
					},
					{
						'id': 24,
						'selectionType': 'none',
						'title': 'UX Marketing',
						'nodes': []
					}
					]},
					{
						'id': 1,
						'selectionType': 'none',
						'title': 'BLStream Poland',
						'nodes': [
						{
							'id': 11,
							'selectionType': 'none',
							'title': 'Billing Marketing',
							'nodes': [
								{
									'id': 111,
									'selectionType': 'none',
									'title': 'Item 1',
									'nodes': []
								},
								{
									'id': 112,
									'selectionType': 'none',
									'title': 'Item 2',
									'nodes': []
								},
								{
									'id': 113,
									'selectionType': 'none',
									'title': 'Item 3',
									'nodes': []
								},
								{
									'id': 114,
									'selectionType': 'none',
									'title': 'Item 4',
									'nodes': []
								}
							]
						},
						{
							'id': 12,
							'selectionType': 'none',
							'title': 'Billing UX',
							'nodes': [
									{
										'id': 111,
										'selectionType': 'none',
										'title': 'Item 1',
										'nodes': []
									}
								]
							},
							{
								'id': 13,
								'title': 'Billing Development',
								'selectionType': 'none',
								'nodes': [
									{
										'id': 111,
										'selectionType': 'none',
										'title': 'Item 1',
										'nodes': []
									}
								]
							}
							]},
							{
							'id': 3,
							'title': 'BLStream Szczecin',
							'nodes': [
								{
									'id': 31,
									'selectionType': 'none',
									'title': 'Billing Marketing',
									'nodes': []
								},
								{
									'id': 32,
									'selectionType': 'none',
									'title': 'Marketing',
									'nodes': []
								}
							]
		}]}];
			
		$scope.$on('selectionChange', function(event, data) {
			$scope.selected = data;
		});
}

AppCtrl.$inject = ['$scope'];

module.controller('appCtrl', AppCtrl);
