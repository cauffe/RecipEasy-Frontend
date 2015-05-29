'use strict';

angular.module('recipEasyApp.recipes')

	.controller('AddRecipeCtrl', function($scope, $http) {
		$scope.recipe = { "ingredients": [] };
		$scope.status = null;
		$http.all('ingredients').getList().then(function (ingredients) {
			$scope.ingredients = ingredients;
		});

		$scope.addIngredient = function(ingredientName) {
			var ingredient = getIngredientFromName(ingredientName); //check to see if ingredient already exists
			if (ingredient != null) {                               // add ingredient to the recipe
				$scope.recipe.ingredients.push(ingredient);
				$scope.ingredientName = "";
			} else {                                                //create the ingredient and add it to the recipe
				var newIngredient = {name: ingredientName};
				$http.all('ingredients').customPOST(newIngredient).then(function(ingredient) {
					$scope.recipe.ingredients.push(ingredient);
					$scope.ingredientName = "";
				});
			}
		};

		var getIngredientFromName = function(ingredientName) {
			for (var i = 0; i < $scope.ingredients.length; i++) {
				var ingredient = $scope.ingredients[i];
				if (ingredient.name == ingredientName) {
					return ingredient;
				}
			}
		};

		$scope.ingredientObjectsToIds = function() {
			for (var i = 0; i < $scope.recipe.ingredients.length; i++) {
				var ingredient = $scope.recipe.ingredients[i];
				$scope.recipe.ingredients[i] = ingredient.id;
			}
		};

		$scope.removeIngredient = function(ingredient) {
			var index = $scope.recipe.ingredients.indexOf(ingredient);
			$scope.recipe.ingredients.splice(index, 1);
		};

		$scope.saveNewRecipe = function () {
			$scope.ingredientObjectsToIds();
			$http.all('create-recipe').customPOST($scope.recipe).then(function () {
				$scope.status = alert("The recipe was successfully created!");
				$scope.recipe = { "ingredients": [] };
				window.location = '#/all-recipes';
			}, function () {
				$scope.status = alert("The recipe couldn't be created.");
			});
		};
	});