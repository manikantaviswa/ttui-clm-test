'use strict';

describe('MultiselectHierarchyTree: tree directive', function() {

	var tree, scope;
	var TreeSelectionRule;

	var nodes = [
		{
			'id': 0,
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
					]
				},
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
					]
				},
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
				}
			]
		}
	];

	beforeEach(function() {
		angular.mock.module('TT-UI.MultiselectHierarchyTree.Config', function() {});
		angular.mock.module('TT-UI.MultiselectHierarchyTree.Services.TreeNodeFactory', function() {});
		angular.mock.module('TT-UI.MultiselectHierarchyTree.Services.TreeSelectionRule', function() {});
		angular.mock.module('TT-UI.MultiselectHierarchyTree.Filters.TreeNodeFilter', function() {});
		angular.mock.module('TT-UI.MultiselectHierarchyTree.Controllers.MultiselectHierarchyTreeController', function() {});
		angular.mock.module('TT-UI.MultiselectHierarchyTree.Directives.MultiselectHierarchyTree', function() {});
		angular.mock.module('TT-UI.MultiselectHierarchyTree.Directives.TreeBackgroundRows', function() {});
		angular.mock.module('TT-UI.MultiselectHierarchyTree.Directives.MultiselectHierarchyTreeNode', function() {});
		angular.mock.module('TT-UI.MultiselectHierarchyTree.Controllers.MultiselectHierarchyTreeNodeController', function() {});
	});


	beforeEach(angular.mock.inject(function($injector) {
		var rootScope = $injector.get('$rootScope');
		var compile = $injector.get('$compile');

		TreeSelectionRule = $injector.get('TreeSelectionRule');

		scope = rootScope.$new();

		tree = angular.element('<multiselect-hierarchy-tree nodes="data"></multiselect-hierarchy-tree>');
		scope.data = nodes;

		tree = compile(tree)(scope);
		scope.$digest();
	}));

	it('should create a multiselect hierarchy tree out of data', function() {
		var ol = tree.find('ol');
		expect(ol.text()).toContain('BLStream');
		expect(ol.text()).toContain('BLStream Szczecin');
	});

	describe('Functionality', function() {

		// Some helper functions for fetching elements
		function getChildNodes(node, isRoot) {
			var query = isRoot ? 'ol.tree-nodes > div > li' : 'ol.tree-nodes > li';
			var nodes = $(node).find(query);

			function findNodeByTitle(nodeElement, title) {
				return getChildNodes(nodeElement).reduce(function(arr, node) {
					var elementTitle = $(node.element).find('.node-title').text();

					if (elementTitle === title) {
						arr.push(node);
					}
					return arr.concat(findNodeByTitle(node.element, title));
				}, []);
			}

			function wrapNode(nodeElement) {
				return {
					element: $(nodeElement),
					controller: angular.element(nodeElement).controller('multiselectHierarchyTreeNode'),
					getChildNodes: function() {
						return getChildNodes(nodeElement);
					},
					getNodeByTitle: function(title) {
						return findNodeByTitle(nodeElement, title)[0];
					}
				};
			}

			return nodes.toArray().map(wrapNode);
		}

		function getRootNodes() {
			var root = $(tree).find('div.multiselect-hierarchy-tree-ttui');
			return getChildNodes(root, true);
		}

		it('should check that first level is visible by default', function() {
			var rootNodes = getRootNodes();

			// Expect root node to have 5 child nodes
			expect(rootNodes.length).toBe(1);
			expect(rootNodes[0].getChildNodes().length).toBe(5);

			// Expect child nodes not to have any child nodes
			expect(rootNodes[0].getChildNodes().every(function(child) {
				return child.getChildNodes().length === 0;
			})).toBe(true);
		});

		it('should check that root node can be collapsed', function() {
			var rootNodes = getRootNodes();

			rootNodes[0].element.find('span.node-expand').click();

			scope.$digest();

			expect(rootNodes[0].getChildNodes().length).toBe(0);
		});

		it('should check that child node can be expanded by clicking expand icon', function() {
			var rootNodes = getRootNodes();
			var node = rootNodes[0].getNodeByTitle('BLStream USA');

			// Verify that there's no visible child nodes
			expect(node.getChildNodes().length).toBe(0);

			// Click expand icon
			node.element.find('span.node-expand').click();
			scope.$digest();

			// Verify that child nodes exist
			expect(node.getChildNodes().length).toBe(4);
		});

		it('should check that selectable node is selected when clicking title', function() {
			var rootNodes = getRootNodes();
			var node = rootNodes[0].getNodeByTitle('BLStream USA');

			// Click label
			node.element.find('span.node-title').click();
			scope.$digest();

			// Verify that node is selected & not expanded
			expect(node.controller.isSelected()).toBe(true);
			expect(node.getChildNodes().length).toBe(0);
		});

		it('should check that non-selectable node is expanded when clicking title', function() {
			var rootNodes = getRootNodes();
			var node = rootNodes[0].getNodeByTitle('BLStream USA');

			spyOn(TreeSelectionRule, 'canSelect').and.callFake(function() {
				return false;
			});

			// Click label
			node.element.find('span.node-title').click();
			scope.$digest();

			// Verify that node is expanded & not selected
			expect(node.controller.isSelected()).toBe(false);
			expect(node.getChildNodes().length).toBe(4);
		});

		it('should check that toggle select all selects all nodes', function() {
			var treeCtrl = tree.controller('multiselectHierarchyTree');

			treeCtrl.toggleSelectAll();

			expect(treeCtrl.isAllSelected()).toBe(true);
			expect(treeCtrl.isAllPossibleSelected()).toBe(true);
		});

		it('should check that toggling select all twice leaves nodes unselected', function() {
			var treeCtrl = tree.controller('multiselectHierarchyTree');

			treeCtrl.toggleSelectAll();
			treeCtrl.toggleSelectAll();

			expect(treeCtrl.isAllSelected()).toBe(false);
			expect(treeCtrl.isAllPossibleSelected()).toBe(false);
			expect(treeCtrl.getAllNodes().some(function(node) {
				return node.isSelected();
			})).toBe(false);
		});

		it('should check that toggling select all with unselectable nodes selects only allowed ones', function() {
			var treeCtrl = tree.controller('multiselectHierarchyTree');

			spyOn(TreeSelectionRule, 'canSelect').and.callFake(function(node) {
				return node.title.indexOf('Item') >= 0;
			});

			treeCtrl.toggleSelectAll();

			expect(treeCtrl.isAllSelected()).toBe(false);
			expect(treeCtrl.isAllPossibleSelected()).toBe(true);
			expect(treeCtrl.getAllNodes().every(function(node) {
				return node.isIncluded() === node.title.indexOf('Item') >= 0;
			})).toBe(true);
		});

		it('should check that toggling select all twice with unselectable nodes leaves all nodes unselected', function() {
			var treeCtrl = tree.controller('multiselectHierarchyTree');

			spyOn(TreeSelectionRule, 'canSelect').and.callFake(function(node) {
				return node.title.indexOf('Item') >= 0;
			});

			treeCtrl.toggleSelectAll();
			treeCtrl.toggleSelectAll();

			expect(treeCtrl.isAllSelected()).toBe(false);
			expect(treeCtrl.isAllPossibleSelected()).toBe(false);
			expect(treeCtrl.getAllNodes().some(function(node) {
				return node.isSelected();
			})).toBe(false);
		});

		it('should check that beforeSelect & afterSelect events are called when selecting node', function() {
			var rootNodes = getRootNodes();
			var node = rootNodes[0].getNodeByTitle('BLStream USA');

			spyOn(TreeSelectionRule, 'beforeSelect').and.callThrough();
			spyOn(TreeSelectionRule, 'afterSelect').and.callThrough();

			// Click label
			node.element.find('span.node-title').click();
			scope.$digest();

			var treeCtrl = tree.controller('multiselectHierarchyTree');
			var nodeModel = node.controller.model;

			expect(TreeSelectionRule.beforeSelect).toHaveBeenCalledWith(nodeModel, treeCtrl, jasmine.any(Object));
			expect(TreeSelectionRule.afterSelect).toHaveBeenCalledWith(nodeModel, treeCtrl, jasmine.any(Object));
		});
    });
});
