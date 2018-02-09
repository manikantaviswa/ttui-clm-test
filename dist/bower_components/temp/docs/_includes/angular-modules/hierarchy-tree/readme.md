# Readme.md

##---------------------------------##
## Attributes
##---------------------------------##

Configurable directive attributes: recursion-template, model and options.

## Name: recursion-template
## Type: String
## Default: N/A (mandatory)
## Description: Recursive HTML template used for every node in the tree.
## Note: template ht-recursion-template-default.tpl.html is provided for demonstration purpose. Override template path (templatePath) in options.

## Name: model
## Type: Object
## Default: N/A (mandatory)
## Description: Tree data model.

## Name: options (*)
## Type: Object
## Default: (optional)
{
	showRoot: false,
	readonly: true,
	selectPrevious: false,
	maxDepth: 0,
	templatePath: 'scripts/hierarchy-tree/views/directives/'
}
## Description: Tree configuration object. Default values come from config, but you can override them by providing options object.

Check the example code for more information.

##---------------------------------##
## Attributes: options (*)
##---------------------------------##

## Name: showRoot
## Description: Show root lines or not. Check also Directives section.

## Name: readonly
## Description: Allow node title editing in tree or not.

## Name: selectPrevious
## Description: Select automatically previous node after node deletion.

## Name: maxDepth
## Description: Maximum number of levels in the tree. Zero (0) is for unlimited.

## Name: templatePath
## Description: Path to recursion-template.

Check the example code for more information.

##---------------------------------##
## Attributes: options - callbacks
##---------------------------------##

You can override default behaviour of the actions.

## Overridable actions (function): removedAction, selectedAction, rootSelectedAction, newSubItemAction, footerButtonAction and dragoverAction.
## Type: function

Check the example code for more information.

##---------------------------------##
## Directives
##---------------------------------##

HierarchyTree directives: hierarchy-tree, hierarchy-tree-container and hierarchy-tree-container-root-node

## Structure
  ├── hierarchy-tree
  │   └── hierarchy-tree-container
  │       └── hierarchy-tree-container-root-node

## Name: hierarchy-tree
## Description: Hierarchy tree directive

## Name: hierarchy-tree-container
## Description: Hierarchy tree container directive

## Name: hierarchy-tree-container-root-node (optional)
## Description: Hierarchy tree container root node directive. Configure tree root node. If not defined, root node is not shown at all.

Check the example code for more information.

##---------------------------------##
## Template
##---------------------------------##

Node has several helper functions in scope which can be used in template. Check the code for more details:
http://git.tecnotree.com/tec_common/ui-lib/tree/develop/src/scripts/hierarchy-tree/controllers/ht-node-ctrl.js

