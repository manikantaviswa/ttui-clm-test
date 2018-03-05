'use strict';

var module = angular.module('TT-UI-CLM.FeasibilityCheck.Controllers.FeasibilityCheckCtrl', [
    'TT-UI-CLM.FeasibilityCheck.Services.FeasibilityCheckService',
    'CLM-UI.Utils.Spinner',
    'TT-UI-CLM.FeasibilityCheck.Services.FeasibilityCheckAPIService',
]);

function FeasibilityCheckCtrl($scope, $parse, Spinner, feasibilityCheckService, FeasibilityCheckAPIService) {
    $scope.localities = [];
    $scope.subLocalities = [];
    $scope.streets = [];
    $scope.form = {
        localityCheck: {},
        serviceNumCheck: {}
    };

    $scope.validators = new feasibilityCheckService.getValidators($scope.config);

    $scope.checkAddressFeasibility = function(isNumberCheck) {
        var req;
        setCheckResult(null);
        if (isNumberCheck) {
            if ($parse('form.serviceNumCheck.$invalid')($scope)) {
                $scope.form.serviceNumCheck.$setSubmitted();
                return;
            }
            req = { serviceNumber: $scope.model.serviceNumber };
            $scope.model.serviceNumberCheck = true;
            clearLocalityForm();
        } else {
            if ($parse('form.localityCheck.$invalid')($scope)) {
                $scope.form.localityCheck.$setSubmitted();
                return;
            }
            req = $scope.model.locality;
            $scope.model.localityCheck = true;
            clearServiceNumberForm();
        }
        Spinner.inner.show();
        FeasibilityCheckAPIService(req).then(function(res) {
            var checkResult = angular.merge({}, $scope.model, res.feasibilityDetails);
            setCheckResult(checkResult);
        }).catch(function(err) {
            Spinner.inner.hide();
            setCheckResult(null);
        });
    };
    
    function setCheckResult(result) {
        Spinner.inner.hide();
        $scope.checkResult = result;
        $scope.onCheck({$result: result});
    }

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
            $scope.checkAddressFeasibility(true);
        } if (angular.isDefined($parse('model.locality.street')($scope))) {
            $scope.checkAddressFeasibility(false);            
        }
    }
    setInitialData();    

    function setLocalities() {
        $scope.localities = feasibilityCheckService.getLocalities($scope.masterData);
    }

    function setSubLocalities(clearSubLocality) {
        var selectedLocality = $parse('model.locality.locality')($scope);
        $parse('model.locality.country').assign($scope, $parse('countryCode')(selectedLocality));
        $parse('model.locality.province').assign($scope, $parse('provinceCode')(selectedLocality));
        $scope.subLocalities = feasibilityCheckService.getSubLocalities($scope.localities, selectedLocality);
        if (clearSubLocality) {
            $parse('model.locality.subLocality').assign($scope, null);
        }
    }

    function setStreets(clearStreet) {
        var selectedSubLocality = $parse('model.locality.subLocality')($scope);
        $scope.streets = feasibilityCheckService.getStreets($scope.subLocalities, selectedSubLocality);
        if (clearStreet) {
            $parse('model.locality.street').assign($scope, null);
        }
    }

    function setLocality() {
        var subLocalityObj = getItemByCode($scope.subLocalities, $parse('model.locality.subLocality')($scope));
        var locality = getItemByCode($scope.localities, $parse('locality.code')(subLocalityObj));
        $parse('model.locality.country').assign($scope, $parse('countryCode')(locality));
        $parse('model.locality.province').assign($scope, $parse('provinceCode')(locality));
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
    $scope.getItemByCode = getItemByCode;

    function clearLocalityForm() {
        delete $scope.model.locality;
        delete $scope.model.localityCheck;
        if($scope.form.localityCheck.$name) {
            $scope.form.localityCheck.$setPristine();
        }
    }

    function clearServiceNumberForm() {
        delete $scope.model.serviceNumber;
        delete $scope.model.serviceNumberCheck;
        if($scope.form.serviceNumCheck.$name) {
            $scope.form.serviceNumCheck.$setPristine();
        }
    }
}
FeasibilityCheckCtrl.$inject = [
    '$scope',
    '$parse',
    'Spinner',
    'FeasibilityCheckService',
    'FeasibilityCheckAPIService'
];
module.controller(FeasibilityCheckCtrl.name, FeasibilityCheckCtrl);
