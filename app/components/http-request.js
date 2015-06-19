'use strict';

angular.module('http.request', [])

	.provider('HttpRequest', ['$httpProvider', function ($httpProvider) {
		var urlBase = '';
		var urlSuffix = '';

		this.setUrlBase = function (url) {
			urlBase = url
		};

		this.setUrlSuffix = function (sfx) {
			urlSuffix = sfx
		};

		this.setAuthHeader = function (value) {
			$httpProvider.defaults.headers.common.Authorization = value
		};

		var buildUrl = function (url) {
			return urlBase + url + urlSuffix
		};

		this.$get = ['$http', function($http) {
			var that = this;
			return {
				setAuthHeader: function (token) {
					that.setAuthHeader(token);
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