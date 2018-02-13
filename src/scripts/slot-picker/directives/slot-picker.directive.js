'use strict';

var module = angular.module('TT-UI-CLM.SlotPicker.Directives.SlotPicker', [
    'TT-UI-CLM.SlotPicker.Controllers.SlotPickerCtrl',
    'TT-UI-CLM.SlotPicker.Tpl',
    'ui.calendar',
//    'ui.bootstrap'
]);

module.directive('slotPicker', function() {
    return {
        restrict: 'EA',
        scope: {
            model: '=',
            // config: '=',
            masterData: '=',
            onSearch: '&'
        },
        controller: 'SlotPickerCtrl',
        templateUrl: 'scripts/slot-picker/views/slot-picker.tpl.html'
    };
});
