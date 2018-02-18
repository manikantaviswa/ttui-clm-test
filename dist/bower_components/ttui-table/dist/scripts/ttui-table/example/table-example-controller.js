'use strict';

var module = angular.module('TT-UI.Table.Example.Controller', [
	'TT-UI.Table.Example.Resource',
	'TT-UI.Table.Example.Config',
	'uib/template/modal/window.html',
	'uib/template/modal/backdrop.html',
	'ui.bootstrap.modal'
]);

module.controller('exampleCtrl', ['MockResource', '$uibModal', '$timeout', 'tableService', 'tableConfig', function(MockResource, $uibModal, $timeout, tableService, tableConfig) {

	var DEBOUNCE = 1 * 1000;
	var ctrl = this;
	ctrl.examplePipeData = [];
	ctrl.modalInstance = null;
	ctrl.columns = tableConfig.default.columns;
	//ctrl.search = tableConfig.default.search;

	tableService.allFilterItems = ['aaa', 'bbb', 'ccc', 'ddd'];

	ctrl.examplePipe = function examplePipe(tableState) {
		ctrl.isLoading = true;
		var pagination = tableState.pagination;
		var start = pagination.start || 0; // This is NOT the page number, but the index of item in the list that you want to use to display the table
		var number = pagination.number || 10; // Number of entries showed per page
		var copyTableState = angular.copy(tableState); // copy of tableState

		ctrl.executeAction = function(/*selection*/) {
		};

		// modify query string before backend call
		var modifyQueryString = function() {
			angular.forEach(copyTableState.search.predicateObject, function(value, key) {
				var splits = value.split('|');
				// lets just remove the pipes for example
				copyTableState.search.predicateObject[key] = splits.join(' ').trim();
			});
		};

		modifyQueryString();

		MockResource.getPage(start, number, copyTableState).then(function(result) {
			ctrl.examplePipeData = result.data;
			tableState.pagination.numberOfPages = result.numberOfPages; //set the number of pages so the pagination can update
		}).finally(function() {
			$timeout(function() {
				ctrl.isLoading = false;
				tableService.onDataLoaded();
			}, DEBOUNCE);
		});
	};

	ctrl.confirm = function() {
		var template =
		'<div class="modal-header">' +
			'<h3 class="modal-title">Confirmation</h3>' +
		'</div>' +
		'<div class="modal-body">' +
			'Are you sure?' +
		'</div>' +
		'<div class="modal-footer">' +
			'<button class="btn btn-default" type="button" ng-click="$dismiss(\'cancel\')">Cancel</button>' +
			'<button class="btn btn-primary" type="button" ng-click="$close()">OK</button>' +
		'</div>';

		var options = {
			animation: true,
			template: template,
			controller: 'exampleCtrl',
			size: 'md'
		};

		ctrl.modalInstance = $uibModal.open(options);
	};

	// ctrl.myStringBuilder = function(dropdownCtrl) {
	// 	var search = '';

	// 	for (var i = 0; i < dropdownCtrl.items.length; i++) {
	// 		if (dropdownCtrl.items[i].selected) {
	// 			search += dropdownCtrl.items[i].title;
	// 			search += '|';
	// 		}
	// 	}
	// 	search += dropdownCtrl.input;
	// 	return search;
	// };

}]);
