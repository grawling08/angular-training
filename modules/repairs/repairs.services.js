(function(){
    'use strict';

    angular.module('starter')
        .factory('repairsFactory', repairsFactory);

        repairsFactory.$inject = ['Restangular'];

        function repairsFactory(Restangular){
            return {
                getAllRepairs: function(){
                    return Restangular.all('repairs').customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                saveRepair: function(data){
                    return Restangular.all('repairs').customPOST(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                deleteRepair: function(id){
                    return Restangular.all('repairs/' + id).customDELETE().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                updateRepair: function(id,data){
                    return Restangular.all('repairs/' + id).customPUT(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                getRepair: function(id){
                    return Restangular.all('repairs/' + id).customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                getRepairsByVehicle: function(v_id){
                    return Restangular.all('repairs/vehicle/' + v_id).customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                }
            }
        }
})();