'use strict';

angular.module('recipEasyApp.recipes')

	.service('Ingredient', ['HttpRequest',
		function (HttpRequest) {

			this.getList = function () {
				return HttpRequest.get(this.urls.ingredients_list)
			};

			this.create = function (ingredient) {
				return HttpRequest.post(this.urls.ingredients_list, ingredient)
			};

			this.update = function (ingredient, id) {
				return HttpRequest.put(this.urls.ingredients_detail + id, ingredient)
			};

			this.delete = function (id) {
				return HttpRequest.delete(this.urls.ingredients_detail + id)
			};

			this.urls = {
				ingredients_list: 'ingredients',
				ingredients_detail: 'ingredients/'
			}

		}
	]);