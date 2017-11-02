(function(){
    'use strict';

    angular.module('starter')
        .config(locationsConfig);

        locationsConfig.$inject = ['$stateProvider'];

        function locationsConfig($stateProvider){
            $stateProvider
                .state('main.locations', {
                    url: '/locations',
                    templateUrl: './modules/locations/locations.html',
                    controller: 'locationsController'
                });
        }
})();