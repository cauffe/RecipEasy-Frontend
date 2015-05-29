'use strict';

angular.module('recipEasyApp.recipes')

	.controller('ModalCtrl', function ($scope, $modal) {
		$scope.open = function (recipe) {
			$modal.open({
				templateUrl: 'detailModal.html',
				controller: 'ModalInstanceCtrl',
				resolve: {
					rcp: function () {
						return recipe;
					}
				}
			});
		};
	})

	.controller('ModalInstanceCtrl', function ($scope, $modalInstance, editService, rcp) {
		$scope.rcp = rcp;
		editService.recipe = rcp;
		$scope.ok = function () {
			$modalInstance.close();
		};
		$scope.cancel = function () {
			$modalInstance.dismiss();
		};
		$scope.edit = function () {
			$modalInstance.dismiss();
			window.location = '#/edit-recipe'
		};
	});