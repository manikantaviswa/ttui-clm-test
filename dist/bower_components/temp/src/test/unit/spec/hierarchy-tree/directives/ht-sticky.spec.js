'use strict';

describe('Directive: htSticky', function() {
	var $scope,
		$compile,
		$window,
		$document,
		event = {
			type: 'scroll'
		};

	var template = '<div ht-sticky>bar</div>';

	beforeEach(function() {
		angular.mock.module('TT-UI.HierarchyTree.Directives.Sticky');

		angular.mock.inject(function($injector) {
			var rootScope = $injector.get('$rootScope');
			$scope = rootScope.$new();
			$compile = $injector.get('$compile');
			$window = $injector.get('$window');
			$document = $injector.get('$document');
		});
	});

	afterEach(function() {
		$scope.$destroy();
	});

	it('Should test if directive has procesed element', function() {
		var html = $compile(template)($scope);

		$scope.$digest();

		expect(html).not.toBeNull();
	});

	it('Should test if sticky is applied properly', function() {
		var html = $compile(template)($scope);
		var body = angular.element($window.document).find('body');

		body.append(html);
		var scope = html.scope();
		scope.selected = true;

		spyOn(scope, 'htStickyUpdate').and.callThrough();

		$document.triggerHandler(event);
		$scope.$digest();

		expect(html).not.toBeNull();
		expect($scope.htStickyUpdate).toHaveBeenCalled();
	});

	it('Should test if sticky is applied properly (remove)', function() {
		var html = $compile(template)($scope);

		var scope = html.scope();
		scope.selected = true;
		html.addClass('fixed');

		spyOn(scope, 'htStickyUpdate').and.callThrough();

		$document.triggerHandler(event);
		$scope.$digest();

		expect(html).not.toBeNull();
		expect(html.hasClass('fixed')).toBe(false);
		expect($scope.htStickyUpdate).toHaveBeenCalled();
	});

	it('Should test if sticky respects selected', function() {
		var html = $compile(template)($scope);
		var scope = html.scope();

		spyOn(scope, 'htStickyUpdate').and.callThrough();

		$scope.$digest();
		$document.triggerHandler(event);

		expect(html).not.toBeNull();
		expect($scope.htStickyUpdate).not.toHaveBeenCalled();
	});

	it('Should test if sticky works with nav', function() {
		var html = $compile(template)($scope);
		var body = angular.element($window.document).find('body');

		body.append(angular.element('<nav>foo</nav>'));
		body.append(html);

		$scope.$digest();

		expect(html).not.toBeNull();
	});

	it('Should test if sticky scrolling up works', function() {
		var html = $compile(template)($scope);
		var scope = html.scope();
		scope.selected = true;

		spyOn($window, 'scrollTo').and.callThrough();

		$scope.htStickyUp();
		$scope.$digest();

		expect(html).not.toBeNull();
		expect($window.scrollTo).toHaveBeenCalled();
	});

});
