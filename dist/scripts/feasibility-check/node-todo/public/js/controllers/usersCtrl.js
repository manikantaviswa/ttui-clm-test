angular.module('myApp').controller('usersCtrl', ['$scope', 'usersService', function($scope, usersService) {
	$scope.userForm = {};
	$scope.users = [];
	$scope.addUser = function() {
		$scope.loading = true;
		usersService.create($scope.userForm).then(function(res) {
			$scope.loading = false;				
			$scope.getUsers();
			$scope.clearForm();
		});
	};

	$scope.clearForm = function() {
		$scope.userForm = {};
	};

	$scope.deleteUser = function(index) {
		$scope.loading = true;
		usersService.delete(index).then(function(res) {
			$scope.loading = false;
			$scope.getUsers();
		});
	};
	$scope.getUsers = function() {
		$scope.loading = true;
		usersService.get().then(function(res) {
			$scope.loading = false;
			$scope.usersList = res;
		});
	};
	$scope.getUsers();
	$scope.clearForm();
	
}]);
