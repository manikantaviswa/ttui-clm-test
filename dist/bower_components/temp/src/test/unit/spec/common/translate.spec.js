'use strict';

describe('Module: Translate', function() {
	// instantiate service
	var $translateTtStorage, missingTranslationLog, $log;

	beforeEach(function(){
		angular.mock.module('TT-UI.Common.Translate');

		angular.mock.inject(function(_$translateTtStorage_, _missingTranslationLog_, _$log_){
			$translateTtStorage = _$translateTtStorage_;
			missingTranslationLog = _missingTranslationLog_;
			$log = _$log_;
		});
	});

	it('Should test if $translateTtStorage has proper structure', function(){
		expect($translateTtStorage.get).toEqual(jasmine.any(Function));
		expect($translateTtStorage.set).toEqual(jasmine.any(Function));
		expect($translateTtStorage.put).toEqual(jasmine.any(Function));
	});

	it('Should test if $translateTtStorage.get to return anything', function(){
		expect($translateTtStorage.get()).not.toBe(undefined);
	});

	it('Should test if missingTranslationLog has proper structure', function(){
		expect(missingTranslationLog).toEqual(jasmine.any(Function));
	});

	it('Should test if missingTranslationLog calls $log.debug', function(){
		// given
		var missingLocale = 'dummyLocale';
		var expectedLogMessage = 'Missing translation: "' + missingLocale + '"';

		// when
		spyOn($log, 'debug');
		missingTranslationLog(missingLocale);

		// then
		expect($log.debug).toHaveBeenCalledWith(expectedLogMessage);
	});
});
