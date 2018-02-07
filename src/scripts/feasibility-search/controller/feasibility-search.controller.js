'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Controllers', [
    'TT-UI-CLM.FeasibilitySearch.Services',
]);

module.controller('feasibilitySearchCtrl', function($scope, feasibilitySearchService) {
    $scope.localities = [];
    $scope.subLocalities = [];
    $scope.streets = [];

    $scope.localities = feasibilitySearchService.getLocalities($scope.masterData);
    $scope.subLocalities = feasibilitySearchService.getSubLocalities($scope.masterData);
    $scope.streets = feasibilitySearchService.getStreets($scope.masterData);
});
