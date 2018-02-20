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
    $scope.form = {
        localitySearch: {},
        serviceNumSearch: {}
    };

    $scope.validators = feasibilitySearchService.getValidators($scope.config);

    $scope.searchAddressFeasibility = function(isNumberSearch) {
        var req;
        $parse('form.localitySearch.$valid')($scope);
        if (isNumberSearch) {
            if ($parse('form.serviceNumSearch.$invalid')($scope)) {
                $scope.form.serviceNumSearch.$setSubmitted();
                return;
            }
            req = { serviceNumber: $scope.model.serviceNumber };
            $scope.model.serviceNumberSearch = true;
            delete $scope.model.localitySearch;
        } else {
            if ($parse('form.localitySearch.$invalid')($scope)) {
                $scope.form.localitySearch.$setSubmitted();
                return;
            }
            req = $scope.model.locality;
            $scope.model.localitySearch = true;
            delete $scope.model.serviceNumberSearch;
        }
        Spinner.inner.show();
        SearchFeasibilityAPIService(req).then(function(res) {
            var searchResult = angular.merge({}, $scope.model, res.feasibilityDetails);
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
            config: '=',
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
                locality: $parse('locality')(payload),
                subLocality: $parse('subLocality')(payload),
                street: $parse('street')(payload)
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
                minLength: 10,
                maxLength: 15
            }
        }
    }

}
FeasibilitySearchService.$inject = ['$parse']
module.service(FeasibilitySearchService.name, FeasibilitySearchService);


