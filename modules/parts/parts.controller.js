(function () {
    'use strict';

    angular.module('starter')
        .controller('partsController', partsController);

        partsController.$inject = ['$scope', 'partsFactory', '$filter', '$uibModalInstance','ngDialog','toastr','part_id'];

    function partsController($scope, partsFactory, $filter, $uibModalInstance, ngDialog, toastr, part_id) {
        $scope.parts = {};

        if (!_.isEmpty(part_id)) {
            partsFactory.getPart(part_id).then(function (data) {
                //console.log("data:" + data);
                if (data.statusCode == 200 && data.response.success) {
                    var parts = data.response.result;
                    //console.dir(parts);
                    if (!_.isEmpty(parts)) {
                        $scope.parts = parts;
                    }
                }
            });
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();