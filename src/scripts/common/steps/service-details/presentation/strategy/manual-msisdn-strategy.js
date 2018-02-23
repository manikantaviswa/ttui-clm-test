
	'use strict';

    var module = angular.module('TT-UI-CLM.Common.Steps.Presentation.Strategy.ManualMsisdnStrategy', [
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Services.MsisdnService',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.CommonSuggestionBoxPresentationModel',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonMsisdnLocker',
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Utils.ErrorHandler',
        'TT-UI-CLM.Common.Services.OfferingData'
	]);

	function CommonManualMsisdnStrategyFactory($q, translateFilter, OfferingData) {
		var __ = translateFilter;

		function CommonManualMsisdnStrategy(MsisdnService) {
			this.service = MsisdnService;
			this.name = 'Manual';
		}

        CommonManualMsisdnStrategy.prototype.update = function(model) {
            this.msisdnCategory = model.category;
            this.prefix = model.prefix;
            this.hlrNumber = model.hlrOfSim;
            this.model = model;
        };
        CommonManualMsisdnStrategy.prototype.load = function(msisdnNumber, isMsisdnPrefixRequired) {
            //console.log("inside load")
            return this._fetchMore(this.model.msisdnCategory, msisdnNumber || this.prefix, this.hlrNumber, this.serviceData, isMsisdnPrefixRequired);
        };
        CommonManualMsisdnStrategy.prototype._fetchMore = function(msisdnNumber, isMsisdnPrefixRequired, model) {
            if (!mandatoryParametersProvided(this.msisdnCategory)) {
                return $q.resolve([]);
            } else if (!this.prefix && isMsisdnPrefixRequired){
                return $q.reject(__('MSISDN prefix is required'));
            } else if (!numberMatchesPrefix(this.prefix, msisdnNumber)) {
                return this._loadPage(numberToSearch(this.prefix, msisdnNumber),model);
            } else if (numberMatchesPrefix(this.prefix, msisdnNumber)) {
                return this._loadPage(msisdnNumber, model);
            } else {
                return $q.resolve([]);
            }
        };
        CommonManualMsisdnStrategy.prototype._loadPage = function(msisdnNumber, model) {
            var newToken = [msisdnNumber, model];
            //console.log("newToken>>>>>>>>>>>", newToken, this.token)
            if (!angular.equals(newToken, this.token)) {
                this.token = newToken;
                this.nextPageNumber = 0;
            }
            var parameters = this.token.concat([this.nextPageNumber++]);
            //console.log("parameters>>>>>>>>>>>", parameters)
            return this.service.loadAvailable.apply(this, parameters);
        };
        CommonManualMsisdnStrategy.prototype.search = function(msisdnNumber, isMsisdnPrefixRequired) {
            this.nextPageNumber = 0;
            return this._fetchMore(msisdnNumber, isMsisdnPrefixRequired, this.model);
        };


		function mandatoryParametersProvided() {
			return _.every(arguments, _.isDefined);
		}

		function numberMatchesPrefix(prefix, number) {
			if (!_.isEmpty(prefix)){
				var startPrefix = new RegExp('^' + prefix);
				if (_.isUndefined(number)){
					number = '';
				}
				return startPrefix.test(number);
			} else {
				return !_.isUndefined(number) ? number : '';
			}

		}

		function numberToSearch(prefix, number) {
			if (!_.isUndefined(number)){
				var serachNumber = !_.isEmpty(prefix) ? prefix + number : number;
				return serachNumber;
			}
			return !_.isEmpty(prefix) ? prefix : '';
		}

		return CommonManualMsisdnStrategy;
	}

    CommonManualMsisdnStrategyFactory.$inject = ['$q', 'translateFilter', 'OfferingData'];
    module.factory('CommonManualMsisdnStrategy', CommonManualMsisdnStrategyFactory);// try with service

