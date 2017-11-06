(function () {
    'use strict';

    angular.module('starter')
        .controller('repairsController', repairsController);

        repairsController.$inject = ['$scope', 'repairsFactory', 'partsFactory', '$filter', '$uibModal','ngDialog','toastr'];

    function repairsController($scope, repairsFactory, partsFactory, $filter, $uibModal, ngDialog, toastr) {
        $scope.repairs = [];
        $scope.repairsCopy = [];
        $scope.txtSearch = '';
        $scope.parts = [];

        repairsFactory.getAllRepairParts().then(function (data) {
            if (data.statusCode == 200 && data.response.success) {
                var repairs = data.response.result;
                //console.dir(repairs);
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
            repairsFactory.getAllRepairParts().then(function (data) {
                if (data.statusCode == 200 && data.response.success) {
                    var repairs = data.response.result;
                    if (!_.isEmpty(repairs)) {
                        $scope.repairs = repairs;
                        $scope.repairsCopy = angular.copy(repairs);
                    }
                }
            });
        }


        $scope.newPart = function (repair_id) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './modules/parts/part.modal.html',
                size: 'md',
                controller: 'partsController',
                resolve: {
                    part_id: function(){
                        return null;
                    },
                    repair_id: function(){
                        return repair_id;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) { 
                if(selectedItem == 'save'){
                    $scope.refreshR();
                }
            }, function () { });
        }

        $scope.updatePart = function (_idpart) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './modules/parts/part.modal.html',
                size: 'md',
                controller: 'partsController',
                resolve: {
                    part_id: function(){
                        return _idpart;
                    },
                    repair_id: function(){
                        return null;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) { 
                if(selectedItem == 'save'){
                    $scope.refreshR();
                }
            }, function () { });
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
                repairsFactory.deleteRepair(row._idrepair).then(function(data){
                    if(data.statusCode == 200 && data.response.success){
                        toastr.success(data.response.msg, 'SUCCESS');
                        $scope.refreshR();
                    } else {
                        toastr.error(data.response.msg, 'ERROR');
                        return;
                    }
                })
            });
        }

        $scope.deleteDataP = function(row){
            $scope.modal = {
                title:'repairs',
                message:'Delete this Data?'
            };
            ngDialog.openConfirm({
                templateUrl: './modules/dialogs/custom.dialog.html',
                scope: $scope,
                className: 'ngdialog-theme-default'
            }).then(function(){
                partsFactory.deletePart(row._idpart).then(function(data){
                    if(data.statusCode == 200 && data.response.success){
                        toastr.success(data.response.msg, 'SUCCESS');
                        $scope.refreshR();
                    } else {
                        toastr.error(data.response.msg, 'ERROR');
                        return;
                    }
                })
            });
        }
    }
})();