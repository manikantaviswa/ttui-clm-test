'use strict';

describe('Service: ModalDialog:', function() {
	var $rootScope;
	var dialog;
	var DIALOG_CONFIG;
	var fakeShow = jasmine.createSpy('$modal.show');
	var fakeHide = jasmine.createSpy('$modal.hide');
	var fakeModalScope;
	var fakeModalOptions = {};
	var fakeModal = jasmine.createSpy('$modal');

	beforeEach(function() {
		var ModalDialog;

		angular.mock.module('TT-UI.Common.Services.ModalDialog', function ($provide) {
			$provide.value('$modal', fakeModal);
		});

		angular.mock.inject(function($injector) {
			$rootScope    = $injector.get('$rootScope');
			ModalDialog   = $injector.get('ModalDialog');
			DIALOG_CONFIG = $injector.get('DIALOG_CONFIG');
		});

		fakeModalScope = $rootScope.$new();

		fakeModal.and.returnValue({
			$options: fakeModalOptions,
			$scope: fakeModalScope,
			$promise: {
				then: function(callback) { return callback(); }
			},
			show: fakeShow,
			hide: fakeHide
		});

		dialog = new ModalDialog();
	});

	afterEach(function() {
		fakeModal.calls.reset();
		fakeShow.calls.reset();
	});

	it('should check if ModalDialog module exists', function() {
		expect(!!dialog).toBe(true);
		expect(dialog).toEqual(jasmine.any(Object));
	});

	it('should expose show method', function() {
		expect(dialog.show).toBeDefined();
	});

	it('should expose hide method', function() {
		expect(dialog.hide).toBeDefined();
	});

	it('should create new modal dialog on show action', function() {
		// given
		var fakeOptions = {
			title: 'fake',
			content: 'fake content'
		};

		// when
		dialog.show(fakeOptions);

		//then
		expect(fakeModal).toHaveBeenCalled();
	});

	it('should not show modal dialog if title not exists', function() {
		// given
		var fakeOptions = {
			content: 'fake content'
		};

		// when
		dialog.show(fakeOptions);

		//then
		expect(fakeShow).not.toHaveBeenCalled();
	});

	it('should not show modal dialog if content not exists', function() {
		// given
		var fakeOptions = {
			title: 'fake'
		};

		// when
		dialog.show(fakeOptions);

		//then
		expect(fakeShow).not.toHaveBeenCalled();
	});

	it('should trigger modal.show() on show action', function() {
		// given
		var fakeOptions = {
			title: 'fake',
			content: 'fake content'
		};

		// when
		dialog.show(fakeOptions);

		//then
		expect(fakeShow).toHaveBeenCalled();
	});

	it('should trigger modal.hide() on hide action', function() {
		// given
		var fakeOptions = {
			title: 'fake',
			content: 'fake content'
		};

		// when
		dialog.show(fakeOptions);
		dialog.hide();

		//then
		expect(fakeHide).toHaveBeenCalled();
	});

	it('should use "content" value to compile popup content', function() {
		// given
		var fakeOptions = {
			title: 'fake',
			content: 'fake content'
		};

		// when
		dialog.show(fakeOptions);
		dialog.hide();

		//then
		expect(fakeModalOptions.content).toBeTruthy();
		expect(fakeModalOptions.content).toBe(fakeOptions.content);
	});

	it('should use "contentUrl" value to compile popup content', function() {
		// given
		var fakeOptions = {
			title: 'fake',
			content: 'fake content',
			contentUrl: 'fakeurl'
		};

		// when
		dialog.show(fakeOptions);
		dialog.hide();

		//then
		expect(fakeModalOptions.content).toBeTruthy();
		expect(fakeModalOptions.content).not.toBe(fakeOptions.content);
	});

	it('should add handler on modal $scope by using on() function', function() {
		// given
		var fakeOptions = {
			title: 'fake',
			content: 'fake content',
			contentUrl: 'fakeurl'
		};
		var fakeEvent = 'fakeEventName';

		spyOn(fakeModalScope, '$on');
		var fn = jasmine.any(Function);

		// when
		dialog.show(fakeOptions);
		dialog.on(fakeEvent, fn);

		//then
		expect(fakeModalScope.$on).toHaveBeenCalledWith(DIALOG_CONFIG.EVENT_PREFIX + fakeEvent, fn);
	});
});
