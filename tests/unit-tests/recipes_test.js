'use strict';

describe('recipEasyApp.recipes module', function () {

	beforeEach(function () {
		module('recipEasyApp.recipes');
		module(function($provide) {
			$provide.value('baseUrl', 'baseUrl');
		});
	});

	it('should have a baseUrl value provider', function () {
		inject(function (baseUrl) {
			expect(baseUrl).toEqual('baseUrl');
		});
	});

	describe('RecipListCtrl controller', function () {
		var $scope, ctrl;

		beforeEach(inject(function($controller, $rootScope) {
			$scope = $rootScope.$new();
			ctrl = $controller('RecipListCtrl', {$scope: $scope});
		}));

		it('should have controller defined', function () {
			expect(ctrl).toBeDefined();
		});

	});
});