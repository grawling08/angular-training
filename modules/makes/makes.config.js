(function(){
    'use strict';

    angular.module('starter')
        .config(makesConfig);

        makesConfig.$inject = ['$stateProvider'];

        function makesConfig($stateProvider){
            $stateProvider
                .state('main.makes', {
                    url: '/makes',
                    templateUrl: './modules/makes/makes.html',
                    controller: 'makesController'
                });
        }
})();