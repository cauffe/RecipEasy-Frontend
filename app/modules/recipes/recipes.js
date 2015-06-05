'use strict';

angular.module('recipEasyApp.recipes', ['ngRoute', 'ui.bootstrap'])

	.config(['$routeProvider',
		function ($routeProvider) {
			$routeProvider.when('/all-recipes', {
				templateUrl: 'modules/recipes/templates/recipes-list.html',
				controller: 'RecipListCtrl'
			});

			$routeProvider.when('/my-recipes', {
				templateUrl: 'modules/recipes/templates/recipes-list.html',
				controller: 'RecipListCtrl'
			});

		}
	]);