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
					return $http.post(baseUrl + 'create-recipe', recipeForm, {
						transformRequest: angular.identity,
						headers: {'Content-Type': undefined}
					}).success(function () {
						$rootScope.$broadcast(that.updated)
					});
				},

				update: function (recipe) {
					var that = this;
					var recipeForm = this.buildForm(recipe);
					return $http.put(baseUrl + 'recipes/' + recipe.id, recipeForm, {
						transformRequest: angular.identity,
						headers: {'Content-Type': undefined}
					}).success(function () {
						$rootScope.$broadcast(that.updated)
					});
				},

				favorite: function (recipe) {
					var recipeForm = this.buildForm(recipe);
					return $http.put(baseUrl + 'recipes/' + recipe.id, recipeForm, {
						transformRequest: angular.identity,
						headers: {'Content-Type': undefined}
					});
				},

				delete: function (id) {
					return $http.delete(baseUrl + 'recipes/' + id);
				},

				updated: 'recipes-updated'

			}
		}
	]);