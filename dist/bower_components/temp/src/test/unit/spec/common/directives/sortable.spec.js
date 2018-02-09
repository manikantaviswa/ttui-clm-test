'use strict';

describe('Directive: "sortable" ', function() {
	var $compile, $scope, $rootScope, SORTABLE, $stateProvider, $state, $stateParams, $location;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.Sortable');

		angular.mock.module(function(_$stateProvider_, _SORTABLE_) {
			$stateProvider = _$stateProvider_;
			SORTABLE = _SORTABLE_;
		});

		angular.mock.inject(function(_$compile_, _$rootScope_, _$state_, _$stateParams_, _$location_) {
			$compile     = _$compile_;
			$rootScope   = _$rootScope_;
			$scope       = $rootScope.$new();
			$state       = _$state_;
			$location    = _$location_;
			$stateParams = _$stateParams_;
		});
	});

	beforeEach(function() {
		$stateProvider
			.state('a', {
				url:   '/a?' + SORTABLE.STATE_PARAM_SORT + '&' + SORTABLE.STATE_PARAM_ORDER,
				label: 'Foo A'
			})
		;
	});

	it('Should check if directive have procesed element', function() {
		// given
		var tpl  = '<div class="sortable" data-sort="foo"></div>',
			html = $compile(tpl)($scope);

		// when
		$scope.$digest();

		// then
		expect(html).not.toBeNull();
		expect(html.length).not.toEqual(0);
	});

	it('Should not set sorting class on sortable element', function() {
		// given
		$stateParams[SORTABLE.STATE_PARAM_SORT]  = 'foo';
		$stateParams[SORTABLE.STATE_PARAM_ORDER] = SORTABLE.ORDER_ASC;

		var tpl = '<div class="sortable" data-sort="bar"></div>',
			html;

		// when
		html = $compile(tpl)($scope);

		// then
		expect(html.hasClass(SORTABLE.CLASS_ASC)).not.toBe(true);
		expect(html.hasClass(SORTABLE.CLASS_DESC)).not.toBe(true);
	});

	it('Should set sorting ASC class on sortable element', function() {
		// given
		$stateParams[SORTABLE.STATE_PARAM_SORT]  = 'foo';
		$stateParams[SORTABLE.STATE_PARAM_ORDER] = SORTABLE.ORDER_ASC;

		var tpl = '<div class="sortable" data-sort="foo"></div>',
			html;

		// when
		html = $compile(tpl)($scope);

		// then
		expect(html.hasClass(SORTABLE.CLASS_ASC)).toBe(true);
	});

	it('Should set sorting DESC class on sortable element', function() {
		// given
		$stateParams[SORTABLE.STATE_PARAM_SORT]  = 'foo';
		$stateParams[SORTABLE.STATE_PARAM_ORDER] = SORTABLE.ORDER_DESC;

		var tpl = '<div class="sortable" data-sort="foo"></div>',
			html;

		// when
		html = $compile(tpl)($scope);

		// then
		expect(html.hasClass(SORTABLE.CLASS_DESC)).toBe(true);
	});

	it('Should remove sorting class from sortable element when triggering notification event', function() {
		// given
		$stateParams[SORTABLE.STATE_PARAM_SORT]  = 'foo';
		$stateParams[SORTABLE.STATE_PARAM_ORDER] = SORTABLE.ORDER_DESC;

		var tpl = '<div class="sortable" data-sort="foo"></div>',
			html;

		// when
		html = $compile(tpl)($scope);
		$rootScope.$emit(SORTABLE.EVENT_CHANGE, 'bar');

		// then
		expect(html.hasClass(SORTABLE.CLASS_ASC)).not.toBe(true);
		expect(html.hasClass(SORTABLE.CLASS_DESC)).not.toBe(true);
	});

	it('Should remove sorting class from sortable element when triggering click event on anohter element', function() {
		// given
		$stateParams[SORTABLE.STATE_PARAM_SORT]  = 'foo';
		$stateParams[SORTABLE.STATE_PARAM_ORDER] = SORTABLE.ORDER_DESC;

		var tpl = '<div>' +
					'<div class="sortable" data-sort="foo"></div>' +
					'<div class="sortable" data-sort="bar"></div>' +
				'</div>';
		var html = $compile(tpl)($scope);
		var foo = angular.element(html[0].querySelector('[data-sort="foo"]'));
		var bar = angular.element(html[0].querySelector('[data-sort="bar"]'));

		// when
		$location.path('/a');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();
		bar.triggerHandler('click');

		// then
		expect(foo.hasClass(SORTABLE.CLASS_ASC)).not.toBe(true);
		expect(foo.hasClass(SORTABLE.CLASS_DESC)).not.toBe(true);
		expect(bar.hasClass(SORTABLE.CLASS_ASC)).toBe(true);
	});

	it('Should set sorting class on sortable element when triggering click event', function() {
		// given
		var tpl = '<div class="sortable" data-sort="foo"></div>',
			html = $compile(tpl)($scope);

		// when
		$location.path('/a');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();
		html.triggerHandler('click');

		// then
		expect(html.hasClass(SORTABLE.CLASS_ASC)).toBe(true);
	});

	it('Should change sorting class from ASC to DESC on sortable element when triggering click event', function() {
		// given
		$stateParams[SORTABLE.STATE_PARAM_SORT]  = 'foo';
		$stateParams[SORTABLE.STATE_PARAM_ORDER] = SORTABLE.ORDER_ASC;

		var tpl = '<div class="sortable" data-sort="foo"></div>',
			html = $compile(tpl)($scope);

		// when
		$location.path('/a');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();
		html.triggerHandler('click');

		// then
		expect(html.hasClass(SORTABLE.CLASS_ASC)).not.toBe(true);
		expect(html.hasClass(SORTABLE.CLASS_DESC)).toBe(true);
	});

	it('Should change sorting class from DESC to ASC on sortable element when triggering click event', function() {
		// given
		$stateParams[SORTABLE.STATE_PARAM_SORT]  = 'foo';
		$stateParams[SORTABLE.STATE_PARAM_ORDER] = SORTABLE.ORDER_DESC;

		var tpl = '<div class="sortable" data-sort="foo"></div>',
			html = $compile(tpl)($scope);

		// when
		$location.path('/a');
		$scope.$emit('$locationChangeSuccess');
		$scope.$apply();
		html.triggerHandler('click');

		// then
		expect(html.hasClass(SORTABLE.CLASS_DESC)).not.toBe(true);
		expect(html.hasClass(SORTABLE.CLASS_ASC)).toBe(true);
	});
});
