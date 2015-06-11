'use strict';

angular.module('recipEasyApp.auth')

	.service('User', ['$http', '$rootScope', 'baseUrl', '$location',
		function ($http, $rootScope, baseUrl, $location) {
			return {
				info: {},

				registration: function (user_info) {
					var that = this;
					return $http.post(baseUrl + this.urls.register_user, user_info).then(function () {
						return that.login(user_info);
					});
				},

				login: function (credentials) {
					var that = this;
					return $http.post(baseUrl + this.urls.get_token, credentials).then(function (data) {
						sessionStorage.setItem(that.token_name, data.data.token);
						$http.defaults.headers.common.Authorization = 'JWT ' + data.data.token;
						return that.getInfo();
					});
				},

				getInfo: function () {
					var that = this;
					return $http.get(baseUrl + this.urls.get_user_info).then(function (data) {
						that.info = data.data;
						$rootScope.$broadcast(that.update_broadcast);
					});
				},

				refreshToken: function () {
					var that = this;
					var token = {"token": sessionStorage.getItem(this.token_name)};
					return $http.post(baseUrl + this.urls.refresh_token, token).then(function (data) {
						sessionStorage.setItem(that.token_name, data.data.token);
						$http.defaults.headers.common.Authorization = 'JWT ' + data.data.token;
					});
				},

				verifyToken: function () {
					var that = this;
					var token = {"token": sessionStorage.getItem(this.token_name)};
					return $http.post(baseUrl + this.urls.verify_token, token).then(function (data) {
						sessionStorage.setItem(that.token_name, data.data.token);
						$http.defaults.headers.common.Authorization = 'JWT ' + data.data.token;
					});
				},

				logout: function () {
					this.info = {};
					sessionStorage.removeItem(this.token_name);
					$http.defaults.headers.common.Authorization = '';
					$location.path('/all-recipes');
				},

				// User constants
				token_name: 'auth-token',
				update_broadcast: 'user-updated',
				urls: {
					get_token: 'obtain-auth-token',
					refresh_token: 'refresh-auth-token',
					verify_token: 'verify-auth-token',
					get_user_info: 'get-user-info',
					register_user: 'register-user'
				}

			}
		}
	]);