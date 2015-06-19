'use strict';

/* App */

angular.module('recipEasyApp', [
	'ngRoute',
	'ngAnimate',
	'ngToast',
	'http.request',
	// Modules
	'recipEasyApp.auth',
	'recipEasyApp.nav',
	'recipEasyApp.recipes'
])

	.config(['$routeProvider', 'ngToastProvider', '$provide', '$httpProvider', 'HttpRequestProvider',
		function ($routeProvider, ngToastProvider, $provide, $httpProvider, HttpRequestProvider) {
			$routeProvider.otherwise({
				redirectTo: '/all-recipes'
			});

			ngToastProvider.configure({
				animation: 'slide', // or 'fade'
				verticalPosition: 'top',
				horizontalPosition: 'center',
				maxNumber: 3
			});

			$httpProvider.interceptors.push(function($q, ngToast, $rootScope) {
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
						} else if (rejection.data.non_field_errors) {
							msg = rejection.data.non_field_errors[0];
						} else {
							msg = rejection.data.detail
						}

						if (rejection.status === 400 && rejection.data.non_field_errors[0] == 'Signature has expired.') {
							return
						}

						if (rejection.status === 401) {
							$rootScope.$broadcast('user-unauthorized')
						}

						notifyError(msg);

						return $q.reject(rejection);
					}

				};
			});

			HttpRequestProvider.setUrlBase('http://localhost:8001/');

		}
	])

	.controller('AppCtrl', ['$scope', 'User', '$location', '$http',
		function ($scope, User, $location, $http) {
			var token = sessionStorage.getItem(User.token_name);
			var reauthAttempt = false;

			if (token) {
				$http.defaults.headers.common.Authorization = 'JWT ' + token;
				User.getInfo().then(function () {
					reauthAttempt = true
				}, function () {
					sessionStorage.removeItem(User.token_name);
					reauthAttempt = true
				});
			}

			$scope.$on(User.unauthorized, function () {
				$scope.user = null;
				User.info = {};
				$location.path('/login').search('returnTo', $location.path());
			});

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