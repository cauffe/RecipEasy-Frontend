'use strict';

describe('recipEasyApp.auth module', function () {

	beforeEach(function () {
		module('recipEasyApp.auth');
		module(function($provide) {
			$provide.value('baseUrl', 'baseUrl');
		});
	});

	it('should have a baseUrl value provider', function () {
		inject(function (baseUrl) {
			expect(baseUrl).toEqual('baseUrl');
		});
	});

	describe('LoginCtrl controller', function () {
		var $scope, ctrl, User;

		beforeEach(inject(function($controller, _User_, $rootScope) {
			User = _User_;
			$scope = $rootScope.$new();
			ctrl = $controller('LoginCtrl', {$scope: $scope, User: User});
		}));

		it('should have controller defined', function () {
			expect(ctrl).toBeDefined();
		});

		it('$scope.login() should have called the User.login() function', inject(function($q, $httpBackend){
			var deferredSuccess = $q.defer();

			$scope.credentials = {username: 'test', password: 'test'};

			$httpBackend.whenPOST('http://localhost:8001/obtain-auth-token/').respond({
				status: 200,
				data: {
					token: '0984313451098345',
					id: 1
				}
			});

			spyOn(User, 'login').andReturn(deferredSuccess.promise);

			$scope.login();

			expect(User.login).toHaveBeenCalled()

		}));
	});

	describe('RegistrationCtrl controller', function () {
		var $scope, ctrl, User;

		beforeEach(inject(function($controller, _User_, $rootScope) {
			$scope = $rootScope.$new();
			User = _User_;
			ctrl = $controller('RegistrationCtrl', {$scope: $scope, User: User});
		}));

		it('should have controller defined', function () {
			expect(ctrl).toBeDefined();
		});

		it('should have $scope.user_info set to empty object', function(){
			expect($scope.user_info).toEqual({});
		});

	});
});