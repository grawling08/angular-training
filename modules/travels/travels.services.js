(function(){
    'use strict';

    angular.module('starter')
        .factory('travelsFactory', travelsFactory);

        travelsFactory.$inject = ['Restangular'];

        function travelsFactory(Restangular){
            return {
                getAllTravels: function(){
                    return Restangular.all('travels').customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                saveTravel: function(data){
                    return Restangular.all('travels').customPOST(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                deleteTravel: function(id){
                    return Restangular.all('travels/' + id).customDELETE().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                updateTravel: function(id,data){
                    return Restangular.all('travels/' + id).customPUT(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                getTravel: function(id){
                    return Restangular.all('travels/' + id).customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                getTravelByVehicle: function(v_id){
                    return Restangular.all('travels/vehicle/' + v_id).customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                }
            }
        }
})();