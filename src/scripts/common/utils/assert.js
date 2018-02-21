
	'use strict';

	var module = angular.module('TT-UI-CLM.Common.Api.Utils.Assert', []);

	function AssertionError(message) {
		this.name = 'AssertionError';
		this.message = message || 'Assertion failed.';
		this.stack = (new Error()).stack;
	}

	AssertionError.prototype = Object.create(Error.prototype);
	AssertionError.prototype.constructor = AssertionError;

	function assertIsTrue(condition, optionalMessage) {
		if (condition !== true) {
			throw new AssertionError(optionalMessage);
		}
	}

	function assertIsDefined(value, optionalMessage) {
		assertIsTrue(angular.isDefined(value), optionalMessage);
	}

	function assertIsNotNull(value, optionalMessage) {
		assertIsTrue(!_.isNull(value), optionalMessage);
	}

	function assertHasProperty(object, propertyName, optionalMessage) {
		return assertIsDefined(_.get(object, propertyName), optionalMessage);
	}

	module.value('Assert', {
		isTrue: assertIsTrue,
		isDefined: assertIsDefined,
		hasProperty: assertHasProperty,
		isNotNull: assertIsNotNull
	});
