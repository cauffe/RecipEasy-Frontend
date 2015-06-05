'use strict';

angular.module('recipEasyApp.nav', [])

	.directive('navigation', function () {
		return {
			restrict: 'E',
			templateUrl: 'navigation/navigation.html',
			controller: function ($scope, User, RecipeDetailModal, $location) {
				$scope.logout = function () {
					User.logout();
					$scope.user = null;
					$location.path('/all-recipes');
				};

				$scope.$on(User.update_broadcast, function () {
					$scope.user = User.info;
				});

				$scope.isActive = function (viewLocation) {
					return viewLocation === $location.path();
				};

				$scope.createRecipe = RecipeDetailModal.open;

			}
		}
	});