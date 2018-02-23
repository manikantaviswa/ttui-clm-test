
	'use strict';
    var module = angular.module('TT-UI-CLM.Common.Steps.Presentation.Strategy.AutomaticMsisdnStrategy', [
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Services.MsisdnService',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.CommonSuggestionBoxPresentationModel',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonMsisdnLocker',
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Utils.ErrorHandler',
        'TT-UI-CLM.Common.Services.OfferingData'
	]);

	function CommonAutomaticMsisdnFactory($parse, CommonManualMsisdnStrategy, OfferingData) {

		function CommonAutomaticMsisdnStrategy(MsisdnService) {
            CommonManualMsisdnStrategy.call(this, MsisdnService);
			this.name = 'Automatic';
		}

        CommonAutomaticMsisdnStrategy.prototype = Object.create(CommonManualMsisdnStrategy.prototype, {
			constructor: CommonAutomaticMsisdnStrategy
		});

        CommonAutomaticMsisdnStrategy.prototype.update = function(model) {
            CommonManualMsisdnStrategy.prototype.update.call(this, model);

			return this.load(model).then(this.fetchFirst);
		};

        CommonAutomaticMsisdnStrategy.prototype.fetchFirst = function(value) {
            return value || {};
        };

        CommonAutomaticMsisdnStrategy.prototype.load = function(model){
			var pageSize = 1;
			return this.service.loadAvailable('', model, pageSize, pageSize);
		};

		return CommonAutomaticMsisdnStrategy;
	}
    CommonAutomaticMsisdnFactory.$inject = ['$parse', 'CommonManualMsisdnStrategy', 'OfferingData'];
    module.factory('CommonAutomaticMsisdnStrategy', CommonAutomaticMsisdnFactory);

