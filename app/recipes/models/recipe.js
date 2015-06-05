'use strict';

angular.module('recipEasyApp.recipes')

	.service('Recipe', ['$http', function ($http) {
		return {
			getList: function(url){
				return $http.get(baseURL + url)
			},

			getPage: function(url){
				return $http.get(url)
			},

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
	}]);