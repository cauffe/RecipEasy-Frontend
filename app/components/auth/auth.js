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

    .controller('LoginModalCtrl', function ($scope, $rootScope, loginModal, Api, User, $location) {
        $scope.closeMe = loginModal.deactivate;

        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.login = function() {
            Api.login($scope.credentials).then(function(data){
                User.info.id = data.id;
                User.info.name = data.name;
                $scope.credentials = {
                    username: '',
                    password: ''
                };
                $rootScope.$broadcast('user-updated');
                sessionStorage.setItem('User', JSON.stringify(User.info));
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
    })

    .factory('User', function() {
        var user = {};
        user.info = {
            id: '',
            name: ''
        };
        return user
    })

    .factory('Api', function($http, $q) {
        return {
            login: function(credentials) {
                var users = [];
                var user = [];

                var deferred = $q.defer();

                $http.get('components/auth/users.json').then(function (data) {
                    users = data.data;

                    for (var i=0; i<users.length; ++i) {
                        if (users[i].username == credentials.username && users[i].password == credentials.password) {
                            user.push(users[i])
                        }
                    }

                    if (user.length == 1) {
                        deferred.resolve(user[0]);
                    } else if (user.length == 0){
                        deferred.reject('bad-credentials')
                    } else if (user.length > 1){
                        deferred.reject('multiple-users')
                    }
                });

                return deferred.promise;
            }
        }
    });



