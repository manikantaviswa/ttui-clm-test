'use strict';

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
