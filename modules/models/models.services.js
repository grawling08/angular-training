(function(){
    'use strict';

    angular.module('starter')
        .factory('modelsFactory', modelsFactory);

        modelsFactory.$inject = ['Restangular'];

        function modelsFactory(Restangular){
            return {
                getAllModels: function(){
                    return Restangular.all('models').customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                saveModel: function(data){
                    return Restangular.all('models').customPOST(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                deleteModel: function(id){
                    return Restangular.all('models/' + id).customDELETE().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                updateModel: function(id,data){
                    return Restangular.all('models/' + id).customPUT(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                getModel: function(id){
                    return Restangular.all('models/' + id).customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                }
            }
        }
})();