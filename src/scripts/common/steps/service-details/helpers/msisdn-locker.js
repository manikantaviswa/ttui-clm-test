
	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonMsisdnLocker', [
		'TT-UI.Common',
        'TT-UI-CLM.Common.Api.Utils.Assert',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonAbstractLocker',
        'TT-UI-CLM.Common.Steps.ServiceDetails.Presentation.Services.MsisdnService'
	]);

	function CommonMsisdnLockerFactory(CommonMsisdnService, CommonAbstractLocker) {

        CommonMsisdnLocker.prototype = Object.create(CommonAbstractLocker.prototype);
        CommonMsisdnLocker.prototype.constructor = CommonMsisdnLocker;

		function CommonMsisdnLocker() {
            CommonAbstractLocker.call(this);
			this.lockerType = 'msisdn';
			this.lockerName = 'MSISDN';
			this.subscriberService = CommonMsisdnService;
			_.bindAll(this);
		}

		return new CommonMsisdnLocker();
	}

	CommonMsisdnLockerFactory.$inject = ['CommonMsisdnService', 'CommonAbstractLocker'];

	module.factory('CommonMsisdnLocker', CommonMsisdnLockerFactory);