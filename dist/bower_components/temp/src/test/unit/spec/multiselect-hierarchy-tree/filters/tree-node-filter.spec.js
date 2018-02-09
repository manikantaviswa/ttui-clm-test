'use strict';

describe('MultiselectHierarchyTree: tree filter', function() {
	
	var nodes = {
					'id': 0,
					'title': 'BLStream',
					'nodes':[
						{
							'id': 1,
							'title': 'BLStream Austria',
							'nodes': [],
							'parent': {'title': 'BLStream'}
						},
						{
							'id': 2,
							'title': 'BLStream Egypt',
							'nodes': [],
							'parent': {'title': 'BLStream'}
						},
						{
							'id': 3,
							'title': 'BLStream USA',
							'nodes': [],
							'parent': {'title': 'BLStream'}
						}]
				};
	var filter;
	
	beforeEach(angular.mock.module('TT-UI.MultiselectHierarchyTree.Filters.TreeNodeFilter'));
	
	beforeEach(angular.mock.inject(function($injector) {
		filter = $injector.get('$filter')('searchNode');
	}));

	it('has a filter', function() {
		expect(filter).not.toBeNull();
	});

    it('should filter nodes based on filter text', function() {
		var res = filter(nodes.nodes, 'usa');
		expect(res.length).toBe(1);
		expect(res[0].title).toBe('BLStream USA');
	});
});