/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";


// Source: src/scripts/fxl-select-offering/index.js
angular.module('TT-UI-CLM.FxlSelectOffering', [
    'TT-UI-CLM.FxlSelectOffering.Directives.SelectOffering',
    'ngSanitize',
    'schemaForm'
]);

// Source: src/scripts/fxl-select-offering/controller/fxl-select-offering-ctrl.js
var module = angular.module('TT-UI-CLM.FxlSelectOffering.Controllers.FxlSelectOfferingCtrl', [
    'TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingService',
    'TT-UI-CLM.FxlSelectOffering.Services.ListOfFxlPlansRequestAPIService'
]);

FxlSelectOfferingCtrl.$inject = ['$scope', 'FxlSelectOfferingService','ListOfFxlPlansRequestAPIService'];

function FxlSelectOfferingCtrl($scope, FxlSelectOfferingService,ListOfFxlPlansRequestAPIService) {
    $scope.lists = FxlSelectOfferingService.getAllList($scope.masterData);
    $scope.services = FxlSelectOfferingService.getServices($scope.masterData);
    $scope.technologies = FxlSelectOfferingService.getTechnologies($scope.masterData);
    $scope.customerCategories = FxlSelectOfferingService.getCustomerCategories($scope.masterData);
    $scope.nationalities = FxlSelectOfferingService.getCustomerNationalities($scope.masterData);
    $scope.businessTypes = FxlSelectOfferingService.getBusinessTypes($scope.masterData);
    $scope.plans = FxlSelectOfferingService.getPlans($scope.masterData);

    $scope.subCategory = [];
    $scope.searchofferingModel = {
        offering: {
            CustomerType: "I",
            CustomerCategory: "",
            CustomerSubCategory: "",
            Nationality: "",
            Country: "MU",
            State: "S2",
            City: "L19",
            BusinessType: "",
            LoB: "FXL",
            ProductType: "",
            Technology: "",
            SalesChannel: "CLM",
            language: "en",
            plan: "",
            service: ""
        }
    };



    $scope.getCustomerSubCategory = function(selectedValue) {
        var category = $scope.lists.masterData.partyTypes.partyType;
        var index = category.findIndex(p => p.code == selectedValue);
        $scope.subCategory = $scope.lists.masterData.partyTypes.partyType[index].categories.category[0].subCategories.subCategory;
    }

    $scope.searchOffering = function(payload){
        new ListOfFxlPlansRequestAPIService(payload).then(function(res) {
            console.log(res);
        }).catch(function(err) {
            console.log(err);
        });
    }

}

module.controller(FxlSelectOfferingCtrl.name, FxlSelectOfferingCtrl);

// Source: src/scripts/fxl-select-offering/directive/fxl-select-offering-directive.js
var module = angular.module('TT-UI-CLM.FxlSelectOffering.Directives.SelectOffering', [
    'TT-UI-CLM.FxlSelectOffering.Controllers.FxlSelectOfferingCtrl',
    'TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingService',
    'TT-UI-CLM.FxlSelectOffering.Tpl'

]);

module.directive('selectOffering', selectOfferingDetail)

    function selectOfferingDetail() {
        debugger;
        var directive = {
            restrict: 'EA',
            replace: true,
            scope: {
                searchofferingModel: '=',
                masterData: '=',
                onSearch: '='
            },
              controller: 'FxlSelectOfferingCtrl',
              templateUrl: 'scripts/fxl-select-offering/views/fxl-select-offering.tpl.html',

        };
        return directive;
    }



// Source: src/scripts/fxl-select-offering/services/fxl-select-offering-services.js
var module = angular.module('TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingService', []);

module.service('FxlSelectOfferingService', FxlSelectOfferingService);

function FxlSelectOfferingService() {

    this.message = '';
    this.services = [];
    this.technologies = [];
    this.customerCategories = [];
    this.nationalities = [];
    this.businessTypes = [];
    this.plans = [];
    this.getAllList = function (todoMain) {
        this.message = todoMain;
        return this.message;
    };

    this.getServices = function(masterData){
        this.services = masterData.masterData.serviceTypes.serviceType[1].subServiceTypes.subServiceType;
        return this.services;
    }

    this.getTechnologies = function(masterData){
        this.technologies = masterData.masterData.serviceTypes.serviceType[1].technologyTypes.technologyType;
        return this.technologies;
    }

    this.getCustomerCategories = function(masterData){
        this.customerCategories = masterData.masterData.partyTypes.partyType;
        return this.customerCategories;
    }

    this.getCustomerNationalities = function(masterData){
        this.nationalities = masterData.masterData.nationalityTypes.nationalityType;
        return this.nationalities;
    }

    this.getBusinessTypes = function(masterData){
        this.businessTypes = masterData.masterData.businessTypes.businessType;
        return this.businessTypes;
    }
    this.getPlans = function(masterData){
        this.plans = masterData.masterData.productTypes.productType;
        return this.plans;
    }
}

// Source: src/scripts/fxl-select-offering/services/fxl-select-offering.api.service.js
var module = angular.module('TT-UI-CLM.FxlSelectOffering.Services.ListOfFxlPlansRequestAPIService', [
]);

module.constant('API_CONFIG', {
    API_URL: 'upc/rest/dataservice/1/UPC/1.2/ListOfFxlPlansRequest/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

function ListOfFxlPlansRequestAPIService($q, $parse, Api, ResourceFactory, API_CONFIG) {



    var sendRequest = function(requestPayload){
        var apiService = ResourceFactory(Api.getUpcUrl(), API_CONFIG.API_URL, API_CONFIG.API_METHOD);
        return apiService.fetch(requestPayload).$promise;
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

    return function(requestPayload) {
        return sendRequest(requestPayload)
            .then(getErrors)
            .then(getData);
    };

}

ListOfFxlPlansRequestAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'API_CONFIG'];
module.factory(ListOfFxlPlansRequestAPIService.name, ListOfFxlPlansRequestAPIService);
return angular;
})(window, window.angular);
