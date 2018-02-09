'use strict';

describe('HierarchyTree: Tree Node Controller', function() {
	var $rootScope;
	var $timeout;
	var $scope;
	var $element;
	var $controller;
	var treeNodeController;

	beforeEach(angular.mock.module('TT-UI.HierarchyTree.Controllers.HierarchyTreeNodeController'));

	beforeEach(angular.mock.inject(function($injector) {
		$timeout = $injector.get('$timeout');
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();
		$controller = $injector.get('$controller');

		treeNodeController = $controller('HierarchyTreeNodeController', {
			$scope: $scope,
			$element: $element,
			$timeout: $timeout
		});

	}));

	afterEach(function() {
		$scope.$destroy();
	});

	it('should initialize controller', function() {
		expect(treeNodeController).not.toEqual(undefined);
		expect(treeNodeController.scope.$type).toEqual('TreeNode');
		expect(treeNodeController.scope.init).toBeDefined();

		spyOn(treeNodeController.scope, 'init');
		treeNodeController.scope.init({});				
		expect(treeNodeController.scope.init).toHaveBeenCalled();
	});

});