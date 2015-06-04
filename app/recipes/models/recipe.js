'use strict';

angular.module('recipEasyApp.recipes')

	.service('Recipe', function ($http) {
		return {
			create: function (recipe) {
				return $http.post(baseURL + 'create-recipe', recipe, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				})
			},

			update: function (recipe, id) {
				return $http.patch(baseURL + 'recipes/' + id, recipe, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				})
			},

			delete: function (id) {
				return $http.delete(baseURL + 'recipes/' + id)
			}
		}
	});