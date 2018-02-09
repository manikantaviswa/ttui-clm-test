'use strict';

angular.module('TT-UI.Common.Directives.IsDateAfterValidator', [
	'TT-UI.Config',
	'TT-UI.Common.AngularStrap',
	'TT-UI.Common.AngularStrap',
	'TT-UI.Common.Services.FormValidator'
])

.directive('isDateAfterValidator', ['$dateParser', '$log', 'CONFIG', function($dateParser, $log, CONFIG) {

	var dateParser = $dateParser({format: CONFIG.MODEL_DATE_FORMAT});

	return {
		restrict: 'A',
		require: ['?ngModel', '^form'],
		link: function(scope, element, attr, controllers) {
			if (!attr.isDateAfterValidator){
				return;
			}

			var ngModel  = controllers[0];
			var form = controllers[1];

			var fieldId = attr.isDateAfterValidator;

			var relativeNgModel = form[fieldId];

			scope.$watch(function(){
				return relativeNgModel.$modelValue;
			}, ngModel.$validate);

			ngModel.$validators.shouldBeAfter = function(modelValue){
				if (!modelValue){
					return true;
				}

				var relativeDate = dateParser.parse(relativeNgModel.$modelValue);
				var myDate = dateParser.parse(modelValue);

				if (!relativeDate || !myDate){
					$log.error('Date format exception (is-date-after-validator): one of dates is not in correct format. ' + relativeDate + ' ' + myDate);
					return false;
				}

				var relativeTime = relativeDate.getTime();
				var myTime = myDate.getTime();

				return myTime >= relativeTime;
			};
		}
	};
}]);
