'use strict';
// Base modal dialog, see docs here: http://mgcrea.github.io/angular-strap/#/modals

var module = angular.module('TT-UI.Common.Services.ModalDialog', [
	'ui.router',
	'TT-UI.Common.Config',
	'TT-UI.Common.AngularStrap',
	'TT-UI.Common.Directives'
]);

module.directive('compileHtml', ['$compile', function ($compile) {
	return function(scope, element, attrs) {
		scope.$watch(function(scope) {
				return scope.$eval(attrs.compileHtml);
			},
			function(value) {
				$compile(element.append(value).contents())(scope);
			});
	};
}]);

module.constant('DIALOG_CONFIG', {
	EVENT_PREFIX: 'modalDialog'
});

function ModalDialog($log, $q, $modal, $compile, COMMON_CONFIG, DIALOG_CONFIG) {
	var baseOptions = {
		prefixEvent: DIALOG_CONFIG.EVENT_PREFIX,
		templateUrl: COMMON_CONFIG.BASE_URL + 'views/modal-panel-dialog.tpl.html',
		show: false
	};

	function Modal (){
		this.modal = $modal(baseOptions);
	}

	Modal.prototype.show = function (options) {
		if(!isOptionsValid(options)) {
			return;
		}

		var compileTemplate = function (templateUrl){
			if(!angular.isString(templateUrl)) {
				return;
			}
			return $compile('<div ng-include="\'' + templateUrl + '\'"></div>')(options.scope || this.modal.$scope);
		}.bind(this);

		angular.extend(this.modal.$options, {
			title:     options.title,
			content:   compileTemplate(options.contentUrl) || options.content,
			buttons:   options.buttons || this.modal.$options.buttons,
			footer:    compileTemplate(options.footerUrl),
			namespace: options.namespace || this.modal.$options.namespace
		});

		angular.extend(this.modal.$scope, this.modal.$options);

		return this.modal.$promise.then(this.modal.show.bind(this));
	};

	Modal.prototype.hide = function () {
		this.modal.hide();
	};

	Modal.prototype.on = function (event, callback) {
		this.modal.$scope.$on(DIALOG_CONFIG.EVENT_PREFIX + event, callback);
	};

	function isOptionsValid(options){
		if(!angular.isString(options.title)) {
			$log.error('Title should be a string, but got: ' + options.title);
			return false;
		}

		if(angular.isUndefined(options.content) && angular.isUndefined(options.contentUrl)) {
			$log.error('Content should be provided: ' + options.content + '; ' + options.contentUrl);
			return false;
		}

		return true;
	}

	return function(){
		return new Modal();
	};
}

ModalDialog.$inject = ['$log', '$q', '$modal', '$compile', 'COMMON_CONFIG', 'DIALOG_CONFIG'];
module.factory('ModalDialog', ModalDialog);
