(function () {
    'use strict';

    angular.module('starter')
        .controller('partsusedController', partsusedController);

        partsusedController.$inject = ['$scope', 'partsusedFactory', '$filter', '$uibModal','ngDialog','toastr'];

    function partsusedController($scope, partsusedFactory, $filter, $uibModal, ngDialog, toastr) {
        
    }
})();