'use strict';

angular.module('TT-UI.Common.Directives.MultiselectDropdownLegacy', [])
	.directive('multiselectDropdownLegacy', function() {
		/* globals $: true */
		var template = '<div class="btn-group ui-multiselect-dropdown" ng-class="{open: open}" ng-init="open=false" data-role="multiselect">' +
			'<div class="ui-multiselect-dropdown-description" ng-bind="selectedDescription || \'Select\'"></div>' +
			'<ul class="dropdown-menu" autofocus="autofocus">' +
			'<li ng-click="selectAll()" class="ui-multiselect-dropdown-option" data-role="option" data-value="select-all">Check All</li>' +
			'<li ng-click="deselectAll();" class="ui-multiselect-dropdown-option" data-role="option" data-value="unselect-all">Uncheck All</li>' +
			'<li class="divider"></li>' +
			'<li ng-repeat="option in options" ng-click="setSelectedItem(option)" class="ui-multiselect-dropdown-option" ng-class="{selected: keyBoardPointer(option.value)}" data-role="option" ng-attr-data-value="{{::option.value}}" data-type="value" ng-attr-data-checked="{{isChecked(option.value) ? 1 : 0}}">' +
			'{{::option.name}}' +
			'<span ng-class="{\'glyphicon glyphicon-ok pull-right\': isChecked(option.value)}"></span>' +
			'</li>' +
			'</ul>' +
			'</div>';

		return {
			require: 'ngModel',
			restrict: 'E',
			scope: {
				options: '=',
				preselected: '='
			},
			replace: true,
			link: function(scope, element, attributes, ngModel) {
				// General multiselect-dropdown functionality
				var el = element[0];
				var currentSelectedOption = '';

				scope.selectedDescription = '';
				scope.model = scope.preselected || [];

				if (scope.model.length !== 0) {
					changeModel();
					ngModel.$setPristine();
				}

				ngModel.$formatters.push(updateDescription);
				ngModel.$parsers.push(updateDescription);

				function changeModel() {
					var model = scope.model;
					var newModelValue = angular.copy(model);

					ngModel.$setViewValue(newModelValue);
					// TODO: Fix me. $setViewValue set dirtines of field to true

					updateDescription(model);
				}

				function updateDescription(model) {
					if (angular.isUndefined(model)) {
						scope.selectedDescription = '';
					} else {
						var labels = model.map(function(value){
							var label;
							
							scope.options.some(function(option){
								if(option.value === value){
									return label = option.name;
								}
							});
							
							return label || value;
						});
						scope.selectedDescription = labels.length > 4 ? labels.length + ' items selected' : labels.join(', ');
					}

					return model;
				}

				$(el).click(function(event) {
					var el = $(event.target);
					if (el.hasClass('ui-multiselect-dropdown-option') || attributes.disabled) { // one of the options is being clicked
						return;
					}

					scope.open = !scope.open;
					scope.$digest();
				});

				scope.selectAll = function() {
					scope.model = pluck(scope.options, 'value');
					changeModel();
				};

				scope.deselectAll = function() {
					scope.model.length = 0;
					changeModel();
				};

				scope.setSelectedItem = function(option) {
					var value = option.value;
					if (contains(scope.model, value)) {
						scope.model = without(scope.model, value);
					} else {
						scope.model.push(value);
					}
					currentSelectedOption = value;
					changeModel();
					return false;
				};

				scope.isChecked = function(value) {
					return contains(scope.model, value);
				};

				scope.keyBoardPointer = function(value) {
					return currentSelectedOption === value;
				};

				// Keyboard events handling section

				var keys = {
					32: {name: 'space', preventDefault: true},
					13: {name: 'space', preventDefault: true},
					38: {name: 'arrowUp', preventDefault: true},
					40: {name: 'arrowDown', preventDefault: true},
					27: {name: 'escape', preventDefault: false}
				};

				function arrowCallback(direction) { // arrows handler
					return function() {
						if (!scope.open) {
							scope.open = true;
						}

						var opts = pluck(scope.options, 'value');
						if (currentSelectedOption === '') { // for the first dropdown opening set current select as first one
							currentSelectedOption = opts[0];
							return;
						}

						var index = opts.indexOf(currentSelectedOption);
						if (index + direction > opts.length - 1) {
							currentSelectedOption = opts[0];
						} else if (index + direction < 0) {
							currentSelectedOption = opts[opts.length - 1];
						} else {
							currentSelectedOption = opts[index + direction];
						}
					};
				}

				var keyDownCallbacks = { //keyboard callbacks bindings
					space: function() { // space button handler
						if (!scope.open || currentSelectedOption === '') {
							scope.open = true;
						} else if (currentSelectedOption !== '') {
							scope.setSelectedItem({value: currentSelectedOption}); // probably not the best solution
						}
					},
					arrowUp: arrowCallback(-1),
					arrowDown: arrowCallback(1),
					escape: function() { // escape button handler. Close dropdown
						scope.open = false;
						currentSelectedOption = '';
						scope.$digest();
					}
				};

				$(el).keydown(function(event) {
					if (attributes.disabled) {
						return;
					}

					var key = keys[event.keyCode];

					if (key) {
						if (key.preventDefault) {
							event.preventDefault(); // prevent default actions for binded keys
						}
						keyDownCallbacks[key.name](); // if we got handler - execute it and update the scope
						scope.$digest();
					}
				});

				// close list on focus out

				$(el).focusout(function() {
					keyDownCallbacks.escape(); //close dropdown
				});

				// Those three below are substitures for pluck, contains and without functions of underscore.js

				function pluck(obj, field) {
					var ret = [];
					var p;

					for (p in obj) {
						if (obj.hasOwnProperty(p) && obj[p][field] !== undefined) {
							ret.push(obj[p][field]);
						}
					}
					return ret;
				}

				function contains(array, name) {
					return array.indexOf(name) !== -1;
				}

				function without(array, name) {
					var index = array.indexOf(name);
					if (index !== -1) {
						array.splice(index, 1);
					}
					return array;
				}

			},
			template: template
		};
	});
