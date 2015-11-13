  (function () {
    'use strict';

    var controllerId = 'shellController';

    angular.module('app').controller(controllerId, [shellController]);

    function shellController() {
      var vm = this;

      vm.menuItems = [
          { name: 'Welcome', icon:'fa fa-3x fa-home', route:'home', order: '1'},
        { name: 'My Contacts', icon:'fa fa-3x fa-user', route:'contacts', order: '2'},
      ];

      vm.goToLinkedin = function() {

      }
  };
  })();
