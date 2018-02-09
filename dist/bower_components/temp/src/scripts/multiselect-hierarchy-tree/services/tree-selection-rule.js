'use strict';

angular.module('TT-UI.MultiselectHierarchyTree.Services.TreeSelectionRule', [
])
.factory('TreeSelectionRule', TreeSelectionRule);

TreeSelectionRule.$inject = [];

function TreeSelectionRule() {
	/* jshint ignore:start */
	return {
		canSelect: function(node, treeCtrl, treeAttrs) {
			return true;
		},
		canUnselect: function(node, treeCtrl, treeAttrs) {
			return true;
		},
		canUpgradeSelection: function(node, treeCtrl, treeAttrs) {
			return true;
		},
		beforeSelect: function(node, treeCtrl, treeAttrs) {
		},
		afterSelect: function(node, treeCtrl, treeAttrs) {
		},
		beforeUnselect: function(node, treeCtrl, treeAttrs) {
		},
		afterUnselect: function(node, treeCtrl, treeAttrs) {
		}
	};
	/* jshint ignore:end */
}
