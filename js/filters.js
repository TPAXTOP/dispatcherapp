'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('orderFilter', function() {
    return function(order, job) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  });
