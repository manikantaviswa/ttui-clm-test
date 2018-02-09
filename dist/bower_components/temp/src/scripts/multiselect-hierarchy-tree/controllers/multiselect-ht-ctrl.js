'use strict';

var module = angular.module('TT-UI.MultiselectHierarchyTree.Controllers.MultiselectHierarchyTreeController', [
	'TT-UI.MultiselectHierarchyTree.Services.TreeNodeFactory',
	'TT-UI.MultiselectHierarchyTree.Services.TreeSelectionRule'
]);

function MultiselectHierarchyTreeController($scope, TreeNodeFactory, TreeSelectionRule) {

    var mshtCtrl = this;

    mshtCtrl.counts = {};

    mshtCtrl.isSingleSelect = mshtCtrl.selectMode === 'single';

    // NOTE: do not fire too often
    mshtCtrl.notifySelectionChange = function() {
        var newSelection = mshtCtrl.getSelection();

        if (!angular.equals(mshtCtrl.selectionModel, newSelection)) {
            mshtCtrl.selectionModel = newSelection;
        }
        mshtCtrl.counts = getTotalCounts();
        // Emit an event which tells the current selected items
        $scope.$emit('selectionChange', newSelection);
    };

    function getTotalCounts() {
        return mshtCtrl.nodes.map(function (node) {
            return node.getTotalCounts();
        }).reduce(function (sum, values) {
            sum.total += values.total;
            sum.selected += values.selected;
            sum.included += values.included;
            return sum;
        }, { total: 0, selected: 0, included: 0 });
    }

    mshtCtrl.getSelection = function () {
        var keys = [];

        for (var i = mshtCtrl.nodes.length - 1; i >= 0; i--) {
            keys = keys.concat(getSelectedKeys(mshtCtrl.nodes[i]));
        }
        return keys;
    };

    mshtCtrl.isAllSelected = function() {
        return (mshtCtrl.nodes || []).every(function(node) {
            return node.isSelected();
        });
    };

    mshtCtrl.isAllPossibleSelected = function() {
    	return !this.getAllNodes().some(function(node) {
    		return node.canSelect() && !node.isIncluded();
    	});
    };

    mshtCtrl.toggleSelectAll = function() {
        if (this.isAllPossibleSelected()) {
        	mshtCtrl.unselectAll();
        } else {
        	mshtCtrl.selectAll();
        }
        mshtCtrl.notifySelectionChange();
    };

    function enumAllNodes(nodes, fn) {
    	if (fn) {
	        for (var i = nodes.length - 1; i >= 0; i--) {
                enumAllNodes(nodes[i].nodes, fn);
                fn(nodes[i]);
            }
    	}
    }

    mshtCtrl.getAllNodes = function() {
    	var ret = [];
    	enumAllNodes(this.nodes, function(node) {
    		ret.push(node);
    	});
    	return ret;
    };

    mshtCtrl.selectAll = function() {
    	enumAllNodes(this.nodes, function(node) {
    		node.select(false);
    	});
    };

    mshtCtrl.unselectAll = function() {
    	enumAllNodes(this.nodes, function(node) {
    		node.unselect(false);
    	});
    };

    function getSelectedKeys(node) {
        var keys = [];
        if (node.isIncluded() || node.isPartiallySelected()) {
            keys.push({'title': node.title, 'id': node.id, 'selectionType': node.selectionType});
        }

        for (var i = node.nodes.length - 1; i >= 0; i--) {
            keys = keys.concat(getSelectedKeys(node.nodes[i]));
        }
        return keys;
    }

    var events = {
    	canSelect: function(node) {
    		return TreeSelectionRule.canSelect(node, mshtCtrl, $scope.hierarchyTreeAttrs);
    	},
    	canUnselect: function(node) {
    		return TreeSelectionRule.canUnselect(node, mshtCtrl, $scope.hierarchyTreeAttrs);
    	},
    	canUpgradeSelection: function(node) {
    		return TreeSelectionRule.canUpgradeSelection(node, mshtCtrl, $scope.hierarchyTreeAttrs);
    	},
    	beforeSelect: function(node) {
    		return TreeSelectionRule.beforeSelect(node, mshtCtrl, $scope.hierarchyTreeAttrs);
    	},
    	afterSelect: function(node) {
    		return TreeSelectionRule.afterSelect(node, mshtCtrl, $scope.hierarchyTreeAttrs);
    	},
    	beforeUnselect: function(node) {
    		return TreeSelectionRule.beforeUnselect(node, mshtCtrl, $scope.hierarchyTreeAttrs);
    	},
    	afterUnselect: function(node) {
    		return TreeSelectionRule.afterUnselect(node, mshtCtrl, $scope.hierarchyTreeAttrs);
    	}
    };

    var once = $scope.$watch('mshtCtrl.nodes', function (nodes) {
        if (nodes && nodes.length > 0) {
            once();

            mshtCtrl.nodes = (nodes || []).map(function (option) {
                return TreeNodeFactory.create(option, events);
            });
        }
    }, true);
}

MultiselectHierarchyTreeController.$inject = ['$scope', 'TreeNodeFactory', 'TreeSelectionRule'];
module.controller('MultiselectHierarchyTreeController', MultiselectHierarchyTreeController);
