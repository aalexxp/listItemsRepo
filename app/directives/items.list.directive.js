(function() {
    'use strict';

    angular.module('listItemsApplication')
        .directive('listItems', ListItemsDirective);

    ListItemsDirective.$inject = ['listItemsService', '$mdDialog'];

    /* @ngInject */
    function ListItemsDirective(listItemsService, $mdDialog) {
        var editItem = {};
        var directive = {
            link: link,
            templateUrl: '/app/templates/list.items.html',
            restrict: 'E',
            scope: {
                itemsList: '=items'
            }
        };
        return directive;

        function link(scope, element, attrs) {
            scope.sortableOptions = {
                update: function(e, ui) {
                    setTimeout(function() {
                        listItemsService.setSortedItems(scope.itemsList);
                    }, 10);
                }
            };

            scope.removeItemFromList = function(item) {
                listItemsService.deleteItem(item);
            };

            scope.removeSelected = function() {
                listItemsService.deleteSelected();
            };

            scope.editItem = function(event, item) {
                editItem = item;
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/templates/edit.item.modal.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    fullscreen: true
                }).then(function() {
                    listItemsService.updateItemsAfterEdit();
                });
            };
        }

        function DialogController($scope, $mdDialog) {
            $scope.item = {
                text: editItem.text
            };

            $scope.cancel = function() {
                $mdDialog.hide();
            };

            $scope.edit = function() {
                if (typeof $scope.item.text !== 'undefined' && $scope.item.text !== '') {
                    editItem.text = $scope.item.text;
                    $mdDialog.hide();
                }
            };
        }
    }
})();