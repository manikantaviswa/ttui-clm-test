'use strict';

describe('Directive: "HierarchyTreeContainerRootNode" ', function() {
	var $compile;
	var $rootScope;
	var $scope;

	beforeEach(function() {
		angular.mock.module('TT-UI.HierarchyTree.Directives.HierarchyTreeContainerRootNode', function() {});
	});

	beforeEach(angular.mock.inject(function($injector) {
		$compile = $injector.get('$compile');
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();
	}));

	afterEach(function() {
		$scope.$destroy();
	});

	it('Should check if directive have procesed element', function() {
		// given
		var html = $compile(
			'<hierarchy-tree-container-root-node>' +
				'<span ng-bind="title"></span>' +
				'<div ng-show="selected&&maxDepth()" class="buttons">' +
    				'<button class="btn btn-primary btn-sm" ng-click="newSubItem(this)">' +
    				'<span class="glyphicon glyphicon-plus"></span> sub profile</button>' +
				'</div>' +
			'</hierarchy-tree-container-root-node>'
		)($scope);

		// when
		$scope.$digest();

		// then
		expect(html).not.toBeNull();
		expect(html.length).toEqual(1);
	});

	it('Should test if element contains proper attributes', function() {
		// given
		var html = $compile(
			'<hierarchy-tree-container-root-node>' +
				'<span ng-bind="title"></span>' +
				'<div ng-show="selected&&maxDepth()" class="buttons">' +
    				'<button class="btn btn-primary btn-sm" ng-click="newSubItem(this)">' +
    				'<span class="glyphicon glyphicon-plus"></span> sub profile</button>' +
				'</div>' +
			'</hierarchy-tree-container-root-node>'
		)($scope);
		$scope.title = 'foo';
		
		// when
		$scope.$digest();
		
		// then
		var span = html.find('span').eq(2);
		var div = html.find('div');

		expect(span).not.toBeNull();
		expect(span.html()).toEqual('foo');
		expect(div).not.toBeNull();
	});
});
