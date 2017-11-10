(function () {
    'use strict';

    angular.module('starter')
        .controller('makesController', makesController);

    makesController.$inject = ['$scope', 'makesFactory', '$filter', '$uibModal','ngDialog','toastr'];

    function makesController($scope, makesFactory, $filter, $uibModal, ngDialog, toastr) {
        $scope.makes = [];
        $scope.makesCopy = [];
        $scope.txtSearch = '';

        makesFactory.getAllMake().then(function (data) {
            //console.log("data:" + data);
            if (data.statusCode == 200 && data.response.success) {
                var makes = data.response.result;
                console.dir(makes);
                if (!_.isEmpty(makes)) {
                    $scope.makes = makes;
                    $scope.makesCopy = angular.copy(makes);
                }
            }
        });

        $scope.search = function () {
            if ($scope.txtSearch) {
                var result = $filter('filter')($scope.makes, $scope.txtSearch);
                if (result) {
                    $scope.makes = result;
                }
            } else {
                $scope.makes = $scope.makesCopy;
            }
        }

        $scope.refresh = function () {
            makesFactory.getAllMake().then(function (data) {
                console.log("data:" + data);
                if (data.statusCode == 200 && data.response.success) {
                    var makes = data.response.result;
                    console.log('makes: ' + makes);
                    if (!_.isEmpty(makes)) {
                        $scope.makes = makes;
                        $scope.makesCopy = angular.copy(makes);
                    }
                }
            });
        }

        $scope.newEntry = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './modules/makes/make.modal.html',
                size: 'sm',
                controller: 'makeModalCtrl',
                resolve: {
                    make_id: function(){
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
                templateUrl: './modules/makes/make.modal.html',
                size: 'sm',
                controller: 'makeModalCtrl',
                resolve: {
                    make_id: function(){
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
                makesFactory.deleteMake(row._id).then(function(data){
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