// Source: src/scripts/feasibility-search/views/feasibility-search.views.js
var module = angular.module('TT-UI-CLM.FeasibilitySearch.Views', []);
module.run(['$templateCache', function($templateCache) {
    $templateCache.put('views/feasibility-search.tpl',
        '<div class="form-horizontal-ttui panel panel-ttui" spinner-inside>' +
            '<div class="panel-body forms-ttui row">' +
                '<p class="col-sm-12">' +
                    '<strong translate="Enter exact address of installation to check feasibility">Enter exact address of installation to check feasibility</strong>' +
                '</p>' +
                '<div class="col-sm-6">' +
                    '<div class="form-group" ng-class="{\'has-error\': (profileForm.searchInput.$error.pattern)}">' +
                        '<label for="lacality" class="col-sm-4 control-label" translate="Locality">Locality</label>' +
                        '<div class="control-content col-sm-8">' +
                            '<ui-select id="city" ng-model="model.locality.masterCode" theme="bootstrap" append-to-body="true" on-select="onSelectLocality($event, $item)">'+
                                '<ui-select-match placeholder="Select / Search Localities">{{$select.selected.name}}</ui-select-match>' +
                                '<ui-select-choices repeat="locality in localities | filter: $select.search">' +
                                    '<span ng-bind-html="locality.name | highlight: $select.search"></span>' +
                                '</ui-select-choices>' +
                            '</ui-select>' +
                            '<span class="help-block ng-hide"> This field is required </span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group" ng-class="{\'has-error\': (profileForm.searchInput.$error.pattern)}">' +
                        '<label for="lacality" class="col-sm-4 control-label" translate="Sub Locality">Sub Locality</label>' +
                        '<div class="control-content col-sm-8">' +
                            '<ui-select id="city" ng-model="model.subLocality.masterCode" theme="bootstrap" append-to-body="true" on-select="onSelectSubLocality($event, $item)">' +
                                '<ui-select-match placeholder="Select / Search Sub Localities">{{$select.selected.name}}</ui-select-match>' +
                                '<ui-select-choices repeat="sl in subLocalities | filter: $select.search">' +
                                    '<span ng-bind-html="sl.name | highlight: $select.search"></span>' +
                                '</ui-select-choices>' +
                            '</ui-select>' +
                            '<span class="help-block ng-hide"> This field is required </span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group" ng-class="{\'has-error\': (profileForm.searchInput.$error.pattern)}">' +
                        '<label for="street" class="col-sm-4 control-label" translate="Street">Street</label>' +
                        '<div class="control-content col-sm-8">' +
                            '<ui-select id="city" ng-model="model.street.masterCode" theme="bootstrap" placeholder="Choose a street" append-to-body="true" on-select="onSelectStreet($event, $item)">' +
                                '<ui-select-match placeholder="Select / Search Street">{{$select.selected.name}}</ui-select-match>' +
                                '<ui-select-choices repeat="st in streets | filter: $select.search">' +
                                    '<span ng-bind-html="st.name | highlight: $select.search"></span>' +
                                '</ui-select-choices>' +
                            '</ui-select>' +
                            '<span class="help-block ng-hide"> This field is required </span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="street" class="col-sm-4 control-label"></label>' +
                        '<div class="control-content col-sm-8">' +
                            '<button type="button" class="btn btn-primary" ng-click="searchAddressFeasibility()">Check Feasibility</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-sm-6" ng-if="searchResult">' +
                    '<div class="feasibility-search-result">' +
                        '<div class="row">' +
                            '<div class="col-xs-2">' +
                                '<span class="glyphicon glyphicon-ok-sign" style="font-size: 24px"></span>' +
                            '</div>' +
                            '<div class="col-xs-10">' +
                                '<div>The address &lt; <em>{{searchResult.locality}}, {{searchResult.subLocality}}, {{searchResult.street}} &gt;</em></div>' +
                                '<p><strong>{{searchResult.feasibility || "--unknown--"}}</strong></p>' +
                                '<div>MDF: {{searchResult.mdf || "--unknown--"}}</div>' +
                                '<div>Cabinet: {{searchResult.cabinet || "--unknown--"}}</div>' +
                                '<div>FDP: {{searchResult.fdp || "--unknown--"}}</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +

        '<div class="panel panel-ttui">' +
            '<div class="panel-body forms-ttui row">' +
                '<div class="col-sm-6 clearfix">' +
                    '<p class="text-center"><strong>------ Or ------</strong></p>' +
                '</div>' +
                '<p class="col-sm-12">' +
                    '<strong translate="Enter exact address of installation to check feasibility">Enter exact address of installation to check feasibility</strong>' +
                '</p>' +
                '<div class="col-sm-6">' +
                    '<div class="form-group" ng-class="{\'has-error\': (profileForm.searchInput.$error.pattern)}">' +
                        '<label for="lacality" class="col-sm-4 control-label" translate="Fixed Line Number">Fixed Line Number</label>' +
                        '<div class="control-content col-sm-8">' +
                            '<input type="text" placeholder="" ng-model="model.fixedLineNumber" />' +
                            '<span class="help-block ng-hide">This field is required</span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<label for="street" class="col-sm-4 control-label"></label>' +
                        '<div class="control-content col-sm-8">' +
                            '<button type="button" class="btn btn-primary" ng-click="onCheckClick()">Check Feasibility</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-sm-6" ng-if="searchResult">' +
                    '<div class="feasibility-search-result">' +
                        '<div class="row">' +
                            '<div class="col-xs-2">' +
                                '<span class="glyphicon glyphicon-ok-sign" style="font-size: 24px"></span>' +
                            '</div>' +
                            '<div class="col-xs-10">' +
                                '<div>The address &lt; <em>{{searchResult.locality}}, {{searchResult.subLocality}}, {{searchResult.street}} &gt;</em></div>' +
                                '<p><strong>{{searchResult.feasibility || "--unknown--"}}</strong></p>' +
                                '<div>MDF: {{searchResult.mdf || "--unknown--"}}</div>' +
                                '<div>Cabinet: {{searchResult.cabinet || "--unknown--"}}</div>' +
                                '<div>FDP: {{searchResult.fdp || "--unknown--"}}</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>'
    );
}]);

return angular;
})(window, window.angular);
