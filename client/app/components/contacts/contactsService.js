(function() {

    'use strict'

    var serviceId = 'contactsService';

    angular.module('app').factory(serviceId, ['$injector', contactsService]);

    function contactsService($injector) {

        var $indexedDB = $injector.get('$indexedDB'),
            $q = $injector.get('$q');

        var service = {
            save: save,
            getAll: getAll,
            find: find,
            remove: remove
        };

        var contactsTable = 'contacts';

        function save(model) {
            var defer = $q.defer();

            return $indexedDB.openStore(contactsTable, function(contacts) {
                if (model.id) {
                    contacts.upsert(model).then(function(data) {
                        defer.resolve(data);
                    });
                  }
            });
            return defer.promise
        };

        function remove(id) {
            var defer = $q.defer();


            $indexedDB.openStore(contactsTable, function(contacts) {
                contacts.delete(id).then(function(data) {
                    defer.resolve(data);
                });
            });
            return defer.promise
        }

        function find(id) {

            var defer = $q.defer();

            $indexedDB.openStore(contactsTable, function(contacts) {
                contacts.find(id).then(function(data) {
                    defer.resolve(data);
                });
            });

            return defer.promise
        }

        function getAll() {
            var defer = $q.defer();

            $indexedDB.openStore(contactsTable, function(contacts) {
                contacts.getAll().then(function(data) {
                    defer.resolve(data);
                });
            });

            return defer.promise
        }

        return service;
    }

})();
