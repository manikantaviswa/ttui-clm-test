'use strict';

describe('MultiselectHierarchyTree: Tree node factory', function() {
	
	var nodeFactory;
	var nodes = [{'id': 0,
				'title': 'BLStream',
				'selected': false,
				'nodes': [
					{
						'id': 2,
						'title': 'BLStream Austria',
						'nodes': [
						]},
					{
						'id': 2,
						'title': 'BLStream Egypt',
						'nodes': [
						]},
					{
						'id': 2,
						'title': 'BLStream USA',
						'nodes': [
							{
								'id': 21,
								'title': 'Billing Marketing',
								'nodes': []
							},
							{
								'id': 22,
								'title': 'Billing UX',
								'nodes': []
							},
							{
								'id': 23,
								'title': 'Billing UX Marketing',
								'nodes': []
							},
							{
								'id': 24,
								'title': 'UX Marketing',
								'nodes': []
							}
						]},
					{
						'id': 1,
						'title': 'BLStream Poland',
						'selected': true,
						'nodes': [
							{
								'id': 11,
								'title': 'Billing Marketing',
								'nodes': [
									{
										'id': 111,
										'title': 'Item 1',
										'nodes': []
									},
									{
										'id': 112,
										'title': 'Item 2',
										'nodes': []
									},
									{
										'id': 113,
										'title': 'Item 3',
										'nodes': []
									},
									{
										'id': 114,
										'title': 'Item 4',
										'nodes': []
									}
								]
							},
							{
								'id': 12,
								'title': 'Billing UX',
								'nodes': [
									{
										'id': 111,
										'title': 'Item 1',
										'nodes': []
									}
								]
							},
							{
								'id': 13,
								'title': 'Billing Development',
								'nodes': [
									{
										'id': 111,
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
									'title': 'Billing Marketing',
									'nodes': []
								},
								{
									'id': 32,
									'title': 'Marketing',
									'nodes': []
								}
							]
			}]}];
	var treeNodes;
	var root;

	beforeEach(angular.mock.module('TT-UI.MultiselectHierarchyTree.Services.TreeNodeFactory'));
	
	beforeEach(angular.mock.inject(function($injector) {
		nodeFactory = $injector.get('TreeNodeFactory');

		treeNodes = (nodes || []).map(function (option) {
			return nodeFactory.create(option);
		});
		root = treeNodes[0];
	}));

    it('should create tree nodes out of given data', function() {
		expect(nodeFactory).toBeDefined();
		
		expect(root.title).toBe('BLStream');
		expect(root.getTotalCounts()).toEqual({total: 21, included: 0, selected: 0});
	});
	
	it('should handle tree selections so that selected nodes\' children and parents are selected', function() {
		root.toggleSelect();
		expect(root.getTotalCounts()).toEqual({total: 21, included: 21, selected: 1});
		root.toggleSelect();
		
		var node = root.nodes[2].nodes[1];
		node.toggleSelect();
		expect(node.title).toEqual('Billing UX');
		expect(root.getTotalCounts()).toEqual({total: 21, included: 1, selected: 1});
	});
});