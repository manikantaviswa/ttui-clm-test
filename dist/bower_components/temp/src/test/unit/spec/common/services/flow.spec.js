'use strict';

describe('Service: Flow', function() {
	// instantiate service
	var $log;
	var $httpBackend;
	var $rootScope;
	var FlowFactory;
	var Flow;

	beforeEach(function() {
		angular.mock.module('TT-UI.Common.Services.Flow');

		angular.mock.inject(function($injector) {
			$httpBackend = $injector.get('$httpBackend');
			$log = $injector.get('$log');
			$rootScope = $injector.get('$rootScope');

			FlowFactory = $injector.get('FlowFactory');
		});
	});

	describe('Flow', function() {
		var entryState = 'first-state';
		var exitState = 'home-foo-state';
		var states = {
			'first-state': {
				visible: true
			},
			'foo-state': {
				visible: true
			},
			'disabled-state': null,
			'last-state': {
				visible: true
			},
			'hidden-state': {
				visible: false
			}
		};

		beforeEach(function() {
			Flow = new FlowFactory(entryState, exitState, states);
		});

		it('should check if module exists', function() {
			expect(!!Flow).toBe(true);
			expect(Flow).toEqual(jasmine.any(Object));
		});

		describe('states checking', function() {
			it('should get next state when next state exists', function() {
				// given
				var fooNextState = 'fooState';
				spyOn(Flow, '_findRelativeNextState').and.returnValue(fooNextState);

				//  when
				var results = Flow.getNextStepState();

				// then
				expect(results).toEqual(fooNextState);
			});

			it('should get prev state when prev state exists', function() {
				// given
				var fooPrevState = 'fooState';
				spyOn(Flow, '_findRelativeNextState').and.returnValue(fooPrevState);

				//  when
				var results = Flow.getPrevStepState();

				// then
				expect(results).toEqual(fooPrevState);
			});

			it('should get all flow states', function() {
				// given, when
				var results = Flow.getStates();

				// then
				expect(results).toEqual(states);
			});

			it('should call for entry state of flow', function() {
				// given, when
				var results = Flow.getEntryState();

				// then
				expect(results).toEqual(entryState);
			});

			it('should call for exit state of flow', function() {
				// given, when
				var results = Flow.getExitState();

				// then
				expect(results).toEqual(exitState);
			});
		});

		describe('flow actions', function() {

			it('should clear the flow when start', function() {
				// given
				spyOn(Flow, 'clear');

				// when
				Flow.start();

				// then
				expect(Flow.clear).toHaveBeenCalled();
			});

			it('should start the flow', function() {
				// given
				spyOn(Flow, 'getEntryState');

				// when
				Flow.start();

				// then
				expect(Flow.getEntryState).toHaveBeenCalled();
			});

		});

		describe('interfaces', function() {
			it('should cancel the flow', function() {
				expect(Flow.cancel).toThrow();
			});

			it('should finish the flow', function () {
				expect(Flow.finish).toThrow();
			});

			it('should throw exception when calling not implemented method isValid', function() {
				expect(Flow.isValid).toThrow();
			});

			it('should throw exception when calling not implemented method persist', function() {
				expect(Flow.persist).toThrow();
			});

			it('should throw exception when calling not implemented method submit', function() {
				expect(Flow.submit).toThrow();
			});
		});

		describe('visibility of states', function() {
			var statesNames;

			beforeEach(function() {
				spyOn(Flow, 'getStates').and.callFake(function() {
					return statesNames;
				});
			});

			it('should return true when state is visible but disabled', function() {
				// given
				var stateName = 'fooState';
				statesNames = {};
				statesNames[stateName] = null;

				// when
				var results = Flow._isStateVisible(stateName);

				// then
				expect(results).toBeTruthy();
			});

			it('should return true when state is visible', function() {
				// given
				var stateName = 'fooState';
				statesNames = {};
				statesNames[stateName] = {
					visible: true
				};

				// when
				var results = Flow._isStateVisible(stateName);

				// then
				expect(results).toBeTruthy();
			});

			it('should return false when state is hidden', function() {
				// given
				var stateName = 'fooState';
				statesNames = {};
				statesNames[stateName] = {
					visible: false
				};

				// when
				var results = Flow._isStateVisible(stateName);

				// then
				expect(results).toBeFalsy();
			});

			it('should log error when state is missing', function() {
				// given
				var stateName = 'fooState';
				statesNames = {};
				spyOn($log, 'error');

				// when
				var results = Flow._isStateVisible(stateName);

				// then
				expect(results).toBeFalsy();
				expect($log.error).toHaveBeenCalled();
			});
		});

		describe('finding next state', function() {
			var statesNames = {
				'first-state': {
					visible: true
				},
				'foo-state': {
					visible: true
				},
				'disabled-state': {
					visible: false
				},
				'bar-state': {
					visible: true
				},
				'hidden-state': null
			};

			beforeEach(function() {
				spyOn(Flow, 'getStates').and.returnValue(statesNames);
			});

			it('should get "foo-state" when current state is "first-state"', function() {
				// given
				var currentState = 'first-state';
				var expectedState = 'foo-state';

				// when
				var results = Flow._findRelativeNextState(currentState);

				// then
				expect(results).toEqual(expectedState);
			});

			it('should get next state after disabled state "disabled-state" when current state is "foo-state"', function() {
				// given
				var currentState = 'foo-state';
				var expectedState = 'bar-state';

				// when
				var results = Flow._findRelativeNextState(currentState);

				// then
				expect(results).toEqual(expectedState);
			});

			it('should get next state as "hidden-state" when current state is "bar-state"', function() {
				// given
				var currentState = 'bar-state';
				var expectedState = 'hidden-state';

				// when
				var results = Flow._findRelativeNextState(currentState);

				// then
				expect(results).toEqual(expectedState);
			});

			it('should not get any next state for last state', function() {
				// given
				var currentState = 'hidden-state';

				// when
				var results = Flow._findRelativeNextState(currentState);

				// then
				expect(results).toBeUndefined();
			});
		});

		describe('finding prev state (relative)', function() {
			var statesNames = {
				'first-state': {
					visible: true
				},
				'foo-state': {
					visible: true
				},
				'disabled-state': {
					visible: false
				},
				'bar-state': {
					visible: true
				},
				'hidden-state': null
			};

			var relative = true;

			beforeEach(function() {
				spyOn(Flow, 'getStates').and.returnValue(statesNames);
			});

			it('should get "first-state" when current state is "foo-state"', function() {
				// given
				var currentState = 'foo-state';
				var expectedState = 'first-state';

				// when
				var results = Flow._findRelativeNextState(currentState, relative);

				// then
				expect(results).toEqual(expectedState);
			});

			it('should get prev state before disabled state "disabled-state" when current state is "bar-state"', function() {
				// given
				var currentState = 'bar-state';
				var expectedState = 'foo-state';

				// when
				var results = Flow._findRelativeNextState(currentState, relative);

				// then
				expect(results).toEqual(expectedState);
			});

			it('should not get any prev state for first state', function() {
				// given
				var currentState = 'first-state';

				// when
				var results = Flow._findRelativeNextState(currentState, relative);

				// then
				expect(results).toBeUndefined();
			});
		});

		describe('getting validators', function() {
			var statesNames = {
				'state-with-validators': {
					visible: true,
					validators : [
						'data/validators/customer-profile-blacklist-validator.json',
						'data/validators/customer-profile-duplicate-check.json'
					]
				},
				'state-without-validators': {
					visible: true
				},
				'hidden-state': null
			};

			beforeEach(function () {
				spyOn(Flow, 'getStates').and.returnValue(statesNames);
			});

			afterEach(function() {
				$httpBackend.verifyNoOutstandingExpectation();
				$httpBackend.verifyNoOutstandingRequest();
			});

			it('should return empty array when validators it is not specify', function() {
				// given
				var currentState = 'state-without-validators';

				// when
				var result;
				Flow.getValidators(currentState).then(function(value){
					result = value;
				});
				$rootScope.$digest();

				// then
				expect(result).toEqual([]);
			});

			it('should reject when state donot exist', function() {
				// given
				var currentState = 'state-not-exist-validators';

				// when
				var result;
				Flow.getValidators(currentState).catch(function(message){
					result = message;
				});
				$rootScope.$digest();

				// then
				expect(result).toEqual(jasmine.any(String));
			});

			it('should load validators config ', function() {
				// given
				var currentState = 'state-with-validators';
				var expectedValidators = [
					{test:'abc'},
					{name:'iza'}
				];
				statesNames[currentState].validators.forEach(function(url, index){
					$httpBackend.expectGET(url).respond(200, expectedValidators[index]);
				});

				// when
				var result;
				Flow.getValidators(currentState).then(function(value){
					result = value;
				});
				$httpBackend.flush();

				// then
				expectedValidators.forEach(function(validator){
					expect(result).toContain(validator);
				});
			});


		});
	});
});
