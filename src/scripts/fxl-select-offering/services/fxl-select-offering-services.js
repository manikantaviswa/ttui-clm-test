'use strict';

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