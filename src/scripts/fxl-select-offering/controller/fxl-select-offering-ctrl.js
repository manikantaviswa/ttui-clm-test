'use strict';

var module = angular.module('TT-UI-CLM.FxlSelectOffering.Controllers.FxlSelectOfferingCtrl', [
    'TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingService',
    'CLM-UI.Customers.Corporate.Services.MasterDataUtil'
]);

FxlSelectOfferingCtrl.$inject = ['$scope', 'FxlSelectOfferingService', 'MasterDataUtil'];

function FxlSelectOfferingCtrl($scope, FxlSelectOfferingService, MasterDataUtil) {
    $scope.lists = FxlSelectOfferingService.getAllList($scope.masterData);
    $scope.services = FxlSelectOfferingService.getServices($scope.masterData);
    $scope.technologies = FxlSelectOfferingService.getTechnologies($scope.masterData);
    $scope.customerCategories = FxlSelectOfferingService.getCustomerCategories($scope.masterData);
    $scope.nationalities = FxlSelectOfferingService.getCustomerNationalities($scope.masterData);
    $scope.businessTypes = FxlSelectOfferingService.getBusinessTypes($scope.masterData);
    $scope.plans = FxlSelectOfferingService.getPlans($scope.masterData);

    //Get Customer Subcategory (This function must be clean later)
    $scope.getCustomerSubCategory = function(customerCategory){
        MasterDataUtil.getCustomerSubCategory($scope.searchofferingModel.offering.CustomerType, customerCategory).then(function(data){
            $scope.customerSubCategoryList =  data;
            angular.forEach($scope.customerSubCategoryList, function(temp){
                if ($scope.searchofferingModel.CustomerSubCategory === '' && angular.isDefined(temp.default)){
                    $scope.searchofferingModel.CustomerSubCategory = temp.code;
                }
            });
        });
    };

    //Get Customer Category (This function must be clean later)
    $scope.getCustomerCategory = function(){
        if (angular.isDefined($scope.searchofferingModel.offering.CustomerType)){
            MasterDataUtil.getCustomerCategory($scope.searchofferingModel.offering.CustomerType).then(function(data){
                $scope.customerCategoryList =  data;
                if (angular.isDefined($scope.customerCategoryList)){
                    angular.forEach($scope.customerCategoryList, function(temp){
                        if ($scope.searchofferingModel.offering.CustomerCategory === '' && angular.isDefined(temp.default)){
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
            var defaultCustomerType =  MasterDataUtil.getMasterDataDefault($scope.masterData, [MASTER_CONFIG.CUSTOMER_TYPE])[MASTER_CONFIG.CUSTOMER_TYPE];
            MasterDataUtil.getCustomerCategory(defaultCustomerType).then(function(data){
                $scope.searchofferingModel.offering.CustomerType = defaultCustomerType;
                $scope.customerCategoryList =  data;
                angular.forEach($scope.customerCategoryList, function(temp){
                    if (angular.isDefined(temp.default)){
                        $scope.searchofferingModel.offering.CustomerType = temp.code;
                    }
                });
                $scope.getCustomerSubCategory($scope.searchofferingModel.offering.CustomerType);
            });
        }
    };
    

    //Setting the drop down default values function starts here (Want to write a common function for this)
    $scope.setCategoryDefault = function(categoryLists) {
        angular.forEach(categoryLists, function(category) {
            if (category.hasOwnProperty('default') && category.default === 'Y') {
                $scope.searchofferingModel.offering.CustomerCategory = category.categories.category[0].code;
                $scope.getCustomerCategory();
            }
        });
    }

    $scope.setServiceDefault = function(serviceList) {
        angular.forEach(serviceList, function(service) {
            if (service.hasOwnProperty('default') && service.default === 'Y') {
                $scope.searchofferingModel.offering.ProductType = service.code;
            }
        });
    }

    $scope.setBusinessTypeDefault = function(businesstypeList) {
        angular.forEach(businesstypeList, function(businesstype) {
            if (businesstype.hasOwnProperty('default') && businesstype.default === 'Y') {
                $scope.searchofferingModel.offering.BusinessType = businesstype.code;
            }
        });
    }

    //Setting the droap down default values function ends here

    //comon function for calling group oof function on onload
    var onloadCall = function(){        
        var categoryLists = $scope.lists.masterData.partyTypes.partyType;
        $scope.setCategoryDefault(categoryLists);
        $scope.setServiceDefault($scope.services);
        $scope.setBusinessTypeDefault($scope.businessTypes);
    }

    onloadCall();

}

module.controller(FxlSelectOfferingCtrl.name, FxlSelectOfferingCtrl);