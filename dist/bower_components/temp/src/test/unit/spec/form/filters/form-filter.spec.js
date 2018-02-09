'use strict';

describe('Filter: form', function() {
	var injector;
	var $log;
	var formFilter;

	var fakeInput;
	var fakeScope;
	var fakeModel;
	var fakeForm;
	var fakeFilter;

	beforeEach(function(){
		angular.mock.module('TT-UI.Form.Filters.FormFilter');

		angular.mock.inject(function($injector){
			injector = $injector;
			$log = $injector.get('$log');
			formFilter = $injector.get('formFilter');
		});

		fakeInput = 'fakeData';
		fakeScope = 'fakeScope';
		fakeModel = 'fakeModel';
		fakeForm = {
			filter: 'fakeFilterName'
		};
		fakeFilter = jasmine.createSpy('fakeFilter');

		spyOn(injector, 'get').and.returnValue(fakeFilter);
	});

	afterEach(function(){
		injector.get.and.callThrough();
	});

	it('should get filter by name', function() {
		// when
		formFilter(fakeInput, fakeScope, fakeModel, fakeForm);

		// then
		expect(injector.get).toHaveBeenCalledWith(fakeForm.filter + 'Filter');
	});

	it('should not use filter if not found', function() {
		// when
		injector.get.and.callThrough();
		fakeForm.filter = 'fakeUnknownFilterName';
		spyOn($log, 'error');
		formFilter(fakeInput, fakeScope, fakeModel, fakeForm);

		// then
		expect(fakeFilter).not.toHaveBeenCalled();
		expect($log.error).toHaveBeenCalled();
	});

	it('should use gotten filter', function() {
		// given
		var fakeFilteredData = 'someFakeFilteredData';
		fakeFilter.and.returnValue(fakeFilteredData);

		// when
		var result = formFilter(fakeInput, fakeScope, fakeModel, fakeForm);

		// then
		expect(fakeFilter).toHaveBeenCalledWith(fakeInput, fakeScope, fakeModel);
		expect(result).toBe(fakeFilteredData);
	});

	it('should not use filter if not specified in form', function() {
		// given
		delete fakeForm.filter;

		// when
		formFilter(fakeInput, fakeScope, fakeModel, fakeForm);

		// then
		expect(fakeFilter).not.toHaveBeenCalled();
	});
});
