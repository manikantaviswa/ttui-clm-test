'use strict';

describe('Directive: simple-timeline ', function() {
	var ctrl, html, scope;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.SimpleTimeline');

		angular.mock.inject(function(_$compile_, _$rootScope_) {
			scope = _$rootScope_.$new();

			scope.events = [
				{
					status: 'info',
					badgeIconClass: 'fa-check-circle-o',
					title: 'First event',
					content: 'Some awesome content.',
					time: new Date('2000/07/1'),
					action: function() {
						console.log('event clicked');
					}
				},
				{
					status: 'warning',
					badgeIconClass: 'fa-check-circle-o',
					title: 'Second event',
					content: 'Some awesome content.',
					time: new Date('2000/07/2')
				},
				{
					status: 'primary',
					badgeIconClass: 'fa-check-circle-o',
					title: 'Third event',
					content: 'Some awesome content.',
					time: new Date('2000/07/3')
				},
				{
					status: 'primary',
					badgeIconClass: 'fa-check-circle-o',
					title: 'Fourth event',
					content: 'Some awesome content.',
					time: new Date('2000/07/4')
				},
				{
					status: 'primary',
					badgeIconClass: 'fa-check-circle-o',
					title: 'Fifth event',
					content: 'Some awesome content.',
					time: undefined
				}
			];

			scope.filters = [
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
				}
			];

			html = _$compile_(angular.element(
				'<simple-timeline ' +
					'events="events" ' +
					'show-events-max="3" ' +
					'hide-line="false" ' +
					'hide-event-bubble="false" ' +
					'show-end-badge="true" ' +
					'show-more-badge="true" ' +
					'badge-size="large" ' +
					'show-date-filter="true" ' +
					'show-content-filter="true" ' +
					'filters="filters" ' +
					'set-default-date-filter-range="true">' +
				'</simple-timeline>'
			))(scope);

			ctrl = html.isolateScope().simpleTimelineCtrl;
			scope.$digest();
		});
	});

	it('Should check if directive have procesed element', function() {
		// then
		expect(html).not.toBeNull();
		expect(html.length).not.toEqual(0);
	});

	it('Should test if element contains proper structure', function() {
		expect(html.find('ul').length).toEqual(1);
		expect(html.find('li').length).toEqual(5);
	});

	it('Should test click on show all events', function() {
		var elements = html.find('i');
		var more = elements[elements.length - 2];
		spyOn(ctrl, 'showAll').and.callThrough();
		more.click();
		expect(ctrl.showAll).toHaveBeenCalled();
		expect(ctrl.showEventsMax).toBe(-1);
		more.click();
		scope.$digest();
		expect(ctrl.showEventsMax).toBe(3);
	});

	it('Should test click on show more filters', function() {
		var filtersContainer = angular.element(html.find('div')[2]);
		var moreFilters = filtersContainer.find('span')[3]; // default shown filters is 3, so the next is 'More...'
		moreFilters.click();
		expect(ctrl.moreFiltersText).toBe('Less...');
		moreFilters.click();
		expect(ctrl.moreFiltersText).toBe('More...');
	});

	it('Should test click on date filter', function() {
		var dateFiltersContainer = angular.element(html.find('div')[3]);
		var toggleDateFilters = dateFiltersContainer.find('span')[0];
		toggleDateFilters.click();
		expect(ctrl.expandDateFilters).toBe(true);
	});

	it('Should test click on Image filter', function() {
		var filtersContainer = angular.element(html.find('div')[2]);
		var imageFilter = filtersContainer.find('span')[2];
		imageFilter.click();
		expect(ctrl.activeFilter.type).toBe('image');
	});

	it('Should test click on event', function() {
		var events = html.find('li').find('div');
		spyOn(ctrl, 'action').and.callThrough();
		events[0].click();
		expect(ctrl.action).toHaveBeenCalled();
	});
});

describe('Directive: simple-timeline options', function() {
	var ctrl, html, scope;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Directives.SimpleTimeline');

		angular.mock.inject(function(_$compile_, _$rootScope_) {
			scope = _$rootScope_.$new();

			scope.events = [
				{
					badgeIconClass: 'fa-check-circle-o',
					title: 'First event',
					content: 'Some awesome content.',
					time: new Date('2000/07/1'),
					action: function() {}
				},
				{
					badgeIconClass: 'fa-check-circle-o',
					title: 'Second event',
					content: 'Some awesome content.',
					time: new Date('2000/07/2'),
					action: function() {}
				}
			];

			html = _$compile_(angular.element(
				'<simple-timeline ' +
					'events="events" ' +
					'hide-event-bubble="true" ' +
					'show-end-badge="true" ' +
					'show-more-badge="true">' +
				'</simple-timeline>'
			))(scope);

			ctrl = html.isolateScope().simpleTimelineCtrl;
			scope.$digest();
		});
	});

	it('Should test if show events max is undefined', function() {
		expect(ctrl.showEventsMax).toBe(-1);
	});
});
