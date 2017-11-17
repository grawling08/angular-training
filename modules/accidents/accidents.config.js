(function(){
    'use strict';

    angular.module('starter')
        .config(accidentsConfig);

        accidentsConfig.$inject = ['$stateProvider'];

        function accidentsConfig($stateProvider){
            $stateProvider
                .state('main.accidents', {
                    url: '/accidents',
                    templateUrl: './modules/accidents/accidents.html',
                    controller: 'accidentsController'
                });
        }
})();