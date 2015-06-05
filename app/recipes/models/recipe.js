'use strict';

angular.module('recipEasyApp.recipes')

	.service('Recipe', ['$http', 'baseUrl',
		function ($http, baseUrl) {
			return {
				getList: function (url) {
					return $http.get(baseUrl + url);
				},

				getPage: function (url) {
					return $http.get(url);
				},

				create: function (recipe) {
					return $http.post(baseUrl + 'create-recipe', recipe, {
						transformRequest: angular.identity,
						headers: {'Content-Type': undefined}
					});
				},

				update: function (recipe, id) {
					return $http.patch(baseUrl + 'recipes/' + id, recipe, {
						transformRequest: angular.identity,
						headers: {'Content-Type': undefined}
					});
				},

				delete: function (id) {
					return $http.delete(baseUrl + 'recipes/' + id);
				}

			}
		}
	]);