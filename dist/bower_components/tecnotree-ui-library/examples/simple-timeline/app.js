'use strict';

var module = angular.module('TT-UI.Config', []);

module.constant('CONFIG', {

	API_URL: '@@API_URL',

	VERSION: '@@version',
	INDEX_STATE: 'index',
	ALLOWED_STATES: ['index'],

	LIST_LIMIT: 5,

	MODEL_DATE_FORMAT: 'YYYY-MM-DDT00:00:00.000[Z]', // Angular date filter format
	DATE_FORMAT: 'DD/MM/YYYY',

	//DATETIME_FORMAT: 'DD/MM/YYYY HH:mm:ss',
	LOCALE_PATH: '../../assets/lang/', // Slash at the end
	LOCALE_PREFIX: 'locale',
	LOCALE_SUFFIX: '.json',
	LOCALE_DEFAULT: 'en',
	DATE_PICKER_LOCALE_DATE_FORMAT: 'en',

	LOCALE_DEFAULT_SETTINGS: {
		lang: 'en',
		dateFormat: 'dd/MM/yyyy',
		datePicker: {
			dateFormat: 'DD/MM/YYYY',
			dayFormat: 'D',
			monthFormat: 'MMM',
			yearFormat: 'YYYY',
			monthTitleFormat: 'MMMM YYYY',
			yearTitleFormat: 'YYYY'
		}
	},
	LOCALE_LIST: {
		en: {lang: 'en'},
		pl: {lang: 'pl'},
		fr: {lang: 'fr'},
		fa: {
			lang: 'fa',
			dir: 'rtl',
			dateFormat: 'jDD/jMM/jYYYY',
			datePicker: {
				dateFormat: 'jDD/jMM/jYYYY',
				dayFormat: 'jD',
				monthFormat: 'jMMM',
				yearFormat: 'jYYYY',
				monthTitleFormat: 'jMMMM jYYYY',
				yearTitleFormat: 'jYYYY'
			}
		}
	}
});

module = angular.module('TT-APP.SimpleTimelineDemo', [
	'TT-UI.Config',
	'TT-UI.Common',
	'TT-UI.Common.Tpl'
]);

