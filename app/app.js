'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
	'myApp.auth',
    'myApp.view1',
    'myApp.view2'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }])

    .controller('AppCtrl', ['$scope', 'User', '$location', '$http', function ($scope, User, $location, $http) {
		var token = sessionStorage.getItem(User.token_name);

		if (token){
            $http.defaults.headers.common.Authorization = 'Token ' + token;
            User.getInfo().then(function(){
	            $location.path('/view1');
            });
        }

        $scope.logout = function() {
            User.logout();
            $scope.user = null;
            $location.path('/login');
        };

        $scope.$on(User.update_broadcast, function() {
            $scope.user = User.info;
        });

        $scope.$on('$routeChangeStart', function(event, next) {
            if (User.info.id === undefined && next.$$route.originalPath != ('/register' || '/login')) {
                $location.path('/login');
            }
        });
    }]);

// $http service constant
var baseURL = 'http://localhost:8001/';
