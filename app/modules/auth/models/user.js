'use strict';

angular.module('recipEasyApp.auth')

	.service('User', ['HttpRequest', '$rootScope', '$location',
		function (HttpRequest, $rootScope, $location) {

			this.info = {};

			this.registration = function (user_info) {
				var that = this;
				return HttpRequest.post(this.urls.register_user, user_info).then(function () {
					return that.login(user_info);
				});
			};

			this.login = function (credentials) {
				var that = this;
				return HttpRequest.post(this.urls.get_token, credentials).then(function (data) {
					sessionStorage.setItem(that.token_name, data.data.token);
					HttpRequest.setAuthHeader(that.token_type, data.data.token);
					return that.getInfo();
				});
			};

			this.getInfo = function () {
				var that = this;
				return HttpRequest.get(this.urls.get_user_info).then(function (data) {
					that.info = data.data;
					$rootScope.$broadcast(that.update_broadcast);
				});
			};

			this.refreshToken = function () {
				var that = this;
				var token = {"token": sessionStorage.getItem(this.token_name)};
				return HttpRequest.post(this.urls.refresh_token, token).then(function (data) {
					sessionStorage.setItem(that.token_name, data.data.token);
					HttpRequest.setAuthHeader(that.token_type, data.data.token);
				});
			};

			this.verifyToken = function () {
				var that = this;
				var token = {"token": sessionStorage.getItem(this.token_name)};
				return HttpRequest.post(this.urls.verify_token, token).then(function (data) {
					sessionStorage.setItem(that.token_name, data.data.token);
					HttpRequest.setAuthHeader(that.token_type, data.data.token);
				});
			};

			this.logout = function () {
				this.info = {};
				sessionStorage.removeItem(this.token_name);
				HttpRequest.setAuthHeader();
				$location.path('/all-recipes');
			};

			// User constants
			this.token_name = 'auth-token';
			this.token_type = 'JWT';
			this.update_broadcast = 'user-updated';
			this.unauthorized = 'user-unauthorized';
			this.urls = {
				get_token: 'obtain-auth-token',
				refresh_token: 'refresh-auth-token',
				verify_token: 'verify-auth-token',
				get_user_info: 'get-user-info',
				register_user: 'register-user'
			}

		}
	]);