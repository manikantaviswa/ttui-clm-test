'use strict';

var module = angular.module('TT-UI-CLM.AutoDebitNew.Controllers.AutoDebitNewController', []);

function autoDebitNewController($scope, $rootScope, FIELD_VALIDATOR_CONFIG, $parse, GetAutoDebitDetails, SR_DEFAULT_VALUES,
    CommonConfiguration, SPINNER_EVENTS, FlashMessage, translateFilter, getDateFormatFn, store, PAYLOAD_NAME) {

    $scope.patternValidation = FIELD_VALIDATOR_CONFIG;
    var __ = translateFilter;
    $scope.formValidationMessage = __('This field is required');

    $scope.defaultUpperLimit = CommonConfiguration.getConfigForKey('billingAutoDebit.autoDebit.defaultUpperLimit');
    $scope.AccountOwnerFullName = CommonConfiguration.getConfigForKey('billingAutoDebit.defaultAccountOwnerFullName');
    $scope.defaultAdditionalPayment = CommonConfiguration.getConfigForKey('billingAutoDebit.autoDebit.defaultAdditionalPayment');

    $scope.BankBranches = function () {
        $scope.bankBranches = [];
        var bankNames = $parse('masterData.banks.bank')($scope.masterCode);
        angular.forEach(bankNames, function (bankNames) {
            if (bankNames.code === $parse('autoDebitDetails.directDebit.bank.masterCode')($scope.model) && bankNames.hasOwnProperty('branches')) {
                $scope.bankBranches = bankNames.branches.branch;
                if (angular.isUndefined($parse('autoDebitDetails.directDebit.bankBranch.masterCode')($scope.model))) {
                    setBankBranch();
                }
                return true;
            }
        });
    };

    function setDirectDebitBankName() {
        var bankNames = $parse('masterData.banks.bank')($scope.masterCode);
        angular.forEach(bankNames, function (bankName) {
            if (bankName.default === 'Y') {
                if (angular.isUndefined($parse('autoDebitDetails.directDebit.bank.masterCode')($scope.model))) {
                    $parse('autoDebitDetails.directDebit.bank.masterCode').assign($scope.model, bankName.code);
                }
                $scope.BankBranches();
            }
        });
    }

    if ($scope.review) {
        $scope.dateFormat = getDateFormatFn();
        if ($parse('autoDebitDetails.cardDetails.bank.masterCode')($scope.model)) {
            $scope.bankBranches = [];
            var bankNames = $parse('masterData.banks.bank')($scope.masterCode);
            angular.forEach(bankNames, function (bankName) {
                if (bankName.code === $parse('autoDebitDetails.directDebit.bank.masterCode')($scope.model) && bankName.hasOwnProperty('branches')) {
                    $scope.bankBranches = bankName.branches.branch;
                }
            });
        }
    } else {
        $scope.expiry = {
            month: '',
            year: ''
        };
        if (!store.get(PAYLOAD_NAME.SR_FINAL_PAYLOAD)) {
            $scope.model = {
                autoDebitDetails: {
                    cardDetails: {

                    }
                },
                isAutoDebitApplicable: 'N',
                sbmAtmOption: 'N',
                orangeMoneyOption: 'N'
            };
            $rootScope.$emit(SPINNER_EVENTS.SHOW);
            GetAutoDebitDetails.GetAutoDebitDetails().then(function (response) {
                $scope.model = $parse('customer.billingAccounts.billingAccount[1]')(response);
                populateSelectedData();
                $rootScope.$emit(SPINNER_EVENTS.HIDE);
            });
        } else {
            populateSelectedData();
        }
    }

    function populateSelectedData() {
        if ($parse('autoDebitDetails.directDebit.bank.masterCode')($scope.model)) {
            setDirectDebitBankName();
        }
        if ($parse('autoDebitDetails.cardDetails.cardExpiryDate.$date')($scope.model)) {
            var _cardExpiryDate = new Date($parse('autoDebitDetails.cardDetails.cardExpiryDate.$date')($scope.model));
            var month = ('0' + (_cardExpiryDate.getMonth() + 1)).slice(-2);
            var year = _cardExpiryDate.getFullYear().toString();
            $parse('month').assign($scope.expiry, month);
            $parse('year').assign($scope.expiry, year);
        }
        if (!$scope.defaultAdditionalPayment) {
            delete $scope.model.autoDebitDetails.sbmAtmOption;
            delete $scope.model.autoDebitDetails.sbmServiceId;
            delete $scope.model.autoDebitDetails.orangeMoneyOption;
        }
    }

    $scope.selectDebitCreditData = function () {
        // 1st half
        selectCommonData();

        // 2nd half
        setDebitCreditCardBankName();
        setDefaultCardType();
        if ($scope.AccountOwnerFullName && angular.isUndefined($parse('autoDebitDetails.cardDetails.cardHolderName')($scope.model))) {
            $scope.AccountOwnerName = $parse('accountOwnerDetails.customerFullName')($scope.model);
            $parse('autoDebitDetails.cardDetails.cardHolderName').assign($scope.model, $scope.AccountOwnerName);

        }
    };

    $scope.selectDirectDebitData = function () {
        // 1st half
        selectCommonData();

        // 2nd half
        setDirectDebitBankName();
        setAccountType();
        if ($scope.AccountOwnerFullName && angular.isUndefined($parse('autoDebitDetails.directDebit.accountHolderName')($scope.model))) {
            $scope.AccountOwnerName = $parse('accountOwnerDetails.customerFullName')($scope.model);
            $parse('autoDebitDetails.directDebit.accountHolderName').assign($scope.model, $scope.AccountOwnerName);
        }
    };

    function selectCommonData() {
        if ($scope.defaultUpperLimit && (angular.isUndefined($parse('autoDebitDetails.autoDebitUpperLimit')($scope.model)))) {
            $scope.upperLimit = CommonConfiguration.getConfigForKey('billingAutoDebit.autoDebit.upperLimitValue');
            $parse('autoDebitDetails.autoDebitUpperLimit').assign($scope.model, $scope.upperLimit);
        }
        if (angular.isUndefined($parse('autoDebitDetails.startDate.$date')($scope.model))) {
            $parse('autoDebitDetails.startDate.$date').assign($scope.model, new Date().toISOString());
        }
        if (angular.isUndefined($parse('autoDebitDetails.endDate.$date')($scope.model))) {
            $parse('autoDebitDetails.endDate.$date').assign($scope.model, new Date('2999-12-31').toISOString());
        }
        if (CommonConfiguration.getConfigForKey('billingAutoDebit.autoDebit.remarks') && angular.isUndefined($parse('autoDebitDetails.remarks')($scope.model))) {
            $parse('autoDebitDetails.remarks').assign($scope.model, CommonConfiguration.getConfigForKey('billingAutoDebit.autoDebit.remarks'));
        }
    }

    $scope.calendar = {
        options: {
            yearmin: new Date(),
            yearmax: new Date(),
            monthstart: 1,
            monthend: 12
        },
        arrMonth: [{
            name: 'Jan',
            code: '01'
        }, {
            name: 'Feb',
            code: '02'
        }, {
            name: 'Mar',
            code: '03'
        }, {
            name: 'Apr',
            code: '04'
        }, {
            name: 'May',
            code: '05'
        }, {
            name: 'Jun',
            code: '06'
        }, {
            name: 'Jul',
            code: '07'
        }, {
            name: 'Aug',
            code: '08'
        }, {
            name: 'Sep',
            code: '09'
        }, {
            name: 'Oct',
            code: '10'
        }, {
            name: 'Nov',
            code: '11'
        }, {
            name: 'Dec',
            code: '12'
        }],
        currentYear: new Date().getFullYear()
    };

    $scope.getExpieryDate = function () {
        if ($scope.expiry.month && $scope.expiry.year) {
            var expDate = getDateFromMonthYear($scope.expiry.month, $scope.expiry.year);
            if (expDate) {
                var date = {
                    '$date': ''
                };
                date.$date = expDate;
                $parse('autoDebitDetails.cardDetails.cardExpiryDate').assign($scope.model, date);
            }
        }
    };

    function getDateFromMonthYear(month, year) {
        if (angular.isDefined(month) && angular.isDefined(year)) {
            var exp = new Date();
            var mnth = exp.getMonth() + 1;
            var yer = exp.getFullYear();

            if (yer === parseInt(year) && mnth > parseInt(month)) {
                var result = 'please enter the valid expiry month';
                FlashMessage.show('', result, 'danger');
                $scope.expiry.month = '';
                $scope.expiry.year = '';

            } else {
                exp.setMonth(month - 1);
                exp.setFullYear(year);
                exp.setHours(0, 0, 0, 0);
                return exp;
            }
        }
    }

    function setDefaultCardType() {
        var cardTypes = $parse('masterData.cardTypes.cardType')($scope.masterCode);
        angular.forEach(cardTypes, function (cardType) {
            if (cardType.default === 'Y' && angular.isUndefined($parse('autoDebitDetails.cardDetails.cardType')($scope.model))) {
                $parse('autoDebitDetails.cardDetails.cardType').assign($scope.model, cardType.code);
                return cardType.code;
            }
        });
    }

    function setDebitCreditCardBankName() {
        var bankNames = $parse('masterData.banks.bank')($scope.masterCode);
        angular.forEach(bankNames, function (bankName) {
            if (bankName.default === 'Y' && angular.isUndefined($parse('autoDebitDetails.cardDetails.bank.masterCode')($scope.model))) {
                $parse('autoDebitDetails.cardDetails.bank.masterCode').assign($scope.model, bankName.code);
            }
        });
    }

    function setBankBranch() {
        angular.forEach($scope.bankBranches, function (branch) {
            if (branch.default === 'Y') {
                $parse('autoDebitDetails.directDebit.bankBranch.masterCode').assign($scope.model, branch.code);
                return true;
            }
        });
    }

    function setAccountType() {
        var accountTypes = $parse('masterData.debitAccountTypes.debitAccountType')($scope.masterCode);
        angular.forEach(accountTypes, function (accountType) {
            if (accountType.default === 'Y' && angular.isUndefined($parse('autoDebitDetails.directDebit.debitAccountType')($scope.model))) {
                $parse('autoDebitDetails.directDebit.debitAccountType').assign($scope.model, accountType.code);
                return accountType.code;
            }
        });
    }

}

autoDebitNewController.$inject = ['$scope', '$rootScope', 'FIELD_VALIDATOR_CONFIG', '$parse', 'GetAutoDebitDetails', 'SR_DEFAULT_VALUES',
    'CommonConfiguration', 'SPINNER_EVENTS', 'FlashMessage', 'translateFilter', 'getDateFormatFn', 'store', 'PAYLOAD_NAME'];

module.controller(autoDebitNewController.name, autoDebitNewController);
