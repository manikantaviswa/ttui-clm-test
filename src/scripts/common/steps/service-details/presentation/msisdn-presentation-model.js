'use strict';

angular.module('TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.MSISDNPresentaionModel', [
    'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.CommonSuggestionBoxPresentationModel',
    'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Strategy.MSISDNStrategyFactory',
    'TT-UI-CLM.Common.Utils.ErrorHandler',
    'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonMsisdnLocker',
    'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Services.MsisdnService',
    'TT-UI-CLM.Common.Api.Utils.Assert',
    'TT-UI-CLM.Common.Steps.Presentation.Strategy.ManualMsisdnStrategy',
    'TT-UI-CLM.Common.Steps.Presentation.Strategy.AutomaticMsisdnStrategy'
])
    .constant('MSISDN_SELECT_SERVICE_SETTINGS', {
        MSISDN_SELECTION_AUTO : 'Automatic',
        MSISDN_SELECTION_MANUAL	: 'Manual',
        MSISDN_SELECTION_RESERVE : 'Reserved'
    });

function CommonMsisdnPresentationModelFactory($parse,
                                        $q,
                                        CommonSuggestionBoxPresentationModel,
                                        Assert,
                                        CommonMsisdnService,
                                        MsisdnStrategyFactory,
                                        CommonMsisdnLocker,
                                        errorHandlerFn,
                                        CONFIG,
                                        MSISDN_SELECT_SERVICE_SETTINGS, CommonManualMsisdnStrategy, CommonAutomaticMsisdnStrategy){

    CommonMsisdnPresentationModel.prototype = Object.create(CommonSuggestionBoxPresentationModel.prototype);
    CommonMsisdnPresentationModel.prototype.constructor = CommonMsisdnPresentationModel;

   // var captcha = CaptchaDialog();

    function CommonMsisdnPresentationModel(model, isMSISDNPrefixRequired) {
        CommonSuggestionBoxPresentationModel.call(this);
        Assert.isDefined(model);
        this.isMsisdnPrefixRequired = angular.isDefined(isMSISDNPrefixRequired) ? isMSISDNPrefixRequired : true;
        this.itemsSourceField = 'number';
        this.model = model;
        this.strategy = MsisdnStrategyFactory();
        //console.log("this.strategy>>>>>>>>>>>>>>>",this.strategy);
        this.captchaVerified = false;
        this.msisdnLocker = CommonMsisdnLocker;
        if (model.mobileNumber) {
            this.selectedItem = {
                number: model.mobileNumber
            };
        }

        _.bindAll(this);
    }

    CommonMsisdnPresentationModel.prototype.isSelectionAllowed = function(value) {
        return angular.isDefined(this._findMsisdnObjectForNumber(value));
    };

    CommonMsisdnPresentationModel.prototype.isReadonly = function() {
        return angular.isDefined(this.selectedItem);
    };

    CommonMsisdnPresentationModel.prototype.update = function(fieldName) {
        $parse('mobileNumber').assign(this.model, '');
        return $q.when(this._updateStrategy())
            .then(this._updateSelection)
            //.then(this.assignValueToModel(formModel))
            //.then(this._showCaptchaIfApplicable.bind(this, fieldName))
            //.then(this._fetchMoreIfNotSelected);
    };

    /*MsisdnPresentationModel.prototype._showCaptchaIfApplicable = function(fieldName) {
        var promise = $q.when();

        if (this._isCaptchaApplicable()){
            if (fieldName === 'MSISDNSelection'){
                promise = promise.then(this._showCaptcha);
            } else {
                promise = $q.reject();
            }
        }

        return promise;
    };*/

    /*MsisdnPresentationModel.prototype._isCaptchaApplicable = function(){
        return CONFIG.CAPTCHA_REQUIRED === 'true' && this.model.selectionType === 'Manual' && !this.captchaVerified;
    };

    MsisdnPresentationModel.prototype._showCaptcha = function(){
        return captcha.show()
            .then(this._setCaptchaVerified)
            .catch(this._resetSelectionField);
    };

    MsisdnPresentationModel.prototype._setCaptchaVerified = function(){
        this.captchaVerified = true;
    };*/

    CommonMsisdnPresentationModel.prototype._resetSelectionField = function(){
        this.model.selectionType = undefined;
    };

    CommonMsisdnPresentationModel.prototype._load = function(value) {
        if (angular.isUndefined(this.strategy.load)){
            this._updateStrategy();
        }
        return this.strategy.load(value, this.isMsisdnPrefixRequired).catch(errorHandlerFn);
    };

    CommonMsisdnPresentationModel.prototype._search = function(value) {
        this.toSearchNumber = value;
        this.strategy.update(this.model);
        return this.strategy.search(value, this.isMsisdnPrefixRequired).catch(errorHandlerFn);
    };

    CommonMsisdnPresentationModel.prototype._select = function(value) {
        var serviceNumbers = [value];
        //console.log("value>>>>>",value)
        return this.msisdnLocker.lock(serviceNumbers, this.model)
            .then(this._findMsisdnObjectForNumber.bind(this, value), this._clear.bind(this))
            .catch(errorHandlerFn);
    };

    CommonMsisdnPresentationModel.prototype._clear = function(errors) {
        this.model.mobileNumber = '';
        this.model.hlrOfMsisdn = '';
        this.selectedItem = '';
        return $q.reject(errors);
    };

    CommonMsisdnPresentationModel.prototype._deselect = function() {
        //console.log("this.model>>>>>>>>>", this.model);
        return this.msisdnLocker.free(this.model)
            .catch(errorHandlerFn);
    };

    CommonMsisdnPresentationModel.prototype._setSelectedItem = function(value) {
        var newItemSelected = angular.isDefined(value);

        this.selectedItem = value;
        if (newItemSelected) {
            this.model.mobileNumber = value.number;
            this.model.hlrOfMsisdn = value.hlrNumber;
        } else {
            this.model.mobileNumber = '';
            this.model.hlrOfMsisdn = '';
        }

        return newItemSelected;
    };

    CommonMsisdnPresentationModel.prototype._updateStrategy = function() {
        var selectionType = this.model.selectionType;
        //console.log("selectionType>>>>>",selectionType)
        if (_.get(this, 'strategy.name') !== selectionType) {
            var Strategy = this.getStrategy(selectionType);
            //var Strategy = MsisdnStrategyFactory(selectionType);
            this.strategy = new Strategy(CommonMsisdnService);
            //console.log("this.strategy?????????",this.strategy)
        }
        ////console.log("this.strategy.update(this.model)>>>>>",this.strategy.update(this.model))
        return this.strategy.update(this.model);
    };

    CommonMsisdnPresentationModel.prototype.getStrategy = function(selectionType) {
        if (selectionType === MSISDN_SELECT_SERVICE_SETTINGS.MSISDN_SELECTION_AUTO) {
            return CommonAutomaticMsisdnStrategy;
        } else if (selectionType === MSISDN_SELECT_SERVICE_SETTINGS.MSISDN_SELECTION_MANUAL){
            return CommonManualMsisdnStrategy;
        } else if (selectionType === MSISDN_SELECT_SERVICE_SETTINGS.MSISDN_SELECTION_RESERVE){

        } else {
            return this.DummyMsisdnStrategy;
        }
    };

    CommonMsisdnPresentationModel.prototype.DummyMsisdnStrategy = function() {
        this.name = 'Dummy';
        this.update = _.noop;
        this.load = _.constant($q.when([]));
    };

    CommonMsisdnPresentationModel.prototype._updateSelection = function(value) {
        var queue = $q.when();

        var oldSelectedItemAvailable = !_.isEmpty(this.selectedItem);
        var newSelectedItemAvailable = !_.isEmpty(value);
        var selectionChanged = oldSelectedItemAvailable || newSelectedItemAvailable;

        if (oldSelectedItemAvailable) {
            //console.log("this.toSearchNumber>>>", this.toSearchNumber, value);
            queue.then(this._deselect.bind(this, this.toSearchNumber));
        }

        if (newSelectedItemAvailable) {
            queue.then(this._select.bind(this, value.number));
        }

        if (selectionChanged) {
            queue.then(this._setSelectedItem.bind(this, value));
        }

        return queue;
    };

    CommonMsisdnPresentationModel.prototype._findMsisdnObjectForNumber = function(number) {
        //console.log("number>>>>>>>>>>",number)
        return _.find(this.itemsSource, {number: number} || number);
    };

    CommonMsisdnPresentationModel.prototype._fetchMoreIfNotSelected = function() {
        if (!this.selectedItem && _.get(this, 'strategy.name') !== 'Manual') {
            var prefix = angular.isDefined(this.model.prefix) ? this.model.prefix : '';
            var mobileNumber = angular.isDefined(this.toSearchNumber) ? this.toSearchNumber : '';
            var toSearchNumber = prefix + mobileNumber;
            return this.fetchMore(this.model, toSearchNumber);
        } else if (!this.selectedItem && _.get(this, 'strategy.name') === 'Manual'){
            return this.clearItemSource();
        }
    };

    return CommonMsisdnPresentationModel;
}


CommonMsisdnPresentationModelFactory.$inject = [
    '$parse',
    '$q',
    'CommonSuggestionBoxPresentationModel',
    'Assert',
    'CommonMsisdnService',
    'MsisdnStrategyFactory',
    'CommonMsisdnLocker',
    'errorHandlerFn',
    'CONFIG',
    'MSISDN_SELECT_SERVICE_SETTINGS',
    'CommonManualMsisdnStrategy',
    'CommonAutomaticMsisdnStrategy'
];
module.factory('CommonMsisdnPresentationModel', CommonMsisdnPresentationModelFactory);