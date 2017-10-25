(function () {
    'use strict';

    angular.module('starter')
        .controller('repairsController', repairsController);

        repairsController.$inject = ['$scope', 'repairsFactory', '$filter', '$uibModal','ngDialog','toastr'];

    function repairsController($scope, repairsFactory, $filter, $uibModal, ngDialog, toastr) {
        $scope.repairs = [];
        $scope.repairsCopy = [];
        $scope.txtSearch = '';

        repairsFactory.getAllRepairs().then(function (data) {
            //console.log("data:" + data);
            if (data.statusCode == 200 && data.response.success) {
                var repairs = data.response.result;
                console.dir(repairs);
                if (!_.isEmpty(repairs)) {
                    $scope.repairs = repairs;
                    $scope.repairsCopy = angular.copy(repairs);
                }
            }
        });

        $scope.searchR = function () {
            if ($scope.txtSearch) {
                $scope.repairs = $scope.repairsCopy;
                var result = $filter('filter')($scope.repairs, $scope.txtSearch);
                if (result) {
                    $scope.repairs = result;
                } else {
                    $scope.repairs = $scope.txtSearch + " is not found!";
                }
            } else {
                $scope.repairs = $scope.repairsCopy;
            }
        }

        $scope.refreshR = function () {
            repairsFactory.getAllRepairs().then(function (data) {
                //console.log("data:" + data);
                if (data.statusCode == 200 && data.response.success) {
                    var repairs = data.response.result;
                    //console.log('repairs: ' + repairs);
                    if (!_.isEmpty(repairs)) {
                        $scope.repairs = repairs;
                        $scope.repairsCopy = angular.copy(repairs);
                    }
                }
            });
        }

        $scope.deleteDataR = function(row){
            $scope.modal = {
                title:'repairs',
                message:'Delete this Data?'
            };
            ngDialog.openConfirm({
                templateUrl: './modules/dialogs/custom.dialog.html',
                scope: $scope,
                className: 'ngdialog-theme-default'
            }).then(function(){
                repairsFactory.deleteRepair(row._id).then(function(data){
                    if(data.statusCode == 200 && data.response.success){
                        toastr.success(data.response.msg, 'SUCCESS');
                        $scope.refreshV();
                    } else {
                        toastr.error(data.response.msg, 'ERROR');
                        return;
                    }
                })
            });
        }
    }
})();