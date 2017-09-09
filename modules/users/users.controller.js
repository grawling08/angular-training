(function () {
    'use strict';

    angular.module('starter')
        .controller('usersController', usersController);

    usersController.$inject = ['$scope', 'usersFactory', '$filter', '$uibModal','ngDialog','toastr'];

    function usersController($scope, usersFactory, $filter, $uibModal, ngDialog, toastr) {
        $scope.users = [];
        $scope.usersCopy = [];
        $scope.txtSearch = '';

        usersFactory.getAllUser().then(function (data) {
            console.log("data:" + data);
            if (data.statusCode == 200 && data.response.success) {
                var users = data.response.result;
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
                console.log("data:" + data);
                if (data.statusCode == 200 && data.response.success) {
                    var users = data.response.result;
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
                controller: 'userModalCtrl',
                resolve: {
                    user_id: function(){
                        return null;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) { 
                if(selectedItem == 'save'){
                    $scope.refresh();
                }
            }, function () { });
        }

        $scope.updateEntry = function (_id) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './modules/users/user.modal.html',
                size: 'md',
                controller: 'userModalCtrl',
                resolve: {
                    user_id: function(){
                        return _id;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) { 
                if(selectedItem == 'save'){
                    $scope.refresh();
                }
            }, function () { });
        }

        $scope.deleteData = function(row){
            $scope.modal = {
                title:'users',
                message:'Delete this Data?'
            };
            ngDialog.openConfirm({
                templateUrl: './modules/dialogs/custom.dialog.html',
                scope: $scope,
                className: 'ngdialog-theme-default'
            }).then(function(){
                usersFactory.deleteUser(row._id).then(function(data){
                    if(data.statusCode == 200 && data.response.success){
                        toastr.success(data.response.msg, 'SUCCESS');
                        $scope.refresh();
                    } else {
                        toastr.error(data.response.msg, 'ERROR');
                        return;
                    }
                })
            });
        }
    }
})();