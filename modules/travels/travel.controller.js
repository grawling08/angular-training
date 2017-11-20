(function () {
	'use strict';

	angular.module('starter')
		.controller('travelModalCtrl', travelModalCtrl);

	travelModalCtrl.$inject = ['$scope', '$uibModalInstance', 'travelsFactory', 'vehiclesFactory', 'travel_id', 'toastr', '$timeout','$filter', '$state'];

	function travelModalCtrl($scope, $uibModalInstance, travelsFactory, vehiclesFactory, travel_id, toastr, $timeout, $filter, $state) {
		$scope.travel = {};
		$scope.vehicles = {};

		if (!_.isEmpty(travel_id)) {
			travelsFactory.getTravel(travel_id).then(function (data) {
				if (data.statusCode == 200 && data.response.success) {
					var travel = data.response.result;
					if (travel) {
						$scope.travel = travel;
						$scope.travel.departure = new Date($scope.travel.departure);
						$scope.travel.arrival = new Date($scope.travel.arrival);
					}
				} else {
					toastr.error(data.response.msg, 'ERROR');
					return;
				}
			});
		}

		vehiclesFactory.getAllVehicles().then(function (data){
			if (data.statusCode == 200 && data.response.success) {
				var vehicles = data.response.result;
				console.dir(vehicles);
				if (vehicles) {
					$scope.vehicles = vehicles;
				}
			} else {
				toastr.error(data.response.msg, 'ERROR');
				return;
			}
		});

		$scope.departure = {
			datepickerOptions: {
				showWeeks: false,
				startingDay: 1,
				dateDisabled: function(data) {
					return (data.mode === 'day' && (new Date().toDateString() == data.date.toDateString()));
				}
			}
		}
		$scope.arrival = {
			datepickerOptions: {
				showWeeks: false,
				startingDay: 1,
				dateDisabled: function(data) {
					return (data.mode === 'day' && (new Date().toDateString() == data.date.toDateString()));
				}
			}
		}
		$scope.isOpen = false;
		$scope.isOpen2 = false;
		$scope.openCalendar = function(e) {
			e.preventDefault();
			e.stopPropagation();
			$scope.isOpen = true;
		};
		$scope.openCalendar2 = function(e) {
			e.preventDefault();
			e.stopPropagation();
			$scope.isOpen2 = true;
		};

		$scope.saveEntry = function () {
			$scope.travel.departure = $filter('date')($scope.travel.departure, "yyyy-MM-dd HH:mm:ss");
			$scope.travel.arrival = $filter('date')($scope.travel.arrival, "yyyy-MM-dd HH:mm:ss");
			if (_.isEmpty(travel_id)) {
				travelsFactory.saveTravel($scope.travel).then(function (data) {
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
				travelsFactory.updateTravel(travel_id, $scope.travel).then(function (data) {
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