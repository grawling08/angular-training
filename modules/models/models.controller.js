(function () {
    'use strict';

    angular.module('starter')
        .controller('modelsController', modelsController);

        modelsController.$inject = ['$scope', 'modelsFactory', '$filter', '$uibModal','ngDialog','toastr'];

    function modelsController($scope, modelsFactory, $filter, $uibModal, ngDialog, toastr) {
        $scope.models = [];
        $scope.modelsCopy = [];
        $scope.txtSearch = '';

        modelsFactory.getAllModels().then(function (data) {
            if (data.statusCode == 200 && data.response.success) {
                var models = data.response.result;
                console.dir(models);
                if (!_.isEmpty(models)) {
                    $scope.models = models;
                    $scope.modelsCopy = angular.copy(models);
                }
            }
        });

        $scope.searchT = function () {
            if ($scope.txtSearch) {
                $scope.models = $scope.modelsCopy;
                var result = $filter('filter')($scope.models, $scope.txtSearch);
                if (result) {
                    $scope.models = result;
                } else {
                    $scope.models = $scope.txtSearch + " is not found!";
                }
            } else {
                $scope.models = $scope.modelsCopy;
            }
        }

        $scope.refreshT = function () {
            modelsFactory.getAllModels().then(function (data) {
                if (data.statusCode == 200 && data.response.success) {
                    var models = data.response.result;
                    if (!_.isEmpty(models)) {
                        $scope.models = models;
                        $scope.modelsCopy = angular.copy(models);
                    }
                }
            });
        }

        $scope.newEntry = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './modules/models/model.modal.html',
                size: 'md',
                controller: 'modelModalCtrl',
                resolve: {
                    model_id: function(){
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
                templateUrl: './modules/models/model.modal.html',
                size: 'md',
                controller: 'modelModalCtrl',
                resolve: {
                    model_id: function(){
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
                title:'Models',
                message:'Delete this Data?'
            };
            ngDialog.openConfirm({
                templateUrl: './modules/dialogs/custom.dialog.html',
                scope: $scope,
                className: 'ngdialog-theme-default'
            }).then(function(){
                modelsFactory.deleteModel(row._id).then(function(data){
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