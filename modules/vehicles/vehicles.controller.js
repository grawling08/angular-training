(function () {
    'use strict';

    angular.module('starter')
        .controller('vehiclesController', vehiclesController);

    vehiclesController.$inject = ['$scope', 'vehiclesFactory', '$filter', '$uibModal','ngDialog','toastr'];

    function vehiclesController($scope, vehiclesFactory, $filter, $uibModal, ngDialog, toastr) {
        $scope.vehicles = [];
        $scope.vehiclesCopy = [];
        $scope.txtSearch = '';

        vehiclesFactory.getAllVehicles().then(function (data) {
            //console.log("data:" + data);
            if (data.statusCode == 200 && data.response.success) {
                var vehicles = data.response.result;
                //console.log('vehicles: ' + vehicles);
                if (!_.isEmpty(vehicles)) {
                    $scope.vehicles = vehicles;
                    $scope.vehiclesCopy = angular.copy(vehicles);
                }
            }
        });

        $scope.searchV = function () {
            if ($scope.txtSearch) {
                $scope.vehicles = $scope.vehiclesCopy;
                var result = $filter('filter')($scope.vehicles, $scope.txtSearch);
                if (result) {
                    $scope.vehicles = result;
                } else {
                    $scope.vehicles = $scope.txtSearch + " is not found!";
                }
            } else {
                $scope.vehicles = $scope.vehiclesCopy;
            }
        }

        $scope.refreshV = function () {
            vehiclesFactory.getAllVehicles().then(function (data) {
                //console.log("data:" + data);
                if (data.statusCode == 200 && data.response.success) {
                    var vehicles = data.response.result;
                    console.log('vehicles: ' + vehicles);
                    if (!_.isEmpty(vehicles)) {
                        $scope.vehicles = vehicles;
                        $scope.vehiclesCopy = angular.copy(vehicles);
                    }
                }
            });
        }

        $scope.newEntryV = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './modules/vehicles/vehicle.modal.html',
                size: 'lg',
                controller: 'vehicleModalCtrl',
                resolve: {
                    v_id: function(){
                        return null;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) { 
                if(selectedItem == 'save'){
                    $scope.refreshV();
                }
            }, function () { });
        }

        $scope.updateEntryV = function (_id) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './modules/vehicles/vehicle.modal.html',
                size: 'lg',
                controller: 'vehicleModalCtrl',
                resolve: {
                    v_id: function(){
                        return _id;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) { 
                if(selectedItem == 'save'){
                    $scope.refreshV();
                }
            }, function () { });
        }

        $scope.deleteDataV = function(row){
            $scope.modal = {
                title:'vehicles',
                message:'Delete this Data?'
            };
            ngDialog.openConfirm({
                templateUrl: './modules/dialogs/custom.dialog.html',
                scope: $scope,
                className: 'ngdialog-theme-default'
            }).then(function(){
                vehiclesFactory.deleteVehicle(row._id).then(function(data){
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