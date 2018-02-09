'use strict';

describe('MultiselectHierarchyTree: Tree Controller', function() {

	var treeController, scope;
	var nodes = [{'id': 0,
			'title': 'BLStream',
			'selected': false,
			'nodes': [
				{
					'id': 2,
					'title': 'BLStream Austria',
					'nodes': []
				},
				{
					'id': 2,
					'title': 'BLStream Egypt',
					'nodes': []
				},
				{
					'id': 2,
					'title': 'BLStream USA',
					'nodes': [
						{
							'id': 21,
							'title': 'Billing Marketing',
							'nodes': []
						}
					]
				}
			]}];
	var nodeFactory;

	beforeEach(angular.mock.module('TT-UI.MultiselectHierarchyTree.Services.TreeNodeFactory'));
	beforeEach(angular.mock.module('TT-UI.MultiselectHierarchyTree.Controllers.MultiselectHierarchyTreeController'));

	beforeEach(angular.mock.inject(function($injector) {
		var rootScope = $injector.get('$rootScope');
		scope = rootScope.$new();
		var controller = $injector.get('$controller');
		nodeFactory = $injector.get('TreeNodeFactory');
		spyOn(nodeFactory, 'create').and.callThrough();

		treeController = controller('MultiselectHierarchyTreeController', {
			$scope: scope
		});
	}));

	it('should initialize tree nodes with TreeNodeFactory', function() {
		expect(treeController).not.toEqual(undefined);
		
		scope.mshtCtrl = treeController;
		scope.$digest();
		
		scope.mshtCtrl.nodes = nodes;
		scope.$digest();
		expect(nodeFactory.create).toHaveBeenCalled();
		
		expect(scope.mshtCtrl.nodes[0].title).toBe('BLStream');
	});
});