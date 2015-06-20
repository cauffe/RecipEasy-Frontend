'use strict';

angular.module('recipEasyApp.auth')

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