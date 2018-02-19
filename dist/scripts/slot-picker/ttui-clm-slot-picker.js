/* commonjs package manager support (eg componentjs) */
if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports){
  module.exports = '@@@@__SOURCE_FILENAME__';
}

(function (window, angular, undefined) {
  "use strict";


// Source: src/scripts/slot-picker/index.js
angular.module('TT-UI-CLM.SlotPicker', [
    'TT-UI-CLM.SlotPicker.Directives.SlotPicker',
]);


// Source: src/scripts/slot-picker/controller/slot-picker.controller.js
var module = angular.module('TT-UI-CLM.SlotPicker.Controllers.SlotPickerCtrl', []);

function SlotPickerCtrl($scope, $compile, uiCalendarConfig) {
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  $scope.slots = [];
  $scope.selectedSlot = [];
  
  $scope.colors = ['#ccc', '#ffa500', '#65abff', '#008000',];
  $scope.colorMeaning = ['No Slots', 'Morning Slots Free', 'Afternoon Slots Free', 'Both the slots are free']
  function getSlots() {
    return Math.floor(Math.random() * ($scope.colors.length));
  }

  for(var i=0; i<90; i++) {
    var slots = getSlots();
    console.log(slots);
    var slotObjs = [];
    switch(slots) {
      case 1: 
        slotObjs = [{time: '10:00 AM to 12:30 AM', free: 2}]
        break;
      case 2: 
        slotObjs = [{time: '02:00 AM to 4:30 AM', free: 3}]
        break;
      case 3:
        slotObjs = [{time: '10:00 AM to 12:30 AM', free: 1}, {time: '02:00 AM to 4:30 AM', free: 5}]
    };
    $scope.slots.push({
      title: 'Slot',
      allDay: true,
      start: new Date(y, m, d+i),
      rendering: 'background',
      backgroundColor: $scope.colors[slots],
      freeSlots: slotObjs
    });
  }

  $scope.selectDate = function( date, jsEvent, view ) {
    var filtered = $scope.slots.filter(function(slot) {
      return moment(slot.start).format('DD-MMM-YYYY') === moment(date.toDate()).format('DD-MMM-YYYY')
    });
    $scope.selectedSlot = [{
      title: 'Selected',
      allDay: true,
      start: date.toDate(),
      rendering: 'background',
      backgroundColor: 'dodgerblue',
      freeSlots: filtered[0].freeSlots
    }];
    console.log(filtered);
  };

  /* config object */
  $scope.uiConfig = {
    calendar:{
      editable: false,
      header:{
        left: 'title',
        center: '',
        right: 'today prev,next'
      },
      dayClick: $scope.selectDate
    }
  };
  $scope.eventSources = [$scope.slots, $scope.selectedSlot];
}

SlotPickerCtrl.$inject = [
    '$scope',
    '$compile',
    'uiCalendarConfig'
];
module.controller(SlotPickerCtrl.name, SlotPickerCtrl);


// Source: src/scripts/slot-picker/directives/slot-picker.directive.js
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

return angular;
})(window, window.angular);
