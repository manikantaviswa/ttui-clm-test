/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";

angular.module('TT-UI-CLM.SlotPicker.Tpl',[]).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/slot-picker/views/slot-picker.tpl.html',
    "<div class=\"calendar-wrapper my-app-cal\"><div ui-calendar ng-model=\"eventSources\"></div></div>"
  );
}]);
return angular;
})(window, window.angular);
