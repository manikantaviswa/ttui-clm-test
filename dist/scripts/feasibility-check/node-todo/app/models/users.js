
module.exports = (function() {
    var users = {
        users: []
    };
    return {
        getUsers: function() {
            console.log(users);
            return users;
        },
        addUser: function(user) {
            users.users.push(user);
            return user;
        },
        removeUser: function(userIndex) {
            users.users.splice(userIndex, 1);
            return true;
        }
    }
}());