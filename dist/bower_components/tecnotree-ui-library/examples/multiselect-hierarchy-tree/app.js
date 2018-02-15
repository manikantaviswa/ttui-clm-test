'use strict';

var module = angular.module('TT-APP.MultiselectHierarchyTreeDemo', [
	'TT-UI.MultiselectHierarchyTree', 
	'TT-UI.MultiselectHierarchyTree.Tpl']);

function AppCtrl($scope) {

	$scope.data = [
		{
			'id': 0,
			'title': 'Root node',
			'selectionType': 'none',
			'nodes': []
		}
	];

	$scope.$on('selectionChange', function(event, data) {
		$scope.selected = data;
	});

	var generateNodes = function(id) {
		var node = {
			'id': id,
			'title': 'Node ' + id,
			'selectionType': 'none',
			'nodes': [{
				'id': id + 1,
				'title': 'Node ' + (id + 1),
				'selectionType': 'none',
				'nodes': [{
					'id': id + 11,
					'title': 'Node ' + (id + 12),
					'selectionType': 'none',
					'nodes': []
				}]
			},
			{
				'id': id + 2,
				'title': 'Node ' + (id + 2),
				'selectionType': 'none',
				'nodes': []
			},
			{
				'id': id + 3,
				'title': 'Node ' + (id + 3),
				'selectionType': 'none',
				'nodes': []
			}]
		};

		return node;
	};

	$scope.generate =  function(count) {
		for (var i = 0; i < count; i++) {
			$scope.data[0].nodes.push(generateNodes(i));
		}
	};

	// tested with 1000 = 5000 nodes, still is a bit slow but usable
	// TODO: more optimization needed
	$scope.generate(10);
}

AppCtrl.$inject = ['$scope'];

module.controller('appCtrl', AppCtrl);


