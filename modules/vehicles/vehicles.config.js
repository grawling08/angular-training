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
                })
                .state('main.vehicle', {
                    url: '/vehicles?{_id}',
                    templateUrl: './modules/vehicles/vehicle.details.html',
                    controller: 'vehicleModalCtrl',
                    resolve: {
                        v_id: function($transition$) {
                          return $transition$.params()._id;
                        }
                    }
                });
        }
})();

