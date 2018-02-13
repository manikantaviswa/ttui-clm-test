/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";


// Source: src/scripts/fxl-select-offering/index.js
angular.module('TT-UI-CLM.FxlSelectOffering', [
    'TT-UI-CLM.FxlSelectOffering.Directives.SelectOffering',
    'ngSanitize',
    'schemaForm'
]);

// Source: src/scripts/fxl-select-offering/controller/fxl-select-offering-ctrl.js
var module = angular.module('TT-UI-CLM.FxlSelectOffering.Controllers.FxlSelectOfferingCtrl', ['TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingService', 'TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingAPIService']);

FxlSelectOfferingCtrl.$inject = ['$scope', 'FxlSelectOfferingService'];

function FxlSelectOfferingCtrl($scope, FxlSelectOfferingService) {
    $scope.directivelist = FxlSelectOfferingService.getAllList($scope.masterData);

}

module.controller(FxlSelectOfferingCtrl.name, FxlSelectOfferingCtrl);


// Source: src/scripts/fxl-select-offering/directive/fxl-select-offering-directive.js
var module = angular.module('TT-UI-CLM.FxlSelectOffering.Directives.SelectOffering', ['TT-UI-CLM.FxlSelectOffering.Controllers.FxlSelectOfferingCtrl', 'TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingService', 'TT-UI-CLM.FxlSelectOffering.Tpl']);
module.directive('selectOffering', selectOfferingDetail)
function selectOfferingDetail() {
    debugger;
    var directive = {
        restrict: 'EA',
        replace: true,
        scope: {
            masterData: '='
        },
        controller: 'FxlSelectOfferingCtrl',
        templateUrl: 'scripts/fxl-select-offering/views/fxl-select-offering.tpl.html'
    };
    return directive;
}


// Source: src/scripts/fxl-select-offering/services/fxl-select-offering-services.js
var module = angular.module('TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingService', []);
       
    module.service('FxlSelectOfferingService', FxlSelectOfferingService);

    function FxlSelectOfferingService() {
        this.message = '';
        this.getAllList = function (todoMain) {
        this.message = todoMain;
        return this.message;
    };
    }


// Source: src/scripts/fxl-select-offering/services/fxl-select-offering.api.service.js
var module = angular.module('TT-UI-CLM.FxlSelectOffering.Services.FxlSelectOfferingAPIService', [
]);

module.constant('API_CONFIG', {
    API_URL: 'clm-reg/rest/dataservice/1/CLM/1/FeasibilityCheck/json/query',
    API_METHOD: 'PUT',
    RESPONSE_ERROR_JSON_PATH: 'response.errors.error'
});

/*function SearchFeasibilityAPIService($q, $parse, Api, ResourceFactory, API_CONFIG) {

    var prepareRequest = function(msisdn) {
        var requestData = {
            'service':{
                'key': 'MSISDN',
                'value': msisdn
            }
        };
        return requestData;
    };

    var sendRequest = function(msisdn){
        var apiService = ResourceFactory(Api.getUrl(), API_CONFIG.API_URL, API_CONFIG.API_METHOD);
        return apiService.fetch(prepareRequest(msisdn)).$promise;
    };

    var getErrors = function(response) {

        var errors = $parse(API_CONFIG.RESPONSE_ERROR_JSON_PATH)(response);
        if (angular.isArray(errors) && errors.length){
            return $q.reject(errors.map(function(error) {
                return error.desc;
            }));
        }
        return response;
    };

    var getData = function(result) {
        return result;
    };

    return function(msisdn) {
        return sendRequest(msisdn)
            .then(getErrors)
            .then(getData);
    };

}

SearchFeasibilityAPIService.$inject = ['$q', '$parse', 'Api', 'ResourceFactory', 'API_CONFIG'];
module.factory(SearchFeasibilityAPIService.name, SearchFeasibilityAPIService);
*/
return angular;
})(window, window.angular);
