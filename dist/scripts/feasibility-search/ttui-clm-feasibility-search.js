/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";


// Source: src/scripts/feasibility-search/index.js
angular.module('TT-UI-CLM.FeasibilitySearch', [
    'TT-UI-CLM.FeasibilitySearch.Directives.FeasibilitySearch',
]);


// Source: src/scripts/feasibility-search/controller/feasibility-search.controller.js
var module = angular.module('TT-UI-CLM.FeasibilitySearch.Controllers.FeasibilitySearchCtrl', [
    'TT-UI-CLM.FeasibilitySearch.Services.FeasibilitySearchService',
<<<<<<< HEAD
    'CLM-UI.Utils.Spinner',
    'TT-UI-CLM.FeasibilitySearch.Services.SearchFeasibilityAPIService',
]);

function FeasibilitySearchCtrl($scope, $parse, Spinner, feasibilitySearchService, SearchFeasibilityAPIService) {
=======
    'TT-UI-CLM.FeasibilitySearch.Services.SearchFeasibilityAPIService',
]);

function FeasibilitySearchCtrl($scope, $parse, feasibilitySearchService, SearchFeasibilityAPIService) {
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
    $scope.localities = [];
    $scope.subLocalities = [];
    $scope.streets = [];

    setInitialData();
<<<<<<< HEAD
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
=======

    $scope.searchAddressFeasibility = function() {
        $scope.onSearch({$result: $scope.model});
        new SearchFeasibilityAPIService().sendRequest(null).then(function(res) {
            console.log(res);
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
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
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

<<<<<<< HEAD
    $scope.isRequired = function(field) {
        return $parse('validators.' + field + '.required')($scope);
    };

    $scope.requiredValidity = function(subForm, field, modelVal) {
        var showValidators = $parse(subForm + '.' + field + '.$dirty')($scope) || $parse(subForm + '.$submitted')($scope);
        var hasReqError = $parse(subForm + '.' + field + '.$error.required')($scope);
        return $scope.isRequired(field) && showValidators && (hasReqError || !modelVal);
    };

=======
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
    function setInitialData() {
        setLocalities();
        setSubLocalities();
        setStreets();
    }

    function setLocalities() {
        $scope.localities = feasibilitySearchService.getLocalities($scope.masterData);
    }
    
    function setSubLocalities(clearSubLocality) {
<<<<<<< HEAD
        var selectedLocality = $parse('model.locality.locality.code')($scope);
        $scope.subLocalities = feasibilitySearchService.getSubLocalities($scope.localities, selectedLocality);
        if (clearSubLocality) {
            $parse('model.locality.subLocality').assign($scope, null);
=======
        var selectedLocality = $parse('model.locality')($scope);
        $scope.subLocalities = feasibilitySearchService.getSubLocalities($scope.localities, selectedLocality);
        if (clearSubLocality) {
            $parse('model.subLocality').assign($scope, null);
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
        }
    }
    
    function setStreets(clearStreet) {
<<<<<<< HEAD
        var selectedSubLocality = $parse('model.locality.subLocality.code')($scope);
        $scope.streets = feasibilitySearchService.getStreets($scope.subLocalities, selectedSubLocality);
        if (clearStreet) {
            $parse('model.locality.street').assign($scope, null);
=======
        var selectedSubLocality = $parse('model.subLocality')($scope);
        $scope.streets = feasibilitySearchService.getStreets($scope.subLocalities, selectedSubLocality);
        if (clearStreet) {
            $parse('model.street').assign($scope, null);
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
        }
    }

    function setLocality() {
<<<<<<< HEAD
        var localityCode = $parse('model.locality.subLocality.locality.code')($scope);
        var locality = getItemByCode($scope.localities, localityCode);
        if (locality) {
            $parse('model.locality.locality').assign($scope, locality);
        }
    }

    function setSubLocality() {
        var subLocalityCode = $parse('model.locality.street.subLocality.code')($scope);
        var subLocality = getItemByCode($scope.subLocalities, subLocalityCode);
        if (subLocality) {
            $parse('model.locality.subLocality').assign($scope, subLocality);
            setLocality();
        }
=======
        var locality = getItemByCode($scope.localities, $scope.model.subLocality.locality.code);
        $parse('model.locality').assign($scope, locality);
    }

    function setSubLocality() {
        var subLocality = getItemByCode($scope.subLocalities, $scope.model.street.subLocality.code);
        $parse('model.subLocality').assign($scope, subLocality);
        setLocality();
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
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
<<<<<<< HEAD
    'Spinner',
    'FeasibilitySearchService',
    'SearchFeasibilityAPIService'
=======
    'FeasibilitySearchService'
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
];
module.controller(FeasibilitySearchCtrl.name, FeasibilitySearchCtrl);


// Source: src/scripts/feasibility-search/directives/feasibility-search.directive.js
var module = angular.module('TT-UI-CLM.FeasibilitySearch.Directives.FeasibilitySearch', [
    'TT-UI-CLM.FeasibilitySearch.Controllers.FeasibilitySearchCtrl',
    'TT-UI-CLM.FeasibilitySearch.Services.FeasibilitySearchService',
    'TT-UI-CLM.FeasibilitySearch.Tpl',
    'ui.select',
    'ngSanitize'
]);

module.directive('feasibilitySearch', function() {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
<<<<<<< HEAD
            config: '=',
            masterData: '=',
=======
            // config: '=',
            masterData: '=',
            // permissions: '=',
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
            onSearch: '&'
        },
        controller: 'FeasibilitySearchCtrl',
        templateUrl: 'scripts/feasibility-search/views/feasibility-search.tpl.html'
    };
});


// Source: src/scripts/feasibility-search/services/feasibility-search.api.service.js
var module = angular.module('TT-UI-CLM.FeasibilitySearch.Services.SearchFeasibilityAPIService', [
<<<<<<< HEAD
    'TT-UI.Common'
=======
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
]);

module.constant('API_CONFIG', {
    API_URL: 'clm-reg/rest/dataservice/1/CLM/1/FeasibilityCheck/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

function SearchFeasibilityAPIService($q, $parse, Api, ResourceFactory, API_CONFIG) {

<<<<<<< HEAD
    var prepareRequest = function(payload) {
        var requestData = {
            feasibilityCheck: {
                serviceNumber: $parse('serviceNumber')(payload),
                locality: $parse('locality.name')(payload),
                subLocality: $parse('subLocality.name')(payload),
                street: $parse('street.name')(payload)
=======
    var prepareRequest = function(msisdn) {
        var requestData = {
            'service':{
                'key': 'MSISDN',
                'value': msisdn
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
            }
        };
        return requestData;
    };

<<<<<<< HEAD
    var sendRequest = function(payload){
        var apiService = ResourceFactory(Api.getUrl(), API_CONFIG.API_URL, API_CONFIG.API_METHOD);
        return apiService.fetch(prepareRequest(payload)).$promise;
=======
    var sendRequest = function(msisdn){
        var apiService = ResourceFactory(Api.getUrl(), API_CONFIG.API_URL, API_CONFIG.API_METHOD);
        return apiService.fetch(prepareRequest(msisdn)).$promise;
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
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

<<<<<<< HEAD
    return function(payload) {
        return sendRequest(payload)
=======
    return function(msisdn) {
        return sendRequest(msisdn)
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
            .then(getErrors)
            .then(getData);
    };

}

SearchFeasibilityAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'API_CONFIG'];
module.factory(SearchFeasibilityAPIService.name, SearchFeasibilityAPIService);


// Source: src/scripts/feasibility-search/services/feasibility-search.service.js
var module = angular.module('TT-UI-CLM.FeasibilitySearch.Services.FeasibilitySearchService', []);

function FeasibilitySearchService($parse) {
    return {
        getLocalities: getLocalities,
        getSubLocalities: getSubLocalities,
<<<<<<< HEAD
        getStreets: getStreets,
        getValidators: getValidators
    };

    function getLocalities(masterData) {
        var localities;
=======
        getStreets: getStreets
    };

    function getLocalities(masterData) {
        var localities = [];
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
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
<<<<<<< HEAD
            localities.splice(0, 0, {
                name: 'Choose Locality',
                code: ''
            });
=======
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
        }
        return localities;
    }

    function getSubLocalities(localities, locality) {
        var subLocalities = [];
        localities.forEach(function(loc) {
<<<<<<< HEAD
            if (!locality || (loc.code === locality)) {
=======
            if (!locality || (locality && loc.code === locality.code)) {
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
                var sls = $parse('subLocalities.subLocality')(loc);
                if (sls && sls.length) {
                    sls.forEach(function(sl) {
                        sl.locality = {code: loc.code};
                        subLocalities.push(sl);
                    });
                }
            }
        });
<<<<<<< HEAD
        subLocalities.splice(0, 0, {
            name: 'Choose Sub Locality',
            code: ''
        });
=======
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
        return subLocalities;
    }

    function getStreets(subLocalities, subLocality) {
        var streets = [];
        subLocalities.forEach(function(sl) {
<<<<<<< HEAD
            if(!subLocality || (subLocality === sl.code)) {
=======
            if(!subLocality || (subLocality && subLocality.code === sl.code)) {
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
                var sts = $parse('streets.street')(sl);
                if(sts && sts.length) {
                    sts.forEach(function(st) {
                        st.subLocality = {code: sl.code};
                        streets.push(st);
                    });
                }
            }
        });
<<<<<<< HEAD
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
                minLength: 10,
                maxLength: 15
            }
        }
    }

=======
        return streets;
    }
>>>>>>> 564af596c4f4832d8b5fdd614b8c6396d85be8f1
}
FeasibilitySearchService.$inject = ['$parse']
module.service(FeasibilitySearchService.name, FeasibilitySearchService);

return angular;
})(window, window.angular);
