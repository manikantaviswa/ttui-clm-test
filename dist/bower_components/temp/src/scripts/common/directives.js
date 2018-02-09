'use strict';

angular.module('TT-UI.Common.Directives', [
	'TT-UI.Common.Config',
	'TT-UI.Common.Directives.ActionLinks',
	'TT-UI.Common.Directives.Breadcrumbs',
	'TT-UI.Common.Directives.Forms',
	'TT-UI.Common.Directives.NavMenu',
	'TT-UI.Common.Directives.MultiselectDropdown',
	'TT-UI.Common.Directives.MultiselectDropdownLegacy',
	'TT-UI.Common.Directives.Pagination',
	'TT-UI.Common.Directives.PostMessage',
	'TT-UI.Common.Directives.ProgressBar',
	'TT-UI.Common.Directives.RouteLabel',
	'TT-UI.Common.Directives.Select',
	'TT-UI.Common.Directives.Sortable',
	'TT-UI.Common.Directives.Spinner',
	'TT-UI.Common.Directives.SpinnerInside',
	'TT-UI.Common.Directives.Tabs',
	'TT-UI.Common.Directives.Toggle',
	'TT-UI.Common.Directives.AutoFormatDate',
	'TT-UI.Common.Directives.AutoFocus',
	'TT-UI.Common.Directives.DateValidator',
	'TT-UI.Common.Directives.DateInputMask',
	'TT-UI.Common.Directives.FieldValidator',
	'TT-UI.Common.Directives.BootstrapUiTmplates',
	'TT-UI.Common.Directives.ChargesTable',
	'TT-UI.Common.Directives.RtlHref',
	'TT-UI.Common.Directives.SimpleTimeline'
])

.value('VIEW_CONFIG', ['COMMON_CONFIG', function(COMMON_CONFIG) {
	return {
		URL: COMMON_CONFIG.BASE_URL + '/views/',
		DIRECTIVE_URL: COMMON_CONFIG.BASE_URL + '/views/directives/'
	};
}]);
