(function () {
    'use strict';

var controllerId = 'homeController';

  angular.module('app').controller(controllerId, [homeController]);

  function homeController() {
      var vm = this;
    };

  })();
