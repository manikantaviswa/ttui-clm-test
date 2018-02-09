'use strict';

describe('Service: ConfirmationDialog:', function() {
	// instantiate service
	var ConfirmationDialog, ModalDialog;
	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Services.ConfirmationDialog');

		angular.mock.inject(function($injector) {
			ModalDialog = $injector.get('ModalDialog');
			ConfirmationDialog = $injector.get('ConfirmationDialog');
		});
	});

	it('should check if ConfirmationDialogCtrl module exists', function() {
		expect(!!ConfirmationDialog).toBe(true);
		expect(ConfirmationDialog).toEqual(jasmine.any(Object));
	});

	it('should expose confirm method', function() {
		expect(ConfirmationDialog.confirm).toBeDefined();
	});

	it('should expose confirm method', function() {
		expect(ConfirmationDialog.hide).toBeDefined();
	});
});
