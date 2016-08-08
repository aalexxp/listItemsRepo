(function() {
    'use strict';

    angular.module('listItemsApplication')
        .controller('listItemsController', ListItemsController);

    ListItemsController.$inject = ['listItemsService'];

    /* @ngInject */
    function ListItemsController(listItemsService) {
        this.init = init;

        function init() {
            this.items = listItemsService.getItems();
        }
    }
})();