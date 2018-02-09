'use strict';

angular.module('TT-UI.MultiselectHierarchyTree.Services.TreeNodeFactory', [
])
.constant('TREE_SELECTION_TYPE', {
    NONE: 'none',                // Not selected
    SELECTED: 'selected',        // Item itself is selected
    INHERIT_SELECTED: 'inherit', // Parent item is selected
    PARTIAL_SELECTED: 'partial'  // One or more child items are selected
})
.factory('TreeNodeFactory', TreeNodeFactory);

TreeNodeFactory.$inject = ['TREE_SELECTION_TYPE'];

function TreeNodeFactory(TREE_SELECTION_TYPE) {

    var TreeNode = function(model, parentNode, events) {
        this.title = model.title;
        this.id = model.id;
        this.selectionType = model.selectionType ? model.selectionType : TREE_SELECTION_TYPE.NONE;
        this.parent = parentNode;
        this.events = events;

        this.nodes = (model.nodes || []).map(function(childModel) {
            return new TreeNode(childModel, this, events);
        }.bind(this));
    };

    TreeNode.prototype.getKey = function() {
        return this.id;
    };

    TreeNode.prototype.getSelectionType = function() {
        return this.selectionType;
    };

    TreeNode.prototype.canSelect = function() {
    	return this.events && this.events.canSelect ? this.events.canSelect(this) : true;
    };
    TreeNode.prototype.canUnselect = function() {
    	return this.events && this.events.canUnselect ? this.events.canUnselect(this) : true;
    };
    TreeNode.prototype.canUpgradeSelection = function() {
    	return this.events && this.events.canUpgradeSelection ? this.events.canUpgradeSelection(this) : true;
    };

    TreeNode.prototype.isLeafNode = function() {
    	return this.nodes.length === 0;
    };

    TreeNode.prototype._fireEvent = function(eventName, args) {
        if (this.events && this.events[eventName]) {
            this.events[eventName](args);
        }
    };

    TreeNode.prototype.select = function(fireEvent) {
        if (this.canSelect()) {

            this._fireEvent('beforeSelect', this);

            _selectNode(this);

            if (fireEvent) {
                if (this.parent) {
                    this.parent.notifyChildSelectionChange();
                }
            }

            this._fireEvent('afterSelect', this);
        }
    };

    TreeNode.prototype.unselect = function(fireEvent) {
        if (this.canUnselect()) {

            this._fireEvent('beforeUnselect', this);

            _unselectNode(this);

            if (fireEvent) {
                if (this.parent) {
                    this.parent.notifyChildSelectionChange();
                }
            }

            this._fireEvent('afterUnselect', this);
        }
    };

    function _selectNode(node) {
        node.selectionType = TREE_SELECTION_TYPE.SELECTED;
        _inheritSelection(node);
    }
    function _unselectNode(node) {
        node.selectionType = TREE_SELECTION_TYPE.NONE;
        _inheritSelection(node);
    }
    function _setNodeInherited(node) {
        node.selectionType = TREE_SELECTION_TYPE.INHERIT_SELECTED;
        _inheritSelection(node);
    }
    function _inheritSelection(node) {
        for (var i = node.nodes.length - 1; i >= 0; i--) {
            if (node.isIncluded()) {
                _setNodeInherited(node.nodes[i]);
            } else {
                _unselectNode(node.nodes[i]);
            }
        }
    }

    TreeNode.prototype.notifyChildSelectionChange = function() {
        var someSelected = this.nodes.some(function(node) { return node.selectionType !== TREE_SELECTION_TYPE.NONE; });

        if (someSelected) {
            var allIncluded = !this.nodes.some(function(node) { return !node.isIncluded(); });

            if (allIncluded) {
                // If all the children are included, mark this node
                // as selected and selection will be inherited to children.
                if (this.canUpgradeSelection() && this.canSelect()) {
                	_selectNode(this);
                }
            } else {
                for (var i = this.nodes.length - 1; i >= 0; i--) {
                    // Break inheritance
                    if (this.nodes[i].isInheritSelected()) {
                        _selectNode(this.nodes[i]);
                    }
                }

                this.selectionType = TREE_SELECTION_TYPE.PARTIAL_SELECTED;
            }
        } else {
            _unselectNode(this);
        }

        // really needed?!
        // if (this.parent) {
        //     this.parent.notifyChildSelectionChange();
        // }
    };

    TreeNode.prototype.isIncluded = function() {
        return this.selectionType === TREE_SELECTION_TYPE.SELECTED ||  this.selectionType === TREE_SELECTION_TYPE.INHERIT_SELECTED;
    };

    TreeNode.prototype.isSelected = function() {
        return this.selectionType === TREE_SELECTION_TYPE.SELECTED;
    };
    TreeNode.prototype.isPartiallySelected = function() {
        return this.selectionType === TREE_SELECTION_TYPE.PARTIAL_SELECTED;
    };
    TreeNode.prototype.isInheritSelected = function() {
        return this.selectionType === TREE_SELECTION_TYPE.INHERIT_SELECTED;
    };

    TreeNode.prototype.getTotalCounts = function() {
        return _getCounts(this);
    };

    TreeNode.prototype.getTotalCountsTotal = function() {
        return this.nodes.length;
    };

    TreeNode.prototype.getTotalCountsIncluded = function() {
        var included = 0;
        for(var i = 0; i < this.nodes.length; i++) {
            included += this.nodes[i].isIncluded() ? 1 : 0;
        }
        return included;
    };

    function _getCounts(node) {
        var ret = {
            total: 1,
            included: node.isIncluded() ? 1 : 0,
            selected: node.isSelected() ? 1 : 0
        };

        for (var i = node.nodes.length - 1; i >= 0; i--) {
            var counts = _getCounts(node.nodes[i]);
            ret.total += counts.total;
            ret.included += counts.included;
            ret.selected += counts.selected;
        }

        return ret;
    }

    TreeNode.prototype.toggleSelect = function() {
        if (this.isIncluded()) {
            this.unselect(true);
        } else {
            this.select(true);
        }
    };

    return {
        create: function(model, events) {
            return new TreeNode(model, undefined, events);
        }
    };
}
