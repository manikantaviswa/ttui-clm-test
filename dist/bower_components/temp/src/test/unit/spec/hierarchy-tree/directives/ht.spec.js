'use strict';

describe('Directive: HierarchyTree ', function() {
	var $compile;
	var $rootScope;
	var $scope;

	beforeEach(function() {
		angular.mock.module('TT-UI.HierarchyTree.Config', function() {});
		angular.mock.module('TT-UI.HierarchyTree.Controllers.HierarchyTreeController', function() {});
		angular.mock.module('TT-UI.HierarchyTree.Directives.HierarchyTree', function() {});
	});

	beforeEach(angular.mock.inject(function($injector) {
		$compile = $injector.get('$compile');
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();
		$scope.model = {title: 'foo', selected: false, nodes: [{title: 'bar', selected: false, nodes: []}]};
	}));

	afterEach(function() {
		$scope.$destroy();
	});

	it('Should check if directive have procesed element', function() {
		// given
		var html = $compile(
			'<hierarchy-tree recursion-template="foo.tpl.html" model="" options="">' + '</hierarchy-tree>'
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
			'<hierarchy-tree recursion-template="foo.tpl.html" model="" options="">' + '</hierarchy-tree>'
		)($scope);

		// when
		$scope.$digest();

		// then
		expect(html.attr('recursion-template')).toEqual('foo.tpl.html');
		expect(html.attr('model')).toEqual('');
		expect(html.attr('options')).toEqual('');
	});

	it('Should test if element scope contains proper values', function() {
		// given
		var html = $compile(
			'<hierarchy-tree recursion-template="foo.tpl.html" model="model" options="{foo: \'bar\'}">' + '</hierarchy-tree>'
		)($scope);

		// when
		$scope.$digest();

		// then
		var scope = html.isolateScope();

		expect(scope.$options.foo).toEqual('bar');
		expect(scope.$treeFilter).toEqual(null);
		expect(scope.model).toEqual($scope.model);
		expect(scope.recursionTemplate).toEqual('foo.tpl.html');
	});
});
