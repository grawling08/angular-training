(function(){
    'use strict';

    angular.module('starter')
        .factory('makesFactory',makesFactory);

        makesFactory.$inject = ['Restangular'];

        function makesFactory(Restangular){
            return {
                getAllMake: function(){
                    return Restangular.all('makes').customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                saveMake: function(data){
                    return Restangular.all('makes').customPOST(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                deleteMake: function(make_id){
                    return Restangular.all('makes/' + make_id).customDELETE().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                updateMake: function(make_id,data){
                    return Restangular.all('makes/' + make_id).customPUT(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                getMake: function(make_id){
                    return Restangular.all('makes/' + make_id).customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                }
            }
        }
})();