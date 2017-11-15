(function () {
	'use strict';

	angular.module('starter')
		.controller('modelModalCtrl', modelModalCtrl);

	modelModalCtrl.$inject = ['$scope', '$uibModalInstance', 'modelsFactory', 'vehicleTypesFactory', 'model_id', 'toastr', '$timeout','$filter', '$state'];

	function modelModalCtrl($scope, $uibModalInstance, modelsFactory, vehicleTypesFactory, model_id, toastr, $timeout, $filter, $state) {
		$scope.model = {};
		$scope.vtype = {};

		if (!_.isEmpty(model_id)) {
			modelsFactory.getModel(model_id).then(function (data) {
				if (data.statusCode == 200 && data.response.success) {
					var model = data.response.result;
					if (model) {
						$scope.model = model;
					}
				} else {
					toastr.error(data.response.msg, 'ERROR');
					return;
				}
			});
		}

		vehicleTypesFactory.getAllVehicleTypes().then(function (data){
			if (data.statusCode == 200 && data.response.success) {
				var vtype = data.response.result;
				if (vtype) {
					$scope.vtype = vtype;
				}
			} else {
				toastr.error(data.response.msg, 'ERROR');
				return;
			}
		});

		$scope.saveEntry = function () {
			if (_.isEmpty(model_id)) {
				modelsFactory.saveModel($scope.model).then(function (data) {
					if (data.statusCode == 200 && data.response.success) {
						toastr.success(data.response.msg, 'SUCCESS');
						$timeout(function(){
							$uibModalInstance.close('save');
						},1000);
					} else if (!data.success && _.isArray(data.result)) {
						_.each(data.result, function (row) {
							toastr.warning(row.msg, 'WARNING');
						});
						return;
					} else {
						toastr.error(data.response.msg, 'ERROR');
						return;
					}
				})
			} else {
				modelsFactory.updateModel(model_id, $scope.model).then(function (data) {
					if (data.statusCode == 200 && data.response.success) {
						toastr.success(data.response.msg, 'SUCCESS');
						$timeout(function(){
							$uibModalInstance.close('save');
						},1000);
					} else if (!data.success && _.isArray(data.result)) {
						_.each(data.result, function (row) {
							toastr.warning(row.msg, 'WARNING');
						});
						return;
					} else {
						toastr.error(data.response.msg, 'ERROR');
						return;
					}
				})
			}

		}

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		}
	}
})();