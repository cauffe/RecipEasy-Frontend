'use strict';

angular.module('recipEasyApp.recipes')

	.service('Recipe', ['$http', 'baseUrl', '$rootScope',
		function ($http, baseUrl, $rootScope) {
			return {
				getList: function (url) {
					return $http.get(baseUrl + url);
				},

				getPage: function (url) {
					return $http.get(url);
				},

				buildForm: function (recipe) {
					var fd = new FormData();

					if (recipe.photo) fd.append('photo', recipe.photo);

					fd.append('owner', recipe.owner);
					fd.append('name', recipe.name);

					if (recipe.description === undefined) recipe.description = 'No description yet';
					fd.append('description', recipe.description);

					if (recipe.instructions === undefined) recipe.instructions = 'No instructions yet';
					fd.append('instructions', recipe.instructions);

					if (recipe.ingredients != []) {
						for (var key in recipe.ingredients) {
							fd.append('ingredients', recipe.ingredients[key].id)
						}
					}

					if (recipe.favorited_by != []) {
						for (var key in recipe.favorited_by) {
							fd.append('favorited_by', recipe.favorited_by[key])
						}
					}

					return fd
				},

				create: function (recipe) {
					var that = this;
					var recipeForm = this.buildForm(recipe);
					return $http.post(baseUrl + this.urls.create_recipe, recipeForm, {
						transformRequest: angular.identity,
						headers: {'Content-Type': undefined}
					}).success(function () {
						$rootScope.$broadcast(that.updated)
					});
				},

				update: function (recipe) {
					var that = this;
					var recipeForm = this.buildForm(recipe);
					return $http.patch(baseUrl + this.urls.recipes_detail + recipe.id, recipeForm, {
						transformRequest: angular.identity,
						headers: {'Content-Type': undefined}
					}).success(function () {
						$rootScope.$broadcast(that.updated)
					});
				},

				favorite: function (recipe) {
					var patch = {favorited_by: recipe.favorited_by};
					return $http.patch(baseUrl + this.urls.recipes_detail + recipe.id, patch);
				},

				delete: function (id) {
					return $http.delete(baseUrl + this.urls.recipes_detail + id);
				},

				updated: 'recipes-updated',
				urls: {
					recipes_list: 'recipes',
					recipes_detail: 'recipes/',
					my_recipes: 'my-recipes',
					my_favorites: 'my-favorites',
					create_recipe: 'create-recipe'
				}

			}
		}
	]);