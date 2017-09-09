(function(){
    'use strict';

    angular.module('starter')
        .factory('loginFactory',loginFactory);

        loginFactory.$inject = ['Restangular','$http','localStorageService'];

        function loginFactory(Restangular, $http, localStorageService){
            return {
                login: function(data){
                    var authdata = window.btoa(data.username + ':' + data.password);
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
                    return Restangular.all('login').customPOST().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                setUserToken: function(token){
                    localStorageService.set('user.token', token);
                    return true;
                },
                getUserToken: function(){
                    return localStorageService.get('user.token');
                },
                setCurrentUser: function(user){
                    localStorageService.set('user', user);
                    return true;
                },
                getCurrentUser: function(){
                    return localStorageService.get('user');
                },
                logout: function(){
                    return Restangular.all('login').customDELETE().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                }
            }
        }
})();