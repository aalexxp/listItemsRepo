(function() {
    'use strict';

    angular.module('listItemsApplication')
        .directive('itemAdd', ItemAddDirective);

    ItemAddDirective.$inject = ['listItemsService', '$mdDialog'];

    /* @ngInject */
    function ItemAddDirective(listItemsService, $mdDialog) {
        var directive = {
            link: link,
            templateUrl: '/app/templates/add.item.html',
            restrict: 'E'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.showAddDialog = function (event) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/templates/add.item.modal.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    fullscreen: true
                })
            }
        }

        function DialogController($scope, $mdDialog) {
            $scope.item = {
                text: ''
            };

            $scope.cancel = function () {
                $mdDialog.hide();
            };
            $scope.add = function () {
                if (typeof $scope.item.text !== 'undefined' && $scope.item.text !== '') {
                    listItemsService.addItem($scope.item.text);
                    $mdDialog.hide();
                }
            };
        }
    }
})();