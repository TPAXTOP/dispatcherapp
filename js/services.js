'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  service('ParseSDK', function(){
    Parse.initialize("kgT2uaLixIaW8KYYi6DpyeHalnKdOLiXoiXMzWuS", "4BJpHXosI4jy5492bf4xPe9QHRgZgEIf0Qs9Y1n9");
    var WorkTypes = Parse.Object.extend('WorkTypes');
    var User = Parse.Object.extend('User');
    var Orders = Parse.Object.extend('Orders');
    var Streets = Parse.Object.extend('Streets');
    var Controller = Parse.Object.extend('Controller');

    this.getCtrl = function(lgn) {
      var query = new Parse.Query(Controller);
      query.equalTo('account', lgn.username);
      query.equalTo('password', lgn.password);
      return query.first();
    };

    this.getWorkTypes = function(ids) {
      var query = new Parse.Query(WorkTypes);
      query.containedIn('objectId', ids);
      return query.find();
    };

    this.getUsers = function() {
      var query = new Parse.Query(User);
      return query.find();
    };

    this.getOrders = function(workType) {
      var query = new Parse.Query(Orders);
      query.equalTo('workType', workType);
      query.include('street');
      return query.find();
    };

    this.findStreets = function(str) {
      var query = new Parse.Query(Streets);
      query.matches('name', str, 'i');
      return query.find();
    };

    this.saveOrder = function(data) {
      var order = new Orders();
      order.set('street', data.street);
      order.set('house', data.house);
      order.set('appartament', data.apartments);
      order.set('date', data.date);
      order.set('phone', data.phone);
      order.set('price', parseFloat(data.price));
      order.set('workType', data.workType);
      order.set('workSubtype', data.workSubtype);
      order.set('date', data.date);
      order.set('isCritical', data.critical);
      order.set('note', data.note);
      order.set('isComplete', false);
      order.set('controllerId', data.controllerId);
      return order.save()
    };

    this.saveUser = function(data) {
      var user = new User;
      user.set('username', data.username);
      user.set('fullName', data.fullname);
      user.set('email', data.email);
      user.set('password', data.password);
      user.set('IPN', data.ipn);
      user.set('passport_number', data.passportNumber);
      user.set('passport_issuing_authority', data.issuedBy);
      user.set('passport_receive_date', data.passportDate);
      user.set('phone', data.m_phone);
      user.set('phone_home', data.h_phone);
      user.set('controller_id', data.controllerId);
      return user.save()
    }
  });
