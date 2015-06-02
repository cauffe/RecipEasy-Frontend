'use strict';

angular.module('recipEasyApp.recipes')

	.service('Recipe', function ($http) {
		return {
			delete: function (id) {
				return $http.delete(baseURL + 'recipes/' + id)
			},

			create: function (recipe) {
				return $http.post(baseURL + 'create-recipe', recipe, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				})
			}
		}
	});