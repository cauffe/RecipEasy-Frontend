'use strict';

angular.module('recipEasyApp.recipes')

	.controller('RecipListCtrl', function ($scope, $http, queryService) {
		$scope.query = queryService;
		$http.get(baseURL + 'recipes/').then(function (recipes) {
			$scope.recipes = recipes;
		});
	})

	.controller('RecipeDetailCtrl', function ($scope, $http) {
		$scope.deleteRecipe = function (id) {
			if (confirm("Are you sure you want to delete this recipe?")) {
				$http.delete('recipes/' + id).then(function () {
					$scope.status = "The recipe was deleted";
					location.reload();
				},
				function () {
					$scope.status = alert("The recipe couldn't be deleted");
				});
			}
		};
	});