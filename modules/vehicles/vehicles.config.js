(function(){
    'use strict';

    angular.module('starter')
        .config(vehiclesConfig);

        vehiclesConfig.$inject = ['$stateProvider'];

        function vehiclesConfig($stateProvider){
            $stateProvider
                .state('main.vehicles', {
                    url: '/vehicles',
                    templateUrl: './modules/vehicles/vehicles.html',
                    controller: 'vehiclesController'
                });
        }
})();