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

	.controller('RecipeDetailCtrl', ['$scope', '$modalInstance', 'Recipe', 'Ingredient', 'User', 'ngToast', 'rcp', '$location',
		function ($scope, $modalInstance, Recipe, Ingredient, User, ngToast, rcp, $location) {
			var message;

			if (rcp && rcp.id != null) {
				$scope.recipe = rcp;
				$scope.btnText = 'Update Recipe';
				message = 'updated'
			} else if (rcp && rcp.id === null) {
				$scope.recipe = rcp;
				$scope.btnText = 'Add Recipe';
				message = 'created'
			} else {
				$scope.recipe = {
					'owner': User.info.id,
					'ingredients': []
				};
				$scope.btnText = 'Add Recipe';
				message = 'created'
			}

			Ingredient.getList().then(function (data) {
				$scope.ingredients = data.data;
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
					if ($scope.ingredients[i].name === ingredientName) {
						return $scope.ingredients[i];
					}
				}
			};

			$scope.addPhoto = function () {
				var file = $('#photoUpload')[0].files[0];
				var	reader = new FileReader();
				reader.onload = function (e) {
					$scope.recipe.photo = 'data:image/png;base64,' + btoa(e.target.result);
					$scope.$apply();
				};
				reader.readAsBinaryString(file);
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

				var httpMethod = function () {
					if (rcp && rcp.id != null) return Recipe.update($scope.recipe);
					return Recipe.create($scope.recipe)
				};

				httpMethod().then(function () {
					$scope.cancel();
					ngToast.create({
						className: 'success',
						content: 'The recipe was successfully ' + message + '!'
					});
					$location.path('/my-recipes');
				}, function () {
					ngToast.create({
						className: 'danger',
						content: 'The recipe could not be ' + message + '.'
					});
				});
			};

		}
	]);