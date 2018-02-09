'use strict';

describe('HierarchyTree: Tree Nodes Controller', function() {
	var $rootScope;
	var $scope;
	var $controller;
	var treeNodesController;

	beforeEach(angular.mock.module('TT-UI.HierarchyTree.Controllers.HierarchyTreeNodesController'));

	beforeEach(angular.mock.inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();
		$controller = $injector.get('$controller');

		treeNodesController = $controller('HierarchyTreeNodesController', {
			$scope: $scope
		});
	}));

	afterEach(function() {
		$scope.$destroy();
	});

	it('should initialize controller', function() {
		expect(treeNodesController).not.toEqual(undefined);
		expect(treeNodesController.scope.$type).toEqual('TreeNodes');
	});

});