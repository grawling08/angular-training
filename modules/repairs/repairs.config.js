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
                })
                .state('main.repair', {
                    url: '/repairs?{_id}',
                    templateUrl: './modules/repairs/repair.details.html',
                    controller: 'repairModalCtrl',
                    resolve: {
                        r_id: function($transition$) {
                          return $transition$.params()._id;
                        }
                    }
                });
        }
})();

