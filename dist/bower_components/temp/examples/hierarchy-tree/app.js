'use strict';

angular.module('TT-APP.HierarchyTreeDemo', [
	'TT-UI.HierarchyTree', 
	'TT-UI.HierarchyTree.Tpl'])

.controller('appCtrl', ['$scope', function($scope) {

		$scope.data = 
			[{
				'id': 1,
				'title': 'BLStream Poland',
				'selected': true,
				'dataType': 'profile',
				'nodes': [
					{
						'id': 11,
						'title': 'Billing Marketing',
						'dataType': 'billingAccount',
						'nodes': [
							{
								'id': 111,
								'title': 'Item 1',
								'dataType': 'offering',
								status: 0,
								'nodes': []
							},
							{
								'id': 112,
								'title': 'Item 2',
								'dataType': 'offering',
								status: 0,
								'nodes': []
							}
						]
					},
					{
						'id': 12,
						'title': 'Billing UX',
						'dataType': 'billingAccount',
						'nodes': [
							{
								'id': 121,
								'title': 'Item 1',
								'dataType': 'offering',
								status: 0,
								'nodes': []
							}
						]
					},
					{
						'id': 13,
						'title': 'Billing Development',
						'dataType': 'billingAccount',
						'nodes': [
							{
								'id': 131,
								'title': 'Item 1',
								'dataType': 'offering',
								status: 0,
								'nodes': []
							}
						]
					}
				]},
				{
				'id': 2,
				'title': 'BLStream USA',
				'dataType': 'profile',
				'nodes': [
					{
						'id': 21,
						'title': 'Billing Marketing',
						'dataType': 'billingAccount',
						status: 1,
						'nodes': []
					},
					{
						'id': 22,
						'title': 'Billing UX',
						'dataType': 'billingAccount',
						status: 1,
						'nodes': []
					}
				]},
				{
					'id': 3,
					'title': 'BLStream Szczecin',
					'dataType': 'profile',
					'nodes': [
						{
							'id': 31,
							'title': 'Billing Marketing',
							'dataType': 'billingAccount',
							status: 1,
							'nodes': []
						}
					]
			}];

		$scope.selection = null;
		$scope.rootSelection = {'title': 'BLStream'};

		/*
			Example how to override call back -function(s), and options
		*/
		$scope.options = {
			selectedAction: function(scope) {
				$scope.selection = scope.$modelValue;
				$scope.selectedNode = scope;
			},
			/*
			rootSelectedAction: function (scope) {
				// impl.
			},
			footerButtonAction: function (params) {
				// impl.
			},
			removedAction: function (scope) {
				// impl.
			},
			newSubItemAction: function (scope, params) {
				// example
				var nodeData = scope.$modelValue;
					nodeData.nodes.push({
						id: nodeData.id * 10 + nodeData.nodes.length,
						title: 'Child',
						nodes: []
				});  
			},
			readonly: false,
			templatePath: 'foo/bar',
			maxDepth: 1,
			showRoot: true
			*/
		};

		$scope.collapseAll = function () {
			$scope.$broadcast('hierarchy-tree-collapse-all');
		};

		$scope.expandAll = function () {
			$scope.$broadcast('hierarchy-tree-expand-all');
		};

	}

]);


