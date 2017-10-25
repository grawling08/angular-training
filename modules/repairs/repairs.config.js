(function(){
    'use strict';

    angular.module('starter')
        .config(repairsConfig);

        repairsConfig.$inject = ['$stateProvider'];

        function repairsConfig($stateProvider){
            $stateProvider
                .state('main.repairs', {
                    url: '/repairs',
                    templateUrl: './modules/repairs/repairs.html',
                    controller: 'repairsController'
                });
        }
})();

