
	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Steps.ServiceDetails.Helpers.CommonAbstractLocker', [
        'TT-UI-CLM.Common.Api.Utils.Assert'
	]);

	function CommonAbstractLockerFactory($q, store, Assert) {

		function CommonAbsctractLocker() {
			this.sessionKey = 'session';
			this.localKey = 'local';
			this.lockerType = '';
			this.lockerName = '';
			this.subscriberService = {};
			this.subscriberStorage = store.getNamespacedStore('subscriber-number');
		}

        CommonAbsctractLocker.prototype = {

			start: function(number) {
				var storageKey = this._getSessionStorageKey();
				this.subscriberStorage.remove(storageKey);

				if (!_.isEmpty(number)) {
					this.subscriberStorage.set(storageKey, number);
				}

				if (this._hasLocalNumber()) {
					this.free();
				}
			},

			cleanup: function() {
				this.subscriberStorage.remove(this._getSessionStorageKey());
				this.subscriberStorage.remove(this._getLocalStorageKey());
			},

			endWithCancel: function() {
				var promise;

				if (this._hasLocalNumber()) {
					promise = this.free();
				} else {
					promise = $q.resolve();
				}

				return promise.then(this.cleanup.bind(this));
			},

			endWithSubmit: function() {
				var promise;
				var sessionNumber;

				if (this._hasLocalNumber() && this._hasSessionNumber()) {
					sessionNumber = this._getSessionNumber();
					promise = this.subscriberService.release(sessionNumber);
				} else {
					promise = $q.resolve();
				}

				return promise.then(this.cleanup.bind(this));
			},

			lock: function(number, model) {
				Assert.isDefined(number, 'Please provide ' + this.lockerName + ' number to lock.');
				return this.subscriberService.block(number, model)
					.then(this._setLocalNumber(number), this.remove(number));
			},

			remove: function(){
				var storageKey = this._getLocalStorageKey();
				var number = this.subscriberStorage.get(storageKey);
				this._removeStorageKey(number);
				this.cleanup.bind(this);
			},

			free: function(model) {
				var storageKey = this._getLocalStorageKey();
				var number = this.subscriberStorage.get(storageKey);
				if (angular.isDefined(model)){
                    model.number = number;
				}
				Assert.isDefined(number, 'No number available to release.');
				Assert.isNotNull(number, 'No number available to release.');

				return this.subscriberService.release(model)
					.then(this._removeStorageKey(storageKey));
			},

			_hasLocalNumber: function() {
				return !_.isEmpty(this.subscriberStorage.get(this._getLocalStorageKey()));
			},

			_setLocalNumber: function(number) {
				this.subscriberStorage.set(this._getLocalStorageKey(), number);
			},

			_getSessionNumber: function() {
				return this.subscriberStorage.get(this._getSessionStorageKey());
			},

			_hasSessionNumber: function() {
				return !_.isEmpty(this.subscriberStorage.get(this._getSessionStorageKey()));
			},

			_removeStorageKey: function(storageKey) {
				this.subscriberStorage.remove(storageKey);
			},

			_getLocalStorageKey: function() {
				return this.lockerType + '.' + this.localKey;
			},

			_getSessionStorageKey: function() {
				return this.lockerType + '.' + this.sessionKey;
			}
		};

		return CommonAbsctractLocker;

	}

    CommonAbstractLockerFactory.$inject = ['$q', 'store', 'Assert'];

	module.factory('CommonAbstractLocker', CommonAbstractLockerFactory);