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
                // .state('main.vehicle', {
                //     url: '/vehicles/{_id}',
                //     template: '<p>{_id}</p>',
                //     resolve: {
                //         person: function($transition$) {
                //           return $transition$.params()._id;
                //         }
                //     }
                // });
        }
})();