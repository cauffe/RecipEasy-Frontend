'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.auth'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }])

    .controller('AppCtrl', ['$scope', 'User', '$location', '$http', function ($scope, User, $location, $http) {
        if (sessionStorage.getItem(User.token_name)){
            var token = sessionStorage.getItem(User.token_name);
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

        $scope.$on('$routeChangeStart', function() {
            if (User.info.id == undefined){
                $location.path('/login');
            }
        });
    }]);

var baseURL = 'http://localhost:8001/';
