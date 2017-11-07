(function () {
    'use strict';

    angular.module('starter')
        .controller('locationModalCtrl', locationModalCtrl);

    locationModalCtrl.$inject = ['$scope', 'locationsFactory', '$uibModalInstance', 'toastr', '$timeout', '$filter','loc_id','$state'];

    function locationModalCtrl($scope, locationsFactory, $uibModalInstance, toastr, $timeout, $filter, loc_id, $state) {
        $scope.location = {};

        if (!_.isEmpty(loc_id)) {
            locationsFactory.getLocation(loc_id).then(function (data) {
                if (data.statusCode == 200 && data.response.success) {
                    var location = data.response.result;
                    if (location) {
                        $scope.location = location;
                    }
                } else {
                    toastr.error(data.response.msg, 'ERROR');
                    return;
                }
            });
        }

        $scope.saveEntry = function () {
            if (_.isEmpty(loc_id)) {
                locationsFactory.saveLocation($scope.location).then(function (data) {
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
                locationsFactory.updateLocation(loc_id, $scope.location).then(function (data) {
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