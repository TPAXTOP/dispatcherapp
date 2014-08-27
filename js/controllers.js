'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap'])
  .controller('InitCtrl', ['$scope', 'ParseSDK', function($scope, ParseSDK) {
    $scope.lgn = {};
    $scope.ctrl = undefined;
    $scope.ctrlLogin = function() {
      ParseSDK.getCtrl($scope.lgn).then(function(result) {
        if (result) {
          $scope.ctrl = result;
          ParseSDK.getWorkTypes(result.get("workTypes")).then(function(results) {
            $scope.workTypes = results;
            $scope.selectedWork = results[0];
            $scope.$apply();
          }, function(error) {
            alert('Error: ' + error.code + ' ' + error.message)
          });
        } else {
          alert('Incorrect login credentials')
        }
      }, function(error) {
        alert('Error: ' + error.code + ' ' + error.message)
      })
    };


//    ParseSDK.getWorkTypes().then(function(results) {
//      $scope.workTypes = results;
//      $scope.selectedWork = results[0];
//      $scope.$apply();
//    }, function(error) {
//      alert('Error: ' + error.code + ' ' + error.message)
//    });

    $scope.selectWork = function(work) {
      $scope.selectedWork = work;
    };
  }])
  .controller('InnerController', ['$scope', function($scope) {
    $scope.liveUpdate = false;
    this.selected = 2;

    this.isSelected = function(index) {
      return this.selected === index;
    };

    this.set = function(index) {
      this.selected = index;
    };

    this.toggleUpdate = function() {
      $scope.liveUpdate = !$scope.liveUpdate;
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

    $scope.$watch('selectedWork', function() {
      $scope.orderSelectedWork = $scope.selectedWork;
      $scope.updateOrdersTable();
    });

    var stopUpdate;
    $scope.$watch('liveUpdate', function() {
      if ($scope.liveUpdate) {
        stopUpdate = $interval(function() {
          $scope.updateOrdersTable()
        }, 10000);
      } else {
        if (angular.isDefined(stopUpdate)) {
          $interval.cancel(stopUpdate);
          stopUpdate = undefined;
        }
      }
    });

    ParseSDK.getUsers().then(function(results) {
      $scope.users = results;
      $scope.$apply();
    }, function(error) {
      alert('Error: ' + error.code + ' ' + error.message)
    });
  }])
  .controller('AddFormController', ['$scope', 'ParseSDK', function($scope, ParseSDK) {
    $scope.newOrder = {};
    $scope.newUser = {};

    $scope.orderSubmit = function() {
      $scope.newOrder.workType = $scope.orderSelectedWork;
      $scope.newOrder.controllerId = $scope.ctrl;
      ParseSDK.saveOrder($scope.newOrder).then(function() {
        $scope.newOrder = {};
        $scope.addOrderForm.$setPristine();
        $scope.$apply();
        alert('New order has been added successfully!')
      }, function(error) {
        alert('Error: ' + error.code + ' ' + error.message)
      });
    };

    $scope.userSubmit = function() {
      $scope.newUser.controllerId = $scope.ctrl;
      ParseSDK.saveUser($scope.newUser).then(function() {
        $scope.newUser = {};
        $scope.addWorkerForm.$setPristine();
        $scope.$apply();
        alert('New worker has been added successfully!')
      }, function(error) {
        alert('Error: ' + error.code + ' ' + error.message)
      })
    }
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
      $scope.newOrder.street = item;
    }
  }])
  .controller('DateTimeCtrl', ['$scope', function($scope) {
    $scope.today = function() {
      $scope.newOrder.date = new Date();
    };
    $scope.today();

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.ismeridian = false;

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };
  }])
;
