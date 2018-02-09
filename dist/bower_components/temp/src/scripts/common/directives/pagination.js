'use strict';

angular.module('TT-UI.Common.Directives.Pagination', [
	'ui.router',
	'TT-UI.Common.Translate'
])

.filter('range', function() {
	return function(input, start, end) {
		if (!end) {
			end   = start;
			start = 1;
		}

		start = parseInt(start, 10);
		end   = parseInt(end,   10);

		for (start; start <= end; start++) {
			input.push(start);
		}

		return input;
	};
})

.constant('PAGINATION', {
	STATE_PARAM: 'page'
})

.directive('pagination', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: false,

		scope: {
			pages: '=',
			page:  '='
		},

		controller: ['$scope', '$state', '$stateParams', 'PAGINATION', function($scope, $state, $stateParams, PAGINATION) {
			$scope.showPrev = function() {
				return $scope.page > 1;
			};

			$scope.showNext = function() {
				return $scope.page < $scope.pages;
			};

			$scope.hasPages = function() {
				return $scope.pages && $scope.pages > 1;
			};

			$scope.isCurrent = function(page) {
				return page === $scope.page;
			};

			// Navigate
			$scope.goToPrevPage = function() {
				$scope.changePage($scope.getPrevPage());
			};

			$scope.goToFirstPage = function() {
				$scope.changePage($scope.getFirstPage());
			};

			$scope.goToNextPage = function() {
				$scope.changePage($scope.getNextPage());
			};

			$scope.goToLastPage = function() {
				$scope.changePage($scope.getLastPage());
			};

			// Getters
			$scope.getFirstPage = function() {
				return 1;
			};

			$scope.getNextPage = function() {
				var page = $scope.page + 1;

				if (page > $scope.getLastPage()) {
					page = $scope.getLastPage();
				}

				return page;
			};
			$scope.getPrevPage = function() {
				var page = $scope.page - 1;

				if (page < 1) {
					page = 1;
				}

				return page;
			};

			$scope.getLastPage = function() {
				return $scope.pages;
			};

			$scope.changePage = function(page) {
				if (page === $scope.page) {
					return;
				}

				if (page < 1) {
					page = 1;
				} else if (page > $scope.pages) {
					page = $scope.pages;
				}

				var params = {};
				params[PAGINATION.STATE_PARAM] = page;

				params = angular.extend({}, $stateParams, params);

				$state.go($state.current, params);
			};
		}],

		template:
			'<section class="pager-container">' +
				'<ul class="inline-pager" ng-show="hasPages()" data-role="pagination">' +
					'<li class="pager-prev" ng-click="goToFirstPage()" ng-class="{enabled: showPrev(), disabled: !showPrev()}" data-role="first-page" data-page="{{getFirstPage()}}" title="{{\'First page\' | translate}}">&lt;&lt;</li>' +
					'<li class="pager-prev" ng-click="goToPrevPage()"  ng-class="{enabled: showPrev(), disabled: !showPrev()}" data-role="prev-page"  data-page="{{getPrevPage()}}"  translate="&amp;lt; Prev">&lt; Prev</li>' +

					'<li ng-repeat="page in [] | range:pages" ng-click="changePage(page)" ng-class="{enabled: !isCurrent(page), current: isCurrent(page)}" data-role="page" data-page="{{page}}" ng-bind="page"></li>' +

					'<li class="pager-next" ng-click="goToNextPage()" ng-class="{enabled: showNext(), disabled: !showNext()}" data-role="next-page" data-page="{{getNextPage()}}" translate="Next &amp;gt;">Next &gt;</li>' +
					'<li class="pager-next" ng-click="goToLastPage()" ng-class="{enabled: showNext(), disabled: !showNext()}" data-role="last-page" data-page="{{getLastPage()}}" title="{{\'Last page\' | translate}}">&gt;&gt;</li>' +
				'</ul>' +
			'</section>'
	};
});
