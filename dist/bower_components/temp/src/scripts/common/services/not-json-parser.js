'use strict';

angular.module('TT-UI.Common.Services.NotJsonParser', [])

.factory('NotJsonParser', function NotJsonParser() {
	var arrayRegExp = /^\[(.*)\]$/m;
	var listRegExp = /,\s*/m;

	return {
		parse: function(data) {
			if (!data && !angular.isString(data) || !data.match(arrayRegExp)) {
				throw new SyntaxError('notJSON Parser: Given data is not a valid notJSON');
			}

			var parsed = data.replace(arrayRegExp, '$1');

			return parsed.split(listRegExp);
		}
	};
});
