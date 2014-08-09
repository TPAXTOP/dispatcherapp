'use strict';

/* Directives */


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
      templateUrl: 'partials/add-form.html'
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

