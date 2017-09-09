(function(){
    'use strict';

    angular.module('starter')
        .factory('httpInterceptor',httpInterceptor);

        httpInterceptor.$inject = ['$rootScope','localStorageService','$q','$location'];

        function httpInterceptor($rootScope,localStorageService,$q,$location){
            return {
                request: function(config){
                    config.headers = config.headers || {};
                    if(localStorageService.get('user.token')){
                        var token = localStorageService.get('user.token');
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                    $rootScope.$broadcast('loading:start');
                    return config || $q.when(config);
                },
                response: function(response){
                    $rootScope.$broadcast('loading:stop');
                    return response || $q.when(response);
                },
                responseError: function(response){
                    if(response.status == 401){
                        $rootScope.$broadcast('unauthorized');
                        $location.path('/login');
                    } else if(response.status == 403){
                        $rootScope.$broadcast('unauthorized');
                        $location.path('/login');
                    }

                    return $q.reject(response);
                }
            }
        }
})()