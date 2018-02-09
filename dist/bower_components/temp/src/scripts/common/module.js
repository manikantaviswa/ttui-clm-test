'use strict';

angular.module('TT-UI.Common', [
	'ng',
	'ui.router',
	'angular-storage',
	'TT-UI.Common.Config',
	'TT-UI.Form', // TODO: Remove me when Form components will be fully extracted from Common into Form module
	'TT-UI.Common.States',
	'TT-UI.Common.Errors',
	'TT-UI.Common.Routes',
	'TT-UI.Common.Directives',
	'TT-UI.Common.Filters',
	'TT-UI.Common.Services',
	'TT-UI.Common.Helpers.XhrHelper',
	'TT-UI.Common.Helpers.Form',
	'TT-UI.Common.Translate',
	'TT-UI.Common.AngularStrap',
	'TT-UI.Common.Spread',
	'TT-UI.Common.Tv4'
]);
