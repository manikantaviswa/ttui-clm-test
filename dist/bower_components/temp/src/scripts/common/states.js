'use strict';

angular.module('TT-UI.Common.States', [
	'ui.router'
])

.config(['$stateProvider', '$uiViewScrollProvider', function($stateProvider, $uiViewScrollProvider) {
	$stateProvider.decorator('parent', function($state, parent) {
		var _parent = parent($state);

		if (!_parent.children) {
			_parent.children = [];
		}

		_parent.children.push($state);

		return _parent;
	});

	$uiViewScrollProvider.useAnchorScroll();
}]);
