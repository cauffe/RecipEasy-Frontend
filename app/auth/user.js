'use strict';

angular.module('recipEasyApp.auth')

	.service('User', ['$http', '$rootScope', function($http, $rootScope) {
		var user = {};

		user.info = {};

        user.registration = function(user_info) {
            return $http.post(baseURL + user.urls.register_user, user_info).then(function() {
				return user.login(user_info);
			});
        };

        user.login = function(credentials) {
	        return $http.post(baseURL + user.urls.get_token, credentials).then(function(data) {
				sessionStorage.setItem(user.token_name, data.data.token);
				$http.defaults.headers.common.Authorization = 'Token ' + data.data.token;
				return user.getInfo();
			});
		};

		user.getInfo = function() {
			return $http.get(baseURL + user.urls.get_user_info).then(function(data) {
				user.info = data.data;
				$rootScope.$broadcast(user.update_broadcast);
			});
		};

		user.logout = function() {
			user.info = {};
			sessionStorage.removeItem(user.token_name);
            $http.defaults.headers.common.Authorization = '';
		};

		// User constants
		user.token_name = 'auth-token';
		user.update_broadcast = 'user-updated';
		user.urls = {
			get_token: 'obtain-auth-token',
			get_user_info: 'get-user-info',
            register_user: 'register-user'
		};

		return user
	}]);