	'use strict';

    angular.module('TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Strategy.MSISDNStrategyFactory', [
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Services.MsisdnService',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.CommonSuggestionBoxPresentationModel',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonMsisdnLocker',
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Utils.ErrorHandler'
    ]);

	function MsisdnStrategyFactory($q, $injector) {
		var STRATEGY_SUFFIX = 'MsisdnStrategy';

		function DummyMsisdnStrategy() {
			this.name = 'Dummy';
			this.update = _.noop;
			this.load = _.constant($q.when([]));
		}

		return function(name) {
			var serviceName = name + STRATEGY_SUFFIX;
			if ($injector.has(serviceName)) {
				return $injector.get(serviceName);
			} else {
				return DummyMsisdnStrategy;
			}
		};
	}

	MsisdnStrategyFactory.$inject = ['$q', '$injector'];
    module.factory('MsisdnStrategyFactory', MsisdnStrategyFactory);
