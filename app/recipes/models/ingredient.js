'use strict';

angular.module('recipEasyApp.recipes')

	.service('Ingredient', ['$http', 'baseUrl',
		function ($http, baseUrl) {
			return {
				getList: function () {
					return $http.get(baseUrl + 'ingredients')
				},

				create: function (ingredient) {
					return $http.post(baseUrl + 'ingredients', ingredient)
				},

				update: function (ingredient, id) {
					return $http.put(baseUrl + 'ingredients/' + id, ingredient)
				},

				delete: function (id) {
					return $http.delete(baseUrl + 'ingredients/' + id)
				}

			}
		}]);