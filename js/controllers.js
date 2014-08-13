'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap'])
  .controller('JobsCtrl', ['$scope', 'ParseSDK', function($scope, ParseSDK) {

    ParseSDK.getAll('WorkTypes').then(function(results) {
      $scope.workTypes = results;
      $scope.selectedWork = results[0];
      $scope.$apply();
    }, function(error) {
      alert('Error: ' + error.code + ' ' + error.message)
    });

    $scope.selectWork = function(work) {
      $scope.selectedWork = work;
    };
  }])
  .controller('InnerController', ['$scope', function($scope) {
    this.selected = 2;

    this.isSelected = function(index) {
      return this.selected === index;
    };

    this.set = function(index) {
      this.selected = index;
    };
  }])
  .controller('TableController', ['$scope', '$interval', 'ParseSDK', function($scope, $interval, ParseSDK) {
    $scope.updateOrdersTable = function() {
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

    $scope.$watch('selectedWork', $scope.updateOrdersTable);
//    $interval(function() {
//      $scope.updateOrdersTable()
//    }, 10000);

    ParseSDK.getAll('User').then(function(results) {
      $scope.users = results;
      $scope.$apply();
    }, function(error) {
      alert('Error: ' + error.code + ' ' + error.message)
    });
  }])
  .controller('TypeaheadCtrl', ['$scope', 'ParseSDK', function($scope, ParseSDK) {
    $scope.getStreets = function(str) {
       return ParseSDK.findStreets(str).then(function(results) {
         var streets = [];
         angular.forEach(results, function(item) {
           item['printable'] = item.get('type') + ' ' + item.get('name') + ', ' + item.get('district') + ' р-н';
           streets.push(item)
         });
         return streets
       });
    };

    $scope.selectStreet = function(item) {
      $scope.selectedStreet = item;
      console.log(item)
    }
  }])
;
