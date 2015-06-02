'use strict';

angular.module('recipEasyApp.recipes')

	.service('EditRecipeModal', function ($modal) {
		return {
			open: function (recipe) {
				$modal.open({
					templateUrl: 'recipes/templates/edit-recipe-modal.html',
					controller: 'EditRecipeCtrl',
					resolve: {
						rcp: function () {
							return recipe;
						}
					}
				});
			}
		};
	})

	.controller('EditRecipeCtrl', function ($scope, $http, $modalInstance, rcp) {
		$scope.recipe = rcp;

		$http.get(baseURL + 'ingredients').then(function (ingredients) {
			$scope.ingredients = ingredients;
		});

		$scope.addIngredient = function (ingredientName) {
			var ingredient = getIngredientFromName(ingredientName); //check to see if ingredient already exists
			if (ingredient != null) {                               // add ingredient to the recipe
				$scope.recipe.ingredients.push(ingredient);
				$scope.ingredientName = "";
			} else {                                                //create the ingredient and add it to the recipe
				var newIngredient = {name: ingredientName};
				$http.post(baseURL + 'ingredients', newIngredient).then(function (ingredient) {
					$scope.recipe.ingredients.push(ingredient);
					$scope.ingredientName = "";
				});
			}
		};

		var getIngredientFromName = function (ingredientName) {
			for (var i = 0; i < $scope.ingredients.length; i++) {
				var ingredient = $scope.ingredients[i];
				if (ingredient.name == ingredientName) {
					return ingredient;
				}
			}
		};

		$scope.ingredientObjectsToIds = function () {
			for (var i = 0; i < $scope.recipe.ingredients.length; i++) {
				var ingredient = $scope.recipe.ingredients[i];
				$scope.recipe.ingredients[i] = ingredient.id;
			}
		};

		$scope.removeIngredient = function (ingredient) {
			var index = $scope.recipe.ingredients.indexOf(ingredient);
			$scope.recipe.ingredients.splice(index, 1);
		};

		$scope.saveRecipe = function () {
			$scope.ingredientObjectsToIds();
			$http.put(baseURL + 'recipes/' + $scope.recipe.id, $scope.recipe).then(function () {
				$scope.status = alert("The recipe was successfully updated!");
				$scope.recipe = {};
				window.location = '#/all-recipes'
			}, function () {
				$scope.status = alert("The recipe couldn't be updated");
			});
		};
	});