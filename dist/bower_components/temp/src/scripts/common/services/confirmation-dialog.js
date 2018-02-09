'use strict';

var module = angular.module('TT-UI.Common.Services.ConfirmationDialog', [
	'ui.router',
	'TT-UI.Common.Services.ModalDialog'
]);

function ConfirmationDialog($rootScope, $q, ModalDialog, translateFilter) {
	var __ = translateFilter;
	var defaults = {
		title:   'Confirmation request',
		content: 'Please confirm',
		namespace: 'panel-dialog',
		buttons: [
			{ name:'Cancel',  action: cancel },
			{ name:'Confirm', action: confirm }
		]
	};

	var persistent = false;
	var deferred;
	var dialog = ModalDialog();

	function confirm() {
		deferred.resolve();
		dialog.hide();
	}

	function cancel() {
		deferred.reject();
		dialog.hide();
	}

	$rootScope.$on('$stateChangeStart', function() {
		if (persistent) {
			persistent = false;
			return;
		}
	});

	this.confirm = function(message, title, dialogType, isPersistent, nameSpace) {
		persistent = isPersistent;
		deferred = $q.defer();
		var buttons;

		if(dialogType === 'ok') {
			buttons = [
				{ name: __('Ok'), action: confirm }
			];
		}

		dialog.show({
			title: title     ||  __(defaults.title),
			content: message || __(defaults.message),
			buttons: buttons || defaults.buttons,
			namespace: nameSpace || defaults.namespace
		});

		dialog.on('.hide', function() {
			deferred.reject();
		});

		return deferred.promise;
	};

	this.hide = function() {
		dialog.hide();
	};
}

ConfirmationDialog.$inject = ['$rootScope', '$q', 'ModalDialog', 'translateFilter'];
module.service('ConfirmationDialog', ConfirmationDialog);
