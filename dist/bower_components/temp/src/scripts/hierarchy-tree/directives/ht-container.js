'use strict';

var module = angular.module('TT-UI.HierarchyTree.Directives.HierarchyTreeContainer', [
]);

module.directive('hierarchyTreeContainer', ['hierarchyTreeConfig', function (hierarchyTreeConfig) {
    return {
        restrict: 'E',
        require: ['^hierarchyTree'],
        scope: false,
        transclude: true,
        templateUrl: hierarchyTreeConfig.templatePath + 'ht-container.tpl.html',
        link: function (scope, element, attrs, controllersArr) {
            var config = {};
            angular.extend(config, hierarchyTreeConfig);
            angular.extend(config, controllersArr[0].scope.options);

            scope.recursionTemplate = config.templatePath + controllersArr[0].scope.recursionTemplate;
            scope.model = controllersArr[0].scope.model;
        }
    };
}]);
