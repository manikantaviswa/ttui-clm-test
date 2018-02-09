'use strict';

var module = angular.module('TT-UI.MultiselectHierarchyTree.Controllers.MultiselectHierarchyTreeNodeController', []);

function MultiselectHierarchyTreeNodeController() {
    var mshtNodeCtrl = this;

    mshtNodeCtrl.expanded = false;
    // Only root is expanded by default (cuts inital render time if tree is large).
    if (!mshtNodeCtrl.model.parent) {
        mshtNodeCtrl.expanded = true;
    }

    mshtNodeCtrl.getIconClasses = function () {
        var out = 'glyphicon glyphicon-ttui ';
        if (mshtNodeCtrl.iconHovered) {
            out = out.concat('glyphicon-chevron-circle-right-black ');
        } else {
            out = out.concat('glyphicon-chevron-circle-right ');
        }
        if (mshtNodeCtrl.expanded && !mshtNodeCtrl.iconHovered) {
            out = out.concat('animate ');
        }
        if (!mshtNodeCtrl.expanded && mshtNodeCtrl.iconHovered) {
            out = out.concat('animate-back ');
        }
        return out;
    };

    mshtNodeCtrl.getNodeContentClasses = function () {
        var out = 'tree-node-content ';
        if (!mshtNodeCtrl.hasChildren()) {
            out = out.concat('no-children ');
        }
        if (mshtNodeCtrl.hasChildren()) {
            out = out.concat('header ');
        }
        if (mshtNodeCtrl.hovered) {
            out = out.concat('hover ');
        }
        if (mshtNodeCtrl.model.isPartiallySelected()) {
            out = out.concat('partially-selected ');
        }
        if (!mshtNodeCtrl.model.isSelected() && !mshtNodeCtrl.model.canSelect()) {
        	out = out.concat('select-not-allowed ');
        }
        if (mshtNodeCtrl.model.isSelected() && !mshtNodeCtrl.model.canUnselect()) {
        	out = out.concat('unselect-not-allowed ');
        }
        return out;
    };

    mshtNodeCtrl.hover = function (hover) {
        mshtNodeCtrl.hovered = hover;
    };

    mshtNodeCtrl.iconHover = function (hover) {
        mshtNodeCtrl.iconHovered = hover;
    };

    mshtNodeCtrl.hasChildren = function() {
        if (mshtNodeCtrl.model) {
            return (mshtNodeCtrl.model.nodes || []).length > 0;
        }
    };

    // moved to the directive
    // mshtNodeCtrl.toggleSelect = function() {

    mshtNodeCtrl.toggleExpand = function() {
        mshtNodeCtrl.expanded = !mshtNodeCtrl.expanded;
    };

    mshtNodeCtrl.labelClick = function() {
        if (mshtNodeCtrl.hasChildren() && !mshtNodeCtrl.model.canSelect()) {
            mshtNodeCtrl.toggleExpand();
        } else {
            mshtNodeCtrl.toggleSelect();
        }
    };

    mshtNodeCtrl.isSelected = function() {
        return mshtNodeCtrl.model.isIncluded() || mshtNodeCtrl.model.isPartiallySelected();
    };
}

MultiselectHierarchyTreeNodeController.$inject = [];
module.controller('MultiselectHierarchyTreeNodeController', MultiselectHierarchyTreeNodeController);
