

'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Controllers', [
    'TT-UI-CLM.FeasibilitySearch.Services',
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


'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Directives', [
    'TT-UI-CLM.FeasibilitySearch.Views',
    'TT-UI-CLM.FeasibilitySearch.Controllers',
    'TT-UI-CLM.FeasibilitySearch.Services',
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
        templateUrl: 'views/feasibility-search.tpl'
    };
});

'use strict';

angular.module('TT-UI-CLM.FeasibilitySearch', [
    'TT-UI-CLM.FeasibilitySearch.Directives',
]);


'use strict';

var module = angular.module('TT-UI-CLM.FeasibilitySearch.Services', []);

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


'use strict';

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
                            '<ui-select id="city" ng-model="model.locality" theme="bootstrap" append-to-body="true" on-select="onSelectLocality($event, $item)">'+
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
                            '<ui-select id="city" ng-model="model.subLocality" theme="bootstrap" append-to-body="true" on-select="onSelectSubLocality($event, $item)">' +
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
                            '<ui-select id="city" ng-model="model.street" theme="bootstrap" placeholder="Choose a street" append-to-body="true" on-select="onSelectStreet($event, $item)">' +
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

'use strict';

angular.module('TT-UI-CLM', [
    'TT-UI-CLM.FeasibilitySearch'
]);
