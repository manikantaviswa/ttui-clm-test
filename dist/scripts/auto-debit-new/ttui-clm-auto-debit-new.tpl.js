/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";

angular.module('TT-UI-CLM.AutoDebitNew.Tpl',[]).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/auto-debit-new/views/auto-debit-new.tpl.html',
    "<div class=\"panel panel-ttui\" ng-form=\"autoDebitForm\"><div ng-if=\"!review\"><div class=\"panel-heading\" ng-if=\"isTitleVisible\"><h3 class=\"panel-title\">{{\"Change Auto-Debit Details\"|translate}}</h3></div><div class=\"panel-body forms-ttui padding-bottom-5px\"><div class=\"row\"><div class=\"col-md-12 row\"><div class=\"col-md-6\"><label class=\"radio-inline\"><input type=\"radio\" name=\"autoDebitPaymentMode\" value=\"N\" ng-click=\"\" ng-model=\"model.isAutoDebitApplicable\"> {{\"No Auto-Debit\"|translate}}</label><label class=\"radio-inline\"><input type=\"radio\" name=\"autoDebitPaymentMode\" value=\"C\" ng-click=\"selectDebitCreditData()\" ng-model=\"model.isAutoDebitApplicable\"> {{\"Debit/Credit Card\"|translate}}</label><label class=\"radio-inline\"><input type=\"radio\" name=\"autoDebitPaymentMode\" value=\"D\" ng-click=\"selectDirectDebitData()\" ng-model=\"model.isAutoDebitApplicable\"> {{\"Direct Debit\"|translate}}</label></div></div></div></div><div class=\"panel-body forms-ttui padding-bottom-5px\"><div class=\"row\"><div class=\"col-md-12 row\"><div ng-if=\"model.isAutoDebitApplicable != 'N' && (model.isAutoDebitApplicable ==='C' || model.isAutoDebitApplicable ==='D')\"><div class=\"col-sm-6\"><div class=\"form-group is-required\" ng-class=\"({'has-error': autoDebitForm.upperLimit.$invalid && isFormValid})\"><label for=\"upper-limit\" class=\"col-sm-4 control-label\" translate=\"Auto-Debit Upper Limit\">Auto-Debit Upper Limit</label><div class=\"control-content col-sm-2\"><input type=\"text\" class=\"form-control\" id=\"upper-limit\" name=\"upperLimit\" ng-model=\"model.autoDebitDetails.autoDebitUpperLimit\" whole-number-only maxlength=\"10\" required> <span ng-show=\"autoDebitForm.upperLimit.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div><div class=\"form-group is-required\" ng-class=\"{'has-error': autoDebitForm.autoDebitStartDate.$invalid && isFormValid}\"><label for=\"start-date\" class=\"col-sm-4 control-label\" translate=\"Auto-Debit Start Date\">Auto-Debit Start Date</label><div class=\"control-content col-sm-2\"><input type=\"text\" class=\"form-control\" bs-datepicker id=\"start-date\" name=\"autoDebitStartDate\" data-min-date=\"today\" ng-model=\"model.autoDebitDetails.startDate.$date\" required> <i class=\"form-control-feedback glyphicon glyphicon-calendar\"></i> <span ng-show=\"autoDebitForm.autoDebitStartDate.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div><div class=\"form-group is-required\" ng-class=\"{'has-error': autoDebitForm.autoDebitEndDate.$invalid && isFormValid}\"><label for=\"end-date\" class=\"col-sm-4 control-label\" translate=\"Auto-Debit End Date\">Auto-Debit End Date</label><div class=\"control-content col-sm-2\"><input type=\"text\" class=\"form-control\" bs-datepicker id=\"end-date\" name=\"autoDebitEndDate\" data-max-date=\"maxDate\" ng-model=\"model.autoDebitDetails.endDate.$date\" required> <i class=\"form-control-feedback glyphicon glyphicon-calendar\"></i> <span ng-show=\"autoDebitForm.autoDebitEndDate.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div><div class=\"form-group is-required\" ng-class=\"{'has-error': autoDebitForm.remarks.$invalid && isFormValid}\"><label for=\"remarks\" class=\"col-sm-4 control-label\" translate=\"Remarks\">Remarks</label><div class=\"control-content col-sm-2\"><input type=\"text\" class=\"form-control\" id=\"remarks\" name=\"remarks\" ng-model=\"model.autoDebitDetails.remarks\" required> <span ng-show=\"autoDebitForm.remarks.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div></div></div><div ng-if=\"model.isAutoDebitApplicable === 'D'\"><div class=\"col-sm-6\"><div class=\"form-group is-required\" ng-class=\"{'has-error': autoDebitForm.bankName.$invalid && isFormValid}\"><label for=\"bank-name\" class=\"col-sm-4 control-label\" translate=\"Bank Name\">Bank Name</label><div class=\"control-content col-sm-2\"><select class=\"form-control\" id=\"bank-name\" name=\"bankName\" ng-model=\"model.autoDebitDetails.directDebit.bank.masterCode\" ng-change=\"BankBranches()\" ng-options=\"bank.code as bank.name for bank in masterCode.masterData.banks.bank\" required><option value=\"\">{{'Select' | translate}}</option></select><span ng-show=\"autoDebitForm.bankName.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div><div class=\"form-group is-required\" ng-class=\"{'has-error': autoDebitForm.bankBranchName.$invalid && isFormValid}\"><label for=\"branch-name\" class=\"col-sm-4 control-label\" translate=\"Bank Branch Name\">Bank Branch Name</label><div class=\"control-content col-sm-2\"><select class=\"form-control\" id=\"branch-name\" name=\"bankBranchName\" ng-model=\"model.autoDebitDetails.directDebit.bankBranch.masterCode\" ng-options=\"branch.code as branch.name for branch in bankBranches\" required><option value=\"\">{{'Select' | translate}}</option></select><span ng-show=\"autoDebitForm.bankBranchName.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div><div class=\"form-group is-required\" ng-class=\"{'has-error': autoDebitForm.accountType.$invalid && isFormValid}\"><label for=\"account-type\" class=\"col-sm-4 control-label\" translate=\"Bank Account Type\">Bank Account Type</label><div class=\"control-content col-sm-2\"><select class=\"form-control\" id=\"account-type\" name=\"accountType\" ng-model=\"model.autoDebitDetails.directDebit.debitAccountType\" ng-options=\"accountTypes.code as accountTypes.name for accountTypes in masterCode.masterData.debitAccountTypes.debitAccountType\" required><option value=\"\">{{'Select' | translate}}</option></select><span ng-show=\"autoDebitForm.accountType.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div><div class=\"form-group is-required\" ng-class=\"{'has-error': autoDebitForm.accountHolderName.$invalid && isFormValid}\"><label for=\"holder-name\" class=\"col-sm-4 control-label\" translate=\"Account Holder Name\">Account Holder Name</label><div class=\"control-content col-sm-2\"><input type=\"text\" class=\"form-control\" id=\"holder-name\" name=\"accountHolderName\" ng-model=\"model.autoDebitDetails.directDebit.accountHolderName\" maxlength=\"50\" required> <span ng-show=\"autoDebitForm.accountHolderName.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div><div class=\"form-group is-required\" ng-class=\"{'has-error': autoDebitForm.accountNumber.$invalid && isFormValid}\"><label for=\"account-number\" class=\"col-sm-4 control-label\" translate=\"Account Number\">Account Number</label><div class=\"control-content col-sm-2\"><input type=\"text\" class=\"form-control\" id=\"account-number\" name=\"accountNumber\" ng-model=\"model.autoDebitDetails.directDebit.accountNumber\" maxlength=\"20\" ng-pattern=\"patternValidation.alphanumeric.pattern\" required> <span ng-show=\"autoDebitForm.accountNumber.$error.pattern\" class=\"help-block\">{{patternValidation.alphanumeric.errorMessage}}</span> <span ng-show=\"autoDebitForm.accountNumber.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div></div></div><div ng-if=\"model.isAutoDebitApplicable === 'C'\"><div class=\"col-sm-6\"><div class=\"form-group is-required\" ng-class=\"{'has-error': autoDebitForm.bankName.$invalid && isFormValid}\"><label for=\"bank-name\" class=\"col-sm-4 control-label\" translate=\"Bank Name\">Bank Name</label><div class=\"control-content col-sm-2\"><select class=\"form-control\" id=\"cardbank-name\" name=\"bankName\" ng-model=\"model.autoDebitDetails.cardDetails.bank.masterCode\" ng-options=\"bank.code as bank.name for bank in masterCode.masterData.banks.bank\" required><option value=\"\">{{'Select' | translate}}</option></select><span ng-show=\"autoDebitForm.bankName.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div><div class=\"form-group is-required\" ng-class=\"{'has-error': autoDebitForm.cardType.$invalid && isFormValid}\"><label for=\"card-type\" class=\"col-sm-4 control-label\" translate=\"Card Type\">Card Type</label><div class=\"control-content col-sm-2\"><select class=\"form-control\" id=\"card-type\" name=\"cardType\" ng-model=\"model.autoDebitDetails.cardDetails.cardType\" ng-options=\"card.code as card.name for card in masterCode.masterData.cardTypes.cardType\" required><option value=\"\">{{'Select' | translate}}</option></select><span ng-show=\"autoDebitForm.cardType.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div><div class=\"form-group is-required\" ng-class=\"{'has-error': autoDebitForm.cardNumber.$invalid && isFormValid}\"><label for=\"card-number\" class=\"col-sm-4 control-label\" translate=\"Card Number\">Card Number</label><div class=\"control-content col-sm-2\"><input type=\"text\" class=\"form-control\" id=\"card-number\" name=\"cardNumber\" whole-number-only ng-model=\"model.autoDebitDetails.cardDetails.cardNumber\" maxlength=\"20\" required> <span ng-show=\"autoDebitForm.cardNumber.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div><div class=\"form-group is-required\" ng-class=\"{'has-error': autoDebitForm.cardHolderName.$invalid && isFormValid}\"><label for=\"card-holder-name\" class=\"col-sm-4 control-label\" translate=\"Card Holder Name\">Card Holder Name</label><div class=\"control-content col-sm-2\"><input type=\"text\" class=\"form-control\" id=\"card-holder-name\" name=\"cardHolderName\" ng-model=\"model.autoDebitDetails.cardDetails.cardHolderName\" maxlength=\"50\" required> <span ng-show=\"autoDebitForm.cardHolderName.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div><div class=\"form-group is-required\" ng-class=\"{'has-error': (autoDebitForm.expirymonth.$invalid || autoDebitForm.expiryyear.$invalid) && isFormValid}\"><label for=\"expirymonth expiryyear\" class=\"col-sm-4 control-label\" translate=\"Expiration Date\">Expiration Date</label><div class=\"control-content col-sm-2\"><div class=\"col-sm-6 list-unstyled\"><select class=\"form-control\" id=\"expirymonth\" name=\"expirymonth\" ng-model=\"expiry.month\" ng-class=\"{'has-error': autoDebitForm.expirymonth.$invalid && isFormValid}\" ng-change=\"getExpieryDate()\" required><option value=\"\">{{'Select' | translate}}</option><option ng-repeat=\"month in calendar.arrMonth\" value=\"{{month.code}}\">{{month.name}}</option></select><span ng-show=\"autoDebitForm.expirymonth.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div><div class=\"col-sm-6\"><select class=\"form-control\" id=\"expiryyear\" name=\"expiryyear\" ng-model=\"expiry.year\" ng-class=\"{'has-error': autoDebitForm.expiryyear.$invalid && isFormValid}\" ng-change=\"getExpieryDate()\" required><option value=\"\">{{'Select' | translate}}</option><option ng-repeat=\"year in [] | range: calendar.currentYear:(calendar.currentYear + 5)\" value=\"{{year}}\">{{year}}</option></select><span ng-show=\"autoDebitForm.expiryyear.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div></div></div></div></div></div></div><div class=\"panel panel-ttui\" ng-if=\"defaultAdditionalPayment && model.isAutoDebitApplicable != 'N' && (model.isAutoDebitApplicable ==='C' || model.isAutoDebitApplicable ==='D')\"><div class=\"panel-heading\"><h3 class=\"panel-title\">{{\"Additional Payment Modes\"|translate}}</h3></div><div class=\"panel-body forms-ttui\"><div class=\"row\"><div class=\"col-md-12 row\"><div class=\"col-md-6\"><div class=\"form-group\"><label class=\"checkbox-inline\"><input type=\"checkbox\" name=\"sbmAtmOption\" ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model=\"model.autoDebitDetails.sbmAtmOption\" ng-change=\"model.autoDebitDetails.sbmServiceId = model.autoDebitDetails.sbmAtmOption === 'N' ? '' : model.autoDebitDetails.sbmServiceId\"> {{\"SBM ATM Payment\"|translate}}</label></div></div><div class=\"col-md-6\" ng-if=\"model.autoDebitDetails.sbmAtmOption === 'Y'\"><div class=\"form-group is-required\" ng-class=\"{'has-error': autoDebitForm.sbmServiceId.$invalid && isFormValid}\"><label for=\"sbmServiceId\" class=\"col-sm-4 control-label\">{{'MSISDN / Telephone' | translate}}</label><div class=\"control-content col-sm-2\"><input type=\"text\" class=\"form-control\" id=\"sbmServiceId\" name=\"sbmServiceId\" ng-model=\"model.autoDebitDetails.sbmServiceId\" whole-number-only maxlength=\"10\" required> <span ng-show=\"autoDebitForm.sbmServiceId.$invalid && isFormValid\" class=\"help-block\">{{formValidationMessage}}</span></div></div></div></div><div class=\"col-md-12 row\"><div class=\"col-md-6\"><div class=\"form-group\"><label class=\"checkbox-inline\"><input type=\"checkbox\" name=\"orangeMoney\" ng-true-value=\"'Y'\" ng-false-value=\"'N'\" ng-model=\"model.autoDebitDetails.orangeMoneyOption\"> {{\"Orange Money Payment\"|translate}}</label></div></div></div></div></div></div></div><div ng-if=\"review\"><div class=\"panel-body forms-ttui row\"><div class=\"col-sm-12 row\"><div class=\"form-group\" ng-class=\"{'has-error': billingForm.debitType.$invalid && isFormValid}\"><div class=\"col-sm-6\"><div><span translate=\"No Auto Debit\" ng-if=\"model.isAutoDebitApplicable=='N'\">No Auto Debit</span> <span translate=\"Debit/Credit Card\" ng-if=\"model.isAutoDebitApplicable=='C'\">Debit/Credit Card</span> <span translate=\"Direct Debit\" ng-if=\"model.isAutoDebitApplicable=='D'\">Direct Debit</span></div></div></div></div><div ng-if=\"model.isAutoDebitApplicable != 'N' && (model.isAutoDebitApplicable ==='C' || model.isAutoDebitApplicable ==='D')\"><div class=\"col-sm-6\"><div class=\"form-group\"><label class=\"col-sm-4 control-label\" translate=\"Auto-Debit Upper Limit\">Auto-Debit Upper Limit</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.autoDebitUpperLimit}}</div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" translate=\"Bank Name\">Bank Name</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.cardDetails.bank.masterCode | lookup:masterCode.masterData.banks.bank}}</div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" translate=\"Auto-Debit Start Date\">Auto-Debit Start Date</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.startDate.$date | date : dateFormat}}</div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" translate=\"Auto-Debit End Date\">Auto-Debit End Date</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.endDate.$date | date : dateFormat}}</div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" translate=\"Remarks\">Remarks</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.remarks}}</div></div></div><div ng-if=\"model.isAutoDebitApplicable === 'D'\"><div class=\"col-sm-6\"><div class=\"form-group\"><label class=\"col-sm-4 control-label\" translate=\"Bank Name\">Bank Name</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.directDebit.bank.masterCode | lookup:masterCode.masterData.banks.bank}}</div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" translate=\"Bank Branch Name\">Bank Branch Name</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.directDebit.bankBranch.masterCode | lookup:bankBranches}}</div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" translate=\"Bank Account Type\">Bank Account Type</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.directDebit.debitAccountType | lookup:masterCode.masterData.debitAccountTypes.debitAccountType}}</div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" translate=\"Account Holder Name\">Account Holder Name</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.directDebit.accountHolderName}}</div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" translate=\"Account Number\">Account Number</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.directDebit.accountNumber}}</div></div></div></div><div ng-if=\"model.isAutoDebitApplicable === 'C'\"><div class=\"col-sm-6\"><div class=\"form-group\"><label class=\"col-sm-4 control-label\" translate=\"Card Type\">Card Type</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.cardDetails.cardType | lookup: masterCode.masterData.cardTypes.cardType}}</div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" translate=\"Card Number\">Card Number</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.cardDetails.cardNumber}}</div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" translate=\"Card Holder Name\">Card Holder Name</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.cardDetails.cardHolderName}}</div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" translate=\"Card Expiry Date\">Card Expiry Date</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.cardDetails.cardExpiryDate.$date | date : dateFormat }}</div></div></div></div></div></div><div class=\"panel panel-ttui\" ng-if=\"defaultAdditionalPayment && model.isAutoDebitApplicable != 'N' && (model.isAutoDebitApplicable ==='C' || model.isAutoDebitApplicable ==='D')\"><div class=\"panel-heading\"><h3 class=\"panel-title\">{{\"Additional Payment Modes\"|translate}}</h3></div><div class=\"panel-body forms-ttui\"><div class=\"row\"><div class=\"col-md-12 row\"><div class=\"col-md-6\"><div class=\"form-group\"><label class=\"col-sm-4 control-label\">{{\"SBM ATM Payment\"|translate}}</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.sbmAtmOption === 'Y' ? 'Yes' : 'No'}}</div></div></div><div class=\"col-md-6\" ng-if=\"model.autoDebitDetails.sbmAtmOption === 'Y'\"><div class=\"form-group\" ng-class=\"{'has-error': autoDebitForm.sbmServiceId.$invalid && isFormValid}\"><label for=\"sbmServiceId\" class=\"col-sm-4 control-label\">{{'MSISDN / Telephone' | translate}}</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.sbmServiceId}}</div></div></div></div><div class=\"col-md-12 row\"><div class=\"col-md-6\"><div class=\"form-group\"><label class=\"col-sm-4 control-label\">{{\"Orange Money Payment\"|translate}}</label><div class=\"control-content col-sm-2\">{{model.autoDebitDetails.orangeMoneyOption === 'Y' ? \"Yes\" : \"No\"}}</div></div></div></div></div></div></div></div></div>"
  );
}]);
return angular;
})(window, window.angular);
