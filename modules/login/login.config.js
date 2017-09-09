(function(){
    'use strict';

    angular.module('starter')
        .config(loginConfig);

        loginConfig.$inject = ['$stateProvider'];

        function loginConfig($stateProvider){
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: './modules/login/login.html',
                    controller: 'loginController'
                });
        }
})();