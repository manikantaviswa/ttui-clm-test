'use strict';

angular.module('TT-UI.Common.MomentProvider', [])
	.provider('moment', function() {
		this.getMoment = function() {
			return window.moment;
		};

		this.$get = function () {
			return this;
		};
});
