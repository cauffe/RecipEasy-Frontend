'use strict';

angular.module('recipEasyApp.auth', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/login', {
	            controller: 'LoginCtrl',
	            templateUrl: 'auth/templates/login.html'
            })
            .when('/register', {
	            controller: 'RegistrationCtrl',
	            templateUrl: 'auth/templates/registration.html'
            });
    }])

	.controller('LoginCtrl', ['$scope', 'User', '$location', function ($scope, User, $location) {
		$scope.credentials = {};

		$scope.login = function() {
			User.login($scope.credentials).then(function() {
				$scope.credentials = {};
				$location.path('/my-recipes');
			}, function(data) {
				$scope.alerts.push({msg: data.data.non_field_errors[0]})
			});
		};

		$scope.alerts = [];

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1)
		};
	}])

    .controller('RegistrationCtrl', ['$scope', 'User', '$location', function ($scope, User, $location) {
		$scope.user_info = {};

		$scope.register = function() {
			User.registration($scope.user_info).then(function() {
				$scope.user_info = {};
				$location.path('/my-recipes');
			}, function(data) {
				$scope.alerts.push({msg: data.data.non_field_errors[0]})
			});
		};

		$scope.alerts = [];

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1)
		};
	}]);
