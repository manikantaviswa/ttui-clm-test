
	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.MsisdnLocker', [
		'TT-UI.Common',
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.AbstractLocker',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Services.MsisdnService'
	]);

	function MsisdnLockerFactory(CommonMsisdnService, AbstractLocker, _) {

		MsisdnLocker.prototype = Object.create(AbstractLocker.prototype);
		MsisdnLocker.prototype.constructor = MsisdnLocker;

		function MsisdnLocker() {
			AbstractLocker.call(this);
			this.lockerType = 'msisdn';
			this.lockerName = 'MSISDN';
			this.subscriberService = CommonMsisdnService;
			_.bindAll(this);
		}

		return new MsisdnLocker();
	}

	MsisdnLockerFactory.$inject = ['CommonMsisdnService', 'AbstractLocker', '_'];

	module.factory('MsisdnLocker', MsisdnLockerFactory);