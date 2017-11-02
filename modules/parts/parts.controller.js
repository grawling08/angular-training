(function () {
    'use strict';

    angular.module('starter')
        .controller('partsController', partsController);

        partsController.$inject = ['$scope', '$state', 'partsFactory', '$filter', '$timeout', '$uibModalInstance','ngDialog','toastr','part_id', 'repair_id'];

    function partsController($scope, $state, partsFactory, $filter, $timeout, $uibModalInstance, ngDialog, toastr, part_id, repair_id) {
        $scope.parts = {};
        $scope.parts.repair_id = repair_id;
        if (!_.isEmpty(part_id)) {
            partsFactory.getPart(part_id).then(function (data) {
                if (data.statusCode == 200 && data.response.success) {
                    var parts = data.response.result;
                    if (!_.isEmpty(parts)) {
                        $scope.parts = parts;
                    }
                }
            });
        }

        $scope.savePart = function () {
            if (_.isEmpty(part_id)) {
                partsFactory.savePart($scope.parts).then(function (data) {
                    if (data.statusCode == 200 && data.response.success) {
                        console.log($scope.parts);
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
                });
            } else {
                partsFactory.updatePart(part_id, $scope.parts).then(function (data) {
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
                });
            }
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();