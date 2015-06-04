'use strict';

angular.module('recipEasyApp.recipes', ['ngRoute', 'ui.bootstrap'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/all-recipes', {
				templateUrl: 'recipes/templates/recipes-list.html',
				controller: 'RecipListCtrl'
			})
			.when('/my-recipes', {
				templateUrl: 'recipes/templates/recipes-list.html',
				controller: 'RecipListCtrl'
			})
	}]);