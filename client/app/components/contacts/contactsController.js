(function() {
    'use strict';

    var controllerId = 'contactsController';

    angular.module('app').controller(controllerId, ['$injector', contactsController]);

    function contactsController($injector) {
        var vm = this;
        vm.FABMenuIsOpen = false;
        vm.contactOperation = 'My Contacts';

        var contactsService = $injector.get('contactsService'),
            commonService = $injector.get('commonService'),
            $stateParams = $injector.get('$stateParams'),
            $state = $injector.get('$state');

        vm.init = function() {
            vm.contactsList = [];
            vm.getAllContacts();
        };

        vm.addContact = function() {
            vm.isEditing = true;
            vm.contactOperation = 'New contact';
        }

        vm.editContact = function(contact) {
            vm.isEditing = true;
            vm.contact = angular.copy(contact);
            vm.contactOperation = vm.contact.name;
        }

        vm.cancelForm = function() {
            vm.contact = {};
            vm.isEditing = false;
            vm.contactOperation = 'My Contacts';
        }

        vm.saveContact = function() {
            var isNewContact = !vm.contact.id;

            if (isNewContact) {
                vm.contact.id = commonService.getHash(vm.contact.email);
            }

            contactsService.save(vm.contact).then(function(data) {
                console.log(data);
                if (isNewContact) {
                    vm.contactsList.push(vm.contact);
                } else {
                    var index = vm.contactsList.findIndex(function(element, index, array) {
                        return element.id === vm.contact.id;
                    });

                    vm.contactsList[index] = vm.contact
                }
                vm.isEditing = false;
                vm.contact = {};
            });
        }

        vm.getAllContacts = function() {
            contactsService.getAll().then(function(data) {
                vm.contactsList = data;
            });
        }

        vm.deleteContact = function(id) {
            contactsService.remove(id);

            var index = vm.contactsList.findIndex(function(element, index, array) {
                return element.id === id;
            });

            vm.contactsList.splice(index, 1);
            console.log('Removido com sucesso!');
        }

        vm.init();
    }
})();
