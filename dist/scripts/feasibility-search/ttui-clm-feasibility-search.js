/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
	"use strict";


// Source: src/scripts/feasibility-search/controller/feasibility-search.controller.js
var module = angular.module('TT-UI-CLM.FeasibilitySearch.Controllers', [
    'TT-UI-CLM.FeasibilitySearch.Services',
]);

module.controller('feasibilitySearchCtrl', function($scope, feasibilitySearchService) {
    $scope.localities = [];
    $scope.subLocalities = [];
    $scope.streets = [];

    $scope.localities = feasibilitySearchService.getLocalities($scope.masterData);
    $scope.subLocalities = feasibilitySearchService.getSubLocalities($scope.masterData);
    $scope.streets = feasibilitySearchService.getStreets($scope.masterData);
});


// Source: src/scripts/feasibility-search/directives/feasibility-search.directive.js
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
        link: function(scope, ele, attrs) {

            scope.searchAddressFeasibility = function() {
                scope.onSearch({$result: scope.model});
            };

            scope.$watch('masterData', function(newVal) {
                //scope.localities = feasibilitySearchService.getLocalities(masterData);
                //scope.subLocalities = feasibilitySearchService.getSubLocalities(masterData);
                //scope.streets = feasibilitySearchService.getStreets(masterData);
            }, true);
        },
        controller: 'feasibilitySearchCtrl',
        templateUrl: 'views/feasibility-search.tpl'
    };
});


// Source: src/scripts/feasibility-search/index.js
angular.module('TT-UI-CLM.FeasibilitySearch', [
    'TT-UI-CLM.FeasibilitySearch.Directives',
    'TT-UI-CLM.FeasibilitySearch.Views',
]);


// Source: src/scripts/feasibility-search/services/feasibility-search.service.js
var module = angular.module('TT-UI-CLM.FeasibilitySearch.Services', []);

module.service('feasibilitySearchService', function($log, $parse) {
    return {
        getLocalities: getLocalities,
        getSubLocalities: getSubLocalities,
        getStreets: getStreets
    };

    function getLocalities(masterData) {
        var localities = [];
        var localitiesObj = {};
        var countries = $parse('countries.country')(masterData);
        if(countries && countries.length) {
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
        localities = masterData.localities.locality.map(function(loc) {
            return angular.merge({}, loc, localitiesObj[loc.code]); 
        });
        return localities;
    }

    function getSubLocalities(masterData, locality) {
        var subLocalities = [];
        return subLocalities;
    }

    function getStreets(masterData, locality, subLocality) {
        var streets = [];
        return streets;
    }
});


// Source: src/scripts/feasibility-search/views/feasibility-search.views.js
var module = angular.module('TT-UI-CLM.FeasibilitySearch.Views', []);
module.run(['$templateCache', function($templateCache) {
    $templateCache.put('views/feasibility-search.tpl',
        '<div class="form-horizontal-ttui panel panel-ttui" spinner-inside>' +
            '<div class="panel-body forms-ttui row">' +
                '<p class="col-sm-12">' +
                    '<strong translate="Enter exact address of installation to check feasibility">Enter exact address of installation to check feasibility</strong>' +
                '</p>' +
                '{{localities.length}}' +
                '<div class="col-sm-6">' +
                    '<div class="form-group" ng-class="{\'has-error\': (profileForm.searchInput.$error.pattern)}">' +
                        '<label for="lacality" class="col-sm-4 control-label" translate="Locality">Locality</label>' +
                        '<div class="control-content col-sm-8">' +
                            '<ui-select id="city" ng-model="model.locality.locality.masterCode" theme="bootstrap" append-to-body="true" ng-change="setCountry()">' +
                                '<ui-select-match placeholder="Select / Search Localities">{{$select.selected.name}}</ui-select-match>' +
                                '<ui-select-choices repeat="locality in localities | filter: $select.search">' +
                                    '<span ng-bind-html="locality.name | highlight: $select.search"></span>' +
                                '</ui-select-choices>' +
                            '</ui-select>' +
                            '<span class="help-block ng-hide"> This field is required </span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group" ng-class="{\'has-error\': (profileForm.searchInput.$error.pattern)}">' +
                        '<label for="lacality" class="col-sm-4 control-label" translate="Locality">Locality</label>' +
                        '<div class="control-content col-sm-8">' +
                            '<ui-select id="city" ng-model="model.locality.subLocality.masterCode" theme="bootstrap" append-to-body="true" ng-change="setCountry()">' +
                                '<ui-select-match placeholder="Select / Search Sub Localities">{{$select.selected.name}}</ui-select-match>' +
                                '<ui-select-choices repeat="locality in subLocalities | filter: $select.search">' +
                                    '<span ng-bind-html="locality.name | highlight: $select.search"></span>' +
                                '</ui-select-choices>' +
                            '</ui-select>' +
                            '<span class="help-block ng-hide"> This field is required </span>' +
                        '</div>' +
                    '</div>' +
                    '<div class="form-group" ng-class="{\'has-error\': (profileForm.searchInput.$error.pattern)}">' +
                        '<label for="street" class="col-sm-4 control-label" translate="Street">Street</label>' +
                        '<div class="control-content col-sm-8">' +
                            '<ui-select id="city" ng-model="model.locality.street.masterCode" theme="bootstrap" placeholder="Choose a street" append-to-body="true" ng-change="setCountry()">' +
                                '<ui-select-match placeholder="Select / Search Street">{{$select.selected.name}}</ui-select-match>' +
                                '<ui-select-choices repeat="locality in streets | filter: $select.search">' +
                                    '<span ng-bind-html="locality.name | highlight: $select.search"></span>' +
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
                            '<input type="text" placeholder="" ng-model="model.locality.fixedLineNumber" />' +
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