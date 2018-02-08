'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Controllers', [
    'TT-UI-CLM.FeasibilitySearch.Services',
]);

module.controller('feasibilitySearchCtrl', function($scope, $parse, feasibilitySearchService) {
    $scope.localities = [];
    $scope.subLocalities = [];
    $scope.streets = [];

    setInitialData();

    $scope.searchAddressFeasibility = function() {
        console.log("from ttclm lib **********");
        scope.onSearch({$result: scope.model});
    };

    $scope.onSelectLocality = function(item, model) {
        $scope.subLocalities = feasibilitySearchService.getSubLocalities($scope.localities, $scope.model.locality.masterCode);
        $parse('model.subLocality.masterCode').assign($scope, null);
        $parse('model.street.masterCode').assign($scope, null);
    };

    $scope.onSelectSubLocality = function(item, model) {
        $scope.streets = feasibilitySearchService.getStreets($scope.subLocalities, $scope.model.subLocality.masterCode);
        setLocality();
        $parse('model.street.masterCode').assign($scope, null);
    };

    $scope.onSelectStreet = function(item, model) {
        setSubLocality();
    };

    function setInitialData() {
        $scope.localities = feasibilitySearchService.getLocalities($scope.masterData);
        $scope.subLocalities = feasibilitySearchService.getSubLocalities($scope.localities);
        $scope.streets = feasibilitySearchService.getStreets($scope.subLocalities);
    }

    function setLocality() {
        var locality = getItemByCode($scope.localities, $scope.model.subLocality.masterCode.locality.code);
        $parse('model.locality.masterCode').assign($scope, locality);
    }

    function setSubLocality() {
        var subLocality = getItemByCode($scope.subLocalities, $scope.model.street.masterCode.subLocality.code);
        $parse('model.subLocality.masterCode').assign($scope, subLocality);
        setLocality();
    }

    function getItemByCode(list, code) {
        var item = null;
        for (var i=0; i<list.length; i++) {
            if (list[i].code === code) {
                item = list[i];
                break;
            }
        }
        return item;
    }
});
