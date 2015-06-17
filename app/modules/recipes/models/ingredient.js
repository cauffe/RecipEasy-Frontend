'use strict';

angular.module('recipEasyApp.recipes')

	.service('Ingredient', ['$http', 'baseUrl',
		function ($http, baseUrl) {

			this.getList = function () {
				return $http.get(baseUrl + this.urls.ingredients_list)
			};

			this.create = function (ingredient) {
				return $http.post(baseUrl + this.urls.ingredients_list, ingredient)
			};

			this.update = function (ingredient, id) {
				return $http.put(baseUrl + this.urls.ingredients_detail + id, ingredient)
			};

			this.delete = function (id) {
				return $http.delete(baseUrl + this.urls.ingredients_detail + id)
			};

			this.urls = {
				ingredients_list: 'ingredients',
				ingredients_detail: 'ingredients/'
			}

		}
	]);