'use strict';

angular.module('TT-UI.Common.ErrorMessageString', [])
.factory('createErrorMessageString', ['ErrorsDictionary', '$parse', function(ErrorsDictionary, $parse) {

  return function(errorElement) {
    if (angular.isArray($parse('data[0].response.errors.error')(errorElement))) {
      var errorElementsArray = $parse('data[0].response.errors.error')(errorElement);
      var lastArrayElement = errorElementsArray[errorElementsArray.length - 1];
      return ErrorsDictionary.getError(lastArrayElement.desc) || lastArrayElement.desc;
    } else if (typeof(errorElement) === 'object') {
      return ErrorsDictionary.getError(errorElement.statusText) ||
        ErrorsDictionary.getError(errorElement.status) ||
        errorElement.statusText ||
        errorElement.status ||
        'Unknown error';
    } else {
      return ErrorsDictionary.getError(errorElement) || errorElement || 'Unknown error';
    }
  };
}]);