'use strict';

angular.module('recipEasyApp.recipes')

	.controller('RecipListCtrl', function ($scope, $http, RecipeDetailModal) {
		$http.get(baseURL + 'recipes').then(function (recipes) {
			$scope.recipes = recipes.data;
		});

		$scope.openDetailModal = function (idx) {
			RecipeDetailModal.open($scope.recipes[idx]);
		};
	})

	.service('RecipeDetailModal', function ($modal) {
		return {
			open: function (recipe) {
				$modal.open({
					templateUrl: 'recipes/list_recipes/recipe-detail-modal.html',
					controller: function ($scope, $modalInstance, Recipe, EditRecipeModal) {
						$scope.rcp = recipe;

						$scope.ok = function () {
							$modalInstance.close();
						};

						$scope.cancel = function () {
							$modalInstance.dismiss();
						};

						$scope.edit = function () {
							$modalInstance.dismiss();
							EditRecipeModal.open($scope.rcp);
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