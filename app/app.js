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

    .controller('AppCtrl', function ($scope, loginModal, User, $location, $http) {
        $scope.showLoginModal = loginModal.activate;
		$scope.closeMe = loginModal.deactivate;

        if (sessionStorage.getItem('DjangoAuthToken')){
            var token = sessionStorage.getItem('DjangoAuthToken');
            var last_page = sessionStorage.getItem('last_page');
            $http.defaults.headers.common.Authorization = 'Token ' + token;
            User.getInfo().then(function(){
                $scope.user = User.info;
                $location.path(last_page);
            });
        }

        if (User.info.id == '') {
            $location.path('/login');
            $scope.showLoginModal()
        }

        $scope.logout = function() {
            User.logout();
            $scope.user = null;
            $location.path('/login');
	        $scope.showLoginModal()
        };

        $scope.$on("user-updated", function() {
            $scope.user = User.info;
	        $scope.closeMe()
        });

        $scope.$on('$routeChangeStart', function() {
            if ((User.info != null && User.info.id == '') || User.info == null){
                $location.path('/login');
	            $scope.showLoginModal()
            }
        });

    });

var baseURL = 'http://localhost:8001/';
