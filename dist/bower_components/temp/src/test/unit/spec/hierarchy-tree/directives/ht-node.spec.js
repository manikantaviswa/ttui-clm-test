'use strict';

describe('Directive: HierarchyTreeNode ', function() {
	var $compile;
	var $rootScope;
	var $scope;
	var $controller;

	beforeEach(function() {
		angular.mock.module('TT-UI.HierarchyTree.Config', function() {});
		angular.mock.module('TT-UI.HierarchyTree.Controllers.HierarchyTreeNodesController', function() {});
		angular.mock.module('TT-UI.HierarchyTree.Controllers.HierarchyTreeNodeController', function() {});
		angular.mock.module('TT-UI.HierarchyTree.Controllers.HierarchyTreeController', function() {});
		angular.mock.module('TT-UI.HierarchyTree.Directives.HierarchyTreeNodes', function() {});
		angular.mock.module('TT-UI.HierarchyTree.Directives.HierarchyTreeNode', function() {});
		angular.mock.module('TT-UI.HierarchyTree.Directives.HierarchyTree', function() {});
		
	});

	beforeEach(angular.mock.inject(function($injector) {
		$compile = $injector.get('$compile');
		$rootScope = $injector.get('$rootScope');
		$controller = $injector.get('$controller');
		$scope = $rootScope.$new();
		$scope.model = {title: 'foo', selected: false, nodes: [{title: 'bar', selected: false, nodes: []}]};


  	}));

	it('Should check if directive have procesed element', function() {
		// given
		var html = $compile(
			'<hierarchy-tree><ol hierarchy-tree-nodes ng-model="::model"><li hierarchy-tree-node>foo</li></ol></hierarchy-tree>'
		)($scope);
		
		// when
		$scope.$digest();
		
		// then
		expect(html).not.toBeNull();
		expect(html.length).toEqual(1);
	});

	it('Should test if element contains proper structure', function() {
		// given
		var html = $compile(
			'<hierarchy-tree><ol hierarchy-tree-nodes ng-model="::model"><li hierarchy-tree-node ng-repeat="node in model">foo</li></ol></hierarchy-tree>'
		)($scope);

		// when
		$scope.$digest();
		
		// then
		var hiearchyTreeNodes = html.find('li');
		expect(hiearchyTreeNodes.length).toEqual(3);
		expect(hiearchyTreeNodes.attr('hierarchy-tree-node')).toEqual('');
		expect(hiearchyTreeNodes.html()).toEqual('foo');
	});
});
