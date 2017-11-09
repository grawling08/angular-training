(function () {
    'use strict';

    angular.module('starter')
        .controller('vehicleTypesController', vehicleTypesController);

    vehicleTypesController.$inject = ['$scope', 'vehicleTypesFactory', '$filter', '$uibModal','ngDialog','toastr'];

    function vehicleTypesController($scope, vehicleTypesFactory, $filter, $uibModal, ngDialog, toastr) {
        $scope.vehicleTypes = [];
        $scope.vehicleTypesCopy = [];
        $scope.txtSearch = '';

        vehicleTypesFactory.getAllVehicleTypes().then(function (data) {
            //console.log("data:" + data);
            if (data.statusCode == 200 && data.response.success) {
                var vehicleTypes = data.response.result;
                console.dir(vehicleTypes);
                if (!_.isEmpty(vehicleTypes)) {
                    $scope.vehicleTypes = vehicleTypes;
                    $scope.vehicleTypesCopy = angular.copy(vehicleTypes);
                }
            }
        });

        $scope.search = function () {
            if ($scope.txtSearch) {
                var result = $filter('filter')($scope.vehicleTypes, $scope.txtSearch);
                if (result) {
                    $scope.vehicleTypes = result;
                }
            } else {
                $scope.vehicleTypes = $scope.vehicleTypesCopy;
            }
        }

        $scope.refresh = function () {
            vehicleTypesFactory.getAllVehicleTypes().then(function (data) {
                console.log("data:" + data);
                if (data.statusCode == 200 && data.response.success) {
                    var vehicleTypes = data.response.result;
                    console.log('locations: ' + vehicleTypes);
                    if (!_.isEmpty(vehicleTypes)) {
                        $scope.vehicleTypes = vehicleTypes;
                        $scope.vehicleTypesCopy = angular.copy(vehicleTypes);
                    }
                }
            });
        }

        $scope.newEntry = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './modules/vehicletypes/vehicletype.modal.html',
                size: 'md',
                controller: 'vehicleTypeModalCtrl',
                resolve: {
                    vtype_id: function(){
                        return null;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) { 
                if(selectedItem == 'save'){
                    $scope.refresh();
                }
            }, function () { });
        }

        $scope.updateEntry = function (_id) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './modules/vehicletypes/vehicletype.modal.html',
                size: 'md',
                controller: 'vehicleTypeModalCtrl',
                resolve: {
                    vtype_id: function(){
                        return _id;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) { 
                if(selectedItem == 'save'){
                    $scope.refresh();
                }
            }, function () { });
        }

        $scope.deleteData = function(row){
            $scope.modal = {
                title:'users',
                message:'Delete this Data?'
            };
            ngDialog.openConfirm({
                templateUrl: './modules/dialogs/custom.dialog.html',
                scope: $scope,
                className: 'ngdialog-theme-default'
            }).then(function(){
                vehicleTypesFactory.deleteLocation(row._id).then(function(data){
                    if(data.statusCode == 200 && data.response.success){
                        toastr.success(data.response.msg, 'SUCCESS');
                        $scope.refresh();
                    } else {
                        toastr.error(data.response.msg, 'ERROR');
                        return;
                    }
                })
            });
        }
    }
})();