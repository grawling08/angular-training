(function(){
    'use strict';

    angular.module('starter')
        .factory('partsFactory', partsFactory);

        partsFactory.$inject = ['Restangular'];

        function partsFactory(Restangular){
            return {
                getAllParts: function(){
                    return Restangular.all('parts').customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                savePart: function(data){
                    return Restangular.all('parts').customPOST(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                deletePart: function(id){
                    return Restangular.all('parts/' + id).customDELETE().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                updatePart: function(id,data){
                    return Restangular.all('parts/' + id).customPUT(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                getPart: function(id){
                    return Restangular.all('parts/' + id).customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                getPartsByRepair: function(r_id){
                    return Restangular.all('parts/repair/' + r_id).customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                }
            }
        }
})();