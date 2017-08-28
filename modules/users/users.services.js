(function(){
    'use strict';

    angular.module('starter')
        .factory('usersFactory',usersFactory);

        usersFactory.$inject = ['Restangular'];

        function usersFactory(Restangular){
            return {
                getAllUser: function(){
                    return Restangular.all('users').customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                saveUser: function(data){
                    return Restangular.all('users').customPOST(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                }
            }
        }
})();