'use strict';

angular.module('TT-UI.Common.Services.FlashMessage', [
	'ngSanitize',
	'ui.router',
	'TT-UI.Common.AngularStrap',
	'TT-UI.Common.Translate'
])
.service('FlashMessage', ['$rootScope', '$alert', '$document', 'translateFilter', function FlashMessageService($rootScope, $alert, $document, translateFilter) {
	var __ = translateFilter;

	var options = {
		title: '',
		content: '',
		type: 'info',
		placement: 'top',
		container: $document[0].querySelector('alerts-container') ? 'alerts-container' : 'body',
		show: false
	};
	var persistent = false;
	var alerts = [];

	function createAlert(title, content, type){
		var alert = $alert(options);

		angular.extend(alert.$options, {
			title:   __(title),
			content: __(content),
			type:    type
		});

		angular.extend(alert.$scope, alert.$options);

		alerts.push(alert);
		return alert;
	}

	$rootScope.$on('$stateChangeStart', function() {
		if (persistent) {
			persistent = false;
			return;
		}

		this.hide();
	}.bind(this));

	this.show = function(title, content, type, persist) {
		var alert = createAlert(title, content, type);

		persistent = !!persist;

		alert.$promise.then(alert.show);
	};

	this.hide = function(){
		angular.forEach(alerts, function(alert){
			alert.hide();
		});

		alerts.length = 0;
	};
}]);
