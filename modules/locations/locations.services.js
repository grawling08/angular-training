(function(){
    'use strict';

    angular.module('starter')
        .factory('locationsFactory',locationsFactory);

        locationsFactory.$inject = ['Restangular'];

        function locationsFactory(Restangular){
            return {
                getAllLocation: function(){
                    return Restangular.all('locations').customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                saveLocation: function(data){
                    return Restangular.all('locations').customPOST(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                deleteLocation: function(loc_id){
                    return Restangular.all('locations/' + loc_id).customDELETE().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                updateLocation: function(loc_id,data){
                    return Restangular.all('locations/' + loc_id).customPUT(data).then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                },
                getLocation: function(loc_id){
                    return Restangular.all('locations/' + loc_id).customGET().then(function(res){
                        return res;
                    }, function(err){
                        return err.data;
                    });
                }
            }
        }
})();