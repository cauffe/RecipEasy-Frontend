'use strict';

angular.module('recipEasyApp.recipes')

	.service('CreateRecipeModal', function ($modal) {
		return {
			open: function () {
				$modal.open({
					templateUrl: 'recipes/create_recipe/create-recipe-modal.html',
					controller: 'CreateRecipeCtrl'
				});
			}
		};
	})

	.controller('CreateRecipeCtrl', function ($scope, $modalInstance, $http, Recipe, User, ngToast) {
		$scope.recipe = {
			'owner': User.info.id,
			'ingredients': []
		};

		$scope.status = null;
		$scope.ingredientName = '';

		$http.get(baseURL + 'ingredients').then(function (ingredients) {
			$scope.ingredients = ingredients.data;
		});

		$scope.addIngredient = function () {
			var ingredient = getIngredientFromName($scope.ingredientName);
			if (ingredient != undefined) {
				$scope.recipe.ingredients.push(ingredient);
				$scope.ingredientName = '';
			} else {
				var newIngredient = {name: $scope.ingredientName};
				$http.post(baseURL + 'ingredients', newIngredient).then(function (data) {
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
			$modalInstance.dismiss();
		};

		$scope.saveNewRecipe = function () {
			$scope.recipe.photo =  $('#photoUpload')[0].files[0];
			$scope.ingredientObjectsToIds();

			var fd = new FormData();
			for (var key in $scope.recipe)
				fd.append(key, $scope.recipe[key])

			Recipe.create(fd).then(function () {
				ngToast.create({
					className: 'success',
					content: 'The recipe was successfully created!'
				});
				$scope.cancel();
				window.location = '#/all-recipes';
			}, function () {
				ngToast.create({
					className: 'danger',
					content: 'The recipe could not be created.'});
			});
		};
	});