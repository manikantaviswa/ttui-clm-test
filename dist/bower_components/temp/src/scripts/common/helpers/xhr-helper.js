'use strict';

var module = angular.module('TT-UI.Common.Helpers.XhrHelper', []);

function XhrHelper($http, $q) {
	this.putJsonDeferred = function(uri, data) {
		var deferred = $q.defer();

		$http.put(uri, data).success(function(res) {
			deferred.resolve(res);
		}).error(function(res) {
			deferred.reject(res);
		});

		return deferred.promise;
	};

	this.loadJsonDeferred = function(uri) {
		var deferred = $q.defer();

		$http.get(uri).success(function(res) {
			deferred.resolve(res);
		}).error(function(res) {
			deferred.reject(res);
		});

		return deferred.promise;
	};

	this.postJsonDeferred = function(uri, data) {
		var deferred = $q.defer();

		$http.post(uri, data).success(function(res) {
			deferred.resolve(res);
		}).error(function(res) {
			deferred.reject(res);
		});

		return deferred.promise;
	};
}

XhrHelper.$inject = ['$http', '$q'];
module.service('XhrHelper', XhrHelper);
