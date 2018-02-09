'use strict';

describe('MultiselectHierarchyTree: tree background rows', function() {
	
	var tree, scope, canvas;
	
	beforeEach(angular.mock.module('TT-UI.MultiselectHierarchyTree.Directives.TreeBackgroundRows'));
	
	beforeEach(angular.mock.inject(function($injector) {
		var rootScope = $injector.get('$rootScope');
		var compile = $injector.get('$compile');

		scope = rootScope.$new();

		tree = angular.element('<ol tree-background-rows row-count="total" row-height="10"><li>Test node</li><li>Test node 2</li></ol>');
		scope.total = 2;

		tree = compile(tree)(scope);
		scope.$digest();
		
		canvas = tree.find('canvas')[0];
	}));

    it('should create a canvas with rows, where every even row has a white background', function() {
		// TODO how to test canvas is correctly formed?
		expect(canvas).toBeDefined();
		expect(tree.isolateScope().rowHeight).toBe('10');
	});
});