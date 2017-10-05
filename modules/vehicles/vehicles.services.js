(function(){
    'use strict';

    angular.module('starter')
        .factory('vehiclesFactory', vehiclesFactory);

        vehiclesFactory.$inject = ['Restangular'];

        function vehiclesFactory(Restangular){
            return {
                getAllVehicles: function(){
                    return Restangular.all('vehicles').customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                saveVehicle: function(data){
                    return Restangular.all('vehicles').customPOST(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                deleteVehicle: function(id){
                    return Restangular.all('vehicles/' + id).customDELETE().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                updateVehicle: function(id,data){
                    return Restangular.all('vehicles/' + id).customPUT(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                getVehicle: function(id){
                    return Restangular.all('vehicles/' + id).customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                }
            }
        }
})();