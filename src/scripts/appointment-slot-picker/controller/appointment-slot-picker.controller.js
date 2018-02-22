'use strict';

var module = angular.module('TT-UI-CLM.AppointmentSlotPicker.Controllers.AppointmentSlotPickerCtrl', [
  'TT-UI-CLM.AppointmentSlotPicker.Services.FetchAppointmentAPIService'
]);

function AppointmentSlotPickerCtrl($scope, $compile, FetchAppointmentAPIService) {
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

    FetchAppointmentAPIService({
      installationType: "building",
      startDate: "2018-11-11T00:00:00.000Z",
      endDate: "2018-11-13T00:00:00.000Z"
    }).then(function(res) {
      debugger;
      this;
    })
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

AppointmentSlotPickerCtrl.$inject = [
    '$scope',
    '$compile',
    'FetchAppointmentAPIService'
];
module.controller(AppointmentSlotPickerCtrl.name, AppointmentSlotPickerCtrl);
