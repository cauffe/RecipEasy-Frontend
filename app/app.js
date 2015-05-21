'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.auth',
    'myApp.version'
])
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
        $httpProvider.defaults.baseUrl = "http://localhost:8001"
    }])

    .controller('AppCtrl', function ($scope,User, $location, $http) {
        if (sessionStorage.getItem('DjangoAuthToken')){
            var token = sessionStorage.getItem('DjangoAuthToken');
            $http.defaults.headers.common.Authorization = 'Token ' + token;
            User.getInfo().then(function(){
                $scope.user = User.info;
	            $location.path('/view1');
            });
        }

        if (User.info.id == '') {
            $location.path('/login');
        }

        $scope.logout = function() {
            User.logout();
            $scope.user = null;
            $location.path('/login');
        };

        $scope.$on("user-updated", function() {
            $scope.user = User.info;
        });

        $scope.$on('$routeChangeStart', function() {
            if ((User.info != null && User.info.id == undefined) || User.info == null){
                $location.path('/login');
            }
        });

    });

var baseURL = 'http://localhost:8001/';
