(function () {
    'use strict';

    angular.module('starter')
        .controller('locationsController', locationsController);

    locationsController.$inject = ['$scope', 'locationsFactory', '$filter', '$uibModal','ngDialog','toastr'];

    function locationsController($scope, locationsFactory, $filter, $uibModal, ngDialog, toastr) {
        $scope.locations = [];
        $scope.locationsCopy = [];
        $scope.txtSearch = '';

        locationsFactory.getAllLocation().then(function (data) {
            //console.log("data:" + data);
            if (data.statusCode == 200 && data.response.success) {
                var locations = data.response.result;
                console.log('locations: ' + locations);
                if (!_.isEmpty(locations)) {
                    $scope.locations = locations;
                    $scope.locationsCopy = angular.copy(locations);
                }
            }
        });

        $scope.search = function () {
            if ($scope.txtSearch) {
                var result = $filter('filter')($scope.locations, $scope.txtSearch);
                if (result) {
                    $scope.locations = result;
                }
            } else {
                $scope.locations = $scope.locationsCopy;
            }
        }

        $scope.refresh = function () {
            locationsFactory.getAllLocation().then(function (data) {
                console.log("data:" + data);
                if (data.statusCode == 200 && data.response.success) {
                    var locations = data.response.result;
                    console.log('locations: ' + locations);
                    if (!_.isEmpty(locations)) {
                        $scope.locations = locations;
                        $scope.locationsCopy = angular.copy(locations);
                    }
                }
            });
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
                locationsFactory.deleteLocation(row._id).then(function(data){
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