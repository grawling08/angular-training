(function(){
    'use strict';

    angular.module('starter')
        .config(usersConfig);

        usersConfig.$inject = ['$stateProvider'];

        function usersConfig($stateProvider){
            $stateProvider
                .state('main.users', {
                    url: '/users',
                    templateUrl: './modules/users/users.html',
                    controller: 'usersController'
                });
        }
})();