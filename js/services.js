'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  service('ParseSDK', function(){
    Parse.initialize("kgT2uaLixIaW8KYYi6DpyeHalnKdOLiXoiXMzWuS", "4BJpHXosI4jy5492bf4xPe9QHRgZgEIf0Qs9Y1n9");

    this.getAll = function(type) {
      var obj = Parse.Object.extend(type);
      var query = new Parse.Query(obj);
      return query.find();
    };

    this.getOrders = function(workType) {
      var Orders = Parse.Object.extend('Orders');
      var query = new Parse.Query(Orders);
      query.equalTo('workType', workType);
      query.include('street');
      return query.find();
    };

    this.findStreets = function(str) {
      var Streets = Parse.Object.extend('Streets');
      var query = new Parse.Query(Streets);
      query.matches('name', str, 'i');
      return query.find();
    }
  });
