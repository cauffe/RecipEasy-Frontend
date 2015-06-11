'use strict';

/* App */

angular.module('recipEasyApp', [
	'ngRoute',
	'ngAnimate',
	'ngToast',
	// Modules
	'recipEasyApp.auth',
	'recipEasyApp.nav',
	'recipEasyApp.recipes'
])

	.config(['$routeProvider', 'ngToastProvider', '$provide', '$httpProvider',
		function ($routeProvider, ngToastProvider, $provide, $httpProvider) {
			$routeProvider.otherwise({
				redirectTo: '/all-recipes'
			});

			ngToastProvider.configure({
				animation: 'slide', // or 'fade'
				verticalPosition: 'top',
				horizontalPosition: 'center',
				maxNumber: 3
			});

			$provide.factory('HttpErrorInterceptor', function ($q, ngToast) {
				function notifyError(msg) {
					ngToast.create({
						className: 'danger',
						content: msg
					});
				}

				return {
					requestError: function (rejection) {
						var msg = rejection.data.non_field_errors[0];
						notifyError(msg);
						return $q.reject(rejection);
					},

					responseError: function (rejection) {
						var msg;
						if (rejection.data === null) {
							msg = 'Server not responding.';
						} else {
							msg = rejection.data.non_field_errors[0];
						}
						notifyError(msg);
						return $q.reject(rejection);
					}
				};
			});

			$httpProvider.interceptors.push('HttpErrorInterceptor')

		}
	])

	// API Url
	.value('baseUrl', 'http://localhost:8001/')

	.controller('AppCtrl', ['$scope', 'User', '$location', '$http',
		function ($scope, User, $location, $http) {
			var token = sessionStorage.getItem(User.token_name);
			var reauthAttempt = false;

			if (token) {
				$http.defaults.headers.common.Authorization = 'JWT ' + token;
				User.getInfo().then(function () {
					reauthAttempt = true
				}, function () {
					reauthAttempt = true
				});
			}

			$scope.$on('$routeChangeStart', function (event, next) {
				if (next.$$route != undefined) {
					var nextRoute = next.$$route.originalPath;
					if (User.info.id === undefined && (nextRoute != '/register' && nextRoute != '/login' && nextRoute != '/all-recipes')) {
						if (reauthAttempt) $location.path('/login');
					}

					if (User.info.id != undefined && token){
						User.refreshToken()
					}
				}
			});

		}
	]);