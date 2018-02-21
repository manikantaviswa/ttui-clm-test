
	'use strict';
    var module = angular.module('TT-UI-CLM.Common.Steps.Presentation.Strategy.ReservedMsisdnStrategy', [
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Services.MsisdnService',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.SuggestionBoxPresentationModel',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.MsisdnLocker',
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Utils.ErrorHandler'
	]);

	function CommonReservedMsisdnStrategyFactory($q) {
		function CommonReservedMsisdnStrategy(MsisdnService) {
			this.service = MsisdnService;
			this.name = 'Reserved';
		}

        CommonReservedMsisdnStrategy.prototype = {
			update: function(model) {
				this.reserverationId = model.reservationId;
				this.hlrNumber = model.hlrOfSim;
			},
			load: function() {
				if (!_.isEmpty(this.reserverationId)) {
					return this._fetchMore(this.reserverationId, this.hlrNumber);
				} else {
					return $q.when([]);
				}
			},
			_fetchMore: function(reserverationId, hlrNumber, msisdnNumber) {
				if (!mandatoryParametersProvided(reserverationId)) {
					return $q.resolve([]);
				}

				return this._loadPage(reserverationId, hlrNumber, msisdnNumber);
			},
			_loadPage: function(reserverationId, hlrNumber, msisdnNumber) {
				var newToken = [reserverationId, hlrNumber];
				var parameters;

				if (!angular.equals(newToken, this.token)) {
					this.token = newToken;
					this.nextPageNumber = 0;
				}
				this.nextPageNumber++;
				if (typeof msisdnNumber === 'undefined') {
					msisdnNumber = '';
				}
				parameters = this.token.concat([this.nextPageNumber, msisdnNumber]);
				return this.service.loadReserved.apply(this, parameters);
			},
			search: function(msisdnNumber) {
				this.nextPageNumber = 0;
				if (!_.isEmpty(this.reserverationId)) {
					return this._fetchMore(this.reserverationId, this.hlrNumber, msisdnNumber);
				}

				return $q.when([]);
			}
		};

		function mandatoryParametersProvided() {
			return _.every(arguments, _.isDefined);
		}

		return CommonReservedMsisdnStrategy;
	}

    CommonReservedMsisdnStrategyFactory.$inject = ['$q'];

    module.factory('CommonReservedMsisdnStrategy', CommonReservedMsisdnStrategyFactory);


