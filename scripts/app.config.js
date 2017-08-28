(function(){
    'use strict';

    angular.module('starter')
        .config(configuration);
    
    configuration.$inject = ['$stateProvider','$urlRouterProvider','RestangularProvider','API_URL','API_VERSION'];
    
    function configuration($stateProvider, $urlRouterProvider, RestangularProvider,API_URL,API_VERSION){
        
        RestangularProvider.setBaseUrl(API_URL + API_VERSION);

        $urlRouterProvider.otherwise('/main/home');
        $stateProvider
            .state('main',{
                url: '/main',
                abstract: true,
                templateUrl:'./modules/main.html'
            })
            .state('main.home',{
                url: '/home',
                templateUrl:'./modules/home.html'
            })
            .state('main.contact',{
                url: '/contact',
                templateUrl:'./modules/contact.html'
            })
            .state('main.about',{
                url: '/about',
                templateUrl:'./modules/about.html'
            })
    }
})();