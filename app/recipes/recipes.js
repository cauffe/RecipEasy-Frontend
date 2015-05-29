'use strict';

angular.module('recipEasyApp.recipes', ['ngRoute', 'ui.bootstrap'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/all-recipes', {
				templateUrl: 'recipes/list_recipes/list-recipes.html',
				controller: 'RecipListCtrl'
			})
			.when('/my-recipes', {
				templateUrl: 'recipes/list_recipes/list-recipes.html',
				controller: 'RecipListCtrl'
			})
			.when('/create-recipe', {
				templateUrl: 'recipes/create_recipe/create-recipe.html',
				controller: ''
			})
			.when('/edit-recipe', {
				templateUrl: 'recipes/edit_recipe/edit-recipe.html',
				controller: ''
			})
	}])

	.factory('queryService', function () {
		return {
			query: ''
		};
	})

	.factory('editService', function () {
		return {
			recipe: ''
		};
	});