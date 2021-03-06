(function () {
    'use strict';

    angular.module('starter')
        .controller('travelsController', travelsController);

        travelsController.$inject = ['$scope', 'travelsFactory', '$filter', '$uibModal','ngDialog','toastr'];

    function travelsController($scope, travelsFactory, $filter, $uibModal, ngDialog, toastr) {
        $scope.travels = [];
        $scope.travelsCopy = [];
        $scope.txtSearch = '';

        travelsFactory.getAllTravels().then(function (data) {
            if (data.statusCode == 200 && data.response.success) {
                var travels = data.response.result;
                console.dir(travels);
                if (!_.isEmpty(travels)) {
                    $scope.travels = travels;
                    $scope.travelsCopy = angular.copy(travels);
                }
            }
        });

        $scope.searchT = function () {
            if ($scope.txtSearch) {
                $scope.travels = $scope.travelsCopy;
                var result = $filter('filter')($scope.travels, $scope.txtSearch);
                if (result) {
                    $scope.travels = result;
                } else {
                    $scope.travels = $scope.txtSearch + " is not found!";
                }
            } else {
                $scope.travels = $scope.travelsCopy;
            }
        }

        $scope.refreshT = function () {
            travelsFactory.getAllTravels().then(function (data) {
                if (data.statusCode == 200 && data.response.success) {
                    var travels = data.response.result;
                    if (!_.isEmpty(travels)) {
                        $scope.travels = travels;
                        $scope.travelsCopy = angular.copy(travels);
                    }
                }
            });
        }

        $scope.newEntry = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './modules/travels/travel.modal.html',
                size: 'md',
                controller: 'travelModalCtrl',
                resolve: {
                    travel_id: function(){
                        return null;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) { 
                if(selectedItem == 'save'){
                    $scope.refreshT();
                }
            }, function () { return null });
        }

        $scope.updateEntry = function (_id) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './modules/travels/travel.modal.html',
                size: 'md',
                controller: 'travelModalCtrl',
                resolve: {
                    travel_id: function(){
                        return _id;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) { 
                if(selectedItem == 'save'){
                    $scope.refreshT();
                }
            }, function () { return null; });
        }

        $scope.deleteDataT = function(row){
            $scope.modal = {
                title:'Travels',
                message:'Delete this Data?'
            };
            ngDialog.openConfirm({
                templateUrl: './modules/dialogs/custom.dialog.html',
                scope: $scope,
                className: 'ngdialog-theme-default'
            }).then(function(){
                travelsFactory.deleteTravel(row._id).then(function(data){
                    if(data.statusCode == 200 && data.response.success){
                        toastr.success(data.response.msg, 'SUCCESS');
                        $scope.refreshT();
                    } else {
                        toastr.error(data.response.msg, 'ERROR');
                        return;
                    }
                })
            });
        }
    }
})();