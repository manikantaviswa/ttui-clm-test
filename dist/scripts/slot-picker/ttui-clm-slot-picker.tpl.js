/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";

angular.module('undefined',[]).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/slot-picker/views/slot-picker.tpl.html',
    "<div class=\"row\"><div class=\"col-md-6\"><div class=\"calendar-wrer my--cal\"><div ui-calendar=\"uiConfig.calendar\" ng-model=\"eventSources\"></div><div class=\"colors row\"><div ng-repeat=\"color in colors\" class=\"color-swatch col-md-6\"><span ng-style=\"{'background-color': color}\">&emsp;</span> <span>{{colorMeaning[$index]}}</span></div></div></div></div><pre class=\"col-md-6\">{{selectedSlot | json: 2}}</pre></div>"
  );
}]);
return angular;
})(window, window.angular);
