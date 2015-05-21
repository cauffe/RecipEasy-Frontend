'use strict';

angular.module('myApp.auth')

	.service('User', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
		var user = {};

		user.info = {};

		user.getInfo = function() {
			var deferred = $q.defer();

			$http.get(baseURL + user.urls.get_user_info).then(function (data) {
				user.info = data.data;
				$rootScope.$broadcast(user.update_broadcast);
				deferred.resolve();
			}, function(error){
				deferred.reject(error)
			});

			return deferred.promise;
		};

		user.login = function(credentials) {
			var deferred = $q.defer();

			$http.post(baseURL + user.urls.get_token, credentials).then(function (data) {
				sessionStorage.setItem(user.token_name, data.data.token);
				$http.defaults.headers.common.Authorization = 'Token ' + data.data.token;
				user.getInfo().then(function(){
					deferred.resolve();
				});
			}, function(error){
				deferred.reject(error)
			});

			return deferred.promise;
		};

		user.logout = function() {
			user.info = {};
			sessionStorage.removeItem(user.token_name);
		};

		// USER CONSTANTS
		user.token_name = 'auth-token';
		user.update_broadcast = 'user-updated';
		user.urls = {
			get_token: 'obtain-auth-token/',
			get_user_info: 'get-user-info/'
		};

		return user
	}]);