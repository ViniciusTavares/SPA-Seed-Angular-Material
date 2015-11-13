(function () {
  'use strict';

  var app = angular.module('application');
  app.config(['$provide', function ($provide) {
    $provide.decorator('$exceptionHandler',
    ['$delegate', extendExceptionHandler]);
  }]);

  function extendExceptionHandler($delegate, commonService) {

    var appErrorPrefix = '[ VRT - Angular Seed ]';

    return function (exception, cause) {
      $delegate(exception, cause);
      console.log(appErrorPrefix + exception);
    };
  }
})();
