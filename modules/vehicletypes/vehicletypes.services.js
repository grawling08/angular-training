(function(){
    'use strict';

    angular.module('starter')
        .factory('vehicleTypesFactory',vehicleTypesFactory);

        vehicleTypesFactory.$inject = ['Restangular'];

        function vehicleTypesFactory(Restangular){
            return {
                getAllVehicleTypes: function(){
                    return Restangular.all('vehicletypes').customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                saveVehicleType: function(data){
                    return Restangular.all('vehicletypes').customPOST(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                deleteVehicleType: function(vtype_id){
                    return Restangular.all('vehicletypes/' + vtype_id).customDELETE().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                updateVehicleType: function(vtype_id,data){
                    return Restangular.all('vehicletypes/' + vtype_id).customPUT(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                getVehicleType: function(vtype_id){
                    return Restangular.all('vehicletypes/' + vtype_id).customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                }
            }
        }
})();