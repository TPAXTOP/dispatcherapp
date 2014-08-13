'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('formatStreet', function() {
    return function(street, opt) {
      return street.type + ' ' + street['name'] + ', ' + street['district']
    };
  });
