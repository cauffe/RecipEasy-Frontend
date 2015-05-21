'use strict';

angular.module('myApp.auth', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
	        controller: 'LoginCtrl',
	        templateUrl: 'components/auth/login.html'
        });
    }])

	.controller('LoginCtrl', function ($scope, User, $location) {
		$scope.credentials = {
			username: '',
			password: ''
		};

		$scope.login = function() {
			User.login($scope.credentials).then(function(){
				$scope.credentials = {
					username: '',
					password: ''
				};
				$location.path('/view1');
			}, function(data) {
				$scope.alerts.push({msg: data.data.non_field_errors[0]})
			});
		};

		$scope.alerts = [];

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1)
		};
	})

    .service('User', function($http, $q, $rootScope) {
        var user = {};

        user.info = {};

        user.getInfo = function() {
            var deferred = $q.defer();

            $http.get(baseURL + user.urls.get_user_info).then(function (data) {
                user.info = data.data;
                $rootScope.$broadcast('user-updated');
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
            sessionStorage.clear();
        };

        user.token_name = 'DjangoAuthToken';

        user.urls = {
            get_token: 'api-token-auth/',
            get_user_info: 'get-user-info/'
        };

        return user
    });
