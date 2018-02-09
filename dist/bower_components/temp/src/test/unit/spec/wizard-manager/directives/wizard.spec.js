'use strict';

describe('Directive: "wizard" ', function() {
	var $stateProvider;
	var $compile;
	var $rootScope;
	var $scope;
	var $state;

	beforeEach(angular.mock.module('TT-UI.WizardManager.Directives.Wizard', function($injector) {
		$stateProvider = $injector.get('$stateProvider');
	}));

	beforeEach(angular.mock.inject(function($injector) {
		$compile   = $injector.get('$compile');
		$rootScope = $injector.get('$rootScope');
		$state     = $injector.get('$state');
		$scope     = $rootScope.$new();

		$stateProvider
			.state('a', {
				url:   '/a',
				label: 'Foo A'
			})
			.state('b', {
				parent: 'a',
				url:   '/b',
				label: 'Foo AB'
			})
			.state('c', {
				parent: 'a',
				url:   '/c',
				label: 'Foo AC'
			})
			.state('c1', {
				parent: 'c',
				url:   '/c1',
				label: 'Foo AC1'
			})
			.state('d', {
				parent: 'a',
				url:   '/d',
				label: 'Foo AD'
			})
		;
	}));

	afterEach(function() {
		$scope.$destroy();
	});

	it('Should check if directive have procesed element', function() {
		// given
		var html = $compile(
			'<wizard>' + '<wizard-step name="b"></wizard-step>' + '<wizard-step name="c"></wizard-step>' + '</wizard>'
		)($scope);

		// when
		$scope.$digest();

		// then
		expect(html).not.toBeNull();
		expect(html.length).not.toEqual(0);
		expect(html.prop('tagName').toLowerCase()).not.toEqual('wizard');
	});

	it('Should test if element contains proper structure', function() {
		// given
		var html = $compile(
			'<wizard>' + '<wizard-step name="b"></wizard-step>' + '<wizard-step name="c"></wizard-step>' + '</wizard>'
		)($scope);

		// when
		$scope.$digest();

		// then
		expect(html.find('li').length).toEqual(2);
	});

	it('should check if step is disabled', function() {
		// given
		var html = $compile(
			'<wizard>'+
				'<wizard-step name="b"></wizard-step>'+
				'<wizard-step name="c" disabled="true"></wizard-step>'+
				'<wizard-step name="d"></wizard-step>'+
			'</wizard>'
		)($scope);

		// when
		$state.go('b');
		$scope.$digest();

		// then
		var firstStep = html.find('li').eq(0);
		var secondStep = html.find('li').eq(1);
		var thirdStep = html.find('li').eq(2);

		expect(firstStep.attr('class')).not.toContain('disabled');
		expect(thirdStep.attr('class')).not.toContain('disabled');
		expect(secondStep.attr('class')).toContain('disabled');
	});

	it('should check if step become disabled', function() {
		// given
		var html = $compile(
			'<wizard>'+
				'<wizard-step name="b"></wizard-step>'+
				'<wizard-step name="c" disabled="{{isDisabled}}"></wizard-step>'+
				'<wizard-step name="d"></wizard-step>'+
			'</wizard>'
		)($scope);
		$scope.isDisabled = false;

		// when
		$state.go('b');
		$scope.$digest();

		$scope.isDisabled = true;
		$scope.$digest();

		// then
		var secondStep = html.find('li').eq(1);
		expect(secondStep.attr('class')).toContain('disabled');
	});

	it('should check if step become enabled', function() {
		// given
		var html = $compile(
			'<wizard>'+
				'<wizard-step name="b"></wizard-step>'+
				'<wizard-step name="c" disabled="{{isDisabled}}"></wizard-step>'+
				'<wizard-step name="d"></wizard-step>'+
			'</wizard>'
		)($scope);
		$scope.isDisabled = true;

		// when
		$state.go('b');
		$scope.$digest();

		$scope.isDisabled = false;
		$scope.$digest();

		// then
		var secondStep = html.find('li').eq(1);
		expect(secondStep.attr('class')).not.toContain('disabled');
	});

	it('should check if current step is marked', function() {
		// given
		var html = $compile(
			'<wizard>'+
				'<wizard-step name="b"></wizard-step>'+
				'<wizard-step name="c"></wizard-step>'+
				'<wizard-step name="d"></wizard-step>'+
			'</wizard>'
		)($scope);

		// when
		$state.go('d');
		$scope.$digest();

		// then
		var firstStep = html.find('li').eq(0);
		var secondStep = html.find('li').eq(1);
		var thirdStep = html.find('li').eq(2);

		expect(firstStep.attr('class')).not.toContain('current');
		expect(secondStep.attr('class')).not.toContain('current');
		expect(thirdStep.attr('class')).toContain('current');
	});

	it('should check if current step is marked when going to child state', function() {
		// given
		var html = $compile(
			'<wizard>'+
				'<wizard-step name="b"></wizard-step>'+
				'<wizard-step name="c"></wizard-step>'+
				'<wizard-step name="d"></wizard-step>'+
			'</wizard>'
		)($scope);

		// when
		$state.go('c1');
		$scope.$digest();

		// then
		var firstStep = html.find('li').eq(0);
		var secondStep = html.find('li').eq(1);
		var thirdStep = html.find('li').eq(2);

		expect(firstStep.attr('class')).not.toContain('current');
		expect(thirdStep.attr('class')).not.toContain('current');
		expect(secondStep.attr('class')).toContain('current');
	});
});
