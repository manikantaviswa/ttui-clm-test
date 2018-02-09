'use strict';

jasmine.createFakeObj = function(name, context) {
	var methods = Object.getMetohds(context);

	return jasmine.createSpyObj(name, methods);
};
