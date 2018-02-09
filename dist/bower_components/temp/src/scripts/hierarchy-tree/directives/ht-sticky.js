'use strict';

var module = angular.module('TT-UI.HierarchyTree.Directives.Sticky', [
	'ui.bootstrap.position'
]);

function htSticky($window, $document, $uibPosition, $compile) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element) {
			var elementYOffsetOriginal = -1;
			var navigationHeight = 0;

			var calculateNavigationHeight = function() {
				var navElements = $document.find('nav');
				var height = 0;
				angular.forEach(navElements, function(nav) {
					height += nav.clientHeight;
				});
				return height;
			};

			var arrow = angular.element('<i class="fa fa-arrow-circle-o-up fixed-arrow" ng-click="htStickyUp();"></i>');
			navigationHeight = calculateNavigationHeight();

			scope.htStickyUpdate = function() {
				var elementYOffset = $uibPosition.offset(element).top;
				var pageYOffset = $window.pageYOffset;

				navigationHeight = calculateNavigationHeight();

				if (!element.hasClass('fixed')) {
					elementYOffsetOriginal = elementYOffset;
				}

				if (pageYOffset > elementYOffsetOriginal - navigationHeight) {
					element.addClass('fixed');
				} else {
					element.removeClass('fixed');
				}

				if (element.hasClass('fixed')) {
					// Keep top position if fixed
					element[0].style.top = (pageYOffset - elementYOffsetOriginal + navigationHeight) + 'px';
					element.prepend($compile(arrow)(scope));
				} else {
					arrow.remove();
				}
			};

			var doUpdate = function() {
				if (scope.selected) {
					scope.htStickyUpdate();
				}
			};

			scope.htStickyUp = function() {
				var scrollTo = elementYOffsetOriginal - 45;
				$window.scrollTo(0, scrollTo);
			};

			$document.bind('scroll', doUpdate);

			scope.$on('$destroy', function() {
				$document.unbind('scroll', doUpdate);
			});

			scope.$watch('selected', function() {
				if (element.hasClass('fixed')) {
					element.removeClass('fixed');
					arrow.remove();
				}
			});
		}
	};
}

htSticky.$inject = ['$window', '$document', '$uibPosition', '$compile'];
module.directive('htSticky', htSticky);
