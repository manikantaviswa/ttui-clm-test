'use strict';

describe('Directive: "auto-format-date" ', function() {
	var $compile, $rootScope, $scope, $timeout;
	var FAKE_CONFIG = {};

	beforeEach(function() {
		angular.mock.module('TT-UI.Config', function($provide) {
			$provide.constant('CONFIG', FAKE_CONFIG);
		});

		angular.mock.module('TT-UI.Common.Directives.AutoFormatDate');

		angular.mock.inject(function(_$compile_, _$rootScope_, _$timeout_) {
			$compile   = _$compile_;
			$rootScope = _$rootScope_;
			$scope     = $rootScope.$new();
			$timeout   = _$timeout_;
		});
	});

	it('Should check if directive have processed element with given format', function() {
		// given
		FAKE_CONFIG.test = 'dd-mm-yyyy';
		var html = $compile('<input type="text" auto-format-date="dd-mm-yyyy">')($scope);

		// when
		html.val('12');
		html.triggerHandler('keypress');
		$scope.$digest();
		$timeout.flush();

		// then
		expect(html.val()).toEqual('12-');
	});

	it('Should check if directive have processed element with default format', function() {
		// given
		FAKE_CONFIG.DATE_FORMAT = 'dd-mm-yyyy';
		var html = $compile('<input type="text" auto-format-date>')($scope);

		// when
		html.val('12');
		html.triggerHandler('keypress');
		$scope.$digest();
		$timeout.flush();

		// then
		expect(html.val()).toEqual('12-');
	});
});
