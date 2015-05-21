'use strict';

angular.module('myApp.auth', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
	        controller: 'LoginCtrl',
	        templateUrl: 'auth/login.html'
        });
    }])

	.controller('LoginCtrl', ['$scope', 'User', '$location', function ($scope, User, $location) {
		$scope.credentials = {};

		$scope.login = function() {
			User.login($scope.credentials).then(function(){
				$scope.credentials = {};
				$location.path('/view1');
			}, function(data) {
				$scope.alerts.push({msg: data.data.non_field_errors[0]})
			});
		};

		$scope.alerts = [];

		$scope.closeAlert = function(index) {
			$scope.alerts.splice(index, 1)
		};
	}]);
