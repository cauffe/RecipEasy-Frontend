'use strict';

angular.module('recipEasyApp.recipes', ['ngRoute', 'ui.bootstrap'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/all-recipes', {
				templateUrl: 'recipes/templates/list-recipes.html',
				controller: 'RecipListCtrl'
			})
			.when('/my-recipes', {
				templateUrl: 'recipes/templates/list-recipes.html',
				controller: 'RecipListCtrl'
			})
	}]);