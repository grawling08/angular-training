(function(){
    'use strict';

    angular.module('starter')
        .config(modelsConfig);

        modelsConfig.$inject = ['$stateProvider'];

        function modelsConfig($stateProvider){
            $stateProvider
                .state('main.models', {
                    url: '/models',
                    templateUrl: './modules/models/models.html',
                    controller: 'modelsController'
                });
        }
})();

