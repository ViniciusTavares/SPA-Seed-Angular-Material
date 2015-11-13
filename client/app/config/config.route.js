(function() {
    'use strict';

    var app = angular.module('app');

    app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'app/components/home/home.html',
                controller: 'homeController',
                controllerAs: 'vm',

            })
            .state('contacts', {
                    url: '/contacts',
                views: {
                  '': {
                          templateUrl: 'app/components/contacts/contacts.html',
                            controller: 'contactsController',
                            controllerAs: 'vm',
                  },
                  'details@contacts': {
                      templateUrl: 'app/components/contacts/contacts.details.html'
                  },
                  'list@contacts': {
                    templateUrl: 'app/components/contacts/contacts.list.html'
                  }
                }

            })

        });
})();
