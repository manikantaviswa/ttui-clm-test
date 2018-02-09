'use strict';

describe('Directive: "field-validator" ', function() {
	var $compile, $rootScope, $scope, $timeout, $parse, tpl,
			fooModel, fooSchema, fooStructure, FAKE_FIELD_VALIDATOR_CONFIG;

	beforeEach(function() {
		fooModel = {};
		fooSchema = {
			'$schema': 'http://json-schema.org/draft-04/schema#',
			'type': 'object',
			'title': 'Comment',
			'properties': {
				'fooField': {
					'title': 'Foo',
					'type': 'string',
					'validation': 'fakePattern'
				},
				'bazField': {
					'title': 'Baz',
					'type': 'string'
				}
			}
		};

		fooStructure = [
			'fooField',
			'bazField'
		];

		FAKE_FIELD_VALIDATOR_CONFIG = {
			fakePattern: {
				pattern: /.*/,
				errorMessage: 'Everything is allowed here :)'
			}
		};

		angular.mock.module('TT-UI.Common.Directives.Forms');
		angular.mock.module('TT-UI.Common.Directives.FieldValidator');
		angular.mock.module('TT-UI.FieldValidator.Config', function($provide) {
			$provide.constant('FIELD_VALIDATOR_CONFIG', FAKE_FIELD_VALIDATOR_CONFIG);
		});

		angular.mock.inject(function($injector) {
			$compile   = $injector.get('$compile');
			$rootScope = $injector.get('$rootScope');
			$scope     = $rootScope.$new();
			$timeout   = $injector.get('$timeout');
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

	it('should pass field validation by regExp pattern', function(){
		// given
		$parse('fakePattern.pattern').assign(FAKE_FIELD_VALIDATOR_CONFIG, /^[0-9]+$/); // Digits only

		$compile(tpl)($scope);
		$scope.$digest();

		// when
		$scope.fooForm.fooField.$setViewValue('1234');
		$scope.$digest();

		// then
		$timeout.flush();
		expect($scope.fooForm.fooField.$valid).toBeTruthy();
	});

	it('should not pass field validation by regExp pattern', function(){
		// given
		$parse('fakePattern.pattern').assign(FAKE_FIELD_VALIDATOR_CONFIG, /^[0-9]+$/); // Digits only
		$parse('fakePattern.errorMessage').assign(FAKE_FIELD_VALIDATOR_CONFIG, 'Fake error message'); // Digits only

		var html = $compile(tpl)($scope);
		$scope.$digest();

		// when
		$scope.fooForm.fooField.$setViewValue('1234/56');
		$scope.$digest();

		// then
		$timeout.flush();

		expect(html[0].getElementsByClassName('help-block')[0].innerText).toBe('Fake error message');
		expect($scope.fooForm.fooField.$valid).not.toBeTruthy();
	});

	it('should pass field validation by regExp pattern for empty string', function(){
		// given
		$parse('fakePattern.pattern').assign(FAKE_FIELD_VALIDATOR_CONFIG, /^[a-zA-Z0-9]+$/);

		$compile(tpl)($scope);
		$scope.$digest();

		// when
		$scope.fooForm.fooField.$setViewValue('');
		$scope.$digest();

		// then
		$timeout.flush();
		expect($scope.fooForm.fooField.$valid).toBeTruthy();
	});

	it('should pass field validation by few complementary regExp patterns', function(){
		// given
		$parse('fooPattern.pattern').assign(FAKE_FIELD_VALIDATOR_CONFIG, /^[0-9]+$/); // Digits only
		$parse('bazPattern.pattern').assign(FAKE_FIELD_VALIDATOR_CONFIG, /^.{0,3}$/); // Lenth limit

		$parse('fooSchema.properties.fooField.validation').assign($scope, [
			'fooPattern',
			'bazPattern'
		]);

		$compile(tpl)($scope);
		$scope.$digest();

		// when
		$scope.fooForm.fooField.$setViewValue('123');
		$scope.$digest();

		// then
		$timeout.flush();
		expect($scope.fooForm.fooField.$valid).toBeTruthy();
	});

	it('should not pass field validation by first of few complementary regExp patterns', function(){
		// given
		$parse('fooPattern.pattern').assign(FAKE_FIELD_VALIDATOR_CONFIG, /^[0-9]+$/); // Digits only
		$parse('fooPattern.errorMessage').assign(FAKE_FIELD_VALIDATOR_CONFIG, 'Fake FIRST error message');

		$parse('bazPattern.pattern').assign(FAKE_FIELD_VALIDATOR_CONFIG, /^.{0,3}$/); // Lenth limit
		$parse('bazPattern.errorMessage').assign(FAKE_FIELD_VALIDATOR_CONFIG, 'Fake LAST error message');

		$parse('fooSchema.properties.fooField.validation').assign($scope, [
			'fooPattern',
			'bazPattern'
		]);

		var html = $compile(tpl)($scope);
		$scope.$digest();

		// when
		$scope.fooForm.fooField.$setViewValue('12a'); // There is an invalid character
		$scope.$digest();

		// then

		expect(html[0].getElementsByClassName('help-block')[0].innerText).toBe('Fake FIRST error message');
		expect($scope.fooForm.fooField.$valid).not.toBeTruthy();
	});

	it('should not pass field validation by last of few complementary regExp patterns', function(){
		// given
		$parse('fooPattern.pattern').assign(FAKE_FIELD_VALIDATOR_CONFIG, /^[0-9]+$/); // Digits only
		$parse('fooPattern.errorMessage').assign(FAKE_FIELD_VALIDATOR_CONFIG, 'Fake FIRST error message');

		$parse('bazPattern.pattern').assign(FAKE_FIELD_VALIDATOR_CONFIG, /^.{0,3}$/); // Lenth limit
		$parse('bazPattern.errorMessage').assign(FAKE_FIELD_VALIDATOR_CONFIG, 'Fake LAST error message');

		$parse('fooSchema.properties.fooField.validation').assign($scope, [
			'fooPattern',
			'bazPattern'
		]);

		var html = $compile(tpl)($scope);
		$scope.$digest();

		// when
		$scope.fooForm.fooField.$setViewValue('1234'); // Too long
		$scope.$digest();

		// then
		$timeout.flush();
		expect(html[0].getElementsByClassName('help-block')[0].innerText).toBe('Fake LAST error message');
		expect($scope.fooForm.fooField.$valid).not.toBeTruthy();
	});

	describe('Pattern: "switch" ', function() {
		it('should use default validation pattern if value not set', function(){
			// given
			$parse('fakePattern').assign(FAKE_FIELD_VALIDATOR_CONFIG, {
				pattern: /^[a-zA-Z]+$/, // Alphabetic only
				errorMessage: 'Only latin letters are allowed'
			});

			$parse('fakePattern2').assign(FAKE_FIELD_VALIDATOR_CONFIG, {
				switch: 'bazField',
				'value1': {
					pattern: /^[0-9]+$/, // Digits only
					errorMessage: 'Please enter only numeric values'
				},
				'value2': {
					pattern: 'fakePattern'
				},
				pattern: /^.{0,3}$/, // Lenth limit
				errorMessage: 'Too long'
			});

			$parse('fooSchema.properties.fooField.validation').assign($scope, 'fakePattern2');

			var html = $compile(tpl)($scope);
			$scope.$digest();

			// when
			$scope.fooForm.fooField.$setViewValue('123abc');
			$scope.$digest();

			// then
			$timeout.flush();
			expect(html[0].getElementsByClassName('help-block')[0].innerText).toBe('Too long');
			expect($scope.fooForm.fooField.$valid).not.toBeTruthy();
		});

		it('should use described validation pattern if value is set', function(){
			// given
			$parse('fakePattern').assign(FAKE_FIELD_VALIDATOR_CONFIG, {
				pattern: /^[a-zA-Z]+$/, // Alphabetic only
				errorMessage: 'Only latin letters are allowed'
			});

			$parse('fakePattern2').assign(FAKE_FIELD_VALIDATOR_CONFIG, {
				switch: 'bazField',
				'value1': {
					pattern: /^[0-9]+$/, // Digits only
					errorMessage: 'Please enter only numeric values'
				},
				'value2': {
					pattern: 'fakePattern'
				},
				pattern: /^.{0,3}$/, // Lenth limit
				errorMessage: 'Too long'
			});

			$parse('fooSchema.properties.fooField.validation').assign($scope, 'fakePattern2');

			var html = $compile(tpl)($scope);
			$scope.$digest();

			// when
			$scope.fooForm.bazField.$setViewValue('value1');
			$scope.fooForm.fooField.$setViewValue('123abc');
			$scope.$digest();

			// then
			$timeout.flush();
			expect(html[0].getElementsByClassName('help-block')[0].innerText).toBe('Please enter only numeric values');
			expect($scope.fooForm.fooField.$valid).not.toBeTruthy();
		});
	});

	it('should inherit pattern and error message by patter name', function(){
		// given
		$parse('fakePattern').assign(FAKE_FIELD_VALIDATOR_CONFIG, {
			pattern: /^[a-zA-Z]+$/, // Alphabetic only
			errorMessage: 'Only latin letters are allowed'
		});

		$parse('fakePattern2').assign(FAKE_FIELD_VALIDATOR_CONFIG, {
			pattern: 'fakePattern'
		});

		$parse('fooSchema.properties.fooField.validation').assign($scope, 'fakePattern2');

		var html = $compile(tpl)($scope);
		$scope.$digest();

		// when
		$scope.fooForm.fooField.$setViewValue('123abc');
		$scope.$digest();

		// then
		$timeout.flush();
		expect(html[0].getElementsByClassName('help-block')[0].innerText).toBe('Only latin letters are allowed');
		expect($scope.fooForm.fooField.$valid).not.toBeTruthy();
	});

	it('should inherit pattern only without error message by patter name', function(){
		// given
		$parse('fakePattern').assign(FAKE_FIELD_VALIDATOR_CONFIG, {
			pattern: /^[a-zA-Z]+$/, // Alphabetic only
			errorMessage: 'Only latin letters are allowed'
		});

		$parse('fakePattern2').assign(FAKE_FIELD_VALIDATOR_CONFIG, {
			pattern: 'fakePattern',
			errorMessage: 'Fake error message'
		});

		$parse('fooSchema.properties.fooField.validation').assign($scope, 'fakePattern2');

		var html = $compile(tpl)($scope);
		$scope.$digest();

		// when
		$scope.fooForm.fooField.$setViewValue('123abc');
		$scope.$digest();

		// then
		$timeout.flush();
		expect(html[0].getElementsByClassName('help-block')[0].innerText).toBe('Fake error message');
		expect($scope.fooForm.fooField.$valid).not.toBeTruthy();
	});
});
