(function(){
    'use strict';

    angular.module('starter')
        .config(travelsConfig);

        travelsConfig.$inject = ['$stateProvider'];

        function travelsConfig($stateProvider){
            $stateProvider
                .state('main.travels', {
                    url: '/travels',
                    templateUrl: './modules/travels/travels.html',
                    controller: 'travelsController'
                });
                // .state('main.vehicle', {
                //     url: '/vehicles?{_id}',
                //     templateUrl: './modules/vehicles/vehicle.details.html',
                //     controller: 'vehicleModalCtrl',
                //     resolve: {
                //         v_id: function($transition$) {
                //           return $transition$.params()._id;
                //         }
                //     }
                // });
        }
})();

