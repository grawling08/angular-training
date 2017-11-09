(function () {
    'use strict';

    angular.module('starter')
        .controller('vehicleTypeModalCtrl', vehicleTypeModalCtrl);

    vehicleTypeModalCtrl.$inject = ['$scope', 'vehicleTypesFactory', '$uibModalInstance', 'toastr', '$timeout', '$filter','vtype_id','$state'];

    function vehicleTypeModalCtrl($scope, vehicleTypesFactory, $uibModalInstance, toastr, $timeout, $filter, vtype_id, $state) {
        $scope.vehicleType = {};

        if (!_.isEmpty(vtype_id)) {
            vehicleTypesFactory.getVehicleType(vtype_id).then(function (data) {
                if (data.statusCode == 200 && data.response.success) {
                    var vehicleType = data.response.result;
                    if (vehicleType) {
                        $scope.vehicleType = vehicleType;
                    }
                } else {
                    toastr.error(data.response.msg, 'ERROR');
                    return;
                }
            });
        }

        $scope.saveEntry = function () {
            if (_.isEmpty(vtype_id)) {
                vehicleTypesFactory.saveVehicleType($scope.vehicleType).then(function (data) {
                    if (data.statusCode == 200 && data.response.success) {
                        //console.log(data.response);
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
                vehicleTypesFactory.updateVehicleType(vtype_id, $scope.vehicleType).then(function (data) {
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

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();