'use strict';

angular.module('recipEasyApp.auth', ['ngRoute'])

	.config(['$routeProvider',
		function ($routeProvider) {
			$routeProvider.when('/login', {
				controller: 'LoginCtrl',
				templateUrl: 'modules/auth/templates/login.html'
			});

			$routeProvider.when('/register', {
				controller: 'RegistrationCtrl',
				templateUrl: 'modules/auth/templates/registration.html'
			});

		}
	]);