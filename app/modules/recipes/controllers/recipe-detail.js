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

	.controller('RecipeDetailCtrl', ['$scope', '$modalInstance', '$http', 'Recipe', 'Ingredient', 'User', 'ngToast', 'rcp', '$rootScope',
		function ($scope, $modalInstance, $http, Recipe, Ingredient, User, ngToast, rcp, $rootScope) {
			if (rcp) {
				$scope.recipe = rcp;
				$scope.btnText = 'Update Recipe';
			} else {
				$scope.recipe = {
					'owner': User.info.id,
					'ingredients': []
				};
				$scope.btnText = 'Add Recipe';
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
					if ($scope.ingredients[i].name == ingredientName) {
						return $scope.ingredients[i];
					}
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
				var photo = $('#photoUpload')[0].files[0];

				var fd = new FormData();
				if (photo) fd.append('photo', photo);
				fd.append('owner', $scope.recipe.owner);
				fd.append('name', $scope.recipe.name);
				fd.append('description', $scope.recipe.description);
				fd.append('instructions', $scope.recipe.instructions);

				if ($scope.recipe.ingredients != []) {
					for (var key in $scope.recipe.ingredients)
						fd.append('ingredients', $scope.recipe.ingredients[key].id)
				}

				var succeed = function () {
					$scope.cancel();
					ngToast.create({
						className: 'success',
						content: 'The recipe was successfully ' + message + '!'
					});
					$rootScope.$broadcast(Recipe.updated)
				};

				var fail = function () {
					ngToast.create({
						className: 'danger',
						content: 'The recipe could not be ' + message + '.'
					});
				};

				if (rcp) {
					Recipe.update(fd, rcp.id).then(function () {
						succeed()
					}, function () {
						fail()
					});
					message = 'updated';
				} else {
					Recipe.create(fd).then(function () {
						succeed()
					}, function () {
						fail()
					});
					var message = 'created';
				}

			};
		}
	]);