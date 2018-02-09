'use strict';

describe('HierarchyTree: Tree Controller', function() {
	var $rootScope;
	var $scope;
	var $element;
	var $controller;
	var treeController;

	beforeEach(angular.mock.module('TT-UI.HierarchyTree.Controllers.HierarchyTreeController'));

	beforeEach(angular.mock.inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();
		$controller = $injector.get('$controller');

		treeController = $controller('HierarchyTreeController', {
			$scope: $scope,
			$element: $element
		});
	}));

	afterEach(function() {
		$scope.$destroy();
	});

	it('should initialize controller', function() {
		expect(treeController).not.toEqual(undefined);
		expect(treeController.scope.$type).toEqual('Tree');
	});

});