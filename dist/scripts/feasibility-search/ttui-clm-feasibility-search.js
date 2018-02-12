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
    'TT-UI-CLM.FeasibilitySearch.Services.SearchFeasibilityAPIService'
]);

function FeasibilitySearchCtrl($scope, $parse, feasibilitySearchService) {
    $scope.localities = [];
    $scope.subLocalities = [];
    $scope.streets = [];

    setInitialData();

    $scope.searchAddressFeasibility = function() {
        $scope.onSearch({$result: $scope.model});
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

    function setInitialData() {
        setLocalities();
        setSubLocalities();
        setStreets();
    }

    function setLocalities() {
        $scope.localities = feasibilitySearchService.getLocalities($scope.masterData);
    }
    
    function setSubLocalities(clearSubLocality) {
        var selectedLocality = $parse('model.locality')($scope);
        $scope.subLocalities = feasibilitySearchService.getSubLocalities($scope.localities, selectedLocality);
        if (clearSubLocality) {
            $parse('model.subLocality').assign($scope, null);
        }
    }
    
    function setStreets(clearStreet) {
        var selectedSubLocality = $parse('model.subLocality')($scope);
        $scope.streets = feasibilitySearchService.getStreets($scope.subLocalities, selectedSubLocality);
        if (clearStreet) {
            $parse('model.street').assign($scope, null);
        }
    }

    function setLocality() {
        var locality = getItemByCode($scope.localities, $scope.model.subLocality.locality.code);
        $parse('model.locality').assign($scope, locality);
    }

    function setSubLocality() {
        var subLocality = getItemByCode($scope.subLocalities, $scope.model.street.subLocality.code);
        $parse('model.subLocality').assign($scope, subLocality);
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
    'FeasibilitySearchService'
];
module.controller(FeasibilitySearchCtrl.name, FeasibilitySearchCtrl);


// Source: src/scripts/feasibility-search/directives/feasibility-search.directive.js
var module = angular.module('TT-UI-CLM.FeasibilitySearch.Directives.FeasibilitySearch', [
    'TT-UI-CLM.FeasibilitySearch.Controllers.FeasibilitySearchCtrl',
    'TT-UI-CLM.FeasibilitySearch.Services.FeasibilitySearchService',
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
            // permissions: '=',
            onSearch: '&'
        },
        controller: 'FeasibilitySearchCtrl',
        templateUrl: 'scripts/feasibility-search/views/feasibility-search.tpl.html'
    };
});


