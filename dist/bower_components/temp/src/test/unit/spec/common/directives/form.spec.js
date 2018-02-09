'use strict';

describe('Directive: "forms" ', function() {
	var $compile, $rootScope, $scope, $parse, tpl;

	var fooModel = {};
	var fooSchema = {
		'$schema': 'http://json-schema.org/draft-04/schema#',
		'type': 'object',
		'properties': {
			'foo': {
				'type': 'array',
				'minItems': 1,
				'items': {
					'type': 'object',
					'properties': {
						'bar': {
							'title': 'Bar',
							'type': 'string'
						},
						'baz': {
							'title': 'Baz',
							'type': 'string'
						}
					}
				}
			}
		}
	};

	var fooStructure = [
		{
			'key': 'foo',
			'items': [
				{
					'key': 'foo[].bar',
				},
				{
					'key': 'foo[].baz'
				}
			]
		}
	];

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.Forms');

		angular.mock.inject(function($injector) {
			// TODO: Don't like it but validation service requires it
			var $document = $injector.get('$document');
			spyOn(angular, 'injector').and.returnValue($injector);
			spyOn($document, 'injector').and.returnValue($injector);

			$compile   = $injector.get('$compile');
			$rootScope = $injector.get('$rootScope');
			$scope     = $rootScope.$new();
			$parse     = $injector.get('$parse');
		});

		$scope.fooSchema    = angular.copy(fooSchema);
		$scope.fooModel     = angular.copy(fooModel);
		$scope.fooStructure = angular.copy(fooStructure);

		tpl = '<form name="fooForm" sf-schema="fooSchema" sf-form="fooStructure" sf-model="fooModel" sf-validate auto-tab-form></form>';
	});

	afterEach(function(){
		$scope.$destroy();
	});

	var todo = [
		'autoTabForm',
		'autoTabField',
		'autoTabSubmit',
		'autofocus',
		'validationStatus',
		'reloadOptions'
	];
	todo;

	it('should compile table instead of list block if schema format is table', function(){
		// given
		$parse('fooSchema.properties.foo.format').assign($scope, 'table');
		var html = $compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		expect(html.find('table').length).not.toBe(0);
		expect(html.find('ol').length).toBe(0);

	});

	it('should compile list block instead of table if schema format is not table', function(){
		// given
		var html = $compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		expect(html.find('table').length).toBe(0);
		expect(html.find('ol').length).not.toBe(0);

	});

	it('should not show item\'s title in table cell', function(){
		// given
		$parse('fooSchema.properties.foo.format').assign($scope, 'table');
		var html = $compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		var table = html.find('table');
		expect(table.find('td').find('label').hasClass('ng-hide')).toBe(true);
	});

	it('should show item\'s title in table header', function(){
		// given
		$parse('fooSchema.properties.foo.format').assign($scope, 'table');
		$parse('fooSchema.properties.foo.items.properties.bar.title').assign($scope, 'Boo');
		var html = $compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		var table = html.find('table');
		expect(table.find('th').text()).toContain('Boo');
		expect(table.find('th').find('label').hasClass('ng-hide')).not.toBe(true);
	});
});
