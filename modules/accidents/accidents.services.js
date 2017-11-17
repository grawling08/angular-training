(function(){
    'use strict';

    angular.module('starter')
        .factory('accidentsFactory',accidentsFactory);

        accidentsFactory.$inject = ['Restangular'];

        function accidentsFactory(Restangular){
            return {
                getAllAccident: function(){
                    return Restangular.all('accidents').customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                saveAccident: function(data){
                    return Restangular.all('accidents').customPOST(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                deleteAccident: function(accident_id){
                    return Restangular.all('accidents/' + accident_id).customDELETE().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                updateAccident: function(accident_id,data){
                    return Restangular.all('accidents/' + accident_id).customPUT(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                getAccident: function(accident_id){
                    return Restangular.all('accidents/' + accident_id).customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                }
            }
        }
})();