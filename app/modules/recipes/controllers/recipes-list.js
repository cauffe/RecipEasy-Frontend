'use strict';

angular.module('recipEasyApp.recipes')

	.controller('RecipListCtrl', ['$scope', 'RecipePreviewModal', '$location', 'Recipe', 'User',
		function ($scope, RecipePreviewModal, $location, Recipe, User) {
			var recipesUrl = Recipe.urls.recipes_list;
			if ($location.$$url === '/my-recipes') recipesUrl = Recipe.urls.my_recipes;
			if ($location.$$url === '/my-favorites') recipesUrl = Recipe.urls.my_favorites;

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

			$scope.favorite = function (idx) {
				var recipe = $scope.recipes[idx];
				recipe.favorited_by.push(User.info.id);
				Recipe.favorite(recipe)
			};

			$scope.unFavorite = function (idx) {
				var recipe = $scope.recipes[idx];
				var indx = recipe.favorited_by.indexOf(User.info.id);
				recipe.favorited_by.splice(indx, 1);
				Recipe.favorite(recipe).then(function () {
					if (recipesUrl === Recipe.urls.my_favorites) $scope.recipes.splice(idx, 1);
				})
			};

			$scope.favorited = function (favorited_by) {
				return favorited_by.indexOf(User.info.id) > -1
			};

			$scope.$on(Recipe.search, function (event, search) {
				Recipe.getList(recipesUrl, search).then(function (data) {
					setScope(data);
				});
			});

			$scope.$on(Recipe.updated, function () {
				Recipe.getList(recipesUrl).then(function (data) {
					setScope(data);
				});
			})

		}
	])

	.service('RecipePreviewModal', function ($modal) {
		return {
			open: function (recipe) {
				$modal.open({
					templateUrl: 'modules/recipes/templates/recipe-preview-modal.html',
					controller: function ($scope, $modalInstance, Recipe, RecipeDetailModal, User) {
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

						$scope.copy = function () {
							$modalInstance.dismiss();
							var recipeCopy = angular.copy($scope.rcp);
							recipeCopy.name = recipeCopy.name + ' (Copy)';
							recipeCopy.owner = User.info.id;
							recipeCopy.id = null;
							recipeCopy.photo = null;
							recipeCopy.favorited_by = [];
							RecipeDetailModal.open(recipeCopy);
						};

						$scope.isOwner = function () {
							return recipe.owner === User.info.id
						};

						$scope.deleteRecipe = function () {
							if (confirm('Are you sure you want to delete this recipe?')) {
								Recipe.delete($scope.rcp.id).then(function () {
										$scope.status = 'The recipe was deleted';
										location.reload();
									},
									function () {
										$scope.status = alert('The recipe could not be deleted');
									});
							}
						};

					}
				});
			}
		};
	});