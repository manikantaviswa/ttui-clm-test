'use strict';

var module = angular.module('TT-UI.Common.Directives.SimpleTimeline', [
	'ngAnimate'
]);

module.filter('timelineRangeFilter', function() {
	return function(items, ctrl) {
		// if date filter is disabled, just return all items
		if (!ctrl.showDateFilter) {
			ctrl.filteredEventsLength = items.length;
			return items;
		}

		var outItems = [];
		var fromDate = new Date(ctrl.startTime);
		var toDate = new Date(ctrl.endTime);

		for (var i = items.length - 1; i >= 0; i--) {
			var itemDate = new Date(items[i].time);

			// always add undefined dates (i.e. button type)
			if (items[i].time === undefined) {
				outItems.push(items[i]);
			// check if date is in range
			} else if ((fromDate <= itemDate) && (itemDate <= toDate)) {
				outItems.push(items[i]);
			}
		}

		ctrl.filteredEventsLength = outItems.length;

		return outItems;
	};
});

module.filter('timelineContentFilter', function($filter) {
	return function(items, ctrl) {
		// if content filter is disabled or no filter is selected, just return all items
		if (!ctrl.activeFilter || !ctrl.showContentFilter) {
			ctrl.filteredEventsLength = items.length;
			return items;
		}

		var outItems = $filter('filter')(items, {type: ctrl.activeFilter.type, status: ctrl.activeFilter.status});
		ctrl.filteredEventsLength = outItems.length;

		return outItems;
	};
});

module.filter('timelineOrderByFilter', function($filter) {
	return function(items) {
		return $filter('orderBy')(items, 'time', true);
	};
});

