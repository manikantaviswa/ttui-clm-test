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
    'CLM-UI.Utils.Spinner',
    'TT-UI-CLM.FeasibilitySearch.Services.SearchFeasibilityAPIService',
]);

function FeasibilitySearchCtrl($scope, $parse, Spinner, feasibilitySearchService, SearchFeasibilityAPIService) {
    $scope.localities = [];
    $scope.subLocalities = [];
    $scope.streets = [];

    setInitialData();

    $scope.searchAddressFeasibility = function(isNumberSearch) {
        $scope.searchResult = null;
        Spinner.inner.show();
        if (isNumberSearch) {
            var req = { serviceNumber: $scope.model.serviceNumber };
        } else {
            var req = $scope.model.locality;
        }
        SearchFeasibilityAPIService(req).then(function(res) {
            var searchResult = angular.merge(res.feasibilityDetails, {
                locality: $parse('model.locality.locality.name')($scope),
                subLocality: $parse('model.locality.subLocality.name')($scope),
                street: $parse('model.locality.street.name')($scope)
            });
            if (isNumberSearch) {
                searchResult.serviceNumber = true;
            } else {
                searchResult.locality = true;
            }
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
        var locality = getItemByCode($scope.localities, $scope.model.locality.subLocality.locality.code);
        $parse('model.locality.locality').assign($scope, locality);
    }

    function setSubLocality() {
        var subLocality = getItemByCode($scope.subLocalities, $scope.model.locality.street.subLocality.code);
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
            // config: '=',
            masterData: '=',
            onSearch: '&'
        },
        controller: 'FeasibilitySearchCtrl',
        templateUrl: 'scripts/feasibility-search/views/feasibility-search.tpl.html'
    };
});


// Source: src/scripts/feasibility-search/services/feasibility-search.api.service.js
var module = angular.module('TT-UI-CLM.FeasibilitySearch.Services.SearchFeasibilityAPIService', [
    'TT-UI.Common'
]);

module.constant('API_CONFIG', {
    API_URL: 'clm-reg/rest/dataservice/1/CLM/1/FeasibilityCheck/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

function SearchFeasibilityAPIService($q, $parse, Api, ResourceFactory, API_CONFIG) {

    var prepareRequest = function(payload) {
        var requestData = {
            feasibilityCheck: {
                serviceNumber: $parse('serviceNumber')(payload),
                locality: $parse('locality.name')(payload),
                subLocality: $parse('subLocality.name')(payload),
                street: $parse('street.name')(payload)
            }
        };
        return requestData;
    };

    var sendRequest = function(payload){
        var apiService = ResourceFactory(Api.getUrl(), API_CONFIG.API_URL, API_CONFIG.API_METHOD);
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

SearchFeasibilityAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'API_CONFIG'];
module.factory(SearchFeasibilityAPIService.name, SearchFeasibilityAPIService);


// Source: src/scripts/feasibility-search/services/feasibility-search.service.js
var module = angular.module('TT-UI-CLM.FeasibilitySearch.Services.FeasibilitySearchService', []);

function FeasibilitySearchService($parse) {
    return {
        getLocalities: getLocalities,
        getSubLocalities: getSubLocalities,
        getStreets: getStreets
    };

    function getLocalities(masterData) {
        var localities = [];
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
        }
        return localities;
    }

    function getSubLocalities(localities, locality) {
        var subLocalities = [];
        localities.forEach(function(loc) {
            if (!locality || (locality && loc.code === locality.code)) {
                var sls = $parse('subLocalities.subLocality')(loc);
                if (sls && sls.length) {
                    sls.forEach(function(sl) {
                        sl.locality = {code: loc.code};
                        subLocalities.push(sl);
                    });
                }
            }
        });
        return subLocalities;
    }

    function getStreets(subLocalities, subLocality) {
        var streets = [];
        subLocalities.forEach(function(sl) {
            if(!subLocality || (subLocality && subLocality.code === sl.code)) {
                var sts = $parse('streets.street')(sl);
                if(sts && sts.length) {
                    sts.forEach(function(st) {
                        st.subLocality = {code: sl.code};
                        streets.push(st);
                    });
                }
            }
        });
        return streets;
    }
}
FeasibilitySearchService.$inject = ['$parse']
module.service(FeasibilitySearchService.name, FeasibilitySearchService);

return angular;
})(window, window.angular);
