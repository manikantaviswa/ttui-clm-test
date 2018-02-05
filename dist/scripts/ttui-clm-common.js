/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
	"use strict";


// Source: src/scripts/common/polyfills/Function.name.js
// Source: https://github.com/JamesMGreene/Function.name

(function () {
/* jshint -W040 */
	/* jshint -W068 */

	var fnNamePrefixRegex = /^[\S\s]*?function\s*/;
	var fnNameSuffixRegex = /[\s\(\/][\S\s]+$/;

	function _name() {
		var name = '';
		if (this === Function || this === Function.prototype.constructor) {
			name = 'Function';
		}
		else if (this !== Function.prototype) {
			name = ('' + this).replace(fnNamePrefixRegex, '').replace(fnNameSuffixRegex, '');
		}
		return name;
	}

	// Inspect the polyfill-ability of this browser
	var needsPolyfill = !('name' in Function.prototype && 'name' in (function x() {
	}));
	var canDefineProp = typeof Object.defineProperty === 'function' &&
		(function () {
			var result;
			try {
				Object.defineProperty(Function.prototype, '_xyz', {
					get: function () {
						return 'blah';
					},
					configurable: true
				});
				result = Function.prototype._xyz === 'blah';
				delete Function.prototype._xyz;
			}
			catch (e) {
				result = false;
			}
			return result;
		})();


	Function.prototype._name = _name;

	if (canDefineProp && needsPolyfill) {
		Object.defineProperty(Function.prototype, 'name', {
			get: _name
		});
	}

})();

return angular;
})(window, window.angular);