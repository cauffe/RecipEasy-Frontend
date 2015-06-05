'use strict';

angular.module('recipEasyApp.recipes')

	.controller('RecipListCtrl', ['$scope', 'RecipePreviewModal', '$location', 'Recipe',
		function ($scope, RecipePreviewModal, $location, Recipe) {
			var recipesUrl = 'recipes';
			if ($location.$$url === '/my-recipes')
				recipesUrl = 'my-recipes';

			var setScope = function (data) {
				$scope.recipes = data.data.results;
				$scope.next = data.data.next;
				$scope.previous = data.data.previous;
			};

			Recipe.getList(recipesUrl).then(function (data) {
				setScope(data);
			});

			$scope.loadPage = function (page) {
				Recipe.getPage(page).then(function(data){
					setScope(data);
				})
			};

			$scope.openDetailModal = function (idx) {
				RecipePreviewModal.open($scope.recipes[idx]);
			};

		}
	])

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
						};

					}
				});
			}
		};
	});