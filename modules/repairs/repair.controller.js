(function () {
    'use strict';

    angular.module('starter')
        .controller('repairModalCtrl', repairModalCtrl);

    repairModalCtrl.$inject = ['$scope', 'repairsFactory', 'vehiclesFactory', '$uibModalInstance', 'toastr', '$timeout', '$filter','r_id','$state'];

    function repairModalCtrl($scope, repairsFactory, vehiclesFactory, $uibModalInstance, toastr, $timeout, $filter, r_id, $state) {
        $scope.repair = {};
        $scope.vehicles = {};

        if (!_.isEmpty(r_id)) {
            repairsFactory.getRepair(r_id).then(function (data) {
                if (data.statusCode == 200 && data.response.success) {
                    var repair = data.response.result;
                    if (repair) {
                        $scope.repair = repair;
                        //console.log(new Date($scope.repair.datepurchased));
                        $scope.repair.date = new Date($scope.repair.date);
                    }
                } else {
                    toastr.error(data.response.msg, 'ERROR');
                    return;
                }
            });
        }

        vehiclesFactory.getAllVehicles().then(function (data){
            if (data.statusCode == 200 && data.response.success) {
                var vehicles = data.response.result;
                if (vehicles) {
                    $scope.vehicles = vehicles;
                }
            } else {
                toastr.error(data.response.msg, 'ERROR');
                return;
            }
        });

        $scope.date = {
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

        $scope.saveEntry = function () {
            if (_.isEmpty(r_id)) {
                $scope.repair.date = $filter('date')($scope.repair.date, "yyyy-MM-dd");
                //console.log($scope.repair);
                repairsFactory.saveRepair($scope.repair).then(function (data) {
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
                $scope.repair.date = $filter('date')($scope.repair.date, "yyyy-MM-dd");
                repairsFactory.updateRepair(r_id, $scope.repair).then(function (data) {
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