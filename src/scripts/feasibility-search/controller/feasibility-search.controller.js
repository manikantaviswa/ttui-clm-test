'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Controllers', [
    'TT-UI-CLM.FeasibilitySearch.Services',
]);

module.controller('feasibilitySearchCtrl', function($scope, feasibilitySearchService) {
    $scope.localities = [];
    $scope.subLocalities = [];
    $scope.streets = [];

    $scope.localities = feasibilitySearchService.getLocalities($scope.masterData);
    $scope.subLocalities = feasibilitySearchService.getSubLocalities($scope.localities);
    $scope.streets = feasibilitySearchService.getStreets($scope.subLocalities);

    $scope.onSelectLocality = function(item, model) {
        console.log($scope.model);
        debugger;
        $scope.subLocalities = feasibilitySearchService.getSubLocalities($scope.localities);
    };

    $scope.onSelectSubLocality = function(item, model) {
        console.log($scope.model);
        debugger;
        $scope.streets = feasibilitySearchService.getStreets($scope.subLocalities);
    };

    $scope.onSelectStreet = function(item, model) {
        console.log($scope.model);
        debugger;
    };
});
