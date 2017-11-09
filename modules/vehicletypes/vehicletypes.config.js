(function(){
    'use strict';

    angular.module('starter')
        .config(vehicleTypesConfig);

        vehicleTypesConfig.$inject = ['$stateProvider'];

        function vehicleTypesConfig($stateProvider){
            $stateProvider
                .state('main.vehicletypes', {
                    url: '/vehicletypes',
                    templateUrl: './modules/vehicletypes/vehicletypes.html',
                    controller: 'vehicleTypesController'
                });
        }
})();