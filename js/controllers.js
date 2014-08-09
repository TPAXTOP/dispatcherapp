'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('JobsCtrl', ['$scope', 'ParseSDK', function($scope, ParseSDK) {

    ParseSDK.getAll('WorkTypes').then(function(results) {
      $scope.workTypes = results;
      $scope.selectedWork = results[0];
      $scope.$apply();
    }, function(error) {
      alert('Error: ' + error.code + ' ' + error.message)
    });

    $scope.select = function(work) {
      $scope.selectedWork = work;
    };
  }])
  .controller('InnerController', ['$scope', function($scope) {
    this.selected = {'form': 0, 'table': 1};

    this.isSelected = function(component, index) {
      return this.selected[component] === index;
    };

    this.set = function(component, index) {
      this.selected[component] = index;
    };
  }])
  .controller('TableController', ['$scope', '$interval', 'ParseSDK', function($scope, $interval, ParseSDK) {
    var updateOrdersTable = function() {
      var work = $scope.selectedWork;
      if (work) {
        ParseSDK.getOrders(work).then(function (results) {
          $scope.orders = results;
          $scope.$apply();
        }, function(error) {
          alert('Error: ' + error.code + ' ' + error.message)
        })
      }
    };

    $scope.$watch('selectedWork', updateOrdersTable);
//    $interval(function() {
//      updateOrdersTable()
//    }, 10000);

    ParseSDK.getAll('User').then(function(results) {
      $scope.users = results;
      $scope.$apply();
    }, function(error) {
      alert('Error: ' + error.code + ' ' + error.message)
    });
  }])
;
