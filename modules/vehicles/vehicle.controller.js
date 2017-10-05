(function () {
    'use strict';

    angular.module('starter')
        .controller('vehicleModalCtrl', vehicleModalCtrl);

    vehicleModalCtrl.$inject = ['$scope', '$uibModalInstance', 'vehiclesFactory', 'v_id', 'toastr', '$timeout'];

    function vehicleModalCtrl($scope, $uibModalInstance, vehiclesFactory, v_id, toastr, $timeout) {
        $scope.vehicle = {};

        if (!_.isEmpty(v_id)) {
            vehiclesFactory.getVehicle(v_id).then(function (data) {
                if (data.statusCode == 200 && data.response.success) {
                    var vehicle = data.response.result;
                    if (vehicle) {
                        $scope.vehicle = vehicle;
                    }
                } else {
                    toastr.error(data.response.msg, 'ERROR');
                    return;
                }
            });
        }

        $scope.saveEntryV = function () {
            if (_.isEmpty(v_id)) {
                vehiclesFactory.saveVehicle($scope.vehicle).then(function (data) {
                    if (data.statusCode == 200 && data.response.success) {
                        toastr.success(data.response.msg, 'SUCCESS');
                        $timeout(function(){
                            $uibModalInstance.close('save');
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
                vehiclesFactory.updateVehicle(v_id, $scope.vehicle).then(function (data) {
                    if (data.statusCode == 200 && data.response.success) {
                        toastr.success(data.response.msg, 'SUCCESS');
                        $timeout(function(){
                            $uibModalInstance.close('save');
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

        $scope.cancelV = function () {
            $uibModalInstance.dismiss('cancel');
        }


    }
})();