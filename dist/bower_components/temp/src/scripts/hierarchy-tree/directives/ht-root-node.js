'use strict';

var module = angular.module('TT-UI.HierarchyTree.Directives.HierarchyTreeContainerRootNode', [
]);

module.directive('hierarchyTreeContainerRootNode', [function () {
    return {
        restrict: 'E',
        scope: false,
        transclude: true,
        template: '<div hierarchy-tree-node class="root-node" ng-class="{\'selected\': selected}">' +
        '<span ng-mouseover="iconHover(true);" ng-mouseleave="iconHover(false)" ng-click="selectItem();" ' +
        'class="glyphicon glyphicon-ttui" ' +
        'ng-class="{\'glyphicon-chevron-circle-down\': !iconHovered, \'glyphicon-chevron-circle-down-black\': iconHovered}"></span>' +
        '<span ng-click="selectItem();" ng-class="{\'hover\': hovered}" ng-mouseover="hover(true);" ng-mouseleave="hover(false);">' +
        '<ng-transclude></ng-transclude>' +
        '</span>' +
        '</div>'

    };
}]);