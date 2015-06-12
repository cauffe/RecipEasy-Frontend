'use strict';

angular.module('recipEasyApp.recipes')

	.service('Ingredient', ['$http', 'baseUrl',
		function ($http, baseUrl) {
			return {
				getList: function () {
					return $http.get(baseUrl + this.urls.ingredients_list)
				},

				create: function (ingredient) {
					return $http.post(baseUrl + this.urls.ingredients_detail, ingredient)
				},

				update: function (ingredient, id) {
					return $http.put(baseUrl + this.urls.ingredients_detail + id, ingredient)
				},

				delete: function (id) {
					return $http.delete(baseUrl + this.urls.ingredients_detail + id)
				},

				urls: {
					ingredients_list: 'ingredients',
					ingredients_detail: 'ingredients/'
				}

			}
		}]);