'use strict';

describe('Directive: "HierarchyTreeContainer" ', function() {
	var $compile;
	var $rootScope;
	var $scope;

	beforeEach(function() {
		angular.mock.module('TT-UI.HierarchyTree.Config', function() {});
		angular.mock.module('TT-UI.HierarchyTree.Controllers.HierarchyTreeController', function() {});
		angular.mock.module('TT-UI.HierarchyTree.Directives.HierarchyTreeContainer', function() {});
		angular.mock.module('TT-UI.HierarchyTree.Directives.HierarchyTree', function() {});
	});

	beforeEach(angular.mock.inject(function($injector) {
		$compile   = $injector.get('$compile');
		$rootScope = $injector.get('$rootScope');
		$scope     = $rootScope.$new();
	}));

	afterEach(function() {
		$scope.$destroy();
	});

	it('Should check if directive have procesed element', function() {
		// given
		var html = $compile(
			'<hierarchy-tree recursion-template="foo.tpl.html" model="" options="" max-depth="5">' + 
				'<hierarchy-tree-container>' + '</hierarchy-tree-container>' +
			'</hierarchy-tree>'
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
			'<hierarchy-tree recursion-template="foo.tpl.html" model="" options="" max-depth="5">' + 
				'<hierarchy-tree-container>' + '</hierarchy-tree-container>' +
			'</hierarchy-tree>'
		)($scope);

		// when
		$scope.$digest();

		// then
		var container = html.find('hierarchy-tree-container');
		expect(container).not.toBeNull();
	});

});
