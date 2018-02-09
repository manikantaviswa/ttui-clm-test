'use strict';

var module = angular.module('TT-UI.Common.Tv4', []);

function tv4Config() {
	/* globals tv4: true */

	var formats = {
		'clm-phone-number':  /^(\+\d{1,4}[ \-]?)?[\d\- ]{6,12}$/,
		'clm-email': /^((?:(?:(?:[a-zA-Z0-9][\.\-\+_]?)*)[a-zA-Z0-9])+)\@((?:(?:(?:[a-zA-Z0-9][\.\-_]?){0,62})[a-zA-Z0-9])+)\.([a-zA-Z0-9]{2,6})$/
	};

	Object.keys(formats).forEach(function(key) {
		var pattern = formats[key];

		if (!(pattern instanceof RegExp)) {
			pattern = new RegExp(pattern);
		}

		tv4.addFormat(key, function(data) {
			if (data && !pattern.test(data)) {
				return 'Format error';
			}
		});
	});
}

module.run(tv4Config);
