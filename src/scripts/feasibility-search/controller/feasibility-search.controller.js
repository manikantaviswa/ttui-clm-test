'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Controllers.FeasibilitySearchCtrl', [
    'TT-UI-CLM.FeasibilitySearch.Services.FeasibilitySearchService',
    'TT-UI-CLM.FeasibilitySearch.Services.SearchFeasibilityAPIService',
]);

function FeasibilitySearchCtrl($scope, $parse, feasibilitySearchService, SearchFeasibilityAPIService) {
    $scope.localities = [];
    $scope.subLocalities = [];
    $scope.streets = [];
    $scope.form = {
        localitySearch: {},
        serviceNumSearch: {}
    };

    $scope.validators = feasibilitySearchService.getValidators($scope.config);

    $scope.searchAddressFeasibility = function(isNumberSearch) {
        $scope.searchResult = null;
        var searchResult = {};
        var req;
        $parse('form.localitySearch.$valid')($scope);
        if (isNumberSearch) {
            if ($parse('form.serviceNumSearch.$invalid')($scope)) {
                $scope.form.serviceNumSearch.$setSubmitted();
                return;
            }
            req = { serviceNumber: $scope.model.serviceNumber };
            searchResult.serviceNumberSearch = true;
        } else {
            if ($parse('form.localitySearch.$invalid')($scope)) {
                $scope.form.localitySearch.$setSubmitted();
                return;
            }
            req = $scope.model.locality;
            searchResult.localitySearch = true;
        }
        Spinner.inner.show();
        SearchFeasibilityAPIService(req).then(function(res) {
            searchResult = angular.merge(res.feasibilityDetails, $scope.model, searchResult);
            $scope.onSearch({$result: searchResult});
            $scope.searchResult = searchResult;
            Spinner.inner.hide();
        }).catch(function(err) {
            console.log(err);
        });
        $scope.searchResult = {
            locality: $scope.model.locality.name,
            subLocality: $scope.model.subLocality.name,
            street: $scope.model.street.name,
            feasibility: '',
            mdf: '8689809485',
            cabinet : '8689809485',
            fdp:  null
        }
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

    $scope.isRequired = function(field) {
        return $parse('validators.' + field + '.required')($scope);
    };

    $scope.requiredValidity = function(subForm, field, modelVal) {
        var showValidators = $parse(subForm + '.' + field + '.$dirty')($scope.form) || $parse(subForm + '.$submitted')($scope.form);
        var hasReqError = $parse(subForm + '.' + field + '.$error.required')($scope.form);
        return $scope.isRequired(field) && showValidators && (hasReqError || !modelVal);
    };

    function setInitialData() {
        setLocalities();
        setSubLocalities();
        setStreets();
        if(angular.isDefined($parse('model.serviceNumber')($scope))) {
            $scope.searchAddressFeasibility(true);
        } if (angular.isDefined($parse('model.locality.street')($scope))) {
            $scope.searchAddressFeasibility(false);            
        }
    }
    setInitialData();    

    function setLocalities() {
        $scope.localities = feasibilitySearchService.getLocalities($scope.masterData);
    }

    function setSubLocalities(clearSubLocality) {
        var selectedLocality = $parse('model.locality.locality')($scope);
        $scope.subLocalities = feasibilitySearchService.getSubLocalities($scope.localities, selectedLocality);
        if (clearSubLocality) {
            $parse('model.subLocality').assign($scope, null);
        }
    }

    function setStreets(clearStreet) {
        var selectedSubLocality = $parse('model.locality.subLocality')($scope);
        $scope.streets = feasibilitySearchService.getStreets($scope.subLocalities, selectedSubLocality);
        if (clearStreet) {
            $parse('model.street').assign($scope, null);
        }
    }

    function setLocality() {
        var subLocalityObj = getItemByCode($scope.subLocalities, $parse('model.locality.subLocality')($scope));
        var locality = getItemByCode($scope.localities, $parse('locality.code')(subLocalityObj));
        if (locality) {
            $parse('model.locality.locality').assign($scope, locality.code);
        }
    }

    function setSubLocality() {
        var streetObj = getItemByCode($scope.streets, $parse('model.locality.street')($scope));
        var subLocality = getItemByCode($scope.subLocalities, $parse('subLocality.code')(streetObj))
        if (subLocality) {
            $parse('model.locality.subLocality').assign($scope, subLocality.code);
            setLocality();
        }
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
    'FeasibilitySearchService'
];
module.controller(FeasibilitySearchCtrl.name, FeasibilitySearchCtrl);
