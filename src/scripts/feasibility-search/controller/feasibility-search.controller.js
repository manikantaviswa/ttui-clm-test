'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Controllers.FeasibilitySearchCtrl', [
    'TT-UI-CLM.FeasibilitySearch.Services.FeasibilitySearchService',
    'CLM-UI.Utils.Spinner',
    'TT-UI-CLM.FeasibilitySearch.Services.SearchFeasibilityAPIService',
]);

function FeasibilitySearchCtrl($scope, $parse, Spinner, feasibilitySearchService, SearchFeasibilityAPIService) {
    $scope.localities = [];
    $scope.subLocalities = [];
    $scope.streets = [];

    setInitialData();
    $scope.validators = feasibilitySearchService.getValidators($scope.config);

    $scope.searchAddressFeasibility = function(isNumberSearch) {
        $scope.searchResult = null;
        var searchResult = {};
        Spinner.inner.show();
        if (isNumberSearch) {
            var req = { serviceNumber: $scope.model.serviceNumber };
            searchResult.serviceNumberSearch = true;
        } else {
            var req = $scope.model.locality;
            searchResult.localitySearch = true;
        }
        SearchFeasibilityAPIService(req).then(function(res) {
            searchResult = angular.merge(res.feasibilityDetails, {
                locality: $parse('model.locality.locality.name')($scope),
                subLocality: $parse('model.locality.subLocality.name')($scope),
                street: $parse('model.locality.street.name')($scope)
            }, searchResult);

            $scope.onSearch({$result: searchResult});
            $scope.searchResult = searchResult;
            Spinner.inner.hide();
        }).catch(function(err) {
            Spinner.inner.hide();            
            console.log(err);
        });
    };

    $scope.onSelectLocality = function(item, model) {
        setSubLocalities(true);
        setStreets(true);
    };

    $scope.onSelectSubLocality = function(item, model) {
        setLocality();
        setStreets(true);
    };

    $scope.onSelectStreet = function(item, model) {
        setSubLocality();
    };

    function setInitialData() {
        setLocalities();
        setSubLocalities();
        setStreets();
    }

    function setLocalities() {
        $scope.localities = feasibilitySearchService.getLocalities($scope.masterData);
    }
    
    function setSubLocalities(clearSubLocality) {
        var selectedLocality = $parse('model.locality.locality')($scope);
        $scope.subLocalities = feasibilitySearchService.getSubLocalities($scope.localities, selectedLocality);
        if (clearSubLocality) {
            $parse('model.locality.subLocality').assign($scope, null);
        }
    }
    
    function setStreets(clearStreet) {
        var selectedSubLocality = $parse('model.locality.subLocality')($scope);
        $scope.streets = feasibilitySearchService.getStreets($scope.subLocalities, selectedSubLocality);
        if (clearStreet) {
            $parse('model.locality.street').assign($scope, null);
        }
    }

    function setLocality() {
        var localityCode = $parse('model.locality.subLocality.locality.code')($scope);
        var locality = getItemByCode($scope.localities, localityCode);
        $parse('model.locality.locality').assign($scope, locality);
    }

    function setSubLocality() {
        var subLocalityCode = $parse('model.locality.street.subLocality.code')($scope);
        var subLocality = getItemByCode($scope.subLocalities, subLocalityCode);
        $parse('model.locality.subLocality').assign($scope, subLocality);
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
}
FeasibilitySearchCtrl.$inject = [
    '$scope',
    '$parse',
    'Spinner',
    'FeasibilitySearchService',
    'SearchFeasibilityAPIService'
];
module.controller(FeasibilitySearchCtrl.name, FeasibilitySearchCtrl);