module.controller('simpleTimelineCtrl', ['$scope', '$rootScope', '$modal', function($scope, $rootScope, $modal) {
	$scope.addEvent = function(event) {
		var date = new Date();

		$scope.timelineEvents.push({
			type: event.type,
			status: event.status,
			badgeIconClass: event.badgeIconClass,
			title: event.title,
			content: event.content,
			time: event.time || date,
			src: event.src,
			action: function(event) {
				$scope.openDialog(event, viewBadgeTemplate);
			}
		});
	};

	$scope.openDialog = function(event, template) {
		if (!template) {
			return;
		}

		var scope = $rootScope.$new();

		scope.timeline = {
			modal: $modal({scope: scope, template: template, show: false, html: true, keyboard: true}),
			event: event
		};

		// wait until the template is loaded...
		scope.timeline.modal.$promise.then(function() {
			scope.timeline.modal.show();
		});
	};

	// put to template file
	var addEventTemplate =
		'<div class="modal" tabindex="-1" role="dialog">' +
			'<div class="modal-dialog modal-panel-dialog">' +
				'<div class="panel panel-default">' +
					'<div class="modal-header">' +
						'<button type="button" class="close" ng-click="timeline.cancelFn()">&times;</button>' +
						'<h4 class="modal-title">Add an event to the timeline</h4>' +
					'</div>' +
					'<div class="panel-body">' +
						'<form>' +
							'<div>Status</div>' +
							'<div class="form-group">' +
								'<select class="form-control" ng-model="timeline.event.status" ng-change="timeline.change()" ng-init="badge = 0">' +
									'<option value="0" label="Select status">Select status</option>' +
									'<option value="primary" label="Primary" class="primary">Primary</option>' +
									'<option value="success" label="Success">Success</option>' +
									'<option value="warning" label="Warning">Warning</option>' +
									'<option value="danger" label="Danger">Danger</option>' +
									'<option value="info" label="Info">Info</option>' +
								'</select>' +
							'</div>' +
							'<div>Type</div>' +
							'<div class="form-group">' +
								'<input class="form-control" ng-model="timeline.event.type" type="text" />' +
							'</div>' +
							'<div>Image source (only for image type)</div>' +
							'<div class="form-group">' +
								'<input class="form-control" ng-model="timeline.event.src" type="text" />' +
							'</div>' +
							'<div>Badge icon class (any icon class e.g. fa fa-check-circle-o, glyphicon glyphicon-ok-circle, your-icon-class, etc.)</div>' +
							'<div class="form-group">' +
								'<input class="form-control" ng-model="timeline.event.badgeIconClass" type="text" />' +
							'</div>' +
							'<div>Event heading</div>' +
							'<div class="form-group">' +
								'<input class="form-control" ng-model="timeline.event.title" type="text" />' +
							'</div>' +
							'<div>Event text content</div>' +
							'<div class="form-group">' +
								'<textarea class="form-control" rows="3" ng-model="timeline.event.content"></textarea>' +
							'</div>' +
							'<div>Event time</div>' +
							'<div class="input-group">' +
								'<input class="form-control" type="text" placeholder="dd/mm/yyyy" name="timelineDatepicker" data-autoclose="1" ng-model="timeline.event.time" bs-datepicker />' +
								'<span class="input-group-addon">' +
									'<i class="fa fa-calendar-plus-o fa-lg fa-fw"></i>' +
								'</span>' +
							'</div>' +
						'</form>' +
					'</div>' +
					'<div class="panel-footer text-right">' +
						'<button type="button" class="btn btn-default" ng-click="timeline.cancelFn()" translate> CANCEL </button>' +
						'<button type="button" class="btn btn-primary" ng-click="timeline.okFn()" translate> OK </button>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';

	// put to template file
	var viewBadgeTemplate =
		'<div class="modal" tabindex="-1" role="dialog">' +
			'<div class="modal-dialog modal-panel-dialog">' +
				'<div class="panel panel-default">' +
					'<div class="modal-header">' +
						'<button type="button" class="close" ng-click="timeline.modal.hide()">&times;</button>' +
						'<h4 class="modal-title" ng-bind="::timeline.event.title"></h4>' +
					'</div>' +
					'<div class="panel-body">' +
						'<img ng-src="{{timeline.event.src}}" ng-if="timeline.event.src"></img>' +
						'<div ng-bind="::timeline.event.content"></div>' +
						'<div class="text-right" ng-bind="::timeline.event.time | date:\'mediumDate\'"></div>' +
					'</div>' +
					'<div class="panel-footer text-right">' +
						'<button type="button" class="btn btn-primary" ng-click="timeline.modal.hide()" translate> CLOSE </button>' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>';

	$scope.timelineFilters = [
		{
			title: 'All',
			type: undefined
		},
		{
			title: 'Button',
			type: 'button'
		},
		{
			title: 'Image',
			type: 'image'
		},
		{
			title: 'Request',
			type: 'request'
		},
		{
			title: 'Ticket',
			type: 'ticket'
		},
		{
			title: 'Aaa',
			type: 'aaa'
		},
		{
			title: 'Bbb',
			type: 'bbb'
		},
		{
			title: 'Warning',
			status: 'warning'
		}
	];

	$scope.timelineEvents = [
		{
			type: 'button',
			status: 'primary',
			badgeIconClass: 'fa fa-plus-circle',
			title: 'ADD EVENT',
			content: 'Some important button text',
			action: function() {
				var scope = $rootScope.$new();

				scope.timeline = {
					modal: $modal({scope: scope, template: addEventTemplate, show: false, html: true, keyboard: true}),
					service: null,
					okFn: function() {
						$scope.addEvent(scope.timeline.event);
						this.modal.hide();
					},
					cancelFn: function() {
						console.log('cancel');
						this.modal.hide();
					},
					change: function() {
						console.log('change');
					},
					event: {
						status: '0',
						badgeIconClass: 'fa fa-check-circle'
					}
				};

				// wait until the template is loaded...
				scope.timeline.modal.$promise.then(function() {
					scope.timeline.modal.show();
				});
			},
			time: undefined // button stays at the top/latest
		},
		{
			status: 'success',
			badgeIconClass: 'fa fa-check-circle',
			title: 'First event (success)',
			action: function(event) {
				$scope.openDialog(event, viewBadgeTemplate);
			},
			content: 'Some awesome loooooooooooooooooooooo oooooooooooooooooooooo ooooooooooooooo ooooooooo ooooooooooooo ooooooooooooooooooooong content.',
			time: new Date('2016/08/1')
		},
		{
			type: 'image',
			status: 'primary',
			src: '/assets/img/branching.svg',
			badgeIconClass: 'fa fa-photo',
			title: 'Second event (primary)',
			action: function(event) {
				$scope.openDialog(event, viewBadgeTemplate);
			},
			content: 'Some awesome content.',
			time: new Date('2016/08/2')
		},
		{
			status: 'warning',
			badgeIconClass: 'fa fa-exclamation-circle',
			title: 'Third event (warning)',
			action: function(event) {
				$scope.openDialog(event, viewBadgeTemplate);
			},
			content: 'Some awesome content.',
			time: new Date('2016/08/3')
		},
		{
			status: 'danger',
			badgeIconClass: 'fa fa-times-circle',
			title: 'Fourth event (danger)',
			action: function(event) {
				$scope.openDialog(event, viewBadgeTemplate);
			},
			content: 'Some awesome content.',
			time: new Date('2016/08/4')
		},
		{
			// status: 'danger',
			badgeIconClass: 'fa fa-circle',
			title: 'Fifth event',
			action: function(event) {
				$scope.openDialog(event, viewBadgeTemplate);
			},
			content: 'Some awesome content.',
			time: new Date('2016/08/5')
		}
	];
}]);
