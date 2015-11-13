(function() {
    'use strict';

  var app = angular.module('directives');

  app.directive('sidebarMenu', ['$mdSidenav', '$mdUtil', '$log', '$state', sidebarMenu]);

  function sidebarMenu($mdSidenav, $mdUtil, $log, $state) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        menuItems: '='
      },

      templateUrl: 'app/shared/menu/sidebarmenu.html',
      link: function (scope, el, attrs) {
        scope.openMenu = function(navElementId) {
          $mdSidenav(navElementId).toggle();
        }

        scope.closeMenu = function(navElementId) {
          $mdSidenav(navElementId).toggle();
        }

        scope.navigateTo = function(to, navElementId) {
          $state.go(to);
          $mdSidenav(navElementId).close();
        };
      }
    };
  }
})();
