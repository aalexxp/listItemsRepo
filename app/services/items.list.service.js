(function() {
    'use strict';

    angular.module('listItemsApplication')
        .service('listItemsService', ListItemsService);

    ListItemsService.$inject = ['localStorageService'];

    /* @ngInject */
    function ListItemsService(localStorageService) {
        var vm = this;
        var setItems = function() {
            localStorageService.set('items', vm.items);
        };

        this.items = [];

        this.getItems = function() {
            var localItems = localStorageService.get('items');
            if (localItems === null) {
                localItems = [];
            }
            vm.items = localItems;

            return vm.items;
        };

        this.addItem = function(text) {
            vm.items.push({text: text, selected: false});
            setItems();
        };

        this.deleteItem = function(item) {
            vm.items.splice(vm.items.indexOf(item), 1);
            setItems();
        };

        this.deleteSelected = function() {
            var i = 0;
            while (i < vm.items.length) {
                if (vm.items[i].selected) {
                    vm.items.splice(i, 1);
                } else {
                    i++;
                }
            }
            setItems();
        };

        this.setSortedItems = function(newItemsList) {
            vm.items = newItemsList;
            setItems();
        };

        this.updateItemsAfterEdit = function() {
            setItems();
        };
    }
})();