# Readme.md

##---------------------------------##
## Attributes
##---------------------------------##

Configurable directive attribute: nodes.

## Name: nodes
## Type: Array
## Default: N/A (mandatory)
## Description: Tree data model. Must include attributes 'title', 'id', 'nodes', and 'selectionType' (optional - default is 'none').

##---------------------------------##
## Directives
##---------------------------------##

MultiselectHierarchyTree directive: multiselect-hierarchy-tree

## Name: multiselect-hierarchy-tree
## Description: MultiselectHierarchy tree directive

Check the example code for more information.

##---------------------------------##
## Events
##---------------------------------##

Emits a 'selectionChange'-event when selection occurs. Returns selected nodes' titles, ids, and selectionType. Selection types are 'selected', 'partial' (one of more children are selected), and 'inherit' (parent is selected).