/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";


// Source: src/scripts/feasibility-check/index.js
angular.module('TT-UI-CLM.FeasibilityCheck', [
    'TT-UI-CLM.FeasibilityCheck.Directives.FeasibilityCheck',
]);


// Source: src/scripts/feasibility-check/controller/feasibility-check.controller.js
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


// Source: src/scripts/feasibility-check/directives/feasibility-check.directive.js
var module = angular.module('TT-UI-CLM.FeasibilityCheck.Directives.FeasibilityCheck', [
    'TT-UI-CLM.FeasibilityCheck.Controllers.FeasibilityCheckCtrl',
    'TT-UI-CLM.FeasibilityCheck.Services.FeasibilityCheckService',
    'TT-UI-CLM.FeasibilityCheck.Tpl',
    'ui.select',
    'ngSanitize'
]);

module.directive('feasibilityCheck', function() {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            config: '=',
            masterData: '=',
            onCheck: '&'
        },
        controller: 'FeasibilityCheckCtrl',
        templateUrl: 'scripts/feasibility-check/views/feasibility-check.tpl.html'
    };
});


// Source: src/scripts/feasibility-check/services/feasibility-check.api.service.js
var module = angular.module('TT-UI-CLM.FeasibilityCheck.Services.FeasibilityCheckAPIService', [
    'TT-UI.Common'
]);

module.constant('FEASIBILITY_CHECK_API_CONFIG', {
    API_URL: 'clm-reg/rest/dataservice/:tenantId/CLM/:apiVersion/FeasibilityCheck/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

function FeasibilityCheckAPIService($q, $parse, Api, ResourceFactory, API_CONFIG) {

    var prepareRequest = function(payload) {
        var requestData = {
            feasibilityCheck: {
                serviceNumber: $parse('serviceNumber')(payload),
                locality: $parse('locality')(payload),
                subLocality: $parse('subLocality')(payload),
                street: $parse('street')(payload)
            }
        };
        return requestData;
    };

    var sendRequest = function(payload){
        var apiService = new ResourceFactory(Api.getUrl(), API_CONFIG.API_URL, API_CONFIG.API_METHOD);
        return apiService.fetch(prepareRequest(payload)).$promise;
    };

    var getErrors = function(response) {

        var errors = $parse(API_CONFIG.RESPONSE_ERROR_JSON_PATH)(response);
        if (angular.isArray(errors) && errors.length){
            return $q.reject(errors.map(function(error) {
                return error.desc;
            }));
        }
        return response;
    };

    var getData = function(result) {
        return result;
    };

    return function(payload) {
        return sendRequest(payload)
            .then(getErrors)
            .then(getData);
    };

}

FeasibilityCheckAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'FEASIBILITY_CHECK_API_CONFIG'];
module.factory(FeasibilityCheckAPIService.name, FeasibilityCheckAPIService);


// Source: src/scripts/feasibility-check/services/feasibility-check.service.js
var module = angular.module('TT-UI-CLM.FeasibilityCheck.Services.FeasibilityCheckService', []);

function FeasibilityCheckService($parse) {
    return {
        getLocalities: getLocalities,
        getSubLocalities: getSubLocalities,
        getStreets: getStreets,
        getValidators: getValidators
    };

    function getLocalities(masterData) {
        var localities;
        var localitiesList = $parse('localities.locality')(masterData);
        if (localitiesList && localitiesList.length) {
            var localitiesObj = {};
            var countries = $parse('countries.country')(masterData);
            if (countries && countries.length) {
                countries.forEach(function(c) {
                    var provinces = $parse('provinces.province')(c);
                    if(provinces && provinces.length) {
                        provinces.forEach(function(p) {
                            var cities = $parse('cities.city')(p);
                            if(cities && cities.length) {
                                cities.forEach(function(city) {
                                    city.countryCode = c.code;
                                    city.provinceCode = p.code;
                                    localitiesObj[city.code] = city;
                                });
                            }
                        });
                    }
                });
            }
            localities = localitiesList.map(function(loc) {
                return angular.merge({}, loc, localitiesObj[loc.code]);
            });
            localities.splice(0, 0, {
                name: 'Choose Locality',
                code: ''
            });
        }
        return localities;
    }

    function getSubLocalities(localities, locality) {
        var subLocalities = [];
        localities.forEach(function(loc) {
            if (!locality || (loc.code === locality)) {
                var sls = $parse('subLocalities.subLocality')(loc);
                if (sls && sls.length) {
                    sls.forEach(function(sl) {
                        sl.locality = {code: loc.code};
                        subLocalities.push(sl);
                    });
                }
            }
        });
        subLocalities.splice(0, 0, {
            name: 'Choose Sub Locality',
            code: ''
        });
        return subLocalities;
    }

    function getStreets(subLocalities, subLocality) {
        var streets = [];
        subLocalities.forEach(function(sl) {
            if(!subLocality || (subLocality === sl.code)) {
                var sts = $parse('streets.street')(sl);
                if(sts && sts.length) {
                    sts.forEach(function(st) {
                        st.subLocality = {code: sl.code};
                        streets.push(st);
                    });
                }
            }
        });
        streets.splice(0, 0, {
            name: 'Choose Street',
            code: ''
        });
        return streets;
    }

    function getValidators(config) {
        return {
            locality: {
                required: true
            },
            subLocality: {
                required: true
            },
            street: {
                required: true
            },
            serviceNumber: {
                required: true,
                minLength: 7,
                maxLength: 15
            }
        };
    }

}
FeasibilityCheckService.$inject = ['$parse'];
module.service(FeasibilityCheckService.name, FeasibilityCheckService);

return angular;
})(window, window.angular);
