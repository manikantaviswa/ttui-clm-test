'use strict';

var module = angular.module('TT-UI-CLM.FxlSelectOffering.Controllers.FxlSelectOfferingCtrl', ['TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingService', 'CLM-UI.Customers.Corporate.Services.MasterDataUtil', 'CLM-UI.Customers.Services.StepStorage']);

function FEASIBILITY_CHECK_FORM() {
    return {LOCAL_STORAGE_NS: 'feasibility-check-form', LOCAL_STORAGE_MODEL: 'model', LOCAL_STORAGE_DEFAULT_OBJECT: {}};
}
function SEARCH_OFFERINGS_FORM() {
    return {LOCAL_STORAGE_NS: 'search-offerings-form', LOCAL_STORAGE_MODEL: 'model', LOCAL_STORAGE_DEFAULT_OBJECT: {}};
}

module.constant(FEASIBILITY_CHECK_FORM.name, FEASIBILITY_CHECK_FORM());
module.constant(SEARCH_OFFERINGS_FORM.name, SEARCH_OFFERINGS_FORM());

FxlSelectOfferingCtrl.$inject = [
    '$scope',
    'FxlSelectOfferingService',
    'MasterDataUtil',
    '$translate',
    'CurrentUser',
    'MASTER_CONFIG',
    'store',
    'StepStorageFactory',
    'FEASIBILITY_CHECK_FORM',
    'SEARCH_OFFERINGS_FORM',
    '$parse'
];

