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
    'CLM-UI.Customers.Corporate.Services.MasterDataUtil',
    'CLM-UI.Customers.Services.StepStorage'
]);

function FEASIBILITY_CHECK_FORM() {
    return {
        LOCAL_STORAGE_NS: 'feasibility-check-form',
        LOCAL_STORAGE_MODEL: 'model',
        LOCAL_STORAGE_DEFAULT_OBJECT: {}
    };
}

module.constant(FEASIBILITY_CHECK_FORM.name, FEASIBILITY_CHECK_FORM());

FxlSelectOfferingCtrl.$inject = ['$scope', 'FxlSelectOfferingService', 'MasterDataUtil', '$translate', 'CurrentUser', 'MASTER_CONFIG', 'store', 'StepStorageFactory', 'FEASIBILITY_CHECK_FORM', '$parse'];

function FxlSelectOfferingCtrl($scope, FxlSelectOfferingService, MasterDataUtil, $translate, CurrentUser, MASTER_CONFIG, store, StepStorageFactory, FEASIBILITY_CHECK_FORM, $parse) {  
    
    $scope.lists = FxlSelectOfferingService.getAllList($scope.masterData);
    $scope.services = FxlSelectOfferingService.getServices($scope.masterData);
    $scope.technologies = FxlSelectOfferingService.getTechnologies($scope.masterData);
    $scope.customerCategories = FxlSelectOfferingService.getCustomerCategories($scope.masterData);
    $scope.nationalities = FxlSelectOfferingService.getCustomerNationalities($scope.masterData);
    $scope.businessTypes = FxlSelectOfferingService.getBusinessTypes($scope.masterData);
    $scope.plans = FxlSelectOfferingService.getPlans($scope.masterData);

    var stepStorage = new StepStorageFactory(FEASIBILITY_CHECK_FORM.LOCAL_STORAGE_NS, FEASIBILITY_CHECK_FORM.LOCAL_STORAGE_DEFAULT_OBJECT);
    this.load = stepStorage.load.bind(stepStorage);
    var feasibilityModalData = this.load();

    $scope.searchofferingModel = {
        offering: {
            CustomerType: "I",
            State: "S2",
            SalesChannel: CurrentUser.getSalesChannel(),
            language: $translate.use(),
        }
    };

    //Get Customer Subcategory (This function must be clean later)
    $scope.getCustomerSubCategory = function (customerCategory) {
        MasterDataUtil.getCustomerSubCategory($scope.searchofferingModel.offering.CustomerType, customerCategory).then(function (data) {
            $scope.customerSubCategoryList = data;
            angular.forEach($scope.customerSubCategoryList, function (temp) {
                if ($scope.searchofferingModel.CustomerSubCategory === '' && angular.isDefined(temp.default)) {
                    $scope.searchofferingModel.CustomerSubCategory = temp.code;
                }
            });
        });
    };

    //Get Customer Category (This function must be clean later)
    $scope.getCustomerCategory = function () {
        if (angular.isDefined($scope.searchofferingModel.offering.CustomerType)) {
            MasterDataUtil.getCustomerCategory($scope.searchofferingModel.offering.CustomerType).then(function (data) {
                $scope.customerCategoryList = data;
                if (angular.isDefined($scope.customerCategoryList)) {
                    angular.forEach($scope.customerCategoryList, function (temp) {
                        if ($scope.searchofferingModel.offering.CustomerCategory === '' && angular.isDefined(temp.default)) {
                            $scope.searchofferingModel.offering.CustomerCategory = temp.code;
                        }
                    });
                    $scope.getCustomerSubCategory($scope.searchofferingModel.offering.CustomerCategory);
                } else {
                    $scope.searchOffer.CustomerCategory = {};
                    $scope.searchOffer.CustomerSubCategory = {};
                    $scope.customerSubCategoryList = {};
                }

            });
        } else {
            var defaultCustomerType = MasterDataUtil.getMasterDataDefault($scope.masterData, [MASTER_CONFIG.CUSTOMER_TYPE])[MASTER_CONFIG.CUSTOMER_TYPE];
            MasterDataUtil.getCustomerCategory(defaultCustomerType).then(function (data) {
                $scope.searchofferingModel.offering.CustomerType = defaultCustomerType;
                $scope.customerCategoryList = data;
                angular.forEach($scope.customerCategoryList, function (temp) {
                    if (angular.isDefined(temp.default)) {
                        $scope.searchofferingModel.offering.CustomerType = temp.code;
                    }
                });
                $scope.getCustomerSubCategory($scope.searchofferingModel.offering.CustomerType);
            });
        }
    };


    //Setting the drop down default values function starts here (Want to write a common function for this)
    $scope.setCategoryDefault = function (categoryLists) {
        angular.forEach(categoryLists, function (category) {
            if (category.hasOwnProperty('default') && category.default === 'Y') {
                $scope.searchofferingModel.offering.CustomerCategory = category.categories.category[0].code;
                $scope.getCustomerCategory();
            }
        });
    }

    $scope.setServiceDefault = function (serviceList) {
        angular.forEach(serviceList, function (service) {
            if (service.hasOwnProperty('default') && service.default === 'Y') {
                $scope.searchofferingModel.offering.ProductType = service.code;
            }
        });
    }

    $scope.setBusinessTypeDefault = function (businesstypeList) {
        angular.forEach(businesstypeList, function (businesstype) {
            if (businesstype.hasOwnProperty('default') && businesstype.default === 'Y') {
                $scope.searchofferingModel.offering.BusinessType = businesstype.code;
            }
        });
    }

    //Setting the droap down default values function ends here

    //comon function for calling group oof function on onload
    var onloadCall = function () {
        var categoryLists = $scope.lists.masterData.partyTypes.partyType;
        $scope.setCategoryDefault(categoryLists);
        $scope.setServiceDefault($scope.services);
        $scope.setBusinessTypeDefault($scope.businessTypes);
        $scope.searchofferingModel.offering.City = $parse('locality.locality')(feasibilityModalData);
        var serviceType = store.get('service');
        $scope.searchofferingModel.offering.LoB = _.isEmpty(serviceType) ? MasterDataUtil.getMasterDataDefault(masterData, [MASTER_CONFIG.SERVICE_TYPE])[MASTER_CONFIG.SERVICE_TYPE] : serviceType;
        $scope.searchofferingModel.offering.Country = MasterDataUtil.getMasterDataDefault($scope.lists, [MASTER_CONFIG.COUNTRY])[MASTER_CONFIG.COUNTRY];        
    }

    onloadCall();

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
        var directive = {
            restrict: 'EA',
            //replace: true,
            scope: {
                searchofferingModel: '=',
                masterData: '=',
                onSearch: '=',
                defaultState:'=',
                onToggle:'=',
                removeSerive:'='
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
        this.customerCategories = masterData.masterData.partyTypes.partyType[0].categories.category;
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
