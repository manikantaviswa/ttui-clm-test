'use strict';

var module = angular.module('TT-UI-CLM.Common.Services.Config', [])
    .constant('CLM_COMMON_CONFIG', {
        MASTER_CUSTOMER_TYPE: 'masterData.partyTypes.partyType',
        MASTER_INDUSTRIES: 'masterData.industries.industry',
        MASTER_ADDRESS_TYPES: 'masterData.addressTypes.addressType',
        MASTER_COUNTRIES: 'countries.country',
        MASTER_CONTACT_TYPES: 'masterData.contactTypes.contactType',
        MASTER_PREMISES_TYPES: 'masterData.premises.premise',
        MASTER_LANGUAGES: 'masterData.languages.language',
        MASTER_PREFERRED_MODE_OF_COMMUNICATIONS: 'masterData.preferredModeOfCommunications.preferredModeOfCommunication',
        MASTER_PREFERRED_TIMES: 'masterData.preferredTimes.preferredTime',
        MASTER_SUFFIX: 'masterData.suffixes.suffix',
        MASTER_TITLE: 'masterData.titles.title',
        MASTER_CURRENCIES: 'masterData.currencies.currency',
        MASTER_ACCOUNT_TYPES: 'masterData.accountTypes.accountType',
        MASTER_BILL_PERIODICITY: 'billPeriodicities.billPeriodicity',
        MASTER_BILL_DISPATCH_DETAILS: 'masterData.billDispatchModes.billDispatchMode',
        MASTER_CARD_TYPES: 'masterData.cardTypes.cardType',
        MASTER_DUNNING_SCHEDULE: 'dunningSchedules.dunningSchedule',
        MASTER_BANKS: 'masterData.banks.bank',
        MASTER_MSISDN_CATEGORY : 'masterData.MSISDNCategories.MSISDNCategory',
        MASTER_MSISDN_SELECTION : 'masterData.MSISDNSelections.MSISDNSelection',
        MASTER_BUSINESS_TYPE : 'masterData.businessTypes.businessType',
        MASTER_SERVICE_TYPE : 'masterData.serviceTypes.serviceType',
        MASTER_COUNTRY : 'countries.country',
        MASTER_REG_TYPE : 'masterData.regTypes.regType',
        MASTER_SUB_SEGMENT : 'masterData.segments.segment',
        MASTER_APPLICATION_MODE : 'masterData.applicationModes.applicationMode',
        MASTER_QUALIFICATION : 'masterData.highestQualifications.highestQualification',
        MASTER_INCOME_RANGE : 'masterData.incomeRanges.incomeRange',
        MASTER_OCCUPATION : 'masterData.occupations.occupation',
        MASTER_SUBSIDIARY : 'masterData.subsidiaries.subsidiary',
        MASTER_PURPOSES: 'masterData.purposes.purpose',
        MASTER_DOCUMENT_TYPES: 'masterData.documentTypes.documentType',
        MASTER_PERSONAL_QUESTIONS: 'masterData.personalQuestions',
        MASTER_LOCALITIES: 'masterData.localities.locality',
        MASTER_SERVICE_LIMIT_TYPE : 'masterData.serviceLimitTypes.serviceLimitType',
        MASTER_DOMAIN_TYPE : 'masterData.domains.domain',
        MASTER_BASE_STATION_IP_TYPE : 'masterData.baseStations.baseStation',
        MASTER_MOBILE_MONEY_ACCOUNT_TYPE : 'masterData.mobileMoneyAccounts.mobileMoneyAccount',
        MASTER_NATIONALITY: 'masterData.nationalities.nationality',
        MASTER_VIRTUAL_ADDRESS_TYPE: 'masterData.addressTypes.virtualIndividualAddressType',
        MASTER_CS_HOME_REGION: 'masterData.CSHomeRegions.CSHomeRegion',
        MASTER_TAX_EXEMPTION :'masterData.taxExemptionCategories.taxExemptionCategory',
        MASTER_DEBIT_ACCOUNT_TYPE: 'masterData.debitAccountTypes.debitAccountType',
        MASTER_TAX_POLICIES: 'masterData.taxPolicyIds.taxPolicyId',
        MASTER_REGISTRATION_TYPE: 'masterData.cvTypes.cvType',
        MASTER_PAYMENT_METHOD: 'paymentMethods.paymentMethod',
        MASTER_PAYMENT_CURRENCY: 'masterData.paymentCurrencies.paymentCurrency',
        MASTER_BILLING_REGION: 'masterData.billingRegions.billingRegion',
        MASTER_LANDLORD_DESIGNATION: 'masterData.designations.designation',
        MASTER_CV_APPROVE_REASONS: 'masterData.cvApprReasons.cvApprReason',
        MASTER_CV_REJECT_REASONS: 'masterData.cvRejReasons.cvRejReason',
        MASTER_WAIVE_OFF_APPR_REASONS: 'masterData.waiveOffApprReasons.waiveOffApprReason',
        MASTER_WAIVE_OFF_REJECT_REASONS: 'masterData.waiveOffRejReasons.waiveOffRejReason',
		MASTER_TELEPHONE_CATEGORIES: 'masterData.telephoneCategories.telephoneCategory',
        MASTER_TELEPHONE_SELECTIONS: 'masterData.telephoneSelections.telephoneSelection',
        MASTER_INSTALLATION_TYPES: 'masterData.installationTypes.installationType'
    })
    .constant('COMMON_MASTER_CONFIG', {
        CUSTOMER_TYPE: 'MASTER_CUSTOMER_TYPE',
        INDUSTRIES: 'MASTER_INDUSTRIES',
        ADDRESS_TYPES: 'MASTER_ADDRESS_TYPES',
        COUNTRIES: 'MASTER_COUNTRIES',
        CONTACT_TYPES: 'MASTER_CONTACT_TYPES',
        PREMISES_TYPES: 'MASTER_PREMISES_TYPES',
        LANGUAGES: 'MASTER_LANGUAGES',
        PREFERRED_MODE_OF_COMMUNICATIONS: 'MASTER_PREFERRED_MODE_OF_COMMUNICATIONS',
        PREFERRED_TIMES: 'MASTER_PREFERRED_TIMES',
        SUFFIX: 'MASTER_SUFFIX',
        TITLE: 'MASTER_TITLE',
        ACCOUNT_TYPES: 'MASTER_ACCOUNT_TYPES',
        CURRENCIES: 'MASTER_CURRENCIES',
        BILL_PERIODICITY: 'MASTER_BILL_PERIODICITY',
        BILL_DISPATCH_DETAILS: 'MASTER_BILL_DISPATCH_DETAILS',
        CARD_TYPES: 'MASTER_CARD_TYPES',
        DUNNING_SCHEDULE: 'MASTER_DUNNING_SCHEDULE',
        BANKS: 'MASTER_BANKS',
        MSISDN_CATEGORIES : 'MASTER_MSISDN_CATEGORY',
        MSISDN_SELECTIONS : 'MASTER_MSISDN_SELECTION',
        BUSINESS_TYPE : 'MASTER_BUSINESS_TYPE',
        SERVICE_TYPE : 'MASTER_SERVICE_TYPE',
        COUNTRY : 'MASTER_COUNTRY',
        REG_TYPE : 'MASTER_REG_TYPE',
        DOMAIN_TYPE : 'MASTER_DOMAIN_TYPE',
        BASE_STATION_IP_TYPE : 'MASTER_BASE_STATION_IP_TYPE',
        SUB_SEGMENT : 'MASTER_SUB_SEGMENT',
        APPLICATION_MODE : 'MASTER_APPLICATION_MODE',
        QUALIFICATION : 'MASTER_QUALIFICATION',
        INCOME_RANGE : 'MASTER_INCOME_RANGE',
        OCCUPATION : 'MASTER_OCCUPATION',
        SUBSIDIARY : 'MASTER_SUBSIDIARY',
        PURPOSES: 'MASTER_PURPOSES',
        DOCUMENT_TYPES: 'MASTER_DOCUMENT_TYPES',
        PERSONAL_QUESTIONS: 'MASTER_PERSONAL_QUESTIONS',
        DEFAULT_DOCUMENT_PURPOSE : 'POID',
        LOCALITIES: 'MASTER_LOCALITIES',
        SERVICE_LIMIT_TYPE : 'MASTER_SERVICE_LIMIT_TYPE',
        MOBILE_MONEY_ACCOUNT_TYPE : 'MASTER_MOBILE_MONEY_ACCOUNT_TYPE',
        NATIONALITY: 'MASTER_NATIONALITY',
        VIRTUAL_ADDRESS_TYPE: 'MASTER_VIRTUAL_ADDRESS_TYPE',
        CS_HOME_REGION: 'MASTER_CS_HOME_REGION',
        TAX_EXEMPTION : 'MASTER_TAX_EXEMPTION',
        DEBIT_ACCOUNT_TYPE: 'MASTER_DEBIT_ACCOUNT_TYPE',
        TAX_POLICIES: 'MASTER_TAX_POLICIES',
        REGISTRATION_TYPE: 'MASTER_REGISTRATION_TYPE',
        PAYMENT_METHOD:'MASTER_PAYMENT_METHOD',
        PAYMENT_CURRENCY:'MASTER_PAYMENT_CURRENCY',
        BILLING_REGION:'MASTER_BILLING_REGION',
        LANDLORD_DESIGNATION:'MASTER_LANDLORD_DESIGNATION',
        CV_APPROVE_REASONS:'MASTER_CV_APPROVE_REASONS',
        CV_REJECT_REASONS:'MASTER_CV_REJECT_REASONS',
        WAIVE_OFF_APPR_REASONS:'MASTER_WAIVE_OFF_APPR_REASONS',
        WAIVE_OFF_REJECT_REASONS:'MASTER_WAIVE_OFF_REJECT_REASONS',
		TELEPHONE_CATEGORIES: 'MASTER_TELEPHONE_CATEGORIES',
        TELEPHONE_SELECTIONS: 'MASTER_TELEPHONE_SELECTIONS',
        INSTALLATION_TYPES: 'MASTER_INSTALLATION_TYPES'
    });
