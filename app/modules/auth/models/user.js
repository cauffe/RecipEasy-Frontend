'use strict';

angular.module('recipEasyApp.auth')

	.service('User', ['$http', '$rootScope', 'baseUrl',
		function ($http, $rootScope, baseUrl) {
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
						$http.defaults.headers.common.Authorization = 'Token ' + data.data.token;
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

				logout: function () {
					this.info = {};
					sessionStorage.removeItem(this.token_name);
					$http.defaults.headers.common.Authorization = '';
				},

				// User constants
				token_name: 'auth-token',
				update_broadcast: 'user-updated',
				urls: {
					get_token: 'obtain-auth-token',
					get_user_info: 'get-user-info',
					register_user: 'register-user'
				}

			}
		}
	]);