// Source: src/scripts/feasibility-search/feasibility-search.tpl.js
angular.module('TT-UI-CLM.FeasibilitySearch').run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/feasibility-search/views/feasibility-search.tpl.html',
    "<div class=\"form-horizontal-ttui panel panel-ttui\" spinner-inside><div class=\"panel-body forms-ttui row\"><p class=\"col-sm-12\"><strong translate=\"Enter exact address of installation to check feasibility\">Enter exact address of installation to check feasibility</strong></p><div class=\"col-sm-6\"><div class=\"form-group\" ng-class=\"{'has-error': (profileForm.searchInput.$error.pattern)}\"><label for=\"lacality\" class=\"col-sm-4 control-label\" translate=\"Locality\">Locality</label><div class=\"control-content col-sm-8\"><ui-select id=\"city\" ng-model=\"model.locality\" theme=\"bootstrap\" end-to-body=\"true\" on-select=\"onSelectLocality($event, $item)\">+<ui-select-match placeholder=\"Select / Search Localities\">{{$select.selected.name}}</ui-select-match><ui-select-choices repeat=\"locality in localities | filter: $select.search\"><span ng-bind-html=\"locality.name | highlight: $select.search\"></span></ui-select-choices></ui-select><span class=\"help-block ng-hide\">This field is required</span></div></div><div class=\"form-group\" ng-class=\"{'has-error': (profileForm.searchInput.$error.pattern)}\"><label for=\"lacality\" class=\"col-sm-4 control-label\" translate=\"Sub Locality\">Sub Locality</label><div class=\"control-content col-sm-8\"><ui-select id=\"city\" ng-model=\"model.subLocality\" theme=\"bootstrap\" end-to-body=\"true\" on-select=\"onSelectSubLocality($event, $item)\"><ui-select-match placeholder=\"Select / Search Sub Localities\">{{$select.selected.name}}</ui-select-match><ui-select-choices repeat=\"sl in subLocalities | filter: $select.search\"><span ng-bind-html=\"sl.name | highlight: $select.search\"></span></ui-select-choices></ui-select><span class=\"help-block ng-hide\">This field is required</span></div></div><div class=\"form-group\" ng-class=\"{'has-error': (profileForm.searchInput.$error.pattern)}\"><label for=\"street\" class=\"col-sm-4 control-label\" translate=\"Street\">Street</label><div class=\"control-content col-sm-8\"><ui-select id=\"city\" ng-model=\"model.street\" theme=\"bootstrap\" placeholder=\"Choose a street\" end-to-body=\"true\" on-select=\"onSelectStreet($event, $item)\"><ui-select-match placeholder=\"Select / Search Street\">{{$select.selected.name}}</ui-select-match><ui-select-choices repeat=\"st in streets | filter: $select.search\"><span ng-bind-html=\"st.name | highlight: $select.search\"></span></ui-select-choices></ui-select><span class=\"help-block ng-hide\">This field is required</span></div></div><div class=\"form-group\"><label for=\"street\" class=\"col-sm-4 control-label\"></label><div class=\"control-content col-sm-8\"><button type=\"button\" class=\"btn btn-primary\" ng-click=\"searchAddressFeasibility()\">Check Feasibility</button></div></div></div><div class=\"col-sm-6\" ng-if=\"searchResult\"><div class=\"feasibility-search-result\"><div class=\"row\"><div class=\"col-xs-2\"><span class=\"glyphicon glyphicon-ok-sign\" style=\"font-size: 24px\"></span></div><div class=\"col-xs-10\"><div>The address &lt; <em>{{searchResult.locality}}, {{searchResult.subLocality}}, {{searchResult.street}} &gt;</em></div><p><strong>{{searchResult.feasibility || \"--unknown--\"}}</strong></p><div>MDF: {{searchResult.mdf || \"--unknown--\"}}</div><div>Cabinet: {{searchResult.cabinet || \"--unknown--\"}}</div><div>FDP: {{searchResult.fdp || \"--unknown--\"}}</div></div></div></div></div></div></div><div class=\"panel panel-ttui\"><div class=\"panel-body forms-ttui row\"><div class=\"col-sm-6 clearfix\"><p class=\"text-center\"><strong>------ Or ------</strong></p></div><p class=\"col-sm-12\"><strong translate=\"Enter exact address of installation to check feasibility\">Enter exact address of installation to check feasibility</strong></p><div class=\"col-sm-6\"><div class=\"form-group\" ng-class=\"{'has-error': (profileForm.searchInput.$error.pattern)}\"><label for=\"lacality\" class=\"col-sm-4 control-label\" translate=\"Fixed Line Number\">Fixed Line Number</label><div class=\"control-content col-sm-8\"><input type=\"text\" placeholder=\"\" ng-model=\"model.fixedLineNumber\"> <span class=\"help-block ng-hide\">This field is required</span></div></div><div class=\"form-group\"><label for=\"street\" class=\"col-sm-4 control-label\"></label><div class=\"control-content col-sm-8\"><button type=\"button\" class=\"btn btn-primary\" ng-click=\"onCheckClick()\">Check Feasibility</button></div></div></div><div class=\"col-sm-6\" ng-if=\"searchResult\"><div class=\"feasibility-search-result\"><div class=\"row\"><div class=\"col-xs-2\"><span class=\"glyphicon glyphicon-ok-sign\" style=\"font-size: 24px\"></span></div><div class=\"col-xs-10\"><div>The address &lt; <em>{{searchResult.locality}}, {{searchResult.subLocality}}, {{searchResult.street}} &gt;</em></div><p><strong>{{searchResult.feasibility || \"--unknown--\"}}</strong></p><div>MDF: {{searchResult.mdf || \"--unknown--\"}}</div><div>Cabinet: {{searchResult.cabinet || \"--unknown--\"}}</div><div>FDP: {{searchResult.fdp || \"--unknown--\"}}</div></div></div></div></div></div></div>"
  );
}]);


// Source: src/scripts/feasibility-search/services/feasibility-search.api.service.js
var module = angular.module('TT-UI-CLM.FeasibilitySearch.Services.SearchFeasibilityAPIService', [
]);

module.constant('API_CONFIG', {
    API_URL: 'clm-reg/rest/dataservice/1/CLM/1/FeasibilityCheck/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

/*function SearchFeasibilityAPIService($q, $parse, Api, ResourceFactory, API_CONFIG) {

    var prepareRequest = function(msisdn) {
        var requestData = {
            'service':{
                'key': 'MSISDN',
                'value': msisdn
            }
        };
        return requestData;
    };

    var sendRequest = function(msisdn){
        var apiService = ResourceFactory(Api.getUrl(), API_CONFIG.API_URL, API_CONFIG.API_METHOD);
        return apiService.fetch(prepareRequest(msisdn)).$promise;
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

    return function(msisdn) {
        return sendRequest(msisdn)
            .then(getErrors)
            .then(getData);
    };

}

SearchFeasibilityAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'API_CONFIG'];
module.factory(SearchFeasibilityAPIService.name, SearchFeasibilityAPIService);
*/

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