function simpleTimeline($filter, $parse) {
	var template =
		'<div ng-class="[simpleTimelineCtrl.getComponentClasses()]">' +
			'<div class="timeline-filters">' +
				'<div class="timeline-filters-container" ng-if="simpleTimelineCtrl.showContentFilter === true">' +
					'<span class="timeline-filters-item" ng-class="{\'active\':simpleTimelineCtrl.isActive($index)}" ng-repeat="filter in simpleTimelineCtrl.filters" ng-bind="filter.title" ng-click="simpleTimelineCtrl.setFilter(filter, $index)" ng-if="simpleTimelineCtrl.showFilter($index)"></span>' +
					'<span class="timeline-filters-item" ng-click="simpleTimelineCtrl.showAllFilters()" ng-bind="simpleTimelineCtrl.moreFiltersText"></span>' +
				'</div>' +
				'<div class="input-group" ng-if="simpleTimelineCtrl.showDateFilter === true" ng-class="{\'expand\':simpleTimelineCtrl.expandDateFilters}">' +
					'<input class="form-control input-prepend expand-left" ng-class="{\'expand-left-expand\':simpleTimelineCtrl.expandDateFilters}" type="text" placeholder="from" name="startTimePicker" data-autoclose="1" ng-model="simpleTimelineCtrl.startTime" bs-datepicker />' +
					'<span class="input-group-addon" ng-click="simpleTimelineCtrl.expandDateFiltersToggle()">' +
						'<i class="fa fa-calendar fa-lg fa-fw"></i>' +
					'</span>' +
					'<input class="form-control input-append expand-right" ng-class="{\'expand-right-expand\':simpleTimelineCtrl.expandDateFilters}" style="text-align: right;" type="text" placeholder="to" name="endTimePicker" data-autoclose="1" ng-model="simpleTimelineCtrl.endTime" bs-datepicker />' +
				'</div>' +
			'</div>' +
			'<ul class="fa-ul" ng-class="{\'no-line\':simpleTimelineCtrl.hideLine}">' +
				'<li ng-repeat="event in simpleTimelineCtrl.events | timelineRangeFilter:simpleTimelineCtrl | timelineContentFilter:simpleTimelineCtrl | timelineOrderByFilter" ng-switch on="event.type" ng-if="simpleTimelineCtrl.showEvent($index)" ng-class="{\'no-bubble\':simpleTimelineCtrl.hideBubble(event)}">' +
					'<i ng-class="event.status">' +
						'<i class="fa-li" ng-class="[simpleTimelineCtrl.getBadgeIconClass(event), simpleTimelineCtrl.getBadgeSizeClass()]"></i>' +
					'</i>' +
					'<div ng-class-even="\'timeline-panel-inverse\'" ng-class-odd="\'timeline-panel\'" ng-click="simpleTimelineCtrl.action(event)">' +
						'<div ng-switch-default>' +
							'<div class="time" ng-bind="event.time | date:\'mediumDate\'"></div>' +
							'<div class="header" ng-bind="event.title"></div>' +
						'</div>' +
						'<div ng-switch-when="image">' +
							'<div class="time" ng-bind="event.time | date:\'mediumDate\'"></div>' +
							'<div class="header" ng-bind="event.title"></div>' +
							'<img ng-src="{{event.src}}" class=""></img>' +
						'</div>' +
						'<div ng-switch-when="button">' +
							'<button class="btn btn-primary" type="button" ng-disabled="simpleTimelineCtrl.disabled(event)">{{event.title}}</button>' +
						'</div>' +
						'<div ng-class="{\'content\': !event.type, \'content-btn\': event.type === \'button\', \'content-img\': event.type === \'image\', \'truncate\':simpleTimelineCtrl.clipEventContent === true}" ng-bind="event.content || \'&nbsp;\'"></div>' +
					'</div>' +
				'</li>' +
				'<li ng-if="simpleTimelineCtrl.filteredEventsLength > 0 && simpleTimelineCtrl.showEndBadge">' +
					'<i class="primary">' +
						'<i class="fa-li fa fa-circle" ng-class="[simpleTimelineCtrl.getBadgeSizeClass()]"></i>' +
					'</i>' +
					'<div>&nbsp;</div>' +
				'</li>' +
				'<li ng-if="simpleTimelineCtrl.filteredEventsLength > 0 && simpleTimelineCtrl.showMoreBadgeFn()">' +
					'<i class="primary" ng-click="simpleTimelineCtrl.showAll()">' +
						'<i class="fa-li fa" ng-class="[simpleTimelineCtrl.getMoreClass(), simpleTimelineCtrl.getBadgeSizeClass()]"></i>' +
					'</i>' +
					'<div class="content-more-badge">&nbsp;</div>' +
				'</li>' +
			'</ul>' +
			'<div class="timeline-filters" ng-if="simpleTimelineCtrl.filteredEventsLength === 0">' +
				'No results' +
			'</div>' +
		'</div>';

	return {
		restrict: 'E',
		scope: {
			events: '=',
			showEventsMax: '=?',
			hideLine: '=?',
			hideEventBubble: '=?',
			showEndBadge: '=?',
			showMoreBadge: '=?',
			badgeSize: '@?',
			showDateFilter: '=?',
			showContentFilter: '=?',
			filters: '=?',
			setDefaultDateFilterRange: '=?',
			clipEventContent: '=?',
			forceLeftLayout: '=?'
		},
		bindToController: true,
		controllerAs: 'simpleTimelineCtrl',
		template: template,
		controller: function() {

			var visibleFiltersToggle = false;

			var setDefaultDateRange = function() {
				var today = new Date();
				var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
				var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 1);
				this.startTime = firstDay;
				this.endTime = lastDay;
			}.bind(this);

			if (!angular.isDefined(this.showEventsMax) || this.showEventsMax < 0) {
				this.showEventsMax = -1;
			}

			if (this.setDefaultDateFilterRange === true) {
				setDefaultDateRange();
			}

			this.getComponentClasses = function() {
				var classes = 'simple-timeline-ttui ';

				if (this.forceLeftLayout) {
					classes += 'non-responsive-sm';
				} else {
					classes += 'responsive-sm';
				}
				return classes;
			};

			this.showAllEventsToggle = false;
			this.showEventsMaxOriginal = this.showEventsMax;

			this.visibleFiltersMax = 3;
			this.visibleFiltersMaxOriginal = this.visibleFiltersMax;
			this.moreFiltersText = 'More...';

			this.expandDateFilters = false;

			this.action = function(event) {
				var actionFn = $parse(event.action);
				if (!this.disabled(event)){
					actionFn(event);
				}
			};

			this.disabled = function(event) {
				var disabledFn = $parse(event.disabled);
				var value = disabledFn();
				if (value) {
					event.status = undefined; // e.g. set color to gray
				}
				return value;
			};

			this.showEvent = function(index) {
				return index < this.showEventsMax || this.showEventsMax < 0;
			};

			this.showDownArrow = function() {
				return this.filteredEventsLength > this.showEventsMax && this.showEventsMax > 0;
			};

			this.showAll = function() {
				this.showAllEventsToggle = !this.showAllEventsToggle;

				if (this.showAllEventsToggle) {
					this.showEventsMax = -1;
				} else {
					this.showEventsMax = this.showEventsMaxOriginal;
				}
			};

			this.showMoreBadgeFn = function() {
				return this.showMoreBadge &&
					this.filteredEventsLength > this.showEventsMaxOriginal &&
					this.showEventsMaxOriginal > 0;
			};

			this.showFilter = function(index) {
				if (index < this.visibleFiltersMaxOriginal || this.visibleFiltersMax < 0) {
					return true;
				}

				return false;
			};

			this.showAllFilters = function() {
				visibleFiltersToggle = !visibleFiltersToggle;

				if (visibleFiltersToggle) {
					this.visibleFiltersMax = -1;
					this.moreFiltersText = 'Less...';
				} else {
					this.visibleFiltersMax = this.visibleFiltersMaxOriginal;
					this.moreFiltersText = 'More...';
				}
			};

			this.hideBubble = function(event) {
				return event.type === 'button' || this.hideEventBubble === true ? true : false;
			};

			this.activeFilterIndex = undefined;

			this.expandDateFiltersToggle = function() {
				this.expandDateFilters = !this.expandDateFilters;
			};

			this.setFilter = function(filter, index) {
				this.activeFilter = filter;
				this.activeFilterIndex = index;
			};

			this.isActive = function(index) {
				return index === this.activeFilterIndex;
			};

			this.getBadgeIconClass = function(event) {
				return event.iconClass;
			};

			this.getBadgeSizeClass = function() {
				// small is default
				if (this.badgeSize) {
					return this.badgeSize + '-badge';
				}
			};

			this.getMoreClass = function() {
				var classes = '';

				if (this.showDownArrow()) {
					classes += 'fa-arrow-circle-o-down';
				} else {
					classes += 'fa-arrow-circle-o-up';
				}

				return classes;
			};
		}
	};
}

simpleTimeline.$inject = ['$filter', '$parse'];
module.directive('simpleTimeline', simpleTimeline);
