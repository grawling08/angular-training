(function () {
    'use strict';

    angular.module('starter')
        .controller('userModalCtrl', userModalCtrl);

    userModalCtrl.$inject = ['$scope', '$uibModalInstance', 'usersFactory'];

    function userModalCtrl($scope, $uibModalInstance, usersFactory) {
        $scope.user = {};

        $scope.saveEntry = function () {
            usersFactory.saveUser($scope.user).then(function(data){
                if(data.success){
                    alert(data.msg);
                    $uibModalInstance.close('save');
                } else {
                    alert(data.result[0].msg);
                    return;
                }
            })
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();