(function(){
    'use strict';

    angular.module('starter')
        .run(appRun);

    appRun.$inject = ['$rootScope','loginFactory','localStorageService','$location','cfpLoadingBar'];

    function appRun($rootScope,loginFactory,localStorageService,$location,cfpLoadingBar){

        if(loginFactory.getCurrentUser()){
            $rootScope.currentUser = loginFactory.getCurrentUser();
        } else {
            $location.path('/login');
        }

        $rootScope.logout = function(){
            loginFactory.logout().then(function(data){
                if(data.response.success){
                    localStorageService.remove('user');
                    localStorageService.remove('user.token');

                    $location.path('/login');
                }
            });
        }

        $rootScope.$on('unauthorized', function(){
            localStorageService.remove('user');
            localStorageService.remove('user.token');
            console.log('unauthorized');
            $location.path('/login');
        });

        $rootScope.$on('loading:start',function(){
            console.log('start loading');
            cfpLoadingBar.start();
        });

        $rootScope.$on('loading:stop',function(){
            console.log('stop loading');
            cfpLoadingBar.complete();
        });
    }

})();