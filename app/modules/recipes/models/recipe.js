'use strict';

angular.module('recipEasyApp.recipes')

	.service('Recipe', ['$http', 'baseUrl', '$rootScope',
		function ($http, baseUrl, $rootScope) {

			this.getList = function (url, search) {
				return $http.get(baseUrl + url, {params: {search: search}});
			};

			this.getPage = function (url) {
				return $http.get(url);
			};

			var buildForm = function (recipe) {
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
			};

			this.create = function (recipe) {
				var that = this;
				var recipeForm = buildForm(recipe);
				return $http.post(baseUrl + this.urls.create_recipe, recipeForm, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				}).then(function () {
					$rootScope.$broadcast(that.updated)
				});
			};

			this.update = function (recipe) {
				var that = this;
				var recipeForm = buildForm(recipe);
				return $http.patch(baseUrl + this.urls.recipes_detail + recipe.id, recipeForm, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				}).then(function () {
					$rootScope.$broadcast(that.updated)
				});
			};

			this.favorite = function (recipe) {
				var patch = {favorited_by: recipe.favorited_by};
				return $http.patch(baseUrl + this.urls.recipes_detail + recipe.id, patch);
			};

			this.delete = function (id) {
				return $http.delete(baseUrl + this.urls.recipes_detail + id);
			};

			this.updated = 'recipes-updated';
			this.search = 'recipes-search';
			this.urls = {
				recipes_list: 'recipes',
				recipes_detail: 'recipes/',
				my_recipes: 'my-recipes',
				my_favorites: 'my-favorites',
				create_recipe: 'create-recipe'
			}

		}
	]);