'use strict';

angular.module('TT-UI.Common.Directives.MultiselectDropdown', ['ngAnimate'])
.directive('multiselectDropdown', function ($sce) {

	return {
		require: 'ngModel',
		restrict: 'E',
		scope: {
			options: '=',
			preselected: '=?',
			saveValueOnly: '=?',
			ngModel: '=',
			isDisabled: '=?'
		},
		link: function (scope, element, attributes, ngModel) {
			var currentSelectedOption = '';
			scope.open = false;
			scope.allSelected = false;
			scope.limitNo = 8;
			scope.limit = scope.limitNo;
			scope.showAll = false;

			scope.$watchCollection(function () { return ngModel.$viewValue; }, function () {
				updateSelected();
				updateCount();
				ngModel.$commitViewValue();
			});

			var loadOnce = scope.$watch('preselected', function (value) {
				if (value && value.length > 0) {
					loadOnce();
					ngModel.$setViewValue(value);
					ngModel.$setPristine();
				}
			}, true);

			ngModel.$isEmpty = function () {
				return !ngModel.$modelValue || ngModel.$modelValue.length === 0;
			};

			function updateSelected() {
				var model = ngModel.$viewValue;
				if (angular.isUndefined(model)) {
					scope.selectedOptions = [];
				} else {
					// save value only
					if (scope.saveValueOnly) {
						scope.selectedOptions = getSelectedOptions(model);
					} else {
						scope.selectedOptions = model;
					}
				}
				return model;
			}

			function getSelectedOptions(model) {
				var options = [];
				angular.forEach(model, function(value) {
					var found = find(scope.options, value);

					if (found) {
						// needed for showing tags
						options.push({
							name: found.name,
							value: found.value
						});
					}
				});
				return options;
			}

			function getSelectAllOptions(model) {
				var options = [];
				angular.forEach(model, function(value) {
					var found = find(scope.options, value.value);

					if (found) {
						options.push(found.value);
					}
				});
				return options;
			}

			scope.toggleDropdown = function() {
				scope.open = !scope.open;
			};

			var selectAll = function() {
				if (!scope.isDisabled) {
					if (scope.filteredOptions.length === scope.options.length) {
						// Select all

						// save value only
						if (scope.saveValueOnly) {
							ngModel.$setViewValue(getSelectAllOptions(scope.options));
						} else {
							ngModel.$setViewValue(angular.copy(scope.options));
						}
					} else {
						// Select all filtered unselected
						var model = ngModel.$viewValue || [];
						for (var i = 0; i < scope.filteredOptions.length; i++) {
							if (!contains(model, scope.filteredOptions[i].value)) {
								// save value only
								if (scope.saveValueOnly) {
									model = model.concat(angular.copy(scope.filteredOptions[i].value));
								} else {
									model = model.concat(angular.copy(scope.filteredOptions[i]));
								}
							}
						}
						ngModel.$setViewValue(model);
					}
				}
			};

			var deselectAll = function () {
				if (!scope.isDisabled) {
					if (scope.filteredOptions.length === scope.options.length) {
						// Deselect all
						ngModel.$setViewValue([]);
					} else {
						// Deselect all filtered selected
						var model = ngModel.$viewValue || [];
						for (var i = 0; i < scope.filteredOptions.length; i++) {
							if (contains(model, scope.filteredOptions[i].value)) {
								model = without(model, scope.filteredOptions[i].value);
							}
						}
						ngModel.$setViewValue(model);
					}
				}
			};

			scope.toggleSelectAll = function(event) {
				event.stopPropagation();

				if (!scope.isDisabled) {
					if (scope.filteredOptions.length !== scope.options.length) {
						if (!allOptionsSelected(scope.filteredOptions)) {
							selectAll();
						} else {
							deselectAll();
						}
					} else if (!scope.allSelected) {
						selectAll();
					} else {
						deselectAll();
					}
				}
			};

			function allOptionsSelected(options) {
				for (var i = 0; i < options.length; i++) {
					if (!scope.isChecked(options[i].value)) {
						return false;
					}
				}
				return true;
			}

			function updateCount() {
				var model = ngModel.$viewValue;
				if (model) {
					scope.count = model.length;
					if (scope.count === scope.options.length) {
						scope.allSelected = true;
					} else {
						scope.allSelected = false;
					}
				}
			}

			scope.setSelectedItem = function(option, ev) {
				ev.preventDefault();
				ev.stopPropagation();
				ev.stopImmediatePropagation();

				if (scope.isDisabled) {
					return false;
				}

				var value = option.value;
				var model = ngModel.$viewValue || [];

				// save value only
				if (scope.saveValueOnly) {
					// remove
					if (find(model, value)) {
						ngModel.$setViewValue(without(model, value));
					// add
					} else {
						ngModel.$setViewValue(model.concat(value));
					}
				// save full object
				} else {
					// remove
					if (contains(model, value)) {
						ngModel.$setViewValue(without(model, value));
					// add
					} else {
						ngModel.$setViewValue(model.concat(option));
					}
				}

				ngModel.$setDirty();
				currentSelectedOption = option;
				focusElement();

				return false;
			};

			scope.$on('schemaFormValidate', function () {
				ngModel.$commitViewValue();
				ngModel.$validate();
			});

			scope.isChecked = function (value) {
				return ngModel.$viewValue && contains(ngModel.$viewValue, value);
			};

			scope.keyBoardPointer = function (value) {
				return currentSelectedOption.value === value;
			};

			scope.toggleShowAll = function () {
				scope.showAll = !scope.showAll;
				if (scope.showAll) {
					scope.limit = scope.options.length;
				} else {
					scope.limit = scope.limitNo;
				}
			};

			// Keyboard events handling section
			var keys = {
				32: { name: 'space', preventDefault: true },
				13: { name: 'enter', preventDefault: true },
				38: { name: 'arrowUp', preventDefault: true },
				40: { name: 'arrowDown', preventDefault: true },
				27: { name: 'escape', preventDefault: false }
			};

			function arrowCallback(direction) {
				return function () {
					if (!scope.open) {
						scope.open = true;
						return;
					}

					var opts = scope.filteredOptions;
					if (currentSelectedOption === '') {
						currentSelectedOption = opts[0];
						focusElement();
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
					focusElement();
				};
			}

			function keyboardSelectOption(event) {
				if (event.target.id === 'select-all') {
					scope.toggleSelectAll(event);
				} else if (!scope.open || currentSelectedOption === '') {
					scope.open = true;
				} else if (currentSelectedOption !== '') {
					scope.setSelectedItem(currentSelectedOption, event);
				}
			}

			function focusElement() {
				if (currentSelectedOption !== '') {
					var elems = element.find('li');
					for (var i = 0; i < elems.length; i++) {
						if (elems[i].id === currentSelectedOption.value) {
							elems[i].focus();
							return;
						}
					}
				}
			}

			var keyDownCallbacks = {
				enter: function (event) {
					keyboardSelectOption(event);
				},
				space: function (event) {
					keyboardSelectOption(event);
				},
				arrowUp: arrowCallback(-1),
				arrowDown: arrowCallback(1),
				escape: function () {
					scope.open = false;
					scope.clearCurrentSelected();
				}
			};

			element.on('keydown', function (event) {
				if (attributes.disabled) {
					return;
				}

				var key = keys[event.keyCode];

				if (key) {
					if (key.preventDefault) {
						event.preventDefault();
					}
					keyDownCallbacks[key.name](event);
					scope.$digest();
				}
			});

			element.on('click', function (event) {
				event.stopPropagation();
			});

			document.addEventListener('click', function () {
				scope.onBlur();
				scope.$digest();
			});

			scope.onBlur = function () {
				scope.open = false;
				scope.clearCurrentSelected();
				ngModel.$validate();
			};

			scope.onMenuMouseDown = function (ev) {
				ev.preventDefault();
				ev.stopPropagation();
				return false;
			};

			scope.highlightMatching = function (option, searchText) {
				if (!searchText) {
					return $sce.trustAsHtml(option);
				}
				return $sce.trustAsHtml(option.replace(new RegExp(searchText, 'gi'), '<span class="highlightedText">$&</span>'));
			};

			scope.clearCurrentSelected = function () {
				currentSelectedOption = '';
			};

			//
			// underscore.js functions (modified)
			//
			function contains(array, name) {
				return arrayObjectIndexOf(array, name) !== -1;
			}

			function find(array, name) {
				var index = arrayObjectIndexOf(array, name);
				if (index !== -1) {
					return array[index];
				} else {
					return null;
				}
			}

			function without(array, name) {
				var index = arrayObjectIndexOf(array, name);
				if (index !== -1) {
					array.splice(index, 1);
				}
				return array;
			}

			function arrayObjectIndexOf(arr, obj) {
				for (var i = 0; i < arr.length; i++) {
					if (angular.isDefined(arr[i].value)) {
						if (angular.equals(arr[i].value, obj)) {
							return i;
						}
					} else {
						if (angular.equals(arr[i], obj)) {
							return i;
						}
					}
				}
				return -1;
			}
		},
		templateUrl: 'scripts/common/views/directives/multiselect-dropdown.tpl.html'
	};
});
