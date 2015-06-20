'use strict';

angular.module('http.request', [])

	.provider('HttpRequest', ['$httpProvider', function ($httpProvider) {
		this.defaults = $httpProvider.defaults;
		this.interceptors = $httpProvider.interceptors;

		// URL configuration
		var urlBase = '';
		var urlSuffix = '';

		this.setUrlBase = function (url) {
			urlBase = url
		};

		this.setUrlSuffix = function (suffix) {
			urlSuffix = suffix
		};

		var buildUrl = function (url) {
			return urlBase + url + urlSuffix
		};

		// Configuration methods
		this.setAuthHeader = function (type, value) {
			this.defaults.headers.common.Authorization = type + ' ' + value
		};

		// Service Core
		this.$get = ['$http', function($http) {
			var that = this;
			return {

				// Configuration methods
				setAuthHeader: function (type, value) {
					that.setAuthHeader(type, value);
				},

				// $http methods
				raw: function (config) {
					return $http(config)
				},

				get: function (url, config) {
					return $http.get(buildUrl(url), config)
				},

				post: function (url, data, config) {
					return $http.post(buildUrl(url), data ,config)
				},

				put: function (url, data, config) {
					return $http.put(buildUrl(url), config)
				},

				patch: function (url, data, config) {
					return $http.put(buildUrl(url), config)
				},

				delete: function (url, config) {
					return $http.delete(buildUrl(url), config)
				},

				jsonp: function (url, config) {
					return $http.jsonp(buildUrl(url), config)
				},

				head: function (url, config) {
					return $http.head(buildUrl(url), config)
				}
			}
		}]

	}]);