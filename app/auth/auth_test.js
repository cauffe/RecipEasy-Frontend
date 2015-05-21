'use strict';

describe('myApp.auth module', function () {

	beforeEach(module('myApp.auth'));

	describe('login controller', function () {

		it('should ....', inject(function ($controller) {
			var $scope = {};
			var loginCtrl = $controller('LoginCtrl', {$scope: $scope});
			expect(loginCtrl).toBeDefined();
		}));

	});
});