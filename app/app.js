'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.auth',
    'myApp.version'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }])

    .controller('AppCtrl', function ($scope, loginModal, User, $location) {
        $scope.showLoginModal = loginModal.activate;

        if (sessionStorage.getItem('User')){
            User.info = JSON.parse(sessionStorage.getItem('User'));
            $scope.user = User.info;
            $location.path('/view1');
        }

        if (User.info.id == '') {
            $location.path('/login');
            $scope.showLoginModal()
        }

        $scope.logout = function() {
            User.info = {
                id: '',
                name: ''
            };
            $scope.user = null;
            sessionStorage.clear();
            $location.path('/login');
        };

        $scope.$on("user-updated", function() {
            $scope.user = User.info
        });

        $scope.$on('$routeChangeStart', function() {
            if ((User.info != null && User.info.id == '') || User.info == null){
                $location.path('/login')
            }
        });

    });
