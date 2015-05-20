'use strict';

angular.module('myApp.auth', ['btford.modal', 'ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            template: '<div><h1>You are not logged in.</h1></div>'
        });
    }])

    .factory('loginModal', function (btfModal) {
        return btfModal({
            controller: 'LoginModalCtrl',
            templateUrl: 'components/auth/login-modal.html'
        });
    })

    .service('User', function($http, $q, $rootScope) {
        var user = {};

        user.info = {
            id: '',
            name: ''
        };

        user.getInfo = function() {
            var deferred = $q.defer();

            $http.get(baseURL + 'get-user-info/').then(function (data) {
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

            $http.post(baseURL + 'api-token-auth/', credentials).then(function (data) {
                sessionStorage.setItem('DjangoAuthToken', data.data.token);
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
            user.info = {
                id: '',
                name: ''
            };
            sessionStorage.clear();
        };

        return user
    })

    .controller('LoginModalCtrl', function ($scope, loginModal, User, $location) {
        $scope.closeMe = loginModal.deactivate;

        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.login = function() {
            User.login($scope.credentials).then(function(data){
                $scope.credentials = {
                    username: '',
                    password: ''
                };
                $location.path('/view1');
                $scope.closeMe();
            }, function(data) {
                if (data == 'bad-credentials'){
                    $scope.alerts.push({msg: 'Bad Credentials'})
                } else if ('multiple-users'){
                    $scope.alerts.push({msg: 'Multiple Users'})
                }
            });
        };

        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1)
        };
    });
