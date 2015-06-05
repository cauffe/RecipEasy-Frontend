'use strict';

/* App */

angular.module('recipEasyApp', [
	'ngRoute',
	'ngAnimate',
	'ngToast',
	'recipEasyApp.auth',
	'recipEasyApp.recipes'
])

	.config(['$routeProvider', 'ngToastProvider', function ($routeProvider, ngToastProvider) {
		$routeProvider
			.otherwise({
				redirectTo: '/all-recipes'
			});
		ngToastProvider.configure({
			animation: 'slide', // or 'fade'
			verticalPosition: 'top',
			horizontalPosition: 'center',
			maxNumber: 3
		});

	}])

	.controller('AppCtrl', ['$scope', 'User', '$location', '$http', 'RecipeDetailModal',
		function ($scope, User, $location, $http, RecipeDetailModal) {
			var token = sessionStorage.getItem(User.token_name);

			if (token) {
				$http.defaults.headers.common.Authorization = 'Token ' + token;
				User.getInfo().then(function () {
					$location.path('/my-recipes');
				});
			}

			$scope.logout = function () {
				User.logout();
				$scope.user = null;
				$location.path('/all-recipes');
			};

			$scope.$on(User.update_broadcast, function () {
				$scope.user = User.info;
			});

			$scope.isActive = function (viewLocation) {
				return viewLocation === $location.path();
			};

			$scope.$on('$routeChangeStart', function (event, next) {
				if (next.$$route != undefined) {
					var nextRoute = next.$$route.originalPath;
					if (User.info.id === undefined && (nextRoute != '/register' && nextRoute != '/login' && nextRoute != '/all-recipes')) {
						$location.path('/login');
					}
				}
			});

			$scope.createRecipe = RecipeDetailModal.open;
		}]);

// $http service constant
var baseURL = 'http://localhost:8001/';