/*! TT-UI Lib 0.6.24.19 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-multiselect-hierarchy-tree';
}

(function (window, angular, undefined) {
	"use strict";


// Source: src/scripts/multiselect-hierarchy-tree/controllers/multiselect-ht-ctrl.js
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


// Source: src/scripts/multiselect-hierarchy-tree/controllers/multiselect-ht-node-ctrl.js
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


// Source: src/scripts/multiselect-hierarchy-tree/directives/multiselect-ht-node.js
var module = angular.module('TT-UI.MultiselectHierarchyTree.Directives.MultiselectHierarchyTreeNode', []);

function MultiselectHierarchyTreeNode(multiselectHierarchyTreeConfig) {
    return {
        require: ['multiselectHierarchyTreeNode', '^multiselectHierarchyTree'],
        restrict:'A',
        controller: 'MultiselectHierarchyTreeNodeController as mshtNodeCtrl',
        scope: {},
        bindToController: {
            model: '=',
            searchText: '='
        },
        templateUrl: multiselectHierarchyTreeConfig.templatePath + 'multiselect-ht-node.tpl.html',
        link: function (scope, element, attrs, controllers) {
            scope.recursionTemplate = multiselectHierarchyTreeConfig.templatePath + 'multiselect-ht-recursion.tpl.html';

            var mshtNodeCtrl = controllers[0];
            var mshtCtrl = controllers[1];

            mshtNodeCtrl.toggleSelect = function() {
                mshtNodeCtrl.model.toggleSelect();
                mshtCtrl.notifySelectionChange();
            };
        }
    };
}

MultiselectHierarchyTreeNode.$inject = ['multiselectHierarchyTreeConfig'];

module.directive('multiselectHierarchyTreeNode', MultiselectHierarchyTreeNode);


// Source: src/scripts/multiselect-hierarchy-tree/directives/multiselect-ht.js
var module = angular.module('TT-UI.MultiselectHierarchyTree.Directives.MultiselectHierarchyTree', [
]);

function MultiselectHierarchyTree(multiselectHierarchyTreeConfig, $timeout) {
    return {
        require: 'multiselectHierarchyTree',
        restrict:'E',
        controller: 'MultiselectHierarchyTreeController as mshtCtrl',
        scope: {}, // Create an isolate scope
        bindToController: { // but instead of using the scope, bind to controller so directive and controller can use the same namespace
            nodes: '='
        },
        link: function(scope, element, attrs, mshtCtrl) {
        	scope.hierarchyTreeAttrs = attrs;

            $timeout(function() {
                mshtCtrl.notifySelectionChange();
            }, 0);
        },
        templateUrl: multiselectHierarchyTreeConfig.templatePath + 'multiselect-ht.tpl.html'
    };
}

MultiselectHierarchyTree.$inject = ['multiselectHierarchyTreeConfig', '$timeout'];

module.directive('multiselectHierarchyTree', MultiselectHierarchyTree);


// Source: src/scripts/multiselect-hierarchy-tree/directives/tree-background-rows.js
var module = angular.module('TT-UI.MultiselectHierarchyTree.Directives.TreeBackgroundRows', [
]);

function TreeBackgroundRows() {
    function drawBackgroundRows(canvas, rowCount, rowHeight) {
        var ctx = canvas.getContext('2d');
        ctx.canvas.height = rowCount*rowHeight;
        ctx.canvas.width = 2000; // make wide enough, so we dont need to worry about drawing
        ctx.fillStyle = '#FFFFFF';
        for (var i = 0; i < rowCount; i++) {
            if (i % 2 === 0) {
                var y = i * rowHeight;
                ctx.fillRect(0, y, 2000, rowHeight);
            }
        }
        ctx.canvas.style.position = 'absolute';
        ctx.canvas.style.zIndex = '-1';
        ctx.canvas.style.top = '0px';
        ctx.canvas.style.left = '0px';
    }

    return {
        restrict: 'A',
        scope: {
            rowHeight: '@'
        },
        transclude: true,
        template: '<canvas width=\'0\' height=\'0\'></canvas><div ng-transclude></div>',
        link: function(scope, elem) {
            scope.$watch(function() {
                // return the "result" of the watch expression
                return (elem.find('li').length * scope.rowHeight);
            }, function() {
                    // lets draw only when the height is changed
                    drawBackgroundRows(elem.find('canvas')[0], elem.find('li').length, scope.rowHeight);
                }
            );
        }
    };
}

TreeBackgroundRows.$inject = [];

module.directive('treeBackgroundRows', TreeBackgroundRows);

// Source: src/scripts/multiselect-hierarchy-tree/filters/tree-node-filter.js
angular.module('TT-UI.MultiselectHierarchyTree.Filters.TreeNodeFilter', [
])
.filter('searchNode', searchNodeFilter);

searchNodeFilter.$inject = [];

function searchNodeFilter() {

    function search(nodes, text) {
        if (!text) {
            return nodes;
        }

        text = text.toLowerCase();

        return nodes.filter(function(node) {
            var nodeName = node.title.toLowerCase();
            var parentName = '';
            if (node.parent) {
                parentName = node.parent.title.toLowerCase();
            }
            var match = nodeName.indexOf(text.toLowerCase()) >= 0 || parentName.indexOf(text.toLowerCase()) >= 0 || !node.parent;

            return match || search(node.nodes, text).length > 0;
        });
    }

    return search;
}


// Source: src/scripts/multiselect-hierarchy-tree/module.js
angular.module('TT-UI.MultiselectHierarchyTree.Config', [])
	.constant('multiselectHierarchyTreeConfig', {
    	templatePath: 'scripts/multiselect-hierarchy-tree/views/directives/'
});

angular.module('TT-UI.MultiselectHierarchyTree', [
	'ui.bootstrap.collapse',
	'ngAnimate',
	'TT-UI.MultiselectHierarchyTree.Config',
	'TT-UI.MultiselectHierarchyTree.Services.TreeNodeFactory',
	'TT-UI.MultiselectHierarchyTree.Filters.TreeNodeFilter',
	'TT-UI.MultiselectHierarchyTree.Controllers.MultiselectHierarchyTreeController',
	'TT-UI.MultiselectHierarchyTree.Controllers.MultiselectHierarchyTreeNodeController',
	'TT-UI.MultiselectHierarchyTree.Directives.MultiselectHierarchyTreeNode',
	'TT-UI.MultiselectHierarchyTree.Directives.MultiselectHierarchyTree',
	'TT-UI.MultiselectHierarchyTree.Directives.TreeBackgroundRows'
]);

// Source: src/scripts/multiselect-hierarchy-tree/services/tree-node-factory.js
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


// Source: src/scripts/multiselect-hierarchy-tree/services/tree-selection-rule.js
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

return angular;
})(window, window.angular);