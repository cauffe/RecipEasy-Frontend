'use strict';

angular.module('http.request', [])

	.provider('HttpRequest', ['$httpProvider', function ($httpProvider) {
		this.defaults = $httpProvider.defaults;
		this.interceptors = $httpProvider.interceptors;

	// URL configuration
		var urlBase = '';
		var urlSuffix = '';

		function buildUrl(url) {
			return urlBase + url + urlSuffix
		}

	// Provider configuration methods
		this.setUrlBase = function (url) {
			urlBase = url
		};

		this.setUrlSuffix = function (suffix) {
			urlSuffix = suffix
		};

		this.setAuthHeader = function (type, value) {
			this.defaults.headers.common.Authorization = type + ' ' + value
		};

	// Service core
		this.$get = ['$http', function($http) {
			var that = this;
			var service = {};

		// Service configuration methods
			service.setAuthHeader = function (type, value) {
				that.setAuthHeader(type, value)
			};

		// Raw request methods without UrlBase
			service.raw = function (method, url, config) {
				return $http(angular.extend({}, config || {}, {
					method: method,
					url: url
				}));
			};

			service.rawWithData =  function (method, url, data, config) {
				return $http(angular.extend({}, config || {}, {
					method: method,
					url: url,
					data: data
				}))
			};

			service.pure = function (config) {
				return $http(config)
			};

		// request methods construction
			function createMethods() {
				angular.forEach(arguments, function(name) {
					service[name] = function(url, config) {
						return $http(angular.extend({}, config || {}, {
							method: name,
							url: buildUrl(url)
						}));
					};
				});
			}

			function createMethodsWithData() {
				angular.forEach(arguments, function(name) {
					service[name] = function(url, data, config) {
						return $http(angular.extend({}, config || {}, {
							method: name,
							url: buildUrl(url),
							data: data
						}));
					};
				});
			}

			createMethods('get', 'delete', 'head', 'jsonp');
			createMethodsWithData('post', 'put', 'patch');

			return service
		}]

	}]);