/*exported sanitizeUrl */
function sanitizeUrl(url, CONFIG) {
	'use strict';

	var result = url.replace(/<%[^%]+%>/, '').replace(/%[^%]+%/, '');

	result =  decodeURIComponent(result);
	result = result.replace(':tenantId', CONFIG.API_TENANT_ID);
	result = result.replace(':apiVersion', CONFIG.API_VERSION);

	return result;
}
