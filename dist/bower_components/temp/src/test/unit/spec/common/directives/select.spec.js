'use strict';

describe('Directive: "select" ', function() {
	var $compile, $scope, $rootScope;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.Select');

		angular.mock.inject(function(_$compile_, _$rootScope_) {
			$compile   = _$compile_;
			$rootScope = _$rootScope_;
			$scope     = $rootScope.$new();
		});
	});

	var tpl =
		'<select class="select-ui">' +
			'<option value="bar">Foo</option>' +
		'</select>'
	;

	it('Should check if directive have procesed element', function() {
		// given
		var html = $compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		expect(html).not.toBeNull();
		expect(html.length).not.toEqual(0);
	});

	it('Should test if element contains proper structure', function() {
		// given
		var html = $compile(tpl)($scope);

		// when
		$scope.$digest();

		//  then
		expect(html.parent().attr('class')).toMatch('styled-select');
		expect(html.prop('tagName').toLowerCase()).toEqual('select');
	});

	it('Should propagate class name to element', function() {
		// given
		var className = 'length-small length-medium',
			html = $compile(
				tpl.replace(/class="([^"]+)"/, 'class="$1 ' + className + '"')
			)($scope);

		// when
		$scope.$digest();

		//  then
		expect(html.hasClass(className)).toBe(true);
	});
});