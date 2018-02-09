'use strict';

Object.getMetohds = function(context) {

	var obj = context.hasOwnProperty('prototype') ? context.prototype :
		(Object.getPrototypeOf(context) && (Object.keys(Object.getPrototypeOf(context)).length)) ? Object.getPrototypeOf(context): context;

	return Object.keys(obj).filter(function(key) {
		return (typeof obj[key] === 'function');
	});
};
