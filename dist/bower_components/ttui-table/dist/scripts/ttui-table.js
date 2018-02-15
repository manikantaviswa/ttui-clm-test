/*! TT-UI.Table 0.1.1 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-table';
}

(function (window, angular, undefined) {
	"use strict";


// Source: src/scripts/ttui-table/module.js
var module = angular.module('TT-UI.Table', [
	'ngAnimate',
	'ui.bootstrap.position',
	'ui.bootstrap.tooltip',
	'ui.bootstrap.popover',
	'ui.bootstrap.collapse',
	'ui.bootstrap.tabs',
	'ui.bootstrap.dropdown',
	'uib/template/tooltip/tooltip-popup.html',
	'uib/template/tabs/tab.html',
	'uib/template/tabs/tabset.html',
	'pascalprecht.translate',
	'smart-table',
	'TT-UI.Table.Filters',
	'TT-UI.Table.Service',
	'TT-UI.Table.Directives'
]);

module.config(['$uibTooltipProvider', function($uibTooltipProvider) {
	$uibTooltipProvider.options({
		'appendToBody': true
	});
}]);

// temporary
angular.module('TT-UI.Table.Minimal', [
	'ngAnimate',
	'ui.bootstrap.collapse',
	'smart-table',
	'TT-UI.Table.Filters',
	'TT-UI.Table.Service',
	'TT-UI.Table.Directives',
]);


// Source: src/scripts/ttui-table/table-service.js
var module = angular.module('TT-UI.Table.Service', []);

var tableService = function tableService() {
	var ctrl = {};
	// jscs:disable
	var base64 = {
		_keyStr:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
		encode:function(e){var t='';var n,r,i,s,o,u,a;var f=0;e=base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64;}else if(isNaN(i)){a=64;}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a);}return t;},
		decode:function(e){var t='';var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,'');while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!==64){t=t+String.fromCharCode(r);}if(a!==64){t=t+String.fromCharCode(i);}}t=base64._utf8_decode(t);return t;},
		_utf8_encode:function(e){e=e.replace(/\r\n/g,'\n');var t='';for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128);}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128);}}return t;},
		_utf8_decode:function(e){var t='';var n=0;var r=0,c2=0,c3=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++;}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2;}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3;}}return t;}
	};
	// jscs:enable
	var selected = [];
	var expanded = [];
	var allFilterItems = [];
	var tags = [];

	this.selected = selected;
	this.expanded = expanded;
	this.allFilterItems = allFilterItems;
	this.tags = tags;

	// internal functions
	var contains = function(array, encoded) {
		var value = false;
		angular.forEach(array, function(sel) {
			if (sel === encoded) {
				value = true;
			}
		});
		return value;
	};

	var remove = function(array, object) {
		if (angular.isObject(object)) {
			object = angular.copy(object);
			delete object._meta;
			var encoded = base64.encode(JSON.stringify(object));
			angular.forEach(array, function(item, index) {
				if (item === encoded) {
					array.splice(index, 1);
				}
			});
			//console.log('TT-UI.Table.Service remove: object removed ' + encoded);
		} else {
			//console.log('TT-UI.Table.Service remove: parameter is not an object');
		}
	};

	var push = function(array, object) {
		if (angular.isObject(object)) {
			object = angular.copy(object);
			delete object._meta;
			var encoded = base64.encode(JSON.stringify(object));
			if (!contains(array, encoded)) {
				array.push(encoded);
			} else {
				//console.log('TT-UI.Table.Service push: object already exists ' + encoded);
			}
			//console.log('TT-UI.Table.Service push: object pushed ' + encoded);
		} else {
			//console.log('TT-UI.Table.Service push: parameter is not an object');
		}
	};

	var isSet = function(array, object) {
		var value = false;
		if (angular.isObject(object)) {
			object = angular.copy(object);
			delete object._meta;
			var encoded = base64.encode(JSON.stringify(object));
			angular.forEach(array, function(item) {
				if (item === encoded) {
					value = true;
					//console.log('TT-UI.Table.Service isSet: found object ' + item);
				}
			});
		}
		return value;
	};
	// ---

	this.create = function(tableCtrl) {
		ctrl = tableCtrl;
		return new tableService();
	};

	this.getTableCtrl = function() {
		return ctrl;
	};

	this.addSelected = function(obj) {
		push(selected, obj);
	};

	this.addExpanded = function(obj) {
		push(expanded, obj);
	};

	this.removeSelected = function(obj) {
		remove(selected, obj);
	};

	this.removeExpanded = function(obj) {
		remove(expanded, obj);
	};

	this.isSelected = function(obj) {
		return isSet(selected, obj);
	};

	this.isExpanded = function(obj) {
		return isSet(expanded, obj);
	};

	this.onDataLoaded = function() {
		ctrl.onDataLoaded();
	};

	this.cleanup = function() {
		selected = [];
		expanded = [];
	};

	this.getSelected = function() {
		var out = [];
		angular.forEach(selected, function(s) {
			var obj = JSON.parse(base64.decode(s));
			out.push(obj);
		});
		return out;
	};

	this.getSelectedCount = function() {
		return selected.length;
	};

	// tags
	this.setTag = function(tag) {
		tags.push(tag);
	};

	this.getTags = function() {
		return tags;
	};
};

tableService.$inject = [];
module.service('tableService', tableService);


// Source: src/scripts/ttui-table/table.js
var module = angular.module('TT-UI.Table.Directives', [
]);

function ttTable($compile, $timeout, $filter, tableService) {
	return {
		restrict: 'A',
		scope: false,
		require: ['ttTable', '^stTable'],
		controllerAs: 'tableCtrl',
		bindToController: {
			tableModel: '=stTable',
			stPipe: '=',
			stItemsByPage: '='
		},
		controller: ['$scope', '$element', function($scope, $element) {
			var tableCtrl = this;
			// create table service
			tableCtrl.service = tableService.create(tableCtrl);
			tableCtrl.selectAll = false;

			tableCtrl.colspan = 0;
			tableCtrl.enablePagination = true;
			tableCtrl.filters = [];
			tableCtrl.dropdowns = [];

			// fill empty meta
			var fillEmptyMeta = function() {
				var emptyMeta = {
					selected: false,
					expanded: false
				};

				angular.forEach(tableCtrl.tableModel, function(row) {
					if (!angular.isDefined(row._meta)) {
						row._meta = angular.copy(emptyMeta);
					}
				});
			};

			var isAllSelected = function() {
				if (tableCtrl.tableModel) {
					var all = tableCtrl.tableModel.length, count = 0;
					angular.forEach(tableCtrl.tableModel, function(row) {
						if (row._meta && row._meta.selected) {
							count++;
						}
					});
					return (count === all && count > 0) ? true : false;
				}
			};

			// count colspan from "main-header"
			var findColspan = function() {
				var heads = angular.element($element.find('thead'));
				angular.forEach(heads, function(head) {
					var h = angular.element(head);
					if (h.hasClass('main-header')) {
						var ths = h.find('th');
						tableCtrl.colspan = ths.length;
					}
				});
			};

			// show table when document is ready
			var show = function() {
				$element.addClass('show');
				findColspan();
			};

			tableCtrl.toggleSelectAll = function() {
				angular.forEach(tableCtrl.tableModel, function(row) {
					if (tableCtrl.selectAll) {
						if (row._meta) {
							row._meta.selected = true;
							tableCtrl.service.addSelected(row);
						}
					} else {
						if (row._meta) {
							row._meta.selected = false;
							tableCtrl.service.removeSelected(row);
						}
					}
				});
			};

			tableCtrl.toggleExpanded = function(obj) {
				obj._meta.expanded = !obj._meta.expanded;
				if (obj._meta.expanded) {
					tableCtrl.service.addExpanded(obj);
				} else {
					tableCtrl.service.removeExpanded(obj);
				}
			};

			tableCtrl.sum = function(property) {
				var sum = 0;
				angular.forEach(tableCtrl.tableModel, function(obj) {
					sum += obj[property];
				});
				return sum;
			};

			tableCtrl.getColumnData = function(column) {
				var dropdown = null;

				angular.forEach(tableCtrl.dropdowns, function(dropdownInstance) {
					if (dropdownInstance.filters && (column === dropdownInstance.predicate)) {
						dropdown = dropdownInstance;
					}
				});

				if (dropdown) {
					return angular.copy(dropdown.filters);
				} else {
					var data = [];
					angular.forEach(tableCtrl.tableModel, function(obj) {
						data.push({title: obj[column], path: column});
					});

					return data;
				}
			};

			tableCtrl.onDataLoaded = function() {
				fillEmptyMeta(); // check if needed?
				updateMeta();
			};

			tableCtrl.removeTag = function(key, value, event) {
				var found = false;
				event.preventDefault();
				//event.stopPropagation();
				angular.forEach(tableCtrl.dropdowns, function(dropdown) {
					if (key === dropdown.predicate) {
						dropdown.unSelectItemByValue(value);
						found = true;
					}
				});

				// remove also not known tags
				if (!found) {
					if (tableCtrl.tableState.search.predicateObject) {
						delete tableCtrl.tableState.search.predicateObject[key];
					}
				}
				return found;
			};

			tableCtrl.showActions = function() {
				return tableCtrl.service.getSelectedCount() > 0;
			};

			tableCtrl.getSelectionModel = function() {
				return tableCtrl.service.getSelected();
			};

			tableCtrl.get = function() {
				return tableCtrl;
			};

			var updateMeta = function() {
				angular.forEach(tableCtrl.tableModel, function(obj) {
					if (tableCtrl.service.isSelected(obj)) {
						obj._meta.selected = true;
					}
					if (tableCtrl.service.isExpanded(obj)) {
						obj._meta.expanded = true;
					}
				});
			};

			$scope.$watch('tableCtrl.tableModel', function() {
				if (isAllSelected()) {
					tableCtrl.selectAll = true;
				} else {
					tableCtrl.selectAll = false;
				}
			}, true);

			$timeout(show, 0);
		}],
		link: function(scope, element, attributes, controllers) {
			var tableCtrl = controllers[0],
				stTableCtrl = controllers[1];
			tableCtrl.tableState = stTableCtrl.tableState();
			tableCtrl.stTableCtrl = stTableCtrl;
		}
	};
}

ttTable.$inject = ['$compile', '$timeout', '$filter', 'tableService'];
module.directive('ttTable', ttTable);

// st-direction
function stDirection($document) {
	return {
		restrict: 'A',
		scope: false,
		require: ['^stDirection'],
		bindToController: true,
		controllerAs: 'stDirectionCtrl',
		controller: function() {
		},
		link: function(scope, element, attributes, controller) {
			var stDirectionCtrl = controller[0];
			stDirectionCtrl.direction = $document[0].dir || 'ltr';
		}
	};
}

stDirection.$inject = ['$document'];
module.directive('stDirection', stDirection);

function ttTablePagination($timeout) {
	var template = '<div st-pagination="" st-items-by-page="paginationCtrl.itemsByPage" st-displayed-pages="5" st-template="scripts/ttui-table/table-pagination.tpl.html" class="pull-right"></div>';
	return {
		restrict: 'E',
		scope: false,
		require: ['^ttTable'],
		bindToController: true,
		controllerAs: 'paginationCtrl',
		template: template,
		controller: function() {
			var paginationCtrl = this;
			paginationCtrl.itemsByPage = 10;
		},
		link: function(scope, element, attributes, controller) {
			var tableCtrl = controller[0];

			$timeout(function() {
				scope.paginationCtrl.itemsByPage = tableCtrl.stItemsByPage;
			}, 0);
		}
	};
}

ttTablePagination.$inject = ['$timeout'];
module.directive('ttTablePagination', ttTablePagination);

function ttTableCheckbox() {
	return {
		restrict: 'E',
		scope: {
			value: '=',
			selectionModel: '='
		},
		bindToController: true,
		require: ['ttTableCheckbox', '^ttTable'],
		controllerAs: 'checkCtrl',
		template: '<a class="table-checkbox glyphicon" ng-class="checkCtrl.getCss()" ng-click="checkCtrl.click($event)"></a>',
		controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
			var checkCtrl = this;
			checkCtrl.checkOff = 'ttui-table-checkbox-unchecked';
			checkCtrl.checkOffActive = 'ttui-table-checkbox-unchecked-active';
			checkCtrl.checkOn = 'ttui-table-checkbox-checked';
			checkCtrl.value = false;
			checkCtrl.active = false;
			var noClick = angular.isDefined($attrs.$attr.noClick) ? true : false;

			checkCtrl.toggle = function() {
				checkCtrl.value = !checkCtrl.value;
				if (checkCtrl.selectionModel) {
					if (checkCtrl.value) {
						checkCtrl.tableCtrl.service.addSelected(checkCtrl.selectionModel);
					} else {
						checkCtrl.tableCtrl.service.removeSelected(checkCtrl.selectionModel);
					}
				}
			};

			checkCtrl.setValue = function(newValue) {
				checkCtrl.value = newValue;
			};

			checkCtrl.getValue = function() {
				return checkCtrl.value;
			};

			checkCtrl.click = function(event) {
				checkCtrl.toggle();
				if (noClick) {
					event.stopPropagation();
				}
			};

			angular.element($element).bind('mouseover', function() {
				checkCtrl.active = true;
				$scope.$digest(); // needed
			});

			angular.element($element).bind('mouseout', function() {
				checkCtrl.active = false;
				$scope.$digest(); // needed
			});

			// get proper css, based on state
			checkCtrl.getCss = function() {
				var classes = '';
				if (checkCtrl.value) {
					classes = checkCtrl.checkOn;
				} else {
					if (checkCtrl.active) {
						classes = checkCtrl.checkOffActive;
					} else {
						classes = checkCtrl.checkOff;
					}
				}
				return classes;
			};
		}],
		link: function(scope, element, attributes, controllers) {
			var checkCtrl = controllers[0];
			checkCtrl.tableCtrl = controllers[1];
		}
	};
}

ttTableCheckbox.$inject = [];
module.directive('ttTableCheckbox', ttTableCheckbox);

function ttTableTooltip($compile) {
	return {
		restrict: 'AE',
		scope: true,
		bindToController: true,
		controllerAs: 'tooltipCtrl',
		compile: function() {

			var MAX_LEN = 20;
			var compile = false;

			return {
				pre: function preLink() {},
				post: function postLink(scope, element, attributes) {
					var max = scope.$eval(attributes.ttTableTooltip) || MAX_LEN;
					var bind = scope.$eval(attributes.ngBind);
					var text = angular.isDefined(bind) ? bind : element.text() + '';

					var attrs = {
						'uib-tooltip': text,
						'tooltip-class': 'table-tooltip',
						'tooltip-trigger': 'mouseenter'
					};

					if (text.length > max) {
						element.addClass('ellipsis');
						element.attr(attrs);
						element.removeAttr('tt-table-tooltip');
						compile = true;
					}

					if (compile) {
						$compile(element)(scope);
					}
				}
			};
		}
	};
}

ttTableTooltip.$inject = ['$compile'];
module.directive('ttTableTooltip', ttTableTooltip);

function ttTableTextTooltip() {
	var template = '<span uib-tooltip="{{textTooltipCtrl.getTipText()}}" tooltip-class="table-tooltip" tooltip-trigger="mouseenter">{{textTooltipCtrl.getTipTextShort()}}</span>';
	return {
		restrict: 'AE',
		scope: {
			tipText: '=text'
		},
		bindToController: true,
		require: ['ttTableTextTooltip'],
		template: template,
		controllerAs: 'textTooltipCtrl',
		controller: function() {
		},
		link: function(scope, element, attributes, controllers) {
			var textTooltipCtrl = controllers[0];
			var MAX_LEN = 20;
			textTooltipCtrl.tipTextLen = textTooltipCtrl.tipText.length;

			textTooltipCtrl.getTipText = function() {
				return textTooltipCtrl.tipTextLen > MAX_LEN ? textTooltipCtrl.tipText : ''; // do not show short ones
			};

			textTooltipCtrl.getTipTextShort = function() {
				return textTooltipCtrl.tipTextLen > MAX_LEN ? textTooltipCtrl.tipText.substr(0, 17) + '...' : textTooltipCtrl.tipText;
			};
		}
	};
}

ttTableTextTooltip.$inject = [];
module.directive('ttTableTextTooltip', ttTableTextTooltip);

function ttTableDropdown($compile, $timeout, $parse, $filter) {
	return {
		restrict: 'AE',
		scope: true,
		bindToController: true,
		require: ['ttTableDropdown', '^ttTable', '^stTable'],
		controllerAs: 'dropdownCtrl',
		controller: function() {
		},
		compile: function(element) {
			var indicator = angular.element('<span class="glyphicon glyphicon-filter filter-indicator"></span>');
			var dropdown = angular.element('<ul class="uib-dropdown-menu" uib-dropdown-menu template-url="scripts/ttui-table/table-filter-dropdown.tpl.html"></ul>');

			element.append(indicator);
			element.append(dropdown);
			element.addClass('add-pointer');

			// link
			return function(scope, element, attributes, controllers) {
				var dropdownCtrl = controllers[0];
				var tableCtrl = controllers[1];
				var stTableCtrl = controllers[2];
				var tableState = controllers[2].tableState();

				dropdownCtrl.reverse = undefined;
				dropdownCtrl.input = '';
				dropdownCtrl.isOpen = false;
				dropdownCtrl.items = [];
				dropdownCtrl.disableAutoFilters = scope.$eval(attributes.disableAutoFilters);
				dropdownCtrl.predicate = scope.$eval(attributes.path);
				dropdownCtrl.filters = scope.$eval(attributes.setFilters);

				tableCtrl.tableState = tableState;
				tableCtrl.dropdowns.push(dropdownCtrl);

				var buildSearchString = function() {
					var selected = $filter('filter')(dropdownCtrl.items, {selected: true});
					var tags = [].concat(selected).map(function(item) {
						return item.title;
					});

					if (dropdownCtrl.input) {
						tags.push(dropdownCtrl.input);
					}

					return tags.join();
				};

				if (angular.isDefined(attributes.buildFilterStringFn)) {
					var handler = $parse(attributes.buildFilterStringFn);
					dropdownCtrl.buildFilterStringFn = function() {
						return handler(scope);
					};
				} else {
					dropdownCtrl.buildFilterStringFn = buildSearchString;
				}

				dropdownCtrl.isDropdownOpen = function() {
					return dropdownCtrl.isOpen;
				};

				dropdownCtrl.sort = function() {
					dropdownCtrl.reverse = !dropdownCtrl.reverse || false;
					stTableCtrl.sortBy(dropdownCtrl.predicate, dropdownCtrl.reverse);
				};

				dropdownCtrl.search = function() {
					var search = dropdownCtrl.buildFilterStringFn();
					if (search !== '') {
						stTableCtrl.search(search, dropdownCtrl.predicate);
					}
				};

				dropdownCtrl.toggleSelectItem = function(item) {
					item.selected = !item.selected;
					var search = dropdownCtrl.buildFilterStringFn();
					stTableCtrl.search(search, dropdownCtrl.predicate);
				};

				dropdownCtrl.unSelectItemByValue = function(value) {
					angular.forEach(dropdownCtrl.items, function(item) {
						if (value === item.title) {
							item.selected = false;
						}
					});

					// search field is just cleared
					if (value === dropdownCtrl.input) {
						dropdownCtrl.input = '';
					}

					var search = dropdownCtrl.buildFilterStringFn();
					stTableCtrl.search(search, dropdownCtrl.predicate);
				};

				dropdownCtrl.selectAll = function() {
					for (var i = 0; i < dropdownCtrl.items.length; i++) {
						dropdownCtrl.items[i].selected = true;
					}
					var search = dropdownCtrl.buildFilterStringFn();
					stTableCtrl.search(search, dropdownCtrl.predicate);
				};

				dropdownCtrl.unSelectAll = function() {
					for (var i = 0; i < dropdownCtrl.items.length; i++) {
						dropdownCtrl.items[i].selected = false;
					}
				};

				dropdownCtrl.getSelectedFilters = function() {
					var out = [];
					for (var i = 0; i < dropdownCtrl.items.length; i++) {
						if (dropdownCtrl.items[i].selected) {
							out.push(dropdownCtrl.items[i]);
						}
					}
					return out;
				};

				dropdownCtrl.close = function() {
					dropdownCtrl.isOpen = false;
				};

				dropdownCtrl.clear = function() {
					if (dropdownCtrl.hasSelections() || isAutoFiltersDisabled()) {
						if (tableState.search.predicateObject) {
							delete tableState.search.predicateObject[dropdownCtrl.predicate];
						}

						if (tableState.sort) {
							tableState.sort.predicate = '';
							tableState.sort.reverse = false;
						}

						dropdownCtrl.reverse = undefined;
						dropdownCtrl.input = '';
						dropdownCtrl.unSelectAll();
						stTableCtrl.pipe();
					}
				};

				// if filter selected, sorting is defined (other than undefined), or input has text
				dropdownCtrl.hasSelections = function() {
					return (dropdownCtrl.getSelectedFilters().length > 0) || dropdownCtrl.reverse === true || dropdownCtrl.reverse === false || dropdownCtrl.input !== '';
				};

				var isAutoFiltersDisabled = function() {
					return angular.isDefined(dropdownCtrl.disableAutoFilters) && dropdownCtrl.disableAutoFilters === true;
				};

				var isFilters = function() {
					return angular.isDefined(dropdownCtrl.filters);
				};

				var updateSelections = function() {
					var selected = dropdownCtrl.getSelectedFilters();
					var newData = tableCtrl.getColumnData(dropdownCtrl.predicate);
					dropdownCtrl.items = $filter('unique')(angular.merge(newData, selected), 'title');
				};

				// watches
				scope.$watch('dropdownCtrl.isOpen', function(value) {
					if (value && (!isAutoFiltersDisabled() || isFilters())) { // opened
						updateSelections();
					}

					element.toggleClass('is-open', dropdownCtrl.isOpen);

					$timeout(function() {
						scope.$broadcast('ttTableFocus', dropdownCtrl.predicate);
					});
				});

				// watch table model changes
				scope.$watch('tableCtrl.tableModel', function() {
					if (!isAutoFiltersDisabled() && !isFilters()) {
						updateSelections();
					}
				});

				// watch items changes
				scope.$watch('dropdownCtrl.items', function() {
					element.toggleClass('has-selected', dropdownCtrl.hasSelections());
				});

				// watch table state, if there is no filter items
				scope.$watch('tableCtrl.tableState', function() {
					element.toggleClass('has-selected', dropdownCtrl.hasSelections());
				}, true);
			};
		}
	};
}

ttTableDropdown.$inject = ['$compile', '$timeout', '$parse', '$filter'];
module.directive('ttTableDropdown', ttTableDropdown);

// not used
function ttTableFilterDropdownToggle($document) {
	return {
		restrict: 'A',
		scope: true,
		link: function(scope, element, attributes) {
			var targetId = attributes.ttTableFilterDropdownToggle;
			var toggle = function() {
				var target = angular.element($document[0].querySelector('#' + targetId));
				var dropdownCtrl = target.scope();
				if (dropdownCtrl) {
					dropdownCtrl.dropdownCtrl.isOpen = !dropdownCtrl.dropdownCtrl.isOpen;
					scope.$apply();
				}
			};
			angular.element(element).bind('click', toggle);
		}
	};
}

ttTableFilterDropdownToggle.$inject = ['$document'];
module.directive('ttTableFilterDropdownToggle', ttTableFilterDropdownToggle);

function ttTableFilterTags() {
	var template = '<a class="label label-default" href ng-repeat="tag in tagsCtrl.displayTags">{{tag.text}} ' +
		'<span class="glyphicon glyphicon-remove" ng-click="tagsCtrl.removeTag($event, tag)"></span></a>';
	return {
		restrict: 'E',
		scope: {
			tags: '=',
			excludeKeys: '=',
			tagDelimiter: '@'
		},
		bindToController: true,
		require: ['ttTableFilterTags', '^ttTable'],
		controllerAs: 'tagsCtrl',
		template: template,
		controller: function() {
		},
		link: function(scope, element, attributes, controllers) {
			var tagsCtrl = controllers[0];
			tagsCtrl.tableCtrl = controllers[1];
			tagsCtrl.displayTags = [];
			var delimiter = tagsCtrl.tagDelimiter || ',';
			var _remove = function(tag) {
				var index = tagsCtrl.displayTags.indexOf(tag);
				if (index !== -1) {
					tagsCtrl.displayTags.splice(index, 1);
				}
			};

			tagsCtrl.removeTag = function(event, tag) {
				var splits = tag.text.split(' : ');
				var splitKey = splits[0];
				var splitValue = splits[1];
				var found = tagsCtrl.tableCtrl.removeTag(splitKey, splitValue, event);
				if (!found) {
					_remove(tag);
				}
			};

			var handleTags = function() {
				tagsCtrl.displayTags = [];
				angular.forEach(tagsCtrl.tags, function(tag, key) {
					if (isKeyExcluded(key)) {
						return;
					}
					var splits = tag.split(delimiter);
					for (var i = 0; i < splits.length; i++) {
						var insert = {};
						insert.text = key + ' : ' + splits[i];
						// do not add empty ones
						if (splits[i] !== '') {
							tagsCtrl.displayTags.push(insert);
						}
					}
				});
			};

			function isKeyExcluded(key) {
				return scope.tagsCtrl.excludeKeys && scope.tagsCtrl.excludeKeys.indexOf(key) !== -1;
			}

			scope.$watch('tagsCtrl.tags', function() {
				handleTags();
			}, true);
		}
	};
}

ttTableFilterTags.$inject = [];
module.directive('ttTableFilterTags', ttTableFilterTags);

function ttTableFocus() {
	return function(scope, element, attr) {
		scope.$on('ttTableFocus', function(event, name) {
			if (name === attr.ttTableFocus) {
				element[0].focus();
			}
		});
	};
}

ttTableFocus.$inject = [];
module.directive('ttTableFocus', ttTableFocus);

function ttTableEnter() {
	return function(scope, element, attrs) {
		element.bind('keydown keypress', function(event) {
			if (event.which === 13) {
				scope.$apply(function() {
					scope.$eval(attrs.ttTableEnter);
				});
				event.preventDefault();
			}
		});
	};
}

ttTableEnter.$inject = [];
module.directive('ttTableEnter', ttTableEnter);


// Source: src/scripts/ttui-table/unique-filter.js
var module = angular.module('TT-UI.Table.Filters', [
]);

module.filter('unique', function() {

	return function(items, filterOn) {

		if (filterOn === false) {
			return items;
		}

		if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
			var newItems = [];

			var extractValueToCompare = function(item) {
				if (angular.isObject(item) && angular.isString(filterOn)) {
					return item[filterOn];
				} else {
					return item;
				}
			};

			angular.forEach(items, function(item) {
				var isDuplicate = false;

				for (var i = 0; i < newItems.length; i++) {
					if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
						isDuplicate = true;
						break;
					}
				}

				if (!isDuplicate) {
					newItems.push(item);
				}
			});

			items = newItems;
		}

		return items;
	};
});

return angular;
})(window, window.angular);