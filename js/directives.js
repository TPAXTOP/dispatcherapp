'use strict';

/* Directives */


var NUMBER_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
var PHONE_REGEXP = /^(8-?|\+?7-?)?(\(?\d{3}\)?)-?(\d-?){6}\d$/;

angular.module('myApp.directives', []).
  directive('jobTabs', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/tab-bar.html'
    };
  }).
  directive('tabContents', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/tab-contents.html'
    };
  }).
  directive('commonControls', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/common-controls.html'
    }
  }).
  directive('addForm', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/add-form.html',
      controller: 'AddFormController'
    }
  }).
  directive('mainTable', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/main-table.html',
      controller: 'TableController'
    }
  })
;

