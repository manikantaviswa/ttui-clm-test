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
                            '<ui-select id="city" ng-model="model.locality.locality.masterCode" theme="bootstrap" append-to-body="true" ng-change="setCountry()">' +
                                '<ui-select-match placeholder="Select / Search Localities">{{$select.selected.name}}</ui-select-match>' +
                                '<ui-select-choices repeat="locality in masterData.localities | filter: $select.search">' +
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
                                '<ui-select-choices repeat="locality in masterData.localities | filter: $select.search">' +
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
                                '<ui-select-choices repeat="locality in masterData.localities | filter: $select.search">' +
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
