(function () {
    'use strict';

    angular.module('starter')
        .controller('repairModalCtrl', repairModalCtrl);

    repairModalCtrl.$inject = ['$scope', 'repairsFactory', 'toastr', '$timeout', '$filter','r_id','$state'];

    function repairModalCtrl($scope, repairsFactory, toastr, $timeout, $filter, r_id, $state) {
        $scope.repair = {};

        if (!_.isEmpty(r_id)) {
            repairsFactory.getRepair(r_id).then(function (data) {
                if (data.statusCode == 200 && data.response.success) {
                    var repair = data.response.result;
                    if (repair) {
                        $scope.repair = repair;
                        //console.log(new Date($scope.repair.datepurchased));
                        // $scope.repair.datepurchased = new Date($scope.repair.datepurchased);
                    }
                } else {
                    toastr.error(data.response.msg, 'ERROR');
                    return;
                }
            });
        }

        $scope.saveEntryR = function () {
            if (_.isEmpty(r_id)) {
                // $scope.repair.datepurchased = $filter('date')($scope.repair.datepurchased, "yyyy-MM-dd");
                //console.log($scope.repair);
                repairsFactory.saveRepair($scope.repair).then(function (data) {
                    if (data.statusCode == 200 && data.response.success) {
                        //console.log(data.response);
                        toastr.success(data.response.msg, 'SUCCESS');
                        $timeout(function(){
                            //$uibModalInstance.close('save');
                            $state.go('main.repairs');
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
                // $scope.repair.datepurchased = $filter('date')($scope.repair.datepurchased, "yyyy-MM-dd");
                repairsFactory.updateRepair(r_id, $scope.repair).then(function (data) {
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