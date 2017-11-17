(function () {
    'use strict';

    angular.module('starter')
        .controller('accidentModalCtrl', accidentModalCtrl);

    accidentModalCtrl.$inject = ['$scope', 'accidentsFactory', '$uibModalInstance', 'vehiclesFactory', 'toastr', '$timeout', '$filter','accident_id','$state'];

    function accidentModalCtrl($scope, accidentsFactory, $uibModalInstance, vehiclesFactory, toastr, $timeout, $filter, accident_id, $state) {
        $scope.accident = {};
        $scope.vehicles = {};

        if (!_.isEmpty(accident_id)) {
            accidentsFactory.getAccident(accident_id).then(function (data) {
                if (data.statusCode == 200 && data.response.success) {
                    var accident = data.response.result;
                    if (accident) {
                        $scope.accident = accident;
                        $scope.accident.accidentdate = new Date($scope.accident.accidentdate);
                        $scope.accident.recorddate = new Date($scope.accident.recorddate);
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

        $scope.accidentdate = {
            datepickerOptions: {
                showWeeks: false,
                startingDay: 1,
                dateDisabled: function(data) {
                    return (data.mode === 'day' && (new Date().toDateString() == data.date.toDateString()));
                }
            }
        }
        $scope.recorddate = {
            datepickerOptions: {
                showWeeks: false,
                startingDay: 1,
                dateDisabled: function(data) {
                    return (data.mode === 'day' && (new Date().toDateString() == data.date.toDateString()));
                }
            }
        }
        $scope.isOpen = false;
        $scope.isOpen2 = false;
        $scope.openCalendar = function(e) {
            e.preventDefault();
            e.stopPropagation();
            $scope.isOpen = true;
        };
        $scope.openCalendar2 = function(e) {
            e.preventDefault();
            e.stopPropagation();
            $scope.isOpen2 = true;
        };

        $scope.saveEntry = function () {
            $scope.accident.accidentdate = $filter('date')($scope.accident.accidentdate, "yyyy-MM-dd");
            $scope.accident.recorddate = $filter('date')($scope.accident.recorddate, "yyyy-MM-dd");
            if (_.isEmpty(accident_id)) {
                accidentsFactory.saveAccident($scope.accident).then(function (data) {
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
                accidentsFactory.updateAccident(accident_id, $scope.accident).then(function (data) {
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