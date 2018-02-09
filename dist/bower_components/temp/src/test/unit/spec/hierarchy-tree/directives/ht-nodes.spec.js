'use strict';

describe('Directive: HierarchyTreeNodes ', function() {
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
  	}));

	it('Should check if directive have procesed element', function() {
		// given
		var html = $compile(
			'<ol hierarchy-tree-nodes ng-model="::model"></ol>'
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
			'<ol hierarchy-tree-nodes ng-model="::model"></ol>'
		)($scope);

		// when
		$scope.$digest();

		// then
		expect(html.attr('hierarchy-tree-nodes')).toEqual('');
		expect(html.attr('ng-model')).toEqual('::model');
	});

});
