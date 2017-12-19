(function () {
    'use strict';

    angular.module('starter')
        .controller('vehicleModalCtrl', vehicleModalCtrl);

    vehicleModalCtrl.$inject = ['$scope', 'vehiclesFactory', 'makesFactory', 'modelsFactory', 'toastr', '$timeout', '$filter','v_id','$state'];

    function vehicleModalCtrl($scope, vehiclesFactory, makesFactory, modelsFactory, toastr, $timeout, $filter, v_id, $state) {
        $scope.vehicle = {};
        $scope.makes = {};
        $scope.models = {};

        if (!_.isEmpty(v_id)) {
            vehiclesFactory.getVehicle(v_id).then(function (data) {
                if (data.statusCode == 200 && data.response.success) {
                    var vehicle = data.response.result;
                    if (vehicle) {
                        $scope.vehicle = vehicle;
                        console.dir(vehicle);
                        $scope.vehicle.datepurchased = new Date($scope.vehicle.datepurchased);
                    }
                } else {
                    toastr.error(data.response.msg, 'ERROR');
                    return;
                }
            });
        }

        $scope.datepurchased = {
            datepickerOptions: {
                showWeeks: false,
                startingDay: 1,
                dateDisabled: function(data) {
                    return (data.mode === 'day' && (new Date().toDateString() == data.date.toDateString()));
                }
            }
        }
        $scope.isOpen = false;
        $scope.openCalendar = function(e) {
            e.preventDefault();
            e.stopPropagation();
            $scope.isOpen = true;
        };

        makesFactory.getAllMake().then(function (data) {
            //console.log("data:" + data);
            if (data.statusCode == 200 && data.response.success) {
                var makes = data.response.result;
                //console.dir(makes);
                if (!_.isEmpty(makes)) {
                    $scope.makes = makes;
                }
            }
        });

        $scope.checkToggle = function(){
            if (!_.isEmpty(v_id)) {
                return false;
            } else {
                return true;
            }
        };

        $scope.changeModel = function (id) {
            if(id != null){
                modelsFactory.getModelByMake(id).then(function (data) {
                    if (data.statusCode == 200 && data.response.success) {
                        var models = data.response.result;
                        console.dir(models);
                        if (!_.isEmpty(models)) {
                            $scope.models = models;
                        }
                    }
                });
            }
        }

        $scope.saveEntryV = function () {
            if (_.isEmpty(v_id)) {
                $scope.vehicle.datepurchased = $filter('date')($scope.vehicle.datepurchased, "yyyy-MM-dd");
                //console.log($scope.vehicle);
                vehiclesFactory.saveVehicle($scope.vehicle).then(function (data) {
                    if (data.statusCode == 200 && data.response.success) {
                        //console.log(data.response);
                        toastr.success(data.response.msg, 'SUCCESS');
                        $timeout(function(){
                            //$uibModalInstance.close('save');
                            $state.go('main.vehicles');
                        },1000);
                    } else if (!data.success && _.isArray(data.result)) {
                        _.each(data.result, function (row) {
                            toastr.warning(row.msg, 'WARNING');
                        });
                        return;
                    } else {
                        toastr.error(data.response.msg, 'ERROR');
                        return;
                    }
                })
            } else {
                $scope.vehicle.datepurchased = $filter('date')($scope.vehicle.datepurchased, "yyyy-MM-dd");
                vehiclesFactory.updateVehicle(v_id, $scope.vehicle).then(function (data) {
                    if (data.statusCode == 200 && data.response.success) {
                        toastr.success(data.response.msg, 'SUCCESS');
                        $timeout(function(){
                            //$uibModalInstance.close('save');
                        },1000);
                    } else if (!data.success && _.isArray(data.result)) {
                        _.each(data.result, function (row) {
                            toastr.warning(row.msg, 'WARNING');
                        });
                        return;
                    } else {
                        toastr.error(data.response.msg, 'ERROR');
                        return;
                    }
                })
            }
        }
    }
})();