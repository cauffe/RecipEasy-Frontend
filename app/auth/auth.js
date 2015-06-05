'use strict';

angular.module('recipEasyApp.auth', ['ngRoute'])

	.config(['$routeProvider',
		function ($routeProvider) {
			$routeProvider.when('/login', {
				controller: 'LoginCtrl',
				templateUrl: 'auth/templates/login.html'
			});

			$routeProvider.when('/register', {
				controller: 'RegistrationCtrl',
				templateUrl: 'auth/templates/registration.html'
			});

		}
	])

	.controller('LoginCtrl', ['$scope', 'User', '$location',
		function ($scope, User, $location) {
			$scope.credentials = {};

			$scope.login = function () {
				User.login($scope.credentials).then(function () {
					$scope.credentials = {};
					$location.path('/my-recipes');
				});
			};

		}
	])

	.controller('RegistrationCtrl', ['$scope', 'User', '$location',
		function ($scope, User, $location) {
			$scope.user_info = {};

			$scope.register = function () {
				User.registration($scope.user_info).then(function () {
					$scope.user_info = {};
					$location.path('/my-recipes');
				});
			};

		}
	]);
