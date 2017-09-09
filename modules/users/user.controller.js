(function () {
    'use strict';

    angular.module('starter')
        .controller('userModalCtrl', userModalCtrl);

    userModalCtrl.$inject = ['$scope', '$uibModalInstance', 'usersFactory', 'user_id', 'toastr', '$timeout'];

    function userModalCtrl($scope, $uibModalInstance, usersFactory, user_id, toastr, $timeout) {
        $scope.user = {};

        if (!_.isEmpty(user_id)) {
            usersFactory.getUser(user_id).then(function (data) {
                if (data.statusCode == 200 && data.response.success) {
                    var user = data.response.result;
                    if (user) {
                        $scope.user = user;
                    }
                } else {
                    toastr.error(data.response.msg, 'ERROR');
                    return;
                }
            });
        }

        $scope.saveEntry = function () {
            if (_.isEmpty(user_id)) {
                usersFactory.saveUser($scope.user).then(function (data) {
                    if (data.statusCode == 200 && data.response.success) {
                        toastr.success(data.response.msg, 'SUCCESS');
                        $timeout(function(){
                            $uibModalInstance.close('save');
                        },1000);
                    } else if (!data.success && _.isArray(data.result)) {
                        _.each(data.result, function (row) {
                            toastr.warning(row.msg, 'WARNING');
                        });
                        return;
                    } else {
                        toastr.error(data.response.msg, 'ERROR');
                        return;
                    }
                })
            } else {
                usersFactory.updateUser(user_id, $scope.user).then(function (data) {
                    if (data.statusCode == 200 && data.response.success) {
                        toastr.success(data.response.msg, 'SUCCESS');
                        $timeout(function(){
                            $uibModalInstance.close('save');
                        },1000);
                    } else if (!data.success && _.isArray(data.result)) {
                        _.each(data.result, function (row) {
                            toastr.warning(row.msg, 'WARNING');
                        });
                        return;
                    } else {
                        toastr.error(data.response.msg, 'ERROR');
                        return;
                    }
                })
            }

        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }


    }
})();