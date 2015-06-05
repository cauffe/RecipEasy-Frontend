'use strict';

angular.module('recipEasyApp.recipes')

	.service('RecipeDetailModal', ['$modal', function ($modal) {
		return {
			open: function (recipe) {
				$modal.open({
					templateUrl: 'modules/recipes/templates/recipe-detail-modal.html',
					controller: 'RecipeDetailCtrl',
					resolve: {
						rcp: function () {
							return recipe;
						}
					}
				});
			}
		};
	}])

	.controller('RecipeDetailCtrl', ['$scope', '$modalInstance', '$http', 'Recipe', 'Ingredient', 'User', 'ngToast', 'rcp',
		function ($scope, $modalInstance, $http, Recipe, Ingredient, User, ngToast, rcp) {
			$scope.recipe = {
				'owner': User.info.id,
				'ingredients': []
			};

			$scope.btnText = 'Add Recipe';

			if (rcp) {
				$scope.recipe = rcp;
				$scope.btnText = 'Update Recipe';
			}

			Ingredient.getList().then(function (ingredients) {
				$scope.ingredients = ingredients.data;
			});

			$scope.addIngredient = function () {
				var ingredient = getIngredientFromName($scope.ingredientName);
				if (ingredient != undefined) {
					$scope.recipe.ingredients.push(ingredient);
					$scope.ingredientName = '';
				} else {
					var newIngredient = {name: $scope.ingredientName};
					Ingredient.create(newIngredient).then(function (data) {
						$scope.recipe.ingredients.push(data.data);
						$scope.ingredients.push(data.data);
						$scope.ingredientName = '';
					});
				}
			};

			var getIngredientFromName = function (ingredientName) {
				for (var i = 0; i < $scope.ingredients.length; i++) {
					if ($scope.ingredients[i].name == ingredientName) {
						return $scope.ingredients[i];
					}
				}
			};

			$scope.ingredientObjectsToIds = function () {
				for (var i = 0; i < $scope.recipe.ingredients.length; i++) {
					$scope.recipe.ingredients[i] = $scope.recipe.ingredients[i].id;
				}
			};

			$scope.removeIngredient = function (idx) {
				$scope.recipe.ingredients.splice(idx, 1);
			};

			$scope.cancel = function () {
				$('#recipeForm')[0].reset();
				$scope.recipe = {};
				$modalInstance.close();
			};

			$scope.saveRecipe = function () {
				$scope.recipe.photo = $('#photoUpload')[0].files[0];

				if ($scope.recipe.ingredients != [])
					$scope.ingredientObjectsToIds();

				var fd = new FormData();
				for (var key in $scope.recipe)
					fd.append(key, $scope.recipe[key])

				var httpMethod = Recipe.create(fd);
				var message = 'created';

				if (rcp) {
					httpMethod = Recipe.update(fd, rcp.id);
					message = 'updated';
				}

				httpMethod.then(function () {
					$scope.cancel();
					ngToast.create({
						className: 'success',
						content: 'The recipe was successfully ' + message + '!'
					});

				}, function () {
					ngToast.create({
						className: 'danger',
						content: 'The recipe could not be ' + message + '.'
					});
				});

			};
		}
	]);