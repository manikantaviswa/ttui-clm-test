/*! TT-UI Lib 0.6.24.19 */

/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
	module.exports = 'ttui-auth.tpl';
}

(function (window, angular, undefined) {
	"use strict";

   angular.module('TT-UI.Auth.Tpl', []).run(['$templateCache', function($templateCache) {
$templateCache.put('scripts/auth/views/login-oauth.tpl.html',
    "<button class=\"btn btn-lg btn-primary\" ng-show=\"show=='logged-out'\" ng-click=\"login()\" ng-init=\"login()\">{{text | translate}}</button>"
  );


  $templateCache.put('scripts/auth/views/login.tpl.html',
    "<div ng-hide=\"true\" class=\"container container-space\"><div class=\"row\"><div class=\"col-sm-8 col-md-6 col-md-offset-3 col-sm-offset-2\"><div class=\"panel panel-default\"><div class=\"panel-heading\"><h3 class=\"panel-title\" translate=\"Login\">Login</h3></div><div class=\"panel-body\"><oauth site=\"{{::login.getSsoUri()}}\" authorize-path=\"{{::login.getSsoUriPath()}}\" client-id=\"{{::login.getSsoClientId()}}\" redirect-uri=\"{{::login.getSsoRedirectUri()}}\" response-type=\"{{::login.getSsoResponseType()}}\" scope=\"{{::login.getSsoScope()}}\" state=\"{{::login.getSsoState()}}\" profile-uri=\"{{::login.getSsoProfileUri()}}\" template=\"{{::login.getSsoTemplate()}}\" storage=\"{{::login.getStorage()}}\"></oauth></div></div></div></div></div>"
  );

}]);
return angular;
})(window, window.angular);