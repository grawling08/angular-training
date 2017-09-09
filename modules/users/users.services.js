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
                },
                deleteUser: function(user_id){
                    return Restangular.all('users/' + user_id).customDELETE().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                updateUser: function(user_id,data){
                    return Restangular.all('users/' + user_id).customPUT(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                getUser: function(user_id){
                    return Restangular.all('users/' + user_id).customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                }
            }
        }
})();