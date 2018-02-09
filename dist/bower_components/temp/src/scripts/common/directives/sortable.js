'use strict';

angular.module('TT-UI.Common.Directives.Sortable', [
	'ui.router',
	'TT-UI.Common.Directives.Pagination'
])

.constant('SORTABLE', {
	CLASS_ASC:  'asc',
	CLASS_DESC: 'desc',

	ORDER_ASC:  'asc',
	ORDER_DESC: 'desc',

	STATE_PARAM_SORT:  'sort',
	STATE_PARAM_ORDER: 'order',

	EVENT_CHANGE: '$sortable.change'
})

.directive('sortable', ['$stateParams', '$state', 'PAGINATION', 'SORTABLE', function($stateParams, $state, PAGINATION, SORTABLE) {
	return {
		restrict: 'C',

		link: function($scope, element, attr) {
			var $rootScope   = $scope.$root,
				currentSort  = $stateParams[SORTABLE.STATE_PARAM_SORT]  || null,
				currentOrder = $stateParams[SORTABLE.STATE_PARAM_ORDER] || null,
				className    = null,
				unbind;

			// Set current sorting
			if (currentSort === attr.sort) {
				switch (currentOrder) {
					case SORTABLE.ORDER_ASC:
						className = SORTABLE.CLASS_ASC;
						break;

					case SORTABLE.CLASS_DESC:
						className = SORTABLE.CLASS_DESC;
						break;
				}

				if (className) {
					element.addClass(className);
				}
			}

			// Watch for changes and remove current sort
			unbind = $rootScope.$on(SORTABLE.EVENT_CHANGE, function(e, sort) {
				if (sort !== attr.sort) {
					element.removeClass(SORTABLE.CLASS_ASC).removeClass(SORTABLE.CLASS_DESC);
				}
			});
			$scope.$on('$destroy', unbind);

			// Change sorting
			element.bind('click', function(e) {
				e.preventDefault();

				var order, params = {};

				if (element.hasClass(SORTABLE.CLASS_ASC)) {
					order = SORTABLE.ORDER_DESC;
					element.addClass(SORTABLE.CLASS_DESC).removeClass(SORTABLE.CLASS_ASC);
				} else {
					order = SORTABLE.ORDER_ASC;
					element.addClass(SORTABLE.CLASS_ASC).removeClass(SORTABLE.CLASS_DESC);
				}

				$rootScope.$emit(SORTABLE.EVENT_CHANGE, attr.sort);

				params[PAGINATION.STATE_PARAM]     = 1;
				params[SORTABLE.STATE_PARAM_SORT]  = attr.sort;
				params[SORTABLE.STATE_PARAM_ORDER] = order;

				params = angular.extend({}, $stateParams, params);

				$state.go($state.current, params);
			});
		}
	};
}]);
