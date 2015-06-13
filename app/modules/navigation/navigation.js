'use strict';

angular.module('recipEasyApp.nav', [])

	.directive('navigation', function () {
		return {
			restrict: 'E',
			templateUrl: 'modules/navigation/navigation.html',
			controller: function ($scope, User, RecipeDetailModal, $location, Recipe, $rootScope) {
				$scope.logout = function () {
					User.logout();
					$scope.user = null;
				};

				$scope.$on(User.update_broadcast, function () {
					$scope.user = User.info;
				});

				$scope.search = function () {
					$rootScope.$broadcast(Recipe.search, $scope.recipeQuery);
					$scope.recipeQuery = undefined;
				};

				$scope.isActive = function (viewLocation) {
					return viewLocation === $location.path();
				};

				$scope.createRecipe = RecipeDetailModal.open;

			}
		}
	});