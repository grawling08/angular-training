(function () {
    'use strict';

    angular.module('starter')
        .controller('makeModalCtrl', makeModalCtrl);

    makeModalCtrl.$inject = ['$scope', 'makesFactory', '$uibModalInstance', 'toastr', '$timeout', '$filter','make_id','$state'];

    function makeModalCtrl($scope, makesFactory, $uibModalInstance, toastr, $timeout, $filter, make_id, $state) {
        $scope.make = {};

        if (!_.isEmpty(make_id)) {
            makesFactory.getMake(make_id).then(function (data) {
                if (data.statusCode == 200 && data.response.success) {
                    var make = data.response.result;
                    if (make) {
                        $scope.make = make;
                    }
                } else {
                    toastr.error(data.response.msg, 'ERROR');
                    return;
                }
            });
        }

        $scope.saveEntry = function () {
            if (_.isEmpty(make_id)) {
                makesFactory.saveMake($scope.make).then(function (data) {
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
                makesFactory.updateMake(make_id, $scope.make).then(function (data) {
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