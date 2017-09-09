(function () {
    'use strict';

    angular.module('starter')
        .controller('loginController', loginController);

    loginController.$inject = ['$scope', '$state', 'loginFactory', '$filter', '$uibModal','toastr', '$timeout'];

    function loginController($scope, $state, loginFactory, $filter, $uibModal, toastr, $timeout) {
        
        if(loginFactory.getCurrentUser()){
            $state.go('main.home');
        }
        
        $scope.user = {};
        $scope.login = function(){
            loginFactory.login($scope.user).then(function(data){
                if(data.statusCode == 200 && data.response.success){
                    var result = data.response.result;
                    console.log(result);
                    toastr.success(data.response.msg,'SUCCESS');

                    loginFactory.setUserToken(result.token);
                    loginFactory.setCurrentUser(result.user);

                    $timeout(function(){
                        $state.go('main.home');
                    }, 1000);
                } else if(data.statusCode == 401 && !data.response.success && _.isArray(data.response.result)){
                    console.log(data);
                    _.each(data.response.result, function(row){
                        toastr.warning(row.msg,'WARNING');
                    });
                    return;
                } else {
                    toastr.error(data.response.msg,'ERROR');
                    return;
                }
            });
        }
    }
})();