'use strict';

angular.module('recipEasyApp.recipes')

	.controller('RecipListCtrl', function ($scope, $http, RecipePreviewModal, $location) {
		var recipesUrl = 'recipes';
		if ($location.$$url == '/my-recipes')
			recipesUrl = 'my-recipes';

		$http.get(baseURL + recipesUrl).then(function (recipes) {
			$scope.recipes = recipes.data;
		});

		$scope.openDetailModal = function (idx) {
			RecipePreviewModal.open($scope.recipes[idx]);
		};
	})

	.service('RecipePreviewModal', function ($modal) {
		return {
			open: function (recipe) {
				$modal.open({
					templateUrl: 'recipes/templates/recipe-preview-modal.html',
					controller: function ($scope, $modalInstance, Recipe, RecipeDetailModal) {
						$scope.rcp = recipe;

						$scope.ok = function () {
							$modalInstance.close();
						};

						$scope.cancel = function () {
							$modalInstance.dismiss();
						};

						$scope.edit = function () {
							$modalInstance.dismiss();
							RecipeDetailModal.open($scope.rcp);
						};

						$scope.deleteRecipe = function () {
							if (confirm("Are you sure you want to delete this recipe?")) {
								Recipe.delete($scope.rcp.id).then(function () {
										$scope.status = "The recipe was deleted";
										location.reload();
									},
									function () {
										$scope.status = alert("The recipe couldn't be deleted");
									});
							}
						}
					}
				});
			}
		};
	});