function FxlSelectOfferingCtrl($scope, FxlSelectOfferingService, MasterDataUtil, $translate, CurrentUser, MASTER_CONFIG, store, StepStorageFactory, FEASIBILITY_CHECK_FORM, SEARCH_OFFERINGS_FORM, $parse) {

    $scope.lists = FxlSelectOfferingService.getAllList($scope.masterData);
    $scope.services = FxlSelectOfferingService.getServices($scope.masterData);
    $scope.technologies = FxlSelectOfferingService.getTechnologies($scope.masterData);
    $scope.customerCategories = FxlSelectOfferingService.getCustomerCategories($scope.masterData);
    $scope.nationalities = FxlSelectOfferingService.getCustomerNationalities($scope.masterData);
    $scope.businessTypes = FxlSelectOfferingService.getBusinessTypes($scope.masterData);
    $scope.plans = FxlSelectOfferingService.getPlans($scope.masterData);
    
    var stepStorage = new StepStorageFactory(FEASIBILITY_CHECK_FORM.LOCAL_STORAGE_NS, FEASIBILITY_CHECK_FORM.LOCAL_STORAGE_DEFAULT_OBJECT);
    this.load = stepStorage
        .load
        .bind(stepStorage);
    var feasibilityModalData = this.load();

    var searchOfferingsStorage = new StepStorageFactory(SEARCH_OFFERINGS_FORM.LOCAL_STORAGE_NS, SEARCH_OFFERINGS_FORM.LOCAL_STORAGE_DEFAULT_OBJECT);
    this.loadOfferings = searchOfferingsStorage
        .load
        .bind(searchOfferingsStorage);
    var searchofferingsModalData = this.loadOfferings();

    $scope.searchofferingModel = {
        offering: {
            CustomerType: "I",
            SalesChannel: CurrentUser.getSalesChannel(),
            language: $translate.use(),
        }
    };
    $scope.searchofferingLabelModel = {
        offering: {}
    };

    //Get Customer Subcategory (This function must be clean later)
    $scope.getCustomerSubCategory = function (customerCategory) {
          MasterDataUtil
            .getCustomerSubCategory($scope.searchofferingModel.offering.CustomerType, customerCategory)
            .then(function (data) {
                $scope.customerSubCategoryList = data;
                angular.forEach($scope.customerSubCategoryList, function (temp) {
                    if ($scope.searchofferingModel.CustomerSubCategory === '' && angular.isDefined(temp.default)) {
                        $scope.searchofferingModel.CustomerSubCategory = temp.code;
                        $scope.searchofferingLabelModel.CustomerSubCategory = temp.name;
                    }
                });
            });
    };

    //Get Customer Category (This function must be clean later)
    $scope.getCustomerCategory = function () {
        if (angular.isDefined($scope.searchofferingModel.offering.CustomerType)) {
            MasterDataUtil
                .getCustomerCategory($scope.searchofferingModel.offering.CustomerType)
                .then(function (data) {
                    $scope.customerCategoryList = data;
                    if (angular.isDefined($scope.customerCategoryList)) {
                        angular
                            .forEach($scope.customerCategoryList, function (temp) {
                                if ($scope.searchofferingModel.offering.CustomerCategory === '' && angular.isDefined(temp.default)) {
                                    $scope.searchofferingModel.offering.CustomerCategory = temp.code;
                                    $scope.searchofferingLabelModel.offering.CustomerCategory = temp.name;
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
            MasterDataUtil
                .getCustomerCategory(defaultCustomerType)
                .then(function (data) {
                    $scope.searchofferingModel.offering.CustomerType = defaultCustomerType;
                    $scope.customerCategoryList = data;
                    angular.forEach($scope.customerCategoryList, function (temp) {
                        if (angular.isDefined(temp.default)) {
                            $scope.searchofferingModel.offering.CustomerType = temp.code;
                            $scope.searchofferingLabelModel.offering.Customer = temp.name;
                        }
                    });
                    $scope.getCustomerSubCategory($scope.searchofferingModel.offering.CustomerType);
                });
        }
    };

    // Setting the drop down default values function starts here (Want to write a
    // common function for this)
    $scope.setCategoryDefault = function (categoryLists) {
        angular
            .forEach(categoryLists, function (category) {
                if (category.hasOwnProperty('default') && category.default === 'Y') {
                    $scope.searchofferingModel.offering.CustomerCategory = category.categories.category[0].code;
                    $scope.searchofferingLabelModel.offering.CustomerCategory = category.categories.category[0].name;
                    $scope.getCustomerCategory();
                }
            });
    }

    $scope.setServiceDefault = function (serviceList) {
        angular
            .forEach(serviceList, function (service) {
                if (service.hasOwnProperty('default') && service.default === 'Y') {
                    $scope.searchofferingModel.offering.ProductType = service.code;
                    $scope.searchofferingLabelModel.offering.ProductType = service.name;
                }
            });
    }

    $scope.setBusinessTypeDefault = function (businesstypeList) {
        angular
            .forEach(businesstypeList, function (businesstype) {
                if (businesstype.hasOwnProperty('default') && businesstype.default === 'Y') {
                    $scope.searchofferingModel.offering.BusinessType = businesstype.code;
                    $scope.searchofferingLabelModel.offering.Business = businesstype.name;
                }
            });
    }

    $scope.onSelctOfDropdown = function(dropdownName, list){
        if ($scope.searchofferingModel.offering[dropdownName] == null) {
            $scope.searchofferingModel.offering[dropdownName] = '';
            $scope.searchofferingLabelModel.offering[dropdownName] = '';
        } else {
            angular
                .forEach(list, function (item) {
                    if (item.code === $scope.searchofferingModel.offering[dropdownName]) {
                        $scope.searchofferingModel.offering[dropdownName] = item.code
                        $scope.searchofferingLabelModel.offering[dropdownName] = item.name
                    }

                });
        }
    }

    //Forming the payload for api calll
    var updateSearchOfferingModel = function (){
        $scope.searchofferingModel.offering.Country = $parse('locality.country')(feasibilityModalData);
        $scope.searchofferingModel.offering.City = $parse('locality.locality')(feasibilityModalData);
        $scope.searchofferingModel.offering.State = $parse('locality.province')(feasibilityModalData);
        $scope.searchofferingModel.offering.Technology = $parse('technology')(feasibilityModalData);
        $scope.searchofferingLabelModel.offering.Technology = $parse('technology')(feasibilityModalData);
        $scope.searchofferingModel.offering.CustomerCategory = $parse('CustomerCategory')(searchofferingsModalData);
        $scope.searchofferingModel.offering.CustomerSubCategory = $parse('CustomerSubCategory')(searchofferingsModalData);

    }

    //Setting the default values
    var settingDeafaultValues = function (){  
        var categoryLists = $scope.lists.masterData.partyTypes.partyType;      
        $scope.setCategoryDefault(categoryLists);
        $scope.setServiceDefault($scope.services);
        $scope.setBusinessTypeDefault($scope.businessTypes); 
    }

    // calling dependant functions on load
    var onLoadCall = function () {         
        var serviceType = store.get('service');
        $scope.searchofferingModel.offering.LoB = _.isEmpty(serviceType)
            ? MasterDataUtil.getMasterDataDefault(masterData, [MASTER_CONFIG.SERVICE_TYPE])[MASTER_CONFIG.SERVICE_TYPE]
            : serviceType;
        settingDeafaultValues();
        updateSearchOfferingModel();
        //$scope.searchofferingModel.offering.Country = MasterDataUtil.getMasterDataDefault($scope.lists, [MASTER_CONFIG.COUNTRY])[MASTER_CONFIG.COUNTRY];
    }

    onLoadCall();

}

module.controller(FxlSelectOfferingCtrl.name, FxlSelectOfferingCtrl);