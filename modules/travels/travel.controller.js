(function () {
    'use strict';

    angular.module('starter')
        .controller('travelModalCtrl', travelModalCtrl);

    travelModalCtrl.$inject = ['$scope', '$uibModalInstance', 'travelsFactory', 'travel_id', 'toastr', '$timeout'];

    function travelModalCtrl($scope, $uibModalInstance, travelsFactory, travel_id, toastr, $timeout) {
        $scope.travel = {};

        if (!_.isEmpty(travel_id)) {
            travelsFactory.getTravel(travel_id).then(function (data) {
                if (data.statusCode == 200 && data.response.success) {
                    var travel = data.response.result;
                    if (travel) {
                        $scope.travel = travel;
                    }
                } else {
                    toastr.error(data.response.msg, 'ERROR');
                    return;
                }
            });
        }

        $scope.saveEntry = function () {
            if (_.isEmpty(travel_id)) {
                travelsFactory.saveTravel($scope.travel).then(function (data) {
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
                travelsFactory.updateTravel(travel_id, $scope.user).then(function (data) {
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