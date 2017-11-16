(function () {
	'use strict';

	angular.module('starter')
		.controller('modelModalCtrl', modelModalCtrl);

	modelModalCtrl.$inject = ['$scope', '$uibModalInstance', 'modelsFactory', 'makesFactory', 'model_id', 'toastr', '$timeout','$filter', '$state'];

	function modelModalCtrl($scope, $uibModalInstance, modelsFactory, makesFactory, model_id, toastr, $timeout, $filter, $state) {
		$scope.model = {};
		$scope.make = {};

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

		makesFactory.getAllMake().then(function (data) {
			if (data.statusCode == 200 && data.response.success) {
				var make = data.response.result;
				console.dir(make);
				if (make) {
					$scope.make = make;
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