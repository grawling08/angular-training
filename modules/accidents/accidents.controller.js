(function () {
    'use strict';

    angular.module('starter')
        .controller('accidentsController', accidentsController);

    accidentsController.$inject = ['$scope', 'accidentsFactory', '$filter', '$uibModal','ngDialog','toastr'];

    function accidentsController($scope, accidentsFactory, $filter, $uibModal, ngDialog, toastr) {
        $scope.accidents = [];
        $scope.accidentsCopy = [];
        $scope.txtSearch = '';

        accidentsFactory.getAllAccident().then(function (data) {
            //console.log("data:" + data);
            if (data.statusCode == 200 && data.response.success) {
                var accidents = data.response.result;
                console.dir(accidents);
                if (!_.isEmpty(accidents)) {
                    $scope.accidents = accidents;
                    $scope.accidentsCopy = angular.copy(accidents);
                }
            }
        });

        $scope.search = function () {
            if ($scope.txtSearch) {
                var result = $filter('filter')($scope.accidents, $scope.txtSearch);
                if (result) {
                    $scope.accidents = result;
                }
            } else {
                $scope.accidents = $scope.accidentsCopy;
            }
        }

        $scope.refresh = function () {
            accidentsFactory.getAllAccident().then(function (data) {
                console.log("data:" + data);
                if (data.statusCode == 200 && data.response.success) {
                    var accidents = data.response.result;
                    console.log('accidents: ' + accidents);
                    if (!_.isEmpty(accidents)) {
                        $scope.accidents = accidents;
                        $scope.accidentsCopy = angular.copy(accidents);
                    }
                }
            });
        }

        $scope.newEntry = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './modules/accidents/accident.modal.html',
                size: 'md',
                controller: 'accidentModalCtrl',
                resolve: {
                    accident_id: function(){
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
                templateUrl: './modules/accidents/accident.modal.html',
                size: 'md',
                controller: 'accidentModalCtrl',
                resolve: {
                    accident_id: function(){
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
                accidentsFactory.deleteAccident(row._id).then(function(data){
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