'use strict';

describe('recipEasyApp module', function () {

	beforeEach(module('recipEasyApp'));

	describe('AppCtrl controller', function () {
		var $scope, ctrl, User;

		beforeEach(inject(function ($controller, _User_, $rootScope) {
			User = _User_;
			$scope = $rootScope.$new();
			ctrl = $controller('AppCtrl', {$scope: $scope, User: User});
		}));

		it('should have controller defined', function () {
			expect(ctrl).toBeDefined();
		});
	});
});