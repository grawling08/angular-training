(function(){
    'use strict';

    angular.module('starter')
        .config(configuration);
    
    configuration.$inject = ['$stateProvider','$urlRouterProvider','RestangularProvider','API_URL','API_VERSION','$httpProvider'];
    
    function configuration($stateProvider, $urlRouterProvider, RestangularProvider,API_URL,API_VERSION,$httpProvider){
        
        RestangularProvider.setBaseUrl(API_URL + API_VERSION);
        $httpProvider.interceptors.push('httpInterceptor');

        $urlRouterProvider.otherwise('/login');
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