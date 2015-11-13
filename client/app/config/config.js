(function() {
  'use strict'

  var app = angular.module('app');

  app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
            .primaryPalette('pink')
            .accentPalette('blue-grey');

    $mdThemingProvider.theme('docs-dark')
      .primaryPalette('blue')
      .dark();
  })

  .config(function ($indexedDBProvider, $injector) {
    $indexedDBProvider
    .connection('contactsDataBase')
    .upgradeDatabase(1, function(event, db, tx){

      var objStore = db.createObjectStore('contacts', {keyPath: 'id'});
      objStore.createIndex('name_idx', 'name', {unique: false});

      objStore.put({name:'Vinicius Tavares', phone: '98881-88890',
      address: 'Rua dos Fundos lá na esquina.', id: '5694b9a0-7c39-11e5-8bcf-feff819cdc9f',
      email: 'vinicius.rafael19@hotmail.com'});

      objStore.put({name:'João de Souza', phone: '98441-55589',
      address: 'Rua do Joãozinho.', id: '79e98112-a70d-4dd6-85a7-0adbea63ccf2',
      email: 'joaosouza@souza.com'});

      objStore.put({name:'Maria de Lurdez', phone: '96521-88890',
      address: 'Rua Maria de Lurdez. 365..', id: 'ffe17553-ffb4-421e-8122-3b0b50539402',
      email: 'mariadelurdez@lurdez.com'});

      objStore.put({name:'Pedro Mattos', phone: '98471-88890',
      address: 'Rua Mattos de Pedro. 365..', id: '3ff7e313-6638-4e17-bfa2-128522a70501',
      email: 'mattos@pedro.com'});

    });
  });

})();
