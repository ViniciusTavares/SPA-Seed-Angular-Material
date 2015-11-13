(function() {
  'use strict'

  var common  = angular.module('common');

  common.factory('commonService', ['$injector', commonService]);

  function commonService() {
    var service = {
      getHash : getHash
    }

    function getHash() {
      function s4() {
       return Math.floor((1 + Math.random()) * 0x10000)
         .toString(16)
         .substring(1);
     }
     return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
       s4() + '-' + s4() + s4() + s4();
  
    } // Source: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

    return service;
  }
})();
