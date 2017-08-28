(function () {
    'use strict';

    angular.module('starter')
        .controller('usersController', usersController);

    usersController.$inject = ['$scope', 'usersFactory', '$filter', '$uibModal'];

    function usersController($scope, usersFactory, $filter, $uibModal) {
        $scope.users = [];
        $scope.usersCopy = [];
        $scope.txtSearch = '';

        usersFactory.getAllUser().then(function (data) {
            if (data.success) {
                var users = data.result;
                console.log('users: ' + users);
                if (!_.isEmpty(users)) {
                    $scope.users = users;
                    $scope.usersCopy = angular.copy(users);
                }
            }
        });

        $scope.search = function () {
            if ($scope.txtSearch) {
                var result = $filter('filter')($scope.users, $scope.txtSearch);
                if (result) {
                    $scope.users = result;
                }
            } else {
                $scope.users = $scope.usersCopy;
            }
        }

        $scope.refresh = function () {
            usersFactory.getAllUser().then(function (data) {
                if (data.success) {
                    var users = data.result;
                    console.log('users: ' + users);
                    if (!_.isEmpty(users)) {
                        $scope.users = users;
                        $scope.usersCopy = angular.copy(users);
                    }
                }
            });
        }

        $scope.newEntry = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './modules/users/user.modal.html',
                size: 'md',
                controller: 'userModalCtrl'
            });

            modalInstance.result.then(function (selectedItem) { 
                if(selectedItem == 'save'){
                    $scope.refresh();
                }
            }, function () { });
        }
    }
})();