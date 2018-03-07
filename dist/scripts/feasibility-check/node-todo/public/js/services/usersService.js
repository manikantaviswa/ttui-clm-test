angular.module('myApp').factory('usersService', ['$http', '$q', function($http, $q) {
	return {
		get : function() {
			var defer = $q.defer();
			$http.get('/api/users').then(function(res) {
				defer.resolve(res.data.users);
			});
			return defer.promise;
		},
		create : function(user) {
			return $http.post('/api/users/add', user);
		},
		delete : function(index) {
			return $http.delete('/api/users/' + index);
		}
	}
}]);
