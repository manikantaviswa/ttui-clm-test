'use strict';

angular.module('TT-UI.Common.Directives.BootstrapUiTmplates', [
	'TT-UI.Common.Config',
	'ui.bootstrap.dropdown'
])

.run(['$http', '$templateCache', 'COMMON_CONFIG', function($http, $templateCache, COMMON_CONFIG) {
	var DIRECTIVE_URL = COMMON_CONFIG.BASE_URL + 'views/directives/';

	var templates = [
		{
			path: DIRECTIVE_URL + 'bootstrap/accordion/accordion.tpl.html',
			bootstrapPath: 'uib/template/accordion/accordion.html'
		},
		{
			path:  DIRECTIVE_URL + 'bootstrap/accordion/accordion-group.tpl.html',
			bootstrapPath: 'uib/template/accordion/accordion-group.html'
		}
	];

	templates.forEach(function(template) {
		$http.get(template.path, {
			cache: $templateCache
		}).then(function(res) {
			$templateCache.put(template.bootstrapPath, res.data);
		});
	});
}]);
