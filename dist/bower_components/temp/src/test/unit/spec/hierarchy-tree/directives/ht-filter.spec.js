'use strict';

describe('Directive: HierarchyTreeFilter ', function() {
	var $compile;
	var $rootScope;
	var $scope;

	beforeEach(function() {
		angular.mock.module('TT-UI.HierarchyTree.Config', function() {});
		angular.mock.module('TT-UI.HierarchyTree.Controllers.HierarchyTreeController', function() {});
		angular.mock.module('TT-UI.HierarchyTree.Directives.HierarchyTree', function() {});
		angular.mock.module('TT-UI.HierarchyTree.Directives.HierarchyTreeFilter', function() {});
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
			'<hierarchy-tree>' +
				'<hierarchy-tree-filter placeholder="filter">' + '</hierarchy-tree-filter>' +
			'</hierarchy-tree>'
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
			'<hierarchy-tree>' +
				'<hierarchy-tree-filter placeholder="filter">' + '</hierarchy-tree-filter>' +
			'</hierarchy-tree>'
		)($scope);

		// when
		$scope.$digest();
		
		var filter = html.find('hierarchy-tree-filter');

		// then
		expect(filter.attr('placeholder')).toEqual('filter');
	});
});
