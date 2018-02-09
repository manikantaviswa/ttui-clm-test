'use strict';

var module = angular.module('TT-UI.Common.Directives.Forms');

function sfArray($parse, schemaForm) {

	return {
		restrict: 'A',
		scope: true,
		priority: -1,
		require: '?ngModel',
		link: function(scope, element, attrs) {
			var cleanup = scope.$watch(attrs.sfArray, function(form) {
				if (!form) {
					return;
				}

				fillDefaultValuesInArrayModel(form);

				scope.canDeleteFromArray = function() {
					if (!form.schema.hasOwnProperty('minItems')) {
						return true;
					}
					return scope.modelArray.length > form.schema.minItems;
				};

				scope.canAppendToArray = function() {
					if (!form.schema.hasOwnProperty('maxItems')) {
						return true;
					}
					return scope.modelArray.length < form.schema.maxItems;
				};

				cleanup();
			});

			function fillDefaultValuesInArrayModel(form) {
				schemaForm.traverseForm(form, function(item) {
					var defaultValue;
					if (defaultValue = getItemDefaultValue(item)) {
						var array = getArrayModel(form);
						for (var arrayIndex = 0; arrayIndex < array.length; arrayIndex++) {
							var elementModel = $parse(getArrayElementPath(item, arrayIndex));
							if(angular.isUndefined(elementModel(scope.model))) {
								elementModel.assign(scope.model, defaultValue);
							}
						}
					}
				});
			}

			function getItemDefaultValue(item) {
				return $parse('default')(item) || $parse('schema.default')(item);
			}

			function getArrayModel(form) {
				var arrayPath = form.key.join('.');
				return $parse(arrayPath)(scope.model) || [];
			}

			function getArrayElementPath(item, arrayIndex) {
				return item.key.join('.').replace('..', '[' + arrayIndex + '].');
			}
		}
	};
}
sfArray.$inject = ['$parse', 'schemaForm'];

module.directive(sfArray.name, sfArray);
