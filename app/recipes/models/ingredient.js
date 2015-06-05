'use strict';

angular.module('recipEasyApp.recipes')

	.service('Ingredient', ['$http', function ($http) {
		return {
			getList: function(){
				return $http.get(baseURL + 'ingredients')
			},

			create: function (ingredient) {
				return $http.post(baseURL + 'ingredients', ingredient)
			},

			update: function (ingredient, id) {
				return $http.put(baseURL + 'ingredients/' + id, ingredient)
			},

			delete: function (id) {
				return $http.delete(baseURL + 'ingredients/' + id)
			}
		}
	}]);